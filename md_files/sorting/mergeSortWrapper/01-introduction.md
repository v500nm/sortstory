---
title: Introduction to Merge Sort
order: 1
type: lesson
---

# Merge Sort (GeeksforGeeks Reference)

Merge Sort is a stable, divide-and-conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves.

## Algorithmic Steps
Here is the step-by-step logic tracing **Merge Sort**:
- Base case: If the array has 1 or 0 elements, it is already sorted.
- Divide the array down the middle into a 'left' and 'right' half.
- Recursively call Merge Sort on both halves.
- Once the recursive calls return, 'Merge' the two sorted halves back together.
- During merge, maintain two pointers, compare elements from both halves, and place the smaller element into a new temporary array.
- Copy the merged temporary array back into the original array.

## Complexity Breakdown
The computational complexity profile of **Merge Sort** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(N log N)` |
| **Average Case Time** | `O(N log N)` |
| **Worst Case Time** | `O(N log N)` |
| **Space Complexity** | `O(N)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
