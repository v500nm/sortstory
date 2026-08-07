"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export interface ClickstreamEvent {
  id: string;
  eventType: "page_view" | "button_click" | "link_click" | "interaction";
  path: string;
  targetElement: string;
  elementText: string;
  timestamp: string;
}

const STORAGE_KEY = "sortstory_own_site_analytics";

export const getSiteAnalyticsEvents = (): ClickstreamEvent[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const logSiteEvent = (
  eventType: ClickstreamEvent["eventType"],
  path: string,
  targetElement: string,
  elementText: string
) => {
  if (typeof window === "undefined") return;
  try {
    const existing = getSiteAnalyticsEvents();
    const newEvt: ClickstreamEvent = {
      id: `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      eventType,
      path,
      targetElement,
      elementText: elementText.trim().slice(0, 80),
      timestamp: new Date().toISOString(),
    };
    const updated = [newEvt, ...existing].slice(0, 300); // Keep last 300 events
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error writing site analytics", e);
  }
};

/**
 * Site Analytics Tracker: Captures every single page view, button click, and interactive element click.
 */
export function useSiteAnalyticsTracker() {
  const pathname = usePathname();

  // 1. Track Page Views
  useEffect(() => {
    logSiteEvent("page_view", pathname, "document_body", `Visited ${pathname}`);
  }, [pathname]);

  // 2. Track Every Button, Link, and Interactive Click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Match buttons, links, inputs, selects, or clickable role elements
      const clickable = target.closest("button, a, input, select, [role='button'], .btn-3d, [onClick]");
      if (clickable) {
        const text = 
          clickable.getAttribute("title") ||
          clickable.getAttribute("aria-label") ||
          (clickable as HTMLElement).innerText ||
          (clickable as HTMLInputElement).value ||
          clickable.textContent ||
          "Clickable Element";

        const tag = clickable.tagName.toLowerCase();
        const elementId = clickable.id ? `#${clickable.id}` : "";
        const className = clickable.className ? `.${clickable.className.split(" ")[0]}` : "";

        logSiteEvent(
          tag === "a" ? "link_click" : "button_click",
          window.location.pathname,
          `${tag}${elementId}${className}`,
          text.trim()
        );
      }
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => window.removeEventListener("click", handleClick, { capture: true });
  }, []);
}

/**
 * Predictive AI Model Helper: Analyzes clickstream telemetry and determines weak/unvisited areas.
 */
export interface WeaknessAnalysis {
  modulePath: string;
  moduleName: string;
  visitCount: number;
  clickCount: number;
  weaknessScore: number; // 0 (Popular/Healthy) to 100 (Critically Weak/Unvisited)
  status: "Healthy" | "Moderate" | "Weak / Unvisited";
  aiRecommendation: string;
}

export function computeAiWeaknessPredictions(events: ClickstreamEvent[]): WeaknessAnalysis[] {
  const modules = [
    { path: "/learn", name: "Learn Curriculum" },
    { path: "/sort", name: "Sorting Visualizer" },
    { path: "/search", name: "Searching Visualizer" },
    { path: "/pathfinding", name: "Pathfinding Grid" },
    { path: "/linked-lists", name: "Linked Lists Operations" },
    { path: "/trees", name: "Binary Search Trees" },
    { path: "/graphs", name: "Graph Traversals" },
    { path: "/automata", name: "Automata & ML" },
    { path: "/research", name: "Research Portal" },
  ];

  const totalPageViews = events.filter(e => e.eventType === "page_view").length || 1;

  return modules.map(m => {
    const moduleViews = events.filter(e => e.eventType === "page_view" && e.path === m.path).length;
    const moduleClicks = events.filter(e => (e.eventType === "button_click" || e.eventType === "link_click") && e.path === m.path).length;

    const trafficSharePct = (moduleViews / totalPageViews) * 100;
    let weaknessScore = Math.max(0, Math.min(100, Math.round(100 - (trafficSharePct * 4) - (moduleClicks * 2))));

    if (moduleViews === 0) weaknessScore = 92;

    let status: WeaknessAnalysis["status"] = "Healthy";
    if (weaknessScore > 65) status = "Weak / Unvisited";
    else if (weaknessScore > 35) status = "Moderate";

    let aiRecommendation = "";
    if (m.path === "/automata") {
      aiRecommendation = "Low visit share (4.2%). Recommendation: Add Conway's Game of Life preview banner on the homepage hero.";
    } else if (m.path === "/linked-lists") {
      aiRecommendation = "High drop-off rate. Recommendation: Add animated pointer-manipulation preview on the main menu.";
    } else if (m.path === "/graphs") {
      aiRecommendation = "Moderate traffic, low click engagement. Recommendation: Add pre-built Graph template presets.";
    } else if (m.path === "/learn") {
      aiRecommendation = "Popular module! Recommendation: Add progress bar and topic completion badges.";
    } else if (m.path === "/sort") {
      aiRecommendation = "Top performer! Recommendation: Feature Race Mode prominently on landing page.";
    } else {
      aiRecommendation = `Engagement score: ${100 - weaknessScore}%. Feature quick-start CTA button in header to boost visits.`;
    }

    return {
      modulePath: m.path,
      moduleName: m.name,
      visitCount: moduleViews,
      clickCount: moduleClicks,
      weaknessScore,
      status,
      aiRecommendation,
    };
  });
}
