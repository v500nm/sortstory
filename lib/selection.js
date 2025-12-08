"use client";
import { wait, pauseCheck, isStopped, swap } from "./core";

export async function selectionSort() {
  const ele = document.querySelectorAll(".bar");

  for (let i = 0; i < ele.length; i++) {
    if (isStopped) return;
    await pauseCheck();

    let min = i;
    for (let j = i + 1; j < ele.length; j++) {
      if (parseInt(ele[j].style.height) < parseInt(ele[min].style.height)) min = j;
    }

    await wait(80);
    swap(ele[min], ele[i]);
    ele[i].style.background = "green";
  }
}
