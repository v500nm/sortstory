"use client";
import { wait, pauseCheck, isStopped, swap } from "../lib/core";

export async function bubbleSort() {
  const ele = document.querySelectorAll(".bar");
  for (let i = 0; i < ele.length - 1; i++) {
    for (let j = 0; j < ele.length - i - 1; j++) {
      if (isStopped) return;
      await pauseCheck();

      if (parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)) {
        await wait(80);
        swap(ele[j], ele[j+1]);
      }
    }
    ele[ele.length - 1 - i].style.background = "green";
  }
}
