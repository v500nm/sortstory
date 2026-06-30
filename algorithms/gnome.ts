import type { SortContext } from "@/lib/types";

export async function gnomeSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  let pos = 0;

  while (pos < n) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    if (pos === 0) {
      pos++;
      continue;
    }

    const cmp = await ctx.compare(pos, pos - 1);
    if (cmp >= 0) {
      pos++;
    } else {
      await ctx.swap(pos, pos - 1);
      pos--;
    }
  }

  ctx.markAllSorted();
}
