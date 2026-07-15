import type { Metadata } from 'next';

const BASE_URL = 'https://sortstory.adnan-mangaonkar.com';

export const metadata: Metadata = {
  title: 'Binary Search Tree Visualizer — Insert, Search & Traversal Animations',
  description:
    'Interactive BST visualizer. Insert nodes, search for values, and watch Pre-Order, In-Order, and Post-Order traversals animate step-by-step. Understand how hierarchical data is stored and accessed in Binary Search Trees.',
  keywords: [
    'binary search tree visualizer',
    'BST visualizer',
    'tree traversal visualizer',
    'inorder traversal animation',
    'preorder traversal animation',
    'postorder traversal animation',
    'tree data structure visualizer',
    'BST insert delete search',
    'binary tree animation',
    'DSA tree visualizer',
  ],
  openGraph: {
    title: 'Binary Search Tree Visualizer — Traversal Animations | SortStory',
    description:
      'Insert nodes and watch In-Order, Pre-Order, Post-Order traversals animate. Interactive BST visualization tool.',
    url: `${BASE_URL}/trees`,
    type: 'website',
    images: [{ url: '/assets/sortviz.png', width: 1200, height: 630, alt: 'SortStory BST Tree Visualizer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BST Visualizer | SortStory',
    description: 'Binary Search Tree insert, search, and 3 traversal modes — animated step-by-step.',
    images: ['/assets/sortviz.png'],
  },
  alternates: {
    canonical: `${BASE_URL}/trees`,
  },
};

export default function TreesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
