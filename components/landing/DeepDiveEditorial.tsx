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

export default function DeepDiveEditorial() {
  return (
    <section className="w-full py-16 md:py-32 px-4 sm:px-8 relative overflow-hidden text-brand-text-primary z-10">
      
      {/* Decorative Asymmetric Background Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-black/5 dark:bg-white/5 -z-10 skew-x-12 translate-x-12 md:translate-x-32" />
      <div className="absolute bottom-10 left-4 w-32 h-32 md:w-64 md:h-64 border border-brand-border rounded-full -z-10 opacity-30" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Magazine Style Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20 text-center md:text-left border-b-2 md:border-b-4 border-brand-border pb-6 md:pb-8"
        >
          <h4 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-text-secondary mb-2 md:mb-4">Engineering Architecture</h4>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-serif leading-none tracking-tighter">
            Escaping the <br className="hidden sm:block"/> <span className="italic text-brand-purple">Event Loop.</span>
          </h2>
        </motion.header>
 
        {/* F-Pattern & Asymmetric Layered Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start relative">
          
          {/* Main Column (F-Pattern Left Side) */}
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 space-y-6 md:space-y-8"
          >
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl font-serif leading-relaxed font-light first-letter:text-5xl md:first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 md:first-letter:mt-1 first-letter:text-brand-cyan"
            >
              Building a real-time algorithm visualizer in React presents a profound technical challenge: algorithms are synchronous, CPU-blocking operations.
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-brand-text-secondary leading-relaxed font-serif"
            >
              If you execute a standard `while(true)` loop in JavaScript to run an A* Search on a 10,000 node graph, the browser's main thread locks up. The DOM cannot paint, inputs freeze, and the visualizer becomes useless. SortStory solves this by entirely rewriting algorithms into asynchronous generator patterns.
            </motion.p>
 
            <motion.div 
              variants={itemVariants}
              className="pt-6 md:pt-8 pb-4 border-y border-brand-border/50 my-6 md:my-8"
            >
              <h3 className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wider text-brand-text-primary">The Async SortContext</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="font-bold text-brand-purple font-mono shrink-0">0x1</span>
                  <span className="text-sm md:text-base text-brand-text-secondary"><strong>Yielding State:</strong> Every array access (`ctx.compare`) returns a Promise. This forces the algorithm to yield control to the React reconciler, allowing Framer Motion to animate the exact structural changes.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold text-brand-purple font-mono shrink-0">0x2</span>
                  <span className="text-sm md:text-base text-brand-text-secondary"><strong>Thread Unblocking:</strong> By awaiting these promises, even an $O(N^2)$ algorithm like Odd-Even sort can process thousands of swaps without dropping a single 60FPS animation frame.</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Asymmetric Image/Callout Column */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-32">
              {/* Asymmetric Layered Image Container */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-cyan translate-x-3 translate-y-3 -z-10 rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
                <div className="bg-brand-surface-1 border border-brand-border-light text-brand-text-primary p-6 md:p-8 relative rounded-2xl shadow-2xl overflow-hidden">
                   <div className="absolute -top-4 -left-2 text-7xl font-serif font-black text-brand-purple/20 select-none pointer-events-none">“</div>
                   <h4 className="text-lg md:text-xl font-bold font-serif mb-4 relative z-10 leading-snug">"It's not just a UI change. The algorithms themselves have been fundamentally rewritten to be state-aware."</h4>
                   <p className="text-xs text-brand-text-secondary font-mono font-bold">— SortStory Engineering</p>
                   
                   <div className="mt-6 md:mt-8 border-t border-brand-border-light pt-4 text-[10px] md:text-xs font-mono uppercase tracking-widest text-brand-purple flex items-center justify-between">
                     <span>[ Fig 1. Async Yields ]</span>
                     <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                   </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="mt-8 p-4 md:p-6 bg-brand-surface-1 border border-brand-border-light rounded-xl shadow-lg font-mono text-xs md:text-sm overflow-x-auto"
              >
                <div className="text-brand-text-tertiary mb-2 uppercase text-[10px] tracking-wider font-bold">// Traditional vs SortStory</div>
                <div className="line-through text-brand-rose/80 mb-1 flex items-center gap-2"><span className="text-brand-rose">−</span> if (arr[i] &gt; arr[j]) swap()</div>
                <div className="text-brand-green font-bold flex items-center gap-2"><span className="text-brand-green">+</span> if (await ctx.compare(i, j) &gt; 0) await ctx.swap(i, j)</div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
