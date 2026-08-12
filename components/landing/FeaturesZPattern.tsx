"use client";

import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const visualVariantsLeft = {
  hidden: { opacity: 0, scale: 0.96, x: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const visualVariantsRight = {
  hidden: { opacity: 0, scale: 0.96, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function FeaturesZPattern() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-visible z-10 text-brand-text-primary">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative space-y-24 md:space-y-32">
        
        {/* Editorial Block 1: Cocktail Sort (Text Left, Image Right) */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
        >
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <motion.h4 variants={itemVariants} className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-text-secondary">Parallel Execution</motion.h4>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-black font-serif leading-none tracking-tighter">
              Yielding Execution <span className="italic text-brand-cyan">Contexts.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl font-serif leading-relaxed font-light text-brand-text-secondary">
              Standard JavaScript execution blocks the main thread. We built a custom `SortContext` engine using asynchronous generators. Every `await ctx.compare()` and `await ctx.swap()` yields control back to the React rendering engine, preventing browser lockup even during $O(N^2)$ backward-forward passes in Cocktail Shaker sort.
            </motion.p>
          </div>

          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            <motion.div 
              variants={visualVariantsRight}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple translate-x-3 translate-y-3 -z-10 rounded-xl opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-brand-border-light bg-brand-surface-1 shadow-2xl flex relative">
                {/* LIVE badge */}
                <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-bg-dark/80 backdrop-blur border border-brand-border text-[9px] font-mono font-bold text-brand-green uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                  LIVE YIELD
                </div>
                <div className="w-1/2 bg-black/20 p-3 border-r border-brand-border font-mono text-[10px] sm:text-xs text-brand-text-secondary flex flex-col gap-1 overflow-hidden">
                  <div className="flex gap-2"><span className="text-brand-text-tertiary select-none">1</span><span><span className="text-brand-purple">async function</span> <span className="text-brand-cyan">cocktail</span>(ctx) {'{'}</span></div>
                  <div className="flex gap-2"><span className="text-brand-text-tertiary select-none">2</span><span>&nbsp;&nbsp;<span className="text-brand-text-secondary">let</span> swapped = <span className="text-brand-purple">true</span>;</span></div>
                  <div className="flex gap-2"><span className="text-brand-text-tertiary select-none">3</span><span>&nbsp;&nbsp;<span className="text-brand-text-secondary">while</span> (swapped) {'{'}</span></div>
                  <div className="flex gap-2"><span className="text-brand-text-tertiary select-none">4</span><span>&nbsp;&nbsp;&nbsp;&nbsp;swapped = <span className="text-brand-purple">false</span>;</span></div>
                  <div className="flex gap-2 bg-brand-purple/10 -mx-3 px-3 rounded"><span className="text-brand-purple font-bold select-none">5</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-purple">await</span> ctx.yieldDOM();</span></div>
                  <div className="flex gap-2"><span className="text-brand-text-tertiary select-none">6</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-purple">await</span> ctx.compare(i, i+1);</span></div>
                </div>
                <div className="w-1/2 p-4 flex flex-col justify-end gap-1 relative bg-brand-surface-1">
                  <div className="flex items-end justify-center gap-[3px] h-full pb-2 relative">
                    {[3, 8, 2, 9, 4, 1, 6].map((h, i) => (
                      <div key={i} className={`w-full max-w-[14px] rounded-t-sm transition-all ${i === 3 || i === 4 ? 'bg-brand-purple shadow-[0_0_12px_rgba(129,140,248,0.8)] animate-pulse' : 'bg-brand-cyan/80'}`} style={{ height: `${h * 10}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Editorial Block 2: Graph Engine (Image Left, Text Right) */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
        >
          <div className="lg:col-span-6 relative order-2 lg:order-1 mt-8 lg:mt-0">
            <motion.div 
              variants={visualVariantsLeft}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-cyan translate-x-3 translate-y-3 -z-10 rounded-xl opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-brand-border-light bg-brand-surface-1 shadow-2xl p-4 relative">
                <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-bg-dark/80 backdrop-blur border border-brand-border text-[9px] font-mono font-bold text-brand-cyan uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  HEURISTIC GRID
                </div>
                <div className="grid grid-cols-10 grid-rows-8 gap-[2px] h-full w-full opacity-70">
                  {Array.from({length: 80}).map((_, i) => {
                    const isPath = [0,1,2,12,22,23,24,34,44,45,46,56,66,67,68,78].includes(i);
                    const isVisited = !isPath && i % 3 === 0;
                    return (
                      <div key={i} className={`rounded-[2px] relative transition-colors ${isPath ? 'bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)]' : isVisited ? 'bg-brand-purple/30' : 'bg-black/10 dark:bg-white/5 border border-brand-border/40'}`}>
                        {i === 45 && <div className="absolute inset-0 bg-brand-text-primary/40 animate-ping rounded-[2px]" />}
                      </div>
                    )
                  })}
                </div>
                <div className="absolute bottom-2 right-2 bg-brand-surface-2/90 backdrop-blur border border-brand-border-light p-2 rounded-lg text-[10px] font-mono shadow-md">
                  <div><span className="text-brand-purple font-bold">f(n)</span> = g(n) + h(n)</div>
                  <div><span className="text-brand-cyan font-bold">Cost:</span> 14.8</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 space-y-6 md:space-y-8 order-1 lg:order-2">
            <motion.h4 variants={itemVariants} className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-text-secondary">Adjacency Mathematics</motion.h4>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-black font-serif leading-none tracking-tighter">
              Heuristic Graph <span className="italic text-brand-purple">Engines.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl font-serif leading-relaxed font-light text-brand-text-secondary">
              Our `useGraphEngine` architecture manages massive grid states efficiently. Watch pathfinding algorithms like A* Search evaluate $f(n) = g(n) + h(n)$ heuristic costs in real-time. Understand how nodes are expanded and how intelligent search space pruning guarantees shortest-path optimality without exhaustive memory consumption.
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
