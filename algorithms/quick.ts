import type { SortContext } from "@/lib/types";

export async function quickSortWrapper(ctx: SortContext): Promise<void> {
  await quickSort(ctx, 0, ctx.array.length - 1);
  if (!ctx.shouldStop()) ctx.markAllSorted();
}

async function quickSort(ctx: SortContext, low: number, high: number): Promise<void> {
  if (low >= high || ctx.shouldStop()) return;
  await ctx.pauseCheck();

  const pivotIdx = await partition(ctx, low, high);
  if (ctx.shouldStop()) return;

  ctx.markSorted(pivotIdx);
  await quickSort(ctx, low, pivotIdx - 1);
  await quickSort(ctx, pivotIdx + 1, high);
}

async function partition(ctx: SortContext, low: number, high: number): Promise<number> {
  // Use last element as pivot
  ctx.highlight([high], "pivot");
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (ctx.shouldStop()) return low;
    await ctx.pauseCheck();

    ctx.highlight([j], "comparing");
    const cmp = await ctx.compare(j, high);

    if (cmp < 0) {
      i++;
      if (i !== j) {
        await ctx.swap(i, j);
      }
    }
    // Reset color if not pivot
    if (j !== high) ctx.highlight([j], "normal");
  }

  // Place pivot in correct position
  if (i + 1 !== high) {
    await ctx.swap(i + 1, high);
  }

  return i + 1;
}
