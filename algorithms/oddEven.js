"use client";
import { wait, pauseCheck, isStopped, swap } from "../lib/core";

export async function oddEvenSort() {
  const ele = document.querySelectorAll(".bar");
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 1; i < ele.length - 1; i += 2) {
      if (parseInt(ele[i].style.height) > parseInt(ele[i+1].style.height)) {
        swap(ele[i], ele[i+1]);
        sorted = false;
        await wait(80);
      }
    }
    for (let i = 0; i < ele.length - 1; i += 2) {
      if (parseInt(ele[i].style.height) > parseInt(ele[i+1].style.height)) {
        swap(ele[i], ele[i+1]);
        sorted = false;
        await wait(80);
      }
    }
  }
}
