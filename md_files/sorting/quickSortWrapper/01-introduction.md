---
title: Introduction to Quick Sort
order: 1
type: lesson
---

# Quick Sort (GeeksforGeeks Reference)

Quick Sort is an efficient, in-place, divide-and-conquer sorting algorithm. It selects a 'pivot' element from the array and partitions the other elements into two sub-arrays.

## Algorithmic Steps
Here is the step-by-step logic tracing **Quick Sort**:
- Choose a 'pivot' element from the array.
- Partitioning: Reorder the array so that all elements smaller than the pivot come before it, and all elements greater come after.
- The pivot is now in its final sorted position.
- Recursively apply the above steps to the sub-array of smaller values and the sub-array of greater values.

## Complexity Breakdown
The computational complexity profile of **Quick Sort** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(N log N)` |
| **Average Case Time** | `O(N log N)` |
| **Worst Case Time** | `O(N²)` |
| **Space Complexity** | `O(log N)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
