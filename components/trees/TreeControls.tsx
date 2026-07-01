import { useState, useEffect } from "react";
import { useTreeEngine } from "@/hooks/useTreeEngine";
import * as algorithms from "@/lib/trees/algorithms";

interface Props {
  engine: ReturnType<typeof useTreeEngine>;
  selectedAlgo: string;
  setSelectedAlgo: (algo: string) => void;
}

const ALGORITHMS = [
  { value: "searchBST", label: "Search BST" },
  { value: "insertBST", label: "Insert Node" },
  { value: "traverseInOrder", label: "In-Order Traversal" },
  { value: "traversePreOrder", label: "Pre-Order Traversal" },
  { value: "traversePostOrder", label: "Post-Order Traversal" },
];

export default function TreeControls({ engine, selectedAlgo, setSelectedAlgo }: Props) {
  const { status, run, pause, resume, stop, initializeTree, speed, setSpeed } = engine;
  const isBusy = status === "running" || status === "paused";

  const [customInput, setCustomInput] = useState("");
  const [targetValue, setTargetValue] = useState<number>(42);

  // Generate an initial tree on mount
  useEffect(() => {
    initializeTree([50, 25, 75, 12, 37, 60, 85]);
    // eslint-disable-next-exhaustive-deps
  }, []);

  const handleRunClick = () => {
    switch (selectedAlgo) {
      case "searchBST":
        run(algorithms.searchBST, targetValue);
        break;
      case "insertBST":
        run(algorithms.insertBST, targetValue);
        break;
      case "traverseInOrder":
        run(algorithms.traverseInOrder);
        break;
      case "traversePreOrder":
        run(algorithms.traversePreOrder);
        break;
      case "traversePostOrder":
        run(algorithms.traversePostOrder);
        break;
    }
  };

  const handleGenerate = () => {
    let customValues: number[] | undefined = undefined;
    if (customInput.trim()) {
      customValues = customInput
        .split(",")
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n));
    }
    
    if (customValues && customValues.length > 0) {
      initializeTree(customValues);
    } else {
      // Generate random tree
      const randomValues = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);
      initializeTree(randomValues);
    }
  };

  return (
    <aside className="h-full flex flex-col bg-brand-bg-card rounded-2xl border border-brand-border/50 shadow-2xl relative overflow-hidden">
      <div className="p-5 border-b border-brand-border/50 bg-black/40 backdrop-blur-xl z-10 flex justify-between items-center">
        <h2 className="text-sm font-semibold tracking-wider text-brand-accent">
          CONTROLS
        </h2>
        <div className="flex gap-2">
          <span className={`h-2 w-2 rounded-full ${isBusy ? "bg-brand-purple animate-pulse" : "bg-brand-text-secondary"}`} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Algorithm Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            ALGORITHM
          </label>
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            disabled={isBusy}
            className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2.5 px-3 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-purple outline-none"
          >
            {ALGORITHMS.map((algo) => (
              <option key={algo.value} value={algo.value}>
                {algo.label}
              </option>
            ))}
          </select>
        </div>

        {/* Target Value (for Search & Insert) */}
        {(selectedAlgo === "searchBST" || selectedAlgo === "insertBST") && (
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
              TARGET VALUE
            </label>
            <input
              type="number"
              value={Number.isNaN(targetValue) ? "" : targetValue}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setTargetValue(isNaN(val) ? 0 : val);
              }}
              disabled={isBusy}
              className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2 px-3 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-purple outline-none"
            />
          </div>
        )}

        {/* Tree Generation */}
        <div className="space-y-2 pt-2 border-t border-brand-border/30">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            GENERATE CUSTOM BST
          </label>
          <input
            type="text"
            placeholder="e.g. 50, 25, 75, 12"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            disabled={isBusy}
            className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2 px-3 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-purple outline-none"
          />
          <button
            onClick={handleGenerate}
            disabled={isBusy}
            className="w-full mt-2 py-2 bg-brand-bg-dark hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-xs font-semibold tracking-wide transition-colors text-brand-accent"
          >
            GENERATE TREE
          </button>
        </div>

        {/* Speed */}
        <div className="space-y-2 pt-2 border-t border-brand-border/30">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
              SPEED
            </label>
            <span className="text-xs font-mono text-brand-text-primary bg-[#111111] px-2 py-0.5 rounded border border-brand-border">
              {speed === 1 ? "Slow" : speed === 2 ? "Normal" : "Fast"}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={isBusy}
            className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-cyan"
          />
        </div>
      </div>

      {/* Main Actions */}
      <div className="p-5 border-t border-brand-border/50 bg-black/20">
        {!isBusy ? (
          <button
            onClick={handleRunClick}
            className="btn-3d btn-3d-white w-full font-bold py-3 px-4 flex items-center justify-center gap-2 tracking-wide"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" height="16" width="16">
              <path d="M8 5v14l11-7z" />
            </svg>
            START
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

        <button
          onClick={stop}
          disabled={!isBusy}
          className="mt-3 w-full btn-3d btn-3d-rose font-medium py-2.5 px-4 flex items-center justify-center gap-2 text-sm"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" height="14" width="14">
            <path d="M6 6h12v12H6z" />
          </svg>
          STOP
        </button>
      </div>
    </aside>
  );
}
