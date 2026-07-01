export type NodeType = "empty" | "wall" | "start" | "end" | "visited" | "path" | "frontier";

export interface NodeData {
  row: number;
  col: number;
  type: NodeType;
  distance: number;
  heuristic: number;
  fCost: number;
  isVisited: boolean;
  previousNode: NodeData | null;
}

export type GridData = NodeData[][];

export interface PathfindingAlgorithmFn {
  (
    grid: GridData,
    startNode: NodeData,
    endNode: NodeData
  ): Generator<PathfindingStep, void, unknown>;
}

export interface PathfindingStep {
  type: "visit" | "path" | "clear" | "frontier";
  row: number;
  col: number;
}

// ── Maze Generation Types ──

export interface MazeStep {
  type: "carve" | "wall" | "frontier";
  row: number;
  col: number;
}

export interface MazeAlgorithmFn {
  (rows: number, cols: number): Generator<MazeStep, void, unknown>;
}

// ── Metrics ──

export interface PathfindingMetrics {
  evaluatedNodes: number;
  pathLength: number;
  timeMs: number;
}
