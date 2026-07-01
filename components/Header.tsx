"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
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
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-brand-accent hover:opacity-80 transition-opacity flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
            <path d="M4 16l4 4 4-4M8 20V4M20 8l-4-4-4 4M16 4v16"/>
          </svg>
          SortStory
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`text-sm font-medium transition-colors ${pathname === link.href ? 'text-brand-accent' : 'text-brand-text-secondary hover:text-brand-accent'}`}
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
              rel="noopener noreferrer"
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
      {isMenuOpen && (
        <div className="lg:hidden bg-brand-bg-dark border-b border-brand-border absolute w-full left-0 top-[full] shadow-xl">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={closeMenu}
                className={`text-base font-medium transition-colors ${pathname === link.href ? 'text-brand-accent' : 'text-brand-text-secondary hover:text-brand-accent'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-brand-border/50">
              <a 
                href="https://adnan-mangaonkar.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold tracking-widest uppercase text-brand-text-secondary hover:text-brand-purple transition-colors flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-brand-bg-card border border-brand-border flex items-center justify-center text-brand-accent shadow-sm">
                  A
                </span>
                <span>Adnan Mangaonkar</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
