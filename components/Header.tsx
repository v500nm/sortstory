"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-brand-border bg-brand-bg-dark/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white hover:text-gray-300 transition-colors flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M4 16l4 4 4-4M8 20V4M20 8l-4-4-4 4M16 4v16"/>
          </svg>
          SortStory
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/sort" 
            className={`text-sm font-medium transition-colors ${pathname === '/sort' ? 'text-white' : 'text-brand-text-secondary hover:text-white'}`}
          >
            Sorting
          </Link>
          <Link 
            href="/pathfinding" 
            className={`text-sm font-medium transition-colors ${pathname === '/pathfinding' ? 'text-white' : 'text-brand-text-secondary hover:text-white'}`}
          >
            Pathfinding
          </Link>
        </nav>
      </div>
    </header>
  );
}
