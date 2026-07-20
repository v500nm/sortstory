"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const visualizerLinks = [
  { href: "/sort", label: "Sorting" },
  { href: "/search", label: "Searching" },
  { href: "/pathfinding", label: "Pathfinding" },
  { href: "/linked-lists", label: "Linked Lists" },
  { href: "/trees", label: "Trees (BST)" },
  { href: "/graphs", label: "Graphs" },
  { href: "/automata", label: "Automata & ML" },
];

const resourceLinks = [
  { href: "/learn", label: "Learn & Practice" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/visual-sitemap", label: "Sitemap" },
];

const connectLinks = [
  { href: "https://adnan-mangaonkar.com", label: "Adnan OS (Portfolio)", external: true, rel: "author" },
  { href: "https://business.adnan-mangaonkar.com", label: "Business Consulting", external: true },
  { href: "https://github.com/v500nm", label: "GitHub", external: true },
  { href: "https://www.linkedin.com/in/adnan-mangaonkar-523351167/", label: "LinkedIn", external: true },
  { href: "https://x.com/V350NM", label: "X (Twitter)", external: true },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-border bg-brand-bg-dark/80 backdrop-blur-xl mt-auto z-40">
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-[1700px] mx-auto px-4 sm:px-6 py-12"
      >
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold text-brand-accent hover:opacity-80 transition-opacity mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
                <path d="M4 16l4 4 4-4M8 20V4M20 8l-4-4-4 4M16 4v16"/>
              </svg>
              SortStory
            </Link>
            <p className="text-xs text-brand-text-secondary leading-relaxed max-w-[220px]">
              Free interactive DSA visualization platform. Explore, execute, and analyze algorithms visually.
            </p>
          </motion.div>

          {/* Visualizers Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-brand-text-secondary mb-4">Visualizers</h4>
            <ul className="space-y-2">
              {visualizerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-text-secondary hover:text-brand-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-brand-text-secondary mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-text-secondary hover:text-brand-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-brand-text-secondary mb-4">Connect</h4>
            <ul className="space-y-2">
              {connectLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel={`noopener noreferrer${link.rel ? ` ${link.rel}` : ''}`}
                    className="text-sm text-brand-text-secondary hover:text-brand-accent transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="pt-6 border-t border-brand-border/50 flex flex-col sm:flex-row justify-between items-center gap-3"
        >
          <p className="text-xs text-brand-text-secondary">
            © 2026 SortStory. Built by{" "}
            <a
              href="https://adnan-mangaonkar.com"
              target="_blank"
              rel="noopener noreferrer author"
              className="text-brand-accent hover:text-brand-purple transition-colors font-bold"
            >
              Adnan Mangaonkar
            </a>
          </p>
          <div className="flex items-center">
            <a
              href="https://business.adnan-mangaonkar.com"
              target="_blank"
              rel="noopener noreferrer author"
              className="group relative inline-flex items-center gap-2 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-bg-dark bg-brand-cyan rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
            >
              <span className="relative z-10">Connect for Business</span>
              <svg className="w-3 h-3 relative z-10 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
