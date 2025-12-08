"use client";

export let isPaused = false;
export let isStopped = false;
export let delay = 80;

export function resetStates() {
  isPaused = false;
  isStopped = false;
}

export function pause() {
  isPaused = true;
}
export function resume() {
  isPaused = false;
}
export function stop() {
  isStopped = true;
}

export async function pauseCheck() {
  return new Promise(resolve => {
    const t = setInterval(() => {
      if (!isPaused) {
        clearInterval(t);
        resolve();
      }
    }, 20);
  });
}

export async function wait(ms) {
  for (let t = 0; t < ms; t += 20) {
    if (isStopped) return;
    await pauseCheck();
    await new Promise(r => setTimeout(r, 20));
  }
}

export function swap(a, b) {
  let temp = a.style.height;
  a.style.height = b.style.height;
  b.style.height = temp;
}
