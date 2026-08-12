"use client";

import { useState, useEffect, useRef } from "react";
import PageLoader from "./PageLoader";

const ALGO_NAMES = [
  "Bubble Sort",
  "Quick Sort",
  "Merge Sort",
  "Heap Sort",
  "Insertion Sort",
  "Selection Sort",
  "Radix Sort",
  "Shell Sort",
];

const INITIAL_BARS = [6, 2, 8, 3, 9, 1, 7, 4, 5];
const BAR_COLORS = {
  default: "var(--color-brand-purple)",
  comparing: "var(--color-brand-cyan)",
  sorted: "var(--color-brand-green)",
};

export default function SortingBarsLoader() {
  const [bars, setBars] = useState(INITIAL_BARS);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sorted, setSorted] = useState(false);
  const [algoIdx, setAlgoIdx] = useState(0);
  const stepRef = useRef(0);
  const passRef = useRef(0);

  useEffect(() => {
    const algoTimer = setInterval(() => {
      setAlgoIdx((i) => (i + 1) % ALGO_NAMES.length);
    }, 600);
    return () => clearInterval(algoTimer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const arr = [...INITIAL_BARS];
    stepRef.current = 0;
    passRef.current = 0;

    // Generate all bubble sort steps
    const steps: { arr: number[]; comparing: number[] }[] = [];
    const working = [...arr];
    for (let i = 0; i < working.length; i++) {
      for (let j = 0; j < working.length - i - 1; j++) {
        steps.push({ arr: [...working], comparing: [j, j + 1] });
        if (working[j] > working[j + 1]) {
          [working[j], working[j + 1]] = [working[j + 1], working[j]];
          steps.push({ arr: [...working], comparing: [j, j + 1] });
        }
      }
    }
    steps.push({ arr: [...working], comparing: [] });

    let idx = 0;
    const timer = setInterval(() => {
      if (cancelled) return;
      if (idx < steps.length) {
        setBars(steps[idx].arr);
        setActiveIndices(steps[idx].comparing);
        setSorted(false);
        idx++;
      } else {
        setSorted(true);
        setActiveIndices([]);
        // Reset after brief pause
        setTimeout(() => {
          if (!cancelled) {
            idx = 0;
            setBars(INITIAL_BARS);
            setSorted(false);
          }
        }, 500);
      }
    }, 80);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <PageLoader label={`Initializing ${ALGO_NAMES[algoIdx]}...`}>
      <div className="flex items-end justify-center gap-[6px] h-[120px] w-[220px]">
        {bars.map((value, i) => {
          const isActive = activeIndices.includes(i);
          const barColor = sorted
            ? BAR_COLORS.sorted
            : isActive
            ? BAR_COLORS.comparing
            : BAR_COLORS.default;

          return (
            <div
              key={i}
              className="relative rounded-t-[3px] transition-all duration-[60ms] ease-out"
              style={{
                height: `${(value / 9) * 100}%`,
                width: "18px",
                backgroundColor: barColor,
                boxShadow: isActive
                  ? `0 0 12px ${BAR_COLORS.comparing}40`
                  : sorted
                  ? `0 0 8px ${BAR_COLORS.sorted}30`
                  : "none",
              }}
            />
          );
        })}
      </div>
    </PageLoader>
  );
}
