import type { SortContext } from "@/lib/types";

export async function pancakeSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;

  for (let currSize = n; currSize > 1; currSize--) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    // Find index of the maximum element in arr[0..currSize-1]
    let maxIdx = 0;
    for (let i = 1; i < currSize; i++) {
      if (ctx.shouldStop()) return;
      const cmp = await ctx.compare(i, maxIdx);
      if (cmp > 0) maxIdx = i;
    }

    if (maxIdx !== currSize - 1) {
      // Flip max to front if not already there
      if (maxIdx !== 0) {
        await flip(ctx, maxIdx);
      }
      // Flip to its correct position
      await flip(ctx, currSize - 1);
    }

    ctx.markSorted(currSize - 1);
  }
  ctx.markSorted(0);
}

async function flip(ctx: SortContext, end: number): Promise<void> {
  let start = 0;
  while (start < end) {
    if (ctx.shouldStop()) return;
    ctx.highlight([start, end], "active");
    await ctx.swap(start, end);
    start++;
    end--;
  }
}
