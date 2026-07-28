"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComparisonSection() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const stats = [
    { 
      name: "Quick Sort", 
      time: "O(n log n)", 
      space: "O(log n)", 
      stable: "No", 
      metricArray1k: "~11,000",
      metricSwaps1k: "~3,500",
      useCase: "V8 Engine's Array.prototype.sort() baseline (often hybridized). Excellent cache locality makes it the fastest practical sort for primitive types in memory." 
    },
    { 
      name: "Merge Sort", 
      time: "O(n log n)", 
      space: "O(n)", 
      stable: "Yes", 
      metricArray1k: "~10,000",
      metricSwaps1k: "0 (Copies)",
      useCase: "Python's Timsort foundation. Required when sorting object references where stability (maintaining order of equal elements) is strictly enforced." 
    },
    { 
      name: "Bitonic Sort", 
      time: "O(n log² n)", 
      space: "O(n log² n)", 
      stable: "No", 
      metricArray1k: "~55,000",
      metricSwaps1k: "~27,000",
      useCase: "Highly parallelizable data-independent algorithm. Used extensively in GPU programming (CUDA/OpenCL) where threads can execute comparators simultaneously." 
    },
    { 
      name: "Radix Sort", 
      time: "O(nk)", 
      space: "O(n + k)", 
      stable: "Yes", 
      metricArray1k: "O(N) Scans",
      metricSwaps1k: "0 (Bucketing)",
      useCase: "Non-comparative sorting for massive datasets of strings or integers (e.g., sorting 32-bit IPv4 addresses on a networking switch)." 
    },
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-16 md:py-24 text-brand-text-primary relative z-10">
      
      <div className="mb-12 md:mb-16 text-center md:text-left border-b-2 md:border-b-4 border-brand-border pb-6 md:pb-8">
        <h4 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-text-secondary mb-2 md:mb-4">Performance Metrics</h4>
        <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tighter">Complexity <span className="italic text-brand-yellow">Matrix.</span></h2>
        <p className="text-lg md:text-xl font-serif text-brand-text-secondary mt-4 leading-relaxed font-light">Real-world performance estimates for N=1,000 elements.</p>
      </div>

      {/* Comparison Matrix Pattern (Table) */}
      <div className="overflow-x-auto mb-12 rounded-xl border border-brand-border bg-brand-bg-card shadow-sm hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5 dark:bg-white/5 border-b border-brand-border text-brand-text-primary text-sm font-serif">
              <th className="p-5 font-bold">Algorithm</th>
              <th className="p-5 font-bold">Time (Avg)</th>
              <th className="p-5 font-bold">Space (Worst)</th>
              <th className="p-5 font-bold">Compares (N=1k)</th>
              <th className="p-5 font-bold">Swaps (N=1k)</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, i) => (
              <motion.tr 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="border-b border-brand-border/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
              >
                <td className="p-5 font-bold font-serif text-brand-cyan">{stat.name}</td>
                <td className="p-5 text-brand-text-secondary font-mono text-sm">{stat.time}</td>
                <td className="p-5 text-brand-text-secondary font-mono text-sm">{stat.space}</td>
                <td className="p-5 font-mono text-sm group-hover:text-brand-purple transition-colors">{stat.metricArray1k}</td>
                <td className="p-5 font-mono text-sm group-hover:text-brand-purple transition-colors">{stat.metricSwaps1k}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Accordion Stack Layout (Deep Dive) - Useful for Mobile and extra details */}
      <div className="space-y-3 md:hidden block mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="border border-brand-border rounded-lg bg-brand-bg-card overflow-hidden shadow-sm">
            <button 
              onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
              className="w-full p-4 flex justify-between items-center bg-brand-bg-card hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
            >
              <span className="font-bold font-serif text-lg">{stat.name}</span>
              <svg 
                className={`w-5 h-5 transform transition-transform ${openAccordion === i ? 'rotate-180 text-brand-purple' : 'text-brand-text-secondary'}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {openAccordion === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-brand-border/50 bg-black/5 dark:bg-white/5 flex flex-col gap-4 text-sm">
                    <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-xs text-brand-text-secondary">
                      <div>Time: {stat.time}</div>
                      <div>Space: {stat.space}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-brand-cyan uppercase tracking-wider mb-1 font-bold">Use Case</div>
                      <div className="text-brand-text-secondary">{stat.useCase}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
