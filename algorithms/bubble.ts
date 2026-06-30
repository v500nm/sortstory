import type { SortContext } from "@/lib/types";

export async function bubbleSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (ctx.shouldStop()) return;
      await ctx.pauseCheck();

      const cmp = await ctx.compare(j, j + 1);
      if (cmp > 0) {
        await ctx.swap(j, j + 1);
        swapped = true;
      }
    }

    ctx.markSorted(n - 1 - i);

    // Optimization: if no swaps occurred, array is sorted
    if (!swapped) {
      for (let k = 0; k < n - i - 1; k++) {
        ctx.markSorted(k);
      }
      break;
    }
  }
  ctx.markSorted(0);
}
