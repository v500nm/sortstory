---
title: Implementing Comb Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Comb Sort** in multiple programming languages.

## JavaScript
```javascript
function combSort(arr) {
  let n = arr.length;
  let gap = n;
  let shrink = 1.3;
  let sorted = false;
  while (gap > 1 || !sorted) {
    gap = Math.floor(gap / shrink);
    if (gap < 1) gap = 1;
    sorted = true;
    for (let i = 0; i + gap < n; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        sorted = false;
      }
    }
  }
  return arr;
}
```

## TypeScript
```typescript
function combSort(arr: number[]): number[] {
  let n = arr.length;
  let gap = n;
  let shrink = 1.3;
  let sorted = false;
  while (gap > 1 || !sorted) {
    gap = Math.floor(gap / shrink);
    if (gap < 1) gap = 1;
    sorted = true;
    for (let i = 0; i + gap < n; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        sorted = false;
      }
    }
  }
  return arr;
}
```

## Python
```python
def comb_sort(arr):
    n = len(arr)
    gap = n
    shrink = 1.3
    sorted = False
    while gap > 1 or not sorted:
        gap = int(gap / shrink)
        if gap < 1: gap = 1
        sorted = True
        for i in range(0, n - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                sorted = False
    return arr
```

## Java
```java
public static void combSort(int[] arr) {
    int n = arr.length;
    int gap = n;
    float shrink = 1.3f;
    boolean swapped = true;
    while (gap > 1 || swapped) {
        gap = (int)(gap / shrink);
        if (gap < 1) gap = 1;
        swapped = false;
        for (int i = 0; i + gap < n; i++) {
            if (arr[i] > arr[i + gap]) {
                int temp = arr[i]; arr[i] = arr[i + gap]; arr[i + gap] = temp;
                swapped = true;
            }
        }
    }
}
```

## C++
```cpp
void combSort(int arr[], int n) {
    int gap = n;
    float shrink = 1.3;
    bool swapped = true;
    while (gap > 1 || swapped) {
        gap = gap / shrink;
        if (gap < 1) gap = 1;
        swapped = false;
        for (int i = 0; i + gap < n; i++) {
            if (arr[i] > arr[i + gap]) {
                std::swap(arr[i], arr[i + gap]);
                swapped = true;
            }
        }
    }
}
```

## C
```c
void combSort(int arr[], int n) {
    int gap = n;
    float shrink = 1.3;
    int swapped = 1;
    while (gap > 1 || swapped) {
        gap = gap / shrink;
        if (gap < 1) gap = 1;
        swapped = 0;
        for (int i = 0; i + gap < n; i++) {
            if (arr[i] > arr[i + gap]) {
                int temp = arr[i]; arr[i] = arr[i + gap]; arr[i + gap] = temp;
                swapped = 1;
            }
        }
    }
}
```

## Go
```go
func combSort(arr []int) {
    n := len(arr)
    gap := n
    shrink := 1.3
    sorted := false
    for gap > 1 || !sorted {
        gap = int(float64(gap) / shrink)
        if gap < 1 {
            gap = 1
        }
        sorted = true
        for i := 0; i+gap < n; i++ {
            if arr[i] > arr[i+gap] {
                arr[i], arr[i+gap] = arr[i+gap], arr[i]
                sorted = false
            }
        }
    }
}
```

## PHP
```php
function combSort(array &$arr): void {
    $n = count($arr);
    $gap = $n;
    $shrink = 1.3;
    $sorted = false;
    while ($gap > 1 || !$sorted) {
        $gap = floor($gap / $shrink);
        if ($gap < 1) $gap = 1;
        $sorted = true;
        for ($i = 0; $i + $gap < $n; $i++) {
            if ($arr[$i] > $arr[$i + $gap]) {
                $temp = $arr[$i]; $arr[$i] = $arr[$i + $gap]; $arr[$i + $gap] = $temp;
                $sorted = false;
            }
        }
    }
}
```

## Rust
```rust
fn comb_sort(arr: &mut [i32]) {
    let len = arr.len();
    let mut gap = len;
    let mut sorted = false;
    while gap > 1 || !sorted {
        gap = (gap as f64 / 1.3) as usize;
        if gap < 1 { gap = 1; }
        sorted = true;
        for i in 0..len - gap {
            if arr[i] > arr[i + gap] {
                arr.swap(i, i + gap);
                sorted = false;
            }
        }
    }
}
```
