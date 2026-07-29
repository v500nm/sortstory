"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function PortfolioGrid() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sorting Engine': return 'brand-green';
      case 'Graph Engine': return 'brand-cyan';
      case 'Recursive Engine': return 'brand-yellow';
      default: return 'brand-purple';
    }
  };

  return (
    <section className="w-full py-16 md:py-24 relative text-brand-text-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center md:text-left border-b-2 md:border-b-4 border-brand-border pb-6 md:pb-8"
        >
          <h4 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-text-secondary mb-2 md:mb-4">Full Catalog</h4>
          <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tighter">Module <span className="italic text-brand-cyan">Index.</span></h2>
          <p className="text-lg md:text-xl font-serif text-brand-text-secondary mt-4 leading-relaxed font-light">Scroll to lazy-load the complete visualization catalog.</p>
        </motion.div>

        {/* Dense Chip/Pill Layout for empty cards */}
        <div className="flex flex-wrap gap-4 md:gap-6">
          {items.map((item, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: (i % 4) * 0.05 }}
              key={i}
            >
              <Link 
                href={item.url} 
                className="flex items-center gap-4 bg-brand-bg-card border border-brand-border hover:border-brand-text-secondary transition-colors px-6 py-4 rounded-full group shadow-sm"
              >
                <div className={`w-3 h-3 rounded-full bg-${getCategoryColor(item.category)} group-hover:animate-ping`} />
                <div>
                  <h3 className="text-base md:text-lg font-bold font-serif group-hover:text-brand-text-primary text-brand-text-secondary transition-colors">{item.name}</h3>
                </div>
                <div className={`hidden sm:block ml-4 px-3 py-1 rounded-full border border-${getCategoryColor(item.category)}/30 bg-${getCategoryColor(item.category)}/5 text-[10px] font-mono text-${getCategoryColor(item.category)}`}>
                  {item.category}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
