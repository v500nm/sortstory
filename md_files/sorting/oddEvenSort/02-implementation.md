---
title: Implementing Odd Even Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Odd Even Sort** in multiple programming languages.

## JavaScript
```javascript
function oddEvenSort(arr) {
  let n = arr.length;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 1; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
    for (let i = 0; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
  }
  return arr;
}
```

## TypeScript
```typescript
function oddEvenSort(arr: number[]): number[] {
  let n = arr.length;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 1; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
    for (let i = 0; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
  }
  return arr;
}
```

## Python
```python
def odd_even_sort(arr):
    n = len(arr)
    sorted = False
    while not sorted:
        sorted = True
        for i in range(1, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                sorted = False
        for i in range(0, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                sorted = False
    return arr
```

## Java
```java
public static void oddEvenSort(int[] arr) {
    int n = arr.length;
    boolean sorted = false;
    while (!sorted) {
        sorted = true;
        for (int i = 1; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
                sorted = false;
            }
        }
        for (int i = 0; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
                sorted = false;
            }
        }
    }
}
```

## C++
```cpp
void oddEvenSort(int arr[], int n) {
    bool sorted = false;
    while (!sorted) {
        sorted = true;
        for (int i = 1; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                std::swap(arr[i], arr[i + 1]);
                sorted = false;
            }
        }
        for (int i = 0; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                std::swap(arr[i], arr[i + 1]);
                sorted = false;
            }
        }
    }
}
```

## C
```c
void oddEvenSort(int arr[], int n) {
    int sorted = 0;
    while (!sorted) {
        sorted = 1;
        for (int i = 1; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
                sorted = 0;
            }
        }
        for (int i = 0; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
                sorted = 0;
            }
        }
    }
}
```

## Go
```go
func oddEvenSort(arr []int) {
    n := len(arr)
    sorted := false
    for !sorted {
        sorted = true
        for i := 1; i < n-1; i += 2 {
            if arr[i] > arr[i+1] {
                arr[i], arr[i+1] = arr[i+1], arr[i]
                sorted = false
            }
        }
        for i := 0; i < n-1; i += 2 {
            if arr[i] > arr[i+1] {
                arr[i], arr[i+1] = arr[i+1], arr[i]
                sorted = false
            }
        }
    }
}
```

## PHP
```php
function oddEvenSort(array &$arr): void {
    $n = count($arr);
    $sorted = false;
    while (!$sorted) {
        $sorted = true;
        for ($i = 1; $i < $n - 1; $i += 2) {
            if ($arr[$i] > $arr[$i + 1]) {
                $temp = $arr[$i]; $arr[$i] = $arr[$i + 1]; $arr[$i + 1] = $temp;
                $sorted = false;
            }
        }
        for ($i = 0; $i < $n - 1; $i += 2) {
            if ($arr[$i] > $arr[$i + 1]) {
                $temp = $arr[$i]; $arr[$i] = $arr[$i + 1]; $arr[$i + 1] = $temp;
                $sorted = false;
            }
        }
    }
}
```

## Rust
```rust
fn odd_even_sort(arr: &mut [i32]) {
    let len = arr.len();
    if len < 2 { return; }
    let mut sorted = false;
    while !sorted {
        sorted = true;
        let mut i = 1;
        while i < len - 1 {
            if arr[i] > arr[i + 1] {
                arr.swap(i, i + 1);
                sorted = false;
            }
            i += 2;
        }
        let mut i = 0;
        while i < len - 1 {
            if arr[i] > arr[i + 1] {
                arr.swap(i, i + 1);
                sorted = false;
            }
            i += 2;
        }
    }
}
```
