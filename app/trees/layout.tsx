import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trees Visualizer — SortStory",
  description:
    "Interact with Binary Search Trees (BST). Insert nodes, search for values, and run Pre-Order, In-Order, and Post-Order traversals visually.",
  keywords: [
    "binary search tree visualizer",
    "BST visualizer",
    "tree traversal visualizer",
    "pre-order traversal",
    "in-order traversal",
    "post-order traversal",
    "data structures visualizer",
    "DSA visualizer",
  ],
  openGraph: {
    title: "Trees Visualizer — SortStory",
    description:
      "Visualize Binary Search Trees and their traversals.",
    url: "https://sortstory.adnan-mangaonkar.com/trees",
    type: "website",
    images: [
      {
        url: "/assets/sortviz.png",
        width: 1200,
        height: 630,
        alt: "SortStory Trees Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trees Visualizer — SortStory",
    description:
      "Interact with BST insertions and traversals visually.",
    images: ["/assets/sortviz.png"],
  },
  alternates: {
    canonical: "https://sortstory.adnan-mangaonkar.com/trees",
  },
};

export default function TreesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
