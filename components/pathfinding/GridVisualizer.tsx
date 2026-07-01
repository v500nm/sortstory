"use client";

import { useState, useCallback } from "react";
import { usePathfindingEngine } from "@/hooks/usePathfindingEngine";

interface Props {
  engine: ReturnType<typeof usePathfindingEngine>;
  compact?: boolean;
  label?: string;
}

const NODE_COLORS: Record<string, string> = {
  empty: "bg-brand-bg-dark",
  wall: "bg-white",
  start: "bg-brand-green",
  end: "bg-brand-purple",
  visited: "bg-brand-cyan/40",
  path: "bg-brand-yellow",
  frontier: "bg-amber-500/60",
};

export default function GridVisualizer({ engine, compact, label }: Props) {
  const { grid, updateNode, status, metrics } = engine;
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [draggedNodeType, setDraggedNodeType] = useState<"start" | "end" | null>(null);

  const canInteract = status === "idle" || status === "completed";

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      if (!canInteract) return;
      const node = grid[row][col];

      setIsMousePressed(true);

      if (node.type === "start" || node.type === "end") {
        setDraggedNodeType(node.type);
      } else {
        updateNode(row, col, node.type === "wall" ? "empty" : "wall");
      }
    },
    [grid, canInteract, updateNode]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!canInteract) return;
      if (!isMousePressed) return;

      const node = grid[row][col];

      if (draggedNodeType) {
        if (node.type !== "start" && node.type !== "end") {
          updateNode(row, col, draggedNodeType);
        }
      } else {
        if (node.type !== "start" && node.type !== "end") {
          updateNode(row, col, node.type === "wall" ? "empty" : "wall");
        }
      }
    },
    [grid, isMousePressed, draggedNodeType, canInteract, updateNode]
  );

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
    setDraggedNodeType(null);
  }, []);

  return (
    <div className="glass-card premium-border flex flex-col flex-1 relative overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-brand-border flex justify-between items-center bg-black/20">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded flex items-center justify-center bg-brand-border">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-white"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <h2 className="text-sm font-semibold tracking-wider text-white">
            {label || "MAP VISUALIZATION"}
          </h2>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-2">
          <MetricBadge
            icon="nodes"
            label="Evaluated"
            value={metrics.evaluatedNodes}
            color="text-brand-cyan"
          />
          <MetricBadge
            icon="path"
            label="Path"
            value={metrics.pathLength}
            color="text-brand-yellow"
          />
          <MetricBadge
            icon="time"
            label=""
            value={formatTime(metrics.timeMs)}
            color="text-brand-green"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-b border-brand-border/50 bg-black/10">
        <div className="flex flex-wrap gap-4 text-xs font-medium text-brand-text-secondary">
          <LegendItem color="#000000" border label="Empty" />
          <LegendItem color="#ffffff" label="Wall" />
          <LegendItem color="#34d399" label="Start" />
          <LegendItem color="#818cf8" label="End" />
          <LegendItem color="rgba(34,211,238,0.4)" label="Visited" />
          <LegendItem color="#f59e0b" label="Frontier" />
          <LegendItem color="#fbbf24" label="Path" />
        </div>
      </div>

      {/* Grid */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center p-4 bg-black/40"
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        <div
          className="flex flex-col border border-brand-border select-none bg-brand-bg-dark"
          style={{ touchAction: "none" }}
        >
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((node, colIdx) => {
                const bgColor = NODE_COLORS[node.type] || "bg-brand-bg-dark";
                const isPath = node.type === "path";
                const isFrontier = node.type === "frontier";

                const cellSize = compact
                  ? "w-4 h-4 sm:w-5 sm:h-5"
                  : "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7";

                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    id={`node-${rowIdx}-${colIdx}`}
                    className={`${cellSize} border-[0.5px] border-brand-border/30 transition-all duration-200 ${bgColor} ${
                      isPath ? "scale-90 rounded-sm" : ""
                    } ${isFrontier ? "animate-pulse" : ""}`}
                    style={
                      isFrontier
                        ? { boxShadow: "0 0 6px rgba(245,158,11,0.4)" }
                        : undefined
                    }
                    onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                    onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──

function MetricBadge({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md border border-brand-border text-[11px] font-mono">
      {icon === "nodes" && (
        <svg
          fill="none"
          height="11"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          width="11"
          className={color}
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )}
      {icon === "path" && (
        <svg
          fill="none"
          height="11"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          width="11"
          className={color}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
      {icon === "time" && (
        <svg
          fill="none"
          height="11"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          width="11"
          className={color}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {label && (
        <span className="text-brand-text-secondary uppercase">{label}</span>
      )}
      <span className="text-white font-semibold">
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
    </div>
  );
}

function LegendItem({
  color,
  label,
  border,
}: {
  color: string;
  label: string;
  border?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`w-3 h-3 inline-block rounded-sm ${border ? "border border-brand-border" : ""}`}
        style={{ background: color }}
      />
      <span>{label}</span>
    </div>
  );
}

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}
