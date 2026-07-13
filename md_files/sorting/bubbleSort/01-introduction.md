---
title: Introduction to Bubble Sort
order: 1
type: lesson
---

# Bubble Sort: The Basics

Bubble sort is often the first sorting algorithm taught in computer science classes. It's conceptually simple but highly inefficient for large datasets.

## How it works
The algorithm repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. 

It gets its name because smaller elements "bubble" to the top of the list (or larger elements bubble to the end, depending on the implementation).

### Visualizing the process
Imagine you have an array: `[5, 3, 8, 4, 2]`

1. Compare 5 and 3. Since 5 > 3, swap them. `[3, 5, 8, 4, 2]`
2. Compare 5 and 8. Since 5 < 8, do nothing. `[3, 5, 8, 4, 2]`
3. Compare 8 and 4. Since 8 > 4, swap them. `[3, 5, 4, 8, 2]`
4. Compare 8 and 2. Since 8 > 2, swap them. `[3, 5, 4, 2, 8]`

After one full pass, the largest element (8) is guaranteed to be at the end of the array. The algorithm then repeats the process for the remaining elements until the array is fully sorted.

## Complexity
- **Time Complexity:** O(n²) in average and worst cases. O(n) in best case (if the array is already sorted and optimized).
- **Space Complexity:** O(1) as it sorts in-place.
