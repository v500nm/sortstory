"use client";
import { wait, pauseCheck, isStopped } from "../lib/core";

export async function mergeSortWrapper() {
  const ele = document.querySelectorAll(".bar");
  await mergeSort(ele, 0, ele.length - 1);
  ele.forEach(e => e.style.background = "green");
}

async function mergeSort(ele, l, r) {
  if (l >= r || isStopped) return;
  await pauseCheck();

  const m = Math.floor((l + r) / 2);
  await mergeSort(ele, l, m);
  await mergeSort(ele, m + 1, r);
  await merge(ele, l, m, r);
}

async function merge(ele, low, mid, high) {
  let left = [], right = [];
  for (let i = low; i <= mid; i++) left.push(ele[i].style.height);
  for (let i = mid + 1; i <= high; i++) right.push(ele[i].style.height);

  let i = 0, j = 0, k = low;
  while (i < left.length && j < right.length) {
    await wait(80);
    ele[k++].style.height = parseInt(left[i]) <= parseInt(right[j]) ? left[i++] : right[j++];
  }
  while (i < left.length) ele[k++].style.height = left[i++];
  while (j < right.length) ele[k++].style.height = right[j++];
}
