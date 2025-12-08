"use client";
import { wait, pauseCheck, isStopped, swap } from "./core";

export async function bogoSort() {
  const ele = document.querySelectorAll(".bar");

  function sorted() {
    for (let i = 1; i < ele.length; i++)
      if (parseInt(ele[i].style.height) < parseInt(ele[i-1].style.height))
        return false;
    return true;
  }

  while (!sorted()) {
    let a = Math.floor(Math.random() * ele.length);
    let b = Math.floor(Math.random() * ele.length);
    swap(ele[a], ele[b]);
    await wait(80);
  }
}
