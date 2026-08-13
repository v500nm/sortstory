---
title: Implementing Bitonic Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Bitonic Sort** in multiple programming languages.

## JavaScript
```javascript
function bitonicSort(arr, low, cnt, dir) {
  if (cnt > 1) {
    let k = cnt / 2;
    bitonicSort(arr, low, k, 1);
    bitonicSort(arr, low + k, k, 0);
    bitonicMerge(arr, low, cnt, dir);
  }
}
```

## TypeScript
```typescript
function bitonicSort(arr: number[], low: number, cnt: number, dir: number): void {
  if (cnt > 1) {
    let k = Math.floor(cnt / 2);
    bitonicSort(arr, low, k, 1);
    bitonicSort(arr, low + k, k, 0);
    bitonicMerge(arr, low, cnt, dir);
  }
}
```

## Python
```python
def bitonic_sort(arr, low, cnt, direction):
    if cnt > 1:
        k = cnt // 2
        bitonic_sort(arr, low, k, 1)
        bitonic_sort(arr, low + k, k, 0)
        bitonic_merge(arr, low, cnt, direction)
```

## Java
```java
public static void bitonicSort(int[] arr, int low, int cnt, int dir) {
    if (cnt > 1) {
        int k = cnt / 2;
        bitonicSort(arr, low, k, 1);
        bitonicSort(arr, low + k, k, 0);
        bitonicMerge(arr, low, cnt, dir);
    }
}
```

## C++
```cpp
void bitonicSort(int arr[], int low, int cnt, int dir) {
    if (cnt > 1) {
        int k = cnt / 2;
        bitonicSort(arr, low, k, 1);
        bitonicSort(arr, low + k, k, 0);
        bitonicMerge(arr, low, cnt, dir);
    }
}
```

## C
```c
void bitonicSort(int arr[], int low, int cnt, int dir) {
    if (cnt > 1) {
        int k = cnt / 2;
        bitonicSort(arr, low, k, 1);
        bitonicSort(arr, low + k, k, 0);
        bitonicMerge(arr, low, cnt, dir);
    }
}
```

## Go
```go
func bitonicSort(arr []int, low, cnt, dir int) {
    if cnt > 1 {
        k := cnt / 2
        bitonicSort(arr, low, k, 1)
        bitonicSort(arr, low+k, k, 0)
        bitonicMerge(arr, low, cnt, dir)
    }
}
```

## PHP
```php
function bitonicSort(array &$arr, int $low, int $cnt, int $dir): void {
    if ($cnt > 1) {
        $k = intdiv($cnt, 2);
        bitonicSort($arr, $low, $k, 1);
        bitonicSort($arr, $low + $k, $k, 0);
        bitonicMerge($arr, $low, $cnt, $dir);
    }
}
```

## Rust
```rust
fn bitonic_sort(arr: &mut [i32], low: usize, cnt: usize, dir: i32) {
    if cnt > 1 {
        let k = cnt / 2;
        bitonic_sort(arr, low, k, 1);
        bitonic_sort(arr, low + k, k, 0);
        bitonic_merge(arr, low, cnt, dir);
    }
}
```
