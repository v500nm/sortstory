export let metricsLive = {
  time: 0,
  swaps: 0,
  comparisons: 0,
  selectedAlgo: "",
};

export function metricsReset(algo) {
  metricsLive.time = 0;
  metricsLive.swaps = 0;
  metricsLive.comparisons = 0;
  metricsLive.selectedAlgo = algo;
  const start = performance.now();

  const interval = setInterval(() => {
    metricsLive.time = performance.now() - start;
  }, 50);

  setTimeout(() => clearInterval(interval), 999999);
}

export function incSwap() { metricsLive.swaps++; }
export function incComp() { metricsLive.comparisons++; }
