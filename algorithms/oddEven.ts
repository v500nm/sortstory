import type { SortContext } from "@/lib/types";

export async function oddEvenSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;

    // Odd phase
    for (let i = 1; i < n - 1; i += 2) {
      if (ctx.shouldStop()) return;
      await ctx.pauseCheck();

      const cmp = await ctx.compare(i, i + 1);
      if (cmp > 0) {
        await ctx.swap(i, i + 1);
        sorted = false;
      }
    }

    // Even phase
    for (let i = 0; i < n - 1; i += 2) {
      if (ctx.shouldStop()) return;
      await ctx.pauseCheck();

      const cmp = await ctx.compare(i, i + 1);
      if (cmp > 0) {
        await ctx.swap(i, i + 1);
        sorted = false;
      }
    }
  }

  ctx.markAllSorted();
}
