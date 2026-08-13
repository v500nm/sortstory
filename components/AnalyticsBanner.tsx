"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalyticsBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    // Check local storage to see if the user already dismissed it
    const dismissed = localStorage.getItem("sortstory-analytics-dismissed");
    if (!dismissed) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("sortstory-analytics-dismissed", "true");
    setIsVisible(false);
    setIsMobileExpanded(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Compact Floating Badge Trigger (Visible only on < sm screens when not expanded) */}
      <div className="sm:hidden fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="flex items-center gap-2 px-3 py-1.5 bg-brand-bg-card/90 backdrop-blur-md border border-brand-cyan/40 text-brand-cyan rounded-full text-[11px] font-mono font-bold shadow-lg active:scale-95 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <span>Telemetry</span>
          <span className="text-[10px] opacity-75">ℹ️</span>
        </button>
      </div>

      {/* Main Banner Container */}
      <AnimatePresence>
        {(isVisible && (isMobileExpanded || typeof window === "undefined")) && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-14 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md bg-brand-bg-card/95 backdrop-blur-xl border border-brand-border rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-3 font-sans text-brand-text-primary ${
              isMobileExpanded ? "block" : "hidden sm:flex"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-brand-cyan/10 rounded-lg shrink-0 text-brand-cyan">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold tracking-wide">Performance Telemetry</h4>
                  <button
                    onClick={() => setIsMobileExpanded(false)}
                    className="sm:hidden text-brand-text-secondary hover:text-brand-text-primary p-1 text-xs"
                    aria-label="Close telemetry popover"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-brand-text-secondary leading-relaxed">
                  We collect anonymous page analytics and algorithm execution speeds to monitor and optimize performance. No personal data is collected.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 items-center border-t border-brand-border/40 pt-3">
              <button
                onClick={handleDismiss}
                className="px-4 py-1.5 bg-brand-text-primary text-brand-bg-dark font-extrabold text-xs rounded-full hover:scale-105 transition-transform duration-200 active:scale-95 shadow-sm"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
