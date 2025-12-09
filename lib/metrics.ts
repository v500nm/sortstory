export let metricsLive = {
  time: 0,
  swaps: 0,
  comparisons: 0,
  selectedAlgo: "",
};

let intervalId: NodeJS.Timeout | null = null;

export function metricsReset(algo: string) {
  // Clear any existing interval
  if (intervalId) {
    clearInterval(intervalId);
  }

  metricsLive.time = 0;
  metricsLive.swaps = 0;
  metricsLive.comparisons = 0;
  metricsLive.selectedAlgo = algo;
  
  const start = performance.now();

  intervalId = setInterval(() => {
    metricsLive.time = performance.now() - start;
  }, 50);

  // Clean up after a long time
  setTimeout(() => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 999999);
}

export function incSwap() { 
  metricsLive.swaps++; 
}

export function incComp() { 
  metricsLive.comparisons++; 
}