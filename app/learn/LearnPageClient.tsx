"use client";

import React from 'react';
import Link from 'next/link';
import { formatAlgoName } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LearnPageClientProps {
  topics: {
    topic: string;
    algos: string[];
  }[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function LearnPageClient({ topics }: LearnPageClientProps) {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-6 sm:px-6 sm:py-8 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 sm:mb-8 md:mb-12"
      >
        <h1 className="text-4xl font-black tracking-tight text-brand-text-primary mb-4">Learn & Practice</h1>
        <p className="text-brand-text-secondary text-lg max-w-2xl">
          Deep dive into data structures and algorithms. Toggle between languages, study step-by-step logic, and solidify your understanding with practice problems.
        </p>
      </motion.div>

      <div className="space-y-12">
        {topics.map(({ topic, algos }) => {
          if (algos.length === 0) return null;
          
          return (
            <motion.div
              key={topic}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold uppercase tracking-wider text-brand-cyan border-b border-brand-border pb-2 capitalize">
                {topic.replace('-', ' ')}
              </h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {algos.map(algo => (
                  <motion.div key={algo} variants={cardVariants}>
                    <Link 
                      href={`/learn/${topic}/${algo}`}
                      className="glass-card p-6 block hover:border-brand-purple/50 transition-all group hover:-translate-y-1 duration-200"
                    >
                      <h3 className="text-lg font-bold text-brand-text-primary mb-2 capitalize group-hover:text-brand-purple transition-colors">
                        {formatAlgoName(algo)}
                      </h3>
                      <p className="text-sm text-brand-text-secondary">
                        Master this algorithm step-by-step.
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
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
