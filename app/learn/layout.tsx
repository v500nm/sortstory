import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { LanguageProvider } from '@/components/learn/LanguageContext';
import LearnSidebar from '@/components/learn/LearnSidebar';
import { getAllTopics, getAlgorithmsByTopic } from '@/lib/markdown';

const BASE_URL = 'https://sortstory.adnan-mangaonkar.com';

export const metadata: Metadata = {
  title: 'Learn DSA — Step-by-Step Algorithm Tutorials in Python, JS, Java, C++ & C',
  description:
    'Free structured DSA curriculum. Learn Data Structures and Algorithms step-by-step with interactive lessons, multi-language code examples (Python, JavaScript, Java, C++, C), and practice problems. Covers Sorting, Searching, Linked Lists, Trees, Graphs, Pathfinding, and Automata.',
  keywords: [
    'learn data structures and algorithms',
    'DSA tutorial',
    'algorithm tutorial',
    'learn sorting algorithms',
    'learn searching algorithms',
    'learn graphs',
    'learn linked lists',
    'DSA course free',
    'algorithm learning platform',
    'data structures course',
    'learn algorithms step by step',
    'coding interview preparation',
  ],
  openGraph: {
    title: 'Learn DSA — Interactive Algorithm Tutorials | SortStory',
    description:
      'Step-by-step algorithm lessons with code in Python, JS, Java, C++, and C. Free interactive DSA curriculum.',
    url: `${BASE_URL}/learn`,
    type: 'website',
    images: [{ url: '/assets/sortviz.png', width: 1200, height: 630, alt: 'SortStory Learn DSA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn DSA | SortStory',
    description: 'Structured algorithm curriculum in 5 languages. Free, interactive, step-by-step.',
    images: ['/assets/sortviz.png'],
  },
  alternates: {
    canonical: `${BASE_URL}/learn`,
  },
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const topics = getAllTopics();
  const sidebarData = topics.map(topic => ({
    topic,
    algos: getAlgorithmsByTopic(topic)
  })).filter(cat => cat.algos.length > 0);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-brand-bg-dark font-sans text-brand-text-primary">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <LearnSidebar data={sidebarData} />
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {children}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
