import type { Metadata } from 'next';

const BASE_URL = 'https://sortstory.adnan-mangaonkar.com';

export const metadata: Metadata = {
  title: 'Linked List Visualizer — Singly, Doubly, Reversal & Cycle Detection',
  description:
    "Interactive Linked List visualizer. Watch node insertion, deletion, and pointer updates in real-time. Reverse a linked list, detect cycles with Floyd's algorithm, and understand memory layout for Singly and Doubly Linked Lists.",
  keywords: [
    'linked list visualizer',
    'singly linked list visualizer',
    'doubly linked list visualizer',
    'reverse linked list animation',
    'floyd cycle detection visualizer',
    'linked list operations',
    'data structure visualizer',
    'linked list insert delete',
    'pointer visualization',
    'DSA linked list tool',
  ],
  openGraph: {
    title: 'Linked List Visualizer — Singly & Doubly | SortStory',
    description:
      "Watch pointers update in real-time. Reverse lists, detect cycles with Floyd's algorithm. Interactive DSA tool.",
    url: `${BASE_URL}/linked-lists`,
    type: 'website',
    images: [{ url: '/assets/sortviz.png', width: 1200, height: 630, alt: 'SortStory Linked List Visualizer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linked List Visualizer | SortStory',
    description: 'Singly & Doubly Linked Lists with reversal and cycle detection — visualized step-by-step.',
    images: ['/assets/sortviz.png'],
  },
  alternates: {
    canonical: `${BASE_URL}/linked-lists`,
  },
};

export default function LinkedListsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
