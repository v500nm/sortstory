"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, fontMeta, StackLanguage } from "@/contexts/LanguageContext";
import PlansModal from "@/components/PlansModal";
import LoginModal from "@/components/LoginModal";
import FreeTierModal from "@/components/FreeTierModal";

export default function Header() {
  const pathname = usePathname();
  const { isLoggedIn, isAdmin, logout, siteMode } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isFreeTierOpen, setIsFreeTierOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Line 1 Main Menu Links
  const mainNavLinks = [
    { href: "/learn", label: "Learn" },
    { href: "/sort", label: "Visualizers" },
    { href: "/research", label: "Research" },
    { href: "/press", label: "Press" },
  ];

  // Line 2 Floating Submenu Visualizer Module Links
  const subNavLinks = [
    { href: "/sort", label: "Sorting" },
    { href: "/search", label: "Searching" },
    { href: "/pathfinding", label: "Pathfinding" },
    { href: "/linked-lists", label: "Linked Lists" },
    { href: "/trees", label: "Trees" },
    { href: "/graphs", label: "Graphs" },
    { href: "/automata", label: "Automata & ML" },
  ];

  // Line 2 Floating Submenu Learn Links for Learn Pages
  const learnSubNavLinks = [
    { href: "/learn", label: "Overview" },
    { href: "/learn#searching", label: "Searching" },
    { href: "/learn#sorting", label: "Sorting" },
    { href: "/learn#linked-lists", label: "Linked Lists" },
    { href: "/learn#trees", label: "Trees" },
    { href: "/learn#graphs", label: "Graphs" },
    { href: "/learn#pathfinding", label: "Pathfinding" },
    { href: "/learn#automata", label: "Automata" },
  ];

  // If siteMode is free_all, plans are down and not needed
  const isFreeMode = siteMode === "free_all";

  // Check if current page is in the Learn section
  const isLearnPage = pathname.startsWith("/learn");

  // Hide 2nd line submenu on pages with no sub-modules (Landing, Research, Press, etc.)
  const isNoSubmenuPage = 
    pathname === "/" ||
    pathname.startsWith("/research") ||
    pathname.startsWith("/press") ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/visual-sitemap");

  const showSecondLineSubmenu = !isNoSubmenuPage;

  return (
    <>
      <header className="border-b border-brand-border/60 bg-brand-bg-dark/80 backdrop-blur-xl sticky top-0 z-[60] relative">
        {/* Shimmering gradient top-border accent */}
        <div className="gradient-line absolute top-0 left-0 right-0 z-50 opacity-80" />

        {/* Tier 1 Main Header Bar */}
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black font-serif tracking-tight text-brand-text-primary hover:text-brand-accent transition-colors flex items-center gap-2.5 group">
            <motion.img
              src="/assets/favicon-32x32.png"
              alt="SortStory Logo"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-6 h-6 object-contain"
            />
            <span><span className="italic text-brand-purple">Sort</span>Story</span>
          </Link>

          {/* Main Desktop Tier 1 Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors relative py-1.5 px-1 ${
                    isActive ? 'text-brand-text-primary' : 'text-brand-text-secondary hover:text-brand-text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="headerActiveIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full shadow-[0_0_8px_rgba(129,140,248,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {isLoggedIn ? (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-brand-border">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="px-3 py-1 bg-brand-purple/20 text-brand-purple border border-brand-purple/40 rounded-full text-[11px] font-bold font-mono uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-colors"
                  >
                    Admin Workspace
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
                className="px-3 py-1 bg-brand-purple/10 border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white transition-colors rounded-full text-[10px] font-bold font-mono uppercase tracking-widest mr-1"
              >
                Plans
              </button>
            )}

            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2 text-brand-text-secondary hover:text-brand-accent focus:outline-none rounded-lg border border-brand-border/40 active:scale-95 transition-transform"
            >
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

        {/* Tier 2 Secondary Submenu Floating Line (Hidden on Landing Page `/` and hidden on mobile as it's in the hamburger) */}
        {showSecondLineSubmenu && (
          <div className="hidden lg:block bg-brand-bg-card/50 border-t border-brand-border/40 py-2 px-4 sm:px-6 overflow-x-auto scrollbar-none">
            <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-6 text-xs font-mono">
              {/* Left Side: Contextual Submenu (LEARN MENU on Learn Pages vs MODULES on Visualizer Pages) */}
              <div className="flex items-center gap-6 shrink-0">
                {isLearnPage ? (
                  <>
                    <span className="text-brand-yellow font-bold flex items-center gap-1.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                      LEARN MENU:
                    </span>
                    {learnSubNavLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`transition-colors flex items-center gap-1.5 shrink-0 ${pathname === sub.href ? 'text-brand-yellow font-bold underline' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
                      >
                        <span>{sub.label}</span>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
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
                        <span>{sub.label}</span>
                      </Link>
                    ))}
                  </>
                )}
              </div>

              {/* Right Side: Stack Language Selector Dropdown & Free Tier Click Button */}
              <div className="flex items-center gap-2 pl-4 border-l border-brand-border/40 shrink-0">
                <span className="text-brand-purple font-bold flex items-center gap-1">
                  STACK:
                </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as StackLanguage)}
                  className="bg-brand-bg-dark border border-brand-border rounded-lg px-2.5 py-1 text-xs text-brand-cyan font-bold outline-none cursor-pointer hover:border-brand-purple transition-colors font-mono"
                >
                  {fontMeta.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.extension})
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setIsFreeTierOpen(true)}
                  className="text-[10px] font-bold text-brand-green bg-brand-green/10 border border-brand-green/30 px-2.5 py-1 rounded-md shrink-0 ml-2 hover:bg-brand-green/20 hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
                  title="Click to view Free Learning & Visualizing Tier details"
                >
                  <span>Free Tier</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Admin Submenu Bar if Logged in as Admin */}
        {isAdmin && (
          <div className="bg-brand-purple/10 border-t border-brand-purple/20 py-2 px-4 sm:px-6">
            <div className="max-w-[1700px] mx-auto flex items-center justify-between overflow-x-auto text-[11px] font-mono scrollbar-none">
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="px-2.5 py-1 bg-brand-purple/20 border border-brand-purple/40 text-brand-purple hover:bg-brand-purple hover:text-white transition-colors rounded-lg font-bold flex items-center gap-1 shrink-0"
                >
                  ← Back to Main Site
                </Link>
                <span className="text-brand-text-secondary font-bold shrink-0">ADMIN:</span>
                <Link href="/admin?tab=overview" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors shrink-0">
                  System Overview
                </Link>
                <Link href="/admin?tab=site_analytics" className="text-amber-400 font-bold hover:underline transition-colors shrink-0">
                  AI Site Analytics
                </Link>
                <Link href="/admin?tab=plan_manager" className="text-brand-cyan font-bold hover:underline transition-colors shrink-0">
                  Plan Manager
                </Link>
                <Link href="/admin?tab=applications" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors shrink-0">
                  Applications
                </Link>
                <Link href="/admin?tab=codes" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors shrink-0">
                  Code Generator
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMenu}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden bg-brand-bg-dark/95 backdrop-blur-2xl border-b border-brand-border absolute w-full left-0 top-full shadow-2xl z-50 max-h-[calc(100vh-80px)] overflow-y-auto"
              >
                <nav className="flex flex-col px-6 py-6 space-y-3">
                  {/* Stack Language Mobile Selector */}
                  <div className="flex items-center justify-between pb-3 border-b border-brand-border/40 font-mono text-xs">
                    <span className="text-brand-purple font-bold">Preferred Language:</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as StackLanguage)}
                      className="bg-brand-bg-dark border border-brand-border rounded-lg px-2 py-1 text-xs text-brand-cyan font-bold outline-none"
                    >
                      {fontMeta.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
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

                  {/* Mobile Submenu: Learn Menu on Learn pages, Visualizer Modules elsewhere */}
                  {isLearnPage ? (
                    <>
                      <div className="text-[10px] font-mono font-bold text-brand-yellow uppercase tracking-widest pt-3 border-t border-brand-border/40">Learn Curriculum Menu</div>
                      {learnSubNavLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMenu}
                          className="text-xs font-mono text-brand-text-secondary hover:text-brand-text-primary py-1 flex items-center gap-2"
                        >
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest pt-3 border-t border-brand-border/40">Visualizer Modules</div>
                      {subNavLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMenu}
                          className="text-xs font-mono text-brand-text-secondary hover:text-brand-text-primary py-1 flex items-center gap-2"
                        >
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </>
                  )}

                  {/* Free Tier Mobile Button */}
                  <button
                    onClick={() => { setIsFreeTierOpen(true); closeMenu(); }}
                    className="w-full text-left py-2 px-3 bg-brand-green/10 border border-brand-green/30 text-brand-green font-mono text-xs font-bold rounded-lg flex items-center justify-between mt-2"
                  >
                    <span>🎁 Free Learning & Visualizing Tier</span>
                    <span>Details →</span>
                  </button>

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
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Modals */}
      <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <FreeTierModal isOpen={isFreeTierOpen} onClose={() => setIsFreeTierOpen(false)} />
    </>
  );
}
