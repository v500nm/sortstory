"use client";
import { useState } from "react";
import { useSearchEngine } from "@/hooks/useSearchEngine";
import { linearSearch, binarySearch } from "@/lib/search";
import type { SearchAlgorithmFn } from "@/lib/search/types";

interface Props {
  engine: ReturnType<typeof useSearchEngine>;
  selectedAlgo: string;
  setSelectedAlgo: (algo: string) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  raceMode: boolean;
  setRaceMode: (mode: boolean) => void;
}

const ALGORITHMS = [
  { value: "linearSearch", label: "Linear Search" },
  { value: "binarySearch", label: "Binary Search" },
];

const ALGORITHM_INFO: Record<string, { description: string; time: string; space: string }> = {
  linearSearch: {
    description: "Searches elements one by one. Works on unsorted arrays.",
    time: "O(n)",
    space: "O(1)",
  },
  binarySearch: {
    description: "Divides search space in half each step. Requires a sorted array.",
    time: "O(log n)",
    space: "O(1)",
  },
};

const algoMap: Record<string, SearchAlgorithmFn> = {
  linearSearch,
  binarySearch,
};

export default function SearchControls({
  engine,
  selectedAlgo,
  setSelectedAlgo,
  arraySize,
  setArraySize,
  raceMode,
  setRaceMode,
}: Props) {
  const { status, run, pause, resume, stop, initialize, speed, setSpeed, array, target } = engine;
  const [customInput, setCustomInput] = useState("");
  const isBusy = status === "running" || status === "paused";
  const info = ALGORITHM_INFO[selectedAlgo] || ALGORITHM_INFO.linearSearch;

  const handleRunClick = () => {
    const algo = algoMap[selectedAlgo];
    if (algo) {
      // If binary search is selected and array isn't explicitly sorted, 
      // we might want to re-initialize as sorted, but for simplicity we rely on page-level orchestrator
      // or we just sort a copy before running if it's binary search
      run(algo, array, target);
    }
  };

  return (
    <aside className="card-3d p-6 space-y-5 relative overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#111111] flex items-center justify-center border border-brand-border">
            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16" className="text-white">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            </svg>
          </div>
          <h2 className="text-lg font-semibold tracking-wide text-brand-text-primary">
            CONTROLS
          </h2>
        </div>
        {/* Status indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0a0a0a] border border-brand-border">
          <span
            className={`w-2 h-2 rounded-full ${
              status === "running"
                ? "bg-brand-green animate-pulse"
                : status === "paused"
                ? "bg-brand-yellow animate-pulse"
                : status === "completed"
                ? "bg-brand-green"
                : status === "not_found"
                ? "bg-brand-rose"
                : "bg-brand-border-light"
            }`}
          />
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-text-secondary">
            {status === "not_found" ? "NOT FOUND" : status}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {/* Algorithm Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            ALGORITHM
          </label>
          <select
            className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2.5 px-3 text-brand-text-primary focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all outline-none text-sm"
            value={selectedAlgo}
            onChange={(e) => {
              setSelectedAlgo(e.target.value);
              initialize(arraySize, e.target.value === "binarySearch");
            }}
            disabled={isBusy || raceMode}
          >
            {ALGORITHMS.map((algo) => (
              <option key={algo.value} value={algo.value}>
                {algo.label}
              </option>
            ))}
          </select>
          {/* Algorithm info */}
          <div className="p-3 bg-[#0a0a0a] border border-brand-border rounded-lg space-y-2">
            <p className="text-xs text-brand-text-secondary leading-relaxed">
              {info.description}
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="bg-[#111111] border border-brand-border px-2 py-0.5 rounded text-brand-yellow font-semibold">
                {info.time}
              </span>
              <span className="bg-[#111111] border border-brand-border px-2 py-0.5 rounded text-brand-cyan font-semibold">
                {info.space}
              </span>
            </div>
          </div>
        </div>

        {/* Array Generation & Size */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
              ARRAY SIZE
            </label>
            <span className="text-xs font-mono bg-[#111111] px-2 py-0.5 rounded border border-brand-border text-white">
              {arraySize}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="40"
            value={arraySize}
            onChange={(e) => {
              const size = parseInt(e.target.value);
              setArraySize(size);
              
              let customValues: number[] | undefined = undefined;
              if (customInput.trim()) {
                 customValues = customInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                 if (customValues.length === 0) customValues = undefined;
              }
              
              initialize(size, selectedAlgo === "binarySearch" || raceMode, customValues);
            }}
            disabled={isBusy}
            className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-purple"
          />
        </div>

        {/* Custom Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            CUSTOM ARRAY (COMMA SEPARATED)
          </label>
          <input
            type="text"
            placeholder="e.g. 15, 42, 8, 100"
            value={customInput}
            onChange={(e) => {
               setCustomInput(e.target.value);
            }}
            onBlur={() => {
              let customValues: number[] | undefined = undefined;
              if (customInput.trim()) {
                 customValues = customInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                 if (customValues.length === 0) customValues = undefined;
              }
              initialize(arraySize, selectedAlgo === "binarySearch" || raceMode, customValues);
            }}
            disabled={isBusy}
            className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2 px-3 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-purple outline-none"
          />
        </div>

        {/* Speed Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
              SPEED
            </label>
            <span className="text-xs font-mono text-brand-text-primary bg-[#111111] px-2 py-0.5 rounded border border-brand-border">
              {speed === 1 ? "Fast" : speed === 2 ? "Normal" : "Slow"}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            disabled={isBusy}
          />
          <div className="flex justify-between text-[10px] text-brand-text-secondary px-1">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>

        {/* Race Mode Toggle */}
        <div className="flex items-center justify-between p-3 bg-brand-bg-dark border border-brand-border rounded-lg">
          <div>
            <div className="text-sm font-semibold text-brand-accent">Race Mode</div>
            <div className="text-xs text-brand-text-secondary">Linear vs Binary</div>
          </div>
          <button
            onClick={() => {
              setRaceMode(!raceMode);
              if (!raceMode) {
                // Ensure sorted for binary search in race mode
                let customValues: number[] | undefined = undefined;
                if (customInput.trim()) {
                   customValues = customInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                   if (customValues.length === 0) customValues = undefined;
                }
                initialize(arraySize, true, customValues);
              } else {
                let customValues: number[] | undefined = undefined;
                if (customInput.trim()) {
                   customValues = customInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                   if (customValues.length === 0) customValues = undefined;
                }
                initialize(arraySize, selectedAlgo === "binarySearch", customValues);
              }
            }}
            disabled={isBusy}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-brand-bg-dark ${
              raceMode ? "bg-brand-purple" : "bg-brand-border"
            } ${isBusy ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                raceMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
      </div>

      {/* Main Actions */}
      <div className="space-y-3 pt-4 border-t border-brand-border/50">
        {!isBusy ? (
          <button
            onClick={handleRunClick}
            className="btn-3d btn-3d-white w-full font-bold py-3 px-4 flex items-center justify-center gap-2 tracking-wide"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" height="16" width="16">
              <path d="M8 5v14l11-7z" />
            </svg>
            START SEARCH
          </button>
        ) : status === "paused" ? (
          <button
            onClick={resume}
            className="btn-3d btn-3d-white w-full font-bold py-3 px-4 flex items-center justify-center gap-2 tracking-wide"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" height="16" width="16">
              <path d="M8 5v14l11-7z" />
            </svg>
            RESUME
          </button>
        ) : (
          <button
            onClick={pause}
            className="btn-3d btn-3d-yellow w-full font-bold py-3 px-4 flex items-center justify-center gap-2 tracking-wide"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" height="16" width="16">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            PAUSE
          </button>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => initialize(arraySize, selectedAlgo === "binarySearch" || raceMode)}
            disabled={isBusy}
            className="btn-3d text-white font-medium py-2.5 px-4 flex items-center justify-center gap-2 text-sm"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" height="14" width="14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Shuffle
          </button>
          
          <button
            onClick={stop}
            disabled={!isBusy}
            className="btn-3d btn-3d-rose font-medium py-2.5 px-4 flex items-center justify-center gap-2 text-sm"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" height="14" width="14">
              <path d="M6 6h12v12H6z" />
            </svg>
            Stop
          </button>
        </div>
      </div>
    </aside>
  );
}
