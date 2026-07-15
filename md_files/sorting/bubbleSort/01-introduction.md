---
title: Introduction to Bubble Sort
order: 1
type: lesson
---

# Bubble Sort (GeeksforGeeks Reference)

Bubble Sort is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

## Algorithmic Steps
Here is the step-by-step logic tracing **Bubble Sort**:
- Start at the first element (index 0).
- Compare it to the next element (index 1).
- If the first is greater than the second, swap them.
- Move to the next pair (index 1 and 2) and repeat.
- Continue to the end of the array. The largest element will 'bubble' to the last position.
- Repeat the entire process n-1 times for the remaining unsorted portion.

## Complexity Breakdown
The computational complexity profile of **Bubble Sort** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(N)` |
| **Average Case Time** | `O(N²)` |
| **Worst Case Time** | `O(N²)` |
| **Space Complexity** | `O(1)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
