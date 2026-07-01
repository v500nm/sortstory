export type NodeStatus =
  | "default"
  | "evaluating"
  | "sorted" // or "done" / "reversed"
  | "discarded"
  | "pointer1" // generic pointer colors (e.g. slow, curr)
  | "pointer2" // generic pointer colors (e.g. fast, prev)
  | "cycle"; // special status for cycle detection

export interface ListNode {
  id: string; // unique ID for React keys, even if value is duplicated
  value: number;
  next: string | null; // ID of the next node
  prev: string | null; // ID of the previous node (for DLLs)
  status: NodeStatus;
}

export interface LinkedListMetrics {
  steps: number;
  comparisons: number;
  timeMs: number;
}

export interface LinkedListStep {
  nodes: ListNode[];
  pointers: Record<string, string | null>; // map of pointer name to node ID (e.g. { curr: "node-1", prev: "node-0" })
  description: string;
}

export type LinkedListAlgorithmFn = (
  nodes: ListNode[],
  headId: string | null
) => Generator<LinkedListStep, void, unknown>;
