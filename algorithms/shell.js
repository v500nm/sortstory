"use client";
import { wait, pauseCheck, isStopped } from "../lib/core";

export async function shellSort() {
  const ele = document.querySelectorAll(".bar");
  let gap = Math.floor(ele.length / 2);

  while (gap > 0) {
    for (let i = gap; i < ele.length; i++) {
      let temp = ele[i].style.height, j = i;

      while (j >= gap && parseInt(ele[j - gap].style.height) > parseInt(temp)) {
        ele[j].style.height = ele[j-gap].style.height;
        j -= gap;
        await wait(80);
      }
      ele[j].style.height = temp;
    }
    gap = Math.floor(gap / 2);
  }
}
