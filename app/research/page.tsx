"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";

const publications = [
  {
    id: "sortstory-architecture",
    title: "Advanced Architecture and Pedagogical Efficacy in Interactive Algorithm Visualization: A Comprehensive Analysis of the SortStory Platform",
    date: "July 2026",
    readingTime: "~15 Mins",
    category: "Architecture & Pedagogy",
    status: "Published"
  }
];

const tocSections = [
  { id: "intro", label: "1. Introduction" },
  { id: "cognitive", label: "2. Cognitive Theory" },
  { id: "stack", label: "3. Technology Stack" },
  { id: "zustand", label: "4. State Management" },
  { id: "decoupling", label: "5. Thread Decoupling" },
  { id: "multithreading", label: "6. Multithreading & Wasm" },
  { id: "sonification", label: "7. Auditory Display" },
  { id: "accessibility", label: "8. Accessibility (A11y)" },
  { id: "sorting", label: "9. Sorting Complexity" },
  { id: "pathfinding", label: "10. Pathfinding & JPS" },
  { id: "conclusion", label: "11. Conclusion" },
];

export default function ResearchPage() {
  const [viewMode, setViewMode] = useState<"list" | "document">("list");
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // IntersectionObserver ScrollSpy implementation
  useEffect(() => {
    if (viewMode !== "document") return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section enters reading area of viewport
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    tocSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [viewMode]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.08 }
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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // 130px offset matches main header (60px) + sticky mobile menu bar (50px) + breathing room
      const offset = window.innerWidth >= 1024 ? 100 : 130;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const activeSectionLabel = tocSections.find(s => s.id === activeSection)?.label || "Outline";

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col overflow-x-clip selection:bg-brand-purple/30">

      {/* Background ambient lighting */}
      <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-brand-purple/5 blur-[120px] rounded-full" />
        <div className="absolute top-[50%] right-[5%] w-[500px] h-[500px] bg-brand-cyan/5 blur-[150px] rounded-full" />
      </div>

      <Header />

      {/* Page Header */}
      <div className="border-b border-brand-border bg-black/10 py-8 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight">
              Adnan Mangaonkar's <span className="italic text-brand-purple">Research Catalog.</span>
            </h1>
            <p className="text-xs sm:text-sm text-brand-text-secondary font-mono mt-1">
              Academic publications, system architectures, and technical case studies.
            </p>
          </div>
          <div className="text-xs font-mono text-brand-text-secondary">
            Total Publications: <span className="text-brand-purple font-bold">1</span>
          </div>
        </div>
      </div>

      {/* Mobile Floating Sticky TOC Bar (floats with scroll below the header) */}
      {viewMode === "document" && (
        <div className="lg:hidden block sticky top-[57px] sm:top-[65px] z-30 w-full bg-brand-bg-dark/95 backdrop-blur-md border-b border-brand-border/60 shadow-lg">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => {
                setViewMode("list");
                setMobileMenuOpen(false);
              }}
              className="text-[11px] font-mono text-brand-purple hover:text-brand-cyan transition-colors flex items-center gap-1 font-bold"
            >
              ← Back
            </button>

            <span className="text-xs font-mono font-bold text-brand-text-primary max-w-[200px] truncate">
              {activeSectionLabel}
            </span>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xs font-mono text-brand-cyan hover:text-brand-purple transition-colors border border-brand-cyan/30 px-2.5 py-1 rounded bg-brand-cyan/5 flex items-center gap-1 font-bold"
            >
              Menu {mobileMenuOpen ? "▲" : "▼"}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="border-t border-brand-border/30 max-h-[300px] overflow-y-auto bg-brand-bg-dark/98"
              >
                <nav className="flex flex-col p-4 space-y-1">
                  {tocSections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left py-2 px-3 rounded-lg text-xs font-mono transition-all border-l-2 ${isActive
                            ? "bg-brand-purple/10 border-brand-purple text-brand-text-primary font-bold pl-4"
                            : "border-transparent text-brand-text-secondary hover:text-brand-text-primary hover:bg-white/5"
                          }`}
                      >
                        {section.label}
                      </button>
                    );
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="flex-grow max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

        {/* Desktop Sidebar (Floating vertical list index or Table of Contents) - Hidden on mobile */}
        <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="bg-brand-bg-medium/30 backdrop-blur-md border border-brand-border/60 rounded-2xl p-6 shadow-xl overflow-hidden min-h-[300px] transition-all duration-300">

            <AnimatePresence mode="wait">
              {viewMode === "list" ? (
                <motion.div
                  key="list-mode"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-text-secondary mb-4 border-b border-brand-border pb-2 font-mono">
                    Publications Index
                  </h3>

                  {publications.map((paper) => (
                    <button
                      key={paper.id}
                      onClick={() => setViewMode("document")}
                      className="w-full text-left p-4 rounded-xl border border-brand-border/40 hover:border-brand-purple bg-transparent hover:bg-brand-purple/5 text-brand-text-secondary hover:text-brand-text-primary transition-all duration-300 flex flex-col gap-2 relative overflow-hidden group shadow-sm"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">
                          {paper.category}
                        </span>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded border bg-brand-green/10 border-brand-green/20 text-brand-green">
                          {paper.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-serif font-bold leading-snug group-hover:text-brand-text-primary transition-colors">
                        {paper.title}
                      </h4>

                      <div className="flex items-center justify-between text-[10px] font-mono text-brand-text-secondary/70 mt-1">
                        <span>{paper.date}</span>
                        <span>{paper.readingTime}</span>
                      </div>

                      <div className="mt-3 text-xs font-mono text-brand-purple flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Click to Read Paper →
                      </div>
                    </button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="toc-mode"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-brand-border pb-2 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-text-secondary font-mono">
                      Table of Contents
                    </h3>
                    <button
                      onClick={() => setViewMode("list")}
                      className="text-[11px] font-mono text-brand-purple hover:text-brand-cyan transition-colors flex items-center gap-1"
                    >
                      ← Back
                    </button>
                  </div>

                  <nav className="space-y-1.5 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                    {tocSections.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left py-2 px-3 rounded-lg text-xs font-mono transition-all border-l-2 ${isActive
                              ? "bg-brand-purple/10 border-brand-purple text-brand-text-primary font-bold pl-4"
                              : "border-transparent text-brand-text-secondary hover:text-brand-text-primary hover:bg-white/5"
                            }`}
                        >
                          {section.label}
                        </button>
                      );
                    })}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* Right Pane - Full Active Article */}
        <div className="lg:col-span-8 relative">

          <AnimatePresence mode="wait">
            {viewMode === "list" ? (
              <motion.div
                key="abstract-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-brand-bg-card border border-brand-border p-8 rounded-2xl shadow-xl flex flex-col gap-6"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan">
                  <span>Selected Paper</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight leading-tight">
                  Advanced Architecture and Pedagogical Efficacy in Interactive Algorithm Visualization: <span className="italic text-brand-purple">A Comprehensive Analysis of the SortStory Platform</span>
                </h2>

                <div className="flex items-center gap-4 text-xs font-mono text-brand-text-secondary">
                  <span>Author: Adnan Mangaonkar</span>
                  <span>•</span>
                  <span>Published: July 2026</span>
                </div>

                <p className="text-base text-brand-text-secondary leading-relaxed font-serif italic border-l-2 border-brand-purple pl-4">
                  "The landscape of interactive educational software is perpetually challenged by the need to effectively translate abstract mathematical and computational concepts into intuitive, digestible formats. The SortStory project represents a critical evolution in the architecture and delivery of interactive algorithm visualization..."
                </p>

                <button
                  onClick={() => setViewMode("document")}
                  className="py-4 px-6 bg-brand-purple hover:bg-brand-purple/80 text-brand-text-primary font-bold font-mono tracking-widest uppercase rounded-xl transition-all shadow-md mt-4 text-center text-xs"
                >
                  Read Full Research Paper
                </button>
              </motion.div>
            ) : (
              <motion.article
                key="document-view"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
              >
                {/* Article Header */}
                <motion.header variants={itemVariants} className="border-b border-brand-border/60 pb-8">
                  <div className="inline-block bg-brand-purple/10 text-brand-purple border border-brand-purple/20 px-3 py-1 rounded-full text-xs font-mono mb-4">
                    Active Publication View
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tighter leading-tight mb-6">
                    Advanced Architecture and Pedagogical Efficacy in Interactive Algorithm Visualization: <span className="italic text-brand-cyan">A Comprehensive Analysis of the SortStory Platform</span>
                  </h2>
                  <div className="flex flex-wrap items-center gap-6 text-xs text-brand-text-secondary font-mono">
                    <div>
                      <span className="text-brand-text-primary">Author:</span> Adnan Shafiq Mangaonkar
                    </div>
                    <div>
                      <span className="text-brand-text-primary">Published:</span> July 2026
                    </div>
                    <div>
                      <span className="text-brand-text-primary">Reading Time:</span> ~15 Mins
                    </div>
                  </div>
                </motion.header>

                {/* Abstract */}
                <motion.div variants={itemVariants} className="bg-brand-bg-medium/40 backdrop-blur-md border border-brand-border/40 rounded-2xl p-6 sm:p-8 shadow-xl">
                  <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-cyan mb-3 font-mono">Abstract</h3>
                  <p className="text-base sm:text-lg leading-relaxed text-brand-text-secondary font-serif italic">
                    The landscape of interactive educational software is perpetually challenged by the need to effectively translate abstract mathematical and computational concepts into intuitive, digestible formats. The SortStory project represents a critical evolution in the architecture and delivery of interactive algorithm visualization. Operating from an open-source repository foundation, the platform amalgamates contemporary frontend engineering paradigms with rigorous pedagogical frameworks to demystify complex sorting and pathfinding algorithms. This analysis deconstructs the SortStory architecture, evaluating its technological stack, state management mechanisms, multithreaded rendering pipelines, parameter mapping sonification, accessibility implementations, and advanced algorithmic feature sets.
                  </p>
                </motion.div>

                {/* Article Body */}
                <div className="space-y-12 text-left">

                  {/* Section 1 */}
                  <motion.section id="intro" variants={itemVariants} className="space-y-4 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      Introduction & Cognitive Deficit Resolution
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      Traditional approaches to teaching computational algorithms rely heavily on static textbook diagrams or pseudocode. These legacy methods consistently fail to capture the dynamic, temporal nature of state changes, memory allocation, and pointer manipulation. SortStory addresses this educational deficit by transforming algorithmic execution into a highly interactive, animated experience. It achieves this by bridging high-performance rendering techniques—such as HTML5 Canvas, hardware-accelerated CSS, and WebAssembly—with modern reactive user interface frameworks.
                    </p>
                  </motion.section>

                  {/* Section 2: Cognitive Theory */}
                  <motion.section id="cognitive" variants={itemVariants} className="space-y-6 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      Cognitive Theory of Multimedia Learning in Visualization Design
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      The architectural and design choices within the SortStory platform are deeply rooted in the Cognitive Theory of Multimedia Learning, pioneered by Richard E. Mayer. Mayer's theory posits that the human information-processing system consists of dual channels for visual/pictorial and auditory/verbal processing, both of which possess strictly limited capacities. When a learner is subjected to a complex algorithmic visualization, the risk of cognitive overload is exceptionally high.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-bg-medium/20 shadow-sm">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-black/20 dark:bg-white/5 border-b border-brand-border text-brand-text-primary text-xs font-mono uppercase tracking-wider">
                            <th className="p-4 font-bold">Mayer's Principle</th>
                            <th className="p-4 font-bold">Definition</th>
                            <th className="p-4 font-bold">Implementation in SortStory</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm text-brand-text-secondary divide-y divide-brand-border/30">
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-purple font-serif">Segmenting Principle</td>
                            <td className="p-4">Learning is enhanced when a multimedia message is presented in user-paced segments rather than a continuous stream.</td>
                            <td className="p-4">Users can pause, step forward, and step backward. Generator functions yield control at discrete steps.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-purple font-serif">Signaling Principle</td>
                            <td className="p-4">People learn better when essential words or images are highlighted to guide attention.</td>
                            <td className="p-4">Dynamic color-coding directs attention to the exact spatial coordinates where state mutation is occurring.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-purple font-serif">Spatial Contiguity</td>
                            <td className="p-4">Presenting corresponding words and pictures near each other reduces cognitive integration effort.</td>
                            <td className="p-4">Real-time performance metrics (swaps, accesses, heuristic values) are overlaid directly adjacent to elements.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-purple font-serif">Coherence Principle</td>
                            <td className="p-4">Learning is improved when extraneous material is excluded.</td>
                            <td className="p-4">Design token system enforces a minimalist interface devoid of superfluous decorative animations.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-purple font-serif">Temporal Contiguity</td>
                            <td className="p-4">Displaying related words, imagery, and audio simultaneously supports better comprehension.</td>
                            <td className="p-4">Visual state changes are perfectly synchronized with auditory sonification and metric updates.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.section>

                  {/* Section 3: Architecture Stack */}
                  <motion.section id="stack" variants={itemVariants} className="space-y-6 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      Architectural Paradigm and Frontend Technology Stack
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      Visualizing algorithms requires rendering hundreds or thousands of elements at 60 to 120 frames per second. Achieving this necessitates a highly optimized technology stack capable of bypassing traditional browser layout and rendering bottlenecks.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-bg-medium/20 shadow-sm">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-black/20 dark:bg-white/5 border-b border-brand-border text-brand-text-primary text-xs font-mono uppercase tracking-wider">
                            <th className="p-4 font-bold">Architectural Layer</th>
                            <th className="p-4 font-bold">Technology Selected</th>
                            <th className="p-4 font-bold">Strategic Rationale</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm text-brand-text-secondary divide-y divide-brand-border/30">
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan">Core Framework</td>
                            <td className="p-4 font-mono text-xs">React 19.x</td>
                            <td className="p-4">Leverages the React Compiler for automated memoization, preventing unnecessary re-renders.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan">Build System</td>
                            <td className="p-4 font-mono text-xs">Vite (7.x)</td>
                            <td className="p-4">Native ES module support provides instantaneous HMR, accelerating the developer loop.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan">State Management</td>
                            <td className="p-4 font-mono text-xs">Zustand</td>
                            <td className="p-4">A minimal API that avoids boilerplate while providing fine-grained, selector-based reactivity.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan">Animation Engine</td>
                            <td className="p-4 font-mono text-xs">Framer Motion</td>
                            <td className="p-4">Declarative syntax for hardware-accelerated CSS transitions, bypassing layout recalculations.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan">Rendering Pipeline</td>
                            <td className="p-4 font-mono text-xs">HTML5 Canvas / Web Workers</td>
                            <td className="p-4">Canvas is utilized for pathfinding grids, while Web Workers decouple rendering from the main thread.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.section>

                  {/* Section 4: Zustand Advantage */}
                  <motion.section id="zustand" variants={itemVariants} className="space-y-4 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      Advanced State Management Dynamics: The Zustand Advantage
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      Visualizing a sorting algorithm on an array of a thousand elements requires tracking tens of thousands of consecutive operations. Zustand permits direct state manipulation while maintaining immutability under the hood. Crucially, Zustand allows components to subscribe to highly specific slices of state using selectors. When an array element's value changes, only the specific React component observing that precise element's index is re-rendered, rather than the entire array container. Furthermore, Zustand facilitates transient updates, enabling the application to update state variables and read them within the animation loop without triggering a React render cycle at all.
                    </p>
                  </motion.section>

                  {/* Section 5: Thread Decoupling */}
                  <motion.section id="decoupling" variants={itemVariants} className="space-y-6 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      High-Performance Rendering Pipelines and Thread Decoupling
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      To maintain a strict 16.67-millisecond frame budget required for smooth 60 FPS rendering, the architecture employs aggressive thread management and scheduling APIs.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-bg-medium/20 shadow-sm">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-black/20 dark:bg-white/5 border-b border-brand-border text-brand-text-primary text-xs font-mono uppercase tracking-wider">
                            <th className="p-4 font-bold">Scheduling API</th>
                            <th className="p-4 font-bold">Execution Timing</th>
                            <th className="p-4 font-bold">Primary Use Case in Visualization</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm text-brand-text-secondary divide-y divide-brand-border/30">
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-purple">requestAnimationFrame</td>
                            <td className="p-4">Immediately prior to the next browser repaint.</td>
                            <td className="p-4">Synchronizing array swaps and color transitions with physical monitor refresh rates.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-purple">requestIdleCallback</td>
                            <td className="p-4">During browser idle time when the main thread is empty.</td>
                            <td className="p-4">Executing non-urgent background tasks, such as generating analytical telemetry logs.</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-purple">useDeferredValue</td>
                            <td className="p-4">Scheduled as a low-priority, interruptible React render.</td>
                            <td className="p-4">Updating heavy statistical charts or complex metric tables without blocking slider inputs.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.section>

                  {/* Section 6 & 7 */}
                  <motion.section id="multithreading" variants={itemVariants} className="space-y-4 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      Multithreading and the WebAssembly (Wasm) Horizon
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      As grid sizes expand, rendering thousands of elements becomes expensive. The platform leverages the <strong>OffscreenCanvas API</strong> paired with Web Workers, fundamentally decoupling the rendering pipeline from the DOM.
                    </p>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      By compiling core algorithmic logic from lower-level, memory-safe languages like Rust into <strong>WebAssembly (Wasm)</strong> binaries, the application achieves near-native execution speeds. Wasm fundamentally alters the performance profile by eliminating the micro-stutters associated with JavaScript's Garbage Collection (GC) pauses, utilizing flat, linear memory space managed manually.
                    </p>
                  </motion.section>

                  {/* Section 8: Sonification */}
                  <motion.section id="sonification" variants={itemVariants} className="space-y-4 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      Auditory Display and Parameter Mapping Sonification
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      Utilizing the native browser Web Audio API, the application dynamically generates audio frequencies corresponding to algorithmic states. Individual <code>OscillatorNode</code> objects are manipulated in real time. When a sorting algorithm accesses an array index, the numerical value is normalized and mapped to a specific pitch frequency. An unsorted array produces chaotic, dissonant noise, while a sorted array resolves into a smooth, ascending chromatic scale. Distinct operations are assigned unique timbres (e.g., sine waves for read, square waves for write), allowing users to perceive the efficiency of an algorithm entirely through sound.
                    </p>
                  </motion.section>

                  {/* Section 9: Accessibility */}
                  <motion.section id="accessibility" variants={itemVariants} className="space-y-4 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      Accessibility (A11y) in Complex Visualizations
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      To resolve semantic limits of Canvas bitmaps, the application employs a <strong>"fallback DOM"</strong> behind the canvas that exposes structured nodes to the browser's Accessibility Object Model (AOM). We dynamically update this hidden DOM using <code>aria-live="polite"</code> for regular algorithmic steps and <code>aria-live="assertive"</code> for completion state events, ensuring assistive technologies like screen readers can narrate sorting operations in real time.
                    </p>
                  </motion.section>

                  {/* Section 10: Sorting complexity table */}
                  <motion.section id="sorting" variants={itemVariants} className="space-y-6 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      Sorting Algorithms: Complexity Matrix
                    </h3>

                    <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-bg-medium/20 shadow-sm">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-black/20 dark:bg-white/5 border-b border-brand-border text-brand-text-primary text-xs font-mono uppercase tracking-wider">
                            <th className="p-4 font-bold">Sorting Algorithm</th>
                            <th className="p-4 font-bold">Best Case</th>
                            <th className="p-4 font-bold">Average Case</th>
                            <th className="p-4 font-bold">Worst Case</th>
                            <th className="p-4 font-bold">Space Complexity</th>
                            <th className="p-4 font-bold">Stability</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm text-brand-text-secondary divide-y divide-brand-border/30">
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan font-serif">Bubble Sort</td>
                            <td className="p-4 font-mono text-xs">O(N)</td>
                            <td className="p-4 font-mono text-xs">O(N²)</td>
                            <td className="p-4 font-mono text-xs">O(N²)</td>
                            <td className="p-4 font-mono text-xs">O(1)</td>
                            <td className="p-4 text-brand-green font-bold">Stable</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan font-serif">Selection Sort</td>
                            <td className="p-4 font-mono text-xs">O(N²)</td>
                            <td className="p-4 font-mono text-xs">O(N²)</td>
                            <td className="p-4 font-mono text-xs">O(N²)</td>
                            <td className="p-4 font-mono text-xs">O(1)</td>
                            <td className="p-4 text-brand-rose font-bold">Unstable</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan font-serif">Insertion Sort</td>
                            <td className="p-4 font-mono text-xs">O(N)</td>
                            <td className="p-4 font-mono text-xs">O(N²)</td>
                            <td className="p-4 font-mono text-xs">O(N²)</td>
                            <td className="p-4 font-mono text-xs">O(1)</td>
                            <td className="p-4 text-brand-green font-bold">Stable</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan font-serif">Merge Sort</td>
                            <td className="p-4 font-mono text-xs">O(N log N)</td>
                            <td className="p-4 font-mono text-xs">O(N log N)</td>
                            <td className="p-4 font-mono text-xs">O(N log N)</td>
                            <td className="p-4 font-mono text-xs">O(N)</td>
                            <td className="p-4 text-brand-green font-bold">Stable</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan font-serif">Quick Sort</td>
                            <td className="p-4 font-mono text-xs">O(N log N)</td>
                            <td className="p-4 font-mono text-xs">O(N log N)</td>
                            <td className="p-4 font-mono text-xs">O(N²)</td>
                            <td className="p-4 font-mono text-xs">O(log N)</td>
                            <td className="p-4 text-brand-rose font-bold">Unstable</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-brand-cyan font-serif">Heap Sort</td>
                            <td className="p-4 font-mono text-xs">O(N log N)</td>
                            <td className="p-4 font-mono text-xs">O(N log N)</td>
                            <td className="p-4 font-mono text-xs">O(N log N)</td>
                            <td className="p-4 font-mono text-xs">O(1)</td>
                            <td className="p-4 text-brand-rose font-bold">Unstable</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.section>

                  {/* Section 11: Pathfinding */}
                  <motion.section id="pathfinding" variants={itemVariants} className="space-y-6 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight border-b border-brand-border pb-2">
                      Advanced Pathfinding Algorithms and State-Space Pruning
                    </h3>

                    <h4 className="text-lg font-bold text-brand-purple">A* Algorithm & Admissible Heuristics</h4>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      The A* algorithm evaluates nodes based on the best-first priority queue function:
                    </p>
                    <div className="bg-black/20 dark:bg-white/5 border border-brand-border p-4 rounded-xl text-center font-mono text-lg text-brand-cyan">
                      f(n) = g(n) + h(n)
                    </div>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      For A* to guarantee shortest-path optimality, the heuristic function <code>h(n)</code> must be strictly admissible (never overestimating the true cost). The platform supports <strong>Manhattan Distance</strong>, <strong>Diagonal Distance (Chebyshev)</strong>, and <strong>Euclidean Distance</strong>.
                    </p>

                    <h4 className="text-lg font-bold text-brand-purple">Symmetry Breaking with Jump Point Search (JPS)</h4>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      To optimize uniform grid searches, the platform implements Jump Point Search (JPS), an online state-space pruning method. JPS identifies path symmetries and skips over uniform areas by tracking "forced neighbors" next to obstacles, pruning search expansions by 10x to 30x.
                    </p>

                    <h4 className="text-lg font-bold text-brand-purple">Hierarchical Pathfinding A* (HPA*)</h4>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      HPA* demonstrates real-world gaming/logistics engineering at scale. It clusters the grid into local chunks (e.g., 10x10), pre-computes boundary crossings, and routes path searches across high-level abstract coordinates, achieving staggering latency gains over classic uninformed traversals.
                    </p>
                  </motion.section>

                  {/* Conclusion */}
                  <motion.section id="conclusion" variants={itemVariants} className="space-y-4 pt-4 border-t border-brand-border/60 scroll-mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-brand-cyan">
                      Conclusion
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-serif">
                      The architecture of this interactive visualization platform represents a highly refined intersection of modern frontend engineering, computational mathematics, cognitive psychology, and accessibility standards. By leveraging a high-performance technology stack—including React 19, Zustand state management, and strict requestAnimationFrame orchestration—the platform successfully isolates the heavy mathematical processing of algorithmic graph traversals and array permutations from the main user interface thread, establishing a robust foundation for modern web-based CS pedagogy.
                    </p>
                  </motion.section>

                </div>
              </motion.article>
            )}
          </AnimatePresence>

        </div>

      </div>

    </main>
  );
}
