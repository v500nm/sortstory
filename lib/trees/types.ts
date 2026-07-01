export type TreeNodeStatus = "default" | "active" | "found" | "comparing";

export interface TreeNode {
  id: string; // usually a string representation of the value for uniqueness
  value: number;
  left: string | null; // id of left child
  right: string | null; // id of right child
  status: TreeNodeStatus;
}

export type TreeAlgorithmStatus = "idle" | "running" | "paused" | "completed";

export interface TreeStep {
  nodes: Record<string, TreeNode>;
  rootId: string | null;
  activeNodeIds: string[];
  description: string;
}

export type TreeAlgorithmFn = (
  nodes: Record<string, TreeNode>,
  rootId: string | null,
  targetValue?: number
) => Generator<TreeStep, void, unknown>;
