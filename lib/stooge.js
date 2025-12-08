"use client";
import { wait, pauseCheck, isStopped, swap } from "./core";

export async function stoogeSortWrapper() {
  const ele = document.querySelectorAll(".bar");
  await stooge(ele, 0, ele.length - 1);
}

async function stooge(ele, i, j) {
  if (parseInt(ele[i].style.height) > parseInt(ele[j].style.height)) swap(ele[i], ele[j]);

  if (j - i > 1) {
    let t = Math.floor((j - i + 1) / 3);
    await stooge(ele, i, j - t);
    await stooge(ele, i + t, j);
    await stooge(ele, i, j - t);
    await wait(80);
  }
}
