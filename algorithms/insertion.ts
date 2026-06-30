import type { SortContext } from "@/lib/types";

export async function insertionSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  ctx.markSorted(0);

  for (let i = 1; i < n; i++) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    const key = ctx.array[i];
    ctx.highlight([i], "active");
    let j = i - 1;

    while (j >= 0) {
      if (ctx.shouldStop()) return;

      const cmp = await ctx.compare(j, j + 1);
      if (cmp <= 0) break;

      await ctx.swap(j, j + 1);
      j--;
    }

    ctx.markSorted(i);
    // Re-mark all previously sorted items
    for (let k = 0; k <= i; k++) {
      ctx.markSorted(k);
    }
  }
}
