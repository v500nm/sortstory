import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automata & ML Visualizer — SortStory",
  description:
    "Explore Cellular Automata via Conway's Game of Life, and visualize iterative Machine Learning with K-Means Clustering. Interactive DSA learning tool.",
  keywords: [
    "cellular automata visualizer",
    "conways game of life",
    "k-means clustering visualizer",
    "machine learning visualizer",
    "automata algorithm visualizer",
    "interactive ML algorithms",
    "DSA visualizer",
  ],
  openGraph: {
    title: "Automata & ML Visualizer — SortStory",
    description:
      "Visualize Cellular Automata and K-Means Clustering algorithms in real-time.",
    url: "https://sortstory.adnan-mangaonkar.com/automata",
    type: "website",
    images: [
      {
        url: "/assets/sortviz.png",
        width: 1200,
        height: 630,
        alt: "SortStory Automata Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automata & ML Visualizer — SortStory",
    description:
      "Explore Conway's Game of Life and K-Means Clustering visually.",
    images: ["/assets/sortviz.png"],
  },
  alternates: {
    canonical: "https://sortstory.adnan-mangaonkar.com/automata",
  },
};

export default function AutomataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
