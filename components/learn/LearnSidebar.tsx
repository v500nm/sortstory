"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatAlgoName } from '@/lib/utils';

interface LearnSidebarProps {
  data: {
    topic: string;
    algos: string[];
  }[];
}

export default function LearnSidebar({ data }: LearnSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-brand-bg-card border-r border-brand-border overflow-y-auto h-full flex flex-col hidden md:flex">
      <div className="p-4 border-b border-brand-border sticky top-0 bg-brand-bg-card z-10">
        <h2 className="text-sm font-bold tracking-widest text-brand-text-secondary uppercase">
          Curriculum
        </h2>
      </div>
      <div className="p-4 space-y-6 flex-1">
        {data.map((category) => {
          // Deduplicate algorithms by their formatted display name to prevent cached duplicates
          const seen = new Set();
          const uniqueAlgos = category.algos.filter(algo => {
            const formatted = formatAlgoName(algo);
            if (seen.has(formatted)) return false;
            seen.add(formatted);
            return true;
          });

          return (
            <div key={category.topic} className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-2 capitalize">
                {category.topic.replace('-', ' ')}
              </h3>
              <ul className="space-y-1 pl-2 border-l border-brand-border-light">
                {uniqueAlgos.map(algo => {
                  const href = `/learn/${category.topic}/${algo}`;
                  const isActive = pathname.startsWith(href);
                  return (
                    <li key={algo}>
                      <Link
                        href={href}
                        className={`block py-1.5 px-3 rounded-md text-sm transition-colors capitalize ${
                          isActive
                            ? 'bg-brand-purple/20 text-brand-purple font-semibold border border-brand-purple/30'
                            : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-bg-light'
                        }`}
                      >
                        {formatAlgoName(algo)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
