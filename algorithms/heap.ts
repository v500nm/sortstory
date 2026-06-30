import type { SortContext } from "@/lib/types";

export async function heapSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (ctx.shouldStop()) return;
    await heapify(ctx, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    await ctx.swap(0, i);
    ctx.markSorted(i);

    await heapify(ctx, i, 0);
  }
  ctx.markSorted(0);
}

async function heapify(ctx: SortContext, heapSize: number, rootIdx: number): Promise<void> {
  if (ctx.shouldStop()) return;
  await ctx.pauseCheck();

  let largest = rootIdx;
  const left = 2 * rootIdx + 1;
  const right = 2 * rootIdx + 2;

  ctx.highlight([rootIdx], "active");

  if (left < heapSize) {
    const cmp = await ctx.compare(left, largest);
    if (cmp > 0) largest = left;
  }

  if (right < heapSize) {
    const cmp = await ctx.compare(right, largest);
    if (cmp > 0) largest = right;
  }

  if (largest !== rootIdx) {
    await ctx.swap(rootIdx, largest);
    await heapify(ctx, heapSize, largest);
  }

  ctx.highlight([rootIdx], "normal");
}
