"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

const ARRAY_SIZE = 15;

export default function SearchLoader() {
  const [cells] = useState(() =>
    Array.from({ length: ARRAY_SIZE }, (_, i) => i + 1)
  );
  const [activeIdx, setActiveIdx] = useState(-1);
  const [eliminatedLeft, setEliminatedLeft] = useState(0);
  const [eliminatedRight, setEliminatedRight] = useState(ARRAY_SIZE);
  const [found, setFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const target = 10; // searching for 10 in [1..15]

    const runSearch = () => {
      let lo = 0;
      let hi = ARRAY_SIZE - 1;

      const steps: { mid: number; lo: number; hi: number; found: boolean }[] = [];

      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (cells[mid] === target) {
          steps.push({ mid, lo, hi: hi + 1, found: true });
          break;
        } else if (cells[mid] < target) {
          lo = mid + 1;
          steps.push({ mid, lo, hi: hi + 1, found: false });
        } else {
          hi = mid - 1;
          steps.push({ mid, lo, hi: hi + 1, found: false });
        }
      }

      let stepIdx = 0;
      const timer = setInterval(() => {
        if (cancelled) return;
        if (stepIdx < steps.length) {
          const s = steps[stepIdx];
          setActiveIdx(s.mid);
          setEliminatedLeft(s.lo);
          setEliminatedRight(s.hi);
          setFound(s.found);
          stepIdx++;
        } else {
          // Reset after a pause
          setTimeout(() => {
            if (!cancelled) {
              setActiveIdx(-1);
              setEliminatedLeft(0);
              setEliminatedRight(ARRAY_SIZE);
              setFound(false);
              runSearch();
            }
          }, 700);
          clearInterval(timer);
        }
      }, 350);

      return timer;
    };

    const timer = runSearch();
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [cells]);

  return (
    <PageLoader label="Binary Search — narrowing range...">
      <div className="flex items-center justify-center gap-[2px] sm:gap-[3px] max-w-full overflow-x-auto px-2">
        {cells.map((val, i) => {
          const isEliminated = i < eliminatedLeft || i >= eliminatedRight;
          const isActive = i === activeIdx;
          const isFound = isActive && found;

          return (
            <div
              key={i}
              className="relative flex items-center justify-center transition-all duration-200 ease-out rounded-[3px] shrink-0"
              style={{
                width: "clamp(16px, 4.5vw, 28px)",
                height: "clamp(24px, 6vw, 32px)",
                fontSize: "clamp(8px, 2.5vw, 10px)",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                backgroundColor: isFound
                  ? "var(--color-brand-green)"
                  : isActive
                  ? "var(--color-brand-cyan)"
                  : isEliminated
                  ? "var(--color-brand-bg-light)"
                  : "var(--color-brand-purple)",
                color: isEliminated
                  ? "var(--color-brand-text-secondary)"
                  : "#fff",
                opacity: isEliminated ? 0.3 : 1,
                boxShadow: isActive
                  ? `0 0 14px ${isFound ? "var(--color-brand-green)" : "var(--color-brand-cyan)"}50`
                  : "none",
                transform: isActive ? "scale(1.15)" : "scale(1)",
              }}
            >
              {val}
            </div>
          );
        })}
      </div>

      {/* Bracket indicators */}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-[9px] font-mono text-brand-cyan/60">
          L:{eliminatedLeft}
        </span>
        <div className="flex-1 h-[1px] bg-brand-cyan/20 mx-1" />
        <span className="text-[9px] font-mono text-brand-cyan/60">
          R:{eliminatedRight - 1}
        </span>
      </div>
    </PageLoader>
  );
}
