"use client";

import React, { useState } from "react";
import { useAuth, PlanType } from "@/contexts/AuthContext";
import PlansModal from "@/components/PlansModal";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedPlans: PlanType[];
  moduleName: string;
}

export default function ProtectedRoute({ children, allowedPlans, moduleName }: ProtectedRouteProps) {
  const { isLoggedIn, planType, siteMode } = useAuth();
  const [isPlansOpen, setIsPlansOpen] = useState(false);

  // If siteMode is "free_all", bypass restrictions for everyone!
  // If siteMode is "free_students" and planType is student, allow access!
  const isFreeBypass = siteMode === "free_all" || (siteMode === "free_students" && planType === "student");
  
  // Allow access if logged in with allowed plan, admin, or site-wide free bypass is triggered
  const hasAccess = isFreeBypass || isLoggedIn && (planType === "hybrid" || planType === "institute" || allowedPlans.includes(planType));

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-brand-bg-dark">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full bg-brand-bg-card border border-brand-border rounded-3xl p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl">
        <div className="w-20 h-20 bg-brand-bg-dark border-2 border-brand-border rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg className="w-8 h-8 text-brand-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>

        <h1 className="text-3xl font-black font-serif text-brand-text-primary mb-4">
          Module Locked
        </h1>
        <p className="text-brand-text-secondary font-mono text-sm mb-8 leading-relaxed">
          The <span className="text-brand-purple font-bold">{moduleName}</span> module requires active access privileges. Apply for a 6-month free pass or choose a plan to unlock.
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => setIsPlansOpen(true)}
            className="w-full py-4 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold font-mono tracking-widest uppercase rounded-xl transition-colors text-xs"
          >
            View Access Plans
          </button>
          
          {!isLoggedIn && (
            <p className="text-xs font-mono text-brand-text-secondary">
              Already have an access code? Use the <span className="text-brand-cyan font-bold">Log In</span> button in the header.
            </p>
          )}
        </div>
      </div>

      <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
    </div>
  );
}
