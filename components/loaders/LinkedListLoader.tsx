"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

const NODE_COUNT = 6;
const NODE_WIDTH = 36;
const NODE_GAP = 20; // gap for the arrow
const ARROW_WIDTH = 20;

export default function LinkedListLoader() {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const values = [12, 7, 23, 5, 18, 9];

  useEffect(() => {
    let cancelled = false;
    let step = -1;

    const run = () => {
      step = -1;
      setCurrentIdx(-1);
      setVisited(new Set());

      const timer = setInterval(() => {
        if (cancelled) return;
        step++;

        if (step < NODE_COUNT) {
          setCurrentIdx(step);
          setVisited((prev) => new Set([...prev, step]));
        } else {
          clearInterval(timer);
          setTimeout(() => {
            if (!cancelled) run();
          }, 600);
        }
      }, 300);

      return timer;
    };

    const timer = run();
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <PageLoader label="Traversing linked list...">
      <div className="flex items-center justify-center max-w-full overflow-x-auto px-2 py-1">
        {values.map((val, i) => {
          const isCurrent = i === currentIdx;
          const isVisited = visited.has(i);
          const isLast = i === NODE_COUNT - 1;

          return (
            <div key={i} className="flex items-center">
              {/* Node */}
              <div
                className="relative flex items-center justify-center rounded-[4px] border-2 transition-all duration-200"
                style={{
                  width: `${NODE_WIDTH}px`,
                  height: "32px",
                  backgroundColor: isCurrent
                    ? "var(--color-brand-cyan)"
                    : isVisited
                    ? "var(--color-brand-purple)"
                    : "var(--color-brand-bg-medium)",
                  borderColor: isCurrent
                    ? "var(--color-brand-cyan)"
                    : isVisited
                    ? "var(--color-brand-purple)"
                    : "var(--color-brand-border-light)",
                  boxShadow: isCurrent
                    ? "0 0 14px var(--color-brand-cyan)40"
                    : "none",
                  transform: isCurrent ? "scale(1.1)" : "scale(1)",
                }}
              >
                <span
                  className="text-[10px] font-mono font-bold transition-colors duration-200"
                  style={{
                    color: isVisited || isCurrent ? "#fff" : "var(--color-brand-text-secondary)",
                  }}
                >
                  {val}
                </span>
              </div>

              {/* Arrow between nodes */}
              {!isLast && (
                <svg
                  width={ARROW_WIDTH}
                  height="12"
                  viewBox="0 0 20 12"
                  className="transition-all duration-200"
                  style={{
                    opacity: isVisited && visited.has(i + 1) ? 0.9 : 0.25,
                  }}
                >
                  <line
                    x1="0"
                    y1="6"
                    x2="14"
                    y2="6"
                    stroke={
                      isVisited
                        ? "var(--color-brand-cyan)"
                        : "var(--color-brand-border-light)"
                    }
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="14,2 20,6 14,10"
                    fill={
                      isVisited
                        ? "var(--color-brand-cyan)"
                        : "var(--color-brand-border-light)"
                    }
                  />
                </svg>
              )}
            </div>
          );
        })}

        {/* NULL terminator */}
        <div className="ml-1 flex items-center">
          <svg width="16" height="12" viewBox="0 0 16 12" opacity="0.3">
            <line x1="0" y1="6" x2="10" y2="6" stroke="var(--color-brand-border-light)" strokeWidth="1.5" />
            <line x1="10" y1="0" x2="10" y2="12" stroke="var(--color-brand-rose)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </PageLoader>
  );
}
