---
title: Implementing Pancake Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Pancake Sort** in multiple programming languages.

## JavaScript
```javascript
function pancakeSort(arr) {
  let n = arr.length;
  for (let currSize = n; currSize > 1; currSize--) {
    let maxIdx = findMax(arr, currSize);
    if (maxIdx !== currSize - 1) {
      flip(arr, maxIdx);
      flip(arr, currSize - 1);
    }
  }
  return arr;
}
```

## TypeScript
```typescript
function pancakeSort(arr: number[]): number[] {
  let n = arr.length;
  for (let currSize = n; currSize > 1; currSize--) {
    let maxIdx = findMax(arr, currSize);
    if (maxIdx !== currSize - 1) {
      flip(arr, maxIdx);
      flip(arr, currSize - 1);
    }
  }
  return arr;
}
```

## Python
```python
def pancake_sort(arr):
    n = len(arr)
    for curr_size in range(n, 1, -1):
        max_idx = arr.index(max(arr[:curr_size]))
        if max_idx != curr_size - 1:
            arr[:max_idx + 1] = reversed(arr[:max_idx + 1])
            arr[:curr_size] = reversed(arr[:curr_size])
    return arr
```

## Java
```java
public static void pancakeSort(int[] arr) {
    int n = arr.length;
    for (int currSize = n; currSize > 1; currSize--) {
        int maxIdx = findMax(arr, currSize);
        if (maxIdx != currSize - 1) {
            flip(arr, maxIdx);
            flip(arr, currSize - 1);
        }
    }
}
```

## C++
```cpp
void pancakeSort(int arr[], int n) {
    for (int currSize = n; currSize > 1; --currSize) {
        int maxIdx = findMax(arr, currSize);
        if (maxIdx != currSize - 1) {
            flip(arr, maxIdx);
            flip(arr, currSize - 1);
        }
    }
}
```

## C
```c
void pancakeSort(int arr[], int n) {
    for (int currSize = n; currSize > 1; --currSize) {
        int maxIdx = findMax(arr, currSize);
        if (maxIdx != currSize - 1) {
            flip(arr, maxIdx);
            flip(arr, currSize - 1);
        }
    }
}
```

## Go
```go
func pancakeSort(arr []int) {
    n := len(arr)
    for currSize := n; currSize > 1; currSize-- {
        maxIdx := findMax(arr, currSize)
        if maxIdx != currSize-1 {
            flip(arr, maxIdx)
            flip(arr, currSize-1)
        }
    }
}
```

## PHP
```php
function pancakeSort(array &$arr): void {
    $n = count($arr);
    for ($currSize = $n; $currSize > 1; $currSize--) {
        $maxIdx = findMax($arr, $currSize);
        if ($maxIdx != $currSize - 1) {
            flip($arr, $maxIdx);
            flip($arr, $currSize - 1);
        }
    }
}
```

## Rust
```rust
fn pancake_sort(arr: &mut [i32]) {
    let len = arr.len();
    for curr_size in (2..=len).rev() {
        let max_idx = find_max(&arr[..curr_size]);
        if max_idx != curr_size - 1 {
            arr[..=max_idx].reverse();
            arr[..curr_size].reverse();
        }
    }
}
```
