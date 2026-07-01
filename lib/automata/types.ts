// Common types for Automata and ML modules

export type AutomataStatus = "idle" | "running" | "paused" | "completed";

// Game of Life
export interface Cell {
  x: number;
  y: number;
  isAlive: boolean;
  isNewlyBorn: boolean;
  isNewlyDied: boolean;
}

export interface GameOfLifeStep {
  grid: Cell[][]; // 2D array of cells
  generation: number;
  description: string;
}

export type GameOfLifeAlgorithmFn = (
  initialGrid: Cell[][],
  maxGenerations: number
) => Generator<GameOfLifeStep, void, unknown>;

// K-Means Clustering
export interface DataPoint {
  id: string;
  x: number; // 0 to 1
  y: number; // 0 to 1
  clusterId: number | null;
}

export interface Centroid {
  id: number;
  x: number; // 0 to 1
  y: number; // 0 to 1
  color: string;
}

export interface KMeansStep {
  points: DataPoint[];
  centroids: Centroid[];
  iteration: number;
  description: string;
}

export type KMeansAlgorithmFn = (
  initialPoints: DataPoint[],
  initialCentroids: Centroid[],
  maxIterations: number
) => Generator<KMeansStep, void, unknown>;
