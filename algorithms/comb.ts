import type { SortContext } from "@/lib/types";

export async function combSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  let gap = n;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < n; i++) {
      if (ctx.shouldStop()) return;
      await ctx.pauseCheck();

      const cmp = await ctx.compare(i, i + gap);
      if (cmp > 0) {
        await ctx.swap(i, i + gap);
        sorted = false;
      }
    }
  }

  ctx.markAllSorted();
}
