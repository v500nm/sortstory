import { AlgorithmDetailsData } from "./types";

export const searchingData: Record<string, AlgorithmDetailsData> = {
  linearSearch: {
    id: "linearSearch",
    name: "Linear Search",
    description: "Linear search sequentially checks each element of the list until a match is found or the whole list has been searched. It is the simplest search algorithm.",
    bestCase: "O(1) - Target is the first element",
    avgCase: "O(n) - Target is in the middle",
    worstCase: "O(n) - Target is at the end or not present",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    useCase: "Used on small unsorted datasets, or when the data is streamed and cannot be sorted ahead of time. Often used in linked lists where random access is not possible.",
    algorithmFlow: [
      "Start at the first element (index 0) of the array.",
      "Compare the current element with the target value.",
      "If the current element equals the target, return its index (Search Successful).",
      "If not, move to the next element in the array.",
      "Repeat the comparison until the end of the array is reached.",
      "If the end is reached and no match is found, return -1 (Search Failed)."
    ],
    codeSnippets: {
      javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
      java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      cpp: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`
    },
    examples: [
      {
        title: "Find a specific unindexed record",
        description: "Scanning through a log file line by line to find a specific error code.",
        code: `const logs = ["INFO: Boot", "WARN: Low Memory", "ERROR: OOM"];
linearSearch(logs, "ERROR: OOM"); // Returns 2`
      }
    ]
  },
  binarySearch: {
    id: "binarySearch",
    name: "Binary Search",
    description: "Binary search finds the position of a target value within a SORTED array. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, the interval is narrowed to the lower half. Otherwise, it's narrowed to the upper half.",
    bestCase: "O(1) - Target is the middle element on the first check",
    avgCase: "O(log n)",
    worstCase: "O(log n) - Target is at the extreme ends or not present",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    useCase: "Used extensively in databases, dictionaries, and any application where data is pre-sorted and fast retrieval is required. Extremely fast even for millions of elements.",
    algorithmFlow: [
      "Ensure the array is sorted before beginning.",
      "Initialize two pointers: 'low' at index 0, and 'high' at the last index.",
      "Calculate the 'mid' index as the floor of (low + high) / 2.",
      "Compare the target value to the element at the 'mid' index.",
      "If the target matches the mid element, return the 'mid' index.",
      "If the target is LESS than the mid element, set 'high' to mid - 1.",
      "If the target is GREATER than the mid element, set 'low' to mid + 1.",
      "Repeat the process until the target is found or 'low' becomes greater than 'high' (return -1)."
    ],
    codeSnippets: {
      javascript: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1`,
      java: `public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      cpp: `int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    },
    examples: [
      {
        title: "Database Index Lookup",
        description: "Finding a user record in a database index that is pre-sorted by User ID.",
        code: `// Finding ID 405 in a sorted array of 1,000,000 IDs takes at most 20 comparisons.
binarySearch(sortedIds, 405);`
      }
    ]
  }
};
