---
title: Introduction to Radix Sort
order: 1
type: lesson
---

# Radix Sort (GeeksforGeeks Reference)

Radix Sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets based on radix of individual digits.

## Algorithmic Steps
Here is the step-by-step logic tracing **Radix Sort**:
- Find the maximum number in the array to determine the number of digits (d).
- Perform counting sort on the array for each digit place (1s, 10s, 100s, etc.).
- Reassemble the array after each pass, preserving the relative order of elements with equal digit values.

## Complexity Breakdown
The computational complexity profile of **Radix Sort** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | `O(d * (N + b))` |
| **Average Case Time** | `O(d * (N + b))` |
| **Worst Case Time** | `O(d * (N + b))` |
| **Space Complexity** | `O(N + b)` |

## Practical Applications
- Found in standard systems architecture and embedded systems.
- Utilized in various software database engines for index generation.
