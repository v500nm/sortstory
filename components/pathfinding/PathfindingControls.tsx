"use client";

import { usePathfindingEngine } from "@/hooks/usePathfindingEngine";
import { pathfindingAlgorithms, mazeAlgorithms } from "@/lib/pathfinding";
import type { PathfindingAlgorithmFn } from "@/lib/pathfinding/types";

interface Props {
  engine: ReturnType<typeof usePathfindingEngine>;
  selectedAlgo: string;
  setSelectedAlgo: (algo: string) => void;
  raceMode: boolean;
  setRaceMode: (mode: boolean) => void;
  obstacleDensity: number;
  setObstacleDensity: (density: number) => void;
}

const ALGORITHMS = [
  { value: "dijkstra", label: "Dijkstra's Algorithm" },
  { value: "aStar", label: "A* Search" },
];

const ALGORITHM_INFO: Record<string, { description: string; time: string; space: string }> = {
  dijkstra: {
    description: "Explores all directions uniformly. Guarantees shortest path.",
    time: "O(V²)",
    space: "O(V)",
  },
  aStar: {
    description: "Heuristic-guided search. Explores fewer nodes than Dijkstra.",
    time: "O(E log V)",
    space: "O(V)",
  },
};

export { ALGORITHMS, ALGORITHM_INFO };

const algoMap: Record<string, PathfindingAlgorithmFn> = {
  dijkstra: pathfindingAlgorithms.dijkstra,
  aStar: pathfindingAlgorithms.aStar,
};

export default function PathfindingControls({
  engine,
  selectedAlgo,
  setSelectedAlgo,
  raceMode,
  setRaceMode,
  obstacleDensity,
  setObstacleDensity,
}: Props) {
  const { status, run, pause, resume, stop, clearBoard, clearPath, runMaze, generateRandomWalls, speed, setSpeed } = engine;
  const isBusy = status === "running" || status === "paused" || status === "generating";
  const isGenerating = status === "generating";
  const info = ALGORITHM_INFO[selectedAlgo] || ALGORITHM_INFO.dijkstra;

  const handleRunClick = () => {
    const algo = algoMap[selectedAlgo];
    if (algo) run(algo);
  };

  const handleResumeClick = () => {
    resume();
  };

  return (
    <aside className="glass-card premium-border p-6 space-y-5 relative overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#111111] flex items-center justify-center border border-brand-border">
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              width="16"
              className="text-white"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
                : status === "generating"
                ? "bg-brand-purple animate-pulse"
                : status === "completed"
                ? "bg-brand-green"
                : "bg-brand-border-light"
            }`}
          />
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-text-secondary">
            {status === "generating" ? "GENERATING" : status}
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {/* Algorithm Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            ALGORITHM
          </label>
          <select
            className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2.5 px-3 text-brand-text-primary focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all outline-none text-sm"
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            disabled={isBusy}
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

        {/* Speed Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
              SPEED
            </label>
            <span className="text-xs font-mono bg-brand-bg-dark px-2 py-0.5 rounded border border-brand-border text-brand-text-primary">
              {speed === 1 ? "Fast" : speed === 2 ? "Medium" : "Slow"}
            </span>
          </div>
          <div className="relative">
            <input
              className="w-full range-slider"
              max="3"
              min="1"
              type="range"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-brand-text-secondary mt-1 px-0.5">
              <span>Fast</span>
              <span>Medium</span>
              <span>Slow</span>
            </div>
          </div>
        </div>

        {/* Maze Generation */}
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            MAZE GENERATION
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => runMaze(mazeAlgorithms.recursiveBacktracking)}
              disabled={isBusy}
              className="py-2 px-3 bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-[11px] font-semibold tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-white"
            >
              <div className="flex flex-col items-center gap-1">
                <svg fill="none" height="14" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="14" className="text-brand-purple">
                  <path d="M3 3h18v18H3zM9 3v6M15 9v6M3 9h6M9 15h12M15 9h6" />
                </svg>
                <span>BACKTRACK</span>
              </div>
            </button>
            <button
              onClick={() => runMaze(mazeAlgorithms.primsMaze)}
              disabled={isBusy}
              className="py-2 px-3 bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-[11px] font-semibold tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-white"
            >
              <div className="flex flex-col items-center gap-1">
                <svg fill="none" height="14" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="14" className="text-brand-green">
                  <path d="M12 3v18M3 12h18M7.5 7.5L12 3l4.5 4.5M7.5 16.5L12 21l4.5-4.5" />
                </svg>
                <span>PRIM&apos;S</span>
              </div>
            </button>
          </div>
        </div>

        {/* Obstacle Density */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
              RANDOM WALLS
            </label>
            <span className="text-xs font-mono bg-brand-bg-dark px-2 py-0.5 rounded border border-brand-border text-brand-text-primary">
              {Math.round(obstacleDensity * 100)}%
            </span>
          </div>
          <input
            className="w-full range-slider"
            max="50"
            min="0"
            type="range"
            value={Math.round(obstacleDensity * 100)}
            onChange={(e) => setObstacleDensity(Number(e.target.value) / 100)}
            disabled={isBusy}
          />
          <button
            onClick={() => generateRandomWalls(obstacleDensity)}
            disabled={isBusy}
            className="w-full py-2 bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-xs font-semibold tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-white"
          >
            GENERATE WALLS
          </button>
        </div>

        {/* Race Mode Toggle */}
        <div className="flex items-center justify-between py-1 px-1">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            RACE MODE
          </label>
          <button
            onClick={() => setRaceMode(!raceMode)}
            disabled={isBusy}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 disabled:opacity-50 ${
              raceMode ? "bg-brand-purple" : "bg-brand-border"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                raceMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Board Actions */}
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            ACTIONS
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={clearPath}
              disabled={isBusy}
              className="py-2.5 px-4 bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-xs font-semibold tracking-wide transition-colors disabled:opacity-50 text-white"
            >
              CLEAR PATH
            </button>
            <button
              onClick={clearBoard}
              disabled={isBusy}
              className="py-2.5 px-4 bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-xs font-semibold tracking-wide transition-colors disabled:opacity-50 text-white"
            >
              CLEAR BOARD
            </button>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons — Pinned to bottom */}
      <div className="pt-4 border-t border-brand-border/50 flex-shrink-0">
        {!isBusy ? (
          <button
            onClick={handleRunClick}
            className="w-full py-3.5 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            START VISUALIZATION
          </button>
        ) : isGenerating ? (
          <button
            onClick={stop}
            className="w-full py-3.5 bg-brand-border hover:bg-brand-border-light text-white rounded-lg text-sm font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
            STOP GENERATION
          </button>
        ) : (
          <div className="flex gap-2">
            {status === "running" ? (
              <button
                onClick={pause}
                className="flex-1 py-3.5 bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-sm font-bold tracking-wider transition-colors flex items-center justify-center gap-2 text-white"
              >
                <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                PAUSE
              </button>
            ) : (
              <button
                onClick={handleResumeClick}
                className="flex-1 py-3.5 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                RESUME
              </button>
            )}
            <button
              onClick={stop}
              className="flex-1 py-3.5 bg-brand-border hover:bg-brand-border-light text-white rounded-lg text-sm font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
              STOP
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
