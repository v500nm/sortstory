---
title: Implementing Tim Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Tim Sort** in multiple programming languages.

## JavaScript
```javascript
const RUN = 32;
function timSort(arr, n) {
  for (let i = 0; i < n; i += RUN) {
    insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
  }
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      let mid = left + size - 1;
      let right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) merge(arr, left, mid, right);
    }
  }
}
```

## TypeScript
```typescript
const RUN = 32;
function timSort(arr: number[], n: number = arr.length): void {
  for (let i = 0; i < n; i += RUN) {
    insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
  }
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      let mid = left + size - 1;
      let right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) merge(arr, left, mid, right);
    }
  }
}
```

## Python
```python
RUN = 32
def tim_sort(arr):
    n = len(arr)
    for i in range(0, n, RUN):
        insertion_sort(arr, i, min((i + 31), (n - 1)))
    size = RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = left + size - 1
            right = min((left + 2 * size - 1), (n - 1))
            if mid < right:
                merge(arr, left, mid, right)
        size = 2 * size
```

## Java
```java
static int MIN_MERGE = 32;
public static void timSort(int[] arr, int n) {
    for (int i = 0; i < n; i += MIN_MERGE) {
        insertionSort(arr, i, Math.min((i + MIN_MERGE - 1), (n - 1)));
    }
    for (int size = MIN_MERGE; size < n; size = 2 * size) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = left + size - 1;
            int right = Math.min((left + 2 * size - 1), (n - 1));
            if (mid < right)
                merge(arr, left, mid, right);
        }
    }
}
```

## C++
```cpp
const int RUN = 32;
void timSort(int arr[], int n) {
    for (int i = 0; i < n; i += RUN)
        insertionSort(arr, i, min((i + RUN - 1), (n - 1)));
    for (int size = RUN; size < n; size = 2 * size) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = left + size - 1;
            int right = min((left + 2 * size - 1), (n - 1));
            if (mid < right)
                merge(arr, left, mid, right);
        }
    }
}
```

## C
```c
#define RUN 32
void timSort(int arr[], int n) {
    for (int i = 0; i < n; i += RUN)
        insertionSort(arr, i, min((i + RUN - 1), (n - 1)));
    for (int size = RUN; size < n; size = 2 * size) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = left + size - 1;
            int right = min((left + 2 * size - 1), (n - 1));
            if (mid < right)
                merge(arr, left, mid, right);
        }
    }
}
```

## Go
```go
const RUN = 32
func timSort(arr []int) {
    n := len(arr)
    for i := 0; i < n; i += RUN {
        end := i + RUN - 1
        if end > n-1 { end = n-1 }
        insertionSort(arr, i, end)
    }
    for size := RUN; size < n; size *= 2 {
        for left := 0; left < n; left += 2 * size {
            mid := left + size - 1
            right := left + 2*size - 1
            if right > n-1 { right = n-1 }
            if mid < right {
                merge(arr, left, mid, right)
            }
        }
    }
}
```

## PHP
```php
function timSort(array &$arr): void {
    $n = count($arr);
    $RUN = 32;
    for ($i = 0; $i < $n; $i += $RUN) {
        insertionSort($arr, $i, min($i + $RUN - 1, $n - 1));
    }
    for ($size = $RUN; $size < $n; $size = 2 * $size) {
        for ($left = 0; $left < $n; $left += 2 * $size) {
            $mid = $left + $size - 1;
            $right = min($left + 2 * $size - 1, $n - 1);
            if ($mid < $right) {
                merge($arr, $left, $mid, $right);
            }
        }
    }
}
```

## Rust
```rust
const RUN: usize = 32;
fn tim_sort(arr: &mut [i32]) {
    let len = arr.len();
    for i in (0..len).step_by(RUN) {
        let end = std::cmp::min(i + RUN - 1, len - 1);
        insertion_sort_range(arr, i, end);
    }
    let mut size = RUN;
    while size < len {
        for left in (0..len).step_by(2 * size) {
            let mid = left + size - 1;
            let right = std::cmp::min(left + 2 * size - 1, len - 1);
            if mid < right {
                merge(arr, left, mid, right);
            }
        }
        size *= 2;
    }
}
```
