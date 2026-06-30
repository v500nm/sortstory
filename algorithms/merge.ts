import type { SortContext } from "@/lib/types";

export async function mergeSortWrapper(ctx: SortContext): Promise<void> {
  await mergeSort(ctx, 0, ctx.array.length - 1);
  if (!ctx.shouldStop()) ctx.markAllSorted();
}

async function mergeSort(ctx: SortContext, left: number, right: number): Promise<void> {
  if (left >= right || ctx.shouldStop()) return;
  await ctx.pauseCheck();

  const mid = Math.floor((left + right) / 2);
  await mergeSort(ctx, left, mid);
  await mergeSort(ctx, mid + 1, right);
  await merge(ctx, left, mid, right);
}

async function merge(ctx: SortContext, left: number, mid: number, right: number): Promise<void> {
  if (ctx.shouldStop()) return;

  // Copy subarrays
  const leftArr: number[] = [];
  const rightArr: number[] = [];

  for (let i = left; i <= mid; i++) leftArr.push(ctx.array[i]);
  for (let i = mid + 1; i <= right; i++) rightArr.push(ctx.array[i]);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    // Highlight the merge region
    ctx.highlight([k], "comparing");

    // We do a "virtual" compare — incrementing metrics manually
    // since the values are in temp arrays, not in the main array at proper indices
    if (leftArr[i] <= rightArr[j]) {
      await ctx.setValue(k, leftArr[i]);
      i++;
    } else {
      await ctx.setValue(k, rightArr[j]);
      j++;
    }
    ctx.highlight([k], "active");
    k++;
  }

  while (i < leftArr.length) {
    if (ctx.shouldStop()) return;
    await ctx.setValue(k, leftArr[i]);
    ctx.highlight([k], "active");
    i++;
    k++;
  }

  while (j < rightArr.length) {
    if (ctx.shouldStop()) return;
    await ctx.setValue(k, rightArr[j]);
    ctx.highlight([k], "active");
    j++;
    k++;
  }

  // Reset merged region colors
  for (let idx = left; idx <= right; idx++) {
    ctx.highlight([idx], "normal");
  }
}
