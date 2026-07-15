---
title: Introduction to Linear Search
order: 1
type: lesson
---

# Linear Search (GeeksforGeeks Reference)

Linear Search sequentially checks each element in the collection until a match is found or the end is reached. It does not require sorted data.

## Algorithmic Steps
Here is the step-by-step logic tracing **Linear Search**:
- Start from the leftmost element of the array.
- Compare the search target value with the current element.
- If target matches, return the current index.
- If target does not match, move to the next element.
- Repeat steps 2-4 until target is found or array bounds are exceeded.
- If the end of array is reached without finding target, return -1.

## Complexity Breakdown
The computational complexity profile of **Linear Search** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(1)` |
| **Average Case Time** | `O(N)` |
| **Worst Case Time** | `O(N)` |
| **Space Complexity** | `O(1)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
