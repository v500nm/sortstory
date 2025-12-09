"use client";

interface ControlsPanelProps {
  selectedAlgo: string;
  setSelectedAlgo: (algo: string) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  onRun: () => void;
  onShuffle: () => void;
  isRunning: boolean;
}

const algorithms = [
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
];

const algorithmInfo: Record<string, { description: string; time: string; space: string }> = {
  bubbleSort: {
    description: "Bubble Sort: Compares adjacent elements and swaps them if in wrong order.",
    time: "O(n²)",
    space: "O(1)",
  },
  selectionSort: {
    description: "Selection Sort: Finds minimum element and places it at the beginning.",
    time: "O(n²)",
    space: "O(1)",
  },
  insertionSort: {
    description: "Insertion Sort: Builds sorted array one item at a time by inserting elements.",
    time: "O(n²)",
    space: "O(1)",
  },
  mergeSortWrapper: {
    description: "Merge Sort: Divides array in half, sorts each half, then merges them.",
    time: "O(n log n)",
    space: "O(n)",
  },
  quickSortWrapper: {
    description: "Quick Sort: Divides array using pivot and recursively sorts partitions.",
    time: "O(n log n)",
    space: "O(log n)",
  },
  heapSort: {
    description: "Heap Sort: Converts array to heap structure and extracts elements in order.",
    time: "O(n log n)",
    space: "O(1)",
  },
  shellSort: {
    description: "Shell Sort: Generalized insertion sort that allows exchanges of far items.",
    time: "O(n log n)",
    space: "O(1)",
  },
  cocktailSort: {
    description: "Cocktail Sort: Bidirectional bubble sort that traverses in both directions.",
    time: "O(n²)",
    space: "O(1)",
  },
  combSort: {
    description: "Comb Sort: Improved bubble sort that eliminates small values at end.",
    time: "O(n²/2ᵖ)",
    space: "O(1)",
  },
  gnomeSort: {
    description: "Gnome Sort: Similar to insertion sort but moving element to proper place.",
    time: "O(n²)",
    space: "O(1)",
  },
  oddEvenSort: {
    description: "Odd-Even Sort: Compares all odd/even indexed pairs of adjacent elements.",
    time: "O(n²)",
    space: "O(1)",
  },
  pancakeSort: {
    description: "Pancake Sort: Sorts by flipping prefix of array to move elements.",
    time: "O(n²)",
    space: "O(1)",
  },
  bitonicSortWrapper: {
    description: "Bitonic Sort: Parallel sorting algorithm that creates bitonic sequences.",
    time: "O(log²n)",
    space: "O(log²n)",
  },
  radixSort: {
    description: "Radix Sort: Non-comparative sort that groups by individual digits.",
    time: "O(nk)",
    space: "O(n+k)",
  },
  stoogeSortWrapper: {
    description: "Stooge Sort: Recursive sorting with unusual divide-and-conquer approach.",
    time: "O(n²·⁷⁰⁹)",
    space: "O(n)",
  },
  bogoSort: {
    description: "Bogo Sort: Randomizes array until sorted. Extremely inefficient!",
    time: "O(∞)",
    space: "O(1)",
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
  onShuffle,
  isRunning,
}: ControlsPanelProps) {
  const info = algorithmInfo[selectedAlgo] || algorithmInfo.bubbleSort;

  return (
    <aside className="bg-brand-bg-light p-6 rounded-xl shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <svg
            className="text-brand-text-primary"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="7" width="7" x="3" y="3"></rect>
            <rect height="7" width="7" x="14" y="3"></rect>
            <rect height="7" width="7" x="3" y="14"></rect>
            <rect height="7" width="7" x="14" y="14"></rect>
          </svg>
          <h2 className="text-lg font-semibold">Controls</h2>
        </div>
        <div className="flex items-center gap-3 text-brand-text-secondary">
          <svg
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <svg
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="16" y2="12"></line>
            <line x1="12" x2="12.01" y1="8" y2="8"></line>
          </svg>
        </div>
      </div>

      {/* Array Size Slider */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-brand-text-secondary" htmlFor="array-size">
          <span>Array Size</span>
        </label>
        <div className="flex items-center gap-4">
          <span className="text-xs text-brand-text-secondary">5</span>
          <input
            className="w-full range-slider"
            id="array-size"
            max="30"
            min="5"
            type="range"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isRunning}
          />
          <span className="text-xs text-brand-text-secondary">30</span>
        </div>
      </div>

      {/* Speed Slider */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-brand-text-secondary" htmlFor="speed">
          <span>Speed</span>
        </label>
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
          <div className="flex justify-between text-xs text-brand-text-secondary mt-1 px-1">
            <span>Fast</span>
            <span>Medium</span>
            <span>Slow</span>
          </div>
        </div>
      </div>

      {/* Algorithm Selector */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-brand-text-secondary" htmlFor="algorithm">
          <span>Algorithm</span>
        </label>
        <select
          className="w-full bg-brand-bg-dark border border-brand-border rounded-md py-2 px-3 text-brand-text-primary focus:ring-brand-purple focus:border-brand-purple"
          id="algorithm"
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          disabled={isRunning}
        >
          {algorithms.map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.label}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <button
          onClick={onShuffle}
          disabled={isRunning}
          className="flex items-center justify-center gap-2 bg-transparent border border-brand-border rounded-md py-2 px-4 hover:bg-brand-border/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" x2="21" y1="20" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" x2="21" y1="15" y2="21"></line>
            <line x1="4" x2="9" y1="4" y2="9"></line>
          </svg>
          Shuffle
        </button>
        <button
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center justify-center gap-2 text-black font-semibold rounded-md py-2 px-4 transition-colors bg-brand-yellow hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            fill="currentColor"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          {isRunning ? "Running..." : "Resume"}
        </button>
      </div>

      {/* Algorithm Info Box */}
      <div className="bg-brand-bg-dark p-4 rounded-lg space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <svg
            className="text-brand-text-secondary"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="16" y2="12"></line>
            <line x1="12" x2="12.01" y1="8" y2="8"></line>
          </svg>
          Algorithm Info
        </h3>
        <p className="text-sm text-brand-text-secondary">{info.description}</p>
        <div className="flex justify-between text-xs text-brand-text-secondary">
          <span>Time: {info.time}</span>
          <span>Space: {info.space}</span>
        </div>
      </div>
    </aside>
  );
}