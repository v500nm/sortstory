"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import type { BarColor, SortContext, SortAlgorithmFn, SortMetrics, EngineStatus } from "@/lib/types";

// ── Generate a random array of given size ──
function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

// ── Speed presets: maps slider value → delay in ms ──
const SPEED_DELAYS: Record<number, number> = {
  1: 10,   // Fast
  2: 60,   // Medium
  3: 150,  // Slow
};

export function useSortEngine(initialSize: number = 15) {
  // ── State (initialize deterministically to avoid hydration mismatch) ──
  const [array, setArray] = useState<number[]>(() => Array(initialSize).fill(50));
  const [colors, setColors] = useState<BarColor[]>(() => Array(initialSize).fill("normal"));
  const [metrics, setMetrics] = useState<SortMetrics>({ comparisons: 0, swaps: 0, timeMs: 0 });
  const [status, setStatus] = useState<EngineStatus>("idle");
  const initializedRef = useRef(false);

  // ── Refs (mutable, no re-render) ──
  const arrayRef = useRef<number[]>(Array(initialSize).fill(50));
  const colorsRef = useRef<BarColor[]>(Array(initialSize).fill("normal"));
  const speedRef = useRef<number>(2);
  const stopRef = useRef<boolean>(false);
  const pauseRef = useRef<boolean>(false);
  const metricsRef = useRef<SortMetrics>({ comparisons: 0, swaps: 0, timeMs: 0 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  // ── Sync ref → state batched (for rendering) ──
  const flushArrayToState = useCallback(() => {
    setArray([...arrayRef.current]);
  }, []);

  const flushColorsToState = useCallback(() => {
    setColors([...colorsRef.current]);
  }, []);

  // ── Generate new array ──
  const generateArray = useCallback((size: number) => {
    const newArr = generateRandomArray(size);
    arrayRef.current = newArr;
    colorsRef.current = Array(size).fill("normal");
    setArray(newArr);
    setColors(Array(size).fill("normal"));
    setMetrics({ comparisons: 0, swaps: 0, timeMs: 0 });
    metricsRef.current = { comparisons: 0, swaps: 0, timeMs: 0 };
    setStatus("idle");
  }, []);

  // ── Generate random array on mount (client-side only to avoid hydration mismatch) ──
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      generateArray(initialSize);
    }
  }, [initialSize, generateArray]);

  // ── Delay helper ──
  const delay = useCallback((): Promise<void> => {
    const ms = SPEED_DELAYS[speedRef.current] ?? 60;
    return new Promise(resolve => setTimeout(resolve, ms));
  }, []);

  // ── Pause check helper ──
  const pauseCheck = useCallback((): Promise<void> => {
    return new Promise(resolve => {
      const check = () => {
        if (stopRef.current) { resolve(); return; }
        if (!pauseRef.current) { resolve(); return; }
        setTimeout(check, 50);
      };
      check();
    });
  }, []);

  // ── Build SortContext for an algorithm ──
  const buildContext = useCallback((): SortContext => {
    const shouldStop = () => stopRef.current;

    const compare = async (i: number, j: number): Promise<number> => {
      if (stopRef.current) return 0;
      await pauseCheck();

      // Highlight comparing bars
      colorsRef.current[i] = "comparing";
      colorsRef.current[j] = "comparing";
      flushColorsToState();

      metricsRef.current.comparisons++;
      setMetrics(m => ({ ...m, comparisons: metricsRef.current.comparisons }));

      await delay();

      // Reset colors after compare
      if (colorsRef.current[i] === "comparing") colorsRef.current[i] = "normal";
      if (colorsRef.current[j] === "comparing") colorsRef.current[j] = "normal";
      flushColorsToState();

      return arrayRef.current[i] - arrayRef.current[j];
    };

    const swap = async (i: number, j: number): Promise<void> => {
      if (stopRef.current) return;
      await pauseCheck();

      // Visual: highlight as active
      colorsRef.current[i] = "active";
      colorsRef.current[j] = "active";

      // Swap in array ref
      const temp = arrayRef.current[i];
      arrayRef.current[i] = arrayRef.current[j];
      arrayRef.current[j] = temp;

      metricsRef.current.swaps++;
      setMetrics(m => ({ ...m, swaps: metricsRef.current.swaps }));

      flushArrayToState();
      flushColorsToState();

      await delay();

      // Reset colors
      if (colorsRef.current[i] === "active") colorsRef.current[i] = "normal";
      if (colorsRef.current[j] === "active") colorsRef.current[j] = "normal";
      flushColorsToState();
    };

    const setValue = async (i: number, value: number): Promise<void> => {
      if (stopRef.current) return;
      await pauseCheck();

      arrayRef.current[i] = value;
      colorsRef.current[i] = "active";

      flushArrayToState();
      flushColorsToState();

      await delay();

      if (colorsRef.current[i] === "active") colorsRef.current[i] = "normal";
      flushColorsToState();
    };

    const highlight = (indices: number[], color: BarColor) => {
      for (const idx of indices) {
        if (idx >= 0 && idx < colorsRef.current.length) {
          colorsRef.current[idx] = color;
        }
      }
      flushColorsToState();
    };

    const markSorted = (index: number) => {
      if (index >= 0 && index < colorsRef.current.length) {
        colorsRef.current[index] = "sorted";
        flushColorsToState();
      }
    };

    const markAllSorted = () => {
      colorsRef.current = colorsRef.current.map(() => "sorted");
      flushColorsToState();
    };

    const resetColors = () => {
      colorsRef.current = colorsRef.current.map(() => "normal");
      flushColorsToState();
    };

    return {
      array: arrayRef.current,
      length: arrayRef.current.length,
      compare,
      swap,
      setValue,
      highlight,
      markSorted,
      markAllSorted,
      resetColors,
      delay,
      shouldStop,
      pauseCheck,
    };
  }, [delay, pauseCheck, flushArrayToState, flushColorsToState]);

  // ── Run an algorithm ──
  const run = useCallback(async (algorithmFn: SortAlgorithmFn) => {
    // Reset
    stopRef.current = false;
    pauseRef.current = false;
    metricsRef.current = { comparisons: 0, swaps: 0, timeMs: 0 };
    colorsRef.current = Array(arrayRef.current.length).fill("normal");
    setMetrics({ comparisons: 0, swaps: 0, timeMs: 0 });
    flushColorsToState();
    setStatus("running");

    // Start timer
    startTimeRef.current = performance.now();
    timerRef.current = setInterval(() => {
      metricsRef.current.timeMs = Math.round(performance.now() - startTimeRef.current);
      setMetrics(m => ({ ...m, timeMs: metricsRef.current.timeMs }));
    }, 50);

    const ctx = buildContext();

    try {
      await algorithmFn(ctx);

      if (!stopRef.current) {
        // Mark all sorted on completion
        colorsRef.current = Array(arrayRef.current.length).fill("sorted");
        flushColorsToState();
        setStatus("completed");
      } else {
        setStatus("idle");
      }
    } catch (err) {
      console.error("Sort error:", err);
      setStatus("idle");
    } finally {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Final time
      metricsRef.current.timeMs = Math.round(performance.now() - startTimeRef.current);
      setMetrics({ ...metricsRef.current });
    }
  }, [buildContext, flushColorsToState]);

  // ── Control functions ──
  const pause = useCallback(() => {
    pauseRef.current = true;
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    pauseRef.current = false;
    setStatus("running");
  }, []);

  const stop = useCallback(() => {
    stopRef.current = true;
    pauseRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    colorsRef.current = Array(arrayRef.current.length).fill("normal");
    flushColorsToState();
    setStatus("idle");
  }, [flushColorsToState]);

  const setSpeed = useCallback((speed: number) => {
    speedRef.current = speed;
  }, []);

  const reset = useCallback(() => {
    stopRef.current = true;
    pauseRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const size = arrayRef.current.length;
    generateArray(size);
  }, [generateArray]);

  return {
    array,
    colors,
    metrics,
    status,
    generateArray,
    run,
    pause,
    resume,
    stop,
    reset,
    setSpeed,
  };
}
