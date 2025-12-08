"use client";
import { wait, pauseCheck, isStopped, swap } from "../lib/core";

export async function gnomeSort() {
  const ele = document.querySelectorAll(".bar");
  let i = 0;

  while (i < ele.length) {
    if (i === 0 || parseInt(ele[i].style.height) >= parseInt(ele[i-1].style.height)) {
      i++;
    } else {
      swap(ele[i], ele[i-1]);
      i--;
    }
    await wait(80);
  }
}
