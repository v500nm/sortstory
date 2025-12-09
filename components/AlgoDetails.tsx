"use client";
import { useState } from "react";

interface AlgoDetailsProps {
  selectedAlgo: string;
}

const algorithmDetails: Record<string, {
  name: string;
  description: string;
  bestCase: string;
  avgCase: string;
  worstCase: string;
  timeComplexity: string;
  spaceComplexity: string;
  pseudocode: string[];
}> = {
  bubbleSort: {
    name: "Bubble Sort",
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name from the way smaller elements \"bubble\" to the top of the list. While it's simple to understand and implement, it's not efficient for large datasets with its average and worst-case time complexity of O(n²).",
    bestCase: "O(n) - When array is already sorted",
    avgCase: "O(n²) - For random data",
    worstCase: "O(n²) - When array is reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "for i from 0 to n-1:",
      "  for j from 0 to n-i-1:",
      "    if arr[j] > arr[j+1]:",
      "      swap(arr[j], arr[j+1])"
    ]
  },
  selectionSort: {
    name: "Selection Sort",
    description: "Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list. The algorithm proceeds by finding the smallest element in the unsorted portion, swapping it with the leftmost unsorted element, and moving the sublist boundaries one element to the right.",
    bestCase: "O(n²) - Always requires full scan",
    avgCase: "O(n²) - For random data",
    worstCase: "O(n²) - For any arrangement",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "for i from 0 to n-1:",
      "  min_idx = i",
      "  for j from i+1 to n:",
      "    if arr[j] < arr[min_idx]:",
      "      min_idx = j",
      "  swap(arr[i], arr[min_idx])"
    ]
  },
  insertionSort: {
    name: "Insertion Sort",
    description: "Insertion Sort builds the final sorted array one item at a time. It iterates through the input, removing one element per iteration and finding the location it belongs within the sorted list and inserting it there. It's efficient for small datasets and nearly sorted arrays, with a time complexity of O(n) in the best case when the array is already sorted.",
    bestCase: "O(n) - Already sorted",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - Reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "for i from 1 to n-1:",
      "  key = arr[i]",
      "  j = i - 1",
      "  while j >= 0 and arr[j] > key:",
      "    arr[j+1] = arr[j]",
      "    j = j - 1",
      "  arr[j+1] = key"
    ]
  },
  mergeSortWrapper: {
    name: "Merge Sort",
    description: "Merge Sort is a stable, divide-and-conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. The merge operation is the key process that combines two sorted arrays into a single sorted array. Merge Sort guarantees O(n log n) performance in all cases, making it reliable for large datasets.",
    bestCase: "O(n log n) - Already sorted",
    avgCase: "O(n log n) - Random data",
    worstCase: "O(n log n) - Reverse sorted",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    pseudocode: [
      "function mergeSort(arr):",
      "  if length(arr) <= 1: return arr",
      "  mid = length(arr) / 2",
      "  left = mergeSort(arr[0:mid])",
      "  right = mergeSort(arr[mid:])",
      "  return merge(left, right)"
    ]
  },
  quickSortWrapper: {
    name: "Quick Sort",
    description: "Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element and partitioning the array around it, such that elements smaller than the pivot come before it and elements greater come after. The process is then recursively applied to the sub-arrays. Quick Sort is one of the fastest sorting algorithms in practice, with an average time complexity of O(n log n).",
    bestCase: "O(n log n) - Good pivot selection",
    avgCase: "O(n log n) - Random pivot",
    worstCase: "O(n²) - Poor pivot selection",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    pseudocode: [
      "function quickSort(arr, low, high):",
      "  if low < high:",
      "    pi = partition(arr, low, high)",
      "    quickSort(arr, low, pi-1)",
      "    quickSort(arr, pi+1, high)"
    ]
  },
  heapSort: {
    name: "Heap Sort",
    description: "Heap Sort converts the array into a heap data structure (max-heap for ascending order), then repeatedly extracts the maximum element from the heap and rebuilds the heap. It's an in-place sorting algorithm with guaranteed O(n log n) performance but is not stable.",
    bestCase: "O(n log n) - All cases similar",
    avgCase: "O(n log n) - For random data",
    worstCase: "O(n log n) - Consistent performance",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "function heapSort(arr):",
      "  buildMaxHeap(arr)",
      "  for i from n-1 to 1:",
      "    swap(arr[0], arr[i])",
      "    heapify(arr, 0, i)"
    ]
  },
  shellSort: {
    name: "Shell Sort",
    description: "Shell Sort is a generalization of insertion sort that allows the exchange of items that are far apart. The algorithm starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared.",
    bestCase: "O(n log n) - Good gap sequence",
    avgCase: "O(n^(4/3)) - Depends on gap",
    worstCase: "O(n²) - Poor gap sequence",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "gap = n / 2",
      "while gap > 0:",
      "  for i from gap to n:",
      "    temp = arr[i]",
      "    j = i",
      "    while j >= gap and arr[j-gap] > temp:",
      "      arr[j] = arr[j-gap]",
      "    arr[j] = temp",
      "  gap = gap / 2"
    ]
  },
  cocktailSort: {
    name: "Cocktail Sort",
    description: "Cocktail Sort is a variation of Bubble Sort that sorts in both directions alternately. It traverses the list from left to right, then right to left, repeatedly until no swaps are needed. This bidirectional approach helps move elements faster to their correct positions.",
    bestCase: "O(n) - Already sorted",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - Reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "do:",
      "  swapped = false",
      "  for i from 0 to n-1:",
      "    if arr[i] > arr[i+1]: swap and set swapped",
      "  for i from n-1 to 0:",
      "    if arr[i] > arr[i+1]: swap and set swapped",
      "while swapped"
    ]
  },
  combSort: {
    name: "Comb Sort",
    description: "Comb Sort improves on bubble sort by using a gap larger than 1. The gap starts with a large value and shrinks by a factor of 1.3 in each iteration until it reaches 1, at which point the algorithm is essentially bubble sort.",
    bestCase: "O(n log n) - Nearly sorted",
    avgCase: "O(n²/2ᵖ) - Depends on gap",
    worstCase: "O(n²) - Poor cases",
    timeComplexity: "O(n²/2ᵖ)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "gap = n",
      "shrink = 1.3",
      "while gap > 1:",
      "  gap = floor(gap / shrink)",
      "  for i from 0 to n-gap:",
      "    if arr[i] > arr[i+gap]:",
      "      swap(arr[i], arr[i+gap])"
    ]
  },
  gnomeSort: {
    name: "Gnome Sort",
    description: "Gnome Sort is similar to Insertion Sort but moves an element to its proper place by a series of swaps. It's conceptually simple: if the current element is in order relative to the previous, move forward; otherwise, swap and move backward.",
    bestCase: "O(n) - Already sorted",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - Reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "pos = 0",
      "while pos < n:",
      "  if pos == 0 or arr[pos] >= arr[pos-1]:",
      "    pos = pos + 1",
      "  else:",
      "    swap(arr[pos], arr[pos-1])",
      "    pos = pos - 1"
    ]
  },
  oddEvenSort: {
    name: "Odd-Even Sort",
    description: "Odd-Even Sort is a variation of bubble sort that compares all odd/even indexed pairs of adjacent elements in the list. It alternates between odd and even phases until the list is sorted.",
    bestCase: "O(n) - Already sorted",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - Reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "sorted = false",
      "while not sorted:",
      "  sorted = true",
      "  for i in odd indices:",
      "    if arr[i] > arr[i+1]: swap and mark unsorted",
      "  for i in even indices:",
      "    if arr[i] > arr[i+1]: swap and mark unsorted"
    ]
  },
  pancakeSort: {
    name: "Pancake Sort",
    description: "Pancake Sort sorts by repeatedly flipping prefixes of the array. It finds the maximum element, flips it to the front, then flips it to its correct position. The process continues for the remaining unsorted portion.",
    bestCase: "O(n) - Special cases",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - General case",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "for curr_size from n to 1:",
      "  max_idx = findMax(arr, curr_size)",
      "  if max_idx != curr_size-1:",
      "    flip(arr, max_idx)",
      "    flip(arr, curr_size-1)"
    ]
  },
  bitonicSortWrapper: {
    name: "Bitonic Sort",
    description: "Bitonic Sort is a parallel sorting algorithm that works by creating a bitonic sequence (a sequence that first increases then decreases, or vice versa) and then sorting it. It's particularly efficient on parallel processors.",
    bestCase: "O(log²n) - With parallelization",
    avgCase: "O(log²n) - Parallel execution",
    worstCase: "O(log²n) - Consistent",
    timeComplexity: "O(log²n)",
    spaceComplexity: "O(log²n)",
    pseudocode: [
      "function bitonicSort(arr, up):",
      "  if length(arr) > 1:",
      "    m = length(arr) / 2",
      "    bitonicSort(arr[0:m], 1)",
      "    bitonicSort(arr[m:], 0)",
      "    bitonicMerge(arr, up)"
    ]
  },
  radixSort: {
    name: "Radix Sort",
    description: "Radix Sort is a non-comparative sorting algorithm that sorts integers by processing individual digits. It processes digits from least significant to most significant (or vice versa), using a stable sub-sorting algorithm like counting sort.",
    bestCase: "O(nk) - k is number of digits",
    avgCase: "O(nk) - Linear with digits",
    worstCase: "O(nk) - Consistent performance",
    timeComplexity: "O(nk)",
    spaceComplexity: "O(n+k)",
    pseudocode: [
      "for digit from LSD to MSD:",
      "  create buckets[0-9]",
      "  for each number in arr:",
      "    place in bucket by digit",
      "  collect from buckets back to arr"
    ]
  },
  stoogeSortWrapper: {
    name: "Stooge Sort",
    description: "Stooge Sort is a recursive sorting algorithm with poor time complexity. It recursively sorts the first 2/3, then the last 2/3, and then the first 2/3 again. It's mainly used for educational purposes to demonstrate inefficient algorithms.",
    bestCase: "O(n^2.709) - All cases similar",
    avgCase: "O(n^2.709) - Very inefficient",
    worstCase: "O(n^2.709) - Extremely slow",
    timeComplexity: "O(n^2.709)",
    spaceComplexity: "O(n)",
    pseudocode: [
      "function stoogeSort(arr, i, j):",
      "  if arr[i] > arr[j]: swap(arr[i], arr[j])",
      "  if j - i + 1 > 2:",
      "    t = (j - i + 1) / 3",
      "    stoogeSort(arr, i, j-t)",
      "    stoogeSort(arr, i+t, j)",
      "    stoogeSort(arr, i, j-t)"
    ]
  },
  bogoSort: {
    name: "Bogo Sort",
    description: "Bogo Sort (also known as Permutation Sort or Stupid Sort) randomly shuffles the array and checks if it's sorted. If not, it shuffles again. This is an extremely inefficient algorithm used primarily as a joke or to demonstrate terrible algorithm design. Its average time complexity is factorial!",
    bestCase: "O(n) - Lucky first shuffle",
    avgCase: "O(n×n!) - Astronomical",
    worstCase: "O(∞) - May never finish",
    timeComplexity: "O(∞)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "while not isSorted(arr):",
      "  shuffle(arr)",
      "",
      "Note: This algorithm is completely",
      "impractical and should never be used",
      "for actual sorting tasks!"
    ]
  }
};

export default function AlgoDetails({ selectedAlgo }: AlgoDetailsProps) {
  const [activeTab, setActiveTab] = useState<"complexity" | "pseudocode">("complexity");
  const details = algorithmDetails[selectedAlgo] || algorithmDetails.bubbleSort;

  return (
    <section className="bg-brand-bg-light p-6 rounded-xl shadow-lg">
      {/* Details Panel Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex items-center gap-3">
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" x2="8" y1="13" y2="13"></line>
            <line x1="16" x2="8" y1="17" y2="17"></line>
            <line x1="10" x2="8" y1="9" y2="9"></line>
          </svg>
          <h2 className="text-lg font-semibold">Algorithm Details</h2>
        </div>
        <div className="flex items-center gap-1 border border-brand-border rounded-lg p-1 mt-3 sm:mt-0">
          <button
            onClick={() => setActiveTab("complexity")}
            className={`text-sm px-3 py-1 rounded-md transition-colors ${
              activeTab === "complexity"
                ? "bg-brand-bg-dark text-brand-text-primary"
                : "text-brand-text-secondary hover:bg-brand-bg-dark/50"
            }`}
          >
            Time Complexity
          </button>
          <button
            onClick={() => setActiveTab("pseudocode")}
            className={`text-sm px-3 py-1 rounded-md transition-colors ${
              activeTab === "pseudocode"
                ? "bg-brand-bg-dark text-brand-text-primary"
                : "text-brand-text-secondary hover:bg-brand-bg-dark/50"
            }`}
          >
            Pseudocode
          </button>
        </div>
      </div>

      {/* Details Content */}
      <div>
        <h3 className="text-xl font-bold text-brand-purple mb-2">{details.name}</h3>
        <p className="text-brand-text-secondary leading-relaxed">{details.description}</p>

        {activeTab === "complexity" ? (
          <div className="mt-6 border-t border-brand-border pt-4">
            <h4 className="font-semibold mb-3">Complexity Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div>
                <span className="text-brand-text-secondary">Best: {details.bestCase}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-purple font-semibold">Time Complexity</span>
                <span className="text-brand-text-primary">{details.timeComplexity}</span>
              </div>
              <div>
                <span className="text-brand-text-secondary">Average: {details.avgCase}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-purple font-semibold">Space Complexity</span>
                <span className="text-brand-text-primary">{details.spaceComplexity}</span>
              </div>
              <div>
                <span className="text-brand-text-secondary">Worst: {details.worstCase}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 border-t border-brand-border pt-4">
            <h4 className="font-semibold mb-3">Pseudocode</h4>
            <div className="bg-brand-bg-dark p-4 rounded-lg font-mono text-sm text-brand-text-secondary space-y-1">
              {details.pseudocode.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}