"use client";
import { wait, pauseCheck, isStopped, swap } from "./core";

export async function bitonicSortWrapper() {
  const ele = document.querySelectorAll(".bar");
  await bitonicSort(ele, 0, ele.length, true);
}

async function bitonicSort(ele, low, count, dir) {
  if (count <= 1) return;
  const k = Math.floor(count / 2);

  await bitonicSort(ele, low, k, true);
  await bitonicSort(ele, low + k, k, false);
  await bitonicMerge(ele, low, count, dir);
}

async function bitonicMerge(ele, low, count, dir) {
  if (count <= 1) return;
  const k = Math.floor(count / 2);

  for (let i = low; i < low + k; i++) {
    if ((dir && parseInt(ele[i].style.height) > parseInt(ele[i+k].style.height)) ||
        (!dir && parseInt(ele[i].style.height) < parseInt(ele[i+k].style.height))) {
      swap(ele[i], ele[i+k]);
      await wait(80);
    }
  }
  await bitonicMerge(ele, low, k, dir);
  await bitonicMerge(ele, low + k, k, dir);
}
