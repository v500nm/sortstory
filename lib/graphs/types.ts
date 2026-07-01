export type GraphNodeStatus = "default" | "active" | "visited" | "visiting";

export interface GraphNode {
  id: string;
  x?: number; // visual coordinates
  y?: number;
  status: GraphNodeStatus;
}

export interface GraphEdge {
  id: string; // e.g. "A-B"
  source: string;
  target: string;
  status: "default" | "active";
}

export type GraphAlgorithmStatus = "idle" | "running" | "paused" | "completed";

export interface GraphStep {
  nodes: Record<string, GraphNode>;
  edges: GraphEdge[];
  activeNodeIds: string[];
  description: string;
}

export type GraphAlgorithmFn = (
  nodes: Record<string, GraphNode>,
  edges: GraphEdge[],
  startNodeId: string,
  targetNodeId?: string
) => Generator<GraphStep, void, unknown>;
