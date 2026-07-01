"use client";
import type { EngineStatus } from "@/lib/types";

interface ControlsPanelProps {
  selectedAlgo: string;
  setSelectedAlgo: (algo: string) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  onRun: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onShuffle: () => void;
  status: EngineStatus;
  compareMode: boolean;
  setCompareMode: (mode: boolean) => void;
  selectedAlgoB?: string;
  setSelectedAlgoB?: (algo: string) => void;
}

export const algorithms = [
  { value: "bubbleSort", label: "Bubble Sort" },
  { value: "selectionSort", label: "Selection Sort" },
  { value: "insertionSort", label: "Insertion Sort" },
  { value: "mergeSortWrapper", label: "Merge Sort" },
  { value: "quickSortWrapper", label: "Quick Sort" },
  { value: "heapSort", label: "Heap Sort" },
  { value: "shellSort", label: "Shell Sort" },
  { value: "cocktailSort", label: "Cocktail Sort" },
  { value: "combSort", label: "Comb Sort" },
  { value: "gnomeSort", label: "Gnome Sort" },
  { value: "oddEvenSort", label: "Odd-Even Sort" },
  { value: "pancakeSort", label: "Pancake Sort" },
  { value: "bitonicSortWrapper", label: "Bitonic Sort" },
  { value: "radixSort", label: "Radix Sort" },
  { value: "stoogeSortWrapper", label: "Stooge Sort" },
  { value: "bogoSort", label: "Bogo Sort" },
  { value: "timSort", label: "Tim Sort" },
  { value: "introSort", label: "Intro Sort" },
];

export const algorithmInfo: Record<string, { description: string; time: string; space: string }> = {
  bubbleSort: {
    description: "Compares adjacent elements and swaps them if in wrong order. Simple but O(n²).",
    time: "O(n²)",
    space: "O(1)",
  },
  selectionSort: {
    description: "Finds the minimum element and places it at the beginning each pass.",
    time: "O(n²)",
    space: "O(1)",
  },
  insertionSort: {
    description: "Builds sorted array one item at a time by inserting into correct position.",
    time: "O(n²)",
    space: "O(1)",
  },
  mergeSortWrapper: {
    description: "Divides array in half, sorts each half, then merges. Guaranteed O(n log n).",
    time: "O(n log n)",
    space: "O(n)",
  },
  quickSortWrapper: {
    description: "Partitions array around a pivot and recursively sorts partitions.",
    time: "O(n log n)",
    space: "O(log n)",
  },
  heapSort: {
    description: "Converts array to max-heap, then extracts max elements in order.",
    time: "O(n log n)",
    space: "O(1)",
  },
  shellSort: {
    description: "Generalized insertion sort using decreasing gap sequences.",
    time: "O(n log n)",
    space: "O(1)",
  },
  cocktailSort: {
    description: "Bidirectional bubble sort that traverses in both directions alternately.",
    time: "O(n²)",
    space: "O(1)",
  },
  combSort: {
    description: "Improved bubble sort using a shrinking gap to eliminate small values.",
    time: "O(n²/2ᵖ)",
    space: "O(1)",
  },
  gnomeSort: {
    description: "Moves elements to proper place by swapping backward, then advances forward.",
    time: "O(n²)",
    space: "O(1)",
  },
  oddEvenSort: {
    description: "Alternates between comparing odd-indexed and even-indexed adjacent pairs.",
    time: "O(n²)",
    space: "O(1)",
  },
  pancakeSort: {
    description: "Sorts by repeatedly flipping prefixes to move max elements into place.",
    time: "O(n²)",
    space: "O(1)",
  },
  bitonicSortWrapper: {
    description: "Parallel algorithm that creates and merges bitonic sequences.",
    time: "O(log²n)",
    space: "O(log²n)",
  },
  radixSort: {
    description: "Non-comparative sort that groups integers by individual digits (LSD).",
    time: "O(nk)",
    space: "O(n+k)",
  },
  stoogeSortWrapper: {
    description: "Recursive sort: sort first 2/3, last 2/3, first 2/3 again. Very slow.",
    time: "O(n².⁷⁰⁹)",
    space: "O(n)",
  },
  bogoSort: {
    description: "Randomly shuffles until sorted. Astronomically inefficient!",
    time: "O(∞)",
    space: "O(1)",
  },
  timSort: {
    description: "Hybrid sorting algorithm derived from merge sort and insertion sort.",
    time: "O(n log n)",
    space: "O(n)",
  },
  introSort: {
    description: "Hybrid sort that begins with quicksort and switches to heapsort to limit recursion depth.",
    time: "O(n log n)",
    space: "O(log n)",
  },
};

export default function ControlsPanel({
  selectedAlgo,
  setSelectedAlgo,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  onRun,
  onPause,
  onResume,
  onStop,
  onShuffle,
  status,
  compareMode,
  setCompareMode,
  selectedAlgoB,
  setSelectedAlgoB,
}: ControlsPanelProps) {
  const info = algorithmInfo[selectedAlgo] || algorithmInfo.bubbleSort;
  const isRunning = status === "running";
  const isPaused = status === "paused";
  const isBusy = isRunning || isPaused;

  return (
    <aside className="card-3d p-6 space-y-6 relative overflow-hidden h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#111111] flex items-center justify-center border border-brand-border">
            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16" className="text-white">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold tracking-wide text-brand-text-primary">CONTROLS</h2>
        </div>
        {/* Status indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0a0a0a] border border-brand-border">
          <span className={`w-2 h-2 rounded-full ${
            isRunning ? "bg-emerald-400 animate-pulse" :
            isPaused ? "bg-amber-400 animate-pulse" :
            status === "completed" ? "bg-emerald-400" :
            "bg-slate-500"
          }`} />
          <span className="text-xs text-brand-text-secondary capitalize">{status}</span>
        </div>
      </div>

      {/* Algorithm Selector */}
      <div className="space-y-2">
        <label className="text-sm text-brand-text-secondary font-medium" htmlFor="algorithm">
          {compareMode ? "Algorithm A" : "Algorithm"}
        </label>
        <select
          className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2.5 px-3 text-brand-text-primary focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all outline-none"
          id="algorithm"
          value={selectedAlgo}
          onChange={(e) => {
            setSelectedAlgo(e.target.value);
            onShuffle();
          }}
          disabled={isBusy}
        >
          {algorithms.map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.label}
            </option>
          ))}
        </select>
      </div>

      {/* Algorithm B Selector (Compare Mode) */}
      {compareMode && setSelectedAlgoB && (
        <div className="space-y-2">
          <label className="text-sm text-brand-text-secondary font-medium" htmlFor="algorithm-b">
            Algorithm B
          </label>
          <select
            className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2.5 px-3 text-brand-text-primary focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all outline-none"
            id="algorithm-b"
            value={selectedAlgoB || "selectionSort"}
            onChange={(e) => {
              setSelectedAlgoB(e.target.value);
              onShuffle();
            }}
            disabled={isBusy}
          >
            {algorithms.map((algo) => (
              <option key={algo.value} value={algo.value}>
                {algo.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Array Size Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm text-brand-text-secondary font-medium" htmlFor="array-size">
            Array Size
          </label>
          <span className="text-xs font-mono bg-brand-bg-dark px-2 py-0.5 rounded border border-brand-border text-brand-text-primary">{arraySize}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-brand-text-secondary">5</span>
          <input
            className="w-full range-slider"
            id="array-size"
            max="50"
            min="5"
            type="range"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isBusy}
          />
          <span className="text-xs text-brand-text-secondary">50</span>
        </div>
      </div>

      {/* Speed Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm text-brand-text-secondary font-medium" htmlFor="speed">
            Speed
          </label>
          <span className="text-xs font-mono bg-brand-bg-dark px-2 py-0.5 rounded border border-brand-border text-brand-text-primary">
            {speed === 1 ? "Fast" : speed === 2 ? "Medium" : "Slow"}
          </span>
        </div>
        <div className="relative">
          <input
            className="w-full range-slider"
            id="speed"
            max="3"
            min="1"
            type="range"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-brand-text-secondary mt-1 px-0.5">
            <span>Fast</span>
            <span>Medium</span>
            <span>Slow</span>
          </div>
        </div>
      </div>

      {/* Compare Mode Toggle */}
      <div className="flex items-center justify-between py-2 px-1">
        <label className="text-sm text-brand-text-secondary font-medium" htmlFor="compare-toggle">
          Compare Mode
        </label>
        <button
          id="compare-toggle"
          onClick={() => setCompareMode(!compareMode)}
          disabled={isBusy}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 disabled:opacity-50 ${
            compareMode ? "bg-brand-purple" : "bg-brand-border"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              compareMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 pt-1">
        {/* Shuffle */}
        <button
          onClick={onShuffle}
          disabled={isBusy}
          className="btn-3d flex items-center justify-center gap-1.5 py-2.5 px-3 text-sm text-brand-text-secondary hover:text-brand-accent"
        >
          <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" x2="21" y1="20" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" x2="21" y1="15" y2="21" />
            <line x1="4" x2="9" y1="4" y2="9" />
          </svg>
          Shuffle
        </button>

        {/* Play / Pause */}
        {!isBusy ? (
          <button
            onClick={onRun}
            className="btn-3d btn-3d-yellow flex items-center justify-center gap-1.5 font-semibold py-2.5 px-3"
          >
            <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Run
          </button>
        ) : isPaused ? (
          <button
            onClick={onResume}
            className="btn-3d btn-3d-yellow flex items-center justify-center gap-1.5 font-semibold py-2.5 px-3"
          >
            <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Resume
          </button>
        ) : (
          <button
            onClick={onPause}
            className="btn-3d btn-3d-yellow flex items-center justify-center gap-1.5 font-semibold py-2.5 px-3"
          >
            <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
            Pause
          </button>
        )}

        {/* Stop */}
        <button
          onClick={onStop}
          disabled={!isBusy}
          className="btn-3d btn-3d-rose flex items-center justify-center gap-1.5 py-2.5 px-3 text-sm font-semibold"
        >
          <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
          Stop
        </button>
      </div>
    </aside>
  );
}