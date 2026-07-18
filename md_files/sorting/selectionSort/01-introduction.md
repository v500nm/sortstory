---
title: Introduction to Selection Sort
order: 1
type: lesson
---

# Selection Sort (GeeksforGeeks Reference)

Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. It repeatedly finds the smallest element in the unsorted portion and swaps it with the leftmost unsorted element.

## Algorithmic Steps
Here is the step-by-step logic tracing **Selection Sort**:
- Assume the first element is the minimum.
- Scan the rest of the array to find if there is a smaller element.
- If a smaller element is found, update the minimum index.
- At the end of the scan, swap the minimum element with the first element of the unsorted portion.
- Move the starting boundary one step to the right and repeat until sorted.

## Complexity Breakdown
The computational complexity profile of **Selection Sort** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(N²)` |
| **Average Case Time** | `O(N²)` |
| **Worst Case Time** | `O(N²)` |
| **Space Complexity** | `O(1)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
