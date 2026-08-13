---
title: Implementing Stooge Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Stooge Sort** in multiple programming languages.

## JavaScript
```javascript
function stoogeSort(arr, i = 0, j = arr.length - 1) {
  if (arr[i] > arr[j]) [arr[i], arr[j]] = [arr[j], arr[i]];
  if (j - i + 1 > 2) {
    let t = Math.floor((j - i + 1) / 3);
    stoogeSort(arr, i, j - t);
    stoogeSort(arr, i + t, j);
    stoogeSort(arr, i, j - t);
  }
  return arr;
}
```

## TypeScript
```typescript
function stoogeSort(arr: number[], i: number = 0, j: number = arr.length - 1): number[] {
  if (arr[i] > arr[j]) [arr[i], arr[j]] = [arr[j], arr[i]];
  if (j - i + 1 > 2) {
    let t = Math.floor((j - i + 1) / 3);
    stoogeSort(arr, i, j - t);
    stoogeSort(arr, i + t, j);
    stoogeSort(arr, i, j - t);
  }
  return arr;
}
```

## Python
```python
def stooge_sort(arr, i, j):
    if arr[i] > arr[j]:
        arr[i], arr[j] = arr[j], arr[i]
    if j - i + 1 > 2:
        t = (j - i + 1) // 3
        stooge_sort(arr, i, j - t)
        stooge_sort(arr, i + t, j)
        stooge_sort(arr, i, j - t)
```

## Java
```java
public static void stoogeSort(int[] arr, int i, int j) {
    if (arr[i] > arr[j]) {
        int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
    }
    if (j - i + 1 > 2) {
        int t = (j - i + 1) / 3;
        stoogeSort(arr, i, j - t);
        stoogeSort(arr, i + t, j);
        stoogeSort(arr, i, j - t);
    }
}
```

## C++
```cpp
void stoogeSort(int arr[], int i, int j) {
    if (arr[i] > arr[j]) std::swap(arr[i], arr[j]);
    if (j - i + 1 > 2) {
        int t = (j - i + 1) / 3;
        stoogeSort(arr, i, j - t);
        stoogeSort(arr, i + t, j);
        stoogeSort(arr, i, j - t);
    }
}
```

## C
```c
void stoogeSort(int arr[], int i, int j) {
    if (arr[i] > arr[j]) {
        int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
    }
    if (j - i + 1 > 2) {
        int t = (j - i + 1) / 3;
        stoogeSort(arr, i, j - t);
        stoogeSort(arr, i + t, j);
        stoogeSort(arr, i, j - t);
    }
}
```

## Go
```go
func stoogeSort(arr []int, i, j int) {
    if arr[i] > arr[j] {
        arr[i], arr[j] = arr[j], arr[i]
    }
    if j-i+1 > 2 {
        t := (j - i + 1) / 3
        stoogeSort(arr, i, j-t)
        stoogeSort(arr, i+t, j)
        stoogeSort(arr, i, j-t)
    }
}
```

## PHP
```php
function stoogeSort(array &$arr, int $i, int $j): void {
    if ($arr[$i] > $arr[$j]) {
        $temp = $arr[$i]; $arr[$i] = $arr[$j]; $arr[$j] = $temp;
    }
    if ($j - $i + 1 > 2) {
        $t = (int)(($j - $i + 1) / 3);
        stoogeSort($arr, $i, $j - $t);
        stoogeSort($arr, $i + $t, $j);
        stoogeSort($arr, $i, $j - $t);
    }
}
```

## Rust
```rust
fn stooge_sort(arr: &mut [i32], i: usize, j: usize) {
    if arr[i] > arr[j] {
        arr.swap(i, j);
    }
    if j - i + 1 > 2 {
        let t = (j - i + 1) / 3;
        stooge_sort(arr, i, j - t);
        stooge_sort(arr, i + t, j);
        stooge_sort(arr, i, j - t);
    }
}
```
