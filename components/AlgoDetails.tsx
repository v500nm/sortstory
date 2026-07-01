"use client";
import { useState } from "react";
import { sortingCodeBlocks, sortingExamples } from "@/lib/sortingCode";
import { allAlgoData } from "@/lib/algoData";

interface AlgoDetailsProps {
  selectedAlgo: string;
}

// Legacy sorting details mapping
const algorithmDetails: Record<string, any> = {
  bubbleSort: {
    name: "Bubble Sort",
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name from the way smaller elements \"bubble\" to the top of the list. While it's simple to understand and implement, it's not efficient for large datasets with its average and worst-case time complexity of O(n²).",
    bestCase: "O(n) - When array is already sorted",
    avgCase: "O(n²) - For random data",
    worstCase: "O(n²) - When array is reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Primarily educational. Used to introduce basic sorting mechanics. In production, it can be useful in embedded systems to verify if a list is already sorted in a single pass with minimal code size.",
    algorithmFlow: ["Start at the first element (index 0).", "Compare it to the next element (index 1).", "If the first is greater than the second, swap them.", "Move to the next pair (index 1 and 2) and repeat.", "Continue to the end of the array. The largest element will 'bubble' to the last position.", "Repeat the entire process n-1 times for the remaining unsorted portion."]
  },
  selectionSort: {
    name: "Selection Sort",
    description: "Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list. The algorithm proceeds by finding the smallest element in the unsorted portion, swapping it with the leftmost unsorted element, and moving the sublist boundaries one element to the right.",
    bestCase: "O(n²) - Always requires full scan",
    avgCase: "O(n²) - For random data",
    worstCase: "O(n²) - For any arrangement",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Highly useful in systems where memory write operations are extremely expensive compared to reads (e.g., writing to EEPROM or Flash memory), because it guarantees at most O(n) swaps (memory writes).",
    algorithmFlow: ["Assume the first element is the minimum.", "Scan the rest of the array to find if there is a smaller element.", "If a smaller element is found, update the minimum index.", "At the end of the scan, swap the minimum element with the first element.", "Move the starting boundary one step to the right and repeat until sorted."]
  },
  insertionSort: {
    name: "Insertion Sort",
    description: "Insertion Sort builds the final sorted array one item at a time. It iterates through the input, removing one element per iteration and finding the location it belongs within the sorted list and inserting it there. It's efficient for small datasets and nearly sorted arrays, with a time complexity of O(n) in the best case when the array is already sorted.",
    bestCase: "O(n) - Already sorted",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - Reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Online sorting (sorting data live as it is received). It is also used as the optimization layer in advanced hybrid algorithms (like Timsort and IntroSort) to sort small sub-arrays (usually size < 32).",
    algorithmFlow: ["Assume the first element is already sorted.", "Pick the next element and store it in a temporary variable (key).", "Compare the key with the elements in the sorted portion (moving backwards).", "If a sorted element is greater than the key, shift it one position to the right.", "Repeat until you find an element smaller than the key or reach the beginning.", "Insert the key into the correct position."]
  },
  mergeSortWrapper: {
    name: "Merge Sort",
    description: "Merge Sort is a stable, divide-and-conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. The merge operation is the key process that combines two sorted arrays into a single sorted array. Merge Sort guarantees O(n log n) performance in all cases, making it reliable for large datasets.",
    bestCase: "O(n log n) - Already sorted",
    avgCase: "O(n log n) - Random data",
    worstCase: "O(n log n) - Reverse sorted",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    useCase: "External sorting (sorting datasets too massive to fit into RAM, by sorting chunks and merging them from hard drives). Commonly used in database engines and stable object sorting.",
    algorithmFlow: ["Base case: If the array has 1 or 0 elements, it is already sorted.", "Divide the array down the middle into a 'left' and 'right' half.", "Recursively call Merge Sort on both halves.", "Once the recursive calls return, 'Merge' the two sorted halves back together.", "During merge, maintain two pointers, compare elements from both halves, and place the smaller element into a new temporary array.", "Copy the merged temporary array back into the original array."]
  },
  quickSortWrapper: {
    name: "Quick Sort",
    description: "Quick Sort is an efficient, in-place, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.",
    bestCase: "O(n log n) - Partition exactly in half",
    avgCase: "O(n log n) - Typical",
    worstCase: "O(n²) - When already sorted and worst pivot chosen",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    useCase: "The default sorting algorithm for primitive types in many languages (like C's qsort, Java's Arrays.sort for primitives). Excellent cache locality makes it faster than Merge Sort in practice.",
    algorithmFlow: ["Choose a 'pivot' element from the array.", "Partitioning: Reorder the array so that all elements smaller than the pivot come before it, and all elements greater come after.", "The pivot is now in its final sorted position.", "Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values."]
  },
  heapSort: {
    name: "Heap Sort",
    description: "Heap Sort involves building a binary heap data structure from the given array and then repeatedly extracting the maximum element from the heap, placing it at the end of the array. It provides a guaranteed O(n log n) time complexity and sorts in-place.",
    bestCase: "O(n log n)",
    avgCase: "O(n log n)",
    worstCase: "O(n log n)",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    useCase: "Systems with strict memory limits and real-time systems where a guaranteed worst-case time complexity of O(n log n) is required without any extra memory allocation.",
    algorithmFlow: ["Build a Max-Heap from the input array.", "The largest element is now at the root of the heap (index 0).", "Swap the root with the last element of the heap.", "Reduce the heap size by 1 (ignoring the last element which is now sorted).", "Heapify the root to restore the Max-Heap property.", "Repeat until the heap size is 1."]
  },
  radixSort: {
    name: "Radix Sort",
    description: "Radix Sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value. It processes digits from Least Significant Digit (LSD) to Most Significant Digit (MSD) using Counting Sort as a subroutine.",
    bestCase: "O(nk) - Where k is max digit length",
    avgCase: "O(nk) - Random data",
    worstCase: "O(nk) - Where k is max digit length",
    timeComplexity: "O(nk)",
    spaceComplexity: "O(n + k)",
    useCase: "Sorting extremely large datasets of integers, fixed-length strings (like social security numbers or phone numbers), or IP addresses, where n is massive but k (max length) is small.",
    algorithmFlow: ["Find the maximum number in the array to determine the number of digits.", "Perform a stable sorting algorithm (usually Counting Sort) for each digit.", "Start sorting from the least significant digit (LSD) to the most significant digit (MSD).", "After sorting by all digits, the array is fully sorted."]
  }
};

type LanguageType = "javascript" | "python" | "java" | "cpp";

const LANGUAGE_LABELS: Record<LanguageType, string> = {
  javascript: "JAVASCRIPT",
  python: "PYTHON",
  java: "JAVA",
  cpp: "C++"
};

export default function AlgoDetails({ selectedAlgo }: AlgoDetailsProps) {
  const [activeTab, setActiveTab] = useState<"complexity" | "flow" | "pseudocode" | "usecase">("complexity");
  const [selectedLang, setSelectedLang] = useState<LanguageType>("javascript");
  
  const isUnified = !!allAlgoData[selectedAlgo];
  const unifiedData = allAlgoData[selectedAlgo];
  const legacyData = algorithmDetails[selectedAlgo] || algorithmDetails.bubbleSort;

  // Normalize data
  const name = isUnified ? unifiedData.name : legacyData.name;
  const description = isUnified ? unifiedData.description : legacyData.description;
  const bestCase = isUnified ? unifiedData.bestCase : legacyData.bestCase;
  const avgCase = isUnified ? unifiedData.avgCase : legacyData.avgCase;
  const worstCase = isUnified ? unifiedData.worstCase : legacyData.worstCase;
  const timeComplexity = isUnified ? unifiedData.timeComplexity : legacyData.timeComplexity;
  const spaceComplexity = isUnified ? unifiedData.spaceComplexity : legacyData.spaceComplexity;
  const useCase = isUnified ? unifiedData.useCase : legacyData.useCase;
  const flowSteps = isUnified ? unifiedData.algorithmFlow : (legacyData.algorithmFlow || []);
  const examples = isUnified ? unifiedData.examples : (sortingExamples[selectedAlgo] ? [{ title: "Scenario", description: sortingExamples[selectedAlgo], code: "" }] : []);

  // Handle Code Blocks
  let codeSnippet = "";
  if (isUnified) {
    codeSnippet = unifiedData.codeSnippets[selectedLang] || "// Code not available in this language yet.";
  } else {
    codeSnippet = sortingCodeBlocks[selectedAlgo]?.[selectedLang]?.join('\\n') || "// Code not available";
  }

  return (
    <section className="glass-card premium-border p-6 relative overflow-hidden">
      {/* Details Panel Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded flex items-center justify-center bg-brand-border">
            <svg fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="12" className="text-white">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" x2="8" y1="13" y2="13"></line>
              <line x1="16" x2="8" y1="17" y2="17"></line>
              <line x1="10" x2="8" y1="9" y2="9"></line>
            </svg>
          </div>
          <h2 className="text-sm font-semibold tracking-wider text-brand-text-primary uppercase">Algorithm Details</h2>
        </div>
        <div className="flex flex-wrap items-center gap-1 border border-brand-border rounded-lg p-1 mt-3 xl:mt-0 bg-[#0a0a0a]">
          <button
            onClick={() => setActiveTab("complexity")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "complexity"
                ? "bg-brand-border text-white"
                : "text-brand-text-secondary hover:text-white"
            }`}
          >
            COMPLEXITY
          </button>
          <button
            onClick={() => setActiveTab("flow")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "flow"
                ? "bg-brand-border text-white"
                : "text-brand-text-secondary hover:text-white"
            }`}
          >
            ALGORITHM FLOW
          </button>
          <button
            onClick={() => setActiveTab("pseudocode")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "pseudocode"
                ? "bg-brand-border text-white"
                : "text-brand-text-secondary hover:text-white"
            }`}
          >
            CODE EXAMPLES
          </button>
          <button
            onClick={() => setActiveTab("usecase")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "usecase"
                ? "bg-brand-border text-white"
                : "text-brand-text-secondary hover:text-white"
            }`}
          >
            USE CASES
          </button>
        </div>
      </div>

      {/* Details Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white tracking-wide">{name}</h3>
          <p className="text-brand-text-secondary text-sm leading-relaxed mt-2">{description}</p>
        </div>

        {activeTab === "complexity" && (
          <div className="border-t border-brand-border pt-4">
            <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary mb-3 uppercase">Complexity Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Best Case</span>
                <span className="text-white font-mono">{bestCase.split(" - ")[0]}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Time Complexity</span>
                <span className="text-white font-mono font-semibold">{timeComplexity}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Average Case</span>
                <span className="text-white font-mono">{avgCase.split(" - ")[0]}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Space Complexity</span>
                <span className="text-white font-mono font-semibold">{spaceComplexity}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2 md:border-none md:pb-0">
                <span className="text-brand-text-secondary font-medium">Worst Case</span>
                <span className="text-white font-mono">{worstCase.split(" - ")[0]}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "flow" && (
          <div className="border-t border-brand-border pt-4 space-y-4">
             <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary uppercase">Algorithm Flow Breakdown</h4>
             <ul className="space-y-2">
               {flowSteps.map((step: string, i: number) => (
                 <li key={i} className="flex gap-3 text-sm text-brand-text-secondary">
                   <span className="font-mono text-brand-accent font-bold">{i + 1}.</span>
                   <span>{step}</span>
                 </li>
               ))}
               {flowSteps.length === 0 && (
                 <li className="text-sm text-brand-text-secondary italic">Flow details not available for this algorithm.</li>
               )}
             </ul>
          </div>
        )}

        {activeTab === "pseudocode" && (
          <div className="border-t border-brand-border pt-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary uppercase">Code Implementations</h4>
              <div className="flex flex-wrap gap-1 bg-black/40 p-1 border border-brand-border rounded-md w-fit">
                {(Object.keys(LANGUAGE_LABELS) as LanguageType[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`text-[9px] font-bold tracking-wider px-2 py-1 rounded transition-colors ${
                      selectedLang === lang
                        ? "bg-[#27272a] text-white"
                        : "text-brand-text-secondary hover:text-white"
                    }`}
                  >
                    {LANGUAGE_LABELS[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#070707] border border-brand-border/60 p-4 rounded-lg font-mono text-xs text-brand-text-secondary overflow-x-auto">
              <pre><code>{codeSnippet}</code></pre>
            </div>
          </div>
        )}

        {activeTab === "usecase" && (
          <div className="border-t border-brand-border pt-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary mb-2 uppercase">Real-World Use Case</h4>
              <div className="bg-[#070707] border border-brand-border/60 p-4 rounded-lg text-sm text-brand-text-secondary leading-relaxed">
                {useCase}
              </div>
            </div>
            {examples.length > 0 && examples.map((ex: any, i: number) => (
              <div key={i}>
                <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary mb-2 uppercase">{ex.title}</h4>
                <div className="bg-[#070707] border border-[#22c55e]/20 p-4 rounded-lg text-sm text-brand-text-secondary leading-relaxed border-l-2 border-l-[#22c55e]">
                  <p>{ex.description}</p>
                  {ex.code && <pre className="mt-3 text-xs font-mono opacity-80 border-t border-brand-border/30 pt-3"><code>{ex.code}</code></pre>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}