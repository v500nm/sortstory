"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalyticsBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mql = window.matchMedia("(max-width: 639px)");
    const updateIsMobile = () => setIsMobile(mql.matches);
    updateIsMobile();
    mql.addEventListener("change", updateIsMobile);

    const dismissed = localStorage.getItem("sortstory-analytics-dismissed");
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!dismissed) {
      // instant on mobile (it's a blocking gate), slight delay on desktop (it's a toast)
      timer = setTimeout(() => setIsVisible(true), mql.matches ? 0 : 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      mql.removeEventListener("change", updateIsMobile);
    };
  }, []);

  // Lock page scroll while the mobile blocking overlay is up
  useEffect(() => {
    if (isMobile && isVisible) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMobile, isVisible]);

  const handleDismiss = () => {
    localStorage.setItem("sortstory-analytics-dismissed", "true");
    setIsVisible(false);
  };

  if (!mounted) return null;

  const card = (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 20 : 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: isMobile ? 10 : 20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm sm:max-w-md bg-brand-bg-card/95 backdrop-blur-2xl border border-brand-border rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col gap-3 font-sans text-brand-text-primary box-border"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-brand-cyan/15 rounded-xl shrink-0 text-brand-cyan border border-brand-cyan/30">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
        </div>
        <div className="flex flex-col gap-1 pr-2 min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold tracking-wide text-brand-text-primary">
              Performance Telemetry
            </h4>
          </div>
          <p className="text-xs text-brand-text-secondary leading-relaxed">
            We collect anonymous page analytics and algorithm execution speeds to monitor and optimize
            performance. No personal data is collected.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 items-center border-t border-brand-border/40 pt-3">
        <button
          onClick={handleDismiss}
          className="px-5 py-2 bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-extrabold text-xs rounded-full hover:scale-105 transition-transform duration-200 active:scale-95 shadow-md cursor-pointer"
        >
          Acknowledge & Continue
        </button>
      </div>
    </motion.div>
  );

  return createPortal(
    <AnimatePresence>
      {isVisible &&
        (isMobile ? (
          // Mobile: full-screen blocking gate, shown before the user can touch site content
          <motion.div
            key="mobile-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] w-screen h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 box-border"
          >
            {card}
          </motion.div>
        ) : (
          // Desktop: non-blocking floating toast, bottom-right
          <div className="fixed bottom-6 right-6 z-[100] w-auto max-w-md">{card}</div>
        ))}
    </AnimatePresence>,
    document.body
  );
}