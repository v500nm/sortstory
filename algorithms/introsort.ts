import type { SortContext } from "@/lib/types";

export async function introSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  const depthLimit = 2 * Math.floor(Math.log2(n));

  await introSortRecursive(ctx, 0, n - 1, depthLimit);

  if (!ctx.shouldStop()) ctx.markAllSorted();
}

async function introSortRecursive(
  ctx: SortContext,
  begin: number,
  end: number,
  depthLimit: number
): Promise<void> {
  const size = end - begin;
  if (size < 1) return;
  if (ctx.shouldStop()) return;
  await ctx.pauseCheck();

  if (depthLimit === 0) {
    // Switch to Heapsort
    await heapSortSubarray(ctx, begin, end);
    return;
  }

  const pivot = await partition(ctx, begin, end);
  await introSortRecursive(ctx, begin, pivot - 1, depthLimit - 1);
  await introSortRecursive(ctx, pivot + 1, end, depthLimit - 1);
}

async function partition(ctx: SortContext, low: number, high: number): Promise<number> {
  ctx.highlight([high], "pivot");
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (ctx.shouldStop()) return low;
    
    const comp = await ctx.compare(j, high);
    if (comp < 0) {
      i++;
      await ctx.swap(i, j);
    }
  }

  await ctx.swap(i + 1, high);
  ctx.highlight([high], "normal");
  return i + 1;
}

async function heapSortSubarray(ctx: SortContext, begin: number, end: number): Promise<void> {
  const n = end - begin + 1;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (ctx.shouldStop()) return;
    await heapify(ctx, n, i, begin);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    if (ctx.shouldStop()) return;
    
    // Move current root to end
    await ctx.swap(begin, begin + i);
    ctx.highlight([begin + i], "sorted");

    // Call max heapify on the reduced heap
    await heapify(ctx, i, 0, begin);
  }
}

async function heapify(
  ctx: SortContext,
  n: number,
  i: number,
  offset: number
): Promise<void> {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  if (l < n) {
    const compL = await ctx.compare(offset + l, offset + largest);
    if (compL > 0) largest = l;
  }

  if (r < n) {
    const compR = await ctx.compare(offset + r, offset + largest);
    if (compR > 0) largest = r;
  }

  if (largest !== i) {
    await ctx.swap(offset + i, offset + largest);
    await heapify(ctx, n, largest, offset);
  }
}
