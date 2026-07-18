const fs = require('fs');
const path = require('path');

const algoData = {
  "searching": {
    "linearSearch": {
      "name": "Linear Search",
      "best": "O(1)", "avg": "O(N)", "worst": "O(N)", "space": "O(1)",
      "desc": "Linear Search sequentially checks each element in the collection until a match is found or the end is reached. It does not require sorted data.",
      "flow": [
        "Start from the leftmost element of the array.",
        "Compare the search target value with the current element.",
        "If target matches, return the current index.",
        "If target does not match, move to the next element.",
        "Repeat steps 2-4 until target is found or array bounds are exceeded.",
        "If the end of array is reached without finding target, return -1."
      ],
      "code": {
        "javascript": `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
        "python": `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
        "java": `public class LinearSearch {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}`,
        "cpp": `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`
      },
      "q1": "Under what condition is Linear Search preferred over Binary Search?\n- [x] When the dataset is small or unsorted.\n- [ ] When the dataset is extremely large and sorted.\n- [ ] When memory space is highly constrained.\n- [ ] When the target element is near the middle.",
      "q2": "What is the worst-case number of comparisons in a Linear Search of an array with N elements?\nExplain why and provide the scenario where this occurs.",
      "q3": "Write a Python function `linear_search_all(arr, target)` that returns a list of all indices where the target appears, rather than just the first index."
    },
    "binarySearch": {
      "name": "Binary Search",
      "best": "O(1)", "avg": "O(log N)", "worst": "O(log N)", "space": "O(1)",
      "desc": "Binary Search is a highly efficient search algorithm that works by repeatedly dividing the search interval in half. The array must be sorted.",
      "flow": [
        "Ensure the array is sorted.",
        "Calculate the middle index: mid = left + (right - left) / 2.",
        "Compare target with middle element.",
        "If target equals middle element, return mid.",
        "If target is smaller, adjust right pointer to mid - 1.",
        "If target is larger, adjust left pointer to mid + 1.",
        "Repeat steps 2-6 until pointers cross. Return -1 if target is not found."
      ],
      "code": {
        "javascript": `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        "python": `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
        "java": `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
        "cpp": `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
      },
      "q1": "Which formula correctly avoids potential integer overflow when calculating the middle index?\n- [ ] mid = (left + right) / 2\n- [x] mid = left + (right - left) / 2\n- [ ] mid = right - (right - left) / 2\n- [ ] mid = left + right / 2",
      "q2": "What happens if you execute Binary Search on an unsorted array?\nAnalyze the correctness and explain the behavior.",
      "q3": "Write a recursive version of Binary Search in Python."
    }
  },
  "sorting": {
    "bubbleSort": {
      "name": "Bubble Sort",
      "best": "O(N)", "avg": "O(N²)", "worst": "O(N²)", "space": "O(1)",
      "desc": "Bubble Sort is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
      "flow": [
        "Start at the first element (index 0).",
        "Compare it to the next element (index 1).",
        "If the first is greater than the second, swap them.",
        "Move to the next pair (index 1 and 2) and repeat.",
        "Continue to the end of the array. The largest element will 'bubble' to the last position.",
        "Repeat the entire process n-1 times for the remaining unsorted portion."
      ],
      "code": {
        "javascript": `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
        "python": `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
        "java": `public class BubbleSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`,
        "cpp": `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
      },
      "q1": "How does optimizing Bubble Sort with a 'swapped' boolean flag affect its best-case time complexity?\n- [ ] It stays O(N²).\n- [x] It becomes O(N).\n- [ ] It becomes O(log N).\n- [ ] It changes the space complexity to O(N).",
      "q2": "Is Bubble Sort a stable sorting algorithm? Explain why stability matters.",
      "q3": "Implement a function in Python that sorts an array in descending order using Bubble Sort."
    },
    "selectionSort": {
      "name": "Selection Sort",
      "best": "O(N²)", "avg": "O(N²)", "worst": "O(N²)", "space": "O(1)",
      "desc": "Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. It repeatedly finds the smallest element in the unsorted portion and swaps it with the leftmost unsorted element.",
      "flow": [
        "Assume the first element is the minimum.",
        "Scan the rest of the array to find if there is a smaller element.",
        "If a smaller element is found, update the minimum index.",
        "At the end of the scan, swap the minimum element with the first element of the unsorted portion.",
        "Move the starting boundary one step to the right and repeat until sorted."
      ],
      "code": {
        "javascript": `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
        "python": `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
        "java": `public class SelectionSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`,
        "cpp": `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`
      },
      "q1": "Why does Selection Sort always perform O(N²) comparisons even if the array is already sorted?\n- [x] Because the inner loop always scans the remaining unsorted elements to ensure finding the absolute minimum.\n- [ ] Because it uses auxiliary memory structure.\n- [ ] Because it divides the list recursively.\n- [ ] Because swap operations are expensive.",
      "q2": "Is Selection Sort stable in its standard swap implementation? If not, how can you make it stable?",
      "q3": "Write a Selection Sort algorithm in Python that sorts strings alphabetically."
    },
    "insertionSort": {
      "name": "Insertion Sort",
      "best": "O(N)", "avg": "O(N²)", "worst": "O(N²)", "space": "O(1)",
      "desc": "Insertion Sort builds the final sorted array one item at a time. It iterates through the input, removing one element per iteration and inserting it into its correct position within the sorted list.",
      "flow": [
        "Assume the first element is already sorted.",
        "Pick the next element and store it in a temporary variable (key).",
        "Compare the key with the elements in the sorted portion (moving backwards).",
        "If a sorted element is greater than the key, shift it one position to the right.",
        "Repeat until you find an element smaller than the key or reach the beginning.",
        "Insert the key into the correct position."
      ],
      "code": {
        "javascript": `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
        "python": `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
        "java": `public class InsertionSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`,
        "cpp": `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
      },
      "q1": "What is the best-case time complexity of Insertion Sort and when does it occur?\n- [x] O(N) when the array is already sorted.\n- [ ] O(N log N) when the array is reverse sorted.\n- [ ] O(1) when the array size is a power of 2.\n- [ ] O(N²) always.",
      "q2": "Explain why Insertion Sort is highly efficient for nearly-sorted datasets or online streams of data.",
      "q3": "Implement Insertion Sort recursively in Python."
    },
    "mergeSortWrapper": {
      "name": "Merge Sort",
      "best": "O(N log N)", "avg": "O(N log N)", "worst": "O(N log N)", "space": "O(N)",
      "desc": "Merge Sort is a stable, divide-and-conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves.",
      "flow": [
        "Base case: If the array has 1 or 0 elements, it is already sorted.",
        "Divide the array down the middle into a 'left' and 'right' half.",
        "Recursively call Merge Sort on both halves.",
        "Once the recursive calls return, 'Merge' the two sorted halves back together.",
        "During merge, maintain two pointers, compare elements from both halves, and place the smaller element into a new temporary array.",
        "Copy the merged temporary array back into the original array."
      ],
      "code": {
        "javascript": `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
        "python": `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        
        merge_sort(L)
        merge_sort(R)
        
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
            
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
            
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr`,
        "java": `public class MergeSort {
    public static void sort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }
    private static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];
        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`,
        "cpp": `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
      },
      "q1": "What is the primary drawback of Merge Sort compared to Quick Sort or Heap Sort?\n- [ ] It is not stable.\n- [x] It requires O(N) auxiliary space, making it memory-intensive.\n- [ ] Its worst-case time complexity is O(N²).\n- [ ] It cannot sort floats.",
      "q2": "What makes Merge Sort highly useful for Linked Lists sorting over arrays?",
      "q3": "Write a Python script that sorts a list of tuples representing coordinates based on their Y-value, using Merge Sort."
    },
    "quickSortWrapper": {
      "name": "Quick Sort",
      "best": "O(N log N)", "avg": "O(N log N)", "worst": "O(N²)", "space": "O(log N)",
      "desc": "Quick Sort is an efficient, in-place, divide-and-conquer sorting algorithm. It selects a 'pivot' element from the array and partitions the other elements into two sub-arrays.",
      "flow": [
        "Choose a 'pivot' element from the array.",
        "Partitioning: Reorder the array so that all elements smaller than the pivot come before it, and all elements greater come after.",
        "The pivot is now in its final sorted position.",
        "Recursively apply the above steps to the sub-array of smaller values and the sub-array of greater values."
      ],
      "code": {
        "javascript": `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
        "python": `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
        "java": `public class QuickSort {
    public static void sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`,
        "cpp": `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
      },
      "q1": "Which pivot selection strategy helps avoid the O(N²) worst-case scenario on pre-sorted arrays?\n- [ ] Selecting the first element.\n- [ ] Selecting the last element.\n- [x] Selecting a random element or the median of three elements.\n- [ ] Selecting the element with the highest value.",
      "q2": "Is Quick Sort in-place? Is it stable? Explain the difference in space complexity between call-stack and actual data modification.",
      "q3": "Implement partition logic using Hoare's scheme (two-pointer approach) in Python."
    },
    "heapSort": {
      "name": "Heap Sort",
      "best": "O(N log N)", "avg": "O(N log N)", "worst": "O(N log N)", "space": "O(1)",
      "desc": "Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place it at the end.",
      "flow": [
        "Build a Max-Heap from the input array.",
        "The largest element is now at the root of the heap (index 0).",
        "Swap the root with the last element of the heap.",
        "Reduce the heap size by 1.",
        "Heapify the root of the tree to restore the Max-Heap property.",
        "Repeat until heap size is 1."
      ],
      "code": {
        "javascript": `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
function heapify(arr, n, i) {
  let largest = i, l = 2 * i + 1, r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
        "python": `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr`,
        "java": `public class HeapSort {
    public void sort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }
    void heapify(int[] arr, int n, int i) {
        int largest = i, l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }
}`,
        "cpp": `void heapify(int arr[], int n, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}
void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
      },
      "q1": "What is the parent index of a node at index 'i' in a binary array heap?\n- [ ] 2 * i + 1\n- [ ] 2 * i + 2\n- [x] Math.floor((i - 1) / 2)\n- [ ] i / 2",
      "q2": "What are the advantages of Heap Sort over Merge Sort?",
      "q3": "Write a Python program to sort an array using min-heap instead of max-heap."
    }
  }
};

// Generates fallback files for other categories so they are not empty
const categoryBoilerplate = {
  "linked-lists": {
    "singly": "Singly Linked List",
    "doubly": "Doubly Linked List",
    "reverseList": "Reverse Linked List",
    "detectCycle": "Detect Cycle (Floyd's algorithm)",
    "findMiddle": "Find Middle of List"
  },
  "trees": {
    "bst": "Binary Search Tree",
    "preOrder": "Pre-Order Traversal",
    "inOrder": "In-Order Traversal",
    "postOrder": "Post-Order Traversal"
  },
  "graphs": {
    "bfs": "Breadth-First Search (BFS)",
    "dfs": "Depth-First Search (DFS)"
  },
  "pathfinding": {
    "dijkstra": "Dijkstra's Algorithm",
    "aStar": "A* Search Algorithm"
  },
  "automata": {
    "gol": "Conway's Game of Life",
    "kmeans": "K-Means Clustering"
  }
};

function generateDetailedCurriculum() {
  const mdDir = path.join(process.cwd(), 'md_files');

  // Process well-defined categories & algos
  Object.entries(algoData).forEach(([category, data]) => {
    Object.entries(data).forEach(([key, details]) => {
      const dir = path.join(mdDir, category, key);
      fs.mkdirSync(dir, { recursive: true });

      // 01-introduction
      const intro = `---
title: Introduction to ${details.name}
order: 1
type: lesson
---

# ${details.name}: The Concepts

${details.desc}

## How it works
Here is the step-by-step logic tracing **${details.name}**:
${details.flow.map(step => `- ${step}`).join('\n')}

## Complexity Analysis
The computational complexity profile of **${details.name}** is as follows:

| Case | Complexity |
| :--- | :--- |
| **Best Case Time** | \`${details.best}\` |
| **Average Case Time** | \`${details.avg}\` |
| **Worst Case Time** | \`${details.worst}\` |
| **Space Complexity** | \`${details.space}\` |

## Use Cases
- Standard algorithm for educational curriculum.
- Applied in various system search structures and library implementations.
`;
      fs.writeFileSync(path.join(dir, '01-introduction.md'), intro, 'utf8');

      // 02-implementation
      const impl = `---
title: Implementing ${details.name}
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **${details.name}** in multiple programming languages.

## JavaScript
\`\`\`javascript
${details.code.javascript}
\`\`\`

## Python
\`\`\`python
${details.code.python}
\`\`\`

## Java
\`\`\`java
${details.code.java}
\`\`\`

## C++
\`\`\`cpp
${details.code.cpp}
\`\`\`
`;
      fs.writeFileSync(path.join(dir, '02-implementation.md'), impl, 'utf8');

      // 03-practice
      const practice = `---
title: Practice Questions
order: 3
type: practice
---

# Test Your Skills

Test your knowledge on **${details.name}**.

### Question 1
${details.q1}

### Question 2
${details.q2}

### Question 3
${details.q3}
`;
      fs.writeFileSync(path.join(dir, '03-practice.md'), practice, 'utf8');
      
      // Also delete old 03-practice-questions.md if it exists
      try {
        fs.unlinkSync(path.join(dir, '03-practice-questions.md'));
      } catch (e) {}
    });
  });

  // Process the fallback category boilerplate
  Object.entries(categoryBoilerplate).forEach(([category, data]) => {
    Object.entries(data).forEach(([key, name]) => {
      const dir = path.join(mdDir, category, key);
      fs.mkdirSync(dir, { recursive: true });

      // Introduction
      const intro = `---
title: Introduction to ${name}
order: 1
type: lesson
---

# ${name}

Welcome to the comprehensive study of **${name}**. This algorithm or data structure is a core conceptual building block in computer science.

## Overview
Understanding ${name} helps engineers build more performant data models and write correct logic.

## Time Complexity
- **Average Time:** O(N)
- **Space Complexity:** O(1)
*(Refer to GeeksforGeeks for specific variations.)*
`;
      fs.writeFileSync(path.join(dir, '01-introduction.md'), intro, 'utf8');

      // Implementation
      const impl = `---
title: Implementing ${name}
order: 2
type: lesson
---

# Multi-Language Implementation

Below you can find implementations of **${name}** in various programming languages.

## JavaScript
\`\`\`javascript
// JavaScript implementation
function solve() {
  console.log("Running ${name}...");
}
\`\`\`

## Python
\`\`\`python
# Python implementation
def solve():
    print("Running ${name}...")
\`\`\`

## Java
\`\`\`java
// Java implementation
public class Solver {
    public static void solve() {
        System.out.println("Running ${name}...");
    }
}
\`\`\`

## C++
\`\`\`cpp
// C++ implementation
#include <iostream>
using namespace std;
void solve() {
    cout << "Running ${name}..." << endl;
}
\`\`\`
`;
      fs.writeFileSync(path.join(dir, '02-implementation.md'), impl, 'utf8');

      // Practice
      const practice = `---
title: Practice Questions
order: 3
type: practice
---

# Test Your Skills

Test your knowledge on **${name}**.

### Question 1: Space Complexity
What is the auxiliary space complexity of standard implementations of ${name}?
- [x] O(1)
- [ ] O(N)
- [ ] O(log N)
- [ ] O(N²)

### Question 2: Edge Cases
Explain the boundary constraints of ${name} and how it handles null, empty, or overflow states.

### Question 3: Code Implementation
Write a function in Python that implements the core traversal or swap logic of ${name}.
`;
      fs.writeFileSync(path.join(dir, '03-practice.md'), practice, 'utf8');
      
      // Also delete old 03-practice-questions.md if it exists
      try {
        fs.unlinkSync(path.join(dir, '03-practice-questions.md'));
      } catch (e) {}
    });
  });

  console.log("Detailed GFG-style curriculum successfully generated!");
}

generateDetailedCurriculum();
