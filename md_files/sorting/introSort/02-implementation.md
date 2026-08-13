---
title: Implementing Intro Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Intro Sort** in multiple programming languages.

## JavaScript
```javascript
function introSort(arr) {
  let depthLimit = 2 * Math.floor(Math.log2(arr.length));
  introSortRecursive(arr, 0, arr.length - 1, depthLimit);
}
function introSortRecursive(arr, begin, end, depthLimit) {
  if (end - begin < 1) return;
  if (depthLimit === 0) {
    heapSortSubarray(arr, begin, end);
    return;
  }
  let pivot = partition(arr, begin, end);
  introSortRecursive(arr, begin, pivot - 1, depthLimit - 1);
  introSortRecursive(arr, pivot + 1, end, depthLimit - 1);
}
```

## TypeScript
```typescript
function introSort(arr: number[]): void {
  let depthLimit = 2 * Math.floor(Math.log2(arr.length));
  introSortRecursive(arr, 0, arr.length - 1, depthLimit);
}
function introSortRecursive(arr: number[], begin: number, end: number, depthLimit: number): void {
  if (end - begin < 1) return;
  if (depthLimit === 0) {
    heapSortSubarray(arr, begin, end);
    return;
  }
  let pivot = partition(arr, begin, end);
  introSortRecursive(arr, begin, pivot - 1, depthLimit - 1);
  introSortRecursive(arr, pivot + 1, end, depthLimit - 1);
}
```

## Python
```python
import math
def intro_sort(arr):
    depth_limit = 2 * math.floor(math.log2(len(arr)))
    intro_sort_recursive(arr, 0, len(arr) - 1, depth_limit)
def intro_sort_recursive(arr, begin, end, depth_limit):
    if end - begin < 1: return
    if depth_limit == 0:
        heap_sort_subarray(arr, begin, end)
        return
    pivot = partition(arr, begin, end)
    intro_sort_recursive(arr, begin, pivot - 1, depth_limit - 1)
    intro_sort_recursive(arr, pivot + 1, end, depth_limit - 1)
```

## Java
```java
public void introSort(int[] arr) {
    int depthLimit = (int)(2 * Math.floor(Math.log(arr.length) / Math.log(2)));
    introSortRecursive(arr, 0, arr.length - 1, depthLimit);
}
private void introSortRecursive(int[] arr, int begin, int end, int depthLimit) {
    if (end - begin < 1) return;
    if (depthLimit == 0) {
        heapSortSubarray(arr, begin, end);
        return;
    }
    int pivot = partition(arr, begin, end);
    introSortRecursive(arr, begin, pivot - 1, depthLimit - 1);
    introSortRecursive(arr, pivot + 1, end, depthLimit - 1);
}
```

## C++
```cpp
void introSort(int arr[], int n) {
    int depthLimit = 2 * log2(n);
    introSortRecursive(arr, 0, n - 1, depthLimit);
}
void introSortRecursive(int arr[], int begin, int end, int depthLimit) {
    if (end - begin < 1) return;
    if (depthLimit == 0) {
        heapSortSubarray(arr, begin, end);
        return;
    }
    int pivot = partition(arr, begin, end);
    introSortRecursive(arr, begin, pivot - 1, depthLimit - 1);
    introSortRecursive(arr, pivot + 1, end, depthLimit - 1);
}
```

## C
```c
void introSort(int arr[], int n) {
    int depthLimit = 2 * log(n) / log(2);
    introSortRecursive(arr, 0, n - 1, depthLimit);
}
void introSortRecursive(int arr[], int begin, int end, int depthLimit) {
    if (end - begin < 1) return;
    if (depthLimit == 0) {
        heapSortSubarray(arr, begin, end);
        return;
    }
    int pivot = partition(arr, begin, end);
    introSortRecursive(arr, begin, pivot - 1, depthLimit - 1);
    introSortRecursive(arr, pivot + 1, end, depthLimit - 1);
}
```

## Go
```go
import "math"
func introSort(arr []int) {
    depthLimit := 2 * int(math.Log2(float64(len(arr))))
    introSortRecursive(arr, 0, len(arr)-1, depthLimit)
}
func introSortRecursive(arr []int, begin, end, depthLimit int) {
    if end-begin < 1 { return }
    if depthLimit == 0 {
        heapSortSubarray(arr, begin, end)
        return
    }
    pivot := partition(arr, begin, end)
    introSortRecursive(arr, begin, pivot-1, depthLimit-1)
    introSortRecursive(arr, pivot+1, end, depthLimit-1)
}
```

## PHP
```php
function introSort(array &$arr): void {
    $depthLimit = 2 * floor(log(count($arr), 2));
    introSortRecursive($arr, 0, count($arr) - 1, $depthLimit);
}
function introSortRecursive(array &$arr, int $begin, int $end, int $depthLimit): void {
    if ($end - $begin < 1) return;
    if ($depthLimit == 0) {
        heapSortSubarray($arr, $begin, $end);
        return;
    }
    $pivot = partition($arr, $begin, $end);
    introSortRecursive($arr, $begin, $pivot - 1, $depthLimit - 1);
    introSortRecursive($arr, $pivot + 1, $end, $depthLimit - 1);
}
```

## Rust
```rust
fn intro_sort(arr: &mut [i32]) {
    let len = arr.len();
    if len <= 1 { return; }
    let depth_limit = 2 * (len as f64).log2().floor() as usize;
    intro_sort_recursive(arr, 0, len - 1, depth_limit);
}
fn intro_sort_recursive(arr: &mut [i32], begin: usize, end: usize, depth_limit: usize) {
    if end <= begin { return; }
    if depth_limit == 0 {
        heap_sort_subarray(arr, begin, end);
        return;
    }
    let pivot = partition(arr, begin, end);
    if pivot > 0 { intro_sort_recursive(arr, begin, pivot - 1, depth_limit - 1); }
    intro_sort_recursive(arr, pivot + 1, end, depth_limit - 1);
}
```
