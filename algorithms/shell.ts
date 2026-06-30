import type { SortContext } from "@/lib/types";

export async function shellSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      if (ctx.shouldStop()) return;
      await ctx.pauseCheck();

      ctx.highlight([i], "active");
      let j = i;

      while (j >= gap) {
        if (ctx.shouldStop()) return;

        const cmp = await ctx.compare(j - gap, j);
        if (cmp <= 0) break;

        await ctx.swap(j - gap, j);
        j -= gap;
      }

      ctx.highlight([j], "normal");
    }
    gap = Math.floor(gap / 2);
  }

  ctx.markAllSorted();
}
