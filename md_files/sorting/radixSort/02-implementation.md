---
title: Implementing Radix Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Radix Sort** in multiple programming languages.

## JavaScript
```javascript
function radixSort(arr) {
  let max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortForRadix(arr, exp);
  }
  return arr;
}
```

## TypeScript
```typescript
function radixSort(arr: number[]): number[] {
  let max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortForRadix(arr, exp);
  }
  return arr;
}
```

## Python
```python
def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_for_radix(arr, exp)
        exp *= 10
    return arr
```

## Java
```java
public static void radixSort(int[] arr) {
    int max = getMax(arr);
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSort(arr, exp);
    }
}
```

## C++
```cpp
void radixSort(int arr[], int n) {
    int m = getMax(arr, n);
    for (int exp = 1; m / exp > 0; exp *= 10) {
        countingSort(arr, n, exp);
    }
}
```

## C
```c
void radixSort(int arr[], int n) {
    int m = getMax(arr, n);
    for (int exp = 1; m / exp > 0; exp *= 10) {
        countingSort(arr, n, exp);
    }
}
```

## Go
```go
func radixSort(arr []int) {
    max := getMax(arr)
    for exp := 1; max/exp > 0; exp *= 10 {
        countingSortForRadix(arr, exp)
    }
}
```

## PHP
```php
function radixSort(array &$arr): void {
    if (empty($arr)) return;
    $max = max($arr);
    for ($exp = 1; floor($max / $exp) > 0; $exp *= 10) {
        countingSortForRadix($arr, $exp);
    }
}
```

## Rust
```rust
fn radix_sort(arr: &mut [i32]) {
    let max = match arr.iter().max() {
        Some(&m) => m,
        None => return,
    };
    let mut exp = 1;
    while max / exp > 0 {
        counting_sort_for_radix(arr, exp);
        exp *= 10;
    }
}
```
