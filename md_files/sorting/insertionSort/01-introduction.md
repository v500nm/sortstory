---
title: Introduction to Insertion Sort
order: 1
type: lesson
---

# Insertion Sort (GeeksforGeeks Reference)

Insertion Sort builds the final sorted array one item at a time. It iterates through the input, removing one element per iteration and inserting it into its correct position within the sorted list.

## Algorithmic Steps
Here is the step-by-step logic tracing **Insertion Sort**:
- Assume the first element is already sorted.
- Pick the next element and store it in a temporary variable (key).
- Compare the key with the elements in the sorted portion (moving backwards).
- If a sorted element is greater than the key, shift it one position to the right.
- Repeat until you find an element smaller than the key or reach the beginning.
- Insert the key into the correct position.

## Complexity Breakdown
The computational complexity profile of **Insertion Sort** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(N)` |
| **Average Case Time** | `O(N²)` |
| **Worst Case Time** | `O(N²)` |
| **Space Complexity** | `O(1)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
