"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/learn", label: "Learn" },
    { href: "/sort", label: "Sorting" },
    { href: "/search", label: "Searching" },
    { href: "/pathfinding", label: "Pathfinding" },
    { href: "/linked-lists", label: "Linked Lists" },
    { href: "/trees", label: "Trees" },
    { href: "/graphs", label: "Graphs" },
    { href: "/automata", label: "Automata & ML" },
  ];

  return (
    <header className="border-b border-brand-border bg-brand-bg-dark/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black font-serif tracking-tight text-brand-text-primary hover:text-brand-accent transition-colors flex items-center gap-2 group">
          <img 
            src="/assets/favicon-32x32.png" 
            alt="SortStory Logo" 
            className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="italic text-brand-purple">Sort</span>Story
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-purple after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${pathname === link.href ? 'text-brand-text-primary after:scale-x-100' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
            >
              {link.label}
            </Link>
          ))}
          
          <button 
            onClick={() => {
              const html = document.documentElement;
              if (html.classList.contains('light')) {
                html.classList.remove('light');
                localStorage.setItem('theme', 'dark');
              } else {
                html.classList.add('light');
                localStorage.setItem('theme', 'light');
              }
            }}
            className="ml-4 p-2 rounded-full hover:bg-brand-border transition-colors text-brand-text-secondary hover:text-brand-accent"
            title="Toggle Theme"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </button>
          <div className="hidden sm:flex items-center ml-2 pl-4 border-l border-brand-border h-6">
            <a 
              href="https://adnan-mangaonkar.com" 
              target="_blank" 
              rel="author noopener noreferrer"
              className="text-[10px] font-bold tracking-widest uppercase text-brand-text-secondary hover:text-brand-purple transition-colors flex items-center gap-1.5"
              title="Adnan Mangaonkar"
            >
              <span className="w-4 h-4 rounded-full bg-brand-bg-card border border-brand-border flex items-center justify-center text-brand-accent shadow-sm">
                A
              </span>
              <span className="hidden lg:inline">Adnan M.</span>
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button 
            onClick={() => {
              const html = document.documentElement;
              if (html.classList.contains('light')) {
                html.classList.remove('light');
                localStorage.setItem('theme', 'dark');
              } else {
                html.classList.add('light');
                localStorage.setItem('theme', 'light');
              }
            }}
            className="p-2 rounded-full hover:bg-brand-border transition-colors text-brand-text-secondary hover:text-brand-accent"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </button>
          
          <button onClick={toggleMenu} className="p-2 text-brand-text-secondary hover:text-brand-accent">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-brand-bg-dark/95 backdrop-blur-xl border-b border-brand-border absolute w-full left-0 top-full shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  key={link.href}
                >
                  <Link 
                    href={link.href} 
                    onClick={closeMenu}
                    className={`text-base font-semibold tracking-wide block transition-colors py-2 border-b border-brand-border/30 ${pathname === link.href ? 'text-brand-purple' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.04 }}
                className="pt-4 flex items-center justify-between"
              >
                <a 
                  href="https://adnan-mangaonkar.com" 
                  target="_blank" 
                  rel="author noopener noreferrer"
                  className="text-xs font-bold tracking-widest uppercase text-brand-text-secondary hover:text-brand-purple transition-colors flex items-center gap-2"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-bg-card border border-brand-border flex items-center justify-center text-brand-accent shadow-sm">
                    A
                  </span>
                  <span>Adnan Mangaonkar</span>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
