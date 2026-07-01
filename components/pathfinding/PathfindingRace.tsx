"use client";

import { useCallback, useRef, useEffect } from "react";
import GridVisualizer from "./GridVisualizer";
import { usePathfindingEngine } from "@/hooks/usePathfindingEngine";
import { pathfindingAlgorithms, mazeAlgorithms } from "@/lib/pathfinding";
import type { PathfindingAlgorithmFn, MazeAlgorithmFn } from "@/lib/pathfinding/types";

interface PathfindingRaceProps {
  speed: number;
  obstacleDensity: number;
}

const algoMap: Record<string, PathfindingAlgorithmFn> = {
  dijkstra: pathfindingAlgorithms.dijkstra,
  aStar: pathfindingAlgorithms.aStar,
};

export default function PathfindingRace({ speed, obstacleDensity }: PathfindingRaceProps) {
  const engineA = usePathfindingEngine();
  const engineB = usePathfindingEngine();
  const hasStarted = useRef(false);

  // Sync speed
  useEffect(() => {
    engineA.setSpeed(speed);
    engineB.setSpeed(speed);
  }, [speed, engineA.setSpeed, engineB.setSpeed]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sync walls from A to B ──
  const syncWalls = useCallback(() => {
    const walls = engineA.getWallLayout();
    engineB.applyWallLayout(walls);
  }, [engineA, engineB]);

  // ── Generate shared maze ──
  const handleMaze = useCallback(
    (mazeAlgo: MazeAlgorithmFn) => {
      // Generate on engine A, then sync to B
      engineA.runMaze(mazeAlgo);
      // We can't sync immediately because maze gen is animated.
      // User will need to click RACE after maze gen finishes.
    },
    [engineA]
  );

  // ── Generate shared random walls ──
  const handleRandomWalls = useCallback(() => {
    engineA.generateRandomWalls(obstacleDensity);
    // Sync after a tick for state to settle
    setTimeout(() => {
      syncWalls();
    }, 50);
  }, [engineA, obstacleDensity, syncWalls]);

  // ── Race: Dijkstra vs A* ──
  const handleRace = useCallback(() => {
    // Sync walls from A to B
    syncWalls();

    // Wait for sync to settle, then run both
    setTimeout(() => {
      // Clear any previous paths
      engineA.clearPath();
      engineB.clearPath();

      setTimeout(() => {
        // Sync again after clear
        const walls = engineA.getWallLayout();
        engineB.applyWallLayout(walls);

        setTimeout(() => {
          engineA.run(algoMap.dijkstra);
          engineB.run(algoMap.aStar);
          hasStarted.current = true;
        }, 50);
      }, 50);
    }, 50);
  }, [engineA, engineB, syncWalls]);

  // ── Stop both ──
  const handleStop = useCallback(() => {
    engineA.stop();
    engineB.stop();
    hasStarted.current = false;
  }, [engineA, engineB]);

  // ── Clear both ──
  const handleClearBoard = useCallback(() => {
    engineA.clearBoard();
    engineB.clearBoard();
    hasStarted.current = false;
  }, [engineA, engineB]);

  const handleClearPath = useCallback(() => {
    engineA.clearPath();
    engineB.clearPath();
  }, [engineA, engineB]);

  const isBusy =
    engineA.status === "running" ||
    engineA.status === "paused" ||
    engineA.status === "generating" ||
    engineB.status === "running" ||
    engineB.status === "paused";

  const isGenerating = engineA.status === "generating";

  const bothDone =
    engineA.status === "completed" && engineB.status === "completed";

  const winnerA =
    bothDone && engineA.metrics.evaluatedNodes < engineB.metrics.evaluatedNodes;
  const winnerB =
    bothDone && engineB.metrics.evaluatedNodes < engineA.metrics.evaluatedNodes;
  const tie =
    bothDone &&
    engineA.metrics.evaluatedNodes === engineB.metrics.evaluatedNodes;

  return (
    <div className="space-y-4">
      {/* Race Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between glass-card premium-border p-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#111111] border border-brand-border flex items-center justify-center">
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
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide">RACE MODE</h2>
            <p className="text-xs font-mono text-brand-text-secondary mt-0.5">
              <span className="text-brand-cyan">Dijkstra</span>
              <span className="mx-2 text-brand-border-light">vs</span>
              <span className="text-brand-yellow">A* Search</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Maze buttons */}
          <button
            onClick={() => handleMaze(mazeAlgorithms.recursiveBacktracking)}
            disabled={isBusy}
            className="flex items-center gap-1.5 bg-[#171717] border border-brand-border rounded-md py-2 px-3 hover:bg-[#27272a] transition-all text-[11px] font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed text-white"
          >
            <svg fill="none" height="10" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="10" className="text-brand-purple">
              <path d="M3 3h18v18H3zM9 3v6M15 9v6" />
            </svg>
            MAZE
          </button>
          <button
            onClick={handleRandomWalls}
            disabled={isBusy}
            className="flex items-center gap-1.5 bg-[#171717] border border-brand-border rounded-md py-2 px-3 hover:bg-[#27272a] transition-all text-[11px] font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed text-white"
          >
            WALLS {Math.round(obstacleDensity * 100)}%
          </button>
          <button
            onClick={handleClearPath}
            disabled={isBusy}
            className="flex items-center gap-1.5 bg-[#171717] border border-brand-border rounded-md py-2 px-3 hover:bg-[#27272a] transition-all text-[11px] font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed text-white"
          >
            CLEAR PATH
          </button>
          <button
            onClick={handleClearBoard}
            disabled={isBusy}
            className="flex items-center gap-1.5 bg-[#171717] border border-brand-border rounded-md py-2 px-3 hover:bg-[#27272a] transition-all text-[11px] font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed text-white"
          >
            CLEAR ALL
          </button>

          {/* Race / Stop */}
          {!isBusy && !isGenerating ? (
            <button
              onClick={handleRace}
              className="flex items-center gap-1.5 text-black font-bold tracking-wide rounded-md py-2 px-5 transition-all bg-white hover:bg-gray-200 text-xs"
            >
              <svg
                fill="currentColor"
                height="12"
                viewBox="0 0 24 24"
                width="12"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              RACE
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex items-center gap-1.5 bg-brand-border text-white font-bold tracking-wide rounded-md py-2 px-5 hover:bg-brand-border-light transition-all text-xs"
            >
              <svg
                fill="currentColor"
                height="12"
                viewBox="0 0 24 24"
                width="12"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
              STOP
            </button>
          )}
        </div>
      </div>

      {/* Winner Banner */}
      {bothDone && (
        <div
          className={`text-center py-3 rounded-xl border ${
            tie
              ? "bg-brand-purple/10 border-brand-purple/30"
              : "bg-emerald-500/10 border-emerald-500/30"
          }`}
        >
          {tie ? (
            <span className="text-brand-purple font-semibold">
              🤝 It&apos;s a tie!
            </span>
          ) : (
            <span className="text-emerald-400 font-semibold">
              🏆 {winnerA ? "Dijkstra" : "A* Search"} wins!
              <span className="text-brand-text-secondary font-normal ml-2">
                ({winnerA
                  ? engineA.metrics.evaluatedNodes
                  : engineB.metrics.evaluatedNodes}{" "}
                vs{" "}
                {winnerA
                  ? engineB.metrics.evaluatedNodes
                  : engineA.metrics.evaluatedNodes}{" "}
                nodes evaluated)
              </span>
            </span>
          )}
        </div>
      )}

      {/* Dual Grid Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Panel A - Dijkstra */}
        <div
          className={`rounded-xl ${
            winnerA ? "ring-2 ring-emerald-400/50" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
            <span className="text-sm font-semibold">Dijkstra&apos;s Algorithm</span>
            <span className="text-xs bg-brand-cyan/10 text-brand-cyan px-2 py-0.5 rounded ml-auto font-mono">
              O(V²)
            </span>
            {winnerA && <span className="text-xs text-emerald-400">🏆</span>}
          </div>
          <GridVisualizer engine={engineA} compact label="DIJKSTRA" />
        </div>

        {/* Panel B - A* */}
        <div
          className={`rounded-xl ${
            winnerB ? "ring-2 ring-emerald-400/50" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-sm font-semibold">A* Search</span>
            <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded ml-auto font-mono">
              O(E log V)
            </span>
            {winnerB && <span className="text-xs text-emerald-400">🏆</span>}
          </div>
          <GridVisualizer engine={engineB} compact label="A* SEARCH" />
        </div>
      </div>
    </div>
  );
}
