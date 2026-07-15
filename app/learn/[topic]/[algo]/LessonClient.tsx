"use client";

import React, { useState } from 'react';
import { LessonData } from '@/lib/markdown';
import MarkdownRenderer from '@/components/learn/MarkdownRenderer';
import { useLanguage, ProgrammingLanguage } from '@/components/learn/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  lessons: LessonData[];
  topic: string;
  algo: string;
}

export default function LessonClient({ lessons, topic, algo }: Props) {
  const [activeLessonId, setActiveLessonId] = useState<string>(lessons[0]?.id || '');
  const { language, setLanguage } = useLanguage();

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];

  const languages: { id: ProgrammingLanguage; label: string }[] = [
    { id: 'python', label: 'Python' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'java', label: 'Java' },
    { id: 'cpp', label: 'C++' },
    { id: 'c', label: 'C' },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-brand-bg-medium border-b md:border-b-0 md:border-r border-brand-border flex flex-col shrink-0">
        <div className="p-3 md:p-6 border-b border-brand-border bg-brand-bg-medium z-10">
          <h2 className="text-[10px] md:text-xs font-bold tracking-wider text-brand-text-secondary uppercase mb-0.5 md:mb-1">
            {topic.replace('-', ' ')}
          </h2>
          <h3 className="text-sm md:text-lg font-black text-brand-text-primary capitalize">
            {algo.replace('-', ' ')}
          </h3>
        </div>

        <nav className="p-2 md:p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto space-x-2 md:space-x-0 md:space-y-1 custom-scrollbar">
          {lessons.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setActiveLessonId(lesson.id)}
              className={`shrink-0 md:w-full text-left px-3 py-2 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeLessonId === lesson.id
                  ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/30'
                  : 'text-brand-text-secondary hover:bg-brand-bg-light hover:text-brand-text-primary border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <span className={`w-1.5 h-1.5 rounded-full ${activeLessonId === lesson.id ? 'bg-brand-purple' : 'bg-brand-border-light'}`} />
                {lesson.title}
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-brand-bg-dark">
        <div className="max-w-4xl mx-auto p-8 lg:p-12">
          {/* Language Toggle Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-brand-border">
            <h1 className="text-sm font-bold uppercase tracking-widest text-brand-text-secondary mb-4 sm:mb-0">
              {activeLesson.type === 'practice' ? 'Practice Problem' : 'Learning Module'}
            </h1>
            
            <div className="flex items-center gap-2 bg-brand-bg-dark border border-brand-border p-1 rounded-lg">
              {languages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`px-3 py-1.5 text-xs font-bold tracking-wide rounded-md transition-colors ${
                    language === lang.id
                      ? 'bg-brand-border text-brand-text-primary shadow-sm'
                      : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-bg-light'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Markdown Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLessonId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <MarkdownRenderer content={activeLesson.content} />
            </motion.div>
          </AnimatePresence>
          
          {/* Bottom Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 pt-8 border-t border-brand-border flex justify-between"
          >
            {(() => {
              const currentIndex = lessons.findIndex(l => l.id === activeLessonId);
              const prev = lessons[currentIndex - 1];
              const next = lessons[currentIndex + 1];

              return (
                <>
                  {prev ? (
                    <button 
                      onClick={() => setActiveLessonId(prev.id)}
                      className="text-brand-text-secondary hover:text-brand-text-primary text-sm flex items-center gap-2 transition-colors"
                    >
                      ← Previous: {prev.title}
                    </button>
                  ) : <div />}
                  {next ? (
                    <button 
                      onClick={() => setActiveLessonId(next.id)}
                      className="text-brand-cyan hover:text-brand-purple text-sm font-bold flex items-center gap-2 transition-colors"
                    >
                      Next: {next.title} →
                    </button>
                  ) : (
                    <span className="text-brand-green text-sm font-bold">Module Completed ✓</span>
                  )}
                </>
              );
            })()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
