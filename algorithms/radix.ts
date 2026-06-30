import type { SortContext } from "@/lib/types";

export async function radixSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;
  if (n === 0) return;

  // Find max value to determine number of digits
  let max = ctx.array[0];
  for (let i = 1; i < n; i++) {
    if (ctx.array[i] > max) max = ctx.array[i];
  }

  // Process each digit (LSD to MSD)
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    await countingSortByDigit(ctx, exp);
  }

  ctx.markAllSorted();
}

async function countingSortByDigit(ctx: SortContext, exp: number): Promise<void> {
  const n = ctx.array.length;
  const output: number[] = new Array(n);
  const count = new Array(10).fill(0);

  // Count occurrences of each digit
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(ctx.array[i] / exp) % 10;
    count[digit]++;
    ctx.highlight([i], "comparing");
    await ctx.delay();
    ctx.highlight([i], "normal");
  }

  // Cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build output array (stable, from right to left)
  for (let i = n - 1; i >= 0; i--) {
    if (ctx.shouldStop()) return;
    const digit = Math.floor(ctx.array[i] / exp) % 10;
    output[count[digit] - 1] = ctx.array[i];
    count[digit]--;
  }

  // Copy output back to array via setValue
  for (let i = 0; i < n; i++) {
    if (ctx.shouldStop()) return;
    await ctx.setValue(i, output[i]);
    ctx.highlight([i], "active");
  }

  // Reset colors
  ctx.resetColors();
}
