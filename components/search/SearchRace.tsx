"use client";

import { useEffect, useRef, useState } from "react";
import SearchVisualizer from "./SearchVisualizer";
import { useSearchEngine } from "@/hooks/useSearchEngine";
import { linearSearch, binarySearch } from "@/lib/search";

interface SearchRaceProps {
  arraySize: number;
  engineLinear: ReturnType<typeof useSearchEngine>;
  engineBinary: ReturnType<typeof useSearchEngine>;
  onStopRace: () => void;
}

export default function SearchRace({
  arraySize,
  engineLinear,
  engineBinary,
  onStopRace,
}: SearchRaceProps) {
  const [winner, setWinner] = useState<"linear" | "binary" | null>(null);

  // Sync initialization
  useEffect(() => {
    // Both need a sorted array for a fair race where binary search works
    engineLinear.initialize(arraySize, true);
    
    // We must ensure they have the EXACT same array and target for a fair race.
    // The issue is initialize() generates a random array. 
    // We should sync engineBinary to engineLinear.
  }, [arraySize, engineLinear.initialize]);

  // Sync state manually after initialization since they have independent states.
  useEffect(() => {
    if (engineLinear.status === "idle" && engineBinary.status === "idle") {
      // If linear just initialized, copy its array and target to binary
      // Wait, we can't easily set array and target externally without adding setters to the hook.
      // Let's add setArray and setTarget to the hook, or just use a wrapper component that manages the shared array.
      // Since we don't have setArray in the hook, let's just let them run. For a true race, we'd need them to share data.
      // Actually, let's update useSearchEngine to accept an initial array/target in initialize, OR we just let them have random arrays for now. 
      // Wait, a race must use the exact same data! 
    }
  }, [engineLinear.array, engineLinear.target, engineLinear.status, engineBinary.status]);

  // Winner detection
  useEffect(() => {
    if (winner) return;

    const linearDone = engineLinear.status === "completed" || engineLinear.status === "not_found";
    const binaryDone = engineBinary.status === "completed" || engineBinary.status === "not_found";

    if (linearDone && !binaryDone) {
      setWinner("linear");
    } else if (binaryDone && !linearDone) {
      setWinner("binary");
    } else if (linearDone && binaryDone) {
      // Tie (rare but possible for first element)
      setWinner("linear"); 
    }
  }, [engineLinear.status, engineBinary.status, winner]);

  // If stopped, clear winner
  useEffect(() => {
    if (engineLinear.status === "idle") {
      setWinner(null);
    }
  }, [engineLinear.status]);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Race Controls Header */}
      <div className="glass-card premium-border p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              // Quick hack to make them share the same data:
              // Re-initialize linear, then we will need a way to pass it to binary.
              // For now, they might just search different arrays. Let's fix useSearchEngine first!
              engineLinear.initialize(arraySize, true);
            }}
            disabled={engineLinear.status === "running"}
            className="bg-[#111111] hover:bg-zinc-800 text-white border border-brand-border px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Shuffle Data
          </button>
          
          {engineLinear.status === "idle" ? (
            <button
              onClick={() => {
                setWinner(null);
                // In a real app we'd sync the arrays here.
                engineLinear.run(linearSearch, engineLinear.array, engineLinear.target);
                engineBinary.run(binarySearch, engineLinear.array, engineLinear.target);
              }}
              className="bg-white text-black hover:bg-zinc-200 px-6 py-2 rounded-md text-sm font-bold transition-colors flex items-center gap-2"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" height="14" width="14">
                <path d="M8 5v14l11-7z" />
              </svg>
              RACE
            </button>
          ) : (
            <button
              onClick={() => {
                engineLinear.stop();
                engineBinary.stop();
              }}
              className="bg-brand-rose/20 text-brand-rose hover:bg-brand-rose/30 border border-brand-rose/50 px-6 py-2 rounded-md text-sm font-bold transition-colors"
            >
              STOP
            </button>
          )}
        </div>

        {winner && (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-green">
              {winner === "linear" ? "Linear Search" : "Binary Search"} Wins!
            </span>
            <span className="text-2xl">🏆</span>
          </div>
        )}
      </div>

      {/* Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        <div className={`transition-opacity duration-300 ${winner === "binary" ? "opacity-50" : "opacity-100"}`}>
          <div className="bg-brand-bg-dark border border-brand-border rounded-t-lg p-2 text-center text-sm font-bold text-brand-text-secondary uppercase tracking-widest">
            Linear Search
          </div>
          <SearchVisualizer 
            array={engineLinear.array}
            statuses={engineLinear.statuses}
            target={engineLinear.target}
            metrics={engineLinear.metrics}
          />
        </div>
        <div className={`transition-opacity duration-300 ${winner === "linear" ? "opacity-50" : "opacity-100"}`}>
          <div className="bg-brand-bg-dark border border-brand-border rounded-t-lg p-2 text-center text-sm font-bold text-brand-text-secondary uppercase tracking-widest">
            Binary Search
          </div>
          <SearchVisualizer 
            // We pass engineLinear.array and target so it renders the exact same data!
            // The statuses come from the binary engine.
            array={engineLinear.array}
            statuses={engineBinary.statuses}
            target={engineLinear.target}
            metrics={engineBinary.metrics}
          />
        </div>
      </div>
    </div>
  );
}
