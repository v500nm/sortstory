"use client";
import { wait } from "../lib/core";

export async function radixSort() {
  const ele = document.querySelectorAll(".bar");
  let max = Math.max(...[...ele].map(e => parseInt(e.style.height)));

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await counting(ele, exp);
  }
}

async function counting(ele, exp) {
  let out = [], count = Array(10).fill(0);

  ele.forEach(e => count[Math.floor(parseInt(e.style.height)/exp) % 10]++);
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];

  for (let i = ele.length - 1; i >= 0; i--) {
    let idx = Math.floor(parseInt(ele[i].style.height) / exp) % 10;
    out[count[idx] - 1] = ele[i].style.height;
    count[idx]--;
  }

  for (let i = 0; i < ele.length; i++) {
    ele[i].style.height = out[i];
    await wait(80);
  }
}
