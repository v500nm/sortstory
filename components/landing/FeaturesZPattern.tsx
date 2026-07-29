"use client";

import { motion } from "framer-motion";

export default function FeaturesZPattern() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-visible z-10 text-brand-text-primary">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative space-y-24 md:space-y-32">
        
        {/* Editorial Block 1: Cocktail Sort (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <h4 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-text-secondary">Parallel Execution</h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif leading-none tracking-tighter">
              Yielding Execution <span className="italic text-brand-cyan">Contexts.</span>
            </h2>
            <p className="text-lg md:text-xl font-serif leading-relaxed font-light text-brand-text-secondary">
              Standard JavaScript execution blocks the main thread. We built a custom `SortContext` engine using asynchronous generators. Every `await ctx.compare()` and `await ctx.swap()` yields control back to the React rendering engine, preventing browser lockup even during $O(N^2)$ backward-forward passes in Cocktail Shaker sort.
            </p>
          </div>

          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-cyan translate-x-4 translate-y-4 -z-10 rounded-lg opacity-80" />
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-brand-border bg-brand-bg-card shadow-lg flex">
                <div className="w-1/2 bg-black/5 dark:bg-white/5 p-4 border-r border-brand-border/50 font-mono text-[10px] sm:text-xs text-brand-text-secondary flex flex-col gap-1 overflow-hidden">
                  <span className="text-brand-purple">export async function</span> <span className="text-brand-cyan">cocktail</span>(ctx) {'{'}
                  <br/>&nbsp;&nbsp;<span className="text-brand-text-secondary">let</span> swapped = <span className="text-brand-purple">true</span>;
                  <br/>&nbsp;&nbsp;<span className="text-brand-text-secondary">while</span> (swapped) {'{'}
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;swapped = <span className="text-brand-purple">false</span>;
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-green">// Yielding to DOM</span>
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-text-secondary">for</span> (<span className="text-brand-text-secondary">let</span> i = start; i {'<'} end; i++) {'{'}
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-purple">await</span> ctx.pauseCheck();
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-purple">await</span> ctx.compare(i, i + 1);
                </div>
                <div className="w-1/2 p-4 flex flex-col justify-end gap-1 relative bg-brand-bg-card">
                  <div className="flex items-end justify-center gap-[2px] h-full pb-2 relative">
                    {[3, 8, 2, 9, 4, 1, 6].map((h, i) => (
                      <div key={i} className={`w-full max-w-[12px] rounded-t-sm ${i === 3 || i === 4 ? 'bg-brand-purple animate-pulse' : 'bg-brand-cyan'}`} style={{ height: `${h * 10}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Editorial Block 2: Graph Engine (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-6 relative order-2 lg:order-1 mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-purple translate-x-4 translate-y-4 -z-10 rounded-lg opacity-80" />
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-brand-border bg-brand-bg-card shadow-lg p-4 relative">
                <div className="grid grid-cols-10 grid-rows-8 gap-[2px] h-full w-full opacity-60">
                  {Array.from({length: 80}).map((_, i) => {
                    const isPath = [0,1,2,12,22,23,24,34,44,45,46,56,66,67,68,78].includes(i);
                    const isVisited = !isPath && i % 3 === 0;
                    return (
                      <div key={i} className={`rounded-[2px] relative ${isPath ? 'bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]' : isVisited ? 'bg-brand-purple/20' : 'bg-black/5 dark:bg-white/5 border border-brand-border/50'}`}>
                        {i === 45 && <div className="absolute inset-0 bg-brand-text-primary/20 animate-ping rounded-[2px]" />}
                      </div>
                    )
                  })}
                </div>
                <div className="absolute bottom-2 right-2 bg-brand-bg-card/90 backdrop-blur border border-brand-border p-2 rounded text-[10px] font-mono shadow-sm">
                  <div><span className="text-brand-purple">f(n)</span> = g(n) + h(n)</div>
                  <div><span className="text-brand-cyan">Cost:</span> 14.8</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 space-y-6 md:space-y-8 order-1 lg:order-2">
            <h4 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-text-secondary">Adjacency Mathematics</h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif leading-none tracking-tighter">
              Heuristic Graph <span className="italic text-brand-purple">Engines.</span>
            </h2>
            <p className="text-lg md:text-xl font-serif leading-relaxed font-light text-brand-text-secondary">
              Our `useGraphEngine` architecture manages massive grid states efficiently. Watch pathfinding algorithms like A* Search evaluate $f(n) = g(n) + h(n)$ heuristic costs in real-time. Understand how nodes are expanded and how intelligent search space pruning guarantees shortest-path optimality without exhaustive memory consumption.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
