"use client";
import { wait, pauseCheck, isStopped, swap } from "./core";

export async function pancakeSort() {
  const ele = document.querySelectorAll(".bar");

  function flip(end) {
    let start = 0;
    while (start < end) swap(ele[start++], ele[end--]);
  }

  for (let curr = ele.length - 1; curr > 0; curr--) {
    let maxIndex = 0;
    for (let i = 0; i <= curr; i++)
      if (parseInt(ele[i].style.height) > parseInt(ele[maxIndex].style.height)) maxIndex = i;

    flip(maxIndex);
    await wait(80);
    flip(curr);
    await wait(80);
  }
}
