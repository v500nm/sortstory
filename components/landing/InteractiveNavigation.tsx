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
      <div className="sticky top-0 z-50 bg-brand-bg-dark/60 backdrop-blur-md py-3 mb-12 border-b border-brand-border/30">
        <div className="max-w-[1000px] mx-auto px-4 flex justify-start sm:justify-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap border ${
                activeTab === key 
                  ? 'bg-brand-text-primary text-brand-bg-dark border-brand-text-primary shadow-sm' 
                  : 'bg-transparent text-brand-text-secondary border-transparent hover:text-brand-text-primary hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {categories[key as keyof typeof categories].title}
            </button>
          ))}
        </div>
      </div>

      {/* Radial / Hub-and-Spoke Pattern Presentation */}
      <div className="max-w-[1000px] mx-auto px-4 min-h-[350px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center text-center z-10"
          >
            {/* Center Hub */}
            <div className="mb-8 relative bg-brand-bg-card border border-brand-border p-6 md:p-8 rounded-2xl max-w-md shadow-lg w-full">
              <div className={`absolute -inset-0.5 rounded-2xl blur-md opacity-20 -z-10 ${categories[activeTab as keyof typeof categories].color}`} />
              <div className="text-[10px] md:text-xs font-mono mb-2 text-brand-text-secondary">SYSTEM_MODULE_LOADED</div>
              <h3 className={`text-3xl md:text-4xl font-black font-serif mb-2 ${categories[activeTab as keyof typeof categories].textColor}`}>
                {categories[activeTab as keyof typeof categories].title}
              </h3>
              <p className="text-brand-text-secondary text-sm md:text-base">
                {categories[activeTab as keyof typeof categories].desc}
              </p>
            </div>

            {/* Spokes (Links) */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories[activeTab as keyof typeof categories].links.map((link, i) => (
                <Link 
                  key={i} 
                  href={link.url}
                  className="group relative px-4 md:px-6 py-2 md:py-3 bg-brand-bg-card border border-brand-border rounded-full hover:border-brand-text-secondary hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className={`w-2 h-2 rounded-full opacity-50 group-hover:opacity-100 group-hover:animate-ping ${categories[activeTab as keyof typeof categories].color}`} />
                  <span className="font-bold text-xs md:text-sm font-mono text-brand-text-primary group-hover:text-brand-text-primary transition-colors">{link.name}</span>
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
