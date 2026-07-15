import type { Metadata } from 'next';

const BASE_URL = 'https://sortstory.adnan-mangaonkar.com';

export const metadata: Metadata = {
  title: 'Graph Algorithm Visualizer — BFS & DFS Traversal Animation',
  description:
    'Interactive graph algorithm visualizer. Build custom networks, then watch Breadth-First Search (BFS) and Depth-First Search (DFS) traverse nodes in real-time. Understand topological exploration, visited states, and adjacency tracking.',
  keywords: [
    'graph visualizer',
    'BFS visualizer',
    'DFS visualizer',
    'breadth first search animation',
    'depth first search animation',
    'graph traversal visualizer',
    'graph algorithm tool',
    'adjacency list visualizer',
    'network traversal animation',
    'DSA graph tool',
  ],
  openGraph: {
    title: 'Graph Algorithm Visualizer — BFS & DFS | SortStory',
    description:
      'Build custom graphs and watch BFS and DFS traverse nodes in real-time. Interactive graph algorithm tool.',
    url: `${BASE_URL}/graphs`,
    type: 'website',
    images: [{ url: '/assets/sortviz.png', width: 1200, height: 630, alt: 'SortStory Graph Algorithm Visualizer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graph Visualizer — BFS & DFS | SortStory',
    description: 'Build networks, run BFS and DFS, watch node exploration animated step-by-step.',
    images: ['/assets/sortviz.png'],
  },
  alternates: {
    canonical: `${BASE_URL}/graphs`,
  },
};

export default function GraphsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
