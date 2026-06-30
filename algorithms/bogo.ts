import type { SortContext } from "@/lib/types";

export async function bogoSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  let maxIterations = 1000; // Safety limit

  while (!isSorted(ctx) && maxIterations > 0) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    // Shuffle using Fisher-Yates
    for (let i = n - 1; i > 0; i--) {
      if (ctx.shouldStop()) return;
      const j = Math.floor(Math.random() * (i + 1));
      if (i !== j) {
        await ctx.swap(i, j);
      }
    }
    maxIterations--;
  }

  if (!ctx.shouldStop()) ctx.markAllSorted();
}

function isSorted(ctx: SortContext): boolean {
  for (let i = 1; i < ctx.array.length; i++) {
    if (ctx.array[i - 1] > ctx.array[i]) return false;
  }
  return true;
}
