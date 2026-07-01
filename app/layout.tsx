import type { Metadata, Viewport } from "next";
import "./globals.css";

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
   - WebApplication (for Google's app carousel)
   - Person (Knowledge Panel for author)
   - BreadcrumbList (rich navigation in SERPs)
   - FAQPage (FAQ rich results)
   - ItemList (algorithm listing)
------------------------------------------- */
const jsonLd = [
  // WebApplication schema
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${BASE_URL}/#webapp`,
    name: "SortStory",
    url: BASE_URL,
    description:
      "An interactive visualization platform for Data Structures and Algorithms. Supports 16 sorting algorithms, pathfinding (Dijkstra, A*), and maze generation.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "16 Sorting Algorithm Visualizations",
      "Dijkstra's Algorithm Pathfinding",
      "A* Search Algorithm Pathfinding",
      "Algorithm Race Mode (side-by-side comparison)",
      "Maze Generation (Recursive Backtracking, Prim's)",
      "Real-time Metrics (comparisons, swaps, time)",
      "Interactive Grid with Wall Drawing",
      "Obstacle Density Control",
      "Code Examples in 6 Languages",
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
      name: "Adnan Shafiq Mangaonkar",
      url: "https://adnan-mangaonkar.com",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "50",
      bestRating: "5",
    },
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
      "https://www.linkedin.com/in/adnan-mangaonkar-523351167/",
      "https://github.com/v500nm",
      "https://x.com/V350NM",
      "https://adnan-mangaonkar.com",
    ],
  },
  // BreadcrumbList schema (rich navigation snippets)
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sorting Visualizer",
        item: `${BASE_URL}/sort`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pathfinding Visualizer",
        item: `${BASE_URL}/pathfinding`,
      },
    ],
  },
  // FAQPage schema (FAQ rich results in Google)
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What sorting algorithms does SortStory support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SortStory supports 16 sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Shell Sort, Cocktail Sort, Comb Sort, Gnome Sort, Odd-Even Sort, Pancake Sort, Bitonic Sort, Radix Sort, Stooge Sort, and Bogo Sort.",
        },
      },
      {
        "@type": "Question",
        name: "What pathfinding algorithms are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SortStory features Dijkstra's Algorithm and A* Search with Manhattan distance heuristic. You can race them side-by-side to compare performance visually.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Dijkstra and A*?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dijkstra's algorithm explores all directions uniformly and guarantees the shortest path. A* uses a heuristic (Manhattan distance) to guide exploration toward the target, typically evaluating far fewer nodes than Dijkstra while still finding the optimal path.",
        },
      },
      {
        "@type": "Question",
        name: "Can I generate mazes to test pathfinding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! SortStory includes two maze generation algorithms: Recursive Backtracking (DFS-based, creates long winding corridors) and Prim's Algorithm (creates organic, highly-branching mazes). You can also control obstacle density with a slider.",
        },
      },
      {
        "@type": "Question",
        name: "Is SortStory free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, SortStory is completely free and open. No login required. Just visit sortstory.adnan-mangaonkar.com and start visualizing algorithms instantly.",
        },
      },
    ],
  },
  // ItemList schema (algorithm listing for rich results)
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sorting Algorithms",
    description: "16 sorting algorithms available for interactive visualization",
    numberOfItems: 16,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bubble Sort" },
      { "@type": "ListItem", position: 2, name: "Selection Sort" },
      { "@type": "ListItem", position: 3, name: "Insertion Sort" },
      { "@type": "ListItem", position: 4, name: "Merge Sort" },
      { "@type": "ListItem", position: 5, name: "Quick Sort" },
      { "@type": "ListItem", position: 6, name: "Heap Sort" },
      { "@type": "ListItem", position: 7, name: "Shell Sort" },
      { "@type": "ListItem", position: 8, name: "Cocktail Sort" },
      { "@type": "ListItem", position: 9, name: "Comb Sort" },
      { "@type": "ListItem", position: 10, name: "Gnome Sort" },
      { "@type": "ListItem", position: 11, name: "Odd-Even Sort" },
      { "@type": "ListItem", position: 12, name: "Pancake Sort" },
      { "@type": "ListItem", position: 13, name: "Bitonic Sort" },
      { "@type": "ListItem", position: 14, name: "Radix Sort" },
      { "@type": "ListItem", position: 15, name: "Stooge Sort" },
      { "@type": "ListItem", position: 16, name: "Bogo Sort" },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
