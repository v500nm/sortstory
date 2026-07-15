---
title: Introduction to Shell Sort
order: 1
type: lesson
---

# Shell Sort (GeeksforGeeks Reference)

Shell Sort is an in-place comparison sort. It is a generalization of insertion sort that allows the exchange of far apart elements.

## Algorithmic Steps
Here is the step-by-step logic tracing **Shell Sort**:
- Initialize gap value h = n / 2.
- Perform a gapped insertion sort for this gap size.
- Reduce the gap size (e.g., divide by 2).
- Repeat steps 2-3 until gap is 0.

## Complexity Breakdown
The computational complexity profile of **Shell Sort** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(N log N)` |
| **Average Case Time** | `O(N^(1.5))` |
| **Worst Case Time** | `O(N²)` |
| **Space Complexity** | `O(1)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
