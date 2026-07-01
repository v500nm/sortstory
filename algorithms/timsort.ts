import type { SortContext } from "@/lib/types";

const RUN = 16;

export async function timSort(ctx: SortContext): Promise<void> {
  const n = ctx.array.length;

  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += RUN) {
    if (ctx.shouldStop()) return;
    await insertionSort(ctx, i, Math.min(i + RUN - 1, n - 1));
  }

  // Merge the sorted runs
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      if (ctx.shouldStop()) return;
      
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        await merge(ctx, left, mid, right);
      }
    }
  }

  if (!ctx.shouldStop()) ctx.markAllSorted();
}

async function insertionSort(ctx: SortContext, left: number, right: number): Promise<void> {
  for (let i = left + 1; i <= right; i++) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    let j = i;
    while (j > left) {
      if (ctx.shouldStop()) return;
      await ctx.pauseCheck();
      
      const comp = await ctx.compare(j - 1, j);
      if (comp > 0) {
        await ctx.swap(j, j - 1);
        j--;
      } else {
        break;
      }
    }
  }
}

async function merge(ctx: SortContext, left: number, mid: number, right: number): Promise<void> {
  if (ctx.shouldStop()) return;

  const leftArr: number[] = [];
  const rightArr: number[] = [];

  for (let i = left; i <= mid; i++) leftArr.push(ctx.array[i]);
  for (let i = mid + 1; i <= right; i++) rightArr.push(ctx.array[i]);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (ctx.shouldStop()) return;
    await ctx.pauseCheck();

    ctx.highlight([k], "comparing");

    // We do a "virtual" compare incrementing metrics manually would require modifying SortContext, 
    // but the existing merge sort just sets values. Let's do it same as merge sort.
    if (leftArr[i] <= rightArr[j]) {
      await ctx.setValue(k, leftArr[i]);
      i++;
    } else {
      await ctx.setValue(k, rightArr[j]);
      j++;
    }
    ctx.highlight([k], "active");
    k++;
  }

  while (i < leftArr.length) {
    if (ctx.shouldStop()) return;
    await ctx.setValue(k, leftArr[i]);
    ctx.highlight([k], "active");
    i++;
    k++;
  }

  while (j < rightArr.length) {
    if (ctx.shouldStop()) return;
    await ctx.setValue(k, rightArr[j]);
    ctx.highlight([k], "active");
    j++;
    k++;
  }

  for (let idx = left; idx <= right; idx++) {
    ctx.highlight([idx], "normal");
  }
}
