import type { SortContext } from "@/lib/types";

export async function selectionSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;

  for (let i = 0; i < n - 1; i++) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    let minIdx = i;
    ctx.highlight([i], "pivot");

    for (let j = i + 1; j < n; j++) {
      if (ctx.shouldStop()) return;

      const cmp = await ctx.compare(j, minIdx);
      if (cmp < 0) {
        // Reset old min highlight
        if (minIdx !== i) ctx.highlight([minIdx], "normal");
        minIdx = j;
        ctx.highlight([minIdx], "pivot");
      }
    }

    if (minIdx !== i) {
      await ctx.swap(i, minIdx);
    }

    ctx.markSorted(i);
  }
  ctx.markSorted(n - 1);
}
