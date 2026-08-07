"use client";

import { motion } from "framer-motion";

export default function TimelineSection() {
  const steps = [
    {
      title: "1. Network Creation",
      desc: "For a Bitonic Sort, a parallel comparator network is generated based on the array length (must be power of 2). The step and distance (k) are initialized.",
      code: "const k = Math.floor(n / 2);\nlet dir = true; // Ascending",
      color: "brand-cyan"
    },
    {
      title: "2. Comparator Check",
      desc: "The algorithm isolates indices i and i+k. It calls the asynchronous context comparator, passing control back to the visualizer engine.",
      code: "await ctx.pauseCheck();\nconst cmp = await ctx.compare(i, i+k);",
      color: "brand-purple"
    },
    {
      title: "3. Async State Yield",
      desc: "The React engine takes over. It parses the 'compare' event, updates the DOM to highlight indices i and i+k in red, and awaits user playback speed.",
      code: "setHighlight([i, i+k]);\nawait sleep(playbackSpeed);",
      color: "brand-yellow"
    },
    {
      title: "4. Swap & Flush",
      desc: "Control returns to the algorithm. If out of order based on `dir`, the context swap is called, physically transposing the array elements and re-rendering.",
      code: "if ((cmp > 0 && dir) || (cmp < 0 && !dir)) {\n  await ctx.swap(i, i+k);\n}",
      color: "brand-green"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-16 md:py-32 z-10 text-brand-text-primary">
      
      <motion.div 
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 md:mb-20 max-w-3xl"
      >
        <motion.h4 variants={textItemVariants} className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-text-secondary mb-4">Micro-Architecture</motion.h4>
        <motion.h2 variants={textItemVariants} className="text-3xl md:text-5xl font-black font-serif tracking-tighter">Execution <span className="italic text-brand-cyan">Lifecycle.</span></motion.h2>
        <motion.p variants={textItemVariants} className="text-lg md:text-xl font-serif text-brand-text-secondary mt-4 leading-relaxed font-light">
          Deep dive into a single parallel comparison event inside Bitonic Sort.
        </motion.p>
      </motion.div>

      {/* 2x2 Bento Box Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {steps.map((step, index) => (
          <motion.div 
            variants={cardVariants}
            key={index} 
            className="bg-brand-bg-card border border-brand-border hover:border-brand-text-secondary transition-colors rounded-2xl p-6 md:p-10 flex flex-col justify-between shadow-sm group"
          >
            <div>
              <div className={`inline-block bg-${step.color}/10 text-${step.color} font-mono text-[10px] md:text-xs font-bold px-2 py-1 rounded-md mb-6 border border-${step.color}/20`}>
                Event: 0x0{index + 1}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">{step.title}</h3>
              <p className="text-base md:text-lg text-brand-text-secondary leading-relaxed font-light">{step.desc}</p>
            </div>

            <div className={`mt-8 bg-black/5 dark:bg-white/5 border border-brand-border/50 rounded-lg p-4 md:p-6 font-mono text-[10px] sm:text-xs md:text-sm text-${step.color} overflow-x-auto shadow-inner group-hover:bg-brand-bg-dark transition-colors`}>
              <pre><code>{step.code}</code></pre>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
    </section>
  );
}
