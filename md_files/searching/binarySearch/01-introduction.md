---
title: Introduction to Binary Search
order: 1
type: lesson
---

# Binary Search (GeeksforGeeks Reference)

Binary Search is a highly efficient search algorithm that works by repeatedly dividing the search interval in half. The array must be sorted.

## Algorithmic Steps
Here is the step-by-step logic tracing **Binary Search**:
- Ensure the array is sorted.
- Calculate the middle index: mid = left + (right - left) / 2.
- Compare target with middle element.
- If target equals middle element, return mid.
- If target is smaller, adjust right pointer to mid - 1.
- If target is larger, adjust left pointer to mid + 1.
- Repeat steps 2-6 until pointers cross. Return -1 if target is not found.

## Complexity Breakdown
The computational complexity profile of **Binary Search** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(1)` |
| **Average Case Time** | `O(log N)` |
| **Worst Case Time** | `O(log N)` |
| **Space Complexity** | `O(1)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
