"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatAlgoName } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface LearnSidebarProps {
  data: {
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

const categoryVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function LearnSidebar({ data }: LearnSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar when navigating
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-4 bg-brand-cyan text-brand-bg-dark rounded-full shadow-lg shadow-brand-cyan/20 flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open Curriculum"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 48 : 256 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`flex-shrink-0 bg-brand-bg-card border-r border-brand-border h-full flex flex-col overflow-hidden z-50 transition-transform duration-300 md:translate-x-0 ${isMobileOpen ? 'translate-x-0 fixed inset-y-0 left-0' : '-translate-x-full fixed inset-y-0 left-0 md:relative md:translate-x-0'}`}
      >
        <div className="border-b border-brand-border sticky top-0 bg-brand-bg-card z-10 flex items-center h-[57px] px-3 shrink-0">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-bold tracking-widest text-brand-text-secondary uppercase whitespace-nowrap pl-1"
              >
                Curriculum
              </motion.h2>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex text-brand-text-secondary hover:text-brand-accent p-1.5 rounded-md transition-colors absolute right-2 bg-brand-bg-card border border-transparent hover:border-brand-border-light hover:bg-brand-bg-light"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>
          
          {/* Mobile Close Button (inside sidebar header) */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-brand-text-secondary hover:text-brand-accent p-1.5 rounded-md transition-colors absolute right-2 bg-brand-bg-card border border-transparent hover:border-brand-border-light hover:bg-brand-bg-light"
            title="Close Sidebar"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="p-4 space-y-6 w-64"
              >
                {data.map((category) => {
                  const seen = new Set();
                  const uniqueAlgos = category.algos.filter(algo => {
                    const formatted = formatAlgoName(algo);
                    if (seen.has(formatted)) return false;
                    seen.add(formatted);
                    return true;
                  });

                  return (
                    <motion.div key={category.topic} variants={categoryVariants} className="space-y-2">
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
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}
