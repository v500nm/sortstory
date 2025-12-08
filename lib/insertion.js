"use client";
import { wait, pauseCheck, isStopped } from "./core";

export async function insertionSort() {
  const ele = document.querySelectorAll(".bar");
  if (!ele.length) return;
  
  ele[0].style.background = "green";

  for (let i = 1; i < ele.length; i++) {
    if (isStopped) return;
    await pauseCheck();

    let j = i - 1;
    let temp = ele[i].style.height;

    while (j >= 0 && parseInt(ele[j].style.height) > parseInt(temp)) {
      if (isStopped) return;
      await wait(80);
      ele[j + 1].style.height = ele[j].style.height;
      j--;
    }
    ele[j + 1].style.height = temp;
    ele[i].style.background = "green";
  }
}
