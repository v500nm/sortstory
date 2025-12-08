"use client";
import { wait, pauseCheck, isStopped, swap } from "../lib/core";

export async function heapSort() {
  const ele = document.querySelectorAll(".bar");
  let n = ele.length;

  for (let i = Math.floor(n/2) - 1; i >= 0; i--) await heapify(ele, n, i);

  for (let i = n - 1; i > 0; i--) {
    swap(ele[0], ele[i]);
    ele[i].style.background = "green";
    await heapify(ele, i, 0);
  }
  ele[0].style.background = "green";
}

async function heapify(ele, n, i) {
  if (isStopped) return;
  await pauseCheck();

  let largest = i;
  let l = 2*i + 1;
  let r = 2*i + 2;

  if (l < n && parseInt(ele[l].style.height) > parseInt(ele[largest].style.height)) largest = l;
  if (r < n && parseInt(ele[r].style.height) > parseInt(ele[largest].style.height)) largest = r;

  if (largest !== i) {
    swap(ele[i], ele[largest]);
    await wait(80);
    await heapify(ele, n, largest);
  }
}
