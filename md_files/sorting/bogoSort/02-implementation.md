---
title: Implementing Bogo Sort
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **Bogo Sort** in multiple programming languages.

## JavaScript
```javascript
function bogoSort(arr) {
  while (!isSorted(arr)) {
    shuffle(arr);
  }
  return arr;
}
```

## TypeScript
```typescript
function bogoSort(arr: number[]): number[] {
  while (!isSorted(arr)) {
    shuffle(arr);
  }
  return arr;
}
```

## Python
```python
def bogo_sort(arr):
    while not is_sorted(arr):
        shuffle(arr)
    return arr
```

## Java
```java
public static void bogoSort(int[] arr) {
    while (!isSorted(arr)) {
        shuffle(arr);
    }
}
```

## C++
```cpp
void bogoSort(int arr[], int n) {
    while (!isSorted(arr, n)) {
        shuffle(arr, n);
    }
}
```

## C
```c
void bogoSort(int arr[], int n) {
    while (!isSorted(arr, n)) {
        shuffle(arr, n);
    }
}
```

## Go
```go
func bogoSort(arr []int) {
    for !isSorted(arr) {
        shuffle(arr)
    }
}
```

## PHP
```php
function bogoSort(array &$arr): void {
    while (!isSorted($arr)) {
        shuffleArray($arr);
    }
}
```

## Rust
```rust
fn bogo_sort(arr: &mut [i32]) {
    while !is_sorted(arr) {
        shuffle(arr);
    }
}
```
