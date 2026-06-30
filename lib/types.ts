// ── Shared types for sorting engine ──

/** State of a single bar in the visualizer */
export type BarColor = "normal" | "active" | "comparing" | "sorted" | "pivot";

/** Context injected into every algorithm function */
export interface SortContext {
  /** Current array snapshot (read-only view — mutate via swap/set) */
  array: number[];
  /** Total length of the array */
  length: number;
  /** Compare elements at indices i and j. Returns negative if a[i]<a[j], 0 if equal, positive if a[i]>a[j]. Increments comparison counter. */
  compare: (i: number, j: number) => Promise<number>;
  /** Swap elements at indices i and j. Increments swap counter. */
  swap: (i: number, j: number) => Promise<void>;
  /** Set value at index i directly (used by merge sort, radix sort, etc.) */
  setValue: (i: number, value: number) => Promise<void>;
  /** Highlight bars at given indices with a color */
  highlight: (indices: number[], color: BarColor) => void;
  /** Mark a bar as sorted */
  markSorted: (index: number) => void;
  /** Mark all bars as sorted */
  markAllSorted: () => void;
  /** Reset all bar colors to normal */
  resetColors: () => void;
  /** Delay for animation — respects current speed setting */
  delay: () => Promise<void>;
  /** Check if sorting has been stopped */
  shouldStop: () => boolean;
  /** Wait while paused */
  pauseCheck: () => Promise<void>;
}

/** Signature for a sorting algorithm function */
export type SortAlgorithmFn = (ctx: SortContext) => Promise<void>;

/** Metrics tracked during sorting */
export interface SortMetrics {
  comparisons: number;
  swaps: number;
  timeMs: number;
}

/** Engine status */
export type EngineStatus = "idle" | "running" | "paused" | "completed";
