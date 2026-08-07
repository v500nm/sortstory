"use client";

import posthog from "posthog-js";

export interface CapturedEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
}

const TELEMETRY_STORAGE_KEY = "sortstory_posthog_events_log";

// Helper to store dynamic events locally for the dynamic PostHog admin dashboard
const saveEvent = (eventName: string, props: Record<string, any>) => {
  if (typeof window === "undefined") return;
  try {
    const existingRaw = localStorage.getItem(TELEMETRY_STORAGE_KEY);
    const events: CapturedEvent[] = existingRaw ? JSON.parse(existingRaw) : [];
    const newEvent: CapturedEvent = {
      event: eventName,
      properties: props,
      timestamp: new Date().toISOString(),
    };
    // Keep last 200 events
    const updated = [newEvent, ...events].slice(0, 200);
    localStorage.setItem(TELEMETRY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error storing telemetry event", e);
  }
};

export const getStoredEvents = (): CapturedEvent[] => {
  if (typeof window === "undefined") return [];
  try {
    const existingRaw = localStorage.getItem(TELEMETRY_STORAGE_KEY);
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
};

export const Analytics = {
  // Track Plan Modal Interactions
  trackPlanView: (planId: string, planName: string, price: string) => {
    const props = { plan_id: planId, plan_name: planName, price };
    posthog.capture("plan_viewed", props);
    saveEvent("plan_viewed", props);
  },

  // Track Student 6-Month Free Pass Application
  trackStudentApplicationSubmitted: (data: {
    college: string;
    className: string;
    purpose: string;
  }) => {
    const props = { college: data.college, class_name: data.className, purpose: data.purpose };
    posthog.capture("student_pass_applied", props);
    saveEvent("student_pass_applied", props);
  },

  // Track Access Code / Login Validation
  trackLoginAttempt: (success: boolean, planType?: string) => {
    const props = { success, plan_type: planType || "none" };
    posthog.capture("login_attempted", props);
    saveEvent("login_attempted", props);

    if (success && planType) {
      posthog.identify(undefined, {
        active_plan: planType,
        last_login: new Date().toISOString(),
      });
    }
  },

  // Track Algorithm Visualizer Actions
  trackAlgorithmRun: (algoName: string, category: string, arraySize?: number) => {
    const props = { algorithm: algoName, category, array_size: arraySize };
    posthog.capture("algorithm_executed", props);
    saveEvent("algorithm_executed", props);
  },

  // Track Comparative Race Mode
  trackRaceMode: (algo1: string, algo2: string, category: string) => {
    const props = { algo_1: algo1, algo_2: algo2, category };
    posthog.capture("algorithm_race_started", props);
    saveEvent("algorithm_race_started", props);
  },

  // Track Research Page Navigation
  trackResearchSectionView: (sectionId: string, sectionTitle: string) => {
    const props = { section_id: sectionId, section_title: sectionTitle };
    posthog.capture("research_section_viewed", props);
    saveEvent("research_section_viewed", props);
  },
};
