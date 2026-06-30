import type { SortContext } from "@/lib/types";

export async function cocktailSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  let start = 0;
  let end = n - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    // Forward pass
    for (let i = start; i < end; i++) {
      if (ctx.shouldStop()) return;
      await ctx.pauseCheck();

      const cmp = await ctx.compare(i, i + 1);
      if (cmp > 0) {
        await ctx.swap(i, i + 1);
        swapped = true;
      }
    }
    ctx.markSorted(end);
    end--;

    if (!swapped) break;
    swapped = false;

    // Backward pass
    for (let i = end; i > start; i--) {
      if (ctx.shouldStop()) return;
      await ctx.pauseCheck();

      const cmp = await ctx.compare(i - 1, i);
      if (cmp > 0) {
        await ctx.swap(i - 1, i);
        swapped = true;
      }
    }
    ctx.markSorted(start);
    start++;
  }

  // Mark remaining as sorted
  for (let i = start; i <= end; i++) {
    ctx.markSorted(i);
  }
}
