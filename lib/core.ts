// Core utility functions for sorting visualizer

let isPaused = false;
let isStopping = false;

export const resetStates = () => {
  // Reset all sorting states
  isPaused = false;
  isStopping = false;
  console.log("Resetting states...");
};

export const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

// Wait function for delays during visualization
export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Sleep alias (same as wait)
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Check if sorting is paused
export const pauseCheck = async (): Promise<void> => {
  while (isPaused) {
    await wait(100);
  }
};

// Check if sorting should stop
export const isStopped = (): boolean => {
  return isStopping;
};

// Control functions for pause/resume/stop
export const pause = () => {
  isPaused = true;
};

export const resume = () => {
  isPaused = false;
};

export const stop = () => {
  isStopping = true;
  isPaused = false;
};

// Helper to swap array elements
export const swap = <T,>(arr: T[], i: number, j: number): void => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};