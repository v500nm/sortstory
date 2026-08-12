"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

export default function ResearchLoader() {
  const [points, setPoints] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prev) => {
        if (prev.length >= 10) return [15];
        return [...prev, Math.floor(Math.min(95, 10 + Math.pow(prev.length + 1, 1.8)))];
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <PageLoader label="Compiling Empirical Research Benchmarks & Complexity Curves...">
      <div className="w-[260px] h-[130px] bg-brand-surface-1 border border-brand-border-light rounded-xl p-3 flex flex-col justify-between relative overflow-hidden font-mono shadow-2xl">
        {/* Chart Header */}
        <div className="flex items-center justify-between text-[9px] text-brand-text-tertiary border-b border-brand-border-light pb-1.5">
          <span className="font-bold text-brand-purple uppercase">Time Complexity Benchmark</span>
          <span className="text-brand-green font-bold animate-pulse">O(N log N)</span>
        </div>

        {/* Chart Plot Area */}
        <div className="relative flex-1 w-full flex items-end gap-1.5 pt-2">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
            <div className="w-full border-b border-brand-text-primary" />
            <div className="w-full border-b border-brand-text-primary" />
            <div className="w-full border-b border-brand-text-primary" />
          </div>

          {points.map((val, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all duration-200 relative"
              style={{
                height: `${val}%`,
                background: "linear-gradient(to top, var(--color-brand-purple), var(--color-brand-cyan))",
              }}
            >
              {i === points.length - 1 && (
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-ping" />
              )}
            </div>
          ))}
        </div>

        {/* Axis Footer */}
        <div className="flex justify-between items-center text-[8px] text-brand-text-tertiary pt-1 border-t border-brand-border-light">
          <span>N = 10</span>
          <span>N = 1,000</span>
          <span>N = 100,000</span>
        </div>
      </div>
    </PageLoader>
  );
}
