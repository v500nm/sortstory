---
title: Implementing Cocktail Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Cocktail Sort** in multiple programming languages.

## JavaScript
```javascript
function cocktailSort(arr) {
  let swapped = true;
  let start = 0, end = arr.length - 1;
  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    start++;
  }
  return arr;
}
```

## TypeScript
```typescript
function cocktailSort(arr: number[]): number[] {
  let swapped = true;
  let start = 0, end = arr.length - 1;
  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    start++;
  }
  return arr;
}
```

## Python
```python
def cocktail_sort(arr):
    n = len(arr)
    swapped = True
    start, end = 0, n - 1
    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped: break
        swapped = False
        end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1
    return arr
```

## Java
```java
public static void cocktailSort(int[] arr) {
    boolean swapped = true;
    int start = 0, end = arr.length - 1;
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
                swapped = true;
            }
        }
        start++;
    }
}
```

## C++
```cpp
void cocktailSort(int arr[], int n) {
    bool swapped = true;
    int start = 0, end = n - 1;
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; ++i) {
            if (arr[i] > arr[i + 1]) {
                std::swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        --end;
        for (int i = end - 1; i >= start; --i) {
            if (arr[i] > arr[i + 1]) {
                std::swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }
        ++start;
    }
}
```

## C
```c
void cocktailSort(int arr[], int n) {
    int swapped = 1;
    int start = 0, end = n - 1;
    while (swapped) {
        swapped = 0;
        for (int i = start; i < end; ++i) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;
        swapped = 0;
        --end;
        for (int i = end - 1; i >= start; --i) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
                swapped = 1;
            }
        }
        ++start;
    }
}
```

## Go
```go
func cocktailSort(arr []int) {
    swapped := true
    start := 0
    end := len(arr) - 1
    for swapped {
        swapped = false
        for i := start; i < end; i++ {
            if arr[i] > arr[i+1] {
                arr[i], arr[i+1] = arr[i+1], arr[i]
                swapped = true
            }
        }
        if !swapped {
            break
        }
        swapped = false
        end--
        for i := end - 1; i >= start; i-- {
            if arr[i] > arr[i+1] {
                arr[i], arr[i+1] = arr[i+1], arr[i]
                swapped = true
            }
        }
        start++
    }
}
```

## PHP
```php
function cocktailSort(array &$arr): void {
    $swapped = true;
    $start = 0;
    $end = count($arr) - 1;
    while ($swapped) {
        $swapped = false;
        for ($i = $start; $i < $end; $i++) {
            if ($arr[$i] > $arr[$i + 1]) {
                $temp = $arr[$i]; $arr[$i] = $arr[$i + 1]; $arr[$i + 1] = $temp;
                $swapped = true;
            }
        }
        if (!$swapped) break;
        $swapped = false;
        $end--;
        for ($i = $end - 1; $i >= $start; $i--) {
            if ($arr[$i] > $arr[$i + 1]) {
                $temp = $arr[$i]; $arr[$i] = $arr[$i + 1]; $arr[$i + 1] = $temp;
                $swapped = true;
            }
        }
        $start++;
    }
}
```

## Rust
```rust
fn cocktail_sort(arr: &mut [i32]) {
    let mut swapped = true;
    let mut start = 0;
    let mut end = arr.len().saturating_sub(1);
    while swapped {
        swapped = false;
        for i in start..end {
            if arr[i] > arr[i + 1] {
                arr.swap(i, i + 1);
                swapped = true;
            }
        }
        if !swapped { break; }
        swapped = false;
        end -= 1;
        for i in (start..end).rev() {
            if arr[i] > arr[i + 1] {
                arr.swap(i, i + 1);
                swapped = true;
            }
        }
        start += 1;
    }
}
```
