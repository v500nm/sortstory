"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function InteractiveNavigation() {
  const [activeTab, setActiveTab] = useState("sorting");

  const categories = {
    sorting: {
      title: "Sorting Engine",
      desc: "16+ Algorithms. Context-aware yielding. Real-time DOM repaints.",
      color: "bg-brand-green",
      textColor: "text-brand-green",
      links: [
        { name: "Cocktail Sort", url: "/sort/cocktail" },
        { name: "Bitonic Sort", url: "/sort/bitonic" },
        { name: "Odd-Even Sort", url: "/sort/oddEven" },
      ]
    },
    pathfinding: {
      title: "Graph Engine",
      desc: "Matrix adjacency mapping. Heuristic cost evaluation. Priority Queues.",
      color: "bg-brand-cyan",
      textColor: "text-brand-cyan",
      links: [
        { name: "A* (f=g+h)", url: "/pathfinding/a-star" },
        { name: "Dijkstra (f=g)", url: "/pathfinding/dijkstra" },
      ]
    },
    trees: {
      title: "Recursive Engine",
      desc: "Call-stack visualization. Left-Right subtree balancing.",
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      links: [
        { name: "In-Order Traversal", url: "/trees" },
        { name: "Post-Order Traversal", url: "/trees" },
      ]
    },
  };

  return (
    <section className="relative w-full py-16 md:py-24 text-brand-text-primary overflow-hidden">
      
      {/* Sticky Tabbed Navigation Layout */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-16 z-30 bg-brand-bg-dark/80 backdrop-blur-xl py-3 mb-12 border-y border-brand-border/40"
      >
        <div className="max-w-[1000px] mx-auto px-4 flex justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          {Object.keys(categories).map((key) => {
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative px-5 py-2.5 rounded-full font-bold text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                  isSelected ? 'text-brand-bg-dark' : 'text-brand-text-secondary hover:text-brand-text-primary'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="interactiveNavPill"
                    className="absolute inset-0 bg-brand-text-primary rounded-full shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {categories[key as keyof typeof categories].title}
              </button>
            );
          })}
        </div>
      </motion.div>
 
      {/* Radial / Hub-and-Spoke Pattern Presentation */}
      <div className="max-w-[1000px] mx-auto px-4 min-h-[350px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center text-center z-10"
          >
            {/* Center Hub */}
            <div className="mb-8 relative bg-brand-surface-1 border border-brand-border-light p-6 md:p-8 rounded-2xl max-w-md shadow-2xl w-full">
              <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-30 -z-10 ${categories[activeTab as keyof typeof categories].color}`} />
              <div className="text-[10px] md:text-xs font-mono font-bold mb-2 text-brand-text-tertiary uppercase tracking-widest">SYSTEM_MODULE_LOADED</div>
              <h3 className={`text-3xl md:text-4xl font-black font-serif mb-2 ${categories[activeTab as keyof typeof categories].textColor}`}>
                {categories[activeTab as keyof typeof categories].title}
              </h3>
              <p className="text-brand-text-secondary text-sm md:text-base leading-relaxed">
                {categories[activeTab as keyof typeof categories].desc}
              </p>
            </div>

            {/* Spokes (Links) */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories[activeTab as keyof typeof categories].links.map((link, i) => (
                <Link 
                  key={i} 
                  href={link.url}
                  className="group relative px-5 md:px-7 py-2.5 md:py-3.5 bg-brand-surface-1 border border-brand-border-light rounded-full hover:border-brand-text-primary hover:scale-[1.03] transition-all flex items-center gap-2.5 shadow-md"
                >
                  <span className={`w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 group-hover:animate-ping ${categories[activeTab as keyof typeof categories].color}`} />
                  <span className="font-bold text-xs md:text-sm font-mono text-brand-text-primary">{link.name}</span>
                </Link>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
        
        {/* Background Radial Lines (Subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-10 flex items-center justify-center -z-10">
           <svg className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] animate-spin-slow" viewBox="0 0 100 100">
             <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.2" />
             <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.2" />
             <line x1="14.6" y1="14.6" x2="85.4" y2="85.4" stroke="currentColor" strokeWidth="0.2" />
             <line x1="14.6" y1="85.4" x2="85.4" y2="14.6" stroke="currentColor" strokeWidth="0.2" />
             <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" />
             <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" />
           </svg>
        </div>
      </div>
    </section>
  );
}
