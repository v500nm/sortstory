import { useState, useRef, useCallback, useEffect } from "react";
import { 
  AutomataStatus, 
  Cell, 
  GameOfLifeStep, 
  GameOfLifeAlgorithmFn,
  DataPoint,
  Centroid,
  KMeansStep,
  KMeansAlgorithmFn
} from "@/lib/automata/types";

const SPEED_DELAYS: Record<number, number> = {
  1: 600, // Slow
  2: 200, // Normal
  3: 50,  // Fast
};

export function useGameOfLifeEngine() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [generation, setGeneration] = useState(0);
  const [status, setStatus] = useState<AutomataStatus>("idle");
  const [description, setDescription] = useState<string>("");
  const [speed, setSpeed] = useState(2);

  const statusRef = useRef<AutomataStatus>("idle");
  const speedRef = useRef(2);
  const generatorRef = useRef<Generator<GameOfLifeStep, void, unknown> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initializeGrid = useCallback((rows: number, cols: number, randomize = true) => {
    const newGrid: Cell[][] = [];
    for (let y = 0; y < rows; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < cols; x++) {
        row.push({
          x,
          y,
          isAlive: randomize ? Math.random() > 0.7 : false,
          isNewlyBorn: false,
          isNewlyDied: false,
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setGeneration(0);
    setStatus("idle");
    setDescription("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const toggleCell = useCallback((x: number, y: number) => {
    if (status !== "idle" && status !== "completed") return; // Only allow drawing when not running
    
    setGrid(prev => {
      const newGrid = prev.map(row => row.map(cell => ({ ...cell })));
      newGrid[y][x].isAlive = !newGrid[y][x].isAlive;
      return newGrid;
    });
  }, [status]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const step = useCallback(() => {
    if (statusRef.current !== "running" || !generatorRef.current) return;

    const result = generatorRef.current.next();

    if (result.done) {
      setStatus("completed");
      return;
    }

    const state = result.value;
    setGrid(state.grid);
    setGeneration(state.generation);
    setDescription(state.description);

    timeoutRef.current = setTimeout(step, SPEED_DELAYS[speedRef.current]);
  }, []);

  const run = useCallback(
    (algorithm: GameOfLifeAlgorithmFn, maxGens = 500) => {
      setStatus("running");
      generatorRef.current = algorithm(grid, maxGens);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(step, 0);
    },
    [grid, step]
  );

  const pause = useCallback(() => {
    if (status === "running") {
      setStatus("paused");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [status]);

  const resume = useCallback(() => {
    if (status === "paused") {
      setStatus("running");
      step();
    }
  }, [status, step]);

  const stop = useCallback(() => {
    setStatus("idle");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    generatorRef.current = null;
    
    // Clear the board on stop, or we could just leave it. Let's leave it but reset status.
    setGrid(prev => prev.map(row => row.map(cell => ({ ...cell, isNewlyBorn: false, isNewlyDied: false }))));
    setDescription("");
  }, []);

  return {
    grid,
    generation,
    status,
    description,
    speed,
    setSpeed,
    initializeGrid,
    toggleCell,
    run,
    pause,
    resume,
    stop,
  };
}

export function useKMeansEngine() {
  const [points, setPoints] = useState<DataPoint[]>([]);
  const [centroids, setCentroids] = useState<Centroid[]>([]);
  const [iteration, setIteration] = useState(0);
  const [status, setStatus] = useState<AutomataStatus>("idle");
  const [description, setDescription] = useState<string>("");
  const [speed, setSpeed] = useState(2);

  const statusRef = useRef<AutomataStatus>("idle");
  const speedRef = useRef(2);
  const generatorRef = useRef<Generator<KMeansStep, void, unknown> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initializeData = useCallback((numPoints = 100, numClusters = 3) => {
    const newPoints: DataPoint[] = [];
    // Generate random points (0 to 1)
    for (let i = 0; i < numPoints; i++) {
      newPoints.push({
        id: `p-${i}`,
        x: Math.random(),
        y: Math.random(),
        clusterId: null,
      });
    }

    const newCentroids: Centroid[] = [];
    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
    
    for (let i = 0; i < numClusters; i++) {
      newCentroids.push({
        id: i,
        x: Math.random(),
        y: Math.random(),
        color: colors[i % colors.length],
      });
    }

    setPoints(newPoints);
    setCentroids(newCentroids);
    setIteration(0);
    setStatus("idle");
    setDescription("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const step = useCallback(() => {
    if (statusRef.current !== "running" || !generatorRef.current) return;

    const result = generatorRef.current.next();

    if (result.done) {
      setStatus("completed");
      return;
    }

    const state = result.value;
    setPoints(state.points);
    setCentroids(state.centroids);
    setIteration(state.iteration);
    setDescription(state.description);

    timeoutRef.current = setTimeout(step, SPEED_DELAYS[speedRef.current]);
  }, []);

  const run = useCallback(
    (algorithm: KMeansAlgorithmFn, maxIters = 50) => {
      setStatus("running");
      generatorRef.current = algorithm(points, centroids, maxIters);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(step, 0);
    },
    [points, centroids, step]
  );

  const pause = useCallback(() => {
    if (status === "running") {
      setStatus("paused");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [status]);

  const resume = useCallback(() => {
    if (status === "paused") {
      setStatus("running");
      step();
    }
  }, [status, step]);

  const stop = useCallback(() => {
    setStatus("idle");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    generatorRef.current = null;
    setDescription("");
  }, []);

  return {
    points,
    centroids,
    iteration,
    status,
    description,
    speed,
    setSpeed,
    initializeData,
    run,
    pause,
    resume,
    stop,
  };
}
