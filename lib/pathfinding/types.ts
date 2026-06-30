export type NodeType = "empty" | "wall" | "start" | "end" | "visited" | "path";

export interface NodeData {
  row: number;
  col: number;
  type: NodeType;
  distance: number;
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
  type: "visit" | "path" | "clear";
  row: number;
  col: number;
}
