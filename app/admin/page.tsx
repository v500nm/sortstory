"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useAuth, SiteMode, CustomPlan } from "@/contexts/AuthContext";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getStoredEvents, CapturedEvent, Analytics } from "@/lib/analytics";
import { getSiteAnalyticsEvents, ClickstreamEvent, computeAiWeaknessPredictions, WeaknessAnalysis } from "@/lib/siteAnalytics";

interface Application {
  id: string;
  name: string;
  email: string;
  college: string;
  className: string;
  rollNumber: string;
  purpose: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  generatedCode?: string;
  isDuplicateFlag?: boolean;
}

interface IssuedCode {
  code: string;
  plan: string;
  assignedTo: string;
  connectionsAllowed: number;
  connectionsActive: number;
  expiresInDays: number;
  status: "active" | "revoked";
}

function AdminDashboardContent() {
  const { isAdmin, login, logout, siteMode, setSiteMode, customPlans, addCustomPlan, deleteCustomPlan } = useAuth();
  const searchParams = useSearchParams();
  
  // Login form state
  const [adminPasscode, setAdminPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  // Admin Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<"overview" | "applications" | "codes" | "plan_manager" | "analytics" | "site_analytics" | "institutions">("overview");

  // Mode Trigger Modal State
  const [isModeModalOpen, setIsModeModalOpen] = useState(false);

  // Dynamic Plan Manager Form State
  const [planForm, setPlanForm] = useState({
    name: "",
    price: "₹399 / 6 Months",
    badge: "",
    description: "",
    featuresText: "Full Module Access, 1 Connection Limit, Priority Support",
  });

  // Filter for Clickstream Events
  const [eventFilter, setEventFilter] = useState<"all" | "button_click" | "page_view">("all");

  // Dynamic PostHog & Site Telemetry Events
  const [liveEvents, setLiveEvents] = useState<CapturedEvent[]>([]);
  const [siteEvents, setSiteEvents] = useState<ClickstreamEvent[]>([]);
  const [aiPredictions, setAiPredictions] = useState<WeaknessAnalysis[]>([]);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (
      tabParam === "analytics" || 
      tabParam === "site_analytics" || 
      tabParam === "codes" || 
      tabParam === "plan_manager" ||
      tabParam === "applications" || 
      tabParam === "institutions" || 
      tabParam === "overview"
    ) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadEvents = () => {
      const phEvents = getStoredEvents();
      const ownEvents = getSiteAnalyticsEvents();
      setLiveEvents(phEvents);
      setSiteEvents(ownEvents);
      setAiPredictions(computeAiWeaknessPredictions(ownEvents));
    };
    loadEvents();
    const interval = setInterval(loadEvents, 2000);
    return () => clearInterval(interval);
  }, []);

  // Sample Student Applications
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "APP-101",
      name: "Rohan Sharma",
      email: "rohan.s@vjti.ac.in",
      college: "VJTI, Mumbai",
      className: "3rd Year B.Tech CSE",
      rollNumber: "211080045",
      purpose: "Preparing for campus placements and DSA interviews.",
      date: "2026-07-30",
      status: "pending",
      isDuplicateFlag: false,
    },
    {
      id: "APP-102",
      name: "Priya Verma",
      email: "priya.verma@bits.ac.in",
      college: "BITS Pilani",
      className: "2nd Year B.E. CS",
      rollNumber: "2024A7PS012G",
      purpose: "Semester course on Data Structures & Algorithms visual aid.",
      date: "2026-07-30",
      status: "pending",
      isDuplicateFlag: false,
    },
    {
      id: "APP-103",
      name: "Aman Gupta",
      email: "rohan.s@vjti.ac.in",
      college: "VJTI, Mumbai",
      className: "3rd Year B.Tech CSE",
      rollNumber: "211080045",
      purpose: "Second application attempt.",
      date: "2026-07-30",
      status: "pending",
      isDuplicateFlag: true,
    }
  ]);

  // Sample Issued Codes
  const [issuedCodes, setIssuedCodes] = useState<IssuedCode[]>([
    { code: "STUDENT2026", plan: "Student Pass (6 Mo)", assignedTo: "Demo Student", connectionsAllowed: 1, connectionsActive: 1, expiresInDays: 180, status: "active" },
    { code: "HYBRID_MAX", plan: "Hybrid Pass (6 Mo)", assignedTo: "Adnan M.", connectionsAllowed: 1, connectionsActive: 1, expiresInDays: 180, status: "active" },
    { code: "VJTI_CS_DEPT", plan: "Institution Plan", assignedTo: "VJTI CS Lab (150 Seats)", connectionsAllowed: 150, connectionsActive: 84, expiresInDays: 365, status: "active" },
  ]);

  // Code Generator Form State
  const [newCodePlan, setNewCodePlan] = useState("Hybrid Pass");
  const [newCodeAssignee, setNewCodeAssignee] = useState("");
  const [newCodeSeats, setNewCodeSeats] = useState(1);
  const [generatedCodeResult, setGeneratedCodeResult] = useState<string | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = login(adminPasscode);
    if (!success && adminPasscode !== "admin123") {
      setLoginError("Invalid Admin Passcode. Use code 'ADMIN2026' or 'ADMIN'");
    }
  };

  const handleApprove = (appId: string) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `STU-${randomSuffix}-2026`;

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, status: "approved", generatedCode: code };
      }
      return app;
    }));

    const app = applications.find(a => a.id === appId);
    if (app) {
      setIssuedCodes(prev => [
        {
          code,
          plan: "Student Pass (6 Mo)",
          assignedTo: `${app.name} (${app.college})`,
          connectionsAllowed: 1,
          connectionsActive: 0,
          expiresInDays: 180,
          status: "active"
        },
        ...prev
      ]);
    }
  };

  const handleReject = (appId: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, status: "rejected" };
      }
      return app;
    }));
  };

  const handleCreateCustomCode = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = newCodePlan.toUpperCase().slice(0, 3);
    const rand = Math.floor(100000 + Math.random() * 900000);
    const code = `${prefix}-${rand}`;

    setIssuedCodes(prev => [
      {
        code,
        plan: newCodePlan,
        assignedTo: newCodeAssignee || "Direct Issue",
        connectionsAllowed: Number(newCodeSeats),
        connectionsActive: 0,
        expiresInDays: 180,
        status: "active"
      },
      ...prev
    ]);

    setGeneratedCodeResult(code);
    setNewCodeAssignee("");
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planForm.name || !planForm.price) return;
    const newPlan: CustomPlan = {
      id: `plan_${Date.now()}`,
      name: planForm.name,
      price: planForm.price,
      badge: planForm.badge || undefined,
      description: planForm.description || "Custom admin generated plan.",
      features: planForm.featuresText.split(",").map(f => f.trim()).filter(Boolean),
    };
    addCustomPlan(newPlan);
    setPlanForm({ name: "", price: "₹399 / 6 Months", badge: "", description: "", featuresText: "" });
  };

  const handleRevokeCode = (codeStr: string) => {
    setIssuedCodes(prev => prev.map(c => c.code === codeStr ? { ...c, status: "revoked" } : c));
  };

  // Filtered clickstream events
  const filteredSiteEvents = siteEvents.filter(evt => {
    if (eventFilter === "button_click") return evt.eventType === "button_click" || evt.eventType === "link_click";
    if (eventFilter === "page_view") return evt.eventType === "page_view";
    return true;
  });

  // If not Admin, show Admin Login Screen
  if (!isAdmin) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-brand-bg-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-purple/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[140px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-md w-full bg-brand-bg-card border border-brand-border rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="w-14 h-14 bg-brand-purple/10 border border-brand-purple/30 text-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
            ⚡
          </div>

          <h1 className="text-2xl font-black font-serif text-brand-text-primary text-center mb-1">
            SortStory Admin Portal
          </h1>
          <p className="text-brand-text-secondary text-xs font-mono text-center mb-6">
            Enter administrative passcode to unlock management & analytics console.
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-brand-text-secondary">Admin Key / Passcode</label>
              <input 
                type="password" 
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                placeholder="Enter ADMIN2026"
                className="w-full bg-brand-bg-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text-primary focus:border-brand-purple outline-none font-mono"
              />
            </div>

            {loginError && (
              <div className="text-[11px] font-mono text-brand-rose bg-brand-rose/10 border border-brand-rose/20 p-2.5 rounded-lg text-center">
                {loginError}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-3 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold font-mono tracking-widest uppercase rounded-xl transition-colors text-xs"
            >
              Log In as Administrator
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center justify-between text-[11px] font-mono">
            <Link href="/" className="text-brand-purple font-bold hover:underline">
              ← Return to Main Site
            </Link>
            <span className="text-brand-text-secondary">Code: <strong className="text-brand-cyan">ADMIN2026</strong></span>
          </div>
        </motion.div>
      </div>
    );
  }

  const pendingCount = applications.filter(a => a.status === "pending").length;
  const activeCodesCount = issuedCodes.filter(c => c.status === "active").length;

  return (
    <div className="min-h-screen bg-brand-bg-dark text-brand-text-primary py-8 px-4 sm:px-8 max-w-[1700px] mx-auto">
      {/* Top Action & Navigation Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-brand-border/60">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link 
              href="/" 
              className="px-3 py-1 bg-brand-purple/20 text-brand-purple border border-brand-purple/40 rounded-lg text-xs font-mono font-bold hover:bg-brand-purple hover:text-white transition-colors flex items-center gap-1.5"
            >
              ← Back to Main Site
            </Link>
            <span className="px-3 py-1 bg-brand-bg-card text-brand-text-secondary text-[10px] font-mono font-bold uppercase rounded-md border border-brand-border">
              Admin Control Center
            </span>
          </div>
          <h1 className="text-3xl font-black font-serif">Management & AI Telemetry Console</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Site Mode Switcher Trigger Button */}
          <button 
            onClick={() => setIsModeModalOpen(true)}
            className={`px-4 py-2 border rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              siteMode === "free_all"
                ? "bg-brand-green/20 border-brand-green/50 text-brand-green shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                : siteMode === "free_students"
                ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                : "bg-brand-purple/20 border-brand-purple/50 text-brand-purple"
            }`}
          >
            <span>🌐 Site Access Mode:</span>
            <span className="uppercase font-extrabold">{siteMode.replace("_", " ")}</span>
          </button>

          <button 
            onClick={logout}
            className="px-4 py-2 bg-brand-bg-card border border-brand-border text-brand-rose hover:bg-brand-rose/10 transition-colors rounded-xl text-xs font-mono font-bold"
          >
            Exit Session
          </button>
        </div>
      </div>

      {/* Submenu Navigation Tabs */}
      <div className="flex border-b border-brand-border mb-8 gap-4 overflow-x-auto">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${activeTab === "overview" ? "text-brand-purple border-b-2 border-brand-purple" : "text-brand-text-secondary hover:text-brand-text-primary"}`}
        >
          📊 System Overview
        </button>
        <button 
          onClick={() => setActiveTab("site_analytics")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${activeTab === "site_analytics" ? "text-amber-400 border-b-2 border-amber-400" : "text-brand-text-secondary hover:text-brand-text-primary"}`}
        >
          🧠 AI Site Analytics & Predictions ({siteEvents.length})
        </button>
        <button 
          onClick={() => setActiveTab("analytics")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${activeTab === "analytics" ? "text-brand-purple border-b-2 border-brand-purple" : "text-brand-text-secondary hover:text-brand-text-primary"}`}
        >
          📈 PostHog Telemetry ({liveEvents.length})
        </button>
        <button 
          onClick={() => setActiveTab("applications")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${activeTab === "applications" ? "text-brand-purple border-b-2 border-brand-purple" : "text-brand-text-secondary hover:text-brand-text-primary"}`}
        >
          📋 Student Applications ({pendingCount})
        </button>
        <button 
          onClick={() => setActiveTab("plan_manager")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${activeTab === "plan_manager" ? "text-brand-cyan border-b-2 border-brand-cyan" : "text-brand-text-secondary hover:text-brand-text-primary"}`}
        >
          ⚙️ Dynamic Plan Manager ({customPlans.length})
        </button>
        <button 
          onClick={() => setActiveTab("codes")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${activeTab === "codes" ? "text-brand-purple border-b-2 border-brand-purple" : "text-brand-text-secondary hover:text-brand-text-primary"}`}
        >
          🔑 Access Code Generator ({activeCodesCount})
        </button>
        <button 
          onClick={() => setActiveTab("institutions")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${activeTab === "institutions" ? "text-brand-purple border-b-2 border-brand-purple" : "text-brand-text-secondary hover:text-brand-text-primary"}`}
        >
          🏛️ Institution Seats
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SYSTEM OVERVIEW & AI SITE ANALYTICS PREDICTIVE ENGINE */}
      {/* ───────────────────────────────────────────────────────────── */}

      {(activeTab === "overview" || activeTab === "site_analytics") && (
        <div className="space-y-8">
          
          {/* AI Predictive Intelligence Section */}
          <div className="bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase rounded-md border border-amber-500/30">
                  AI Predictive Intelligence Engine
                </span>
                <h2 className="text-2xl font-black font-serif text-brand-text-primary mt-2">
                  Weakness & Unvisited Page Prediction Model
                </h2>
                <p className="text-xs font-mono text-brand-text-secondary mt-1">
                  Analyzes clickstream events, page visit density, and button clicks across all 9 site modules.
                </p>
              </div>

              <div className="text-right font-mono text-xs text-brand-text-secondary">
                Total Events Logged: <strong className="text-amber-400">{siteEvents.length} Clicks & Visits</strong>
              </div>
            </div>

            {/* AI Predictions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiPredictions.map((pred) => (
                <div 
                  key={pred.modulePath} 
                  className={`p-5 rounded-2xl border transition-all ${
                    pred.status === "Weak / Unvisited" 
                      ? "bg-brand-rose/5 border-brand-rose/40 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
                      : pred.status === "Moderate"
                      ? "bg-amber-500/5 border-amber-500/30"
                      : "bg-brand-bg-dark border-brand-border/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-brand-text-primary">{pred.moduleName}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      pred.status === "Weak / Unvisited" 
                        ? "bg-brand-rose/20 text-brand-rose"
                        : pred.status === "Moderate"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-brand-green/20 text-brand-green"
                    }`}>
                      {pred.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-brand-text-secondary mb-3">
                    <span>Visits: <strong className="text-brand-text-primary">{pred.visitCount}</strong> | Clicks: <strong className="text-brand-text-primary">{pred.clickCount}</strong></span>
                    <span>Weakness: <strong className={pred.weaknessScore > 60 ? "text-brand-rose" : "text-brand-green"}>{pred.weaknessScore}/100</strong></span>
                  </div>

                  <div className="text-[11px] font-mono p-3 bg-brand-bg-dark/90 rounded-xl border border-brand-border/40 leading-relaxed text-brand-text-primary">
                    <span className="text-amber-400 font-bold">🤖 AI Recommendation: </span>
                    {pred.aiRecommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User-Friendly Clickstream Feed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold font-serif text-brand-text-primary">
                    Live Site Clickstream Feed
                  </h3>
                  <p className="text-xs font-mono text-brand-text-secondary">
                    Captures every single button click, link navigation, and page visit in real-time.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <button 
                    onClick={() => setEventFilter("all")}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors ${eventFilter === "all" ? "bg-brand-purple text-white" : "bg-brand-bg-dark text-brand-text-secondary border border-brand-border"}`}
                  >
                    All ({siteEvents.length})
                  </button>
                  <button 
                    onClick={() => setEventFilter("button_click")}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors ${eventFilter === "button_click" ? "bg-brand-cyan text-black" : "bg-brand-bg-dark text-brand-text-secondary border border-brand-border"}`}
                  >
                    Button Clicks
                  </button>
                  <button 
                    onClick={() => setEventFilter("page_view")}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors ${eventFilter === "page_view" ? "bg-brand-green text-black" : "bg-brand-bg-dark text-brand-text-secondary border border-brand-border"}`}
                  >
                    Page Views
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2 font-mono text-xs custom-scrollbar pr-2">
                {filteredSiteEvents.length > 0 ? (
                  filteredSiteEvents.slice(0, 20).map((evt) => (
                    <div key={evt.id} className="p-3 bg-brand-bg-dark border border-brand-border/40 rounded-xl flex items-center justify-between gap-4 hover:border-brand-purple/40 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                          evt.eventType === "page_view" 
                            ? "bg-brand-purple/20 text-brand-purple border border-brand-purple/30" 
                            : evt.eventType === "link_click"
                            ? "bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30"
                            : "bg-brand-green/20 text-brand-green border border-brand-green/30"
                        }`}>
                          {evt.eventType.replace("_", " ")}
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-brand-text-primary">{evt.elementText || evt.targetElement}</span>
                          <span className="text-brand-text-secondary text-[11px] ml-2 font-normal">on <code className="text-brand-cyan">{evt.path}</code></span>
                        </div>
                      </div>
                      <span className="text-[10px] text-brand-text-secondary opacity-60 shrink-0">
                        {new Date(evt.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center font-mono text-xs text-brand-text-secondary border border-dashed border-brand-border/50 rounded-2xl">
                    Listening for clicks and page visits... Click any button on the main site to view your action recorded here instantly!
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-1 bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest mb-1">
                  Database & Schema Work
                </div>
                <h3 className="text-xl font-bold font-serif text-brand-text-primary mb-2">
                  PostgreSQL Migration SQL
                </h3>
                <p className="text-xs font-mono text-brand-text-secondary mb-4 leading-relaxed">
                  All table names have been updated with the <code className="text-brand-cyan font-bold">sortstory_</code> prefix for shared database safety.
                </p>

                <div className="p-3 bg-brand-bg-dark border border-brand-border/60 rounded-xl font-mono text-[11px] text-brand-cyan select-all space-y-1">
                  <div>• sortstory_users</div>
                  <div>• sortstory_access_codes</div>
                  <div>• sortstory_student_applications</div>
                  <div>• sortstory_site_analytics_events</div>
                  <div>• sortstory_site_module_insights</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center justify-between text-xs font-mono">
                <Link href="/" className="text-brand-purple font-bold hover:underline">
                  ← Back to Main Site
                </Link>
                <span className="text-brand-green font-bold">✓ Prefixed & Verified</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* DYNAMIC PLAN MANAGER TAB */}
      {/* ───────────────────────────────────────────────────────────── */}

      {activeTab === "plan_manager" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Plan Form */}
          <div className="lg:col-span-1 bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-6 shadow-2xl h-fit">
            <h3 className="text-lg font-bold font-serif text-brand-text-primary mb-4">Add Custom Plan Dynamically</h3>
            
            <form onSubmit={handleCreatePlan} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-brand-text-secondary">Plan Name *</label>
                <input 
                  type="text" 
                  value={planForm.name}
                  onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                  placeholder="e.g. Master Interview Pass"
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-xl px-3 py-2.5 text-brand-text-primary outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-brand-text-secondary">Price Label *</label>
                <input 
                  type="text" 
                  value={planForm.price}
                  onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                  placeholder="e.g. ₹399 / 6 Months or FREE"
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-xl px-3 py-2.5 text-brand-text-primary outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-brand-text-secondary">Badge Tag (Optional)</label>
                <input 
                  type="text" 
                  value={planForm.badge}
                  onChange={(e) => setPlanForm({ ...planForm, badge: e.target.value })}
                  placeholder="e.g. LIMITED OFFER or POPULAR"
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-xl px-3 py-2.5 text-brand-text-primary outline-none focus:border-brand-purple"
                />
              </div>

              <div className="space-y-1">
                <label className="text-brand-text-secondary">Description</label>
                <textarea 
                  rows={2}
                  value={planForm.description}
                  onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                  placeholder="Brief overview of plan benefits..."
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-xl px-3 py-2 text-brand-text-primary outline-none focus:border-brand-purple resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-brand-text-secondary">Features (Comma-separated)</label>
                <textarea 
                  rows={3}
                  value={planForm.featuresText}
                  onChange={(e) => setPlanForm({ ...planForm, featuresText: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-xl px-3 py-2 text-brand-text-primary outline-none focus:border-brand-purple resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-brand-cyan hover:bg-brand-cyan/80 text-black font-bold tracking-widest uppercase rounded-xl transition-colors text-xs mt-2"
              >
                Publish New Plan
              </button>
            </form>
          </div>

          {/* Active Custom Plans List */}
          <div className="lg:col-span-2 bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold font-serif text-brand-text-primary mb-4">Active Managed Plans ({customPlans.length})</h3>
            <p className="text-xs font-mono text-brand-text-secondary mb-6">
              These plans dynamically populate the public <strong className="text-brand-purple">View Plans</strong> modal across the site.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customPlans.map((plan) => (
                <div key={plan.id} className="p-5 bg-brand-bg-dark border border-brand-border/60 rounded-2xl flex flex-col justify-between relative overflow-hidden">
                  {plan.badge && (
                    <span className="absolute top-0 right-0 px-3 py-1 bg-brand-purple text-white font-mono text-[9px] font-bold rounded-bl-lg">
                      {plan.badge}
                    </span>
                  )}
                  <div>
                    <h4 className="font-bold text-brand-text-primary text-base font-serif">{plan.name}</h4>
                    <div className="text-brand-cyan font-bold font-mono text-lg mt-1">{plan.price}</div>
                    <p className="text-xs font-mono text-brand-text-secondary mt-2">{plan.description}</p>
                    
                    <ul className="mt-3 space-y-1">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="text-[11px] font-mono text-brand-text-secondary flex items-center gap-1.5">
                          <span className="text-brand-purple">✓</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-border/40 flex justify-end">
                    <button 
                      onClick={() => deleteCustomPlan(plan.id)}
                      className="px-3 py-1 bg-brand-rose/10 border border-brand-rose/30 text-brand-rose hover:bg-brand-rose/20 rounded-lg text-[10px] font-mono font-bold uppercase transition-colors"
                    >
                      Delete Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* DETAILED TABLES (Applications, Code Gen, Institutions) */}
      {/* ───────────────────────────────────────────────────────────── */}

      {/* Tab 1: Student Approval Queue */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-brand-text-primary">6-Month Free Student Pass Applications</h2>
          
          <div className="bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-brand-bg-dark border-b border-brand-border text-brand-text-secondary">
                  <tr>
                    <th className="p-4">Student Info</th>
                    <th className="p-4">College & Year</th>
                    <th className="p-4">Roll No. / Student ID</th>
                    <th className="p-4">Purpose</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40">
                  {applications.map((app) => (
                    <tr key={app.id} className={app.isDuplicateFlag ? "bg-brand-rose/5" : ""}>
                      <td className="p-4">
                        <div className="font-bold text-brand-text-primary">{app.name}</div>
                        <div className="text-brand-text-secondary text-[11px]">{app.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-brand-text-primary">{app.college}</div>
                        <div className="text-brand-text-secondary text-[11px]">{app.className}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-brand-bg-dark border border-brand-border rounded text-brand-cyan font-bold">
                          {app.rollNumber}
                        </span>
                        {app.isDuplicateFlag && (
                          <div className="text-brand-rose text-[10px] font-bold mt-1">⚠️ Flagged Duplicate</div>
                        )}
                      </td>
                      <td className="p-4 max-w-xs truncate text-brand-text-secondary">
                        {app.purpose}
                      </td>
                      <td className="p-4">
                        {app.status === "pending" && (
                          <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-[10px]">
                            Pending Verification
                          </span>
                        )}
                        {app.status === "approved" && (
                          <div className="space-y-1">
                            <span className="px-2.5 py-1 bg-brand-green/20 text-brand-green border border-brand-green/30 rounded-full text-[10px]">
                              Approved (6 Mo)
                            </span>
                            <div className="text-brand-cyan font-bold text-[10px]">Code: {app.generatedCode}</div>
                          </div>
                        )}
                        {app.status === "rejected" && (
                          <span className="px-2.5 py-1 bg-brand-rose/20 text-brand-rose border border-brand-rose/30 rounded-full text-[10px]">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        {app.status === "pending" && (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleApprove(app.id)}
                              className="px-3 py-1.5 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider transition-colors"
                            >
                              Approve Code
                            </button>
                            <button 
                              onClick={() => handleReject(app.id)}
                              className="px-3 py-1.5 bg-brand-bg-dark border border-brand-border text-brand-rose hover:bg-brand-rose/10 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Code Generator & Active Codes */}
      {activeTab === "codes" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Custom Code Generator */}
          <div className="lg:col-span-1 bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-6 shadow-2xl h-fit">
            <h3 className="text-lg font-bold font-serif text-brand-text-primary mb-4">Issue Custom Access Code</h3>
            
            <form onSubmit={handleCreateCustomCode} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-brand-text-secondary">Plan Type</label>
                <select 
                  value={newCodePlan} 
                  onChange={(e) => setNewCodePlan(e.target.value)}
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-xl px-3 py-2.5 text-brand-text-primary outline-none focus:border-brand-purple"
                >
                  <option value="Student Pass">Student Pass (6 Months)</option>
                  <option value="Learning Only">Learning Only (₹299)</option>
                  <option value="Visualization Only">Visualization Only (₹299)</option>
                  <option value="Hybrid Pass">Hybrid Pass (₹499 / 6 Mo)</option>
                  <option value="Institution Plan">Institution Plan (Multi-Seat)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-brand-text-secondary">Assignee / Organization</label>
                <input 
                  type="text" 
                  value={newCodeAssignee}
                  onChange={(e) => setNewCodeAssignee(e.target.value)}
                  placeholder="e.g. Rahul Verma or VJTI CS Dept"
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-xl px-3 py-2.5 text-brand-text-primary outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-brand-text-secondary">Allowed Connections / Seats</label>
                <input 
                  type="number" 
                  min={1}
                  max={500}
                  value={newCodeSeats}
                  onChange={(e) => setNewCodeSeats(Number(e.target.value))}
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-xl px-3 py-2.5 text-brand-text-primary outline-none focus:border-brand-purple"
                />
                <p className="text-[10px] text-brand-text-secondary">Standard plans = 1 connection limit.</p>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-brand-cyan hover:bg-brand-cyan/80 text-black font-bold tracking-widest uppercase rounded-xl transition-colors text-xs mt-2"
              >
                Generate Access Code
              </button>
            </form>

            {generatedCodeResult && (
              <div className="mt-6 p-4 bg-brand-purple/10 border border-brand-purple/30 rounded-xl text-center">
                <div className="text-[10px] text-brand-text-secondary uppercase">Code Generated Successfully</div>
                <div className="text-lg font-bold font-mono text-brand-cyan mt-1 select-all">{generatedCodeResult}</div>
              </div>
            )}
          </div>

          {/* Active Codes List */}
          <div className="lg:col-span-2 bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl overflow-hidden shadow-2xl p-6">
            <h3 className="text-lg font-bold font-serif text-brand-text-primary mb-4">Active System Access Codes</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-brand-bg-dark border-b border-brand-border text-brand-text-secondary">
                  <tr>
                    <th className="p-3">Access Code</th>
                    <th className="p-3">Plan & Assigned To</th>
                    <th className="p-3">Connections</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40">
                  {issuedCodes.map((codeItem) => (
                    <tr key={codeItem.code}>
                      <td className="p-3 font-bold text-brand-cyan select-all">{codeItem.code}</td>
                      <td className="p-3">
                        <div className="text-brand-text-primary">{codeItem.plan}</div>
                        <div className="text-brand-text-secondary text-[11px]">{codeItem.assignedTo}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-brand-bg-dark border border-brand-border rounded text-brand-purple">
                          {codeItem.connectionsActive} / {codeItem.connectionsAllowed} Max
                        </span>
                      </td>
                      <td className="p-3">
                        {codeItem.status === "active" ? (
                          <span className="text-brand-green font-bold">Active</span>
                        ) : (
                          <span className="text-brand-rose font-bold">Revoked</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {codeItem.status === "active" && (
                          <button 
                            onClick={() => handleRevokeCode(codeItem.code)}
                            className="px-2.5 py-1 bg-brand-rose/10 text-brand-rose border border-brand-rose/20 rounded hover:bg-brand-rose/20 transition-colors text-[10px]"
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: PostHog Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 p-6 rounded-3xl shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-brand-purple font-mono font-bold text-xs uppercase">
                <span>● PostHog Live Telemetry Streaming</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-text-primary mt-1">PostHog Product Analytics Console</h2>
              <p className="text-brand-text-secondary text-xs font-mono">
                Project Key: <code className="text-brand-cyan font-bold">phc_up8aZnJND...</code> | Org ID: <code className="text-brand-cyan font-bold">019fb3ab-9170-0000-aecf-b0a1506feaba</code>
              </p>
            </div>

            <a 
              href="https://us.posthog.com/project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-brand-purple text-white hover:bg-brand-purple/80 transition-colors rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto"
            >
              <span>Launch Live PostHog Portal ↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Tab 4: Institution Seats */}
      {activeTab === "institutions" && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-brand-text-primary">Institution & Campus Seat Allocations</h2>
          
          <div className="bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-6 shadow-2xl">
            <p className="text-xs font-mono text-brand-text-secondary leading-relaxed mb-6">
              Flexible multi-seat licensing allows colleges to allocate active student connections per department or computer lab.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-brand-bg-dark border border-brand-border rounded-2xl">
                <h4 className="font-bold text-brand-text-primary text-sm">VJTI Mumbai CS Dept</h4>
                <div className="text-xs font-mono text-brand-cyan mt-1">150 Seat Package</div>
                <div className="text-xs font-mono text-brand-text-secondary mt-2">Active Connections: 84 / 150</div>
              </div>

              <div className="p-5 bg-brand-bg-dark border border-brand-border rounded-2xl">
                <h4 className="font-bold text-brand-text-primary text-sm">BITS Pilani CS Lab</h4>
                <div className="text-xs font-mono text-brand-purple mt-1">200 Seat Package</div>
                <div className="text-xs font-mono text-brand-text-secondary mt-2">Active Connections: 142 / 200</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODE TRIGGER MODAL (PAID MODE VS FREE MODE SWITCHER) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModeModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-brand-bg-card border border-brand-border rounded-3xl shadow-2xl p-6 sm:p-8"
            >
              <button 
                onClick={() => setIsModeModalOpen(false)}
                className="absolute top-4 right-4 text-brand-text-secondary hover:text-brand-text-primary w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
              >
                ✕
              </button>
              
              <div className="mb-6 text-center">
                <span className="px-3 py-1 bg-brand-purple/20 text-brand-purple text-[10px] font-mono font-bold uppercase rounded-md border border-brand-purple/30">
                  Global Site Policy Trigger
                </span>
                <h2 className="text-2xl font-black font-serif text-brand-text-primary mt-2">
                  Toggle Site Access Mode
                </h2>
                <p className="text-brand-text-secondary text-xs font-mono mt-1">
                  Instantly switch between paid plan gating, free-for-students mode, or 100% free mode for everyone.
                </p>
              </div>

              <div className="space-y-4">
                {/* Mode Option 1: Gated Mode */}
                <div 
                  onClick={() => { setSiteMode("gated"); setIsModeModalOpen(false); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    siteMode === "gated" 
                      ? "bg-brand-purple/10 border-brand-purple shadow-[0_0_20px_rgba(168,85,247,0.15)]" 
                      : "bg-brand-bg-dark border-brand-border/60 hover:border-brand-purple/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-brand-text-primary font-serif">🔒 Standard Gated Mode (Paid / Code Required)</span>
                    {siteMode === "gated" && <span className="text-brand-purple text-xs font-mono font-bold">ACTIVE</span>}
                  </div>
                  <p className="text-xs font-mono text-brand-text-secondary mt-1">
                    Modules require valid access code or student verification pass.
                  </p>
                </div>

                {/* Mode Option 2: Free For Everyone Mode */}
                <div 
                  onClick={() => { setSiteMode("free_all"); setIsModeModalOpen(false); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    siteMode === "free_all" 
                      ? "bg-brand-green/10 border-brand-green shadow-[0_0_20px_rgba(34,197,94,0.15)]" 
                      : "bg-brand-bg-dark border-brand-border/60 hover:border-brand-green/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-brand-green font-serif">🎁 Free For Everyone Mode (Full Bypass)</span>
                    {siteMode === "free_all" && <span className="text-brand-green text-xs font-mono font-bold">ACTIVE</span>}
                  </div>
                  <p className="text-xs font-mono text-brand-text-secondary mt-1">
                    Bypasses all access codes & plan gates site-wide. Everyone gets 100% free un-gated access to all modules!
                  </p>
                </div>

                {/* Mode Option 3: Free For Verified Students */}
                <div 
                  onClick={() => { setSiteMode("free_students"); setIsModeModalOpen(false); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    siteMode === "free_students" 
                      ? "bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)]" 
                      : "bg-brand-bg-dark border-brand-border/60 hover:border-amber-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-amber-400 font-serif">🎓 Free For Students Only Mode</span>
                    {siteMode === "free_students" && <span className="text-amber-400 text-xs font-mono font-bold">ACTIVE</span>}
                  </div>
                  <p className="text-xs font-mono text-brand-text-secondary mt-1">
                    Automatically bypasses locks for verified students while keeping paid plans for others.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bg-dark flex items-center justify-center font-mono text-xs text-brand-text-secondary">Loading Admin Control Center...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
