import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Data Structures & Algorithms Questions | SortStory",
  description:
    "Frequently asked questions about Data Structures and Algorithms (DSA). Learn about sorting algorithms, searching, pathfinding, graphs, trees, linked lists, time complexity, Big O notation, and more. Free interactive DSA learning platform.",
  keywords: [
    "DSA FAQ",
    "data structures and algorithms questions",
    "what is DSA",
    "what is an algorithm",
    "sorting algorithm FAQ",
    "BFS vs DFS",
    "time complexity explained",
    "Big O notation",
    "fastest sorting algorithm",
    "merge sort vs quick sort",
    "dijkstra vs a star",
    "binary search tree FAQ",
    "linked list explained",
    "learn DSA",
    "DSA interview questions",
    "DSA for beginners",
  ],
  openGraph: {
    title: "FAQ — Data Structures & Algorithms | SortStory",
    description:
      "Get answers to 30+ commonly asked DSA questions. Sorting, searching, graphs, trees, complexity analysis, and more.",
    url: "https://sortstory.adnan-mangaonkar.com/faq",
    type: "website",
  },
  alternates: {
    canonical: "https://sortstory.adnan-mangaonkar.com/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
