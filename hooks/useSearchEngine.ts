import { useState, useRef, useCallback, useEffect } from "react";
import {
  SearchEngineStatus,
  SearchNodeStatus,
  SearchStep,
  SearchMetrics,
  SearchAlgorithmFn,
} from "@/lib/search/types";
import { generateRandomArray } from "@/lib/core";

const SPEED_DELAYS: Record<number, number> = {
  1: 50,    // Fast
  2: 250,   // Medium
  3: 600,   // Slow
};

export function useSearchEngine() {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [statuses, setStatuses] = useState<SearchNodeStatus[]>([]);
  
  const [status, setStatus] = useState<SearchEngineStatus>("idle");
  const [speed, setSpeed] = useState(2);
  const [metrics, setMetrics] = useState<SearchMetrics>({
    comparisons: 0,
    timeElapsed: 0,
  });

  const statusRef = useRef<SearchEngineStatus>("idle");
  const speedRef = useRef(2);
  const generatorRef = useRef<Generator<SearchStep, void, unknown> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const currentArrayRef = useRef<number[]>([]);
  const currentStatusesRef = useRef<SearchNodeStatus[]>([]);
  const metricsRef = useRef<SearchMetrics>({ comparisons: 0, timeElapsed: 0 });
  
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initialize = useCallback((size: number, isSorted: boolean = false, customValues?: number[]) => {
    let newArray: number[];
    if (customValues) {
      newArray = [...customValues];
    } else {
      newArray = generateRandomArray(size);
    }
    
    if (isSorted) {
      newArray.sort((a, b) => a - b);
    }
    setArray(newArray);
    currentArrayRef.current = newArray;
    // Pick a random target from the array, or occasionally a number not in the array
    const shouldExist = Math.random() > 0.1; 
    let newTarget = 0;
    if (shouldExist) {
      newTarget = newArray[Math.floor(Math.random() * size)];
    } else {
      newTarget = 105; // out of range
    }
    
    setTarget(newTarget);
    
    const initStatuses = new Array(size).fill("unsearched");
    setStatuses(initStatuses);
    currentStatusesRef.current = initStatuses;
    
    setStatus("idle");
    setMetrics({ comparisons: 0, timeElapsed: 0 });
    metricsRef.current = { comparisons: 0, timeElapsed: 0 };
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const updateMetrics = useCallback((compDelta: number) => {
    metricsRef.current.comparisons += compDelta;
    metricsRef.current.timeElapsed = Date.now() - startTimeRef.current;
    setMetrics({ ...metricsRef.current });
  }, []);

  const step = useCallback(() => {
    if (statusRef.current !== "running" || !generatorRef.current) return;

    const result = generatorRef.current.next();

    if (result.done) {
      setStatus(prev => prev === "running" ? "not_found" : prev);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const { type, index, range } = result.value;
    const nextStatuses = [...currentStatusesRef.current];

    // First, clear any currently "evaluating" nodes back to "unsearched" 
    // unless they are already discarded/found
    for (let i = 0; i < nextStatuses.length; i++) {
      if (nextStatuses[i] === "evaluating") {
        nextStatuses[i] = "unsearched";
      }
    }

    if (type === "evaluating") {
      updateMetrics(1); // count one comparison
      nextStatuses[index] = "evaluating";
    } else if (type === "discarded") {
      if (range) {
        // Binary search discards a whole range
        for (let i = range[0]; i <= range[1]; i++) {
          nextStatuses[i] = "discarded";
        }
      } else {
        nextStatuses[index] = "discarded";
      }
    } else if (type === "found") {
      nextStatuses[index] = "found";
      setStatus("completed");
      if (timerRef.current) clearInterval(timerRef.current);
    }

    setStatuses(nextStatuses);
    currentStatusesRef.current = nextStatuses;

    if (type !== "found") {
      timeoutRef.current = setTimeout(step, SPEED_DELAYS[speedRef.current]);
    }
  }, [updateMetrics]);

  const run = useCallback(
    (algorithm: SearchAlgorithmFn, arrayToSearch: number[], targetToFind: number) => {
      // Reset statuses
      const initStatuses = new Array(arrayToSearch.length).fill("unsearched");
      setStatuses(initStatuses);
      currentStatusesRef.current = initStatuses;
      
      setMetrics({ comparisons: 0, timeElapsed: 0 });
      metricsRef.current = { comparisons: 0, timeElapsed: 0 };
      
      generatorRef.current = algorithm(arrayToSearch, targetToFind);
      
      setStatus("running");
      startTimeRef.current = Date.now();
      
      timerRef.current = setInterval(() => {
        metricsRef.current.timeElapsed = Date.now() - startTimeRef.current;
        setMetrics({ ...metricsRef.current });
      }, 100);

      // Start loop
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(step, SPEED_DELAYS[speedRef.current]);
    },
    [step]
  );

  const pause = useCallback(() => {
    setStatus("paused");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const resume = useCallback(() => {
    setStatus("running");
    startTimeRef.current = Date.now() - metricsRef.current.timeElapsed;
    timerRef.current = setInterval(() => {
      metricsRef.current.timeElapsed = Date.now() - startTimeRef.current;
      setMetrics({ ...metricsRef.current });
    }, 100);
    step();
  }, [step]);

  const stop = useCallback(() => {
    setStatus("idle");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Clear evaluating states
    const nextStatuses = currentStatusesRef.current.map(s => 
      s === "evaluating" ? "unsearched" : s
    );
    setStatuses(nextStatuses);
    currentStatusesRef.current = nextStatuses;
  }, []);

  return {
    array,
    statuses,
    target,
    status,
    speed,
    metrics,
    initialize,
    setSpeed,
    run,
    pause,
    resume,
    stop,
  };
}
