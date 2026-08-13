"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

export default function MixedLoaders() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 550);
    return () => clearInterval(timer);
  }, []);

  const labels = [
    "Initializing Parallel Sort Engines...",
    "Scanning Binary Search Boundaries...",
    "Expanding Heuristic Grid Wavefronts...",
    "Connecting Graph Adjacency Vectors...",
  ];

  return (
    <PageLoader label={labels[phase]}>
      <div className="w-[240px] h-[120px] flex items-center justify-center relative">
        {/* Phase 0: Sorting Bars */}
        {phase === 0 && (
          <div className="flex items-end justify-center gap-1.5 h-full w-full">
            {[30, 70, 45, 90, 60, 20, 85, 50].map((h, i) => (
              <div
                key={i}
                className="w-4 rounded-t-sm transition-all duration-300"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    i === 2 || i === 3 ? "var(--color-brand-cyan)" : "var(--color-brand-purple)",
                  boxShadow: i === 2 ? "0 0 10px var(--color-brand-cyan)" : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* Phase 1: Binary Search Array */}
        {phase === 1 && (
          <div className="flex items-center justify-center gap-1 w-full">
            {[12, 24, 38, 45, 59, 67, 82, 91].map((val, i) => {
              const isTarget = i === 4;
              const isEliminated = i < 2 || i > 5;
              return (
                <div
                  key={i}
                  className={`w-7 h-10 rounded border flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                    isTarget
                      ? "bg-brand-green/20 border-brand-green text-brand-green shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                      : isEliminated
                      ? "bg-brand-bg-dark border-brand-border/40 text-brand-text-tertiary opacity-30"
                      : "bg-brand-surface-1 border-brand-cyan text-brand-cyan"
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>
        )}

        {/* Phase 2: Pathfinding Wavefront */}
        {phase === 2 && (
          <div className="grid grid-cols-7 grid-rows-5 gap-1 w-[210px] h-[100px]">
            {Array.from({ length: 35 }).map((_, i) => {
              const isPath = [3, 10, 17, 24, 25, 26, 27].includes(i);
              const isFrontier = [4, 11, 18, 31].includes(i);
              return (
                <div
                  key={i}
                  className={`rounded-sm transition-all ${
                    isPath
                      ? "bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                      : isFrontier
                      ? "bg-brand-purple/40 animate-pulse"
                      : "bg-brand-surface-1 border border-brand-border/30"
                  }`}
                />
              );
            })}
          </div>
        )}

        {/* Phase 3: Graph BFS Network */}
        {phase === 3 && (
          <svg className="w-[200px] h-[110px]" viewBox="0 0 200 110">
            <line x1="30" y1="55" x2="80" y2="25" stroke="var(--color-brand-purple)" strokeWidth="2" opacity="0.8" />
            <line x1="30" y1="55" x2="80" y2="85" stroke="var(--color-brand-purple)" strokeWidth="2" opacity="0.8" />
            <line x1="80" y1="25" x2="140" y2="25" stroke="var(--color-brand-cyan)" strokeWidth="2" />
            <line x1="80" y1="85" x2="140" y2="85" stroke="var(--color-brand-cyan)" strokeWidth="2" />
            <line x1="140" y1="25" x2="180" y2="55" stroke="var(--color-brand-green)" strokeWidth="2" />
            <line x1="140" y1="85" x2="180" y2="55" stroke="var(--color-brand-green)" strokeWidth="2" />

            <circle cx="30" cy="55" r="10" fill="var(--color-brand-purple)" />
            <circle cx="80" cy="25" r="10" fill="var(--color-brand-cyan)" />
            <circle cx="80" cy="85" r="10" fill="var(--color-brand-cyan)" />
            <circle cx="140" cy="25" r="10" fill="var(--color-brand-green)" />
            <circle cx="140" cy="85" r="10" fill="var(--color-brand-green)" />
            <circle cx="180" cy="55" r="10" fill="var(--color-brand-yellow)" />
          </svg>
        )}
      </div>
    </PageLoader>
  );
}
