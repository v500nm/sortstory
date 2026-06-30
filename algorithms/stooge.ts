import type { SortContext } from "@/lib/types";

export async function stoogeSortWrapper(ctx: SortContext): Promise<void> {
  await stoogeSort(ctx, 0, ctx.array.length - 1);
  if (!ctx.shouldStop()) ctx.markAllSorted();
}

async function stoogeSort(ctx: SortContext, i: number, j: number): Promise<void> {
  if (i >= j || ctx.shouldStop()) return;
  await ctx.pauseCheck();

  const cmp = await ctx.compare(i, j);
  if (cmp > 0) {
    await ctx.swap(i, j);
  }

  if (j - i + 1 > 2) {
    const t = Math.floor((j - i + 1) / 3);
    await stoogeSort(ctx, i, j - t);
    await stoogeSort(ctx, i + t, j);
    await stoogeSort(ctx, i, j - t);
  }
}
