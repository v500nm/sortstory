"use client";
import { useState } from "react";
import { sortingCodeBlocks, sortingExamples } from "@/lib/sortingCode";

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
  useCase: string;
}> = {
  bubbleSort: {
    name: "Bubble Sort",
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name from the way smaller elements \"bubble\" to the top of the list. While it's simple to understand and implement, it's not efficient for large datasets with its average and worst-case time complexity of O(n²).",
    bestCase: "O(n) - When array is already sorted",
    avgCase: "O(n²) - For random data",
    worstCase: "O(n²) - When array is reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Primarily educational. Used to introduce basic sorting mechanics. In production, it can be useful in embedded systems to verify if a list is already sorted in a single pass with minimal code size."
  },
  selectionSort: {
    name: "Selection Sort",
    description: "Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list. The algorithm proceeds by finding the smallest element in the unsorted portion, swapping it with the leftmost unsorted element, and moving the sublist boundaries one element to the right.",
    bestCase: "O(n²) - Always requires full scan",
    avgCase: "O(n²) - For random data",
    worstCase: "O(n²) - For any arrangement",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Highly useful in systems where memory write operations are extremely expensive compared to reads (e.g., writing to EEPROM or Flash memory), because it guarantees at most O(n) swaps (memory writes)."
  },
  insertionSort: {
    name: "Insertion Sort",
    description: "Insertion Sort builds the final sorted array one item at a time. It iterates through the input, removing one element per iteration and finding the location it belongs within the sorted list and inserting it there. It's efficient for small datasets and nearly sorted arrays, with a time complexity of O(n) in the best case when the array is already sorted.",
    bestCase: "O(n) - Already sorted",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - Reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Online sorting (sorting data live as it is received). It is also used as the optimization layer in advanced hybrid algorithms (like Timsort and IntroSort) to sort small sub-arrays (usually size < 32)."
  },
  mergeSortWrapper: {
    name: "Merge Sort",
    description: "Merge Sort is a stable, divide-and-conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. The merge operation is the key process that combines two sorted arrays into a single sorted array. Merge Sort guarantees O(n log n) performance in all cases, making it reliable for large datasets.",
    bestCase: "O(n log n) - Already sorted",
    avgCase: "O(n log n) - Random data",
    worstCase: "O(n log n) - Reverse sorted",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    useCase: "External sorting (sorting datasets too massive to fit into RAM, by sorting chunks and merging them from hard drives). Commonly used in database engines and stable object sorting (like Java's Collections.sort)."
  },
  quickSortWrapper: {
    name: "Quick Sort",
    description: "Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element and partitioning the array around it, such that elements smaller than the pivot come before it and elements greater come after. The process is then recursively applied to the sub-arrays. Quick Sort is one of the fastest sorting algorithms in practice, with an average time complexity of O(n log n).",
    bestCase: "O(n log n) - Good pivot selection",
    avgCase: "O(n log n) - Random pivot",
    worstCase: "O(n²) - Poor pivot selection",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    useCase: "The standard default algorithm for in-memory sorting libraries (like C's qsort, Java's Arrays.sort, and V8's array sort) because of its exceptional cache locality and speed on modern CPU architectures."
  },
  heapSort: {
    name: "Heap Sort",
    description: "Heap Sort converts the array into a heap data structure (max-heap for ascending order), then repeatedly extracts the maximum element from the heap and rebuilds the heap. It's an in-place sorting algorithm with guaranteed O(n log n) performance but is not stable.",
    bestCase: "O(n log n) - All cases similar",
    avgCase: "O(n log n) - For random data",
    worstCase: "O(n log n) - Consistent performance",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    useCase: "Used in real-time and embedded systems where guaranteed worst-case execution time (O(n log n)) and strict memory limitations (O(1) auxiliary space) are required. Also used in Linux kernel sorting implementations."
  },
  shellSort: {
    name: "Shell Sort",
    description: "Shell Sort is a generalization of insertion sort that allows the exchange of items that are far apart. The algorithm starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared.",
    bestCase: "O(n log n) - Good gap sequence",
    avgCase: "O(n^(4/3)) - Depends on gap",
    worstCase: "O(n²) - Poor gap sequence",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    useCase: "Embedded processors and older Unix systems where recursive stack space is restricted (preventing Merge/Quick Sort), but performance must still be much better than standard insertion/selection sort."
  },
  cocktailSort: {
    name: "Cocktail Sort",
    description: "Cocktail Sort is a variation of Bubble Sort that sorts in both directions alternately. It traverses the list from left to right, then right to left, repeatedly until no swaps are needed. This bidirectional approach helps move elements faster to their correct positions.",
    bestCase: "O(n) - Already sorted",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - Reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Useful in computer graphics and game engines when updating overlapping rendering layers or handling lists where elements are mostly sorted but minor offsets at the boundaries exist."
  },
  combSort: {
    name: "Comb Sort",
    description: "Comb Sort improves on bubble sort by using a gap larger than 1. The gap starts with a large value and shrinks by a factor of 1.3 in each iteration until it reaches 1, at which point the algorithm is essentially bubble sort.",
    bestCase: "O(n log n) - Nearly sorted",
    avgCase: "O(n²/2ᵖ) - Depends on gap",
    worstCase: "O(n²) - Poor cases",
    timeComplexity: "O(n²/2ᵖ)",
    spaceComplexity: "O(1)",
    useCase: "Used in lightweight data compression utilities or specialized microcontroller programs that want sorting performance close to O(n log n) without using heavy heap or recursive memory architectures."
  },
  gnomeSort: {
    name: "Gnome Sort",
    description: "Gnome Sort is similar to Insertion Sort but moves an element to its proper place by a series of swaps. It's conceptually simple: if the current element is in order relative to the previous, move forward; otherwise, swap and move backward.",
    bestCase: "O(n) - Already sorted",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - Reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Used for rapid debugging or scripts where code size and ease of implementation are the primary constraints, and the dataset is tiny (less than 10-20 elements)."
  },
  oddEvenSort: {
    name: "Odd-Even Sort",
    description: "Odd-Even Sort is a variation of bubble sort that compares all odd/even indexed pairs of adjacent elements in the list. It alternates between odd and even phases until the list is sorted.",
    bestCase: "O(n) - Already sorted",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - Reverse sorted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Highly suited for execution on parallel processing hardware (like multi-core processors, GPUs, or FPGAs) since multiple independent index comparisons can be executed simultaneously."
  },
  pancakeSort: {
    name: "Pancake Sort",
    description: "Pancake Sort sorts by repeatedly flipping prefixes of the array. It finds the maximum element, flips it to the front, then flips it to its correct position. The process continues for the remaining unsorted portion.",
    bestCase: "O(n) - Special cases",
    avgCase: "O(n²) - Random data",
    worstCase: "O(n²) - General case",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Used in robotics (e.g., reversing the order of stacked crates with simple rotation spatulas), and bioinformatics to model evolutionary distance between species via chromosome reversals."
  },
  bitonicSortWrapper: {
    name: "Bitonic Sort",
    description: "Bitonic Sort is a parallel sorting algorithm that works by creating a bitonic sequence (a sequence that first increases then decreases, or vice versa) and then sorting it. It's particularly efficient on parallel processors.",
    bestCase: "O(log²n) - With parallelization",
    avgCase: "O(log²n) - Parallel execution",
    worstCase: "O(log²n) - Consistent",
    timeComplexity: "O(log²n)",
    spaceComplexity: "O(log²n)",
    useCase: "Ideal for execution on GPUs (like CUDA kernels) and parallel hardware accelerators because the comparison network layout is completely static and independent of input data value order."
  },
  radixSort: {
    name: "Radix Sort",
    description: "Radix Sort is a non-comparative sorting algorithm that sorts integers by processing individual digits. It processes digits from least significant to most significant (or vice versa), using a stable sub-sorting algorithm like counting sort.",
    bestCase: "O(nk) - k is number of digits",
    avgCase: "O(nk) - Linear with digits",
    worstCase: "O(nk) - Consistent performance",
    timeComplexity: "O(nk)",
    spaceComplexity: "O(n+k)",
    useCase: "Sorting large lists of integers (like telephone numbers, zip codes, or card indices) or fixed-length strings (such as transaction IDs or serial keys) where the key length (k) is small."
  },
  stoogeSortWrapper: {
    name: "Stooge Sort",
    description: "Stooge Sort is a recursive sorting algorithm with poor time complexity. It recursively sorts the first 2/3, then the last 2/3, and then the first 2/3 again. It's mainly used for educational purposes to demonstrate inefficient algorithms.",
    bestCase: "O(n^2.709) - All cases similar",
    avgCase: "O(n^2.709) - Very inefficient",
    worstCase: "O(n^2.709) - Extremely slow",
    timeComplexity: "O(n^2.709)",
    spaceComplexity: "O(n)",
    useCase: "Strictly theoretical. Used to challenge students in computer science courses to solve runtime recurrence relations for unusual fraction-based recursive loops."
  },
  bogoSort: {
    name: "Bogo Sort",
    description: "Bogo Sort (also known as Permutation Sort or Stupid Sort) randomly shuffles the array and checks if it's sorted. If not, it shuffles again. This is an extremely inefficient algorithm used primarily as a joke or to demonstrate terrible algorithm design. Its average time complexity is factorial!",
    bestCase: "O(n) - Lucky first shuffle",
    avgCase: "O(n×n!) - Astronomical",
    worstCase: "O(∞) - May never finish",
    timeComplexity: "O(∞)",
    spaceComplexity: "O(1)",
    useCase: "Used as a theoretical benchmark for the absolute worst-performing logic. It serves as a visual and academic contrast to show students why efficient algorithm design is vital."
  }
};

type LanguageType = "pseudocode" | "javascript" | "python" | "java" | "cpp" | "c";

const LANGUAGE_LABELS: Record<LanguageType, string> = {
  pseudocode: "PSEUDOCODE",
  javascript: "JAVASCRIPT",
  python: "PYTHON",
  java: "JAVA",
  cpp: "C++",
  c: "C"
};

export default function AlgoDetails({ selectedAlgo }: AlgoDetailsProps) {
  const [activeTab, setActiveTab] = useState<"complexity" | "pseudocode" | "usecase">("complexity");
  const [selectedLang, setSelectedLang] = useState<LanguageType>("pseudocode");
  
  const details = algorithmDetails[selectedAlgo] || algorithmDetails.bubbleSort;
  const exampleText = sortingExamples[selectedAlgo] || "";
  const codeLines = sortingCodeBlocks[selectedAlgo]?.[selectedLang] || [];

  return (
    <section className="glass-card premium-border p-6 relative overflow-hidden">
      {/* Details Panel Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
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
        <div className="flex items-center gap-1 border border-brand-border rounded-lg p-1 mt-3 sm:mt-0 bg-[#0a0a0a]">
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
            onClick={() => setActiveTab("pseudocode")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "pseudocode"
                ? "bg-brand-border text-white"
                : "text-brand-text-secondary hover:text-white"
            }`}
          >
            CODE IMPLEMENTATIONS
          </button>
          <button
            onClick={() => setActiveTab("usecase")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "usecase"
                ? "bg-brand-border text-white"
                : "text-brand-text-secondary hover:text-white"
            }`}
          >
            USE CASE
          </button>
        </div>
      </div>

      {/* Details Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white tracking-wide">{details.name}</h3>
          <p className="text-brand-text-secondary text-sm leading-relaxed mt-2">{details.description}</p>
        </div>

        {activeTab === "complexity" && (
          <div className="border-t border-brand-border pt-4">
            <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary mb-3 uppercase">Complexity Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Best Case</span>
                <span className="text-white font-mono">{details.bestCase.split(" - ")[0]}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Time Complexity</span>
                <span className="text-white font-mono font-semibold">{details.timeComplexity}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Average Case</span>
                <span className="text-white font-mono">{details.avgCase.split(" - ")[0]}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Space Complexity</span>
                <span className="text-white font-mono font-semibold">{details.spaceComplexity}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2 md:border-none md:pb-0">
                <span className="text-brand-text-secondary font-medium">Worst Case</span>
                <span className="text-white font-mono">{details.worstCase.split(" - ")[0]}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pseudocode" && (
          <div className="border-t border-brand-border pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary uppercase">Code Implementations</h4>
              {/* Language Selector pills */}
              <div className="flex flex-wrap gap-1 bg-black/40 p-1 border border-brand-border rounded-md">
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

            <div className="bg-[#070707] border border-brand-border/60 p-4 rounded-lg font-mono text-xs text-brand-text-secondary space-y-1.5 overflow-x-auto">
              {codeLines.map((line, index) => (
                <div key={index} className="whitespace-pre">{line}</div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "usecase" && (
          <div className="border-t border-brand-border pt-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary mb-2 uppercase">Real-World Use Case</h4>
              <div className="bg-[#070707] border border-brand-border/60 p-4 rounded-lg text-sm text-brand-text-secondary leading-relaxed">
                {details.useCase}
              </div>
            </div>
            {exampleText && (
              <div>
                <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary mb-2 uppercase">Concrete Example</h4>
                <div className="bg-[#070707] border border-[#22c55e]/20 p-4 rounded-lg text-sm text-brand-text-secondary leading-relaxed border-l-2 border-l-[#22c55e]">
                  <strong className="text-white font-medium block mb-1">Scenario:</strong>
                  {exampleText}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}