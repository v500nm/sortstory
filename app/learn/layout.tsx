import React from 'react';
import Header from '@/components/Header';
import { LanguageProvider } from '@/components/learn/LanguageContext';
import LearnSidebar from '@/components/learn/LearnSidebar';
import { getAllTopics, getAlgorithmsByTopic } from '@/lib/markdown';

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
