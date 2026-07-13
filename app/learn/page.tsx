import React from 'react';
import Link from 'next/link';
import { getAllTopics, getAlgorithmsByTopic } from '@/lib/markdown';
import { formatAlgoName } from '@/lib/utils';

export default function LearnPage() {
  const topics = getAllTopics();
  
  return (
    <div className="w-full max-w-[1200px] mx-auto p-8 overflow-y-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight text-brand-text-primary mb-4">Learn & Practice</h1>
        <p className="text-brand-text-secondary text-lg max-w-2xl">
          Deep dive into data structures and algorithms. Toggle between languages, study step-by-step logic, and solidify your understanding with practice problems.
        </p>
      </div>

      <div className="space-y-12">
        {topics.map(topic => {
          const algos = getAlgorithmsByTopic(topic);
          if (algos.length === 0) return null;
          
          return (
            <div key={topic} className="space-y-4">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-brand-cyan border-b border-brand-border pb-2 capitalize">
                {topic.replace('-', ' ')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {algos.map(algo => (
                  <Link 
                    key={algo} 
                    href={`/learn/${topic}/${algo}`}
                    className="glass-card p-6 block hover:border-brand-purple/50 transition-colors group"
                  >
                    <h3 className="text-lg font-bold text-brand-text-primary mb-2 capitalize group-hover:text-brand-purple transition-colors">
                      {formatAlgoName(algo)}
                    </h3>
                    <p className="text-sm text-brand-text-secondary">
                      Master this algorithm step-by-step.
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {topics.length === 0 && (
        <div className="text-brand-text-secondary p-8 text-center glass-card border-dashed">
          No learning modules found. Create folders in `md_files/` to get started.
        </div>
      )}
    </div>
  );
}
