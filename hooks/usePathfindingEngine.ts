import { useState, useRef, useCallback, useEffect } from "react";
import {
  GridData,
  NodeData,
  NodeType,
  PathfindingAlgorithmFn,
  PathfindingStep,
  PathfindingMetrics,
  MazeAlgorithmFn,
  MazeStep,
} from "@/lib/pathfinding/types";

export type PathfindingStatus = "idle" | "running" | "paused" | "completed" | "generating";

const INITIAL_ROWS = 21;
const INITIAL_COLS = 45;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 10;
const END_NODE_COL = 35;

// Speed presets: maps slider value → delay in ms
const SPEED_DELAYS: Record<number, number> = {
  1: 5,    // Fast
  2: 30,   // Medium
  3: 80,   // Slow
};

function createEmptyNode(row: number, col: number, type: NodeType = "empty"): NodeData {
  return {
    row,
    col,
    type,
    distance: Infinity,
    heuristic: 0,
    fCost: Infinity,
    isVisited: false,
    previousNode: null,
  };
}

function createInitialGrid(): GridData {
  const grid: GridData = [];
  for (let row = 0; row < INITIAL_ROWS; row++) {
    const currentRow: NodeData[] = [];
    for (let col = 0; col < INITIAL_COLS; col++) {
      let type: NodeType = "empty";
      if (row === START_NODE_ROW && col === START_NODE_COL) type = "start";
      if (row === END_NODE_ROW && col === END_NODE_COL) type = "end";
      currentRow.push(createEmptyNode(row, col, type));
    }
    grid.push(currentRow);
  }
  return grid;
}

function resetGridForAlgorithm(grid: GridData): GridData {
  return grid.map((row) =>
    row.map((node) => ({
      ...node,
      type: (node.type === "visited" || node.type === "path" || node.type === "frontier")
        ? "empty"
        : node.type,
      distance: Infinity,
      heuristic: 0,
      fCost: Infinity,
      isVisited: false,
      previousNode: null,
    } as NodeData))
  );
}

export function usePathfindingEngine() {
  const [grid, setGrid] = useState<GridData>(createInitialGrid);
  const [status, setStatus] = useState<PathfindingStatus>("idle");
  const [speed, setSpeed] = useState(2);
  const [metrics, setMetrics] = useState<PathfindingMetrics>({
    evaluatedNodes: 0,
    pathLength: 0,
    timeMs: 0,
  });

  const statusRef = useRef<PathfindingStatus>("idle");
  const speedRef = useRef(2);
  const generatorRef = useRef<Generator<PathfindingStep, void, unknown> | null>(null);
  const mazeGeneratorRef = useRef<Generator<MazeStep, void, unknown> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentGridRef = useRef<GridData>(grid);
  const metricsRef = useRef<PathfindingMetrics>({ evaluatedNodes: 0, pathLength: 0, timeMs: 0 });
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync refs with state
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    currentGridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // ── Node update (wall drawing) ──
  const updateNode = useCallback((row: number, col: number, type: NodeType) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.slice());
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

  // ── Clear board (reset everything) ──
  const clearBoard = useCallback(() => {
    stop();
    setGrid(createInitialGrid());
    setStatus("idle");
    setMetrics({ evaluatedNodes: 0, pathLength: 0, timeMs: 0 });
    metricsRef.current = { evaluatedNodes: 0, pathLength: 0, timeMs: 0 };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Clear path only (keep walls) ──
  const clearPath = useCallback(() => {
    stop();
    setGrid((prev) => resetGridForAlgorithm(prev));
    setStatus("idle");
    setMetrics({ evaluatedNodes: 0, pathLength: 0, timeMs: 0 });
    metricsRef.current = { evaluatedNodes: 0, pathLength: 0, timeMs: 0 };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Step forward (pathfinding) ──
  const stepForward = useCallback(() => {
    if (!generatorRef.current) return false;
    const result = generatorRef.current.next();

    if (result.done) {
      setStatus("completed");
      generatorRef.current = null;
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      metricsRef.current.timeMs = Math.round(performance.now() - startTimeRef.current);
      setMetrics({ ...metricsRef.current });
      return false;
    }

    const step = result.value;
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.slice());
      const node = newGrid[step.row][step.col];
      if (node.type !== "start" && node.type !== "end") {
        let newType: NodeType;
        if (step.type === "visit") {
          newType = "visited";
          metricsRef.current.evaluatedNodes++;
        } else if (step.type === "path") {
          newType = "path";
          metricsRef.current.pathLength++;
        } else if (step.type === "frontier") {
          // Only set frontier if not already visited
          newType = node.type === "visited" ? "visited" : "frontier";
        } else {
          newType = "empty";
        }
        newGrid[step.row][step.col] = { ...node, type: newType };
      }
      return newGrid;
    });
    setMetrics({ ...metricsRef.current });
    return true;
  }, []);

  // ── Animation loop (pathfinding) ──
  const loop = useCallback(() => {
    if (statusRef.current !== "running") return;

    const hasNext = stepForward();
    if (hasNext) {
      const delayMs = SPEED_DELAYS[speedRef.current] ?? 30;
      timeoutRef.current = setTimeout(loop, delayMs);
    }
  }, [stepForward]);

  // ── Run a pathfinding algorithm ──
  const run = useCallback(
    (algo: PathfindingAlgorithmFn) => {
      if (status === "running" || status === "generating") return;

      // Reset metrics
      metricsRef.current = { evaluatedNodes: 0, pathLength: 0, timeMs: 0 };
      setMetrics({ evaluatedNodes: 0, pathLength: 0, timeMs: 0 });

      // If starting fresh or from completed, clear previous path first
      if (status === "idle" || status === "completed") {
        const cleanGrid = resetGridForAlgorithm(currentGridRef.current);
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

      // Start timer
      startTimeRef.current = performance.now();
      timerRef.current = setInterval(() => {
        metricsRef.current.timeMs = Math.round(performance.now() - startTimeRef.current);
        setMetrics((m) => ({ ...m, timeMs: metricsRef.current.timeMs }));
      }, 50);

      setStatus("running");
      setTimeout(() => {
        if (!timeoutRef.current) loop();
      }, 0);
    },
    [status, loop]
  );

  // ── Pause ──
  const pause = useCallback(() => {
    if (status !== "running") return;
    setStatus("paused");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [status]);

  // ── Resume ──
  const resume = useCallback(() => {
    if (status !== "paused") return;
    setStatus("running");
    setTimeout(() => loop(), 0);
  }, [status, loop]);

  // ── Stop ──
  const stop = useCallback(() => {
    setStatus("idle");
    generatorRef.current = null;
    mazeGeneratorRef.current = null;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // ── Maze generation step ──
  const mazeStepForward = useCallback(() => {
    if (!mazeGeneratorRef.current) return false;
    const result = mazeGeneratorRef.current.next();

    if (result.done) {
      mazeGeneratorRef.current = null;
      return false;
    }

    const step = result.value;
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.slice());
      const node = newGrid[step.row][step.col];
      // Don't overwrite start/end nodes
      if (node.type === "start" || node.type === "end") return prev;

      const newType: NodeType = step.type === "carve" ? "empty" : step.type === "wall" ? "wall" : "frontier";
      newGrid[step.row][step.col] = { ...node, type: newType };
      return newGrid;
    });
    return true;
  }, []);

  // ── Maze animation loop ──
  const mazeLoop = useCallback(() => {
    if (statusRef.current !== "generating") return;

    // Process multiple steps per frame for faster maze gen
    const stepsPerTick = speedRef.current === 1 ? 20 : speedRef.current === 2 ? 8 : 3;
    let hasNext = true;
    for (let i = 0; i < stepsPerTick && hasNext; i++) {
      hasNext = mazeStepForward();
    }

    if (hasNext) {
      const delayMs = SPEED_DELAYS[speedRef.current] ?? 30;
      timeoutRef.current = setTimeout(mazeLoop, delayMs);
    } else {
      setStatus("idle");
    }
  }, [mazeStepForward]);

  // ── Run a maze generation algorithm ──
  const runMaze = useCallback(
    (mazeAlgo: MazeAlgorithmFn) => {
      if (status === "running" || status === "generating") return;

      // Stop any existing animation
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Reset metrics
      metricsRef.current = { evaluatedNodes: 0, pathLength: 0, timeMs: 0 };
      setMetrics({ evaluatedNodes: 0, pathLength: 0, timeMs: 0 });

      // Preserve start/end positions from current grid
      let startRow = START_NODE_ROW;
      let startCol = START_NODE_COL;
      let endRow = END_NODE_ROW;
      let endCol = END_NODE_COL;

      for (const row of currentGridRef.current) {
        for (const node of row) {
          if (node.type === "start") {
            startRow = node.row;
            startCol = node.col;
          }
          if (node.type === "end") {
            endRow = node.row;
            endCol = node.col;
          }
        }
      }

      // Create a fresh empty grid (maze gen will fill it with walls then carve)
      const freshGrid: GridData = [];
      for (let r = 0; r < INITIAL_ROWS; r++) {
        const row: NodeData[] = [];
        for (let c = 0; c < INITIAL_COLS; c++) {
          let type: NodeType = "empty";
          if (r === startRow && c === startCol) type = "start";
          if (r === endRow && c === endCol) type = "end";
          row.push(createEmptyNode(r, c, type));
        }
        freshGrid.push(row);
      }
      setGrid(freshGrid);
      currentGridRef.current = freshGrid;

      // Create the maze generator
      mazeGeneratorRef.current = mazeAlgo(INITIAL_ROWS, INITIAL_COLS);

      setStatus("generating");
      setTimeout(() => mazeLoop(), 0);
    },
    [status, mazeLoop]
  );

  // ── Generate random walls ──
  const generateRandomWalls = useCallback(
    (density: number) => {
      if (status === "running" || status === "generating") return;

      // Stop any existing animation
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Reset metrics
      metricsRef.current = { evaluatedNodes: 0, pathLength: 0, timeMs: 0 };
      setMetrics({ evaluatedNodes: 0, pathLength: 0, timeMs: 0 });

      // Clamp density to 0-0.5
      const clampedDensity = Math.max(0, Math.min(0.5, density));

      const newGrid: GridData = [];
      for (let r = 0; r < INITIAL_ROWS; r++) {
        const row: NodeData[] = [];
        for (let c = 0; c < INITIAL_COLS; c++) {
          let type: NodeType = "empty";
          if (r === START_NODE_ROW && c === START_NODE_COL) {
            type = "start";
          } else if (r === END_NODE_ROW && c === END_NODE_COL) {
            type = "end";
          } else if (Math.random() < clampedDensity) {
            type = "wall";
          }
          row.push(createEmptyNode(r, c, type));
        }
        newGrid.push(row);
      }

      setGrid(newGrid);
      currentGridRef.current = newGrid;
      setStatus("idle");
    },
    [status]
  );

  // ── Export grid as serializable wall layout (for race mode sync) ──
  const getWallLayout = useCallback((): boolean[][] => {
    return currentGridRef.current.map((row) =>
      row.map((node) => node.type === "wall")
    );
  }, []);

  // ── Apply a wall layout from another engine (for race mode sync) ──
  const applyWallLayout = useCallback((walls: boolean[][]) => {
    setGrid((prev) => {
      const newGrid = prev.map((row, r) =>
        row.map((node, c) => {
          if (node.type === "start" || node.type === "end") return node;
          const shouldBeWall = walls[r]?.[c] ?? false;
          if (shouldBeWall && node.type !== "wall") {
            return { ...node, type: "wall" as NodeType };
          }
          if (!shouldBeWall && node.type === "wall") {
            return { ...node, type: "empty" as NodeType };
          }
          return node;
        })
      );
      currentGridRef.current = newGrid;
      return newGrid;
    });
  }, []);

  return {
    grid,
    status,
    speed,
    metrics,
    setSpeed,
    run,
    pause,
    resume,
    stop,
    clearBoard,
    clearPath,
    updateNode,
    runMaze,
    generateRandomWalls,
    getWallLayout,
    applyWallLayout,
  };
}
