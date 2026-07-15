---
title: Introduction to Heap Sort
order: 1
type: lesson
---

# Heap Sort (GeeksforGeeks Reference)

Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place it at the end.

## Algorithmic Steps
Here is the step-by-step logic tracing **Heap Sort**:
- Build a Max-Heap from the input array.
- The largest element is now at the root of the heap (index 0).
- Swap the root with the last element of the heap.
- Reduce the heap size by 1.
- Heapify the root of the tree to restore the Max-Heap property.
- Repeat until heap size is 1.

## Complexity Breakdown
The computational complexity profile of **Heap Sort** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(N log N)` |
| **Average Case Time** | `O(N log N)` |
| **Worst Case Time** | `O(N log N)` |
| **Space Complexity** | `O(1)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
