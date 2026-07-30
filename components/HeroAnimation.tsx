"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroAnimation() {
  const [state, setState] = useState({
    array: [7, 2, 9, 4, 8, 1, 5, 3, 6],
    comparing: [] as number[],
    swaps: 0,
    comparisons: 0,
    phase: "COMPARING" as "COMPARING" | "SWAPPING" | "SORTED" | "SHUFFLING",
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.phase === "SORTED" || prev.phase === "SHUFFLING") return prev;
        
        const nextArray = [...prev.array];
        let sorted = true;
        let compIdx: number[] = [];
        let newSwaps = prev.swaps;
        let newComparisons = prev.comparisons + 1;
        let newPhase: "COMPARING" | "SWAPPING" = "COMPARING";

        for (let i = 0; i < nextArray.length - 1; i++) {
          compIdx = [i, i + 1];
          if (nextArray[i] > nextArray[i + 1]) {
            const temp = nextArray[i];
            nextArray[i] = nextArray[i + 1];
            nextArray[i + 1] = temp;
            sorted = false;
            newSwaps += 1;
            newPhase = "SWAPPING";
            break;
          }
        }

        if (sorted) {
          timeoutId = setTimeout(() => {
            setState({
              array: [7, 2, 9, 4, 8, 1, 5, 3, 6].sort(() => Math.random() - 0.5),
              comparing: [],
              swaps: 0,
              comparisons: 0,
              phase: "COMPARING",
            });
          }, 2000);

          return {
            ...prev,
            comparing: [],
            phase: "SORTED",
          };
        }

        return {
          array: nextArray,
          comparing: compIdx,
          swaps: newSwaps,
          comparisons: newComparisons,
          phase: newPhase,
        };
      });
    }, 700);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-[450px] bg-brand-bg-card/45 backdrop-blur-md border border-brand-border rounded-2xl p-5 flex flex-col justify-between gap-4 relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden font-mono">
      {/* Decorative Matrix Background Effect */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Console Top bar */}
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-3 relative z-10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-brand-rose/80" />
          <div className="w-3 h-3 rounded-full bg-brand-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-brand-green/80" />
        </div>
        <span className="text-[10px] text-brand-text-secondary/70 tracking-widest">
          sortstory://engine/bubble-sort.sh
        </span>
      </div>

      {/* Telemetry Console */}
      <div className="grid grid-cols-2 gap-3 text-[11px] bg-black/20 p-3 rounded-lg border border-brand-border/40 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-brand-text-secondary">ALGORITHM</span>
          <span className="font-bold text-brand-text-primary">Bubble Sort</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-brand-text-secondary">STATUS</span>
          <span className={`font-bold transition-colors duration-300 ${
            state.phase === "SORTED" 
              ? "text-brand-green" 
              : state.phase === "SWAPPING" 
              ? "text-brand-yellow" 
              : "text-brand-cyan"
          }`}>
            {state.phase}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-brand-text-secondary">COMPARISONS</span>
          <span className="font-bold text-brand-text-primary">{state.comparisons}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-brand-text-secondary">SWAPS</span>
          <span className="font-bold text-brand-text-primary">{state.swaps}</span>
        </div>
      </div>

      {/* Bars Visualizer */}
      <div className="flex-1 w-full flex items-end justify-center gap-3 pt-6 px-1 relative z-10">
        {state.array.map((value, index) => {
          const isComparing = state.comparing.includes(index);
          return (
            <motion.div
              key={value}
              layout
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`w-full max-w-[40px] rounded-t-lg transition-all duration-300 relative group`}
              style={{ 
                height: `${value * 10}%`,
                background: isComparing 
                  ? "linear-gradient(to top, var(--color-brand-cyan), var(--color-brand-purple))"
                  : state.phase === "SORTED"
                  ? "linear-gradient(to top, var(--color-brand-green), #10b981)"
                  : "linear-gradient(to top, var(--color-brand-purple), var(--color-brand-bg-light))"
              }}
            >
              {/* Highlight Glow for active comparison */}
              {isComparing && (
                <div className="absolute inset-0 bg-brand-cyan/40 blur-md rounded-t-lg -z-10 animate-pulse" />
              )}
              {/* Tooltip value */}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-brand-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                {value}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
