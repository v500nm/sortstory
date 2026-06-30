"use client";
import { useEffect, useRef, useCallback } from "react";
import BarsVisualizer from "./BarsVisualizer";
import { useSortEngine } from "@/hooks/useSortEngine";
import { algorithms, algorithmInfo } from "./ControlsPanel";
import type { SortAlgorithmFn } from "@/lib/types";
import * as sorts from "@/lib/index";

interface ComparativeViewProps {
  algoA: string;
  algoB: string;
  arraySize: number;
  speed: number;
  onComplete?: () => void;
}

const sortMap: Record<string, SortAlgorithmFn> = sorts as unknown as Record<string, SortAlgorithmFn>;

function getAlgoLabel(value: string): string {
  return algorithms.find(a => a.value === value)?.label || value;
}

export default function ComparativeView({
  algoA,
  algoB,
  arraySize,
  speed,
}: ComparativeViewProps) {
  const engineA = useSortEngine(arraySize);
  const engineB = useSortEngine(arraySize);
  const sharedArrayRef = useRef<number[] | null>(null);
  const hasStarted = useRef(false);

  // Sync speed to both engines
  useEffect(() => {
    engineA.setSpeed(speed);
    engineB.setSpeed(speed);
  }, [speed, engineA.setSpeed, engineB.setSpeed]);

  // Generate matching arrays when size changes
  useEffect(() => {
    engineA.generateArray(arraySize);
    // We'll sync on run
    hasStarted.current = false;
  }, [arraySize]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRun = useCallback(() => {
    // Generate a fresh shared array
    engineA.generateArray(arraySize);

    // Wait a tick for state to settle, then copy A's array to B and run both
    setTimeout(() => {
      // Copy engine A's array to engine B
      engineB.generateArray(arraySize);

      // Need another tick to let generateArray settle
      setTimeout(() => {
        const fnA = sortMap[algoA];
        const fnB = sortMap[algoB];

        if (fnA) engineA.run(fnA);
        if (fnB) engineB.run(fnB);
        hasStarted.current = true;
      }, 50);
    }, 50);
  }, [algoA, algoB, arraySize, engineA, engineB]);

  const handleStop = useCallback(() => {
    engineA.stop();
    engineB.stop();
    hasStarted.current = false;
  }, [engineA, engineB]);

  const handleShuffle = useCallback(() => {
    engineA.generateArray(arraySize);
    engineB.generateArray(arraySize);
    hasStarted.current = false;
  }, [arraySize, engineA, engineB]);

  const isBusy = engineA.status === "running" || engineA.status === "paused" ||
                 engineB.status === "running" || engineB.status === "paused";

  const infoA = algorithmInfo[algoA] || algorithmInfo.bubbleSort;
  const infoB = algorithmInfo[algoB] || algorithmInfo.bubbleSort;

  // Determine winner
  const bothDone = engineA.status === "completed" && engineB.status === "completed";
  const winnerA = bothDone && engineA.metrics.timeMs < engineB.metrics.timeMs;
  const winnerB = bothDone && engineB.metrics.timeMs < engineA.metrics.timeMs;
  const tie = bothDone && engineA.metrics.timeMs === engineB.metrics.timeMs;

  return (
    <div className="space-y-4">
      {/* Compare Controls */}
      <div className="flex items-center justify-between glass-card premium-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#111111] border border-brand-border flex items-center justify-center">
            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16" className="text-white">
              <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide">RACE MODE</h2>
            <p className="text-xs font-mono text-brand-text-secondary mt-1">
              <span className="text-white">{getAlgoLabel(algoA)}</span>
              <span className="mx-2 text-brand-border-light">vs</span>
              <span className="text-brand-yellow">{getAlgoLabel(algoB)}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShuffle}
            disabled={isBusy}
            className="flex items-center gap-1.5 bg-[#171717] border border-brand-border rounded-md py-2 px-4 hover:bg-[#27272a] transition-all text-xs font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed text-white"
          >
            <svg fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="12">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" x2="21" y1="20" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" x2="21" y1="15" y2="21" />
              <line x1="4" x2="9" y1="4" y2="9" />
            </svg>
            SHUFFLE
          </button>
          {!isBusy ? (
            <button
              onClick={handleRun}
              className="flex items-center gap-1.5 text-black font-bold tracking-wide rounded-md py-2 px-5 transition-all bg-white hover:bg-gray-200 text-xs"
            >
              <svg fill="currentColor" height="12" viewBox="0 0 24 24" width="12">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              RACE
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex items-center gap-1.5 bg-brand-border text-white font-bold tracking-wide rounded-md py-2 px-5 hover:bg-brand-border-light transition-all text-xs"
            >
              <svg fill="currentColor" height="12" viewBox="0 0 24 24" width="12">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
              STOP
            </button>
          )}
        </div>
      </div>

      {/* Winner banner */}
      {bothDone && (
        <div className={`text-center py-3 rounded-xl border ${
          tie ? "bg-brand-purple/10 border-brand-purple/30" : "bg-emerald-500/10 border-emerald-500/30"
        }`}>
          {tie ? (
            <span className="text-brand-purple font-semibold">🤝 It&apos;s a tie!</span>
          ) : (
            <span className="text-emerald-400 font-semibold">
              🏆 {winnerA ? getAlgoLabel(algoA) : getAlgoLabel(algoB)} wins!
              <span className="text-brand-text-secondary font-normal ml-2">
                ({winnerA ? engineA.metrics.timeMs : engineB.metrics.timeMs}ms vs {winnerA ? engineB.metrics.timeMs : engineA.metrics.timeMs}ms)
              </span>
            </span>
          )}
        </div>
      )}

      {/* Dual Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Panel A */}
        <div className={`rounded-xl ${winnerA ? "ring-2 ring-emerald-400/50" : ""}`}>
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
            <span className="text-sm font-semibold">{getAlgoLabel(algoA)}</span>
            <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded ml-auto font-mono">{infoA.time}</span>
            {winnerA && <span className="text-xs text-emerald-400">🏆</span>}
          </div>
          <BarsVisualizer
            array={engineA.array}
            colors={engineA.colors}
            comparisons={engineA.metrics.comparisons}
            swaps={engineA.metrics.swaps}
            time={engineA.metrics.timeMs}
          />
        </div>

        {/* Panel B */}
        <div className={`rounded-xl ${winnerB ? "ring-2 ring-emerald-400/50" : ""}`}>
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-sm font-semibold">{getAlgoLabel(algoB)}</span>
            <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded ml-auto font-mono">{infoB.time}</span>
            {winnerB && <span className="text-xs text-emerald-400">🏆</span>}
          </div>
          <BarsVisualizer
            array={engineB.array}
            colors={engineB.colors}
            comparisons={engineB.metrics.comparisons}
            swaps={engineB.metrics.swaps}
            time={engineB.metrics.timeMs}
          />
        </div>
      </div>
    </div>
  );
}
