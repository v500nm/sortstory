import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import { PortfolioEcosystem } from "@/components/PortfolioEcosystem";
import SecurityWrapper from "@/components/SecurityWrapper";
import AnalyticsBanner from "@/components/AnalyticsBanner";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PostHogProvider } from "@/components/PostHogProvider";
import SiteAnalyticsWrapper from "@/components/SiteAnalyticsWrapper";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";

/* ------------------------------------------
   VIEWPORT SETTINGS
------------------------------------------- */
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ------------------------------------------
   1️⃣ METADATA — SEO & Autocomplete Engine
------------------------------------------- */
const BASE_URL = "https://sortstory.adnan-mangaonkar.com";
const FULL_NAME = "Adnan Shafiq Mangaonkar";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SortStory | Interactive Algorithm Visualizer — Sorting, Pathfinding & DSA",
    template: `%s | SortStory`,
  },
  description:
    "SortStory is a free interactive DSA visualization platform. Visualize 16 sorting algorithms (Bubble, Merge, Quick, Heap, Radix), race Dijkstra vs A* pathfinding, generate mazes with Recursive Backtracking and Prim's. Built by Adnan Shafiq Mangaonkar.",

  // 🟢 KEYWORDS: Expanded for maximum long-tail coverage
  keywords: [
    // Primary intent keywords
    "sorting visualizer",
    "algorithm visualizer",
    "pathfinding visualizer",
    "DSA visualizer",
    "data structures and algorithms",
    // Algorithm-specific (high search volume)
    "bubble sort visualizer",
    "merge sort visualizer",
    "quick sort visualizer",
    "heap sort visualizer",
    "insertion sort visualizer",
    "selection sort visualizer",
    "radix sort visualizer",
    "dijkstra algorithm visualizer",
    "a star algorithm visualizer",
    // Feature keywords
    "sorting algorithm comparison",
    "sort algorithm race mode",
    "maze generator online",
    "maze generation visualizer",
    "interactive sorting",
    "learn algorithms visually",
    "sorting animation online",
    "algorithm visualization tool",
    // Brand / personal
    "Adnan Mangaonkar",
    "Adnan Shafiq Mangaonkar",
    "SortStory",
    // Educational intent
    "learn sorting algorithms",
    "sorting algorithms explained",
    "how does bubble sort work",
    "dijkstra vs a star",
    "sorting algorithms for beginners",
  ],

  authors: [{ name: FULL_NAME, url: "https://adnan-mangaonkar.com" }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  category: "Education",
  classification: "Algorithm Visualization Tool",

  // 🟢 ROBOTS
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 🟢 ICONS — complete set
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180" }],
  },

  // 🟢 MANIFEST
  manifest: "/assets/site.webmanifest",

  // 🟢 SOCIAL CARDS — OpenGraph
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "SortStory | Interactive Algorithm Visualizer — Sorting, Pathfinding & DSA",
    description:
      "Visualize 16 sorting algorithms, race Dijkstra vs A*, generate mazes. Free interactive DSA learning tool.",
    siteName: "SortStory",
    images: [
      {
        url: "/assets/sortviz.png",
        width: 1200,
        height: 630,
        alt: "SortStory — Interactive Algorithm Visualizer with Sorting Bars and Pathfinding Grid",
      },
    ],
    locale: "en_US",
  },

  // 🟢 SOCIAL CARDS — Twitter
  twitter: {
    card: "summary_large_image",
    title: "SortStory | Interactive Algorithm Visualizer",
    description:
      "Master sorting & pathfinding algorithms visually. 16 sorting algorithms, Dijkstra vs A* race mode, maze generation. Free & open.",
    images: ["/assets/sortviz.png"],
    creator: "@V350NM",
    site: "@V350NM",
  },

  // 🟢 CANONICAL + ALTERNATES
  alternates: {
    canonical: BASE_URL,
  },

  // 🟢 VERIFICATION
  // Uncomment and add your verification codes when available:
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  //   yandex: "YOUR_YANDEX_VERIFICATION_CODE",
  // },

  // 🟢 OTHER META
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#000000",
  },
};

/* ------------------------------------------
   2️⃣ JSON-LD — Rich Structured Data
   Multiple schema types for maximum visibility:
   - Organization (brand entity establishment)
   - WebApplication (Google's app carousel)
   - Course (learning module)
   - Person (Knowledge Panel for author)
   - BreadcrumbList (rich navigation in SERPs — all routes)
   - FAQPage (FAQ rich results)
   - ItemList (algorithm listing across all categories)
------------------------------------------- */
const jsonLd = [
  // Organization schema (subdomain brand entity)
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "SortStory",
    url: BASE_URL,
    logo: `${BASE_URL}/assets/favicon-32x32.png`,
    description:
      "SortStory is a free, interactive Data Structures and Algorithms visualization platform. Explore sorting, searching, pathfinding, graphs, trees, linked lists, and automata algorithms with real-time animations.",
    founder: {
      "@type": "Person",
      "@id": "https://adnan-mangaonkar.com/#person",
      name: "Adnan Shafiq Mangaonkar",
    },
    sameAs: [
      "https://github.com/v500nm",
      "https://x.com/V350NM",
      "https://adnan-mangaonkar.com"
    ],
  },
  // WebApplication schema
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${BASE_URL}/#webapp`,
    name: "SortStory",
    url: BASE_URL,
    description:
      "An interactive visualization platform for Data Structures and Algorithms. Supports 16+ sorting algorithms, searching, pathfinding (Dijkstra, A*), graphs (BFS, DFS), trees (BST), linked lists, cellular automata, and maze generation.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "16+ Sorting Algorithm Visualizations",
      "Linear & Binary Search Visualizations",
      "Dijkstra's Algorithm Pathfinding",
      "A* Search Algorithm Pathfinding",
      "Algorithm Race Mode (side-by-side comparison)",
      "Maze Generation (Recursive Backtracking, Prim's)",
      "Graph Traversals (BFS, DFS)",
      "Binary Search Tree Operations & Traversals",
      "Linked List Operations (Singly, Doubly, Floyd's Cycle)",
      "Conway's Game of Life Cellular Automaton",
      "K-Means Clustering ML Visualization",
      "Multi-Language Code Examples (Python, JS, Java, C++, C)",
      "Interactive Learning Curriculum with Practice Problems",
    ],
    screenshot: {
      "@type": "ImageObject",
      url: `${BASE_URL}/assets/sortviz.png`,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      "@id": "https://adnan-mangaonkar.com/#person",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "50",
      bestRating: "5",
    },
  },
  // Course schema (learning module)
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${BASE_URL}/learn#course`,
    name: "Learn Data Structures & Algorithms — Interactive DSA Curriculum",
    description:
      "A free, structured curriculum covering Searching, Sorting, Linked Lists, Trees, Graphs, Pathfinding, and Automata. Includes step-by-step lessons with code in Python, JavaScript, Java, C++, and C, plus practice problems.",
    url: `${BASE_URL}/learn`,
    provider: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
    },
    instructor: {
      "@type": "Person",
      "@id": "https://adnan-mangaonkar.com/#person",
      name: "Adnan Shafiq Mangaonkar",
    },
    educationalLevel: "Beginner to Advanced",
    programmingLanguage: ["Python", "JavaScript", "Java", "C++", "C"],
    isAccessibleForFree: true,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT20H",
    },
    about: [
      { "@type": "Thing", name: "Data Structures" },
      { "@type": "Thing", name: "Algorithms" },
      { "@type": "Thing", name: "Sorting Algorithms" },
      { "@type": "Thing", name: "Graph Algorithms" },
      { "@type": "Thing", name: "Tree Data Structures" },
    ],
  },
  // Person schema (Knowledge Panel)
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://adnan-mangaonkar.com/#person",
    name: "Adnan Shafiq Mangaonkar",
    url: "https://adnan-mangaonkar.com",
    jobTitle: "Software Developer (SDE1)",
    knowsAbout: [
      "Data Structures and Algorithms",
      "React.js",
      "Next.js",
      "TypeScript",
      "MERN Stack",
      "Algorithm Visualization",
    ],
    sameAs: [
      "https://www.linkedin.com/in/adnan-mangaonkar/",
      "https://github.com/v500nm",
      "https://x.com/V350NM",
      "https://adnan-mangaonkar.com"
    ],
  },
  // BreadcrumbList schema — all major routes
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Learn & Practice", item: `${BASE_URL}/learn` },
      { "@type": "ListItem", position: 3, name: "Sorting Visualizer", item: `${BASE_URL}/sort` },
      { "@type": "ListItem", position: 4, name: "Search Visualizer", item: `${BASE_URL}/search` },
      { "@type": "ListItem", position: 5, name: "Pathfinding Visualizer", item: `${BASE_URL}/pathfinding` },
      { "@type": "ListItem", position: 6, name: "Linked Lists", item: `${BASE_URL}/linked-lists` },
      { "@type": "ListItem", position: 7, name: "Trees (BST)", item: `${BASE_URL}/trees` },
      { "@type": "ListItem", position: 8, name: "Graphs", item: `${BASE_URL}/graphs` },
      { "@type": "ListItem", position: 9, name: "Automata & ML", item: `${BASE_URL}/automata` },
      { "@type": "ListItem", position: 10, name: "FAQ", item: `${BASE_URL}/faq` },
    ],
  },
  // FAQPage schema — comprehensive DSA & algorithm questions for rich results
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      // ── Core DSA Concept Questions ──
      {
        "@type": "Question",
        name: "What is DSA (Data Structures and Algorithms)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DSA stands for Data Structures and Algorithms. Data structures are ways of organizing and storing data (like arrays, linked lists, trees, and graphs), while algorithms are step-by-step procedures for solving problems using those structures (like sorting, searching, and pathfinding). DSA is the foundation of computer science and is essential for writing efficient software and acing technical interviews.",
        },
      },
      {
        "@type": "Question",
        name: "What is an algorithm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An algorithm is a clear, step-by-step set of instructions or rules used to solve a problem, do a calculation, or finish a task. You can think of it like a recipe for cooking food or directions for finding a location. In computer science, algorithms are used to process data, make decisions, and automate tasks efficiently.",
        },
      },
      {
        "@type": "Question",
        name: "What are the most important data structures to learn?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most important data structures to learn are: Arrays, Linked Lists (Singly & Doubly), Stacks, Queues, Hash Tables/Maps, Binary Trees, Binary Search Trees (BST), Heaps, Graphs, and Tries. SortStory provides interactive visualizations for Linked Lists, Trees, Graphs, and more to help you understand how these structures work in practice.",
        },
      },
      {
        "@type": "Question",
        name: "Can I learn DSA on my own?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! DSA is one of the most self-teachable topics in computer science. Start with basic data structures (arrays, linked lists), learn fundamental algorithms (sorting, searching), then progress to trees, graphs, and dynamic programming. Tools like SortStory at sortstory.adnan-mangaonkar.com let you visualize algorithms in real-time, which makes self-learning much more intuitive.",
        },
      },
      {
        "@type": "Question",
        name: "Is Python good for learning DSA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Python is excellent for learning DSA due to its clean, readable syntax. It lets you focus on algorithmic logic rather than language complexity. However, it's beneficial to also learn implementations in C++ or Java for competitive programming. SortStory provides code examples in Python, JavaScript, Java, C++, and C for every algorithm.",
        },
      },
      {
        "@type": "Question",
        name: "Is C++ or Java better for DSA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both are excellent for DSA. C++ is slightly faster and preferred in competitive programming due to its STL (Standard Template Library). Java offers strong OOP concepts and built-in data structures through its Collections framework. For learning concepts, choose whichever language you're most comfortable with — the algorithmic logic is the same regardless of language.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to learn DSA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "With consistent daily practice of 1-2 hours, most learners can cover core DSA topics in 3-6 months. This includes arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, and basic dynamic programming. Visual tools like SortStory can significantly speed up understanding by showing how algorithms work step-by-step in real-time.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between BFS and DFS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BFS (Breadth-First Search) explores a graph level by level, visiting all neighbors before moving deeper. It uses a queue and finds the shortest path in unweighted graphs. DFS (Depth-First Search) explores as deep as possible along each branch before backtracking. It uses a stack (or recursion). BFS is better for shortest paths; DFS is better for topological sorting and cycle detection. Visualize both on SortStory's interactive graph module.",
        },
      },
      {
        "@type": "Question",
        name: "What is a Binary Search Tree (BST)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Binary Search Tree is a tree data structure where each node has at most two children. For every node, all values in its left subtree are smaller, and all values in the right subtree are larger. This property enables efficient O(log n) search, insertion, and deletion operations. SortStory lets you interactively insert, delete, and search nodes in a BST while visualizing Pre-order, In-order, and Post-order traversals.",
        },
      },
      {
        "@type": "Question",
        name: "What is the time complexity of Bubble Sort?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bubble Sort has a time complexity of O(n²) in the average and worst cases, and O(n) in the best case (when the array is already sorted with an optimized version). Its space complexity is O(1) as it sorts in-place. While simple to understand, it's inefficient for large datasets — algorithms like Merge Sort O(n log n) and Quick Sort O(n log n average) are much faster.",
        },
      },
      {
        "@type": "Question",
        name: "What is the fastest sorting algorithm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The fastest general-purpose sorting algorithms are Merge Sort, Quick Sort, and Heap Sort, all with O(n log n) average time complexity. Quick Sort is typically fastest in practice due to cache locality. For specific data types, Radix Sort can achieve O(nk) time. Tim Sort (used in Python and Java) combines Merge Sort and Insertion Sort for optimal real-world performance. Compare all of these visually on SortStory.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Merge Sort and Quick Sort?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Merge Sort divides the array in half, recursively sorts each half, and merges them — it's stable and always O(n log n) but requires O(n) extra space. Quick Sort picks a pivot, partitions elements around it, and recursively sorts partitions — it's O(n log n) on average but O(n²) in the worst case. Quick Sort is faster in practice but unstable. Race them side-by-side on SortStory.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Dijkstra and A*?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dijkstra's algorithm explores all directions uniformly and guarantees the shortest path in weighted graphs with O(V²) or O(E log V) time complexity. A* adds a heuristic function (like Manhattan distance) to guide exploration toward the target, making it significantly faster in practice while still guaranteeing optimal paths. You can race Dijkstra vs A* side-by-side on SortStory's pathfinding visualizer.",
        },
      },
      {
        "@type": "Question",
        name: "What is a linked list and why is it useful?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A linked list is a linear data structure where elements (nodes) are connected via pointers. Each node stores data and a reference to the next node. Unlike arrays, linked lists allow O(1) insertion and deletion at known positions without shifting elements. They come in Singly Linked (one direction), Doubly Linked (both directions), and Circular variants. SortStory lets you visualize insertions, deletions, and even Floyd's Cycle Detection.",
        },
      },
      // ── Sorting-specific questions ──
      {
        "@type": "Question",
        name: "What sorting algorithms does SortStory support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SortStory supports 16+ sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Shell Sort, Cocktail Sort, Comb Sort, Gnome Sort, Odd-Even Sort, Pancake Sort, Bitonic Sort, Radix Sort, Stooge Sort, Bogo Sort, Tim Sort, and Intro Sort. Each can be visualized in real-time with comparison and swap counters.",
        },
      },
      {
        "@type": "Question",
        name: "Which sorting algorithm is best for nearly sorted data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Insertion Sort is the best choice for nearly sorted (almost sorted) data, achieving O(n) time complexity in the best case. Tim Sort, which is used by Python and Java internally, is also optimized for partially sorted data by detecting and merging natural runs. Shell Sort is another good option as it reduces inversions efficiently.",
        },
      },
      {
        "@type": "Question",
        name: "What is Heap Sort and how does it work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Heap Sort works by building a max-heap from the input array, then repeatedly extracting the maximum element and placing it at the end. It has O(n log n) time complexity in all cases and O(1) space complexity, making it an in-place, non-recursive alternative to Merge Sort. However, it's not stable. Visualize the heap-building and extraction process step-by-step on SortStory.",
        },
      },
      {
        "@type": "Question",
        name: "What is Radix Sort?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Radix Sort is a non-comparison-based sorting algorithm that sorts integers digit by digit, from the least significant to the most significant digit (LSD Radix Sort). It uses counting sort as a subroutine and achieves O(nk) time complexity, where k is the number of digits. It's extremely fast for sorting large sets of integers with a fixed number of digits.",
        },
      },
      // ── Pathfinding & Maze questions ──
      {
        "@type": "Question",
        name: "Can I generate mazes to test pathfinding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! SortStory includes two maze generation algorithms: Recursive Backtracking (DFS-based, creates long winding corridors) and Prim's Algorithm (creates organic, highly-branching mazes). You can also control obstacle density with a slider and then run Dijkstra or A* to find the shortest path through the generated maze.",
        },
      },
      {
        "@type": "Question",
        name: "What is the shortest path algorithm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most common shortest path algorithms are: Dijkstra's Algorithm (for weighted graphs with non-negative edges), A* Search (Dijkstra + heuristic for faster targeted search), Bellman-Ford (handles negative weights), and BFS (for unweighted graphs). SortStory lets you visualize Dijkstra and A* on interactive grids and race them side-by-side.",
        },
      },
      // ── Graph & Tree questions ──
      {
        "@type": "Question",
        name: "What graph algorithms can I visualize?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SortStory supports Breadth-First Search (BFS) and Depth-First Search (DFS) on interactive graph networks. You can build custom node-edge networks by clicking to add nodes and dragging to create edges, then watch traversal algorithms explore them in real-time with color-coded visited/current/unvisited states.",
        },
      },
      {
        "@type": "Question",
        name: "What are tree traversal methods?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The three main depth-first tree traversal methods are: Pre-order (Root → Left → Right), In-order (Left → Root → Right, gives sorted order for BSTs), and Post-order (Left → Right → Root). There's also Level-order traversal (BFS-based, visits nodes level by level). SortStory visualizes all three DFS traversals on interactive Binary Search Trees.",
        },
      },
      // ── Learning & Career questions ──
      {
        "@type": "Question",
        name: "Does SortStory have a learning curriculum?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! SortStory includes a full structured DSA curriculum at sortstory.adnan-mangaonkar.com/learn. Each algorithm has step-by-step lessons, code implementations in 5 programming languages (Python, JavaScript, Java, C++, and C), and practice problems. Topics span Searching, Sorting, Linked Lists, Trees, Graphs, Pathfinding, and Automata.",
        },
      },
      {
        "@type": "Question",
        name: "Is SortStory free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, SortStory is completely free and open. No login, no signup, no payment required. Just visit sortstory.adnan-mangaonkar.com and start visualizing algorithms instantly. All 16+ sorting algorithms, pathfinding, graphs, trees, linked lists, and the full learning curriculum are accessible for free.",
        },
      },
      {
        "@type": "Question",
        name: "Why is DSA important for coding interviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DSA is the cornerstone of technical interviews at major tech companies (Google, Amazon, Meta, Microsoft, etc.). Interviewers test your ability to choose appropriate data structures, design efficient algorithms, and analyze time/space complexity. Strong DSA skills demonstrate problem-solving ability and software engineering fundamentals. Practicing with visual tools like SortStory helps build deep intuition.",
        },
      },
      {
        "@type": "Question",
        name: "What is time complexity and Big O notation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Time complexity measures how an algorithm's runtime grows as input size increases. Big O notation describes this growth rate: O(1) is constant time, O(log n) is logarithmic, O(n) is linear, O(n log n) is linearithmic, O(n²) is quadratic, and O(2^n) is exponential. For example, Binary Search is O(log n) while Bubble Sort is O(n²). Understanding Big O helps you choose the most efficient algorithm for your problem.",
        },
      },
      {
        "@type": "Question",
        name: "What is space complexity?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Space complexity measures the total amount of memory an algorithm needs relative to input size. It includes the input itself and any auxiliary space used. For example, Merge Sort uses O(n) extra space for merging, while Heap Sort uses O(1) extra space (in-place). Understanding space complexity helps you make trade-offs between speed and memory usage.",
        },
      },
      {
        "@type": "Question",
        name: "Can I master DSA in 3 months?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, with dedicated daily practice of 2-3 hours, you can cover core DSA topics in 3 months. Focus on: Week 1-4: Arrays, Strings, Sorting, Searching. Week 5-8: Linked Lists, Stacks, Queues, Trees. Week 9-12: Graphs, Dynamic Programming, Greedy algorithms. Use visual tools like SortStory to build intuition quickly, and practice problems on platforms like LeetCode alongside.",
        },
      },
      {
        "@type": "Question",
        name: "What is a stable sorting algorithm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A stable sorting algorithm preserves the relative order of equal elements. For example, if two items have the same key, they appear in the same order in the sorted output as they did in the input. Merge Sort, Insertion Sort, Bubble Sort, and Tim Sort are stable. Quick Sort, Heap Sort, and Selection Sort are not stable. Stability matters when sorting by multiple keys.",
        },
      },
      {
        "@type": "Question",
        name: "What is an in-place sorting algorithm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An in-place sorting algorithm sorts the data using only a constant amount of extra memory O(1), modifying the original array directly. Examples include Bubble Sort, Selection Sort, Insertion Sort, Heap Sort, and Quick Sort. Merge Sort is NOT in-place as it requires O(n) auxiliary space. In-place algorithms are memory-efficient but may sacrifice stability.",
        },
      },
      // ── Creator & Brand Questions ──
      {
        "@type": "Question",
        name: "Who created SortStory?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SortStory was created by Adnan Shafiq Mangaonkar, a Software Developer (SDE1) passionate about Data Structures and Algorithms, React.js, and creating interactive educational tools.",
        },
      },
      {
        "@type": "Question",
        name: "Who is Adnan Mangaonkar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Adnan Mangaonkar is a Software Developer (SDE1) specializing in front-end development, React.js, Next.js, and TypeScript. He is the creator of SortStory, an interactive algorithm visualization platform designed to help students learn DSA.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Adnan Mangaonkar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Adnan Mangaonkar through his personal website at adnan-mangaonkar.com, via his LinkedIn profile, or through his GitHub profile (v500nm).",
        },
      }
    ],
  },
  // ItemList schema — all DSA categories
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DSA Visualization Modules",
    description: "Interactive visualization modules across 7 computational domains",
    numberOfItems: 7,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Sorting Algorithms", url: `${BASE_URL}/sort` },
      { "@type": "ListItem", position: 2, name: "Search Algorithms", url: `${BASE_URL}/search` },
      { "@type": "ListItem", position: 3, name: "Pathfinding Algorithms", url: `${BASE_URL}/pathfinding` },
      { "@type": "ListItem", position: 4, name: "Linked List Operations", url: `${BASE_URL}/linked-lists` },
      { "@type": "ListItem", position: 5, name: "Binary Search Trees", url: `${BASE_URL}/trees` },
      { "@type": "ListItem", position: 6, name: "Graph Traversals", url: `${BASE_URL}/graphs` },
      { "@type": "ListItem", position: 7, name: "Automata & Machine Learning", url: `${BASE_URL}/automata` },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://adnan-mangaonkar.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-screen">
        <ScrollProgress />
        <CursorGlow />
        <PostHogProvider>
          <LanguageProvider>
            <SiteAnalyticsWrapper>
              <AuthProvider>
                <SecurityWrapper>
                  {children}
                  <Footer />
                  <AnalyticsBanner />
                </SecurityWrapper>
              </AuthProvider>
            </SiteAnalyticsWrapper>
          </LanguageProvider>
        </PostHogProvider>

        {/* Google Sitelinks & SearchBox JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SortStory",
              "alternateName": "SortStory Visualizer",
              "url": "https://sortstory.adnan-mangaonkar.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://sortstory.adnan-mangaonkar.com/sort?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* SiteNavigationElement JSON-LD for Google Sitelinks Expansion */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "SiteNavigationElement",
                  "position": 1,
                  "name": "DSA Learning Curriculum",
                  "description": "Comprehensive interactive data structures and algorithms learning modules.",
                  "url": "https://sortstory.adnan-mangaonkar.com/learn"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 2,
                  "name": "Sorting Algorithm Visualizer",
                  "description": "Interactive step-by-step sorting algorithms visualizer and race comparisons.",
                  "url": "https://sortstory.adnan-mangaonkar.com/sort"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 3,
                  "name": "Pathfinding Grid Visualizer",
                  "description": "Dijkstra and A* pathfinding algorithm grid simulations.",
                  "url": "https://sortstory.adnan-mangaonkar.com/pathfinding"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 4,
                  "name": "Research & Benchmark Studies",
                  "description": "Empirical time complexity benchmarks and algorithm performance papers.",
                  "url": "https://sortstory.adnan-mangaonkar.com/research"
                }
              ]
            })
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QT4D4VQ0TT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QT4D4VQ0TT');
          `}
        </Script>
      </body>
    </html>
  );
}
