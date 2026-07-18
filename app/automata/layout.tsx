import type { Metadata } from 'next';

const BASE_URL = 'https://sortstory.adnan-mangaonkar.com';

export const metadata: Metadata = {
  title: 'Automata & ML Visualizer — Conway\'s Game of Life & K-Means Clustering',
  description:
    'Interactive Cellular Automata and Machine Learning visualizer. Explore Conway\'s Game of Life with custom patterns, and watch K-Means Clustering iterate through centroid assignments in real-time. Understand emergent behavior and iterative optimization.',
  keywords: [
    'conway game of life visualizer',
    'cellular automata visualizer',
    'game of life simulation',
    'k-means clustering visualizer',
    'machine learning visualizer',
    'k-means animation',
    'cellular automata simulation',
    'automata theory visualizer',
    'iterative algorithm animation',
    'DSA automata tool',
  ],
  openGraph: {
    title: 'Automata & ML Visualizer — Game of Life & K-Means | SortStory',
    description:
      'Conway\'s Game of Life cellular automaton and K-Means Clustering ML algorithm — visualized interactively.',
    url: `${BASE_URL}/automata`,
    type: 'website',
    images: [{ url: '/assets/sortviz.png', width: 1200, height: 630, alt: 'SortStory Automata & ML Visualizer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automata & ML Visualizer | SortStory',
    description: 'Game of Life + K-Means Clustering — cellular automata and ML iterative algorithms visualized.',
    images: ['/assets/sortviz.png'],
  },
  alternates: {
    canonical: `${BASE_URL}/automata`,
  },
};

export default function AutomataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
