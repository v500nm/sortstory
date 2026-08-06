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

const letterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const footerLogoLetters = Array.from("SORTSTORY");

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
  { href: "/learn", label: "DSA Learning Modules" },
  { href: "/press", label: "Press & Publications", highlight: true },
  { href: "/research", label: "Research & Benchmarks" },
  { href: "/faq", label: "FAQ" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/visual-sitemap", label: "Sitemap" },
];

const mediaLinks = [
  { href: "https://dev.to/v500nm/illuminating-algorithms-why-i-built-a-next-gen-dsa-visualizer-to-empower-developers-jgk", label: "DEV.to Article" },
  { href: "https://blogadnan.hashnode.dev/sortstory-dsa-visualizers-adnan-mangaonkar", label: "Hashnode Blog" },
  { href: "https://www.producthunt.com/products/sortstory?launch=sortstory", label: "Product Hunt Launch" },
  { href: "https://medium.com/@adnans0307/beyond-the-whiteboard-how-sortstory-is-rewiring-algorithm-education-with-ai-and-multi-stack-8e780a9ddcad?sharedUserId=adnans0307", label: "Medium Article" },
  { href: "https://www.reddit.com/r/sortstory/comments/1vb01y3/i_was_tired_of_failing_algorithm_interviews/", label: "Reddit Community" },
  { href: "https://en.wikipedia.org/w/index.php?title=User:V500nm&oldid=1366858942", label: "Wikipedia Record" },
];

const connectLinks = [
  { href: "https://adnan-mangaonkar.com", label: "Adnan OS (Portfolio)", external: true, rel: "author" },
  { href: "https://business.adnan-mangaonkar.com", label: "Business Consulting", external: true },
  { href: "https://github.com/v500nm", label: "GitHub", external: true },
  { href: "https://www.linkedin.com/in/adnan-mangaonkar/", label: "LinkedIn", external: true },
  { href: "https://x.com/V350NM", label: "X (Twitter)", external: true },
];

const decorativeBars = [15, 30, 20, 45, 35, 60, 40, 75, 50, 90, 65, 95, 55, 80, 45, 70, 30, 60, 25, 50, 15, 40, 10, 30, 45, 20, 65, 35, 80, 50, 95, 40, 70, 30];

export default function Footer() {
  return (
    <footer className="w-full relative bg-transparent mt-auto z-40">
      {/* Smooth top fade to blend the content into the footer */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-dark via-brand-bg-dark/95 to-transparent pointer-events-none -z-10" />

      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-[1700px] mx-auto px-4 sm:px-6 pt-24 pb-12"
      >
        {/* 1. Giant Magazine Style Staggered Typography Reveal */}
        <div className="overflow-hidden py-4 border-b border-brand-border/30 mb-8 flex justify-center">
          <motion.div
            variants={letterContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="flex select-none pointer-events-none"
          >
            {footerLogoLetters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-[11vw] sm:text-[9vw] lg:text-[7vw] font-black tracking-tighter uppercase font-serif text-transparent bg-clip-text bg-gradient-to-r from-brand-text-secondary/20 via-brand-purple/40 to-brand-cyan/40 px-0.5 sm:px-1"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Branding Subtitle & Active Mode Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 px-2">
          <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed max-w-2xl">
            Interactive multi-stack data structures and algorithm visualizers designed for computer science students, engineering faculty, and technical interview preparation. Built with asynchronous yielding engines to preserve thread performance.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 bg-brand-purple/10 border border-brand-purple/30 text-brand-purple rounded-md text-[10px] font-bold tracking-wider uppercase">
              FREE MODE ACTIVE
            </span>
          </div>
        </div>

        {/* 2. Unified Premium Glass Card Container */}
        <motion.div
          variants={itemVariants}
          className="bg-brand-bg-medium/30 backdrop-blur-md border border-brand-border/40 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden mb-12"
        >
          {/* Subtle Sorting Array Accent at the top of the card */}
          <div className="absolute top-0 left-0 right-0 h-[3px] flex items-end opacity-20">
            {decorativeBars.map((val, idx) => (
              <div
                key={idx}
                style={{
                  height: `${val}%`,
                  backgroundColor: idx % 2 === 0 ? "var(--color-brand-purple)" : "var(--color-brand-cyan)"
                }}
                className="flex-1 transition-all duration-500"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
            {/* Visualizers Column */}
            <div className="col-span-1">
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-brand-text-secondary mb-5 pb-2 border-b border-brand-border/30">
                Visualizers
              </h4>
              <ul className="space-y-3">
                {visualizerLinks.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-brand-text-primary/85 hover:text-brand-cyan hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="col-span-1">
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-brand-text-secondary mb-5 pb-2 border-b border-brand-border/30">
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-xs sm:text-sm hover:translate-x-1 transition-all duration-200 inline-block ${link.highlight
                        ? "text-brand-cyan font-bold hover:text-brand-purple"
                        : "text-brand-text-primary/85 hover:text-brand-cyan"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured On Column */}
            <div className="col-span-1">
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-brand-text-secondary mb-5 pb-2 border-b border-brand-border/30">
                Featured On
              </h4>
              <ul className="space-y-3">
                {mediaLinks.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-brand-text-primary/85 hover:text-brand-cyan hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 w-full"
                    >
                      <span className="truncate">{link.label}</span>
                      <svg className="w-3 h-3 opacity-30 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div className="col-span-1">
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-brand-text-secondary mb-5 pb-2 border-b border-brand-border/30">
                Connect
              </h4>
              <ul className="space-y-3">
                {connectLinks.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel={`noopener noreferrer${link.rel ? ` ${link.rel}` : ''}`}
                      className="text-xs sm:text-sm text-brand-text-primary/85 hover:text-brand-cyan hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 w-full"
                    >
                      <span className="truncate">{link.label}</span>
                      <svg className="w-3 h-3 opacity-30 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-brand-border/50 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-brand-text-secondary">
            © 2026 SortStory. All rights reserved. Built by{" "}
            <a
              href="https://adnan-mangaonkar.com"
              target="_blank"
              rel="noopener noreferrer author"
              className="text-brand-accent hover:text-brand-purple transition-colors font-bold"
            >
              Adnan Mangaonkar
            </a>
          </p>
          <div className="flex items-center gap-4">
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