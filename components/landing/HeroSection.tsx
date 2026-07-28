"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroAnimation from "@/components/HeroAnimation";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-8 py-12 lg:py-24 max-w-[1400px] mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 max-w-2xl w-full flex flex-col justify-center h-full"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-brand-border px-4 py-2 rounded-full text-xs font-bold tracking-widest text-brand-text-secondary uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              Visual Algorithmic Engine
            </motion.div>
            
            {/* DeepDive Editorial Style Typography */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-serif tracking-tighter leading-none"
            >
              Master DSA Through <span className="italic text-brand-purple block mt-2">Visual Execution.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-brand-text-secondary font-medium leading-relaxed max-w-xl"
            >
              Experience microsecond-level execution tracking. Our asynchronous engine yields to the DOM in real-time, allowing you to pause, inspect, and analyze 20+ algorithms—from standard Bubble Sort to advanced parallel Bitonic networks.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-6"
            >
              <Link 
                href="/learn" 
                className="group relative w-full sm:w-auto px-8 py-4 bg-brand-text-primary text-brand-bg-dark font-extrabold text-base rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-md"
              >
                <span>Initialize SortContext</span>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link 
                href="/sort" 
                className="group relative w-full sm:w-auto px-8 py-4 bg-transparent border border-brand-border text-brand-text-primary font-bold text-base rounded-full transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <span>Explore Sorting</span>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full hidden lg:flex items-center justify-center relative"
          >
            {/* Asymmetric styling matching editorial style */}
            <div className="absolute inset-0 bg-brand-cyan/5 blur-3xl -z-10 rounded-full mix-blend-screen skew-x-12 translate-x-12" />
            <HeroAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
