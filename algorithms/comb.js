"use client";
import { wait, pauseCheck, isStopped, swap } from "../lib/core";

export async function combSort() {
  const ele = document.querySelectorAll(".bar");
  let gap = ele.length, swapped = true;

  while (gap !== 1 || swapped) {
    gap = Math.floor(gap / 1.3);
    if (gap < 1) gap = 1;
    swapped = false;

    for (let i = 0; i + gap < ele.length; i++) {
      if (parseInt(ele[i].style.height) > parseInt(ele[i+gap].style.height)) {
        swap(ele[i], ele[i+gap]);
        swapped = true;
        await wait(80);
      }
    }
  }
}
