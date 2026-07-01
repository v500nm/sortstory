import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pathfinding Visualizer — Dijkstra vs A* | Maze Generation",
  description:
    "Interactive pathfinding visualizer: Dijkstra's Algorithm vs A* Search side-by-side race mode. Generate mazes with Recursive Backtracking and Prim's Algorithm. Control obstacle density, watch algorithms explore in real-time. Free online tool by Adnan Mangaonkar.",
  keywords: [
    "pathfinding visualizer",
    "dijkstra visualizer",
    "a star visualizer",
    "A* algorithm visualizer",
    "dijkstra vs a star",
    "maze generator visualizer",
    "maze generation algorithm",
    "recursive backtracking maze",
    "prims maze algorithm",
    "shortest path visualizer",
    "graph algorithm visualizer",
    "pathfinding algorithm comparison",
    "interactive pathfinding",
    "DSA pathfinding tool",
    "grid pathfinding",
    "algorithm visualization",
  ],
  openGraph: {
    title: "Pathfinding Visualizer — Dijkstra vs A* | SortStory",
    description:
      "Race Dijkstra vs A* side-by-side. Generate mazes with Recursive Backtracking and Prim's. Watch algorithms explore grids in real-time.",
    url: "https://sortstory.adnan-mangaonkar.com/pathfinding",
    type: "website",
    images: [
      {
        url: "/assets/sortviz.png",
        width: 1200,
        height: 630,
        alt: "SortStory Pathfinding Visualizer — Dijkstra vs A* race mode",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pathfinding Visualizer — Dijkstra vs A* | SortStory",
    description:
      "Race Dijkstra vs A* side-by-side. Generate mazes and control obstacle density. Interactive DSA learning.",
    images: ["/assets/sortviz.png"],
  },
  alternates: {
    canonical: "https://sortstory.adnan-mangaonkar.com/pathfinding",
  },
};

export default function PathfindingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
