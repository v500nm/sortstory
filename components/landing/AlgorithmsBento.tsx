"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

export default function AlgorithmsBento() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <section id="modules" className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-16 md:py-24 relative z-10">
      <div className="mb-12 max-w-3xl">
        <h4 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-text-secondary mb-4">Architecture Modules</h4>
        <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tighter mb-4">Comprehensive <span className="italic text-brand-purple">Domains.</span></h2>
        <p className="text-lg md:text-xl text-brand-text-secondary font-medium font-serif font-light">
          A minimalist interface hiding a highly complex engine. Dive into precise implementations across 6 computational domains.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4" 
      >
        
        {/* Core Engine - Large Block */}
        <MotionLink 
          variants={cardVariants}
          href="/learn" 
          className="md:col-span-4 lg:col-span-4 min-h-[250px] md:min-h-[300px] group bg-brand-bg-card border border-brand-border hover:border-brand-purple/50 transition-colors flex flex-col justify-end p-6 md:p-8 relative overflow-hidden rounded-2xl" 
        >
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-purple/5 rounded-full blur-3xl -z-10 group-hover:bg-brand-purple/10 transition-colors" />
          <div className="absolute top-4 right-4 md:top-8 md:right-8 text-brand-text-secondary font-mono text-[10px] md:text-xs border border-brand-border/30 px-2 py-1 rounded bg-black/5 dark:bg-white/5">
            SearchVisualizer.tsx
          </div>
          <h3 className="text-2xl md:text-3xl font-black mb-2 font-serif">Search Architecture</h3>
          <p className="text-sm md:text-base text-brand-text-secondary max-w-2xl">Interact with our unified `SearchVisualizer` component. Toggle between iterative and recursive logic in Python, JS, Java, and C++ instantly while analyzing corresponding visual states.</p>
        </MotionLink>

        {/* Sorting - Vertical Block */}
        <MotionLink 
          variants={cardVariants}
          href="/sort" 
          className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-brand-bg-card border border-brand-border hover:border-brand-green/50 transition-colors p-6 md:p-8 flex flex-col relative rounded-2xl overflow-hidden"
        >
          <div className="flex-grow z-10 relative">
            <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-brand-green transition-colors font-serif">Parallel Sorting</h3>
            <p className="text-xs md:text-sm text-brand-text-secondary mb-4">Beyond basic Quick/Merge sort, explore parallel array execution models.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-mono bg-black/5 dark:bg-white/5 px-2 py-1 rounded text-brand-text-secondary border border-brand-border/50">Cocktail Shaker</span>
              <span className="text-[10px] font-mono bg-black/5 dark:bg-white/5 px-2 py-1 rounded text-brand-text-secondary border border-brand-border/50">Bitonic Sort</span>
              <span className="text-[10px] font-mono bg-black/5 dark:bg-white/5 px-2 py-1 rounded text-brand-text-secondary border border-brand-border/50">Odd-Even</span>
            </div>
          </div>
          <div className="mt-8 flex gap-1 items-end h-24 md:h-32 opacity-40 group-hover:opacity-100 transition-opacity relative z-10">
            {[4, 2, 7, 5, 8, 3, 9, 1].map((h, i) => (
              <div key={i} className="flex-1 bg-brand-green/80 rounded-t-sm" style={{ height: `${h * 10}%` }} />
            ))}
          </div>
        </MotionLink>

        {/* Pathfinding */}
        <MotionLink 
          variants={cardVariants}
          href="/pathfinding" 
          className="md:col-span-2 lg:col-span-2 min-h-[180px] bg-brand-bg-card border border-brand-border hover:border-brand-cyan/50 transition-colors p-6 flex flex-col justify-between rounded-2xl"
        >
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-brand-cyan transition-colors">Graph Engine Hooks</h3>
            <p className="text-[11px] md:text-xs text-brand-text-secondary">Powered by `useGraphEngine.ts` to manage complex graph adjacency matrices and priority queues.</p>
          </div>
          <div className="text-brand-cyan mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
          </div>
        </MotionLink>

        {/* Machine Learning */}
        <MotionLink 
          variants={cardVariants}
          href="/automata" 
          className="md:col-span-2 lg:col-span-2 min-h-[180px] bg-brand-bg-card border border-brand-border hover:border-brand-yellow/50 transition-colors p-6 flex flex-col justify-between rounded-2xl"
        >
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-brand-yellow transition-colors">Machine Learning</h3>
            <p className="text-[11px] md:text-xs text-brand-text-secondary">Iterative visualization of K-Means clustering centroid convergence and Voronoi tessellations.</p>
          </div>
          <div className="text-brand-yellow mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
             <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
          </div>
        </MotionLink>

         {/* Graphs */}
         <MotionLink 
          variants={cardVariants}
          href="/graphs" 
          className="md:col-span-2 lg:col-span-3 min-h-[120px] bg-brand-bg-card border border-brand-border hover:border-brand-purple/50 transition-colors p-5 md:p-6 flex items-center gap-4 md:gap-6 rounded-2xl"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple shrink-0">
             <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold group-hover:text-brand-purple transition-colors">Topological Data</h3>
            <p className="text-xs text-brand-text-secondary mt-1">Simulate Topological sorting via Kahn's algorithm.</p>
          </div>
        </MotionLink>

        {/* Linked Lists */}
        <MotionLink 
          variants={cardVariants}
          href="/linked-lists" 
          className="md:col-span-2 lg:col-span-3 min-h-[120px] bg-brand-bg-card border border-brand-border hover:border-brand-rose/50 transition-colors p-5 md:p-6 flex items-center gap-4 md:gap-6 rounded-2xl"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose shrink-0">
             <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold group-hover:text-brand-rose transition-colors">Memory References</h3>
            <p className="text-xs text-brand-text-secondary mt-1">Visualize in-place pointer manipulation.</p>
          </div>
        </MotionLink>

      </motion.div>
    </section>
  );
}
