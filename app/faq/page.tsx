"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

/* ────────── FAQ Data ────────── */
interface FAQItem {
  question: string;
  answer: string;
  link?: { label: string; href: string };
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Core DSA Concepts",
    icon: "📐",
    items: [
      {
        question: "What is DSA (Data Structures and Algorithms)?",
        answer:
          "DSA stands for Data Structures and Algorithms. Data structures are ways of organizing and storing data (like arrays, linked lists, trees, and graphs), while algorithms are step-by-step procedures for solving problems using those structures (like sorting, searching, and pathfinding). DSA is the foundation of computer science and is essential for writing efficient software and acing technical interviews.",
      },
      {
        question: "What is an algorithm?",
        answer:
          "An algorithm is a clear, step-by-step set of instructions or rules used to solve a problem, do a calculation, or finish a task. You can think of it like a recipe for cooking food or directions for finding a location. In computer science, algorithms are used to process data, make decisions, and automate tasks efficiently.",
      },
      {
        question: "What are the most important data structures to learn?",
        answer:
          "The most important data structures to learn are: Arrays, Linked Lists (Singly & Doubly), Stacks, Queues, Hash Tables/Maps, Binary Trees, Binary Search Trees (BST), Heaps, Graphs, and Tries. SortStory provides interactive visualizations for Linked Lists, Trees, Graphs, and more to help you understand how these structures work in practice.",
        link: { label: "Explore visualizers →", href: "/" },
      },
      {
        question: "What is time complexity and Big O notation?",
        answer:
          "Time complexity measures how an algorithm's runtime grows as input size increases. Big O notation describes this growth rate: O(1) is constant time, O(log n) is logarithmic, O(n) is linear, O(n log n) is linearithmic, O(n²) is quadratic, and O(2^n) is exponential. For example, Binary Search is O(log n) while Bubble Sort is O(n²). Understanding Big O helps you choose the most efficient algorithm for your problem.",
      },
      {
        question: "What is space complexity?",
        answer:
          "Space complexity measures the total amount of memory an algorithm needs relative to input size. It includes the input itself and any auxiliary space used. For example, Merge Sort uses O(n) extra space for merging, while Heap Sort uses O(1) extra space (in-place). Understanding space complexity helps you make trade-offs between speed and memory usage.",
      },
      {
        question: "What is the difference between BFS and DFS?",
        answer:
          "BFS (Breadth-First Search) explores a graph level by level, visiting all neighbors before moving deeper. It uses a queue and finds the shortest path in unweighted graphs. DFS (Depth-First Search) explores as deep as possible along each branch before backtracking. It uses a stack (or recursion). BFS is better for shortest paths; DFS is better for topological sorting and cycle detection.",
        link: { label: "Visualize BFS & DFS →", href: "/graphs" },
      },
    ],
  },
  {
    title: "Sorting Algorithms",
    icon: "📊",
    items: [
      {
        question: "What sorting algorithms does SortStory support?",
        answer:
          "SortStory supports 16+ sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Shell Sort, Cocktail Sort, Comb Sort, Gnome Sort, Odd-Even Sort, Pancake Sort, Bitonic Sort, Radix Sort, Stooge Sort, Bogo Sort, Tim Sort, and Intro Sort. Each can be visualized in real-time with comparison and swap counters.",
        link: { label: "Open Sorting Visualizer →", href: "/sort" },
      },
      {
        question: "What is the fastest sorting algorithm?",
        answer:
          "The fastest general-purpose sorting algorithms are Merge Sort, Quick Sort, and Heap Sort, all with O(n log n) average time complexity. Quick Sort is typically fastest in practice due to cache locality. For specific data types, Radix Sort can achieve O(nk) time. Tim Sort (used in Python and Java) combines Merge Sort and Insertion Sort for optimal real-world performance.",
        link: { label: "Race algorithms side-by-side →", href: "/sort" },
      },
      {
        question: "What is the difference between Merge Sort and Quick Sort?",
        answer:
          "Merge Sort divides the array in half, recursively sorts each half, and merges them — it's stable and always O(n log n) but requires O(n) extra space. Quick Sort picks a pivot, partitions elements around it, and recursively sorts partitions — it's O(n log n) on average but O(n²) in the worst case. Quick Sort is faster in practice but unstable.",
      },
      {
        question: "What is the time complexity of Bubble Sort?",
        answer:
          "Bubble Sort has a time complexity of O(n²) in the average and worst cases, and O(n) in the best case (when the array is already sorted with an optimized version). Its space complexity is O(1) as it sorts in-place. While simple to understand, it's inefficient for large datasets — algorithms like Merge Sort O(n log n) and Quick Sort O(n log n average) are much faster.",
      },
      {
        question: "Which sorting algorithm is best for nearly sorted data?",
        answer:
          "Insertion Sort is the best choice for nearly sorted (almost sorted) data, achieving O(n) time complexity in the best case. Tim Sort, which is used by Python and Java internally, is also optimized for partially sorted data by detecting and merging natural runs. Shell Sort is another good option as it reduces inversions efficiently.",
      },
      {
        question: "What is a stable sorting algorithm?",
        answer:
          "A stable sorting algorithm preserves the relative order of equal elements. For example, if two items have the same key, they appear in the same order in the sorted output as they did in the input. Merge Sort, Insertion Sort, Bubble Sort, and Tim Sort are stable. Quick Sort, Heap Sort, and Selection Sort are not stable. Stability matters when sorting by multiple keys.",
      },
      {
        question: "What is an in-place sorting algorithm?",
        answer:
          "An in-place sorting algorithm sorts the data using only a constant amount of extra memory O(1), modifying the original array directly. Examples include Bubble Sort, Selection Sort, Insertion Sort, Heap Sort, and Quick Sort. Merge Sort is NOT in-place as it requires O(n) auxiliary space. In-place algorithms are memory-efficient but may sacrifice stability.",
      },
      {
        question: "What is Heap Sort and how does it work?",
        answer:
          "Heap Sort works by building a max-heap from the input array, then repeatedly extracting the maximum element and placing it at the end. It has O(n log n) time complexity in all cases and O(1) space complexity, making it an in-place, non-recursive alternative to Merge Sort. However, it's not stable.",
      },
      {
        question: "What is Radix Sort?",
        answer:
          "Radix Sort is a non-comparison-based sorting algorithm that sorts integers digit by digit, from the least significant to the most significant digit (LSD Radix Sort). It uses counting sort as a subroutine and achieves O(nk) time complexity, where k is the number of digits. It's extremely fast for sorting large sets of integers with a fixed number of digits.",
      },
    ],
  },
  {
    title: "Searching Algorithms",
    icon: "🔍",
    items: [
      {
        question: "What is the difference between Linear Search and Binary Search?",
        answer:
          "Linear Search checks each element one by one from start to end — it works on any array but has O(n) time complexity. Binary Search repeatedly divides a sorted array in half, achieving O(log n) time but requiring the array to be sorted first. For 1 million elements, Linear Search may need 1M comparisons vs only ~20 for Binary Search.",
        link: { label: "Race Linear vs Binary →", href: "/search" },
      },
      {
        question: "When should I use Binary Search?",
        answer:
          "Use Binary Search when your data is sorted (or can be sorted once and queried many times). It's ideal for lookup tables, finding boundaries in sorted ranges, and optimization problems (Binary Search on answer). It's also the basis for data structures like Binary Search Trees.",
      },
      {
        question: "What is the time complexity of Binary Search?",
        answer:
          "Binary Search has O(log n) time complexity because it halves the search space with each comparison. For an array of 1 billion elements, Binary Search needs at most ~30 comparisons. Its space complexity is O(1) for iterative and O(log n) for recursive implementations.",
      },
    ],
  },
  {
    title: "Pathfinding & Graphs",
    icon: "🗺️",
    items: [
      {
        question: "What is the difference between Dijkstra and A*?",
        answer:
          "Dijkstra's algorithm explores all directions uniformly and guarantees the shortest path in weighted graphs with O(V²) or O(E log V) time complexity. A* adds a heuristic function (like Manhattan distance) to guide exploration toward the target, making it significantly faster in practice while still guaranteeing optimal paths when the heuristic is admissible.",
        link: { label: "Race Dijkstra vs A* →", href: "/pathfinding" },
      },
      {
        question: "What is the shortest path algorithm?",
        answer:
          "The most common shortest path algorithms are: Dijkstra's Algorithm (for weighted graphs with non-negative edges), A* Search (Dijkstra + heuristic for faster targeted search), Bellman-Ford (handles negative weights), and BFS (for unweighted graphs).",
        link: { label: "Try Pathfinding Visualizer →", href: "/pathfinding" },
      },
      {
        question: "Can I generate mazes to test pathfinding?",
        answer:
          "Yes! SortStory includes two maze generation algorithms: Recursive Backtracking (DFS-based, creates long winding corridors) and Prim's Algorithm (creates organic, highly-branching mazes). You can also control obstacle density with a slider and then run Dijkstra or A* to find the shortest path.",
        link: { label: "Generate mazes →", href: "/pathfinding" },
      },
      {
        question: "What graph algorithms can I visualize?",
        answer:
          "SortStory supports Breadth-First Search (BFS) and Depth-First Search (DFS) on interactive graph networks. You can build custom node-edge networks by clicking to add nodes and dragging to create edges, then watch traversal algorithms explore them in real-time with color-coded visited/current/unvisited states.",
        link: { label: "Build a graph →", href: "/graphs" },
      },
    ],
  },
  {
    title: "Trees & Linked Lists",
    icon: "🌳",
    items: [
      {
        question: "What is a Binary Search Tree (BST)?",
        answer:
          "A Binary Search Tree is a tree data structure where each node has at most two children. For every node, all values in its left subtree are smaller, and all values in the right subtree are larger. This property enables efficient O(log n) search, insertion, and deletion operations.",
        link: { label: "Interact with a BST →", href: "/trees" },
      },
      {
        question: "What are tree traversal methods?",
        answer:
          "The three main depth-first tree traversal methods are: Pre-order (Root → Left → Right), In-order (Left → Root → Right, gives sorted order for BSTs), and Post-order (Left → Right → Root). There's also Level-order traversal (BFS-based, visits nodes level by level).",
        link: { label: "Visualize traversals →", href: "/trees" },
      },
      {
        question: "What is a linked list and why is it useful?",
        answer:
          "A linked list is a linear data structure where elements (nodes) are connected via pointers. Each node stores data and a reference to the next node. Unlike arrays, linked lists allow O(1) insertion and deletion at known positions without shifting elements. They come in Singly Linked (one direction), Doubly Linked (both directions), and Circular variants.",
        link: { label: "Explore Linked Lists →", href: "/linked-lists" },
      },
    ],
  },
  {
    title: "Learning & Career",
    icon: "🎯",
    items: [
      {
        question: "Can I learn DSA on my own?",
        answer:
          "Absolutely! DSA is one of the most self-teachable topics in computer science. Start with basic data structures (arrays, linked lists), learn fundamental algorithms (sorting, searching), then progress to trees, graphs, and dynamic programming. Visual tools like SortStory let you visualize algorithms in real-time, which makes self-learning much more intuitive.",
        link: { label: "Start learning →", href: "/learn" },
      },
      {
        question: "How long does it take to learn DSA?",
        answer:
          "With consistent daily practice of 1-2 hours, most learners can cover core DSA topics in 3-6 months. This includes arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, and basic dynamic programming.",
      },
      {
        question: "Can I master DSA in 3 months?",
        answer:
          "Yes, with dedicated daily practice of 2-3 hours, you can cover core DSA topics in 3 months. Focus on: Week 1-4: Arrays, Strings, Sorting, Searching. Week 5-8: Linked Lists, Stacks, Queues, Trees. Week 9-12: Graphs, Dynamic Programming, Greedy algorithms. Use visual tools to build intuition quickly, and practice problems on platforms like LeetCode alongside.",
      },
      {
        question: "Why is DSA important for coding interviews?",
        answer:
          "DSA is the cornerstone of technical interviews at major tech companies (Google, Amazon, Meta, Microsoft, etc.). Interviewers test your ability to choose appropriate data structures, design efficient algorithms, and analyze time/space complexity. Strong DSA skills demonstrate problem-solving ability and software engineering fundamentals.",
      },
      {
        question: "Is Python good for learning DSA?",
        answer:
          "Yes, Python is excellent for learning DSA due to its clean, readable syntax. It lets you focus on algorithmic logic rather than language complexity. However, it's beneficial to also learn implementations in C++ or Java for competitive programming. SortStory provides code examples in Python, JavaScript, Java, C++, and C for every algorithm.",
      },
      {
        question: "Is C++ or Java better for DSA?",
        answer:
          "Both are excellent for DSA. C++ is slightly faster and preferred in competitive programming due to its STL (Standard Template Library). Java offers strong OOP concepts and built-in data structures through its Collections framework. For learning concepts, choose whichever language you're most comfortable with — the algorithmic logic is the same regardless of language.",
      },
      {
        question: "Does SortStory have a learning curriculum?",
        answer:
          "Yes! SortStory includes a full structured DSA curriculum. Each algorithm has step-by-step lessons, code implementations in 5 programming languages (Python, JavaScript, Java, C++, and C), and practice problems. Topics span Searching, Sorting, Linked Lists, Trees, Graphs, Pathfinding, and Automata.",
        link: { label: "Browse curriculum →", href: "/learn" },
      },
      {
        question: "Is SortStory free to use?",
        answer:
          "Yes, SortStory is completely free and open. No login, no signup, no payment required. All 16+ sorting algorithms, pathfinding, graphs, trees, linked lists, and the full learning curriculum are accessible for free.",
      },
    ],
  },
];

/* ────────── Accordion Item Component ────────── */
function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`border border-brand-border rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? "bg-brand-bg-light/50 border-brand-border-light shadow-lg shadow-brand-purple/5" : "bg-brand-bg-card hover:bg-brand-bg-light/30 hover:border-brand-border-light"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-sm sm:text-base font-semibold text-brand-text-primary leading-snug pr-2">
          {item.question}
        </h3>
        <span
          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            isOpen
              ? "bg-brand-purple text-white rotate-45"
              : "bg-brand-bg-light text-brand-text-secondary"
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4 pt-0">
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              {item.answer}
            </p>
            {item.link && (
              <Link
                href={item.link.href}
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-brand-purple hover:text-brand-cyan transition-colors"
              >
                {item.link.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────── Main FAQ Page ────────── */
export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const totalQuestions = faqCategories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <Header />

      <div className="max-w-[900px] mx-auto w-full px-4 sm:px-6 py-8 md:py-12 flex-grow">
        <PageHeader
          title="Frequently Asked Questions"
          description={`${totalQuestions} answers covering data structures, algorithms, sorting, searching, pathfinding, and everything else you need to know about DSA.`}
        />

        {/* Category quick-nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          {faqCategories.map((cat) => (
            <a
              key={cat.title}
              href={`#${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-brand-border bg-brand-bg-card text-brand-text-secondary hover:border-brand-purple hover:text-brand-purple transition-all"
            >
              <span>{cat.icon}</span>
              {cat.title}
            </a>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqCategories.map((category) => (
            <section
              key={category.title}
              id={category.title.toLowerCase().replace(/\s+/g, "-")}
              className="scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{category.icon}</span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-brand-text-primary">
                  {category.title}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-bg-light text-brand-text-secondary border border-brand-border">
                  {category.items.length}
                </span>
              </div>

              <div className="space-y-2">
                {category.items.map((item) => {
                  const key = `${category.title}::${item.question}`;
                  return (
                    <AccordionItem
                      key={key}
                      item={item}
                      isOpen={openItems.has(key)}
                      onToggle={() => toggleItem(key)}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-6 rounded-2xl border border-brand-border bg-gradient-to-br from-brand-bg-card to-brand-bg-medium text-center">
          <p className="text-brand-text-secondary text-sm mb-4">
            Still have questions? Start exploring algorithms visually.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sort"
              className="px-5 py-2.5 rounded-lg bg-brand-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Sorting Visualizer
            </Link>
            <Link
              href="/learn"
              className="px-5 py-2.5 rounded-lg border border-brand-border text-brand-text-primary text-sm font-semibold hover:border-brand-border-light transition-colors"
            >
              Learn DSA
            </Link>
          </div>
        </div>

        {/* SEO text block (visible to crawlers, minimal visual weight) */}
        <div className="mt-10 text-xs text-brand-text-secondary/50 leading-relaxed space-y-2">
          <p>
            SortStory is a free, interactive platform for learning Data Structures and Algorithms (DSA) through real-time visualizations. 
            Whether you&apos;re preparing for coding interviews at Google, Amazon, Microsoft, or Meta, or learning DSA as a beginner, 
            SortStory helps you understand how algorithms work by showing them step-by-step. Explore sorting algorithms like Bubble Sort, 
            Merge Sort, Quick Sort, and Heap Sort. Visualize pathfinding with Dijkstra and A*. Build graphs and watch BFS and DFS 
            traverse your networks. Practice with interactive Binary Search Trees and Linked Lists.
          </p>
        </div>
      </div>
    </main>
  );
}
