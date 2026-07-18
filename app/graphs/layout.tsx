import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graph Algorithms Visualizer — SortStory",
  description:
    "Traverse custom networks using Breadth-First Search (BFS) and Depth-First Search (DFS). Understand topological exploration and state tracking. Free online DSA learning tool.",
  keywords: [
    "graph visualizer",
    "graph algorithms visualizer",
    "BFS visualizer",
    "DFS visualizer",
    "breadth-first search visualizer",
    "depth-first search visualizer",
    "graph traversal",
    "topological exploration",
    "DSA visualizer",
  ],
  openGraph: {
    title: "Graph Algorithms Visualizer — SortStory",
    description:
      "Visualize Breadth-First and Depth-First Search algorithms on custom networks.",
    url: "https://sortstory.adnan-mangaonkar.com/graphs",
    type: "website",
    images: [
      {
        url: "/assets/sortviz.png",
        width: 1200,
        height: 630,
        alt: "SortStory Graphs Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Graph Algorithms Visualizer — SortStory",
    description:
      "Visualize BFS and DFS graph traversals step-by-step.",
    images: ["/assets/sortviz.png"],
  },
  alternates: {
    canonical: "https://sortstory.adnan-mangaonkar.com/graphs",
  },
};

export default function GraphsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
