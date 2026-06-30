"use client";

import { useState, useCallback } from "react";
import { usePathfindingEngine } from "@/hooks/usePathfindingEngine";

interface Props {
  engine: ReturnType<typeof usePathfindingEngine>;
}

export default function GridVisualizer({ engine }: Props) {
  const { grid, updateNode, status } = engine;
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [draggedNodeType, setDraggedNodeType] = useState<"start" | "end" | null>(null);

  const handleMouseDown = useCallback((row: number, col: number) => {
    if (status !== "idle" && status !== "completed") return;
    const node = grid[row][col];
    
    setIsMousePressed(true);
    
    if (node.type === "start" || node.type === "end") {
      setDraggedNodeType(node.type);
    } else {
      updateNode(row, col, node.type === "wall" ? "empty" : "wall");
    }
  }, [grid, status, updateNode]);

  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (status !== "idle" && status !== "completed") return;
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
  }, [grid, isMousePressed, draggedNodeType, status, updateNode]);

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
    setDraggedNodeType(null);
  }, []);

  return (
    <div className="glass-card premium-border flex flex-col flex-1 relative overflow-hidden">
      <div className="p-4 border-b border-brand-border flex justify-between items-center bg-black/20">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded flex items-center justify-center bg-brand-border">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <h2 className="text-sm font-semibold tracking-wider text-white">MAP VISUALIZATION</h2>
        </div>
        <div className="flex gap-4 text-xs font-medium text-brand-text-secondary">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-brand-bg-dark border border-brand-border inline-block" /> Empty</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-white inline-block" /> Wall</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-brand-green inline-block" /> Start</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-brand-purple inline-block" /> End</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-brand-yellow inline-block" /> Path</div>
        </div>
      </div>
      
      <div 
        className="flex-1 overflow-auto flex items-center justify-center p-4 bg-black/40"
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        <div className="flex flex-col border border-brand-border select-none bg-brand-bg-dark" style={{ touchAction: "none" }}>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((node, colIdx) => {
                let bgColor = "bg-brand-bg-dark";
                let classes = "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-[0.5px] border-brand-border/30 transition-colors duration-200";
                
                if (node.type === "wall") bgColor = "bg-white";
                else if (node.type === "start") bgColor = "bg-brand-green";
                else if (node.type === "end") bgColor = "bg-brand-purple";
                else if (node.type === "visited") bgColor = "bg-brand-cyan/40";
                else if (node.type === "path") bgColor = "bg-brand-yellow scale-90 rounded-sm";

                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    id={`node-${rowIdx}-${colIdx}`}
                    className={`${classes} ${bgColor}`}
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
