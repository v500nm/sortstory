"use client";

import { usePathfindingEngine } from "@/hooks/usePathfindingEngine";
import { pathfindingAlgorithms } from "@/lib/pathfinding";

interface Props {
  engine: ReturnType<typeof usePathfindingEngine>;
}

export default function PathfindingControls({ engine }: Props) {
  const { status, run, pause, stop, clearBoard, clearPath } = engine;
  const isBusy = status === "running" || status === "paused";

  const handleRunClick = () => {
    // Hardcoded to Dijkstra for now
    run(pathfindingAlgorithms.dijkstra);
  };

  return (
    <aside className="glass-card premium-border p-6 space-y-6 relative overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#111111] flex items-center justify-center border border-brand-border">
            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16" className="text-white">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold tracking-wide text-brand-text-primary">CONTROLS</h2>
        </div>
        {/* Status indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0a0a0a] border border-brand-border">
          <span className={`w-2 h-2 rounded-full ${
            status === "running" ? "bg-brand-green animate-pulse" :
            status === "paused" ? "bg-brand-yellow animate-pulse" :
            status === "completed" ? "bg-brand-green" :
            "bg-brand-border-light"
          }`} />
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-text-secondary">
            {status}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">ALGORITHM</label>
          <div className="p-3 bg-[#0a0a0a] border border-brand-border rounded-lg">
            <div className="text-sm font-semibold text-white">Dijkstra's Algorithm</div>
            <div className="text-xs text-brand-text-secondary mt-1">Guarantees shortest path.</div>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">ACTIONS</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={clearPath}
              disabled={isBusy}
              className="py-2.5 px-4 bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-xs font-semibold tracking-wide transition-colors disabled:opacity-50"
            >
              CLEAR PATH
            </button>
            <button
              onClick={clearBoard}
              disabled={isBusy}
              className="py-2.5 px-4 bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-xs font-semibold tracking-wide transition-colors disabled:opacity-50"
            >
              CLEAR BOARD
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-brand-border/50">
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
        ) : (
          <div className="flex gap-2">
            {status === "running" ? (
              <button
                onClick={pause}
                className="flex-1 py-3.5 bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-sm font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                PAUSE
              </button>
            ) : (
              <button
                onClick={handleRunClick}
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
