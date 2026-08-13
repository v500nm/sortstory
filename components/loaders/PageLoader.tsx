"use client";

import React from "react";

interface PageLoaderProps {
  children: React.ReactNode;
  label?: string;
}

export default function PageLoader({ children, label }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-bg-dark overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-purple/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-brand-cyan/6 rounded-full blur-[100px] pointer-events-none" />

      {/* Animation content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-full px-4 text-center">
        {children}

        {/* Label */}
        {label && (
          <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-brand-text-secondary/60 loader-label-pulse">
            {label}
          </p>
        )}
      </div>

      {/* Bottom brand */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-brand-text-secondary/30">
          SortStory
        </span>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-brand-border-light/40 to-transparent" />
      </div>

      <style jsx>{`
        .loader-label-pulse {
          animation: labelPulse 2s ease-in-out infinite;
        }
        @keyframes labelPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
