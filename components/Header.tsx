"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, fontMeta, StackLanguage } from "@/contexts/LanguageContext";
import PlansModal from "@/components/PlansModal";
import LoginModal from "@/components/LoginModal";

export default function Header() {
  const pathname = usePathname();
  const { isLoggedIn, isAdmin, logout, siteMode } = useAuth();
  const { language, setLanguage } = useLanguage();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Line 1 Main Menu Links
  const mainNavLinks = [
    { href: "/learn", label: "Learn" },
    { href: "/sort", label: "Visualizers" },
    { href: "/research", label: "Research" },
    { href: "/press", label: "Press" },
  ];

  // Line 2 Floating Submenu Module Links
  const subNavLinks = [
    { href: "/sort", label: "Sorting", icon: "📊" },
    { href: "/search", label: "Searching", icon: "🔍" },
    { href: "/pathfinding", label: "Pathfinding", icon: "🗺️" },
    { href: "/linked-lists", label: "Linked Lists", icon: "🔗" },
    { href: "/trees", label: "Trees", icon: "🌲" },
    { href: "/graphs", label: "Graphs", icon: "🕸️" },
    { href: "/automata", label: "Automata & ML", icon: "🤖" },
  ];

  // If siteMode is free_all, plans are down and not needed
  const isFreeMode = siteMode === "free_all";

  // Hide 2nd line submenu on landing page (pathname === "/")
  const showSecondLineSubmenu = pathname !== "/";

  return (
    <>
      <header className="border-b border-brand-border bg-brand-bg-dark/80 backdrop-blur-xl sticky top-0 z-40">
        {/* Tier 1 Main Header Bar */}
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black font-serif tracking-tight text-brand-text-primary hover:text-brand-accent transition-colors flex items-center gap-2 group">
            <img 
              src="/assets/favicon-32x32.png" 
              alt="SortStory Logo" 
              className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="italic text-brand-purple">Sort</span>Story
          </Link>
          
          {/* Main Desktop Tier 1 Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainNavLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-purple after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${pathname === link.href ? 'text-brand-text-primary after:scale-x-100' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-brand-border">
                {isAdmin && (
                  <Link 
                    href="/admin" 
                    className="px-3 py-1 bg-brand-purple/20 text-brand-purple border border-brand-purple/40 rounded-full text-[11px] font-bold font-mono uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-colors"
                  >
                    ⚡ Admin Workspace
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="text-xs font-mono font-bold text-brand-rose hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-brand-border">
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="text-xs font-bold font-mono uppercase tracking-widest text-brand-text-secondary hover:text-brand-text-primary transition-colors"
                >
                  Log In
                </button>

                {/* Show View Plans only if plans are active (not in Free Mode) */}
                {!isFreeMode && (
                  <button 
                    onClick={() => setIsPlansOpen(true)}
                    className="px-4 py-1.5 bg-brand-purple/10 border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white transition-colors rounded-full text-xs font-bold font-mono uppercase tracking-widest"
                  >
                    View Plans
                  </button>
                )}
              </div>
            )}
            
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
              className="ml-2 p-2 rounded-full hover:bg-brand-border transition-colors text-brand-text-secondary hover:text-brand-accent"
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
            {!isLoggedIn && !isFreeMode && (
              <button 
                onClick={() => setIsPlansOpen(true)}
                className="px-3 py-1 bg-brand-purple/10 border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white transition-colors rounded-full text-[10px] font-bold font-mono uppercase tracking-widest mr-2"
              >
                Plans
              </button>
            )}
            
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

        {/* Tier 2 Secondary Submenu Floating Line (Hidden on Landing Page `/`) */}
        {showSecondLineSubmenu && (
          <div className="bg-brand-bg-card/50 border-t border-brand-border/40 py-2 px-4 sm:px-6 overflow-x-auto">
            <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-6 text-xs font-mono">
              {/* Left Side: Module Links */}
              <div className="flex items-center gap-6 shrink-0">
                <span className="text-brand-purple font-bold flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  MODULES:
                </span>
                {subNavLinks.map((sub) => (
                  <Link 
                    key={sub.href}
                    href={sub.href}
                    className={`transition-colors flex items-center gap-1.5 shrink-0 ${pathname === sub.href ? 'text-brand-cyan font-bold underline' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.label}</span>
                  </Link>
                ))}
              </div>

              {/* Right Side: Stack Language Selector Dropdown */}
              <div className="flex items-center gap-2 pl-4 border-l border-brand-border/40 shrink-0">
                <span className="text-brand-purple font-bold flex items-center gap-1">
                  ⚡ STACK:
                </span>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as StackLanguage)}
                  className="bg-brand-bg-dark border border-brand-border rounded-lg px-2.5 py-1 text-xs text-brand-cyan font-bold outline-none cursor-pointer hover:border-brand-purple transition-colors font-mono"
                >
                  {fontMeta.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.icon} {l.name} ({l.extension})
                    </option>
                  ))}
                </select>

                {isFreeMode && (
                  <span className="text-[10px] font-bold text-brand-green bg-brand-green/10 border border-brand-green/30 px-2 py-0.5 rounded-md shrink-0 ml-2">
                    🎁 Free
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Secondary Admin Submenu Bar if Logged in as Admin */}
        {isAdmin && (
          <div className="bg-brand-purple/10 border-t border-brand-purple/20 py-2 px-4 sm:px-6">
            <div className="max-w-[1700px] mx-auto flex items-center justify-between overflow-x-auto text-[11px] font-mono">
              <div className="flex items-center gap-6">
                <Link 
                  href="/" 
                  className="px-2.5 py-1 bg-brand-purple/20 border border-brand-purple/40 text-brand-purple hover:bg-brand-purple hover:text-white transition-colors rounded-lg font-bold flex items-center gap-1 shrink-0"
                >
                  ← Back to Main Site
                </Link>
                <span className="text-brand-text-secondary font-bold shrink-0">ADMIN:</span>
                <Link href="/admin?tab=overview" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors shrink-0">
                  📊 System Overview
                </Link>
                <Link href="/admin?tab=site_analytics" className="text-amber-400 font-bold hover:underline transition-colors shrink-0">
                  🧠 AI Site Analytics
                </Link>
                <Link href="/admin?tab=plan_manager" className="text-brand-cyan font-bold hover:underline transition-colors shrink-0">
                  ⚙️ Plan Manager
                </Link>
                <Link href="/admin?tab=applications" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors shrink-0">
                  📋 Applications
                </Link>
                <Link href="/admin?tab=codes" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors shrink-0">
                  🔑 Code Generator
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-brand-bg-dark/95 backdrop-blur-xl border-b border-brand-border absolute w-full left-0 top-full shadow-2xl overflow-hidden z-50"
          >
            <nav className="flex flex-col px-6 py-6 space-y-3">
              {/* Stack Language Mobile Selector */}
              <div className="flex items-center justify-between pb-3 border-b border-brand-border/40 font-mono text-xs">
                <span className="text-brand-purple font-bold">⚡ Preferred Language:</span>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as StackLanguage)}
                  className="bg-brand-bg-dark border border-brand-border rounded-lg px-2 py-1 text-xs text-brand-cyan font-bold outline-none"
                >
                  {fontMeta.map(l => (
                    <option key={l.id} value={l.id}>{l.icon} {l.name}</option>
                  ))}
                </select>
              </div>

              <div className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest mb-1">Main Menu</div>
              {mainNavLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={closeMenu}
                  className={`text-sm font-semibold tracking-wide block transition-colors py-1.5 ${pathname === link.href ? 'text-brand-purple' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest pt-3 border-t border-brand-border/40">Visualizer Modules</div>
              {subNavLinks.map((sub) => (
                <Link 
                  key={sub.href}
                  href={sub.href}
                  onClick={closeMenu}
                  className="text-xs font-mono text-brand-text-secondary hover:text-brand-text-primary py-1 flex items-center gap-2"
                >
                  <span>{sub.icon}</span>
                  <span>{sub.label}</span>
                </Link>
              ))}

              {isLoggedIn ? (
                <div className="pt-4 flex items-center justify-between border-t border-brand-border/40">
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      onClick={closeMenu}
                      className="text-xs font-mono font-bold text-brand-purple uppercase"
                    >
                      ⚡ Admin Workspace
                    </Link>
                  )}
                  <button 
                    onClick={() => { logout(); closeMenu(); }}
                    className="text-xs font-mono text-brand-rose"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setIsLoginOpen(true); closeMenu(); }}
                  className="text-sm font-semibold tracking-wide block transition-colors pt-3 text-brand-text-primary text-left border-t border-brand-border/40"
                >
                  Log In
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
