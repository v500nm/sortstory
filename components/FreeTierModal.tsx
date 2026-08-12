"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FreeTierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreeTierModal({ isOpen, onClose }: FreeTierModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-lg bg-brand-surface-2 border border-brand-border-light rounded-3xl shadow-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto z-10 overflow-hidden"
          >
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green via-brand-cyan to-brand-purple" />
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 text-brand-text-secondary hover:text-brand-text-primary w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-20"
            >
              ✕
            </button>
            
            {/* Modal Header */}
            <div className="text-center mb-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 border border-brand-green/30 px-3 py-1 rounded-full mb-3 shadow-sm">
                🎁 Free Learning & Visualizing Tier
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-brand-text-primary">
                100% Free Access Pass
              </h2>
              <p className="text-brand-text-secondary text-xs sm:text-sm font-sans mt-2 leading-relaxed max-w-md mx-auto">
                SortStory is completely unlocked! Practice data structures, run real-time visualizers, and learn algorithms step-by-step with multi-language code.
              </p>
            </div>

            {/* Tier Features Grid */}
            <div className="space-y-3 mb-6 relative z-10 font-mono text-xs">
              <div className="flex items-start gap-3 p-3 bg-brand-bg-dark/80 border border-brand-border/60 rounded-xl">
                <span className="text-lg leading-none">📊</span>
                <div>
                  <h4 className="font-bold text-brand-cyan mb-0.5">16+ Sorting Algorithms</h4>
                  <p className="text-[11px] text-brand-text-secondary font-sans">Bubble, Merge, Quick, Heap, Radix, Tim Sort & more with side-by-side race comparisons.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-brand-bg-dark/80 border border-brand-border/60 rounded-xl">
                <span className="text-lg leading-none">🗺️</span>
                <div>
                  <h4 className="font-bold text-brand-purple mb-0.5">Pathfinding & Maze Generators</h4>
                  <p className="text-[11px] text-brand-text-secondary font-sans">Race Dijkstra vs A* on dynamic grids with Recursive Backtracking and Prim&apos;s maze algorithms.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-brand-bg-dark/80 border border-brand-border/60 rounded-xl">
                <span className="text-lg leading-none">📚</span>
                <div>
                  <h4 className="font-bold text-brand-yellow mb-0.5">Interactive DSA Curriculum</h4>
                  <p className="text-[11px] text-brand-text-secondary font-sans">Full step-by-step lessons, practice problems, and multi-language code in Python, JS, C++, Java, Rust, Go & TS.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-brand-bg-dark/80 border border-brand-border/60 rounded-xl">
                <span className="text-lg leading-none">🔓</span>
                <div>
                  <h4 className="font-bold text-brand-green mb-0.5">No Credit Card Needed</h4>
                  <p className="text-[11px] text-brand-text-secondary font-sans">Instant browser access for students, engineers, and educators around the world.</p>
                </div>
              </div>
            </div>

            {/* Modal Action Button */}
            <div className="relative z-10">
              <button 
                onClick={onClose}
                className="w-full py-3.5 bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 text-white font-bold font-mono tracking-widest uppercase rounded-xl transition-all shadow-lg text-xs"
              >
                Start Learning & Visualizing Free
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
