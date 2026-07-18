"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan mb-4"
          >
            404
          </motion.div>

          <h1 className="text-2xl font-bold text-brand-text-primary mb-3">
            Page Not Found
          </h1>
          <p className="text-brand-text-secondary mb-8 leading-relaxed">
            The algorithm you&apos;re looking for doesn&apos;t exist in this search space. Try navigating back to a known node.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-bold rounded-xl hover:scale-[1.03] transition-transform"
            >
              Back to Home
            </Link>
            <Link
              href="/learn"
              className="px-6 py-3 bg-brand-bg-card border border-brand-border text-brand-text-primary font-bold rounded-xl hover:bg-brand-bg-light transition-colors"
            >
              Start Learning
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              { href: "/sort", label: "Sorting" },
              { href: "/search", label: "Searching" },
              { href: "/pathfinding", label: "Pathfinding" },
              { href: "/graphs", label: "Graphs" },
              { href: "/trees", label: "Trees" },
              { href: "/linked-lists", label: "Linked Lists" },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-mono px-3 py-1.5 bg-brand-bg-card border border-brand-border rounded-lg text-brand-text-secondary hover:text-brand-accent hover:border-brand-purple/40 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
