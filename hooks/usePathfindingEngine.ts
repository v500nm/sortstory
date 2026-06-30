import { useState, useRef, useCallback, useEffect } from "react";
import { GridData, NodeData, NodeType, PathfindingAlgorithmFn, PathfindingStep } from "@/lib/pathfinding/types";

export type PathfindingStatus = "idle" | "running" | "paused" | "completed";

const INITIAL_ROWS = 21;
const INITIAL_COLS = 45;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 10;
const END_NODE_COL = 35;

function createInitialGrid(): GridData {
  const grid: GridData = [];
  for (let row = 0; row < INITIAL_ROWS; row++) {
    const currentRow: NodeData[] = [];
    for (let col = 0; col < INITIAL_COLS; col++) {
      let type: NodeType = "empty";
      if (row === START_NODE_ROW && col === START_NODE_COL) type = "start";
      if (row === END_NODE_ROW && col === END_NODE_COL) type = "end";
      
      currentRow.push({
        row,
        col,
        type,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      });
    }
    grid.push(currentRow);
  }
  return grid;
}

export function usePathfindingEngine() {
  const [grid, setGrid] = useState<GridData>(createInitialGrid());
  const [status, setStatus] = useState<PathfindingStatus>("idle");
  const [speed, setSpeed] = useState(50); // ms per step

  const statusRef = useRef<PathfindingStatus>("idle");
  const generatorRef = useRef<Generator<PathfindingStep, void, unknown> | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentGridRef = useRef<GridData>(grid);

  // Sync ref with state
  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  
  useEffect(() => {
    currentGridRef.current = grid;
  }, [grid]);

  const updateNode = useCallback((row: number, col: number, type: NodeType) => {
    setGrid((prev) => {
      const newGrid = prev.map(r => r.slice()); // shallow clone rows
      const node = { ...newGrid[row][col], type };
      
      // Enforce only one start/end node
      if (type === "start" || type === "end") {
        for (let r = 0; r < newGrid.length; r++) {
          for (let c = 0; c < newGrid[0].length; c++) {
            if (newGrid[r][c].type === type && (r !== row || c !== col)) {
              newGrid[r][c] = { ...newGrid[r][c], type: "empty" };
            }
          }
        }
      }
      
      newGrid[row][col] = node;
      return newGrid;
    });
  }, []);

  const clearBoard = useCallback(() => {
    stop();
    setGrid(createInitialGrid());
    setStatus("idle");
  }, []);

  const clearPath = useCallback(() => {
    stop();
    setGrid(prev => prev.map(row => row.map(node => ({
      ...node,
      type: (node.type === "visited" || node.type === "path") ? "empty" : node.type,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    }))));
    setStatus("idle");
  }, []);

  const stepForward = useCallback(() => {
    if (!generatorRef.current) return false;
    const result = generatorRef.current.next();
    
    if (result.done) {
      setStatus("completed");
      generatorRef.current = null;
      return false;
    }

    const step = result.value;
    setGrid(prev => {
      const newGrid = prev.map(r => r.slice());
      const node = newGrid[step.row][step.col];
      if (node.type !== "start" && node.type !== "end") {
        newGrid[step.row][step.col] = { ...node, type: step.type === "visit" ? "visited" : "path" };
      }
      return newGrid;
    });
    return true;
  }, []);

  const loop = useCallback(() => {
    if (statusRef.current !== "running") return;
    
    const hasNext = stepForward();
    if (hasNext) {
      timeoutRef.current = setTimeout(loop, speed);
    }
  }, [speed, stepForward]);

  const run = useCallback((algo: PathfindingAlgorithmFn) => {
    if (status === "running") return;

    // If starting fresh or from completed, clear previous path first
    if (status === "idle" || status === "completed") {
      const cleanGrid = currentGridRef.current.map(row => row.map(node => ({
        ...node,
        type: (node.type === "visited" || node.type === "path") ? "empty" : node.type,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      })));
      setGrid(cleanGrid);
      currentGridRef.current = cleanGrid;

      // Find start and end nodes
      let startNode: NodeData | null = null;
      let endNode: NodeData | null = null;
      for (const row of cleanGrid) {
        for (const node of row) {
          if (node.type === "start") startNode = node;
          if (node.type === "end") endNode = node;
        }
      }

      if (startNode && endNode) {
        generatorRef.current = algo(cleanGrid, startNode, endNode);
      }
    }

    setStatus("running");
    setTimeout(() => {
      if (!timeoutRef.current) loop();
    }, 0);
  }, [status, loop]);

  const pause = useCallback(() => {
    if (status !== "running") return;
    setStatus("paused");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [status]);

  const stop = useCallback(() => {
    setStatus("idle");
    generatorRef.current = null;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    grid,
    status,
    speed,
    setSpeed,
    run,
    pause,
    stop,
    clearBoard,
    clearPath,
    updateNode,
  };
}
