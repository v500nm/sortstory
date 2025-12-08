"use client";
import { wait, pauseCheck, isStopped, swap } from "../lib/core";

export async function cocktailSort() {
  const ele = document.querySelectorAll(".bar");
  let start = 0, end = ele.length - 1, swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (parseInt(ele[i].style.height) > parseInt(ele[i+1].style.height)) {
        swap(ele[i], ele[i+1]);
        swapped = true;
        await wait(80);
      }
    }
    end--;

    for (let i = end; i > start; i--) {
      if (parseInt(ele[i].style.height) < parseInt(ele[i-1].style.height)) {
        swap(ele[i], ele[i-1]);
        swapped = true;
        await wait(80);
      }
    }
    start++;
  }
}
