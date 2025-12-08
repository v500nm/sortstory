"use client";
import { wait, pauseCheck, isStopped, swap } from "./core";

export async function quickSortWrapper() {
  const ele = document.querySelectorAll(".bar");
  await quickSort(ele, 0, ele.length - 1);
  ele.forEach(e => e.style.background = "green");
}

async function quickSort(ele, l, r) {
  if (l >= r || isStopped) return;
  await pauseCheck();
  
  let pivot = await getPivot(ele, l, r);
  await quickSort(ele, l, pivot - 1);
  await quickSort(ele, pivot + 1, r);
}

async function getPivot(ele, l, r) {
  let pivot = l, i = l + 1, j = r;

  while (i <= j) {
    if (isStopped) return;
    await pauseCheck();

    while (i <= r && parseInt(ele[i].style.height) <= parseInt(ele[pivot].style.height)) {
      await wait(80);
      i++;
    }
    while (j > l && parseInt(ele[j].style.height) > parseInt(ele[pivot].style.height)) {
      await wait(80);
      j--;
    }

    if (i < j) {
      swap(ele[i], ele[j]);
      await wait(80);
    }
  }
  swap(ele[pivot], ele[j]);
  return j;
}
