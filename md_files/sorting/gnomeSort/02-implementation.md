---
title: Implementing Gnome Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Gnome Sort** in multiple programming languages.

## JavaScript
```javascript
function gnomeSort(arr) {
  let n = arr.length;
  let index = 0;
  while (index < n) {
    if (index === 0 || arr[index] >= arr[index - 1]) {
      index++;
    } else {
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      index--;
    }
  }
  return arr;
}
```

## TypeScript
```typescript
function gnomeSort(arr: number[]): number[] {
  let n = arr.length;
  let index = 0;
  while (index < n) {
    if (index === 0 || arr[index] >= arr[index - 1]) {
      index++;
    } else {
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      index--;
    }
  }
  return arr;
}
```

## Python
```python
def gnome_sort(arr):
    n = len(arr)
    index = 0
    while index < n:
        if index == 0 or arr[index] >= arr[index - 1]:
            index += 1
        else:
            arr[index], arr[index - 1] = arr[index - 1], arr[index]
            index -= 1
    return arr
```

## Java
```java
public static void gnomeSort(int[] arr) {
    int n = arr.length;
    int index = 0;
    while (index < n) {
        if (index == 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            int temp = arr[index]; arr[index] = arr[index - 1]; arr[index - 1] = temp;
            index--;
        }
    }
}
```

## C++
```cpp
void gnomeSort(int arr[], int n) {
    int index = 0;
    while (index < n) {
        if (index == 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            std::swap(arr[index], arr[index - 1]);
            index--;
        }
    }
}
```

## C
```c
void gnomeSort(int arr[], int n) {
    int index = 0;
    while (index < n) {
        if (index == 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            int temp = arr[index]; arr[index] = arr[index - 1]; arr[index - 1] = temp;
            index--;
        }
    }
}
```

## Go
```go
func gnomeSort(arr []int) {
    n := len(arr)
    index := 0
    for index < n {
        if index == 0 || arr[index] >= arr[index-1] {
            index++
        } else {
            arr[index], arr[index-1] = arr[index-1], arr[index]
            index--
        }
    }
}
```

## PHP
```php
function gnomeSort(array &$arr): void {
    $n = count($arr);
    $index = 0;
    while ($index < $n) {
        if ($index == 0 || $arr[$index] >= $arr[$index - 1]) {
            $index++;
        } else {
            $temp = $arr[$index]; $arr[$index] = $arr[$index - 1]; $arr[$index - 1] = $temp;
            $index--;
        }
    }
}
```

## Rust
```rust
fn gnome_sort(arr: &mut [i32]) {
    let len = arr.len();
    let mut index = 0;
    while index < len {
        if index == 0 || arr[index] >= arr[index - 1] {
            index += 1;
        } else {
            arr.swap(index, index - 1);
            index -= 1;
        }
    }
}
```
