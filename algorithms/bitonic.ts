import type { SortContext } from "@/lib/types";

export async function bitonicSortWrapper(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  // Pad to power of 2 is not needed — we just work with what we have
  await bitonicSort(ctx, 0, n, true);
  if (!ctx.shouldStop()) ctx.markAllSorted();
}

async function bitonicSort(ctx: SortContext, low: number, cnt: number, ascending: boolean): Promise<void> {
  if (cnt <= 1 || ctx.shouldStop()) return;

  const mid = Math.floor(cnt / 2);
  await bitonicSort(ctx, low, mid, true);
  await bitonicSort(ctx, low + mid, cnt - mid, false);
  await bitonicMerge(ctx, low, cnt, ascending);
}

async function bitonicMerge(ctx: SortContext, low: number, cnt: number, ascending: boolean): Promise<void> {
  if (cnt <= 1 || ctx.shouldStop()) return;

  const mid = greatestPowerOfTwoLessThan(cnt);

  for (let i = low; i < low + cnt - mid; i++) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    const cmp = await ctx.compare(i, i + mid);
    if ((ascending && cmp > 0) || (!ascending && cmp < 0)) {
      await ctx.swap(i, i + mid);
    }
  }

  await bitonicMerge(ctx, low, mid, ascending);
  await bitonicMerge(ctx, low + mid, cnt - mid, ascending);
}

function greatestPowerOfTwoLessThan(n: number): number {
  let k = 1;
  while (k < n) k <<= 1;
  return k >> 1;
}
