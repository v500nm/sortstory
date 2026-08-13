"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function PortfolioGrid() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const loadMoreRef = useRef(null);
  const isInView = useInView(loadMoreRef, { once: false, margin: "100px" });

  const allItems = [
    { name: "Cocktail Shaker", category: "Sorting Engine", url: "/sort/cocktail", desc: "Bi-directional bubble sort variant." },
    { name: "Bitonic Sort", category: "Sorting Engine", url: "/sort/bitonic", desc: "O(n log² n) parallel comparator network." },
    { name: "Odd-Even Sort", category: "Sorting Engine", url: "/sort/oddEven", desc: "Brick sort for parallel processing." },
    { name: "Quick Sort", category: "Sorting Engine", url: "/sort/quick", desc: "Divide & Conquer pivot strategy." },
    { name: "Merge Sort", category: "Sorting Engine", url: "/sort/merge", desc: "O(N) space stable sorting." },
    { name: "A* Search", category: "Graph Engine", url: "/pathfinding/a-star", desc: "f=g+h heuristic pathfinding." },
    { name: "Dijkstra", category: "Graph Engine", url: "/pathfinding/dijkstra", desc: "Shortest-path tree generation." },
    { name: "SearchVisualizer", category: "Data Modules", url: "/search", desc: "Iterative vs Recursive search." },
    { name: "K-Means", category: "ML Engine", url: "/automata", desc: "Centroid variance minimization." },
    { name: "Conway's Life", category: "Automata", url: "/automata", desc: "Turing-complete cellular automata." },
    { name: "AVL Trees", category: "Recursive Engine", url: "/trees", desc: "Self-balancing binary structures." },
    { name: "Floyd's Cycle", category: "Memory", url: "/linked-lists", desc: "Tortoise and hare pointer tracking." },
  ];

  // Infinite Scroll Pattern implementation
  useEffect(() => {
    if (isInView && !loading && items.length < allItems.length) {
      setLoading(true);
      setTimeout(() => {
        setItems(prev => [...prev, ...allItems.slice(prev.length, prev.length + 4)]);
        setLoading(false);
      }, 600);
    }
  }, [isInView, loading, items.length, allItems]);

  useEffect(() => {
    setItems(allItems.slice(0, 8));
  }, []);

  const categories = ["ALL", "Sorting Engine", "Graph Engine", "Recursive Engine", "ML Engine"];

  const filteredItems = selectedFilter === "ALL" 
    ? items 
    : allItems.filter(item => item.category === selectedFilter);

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Sorting Engine': 
        return {
          dot: 'bg-brand-green',
          border: 'border-brand-green/30',
          bg: 'bg-brand-green/10',
          text: 'text-brand-green'
        };
      case 'Graph Engine': 
        return {
          dot: 'bg-brand-cyan',
          border: 'border-brand-cyan/30',
          bg: 'bg-brand-cyan/10',
          text: 'text-brand-cyan'
        };
      case 'Recursive Engine': 
        return {
          dot: 'bg-brand-yellow',
          border: 'border-brand-yellow/30',
          bg: 'bg-brand-yellow/10',
          text: 'text-brand-yellow'
        };
      default: 
        return {
          dot: 'bg-brand-purple',
          border: 'border-brand-purple/30',
          bg: 'bg-brand-purple/10',
          text: 'text-brand-purple'
        };
    }
  };

  return (
    <section className="w-full py-16 md:py-24 relative text-brand-text-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-10 text-center md:text-left border-b border-brand-border-light pb-6 md:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h4 className="text-xs md:text-sm font-mono font-bold tracking-[0.2em] uppercase text-brand-text-secondary mb-2 md:mb-4">Full Catalog</h4>
            <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tighter">Module <span className="italic text-brand-cyan">Index.</span></h2>
            <p className="text-lg md:text-xl font-serif text-brand-text-secondary mt-2 leading-relaxed font-light">Interactive visualizer modules across computer science domains.</p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                  selectedFilter === cat
                    ? 'bg-brand-purple text-white shadow-[0_0_12px_rgba(129,140,248,0.4)]'
                    : 'bg-brand-surface-1 text-brand-text-secondary border border-brand-border-light hover:text-brand-text-primary hover:border-brand-purple/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dense Chip/Pill Layout */}
        <div className="flex flex-wrap gap-3 md:gap-5">
          {filteredItems.map((item, i) => {
            const styles = getCategoryStyles(item.category);
            return (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const, delay: (i % 6) * 0.04 }}
                key={item.name}
              >
                <Link 
                  href={item.url} 
                  className="flex items-center gap-3.5 bg-brand-surface-1 border border-brand-border-light hover:border-brand-purple/50 hover:scale-[1.03] transition-all px-5 py-3.5 rounded-full group shadow-md hover-lift"
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${styles.dot} group-hover:animate-ping shadow-sm`} />
                  <div>
                    <h3 className="text-sm md:text-base font-bold font-serif group-hover:text-brand-purple text-brand-text-primary transition-colors">{item.name}</h3>
                  </div>
                  <div className={`hidden sm:block ml-2 px-2.5 py-0.5 rounded-full border ${styles.border} ${styles.bg} text-[9px] font-mono font-bold ${styles.text}`}>
                    {item.category}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
