export type SearchEngineStatus = "idle" | "running" | "paused" | "completed" | "not_found";
export type SearchNodeStatus = "unsearched" | "evaluating" | "discarded" | "found";

export interface SearchStep {
  type: "evaluating" | "discarded" | "found";
  index: number;
  range?: [number, number]; // Used to discard multiple elements at once (e.g. binary search)
}

export interface SearchMetrics {
  comparisons: number;
  timeElapsed: number;
}

export type SearchAlgorithmFn = (
  array: number[],
  target: number
) => Generator<SearchStep, void, unknown>;
