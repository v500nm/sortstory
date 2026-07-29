"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Sitemap() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const sitemapData = [
    {
      title: "SortStory",
      href: "/",
      children: [
        {
          title: "Visualizers",
          children: [
            { title: "Sorting Algorithms", href: "/sort", desc: "Visualize Quick, Merge, Heap, and Radix Sort." },
            { title: "Searching", href: "/search", desc: "Linear and Binary Search visualizations." },
            { title: "Pathfinding", href: "/pathfinding", desc: "Dijkstra and A* Search on dynamic grids." },
            { title: "Linked Lists", href: "/linked-lists", desc: "Singly and Doubly Linked List interactions." },
            { title: "Trees (BST)", href: "/trees", desc: "Binary Search Tree operations and traversals." },
            { title: "Graphs", href: "/graphs", desc: "BFS and DFS network traversals." },
            { title: "Automata & ML", href: "/automata", desc: "Cellular Automata & K-Means Clustering." },
          ]
        },
        {
          title: "Resources & Curriculum",
          children: [
            { title: "Learn & Practice", href: "/learn", desc: "Step-by-step algorithms, practice problems." },
          ]
        },
        {
          title: "Legal & Meta",
          children: [
            { title: "Terms & Conditions", href: "/terms-and-conditions", desc: "Terms of using our service." },
            { title: "Privacy Policy", href: "/privacy", desc: "How we handle your data." },
            { title: "Sitemap", href: "/visual-sitemap", desc: "Visual structure of the site." },
          ]
        }
      ]
    }
  ];

  const TreeNode = ({ node, level = 0, isFirst = false, isLast = false }: { node: any, level?: number, isFirst?: boolean, isLast?: boolean }) => {
    
    // Hanging vertical layout for Leaf Nodes (Level 2+)
    if (level >= 2) {
      return (
        <motion.li variants={itemVariants} className="relative flex items-center w-full">
          {/* Horizontal branch from the vertical spine */}
          <div className="w-6 sm:w-8 h-px bg-brand-border shrink-0" />
          
          <div className="py-1.5 shrink-0">
            <Link href={node.href || "#"} className="flex items-center gap-3 p-2.5 rounded-xl bg-brand-bg-dark/60 border border-brand-border/40 hover:border-brand-accent/50 hover:bg-brand-bg-card transition-all group w-[160px] sm:w-[180px]">
              <div className="w-7 h-7 rounded flex flex-shrink-0 items-center justify-center text-brand-text-secondary group-hover:text-brand-accent bg-brand-bg-card border border-brand-border/50 shadow-sm transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-brand-text-primary group-hover:text-brand-accent transition-colors">
                  {node.title}
                </span>
              </div>
            </Link>
          </div>
        </motion.li>
      );
    }

    // Top-down layout for Main Nodes (Level 0 and 1)
    return (
      <motion.li variants={itemVariants} className="relative flex flex-col items-center px-4 sm:px-6">
        
        {/* Vertical connector coming down into this node (Level 1) */}
        {level === 1 && (
          <div className="w-px h-6 sm:h-8 bg-brand-border shrink-0" />
        )}
        
        {/* Horizontal connector piece to form the spine across siblings (Level 1) */}
        {level === 1 && (
          <div 
            className={`absolute top-0 h-px bg-brand-border`} 
            style={{ 
              left: isFirst && isLast ? '50%' : isFirst ? '50%' : 0,
              right: isFirst && isLast ? '50%' : isLast ? '50%' : 0
            }} 
          />
        )}
        
        {/* The Node Content Box */}
        <div className={`relative z-10 flex flex-col items-center justify-center bg-brand-bg-card border border-brand-border/40 hover:border-brand-accent/40 rounded-xl p-4 my-2 shrink-0 transition-all duration-300 group text-center ${level === 0 ? 'w-[200px] shadow-[0_0_20px_rgba(129,140,248,0.1)] hover:shadow-[0_0_25px_rgba(129,140,248,0.2)]' : 'w-[180px]'}`}>
          {node.href ? (
            <Link href={node.href} className="flex flex-col items-center gap-3 w-full">
              {level === 0 ? (
                <div className="w-12 h-12 rounded-xl bg-brand-bg-dark border border-brand-border flex flex-shrink-0 items-center justify-center text-brand-accent shadow-lg group-hover:scale-105 group-hover:border-brand-accent/50 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4 4 4-4M8 20V4M20 8l-4-4-4 4M16 4v16"/>
                  </svg>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-brand-bg-dark/50 border border-brand-border/50 flex flex-shrink-0 items-center justify-center text-brand-text-secondary group-hover:border-brand-accent/50 group-hover:text-brand-accent transition-all duration-300 shadow-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                  </svg>
                </div>
              )}
              <div className="flex flex-col">
                <span className={`font-bold tracking-tight ${level === 0 ? 'text-2xl text-brand-accent' : 'text-base text-brand-text-primary group-hover:text-brand-accent transition-colors'}`}>
                  {node.title}
                </span>
                {level === 0 && node.desc && (
                  <p className="text-xs text-brand-text-secondary mt-1 leading-relaxed">
                    {node.desc}
                  </p>
                )}
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex flex-shrink-0 items-center justify-center text-brand-text-secondary bg-brand-bg-dark shadow-sm border border-brand-border/30">
                 <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                </svg>
              </div>
              <span className="text-brand-text-secondary font-bold text-xs tracking-widest uppercase text-center">
                {node.title}
              </span>
            </div>
          )}
        </div>

        {/* Children Logic */}
        {node.children && (
          <div className="relative flex flex-col items-center w-full">
            {level === 0 ? (
              // Level 1 Children (Categories) -> Horizontal Row
              <>
                <div className="w-px h-6 sm:h-8 bg-brand-border shrink-0" />
                <ul className="flex flex-row relative">
                  {node.children.map((child: any, idx: number) => (
                    <TreeNode 
                      key={child.title} 
                      node={child} 
                      level={level + 1} 
                      isFirst={idx === 0}
                      isLast={idx === node.children.length - 1}
                    />
                  ))}
                </ul>
              </>
            ) : (
              // Level 2+ Children (Leafs) -> Hanging Vertical List
              <div className="relative w-full flex flex-col self-start pt-2" style={{ marginLeft: '50%' }}>
                <ul className="flex flex-col relative w-max pb-4">
                  {/* The vertical spine that children attach to */}
                  <div className="absolute left-0 top-0 bottom-6 w-px bg-brand-border" />
                  
                  {node.children.map((child: any, idx: number) => (
                    <TreeNode 
                      key={child.title} 
                      node={child} 
                      level={level + 1} 
                      isFirst={idx === 0}
                      isLast={idx === node.children.length - 1}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </motion.li>
    );
  };

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col transition-colors duration-300">
      <Header />
      
      <section className="flex-grow flex flex-col px-4 sm:px-8 py-16 lg:py-24 max-w-[1600px] mx-auto w-full relative z-10 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-brand-purple/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-text-primary mb-4">Mindmap</h1>
          <p className="text-lg text-brand-text-secondary font-medium">Explore the SortStory architecture visually.</p>
        </div>

        {/* Mindmap Container with horizontal scrolling */}
        <div className="w-full overflow-x-auto pb-12 custom-scrollbar">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-max min-w-full flex justify-center py-8 px-4"
          >
            <ul className="m-0 p-0 list-none flex flex-row">
              {sitemapData.map((node, idx) => (
                <TreeNode 
                  key={node.title} 
                  node={node} 
                  level={0} 
                  isFirst={true}
                  isLast={true}
                />
              ))}
            </ul>
          </motion.div>
        </div>

      </section>
      </main>
  );
}
