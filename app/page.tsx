import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-6 py-20 lg:py-32 max-w-[1200px] mx-auto space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#111111] border border-brand-border px-3 py-1 rounded-full text-xs font-medium tracking-wide text-brand-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            A* VS DIJKSTRA RACE MODE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Master Algorithms.<br />
            <span className="text-brand-text-secondary">Through Visual Storytelling.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-brand-text-secondary max-w-2xl mx-auto font-medium">
            An interactive playground designed to demystify complex sorting processes and shortest-path navigation in real-time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          <Link
            href="/sort"
            className="w-full sm:w-auto text-black bg-white hover:bg-gray-200 font-bold tracking-wide rounded-md py-3 px-8 transition-all text-sm flex items-center justify-center gap-2"
          >
            EXPLORE SORTING
            <svg fill="none" height="14" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="14">
              <path d="M4 16l4 4 4-4M8 20V4" />
            </svg>
          </Link>
          <Link
            href="/pathfinding"
            className="w-full sm:w-auto text-white bg-[#111111] hover:bg-[#1a1a1a] border border-brand-border font-bold tracking-wide rounded-md py-3 px-8 transition-all text-sm flex items-center justify-center gap-2"
          >
            EXPLORE PATHFINDING
            <svg fill="none" height="14" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="14">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Dynamic Minimalist UI Preview Mockup */}
        <div className="w-full max-w-4xl pt-8">
          <div className="glass-card premium-border p-6 rounded-xl space-y-6">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[11px] font-mono text-brand-text-secondary tracking-wide uppercase">Interactive Preview</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-48">
              {/* Left Column - Mini Sort bars */}
              <Link href="/sort" className="flex items-end justify-center gap-1 bg-black/40 rounded-lg p-4 border border-brand-border/40 h-full relative group hover:border-white/20 transition-all cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                  <span className="text-xs font-bold tracking-wider text-white border border-white/30 px-3 py-1.5 rounded bg-black">VIEW SORTING</span>
                </div>
                <div className="w-3 rounded-t bg-brand-green" style={{ height: "100%" }} />
                <div className="w-3 rounded-t bg-brand-green" style={{ height: "90%" }} />
                <div className="w-3 rounded-t bg-brand-green" style={{ height: "80%" }} />
                <div className="w-3 rounded-t bg-brand-green" style={{ height: "70%" }} />
                <div className="w-3 rounded-t bg-brand-yellow" style={{ height: "60%" }} />
                <div className="w-3 rounded-t bg-[#27272a]" style={{ height: "50%" }} />
                <div className="w-3 rounded-t bg-[#27272a]" style={{ height: "40%" }} />
                <div className="w-3 rounded-t bg-white" style={{ height: "30%" }} />
                <div className="w-3 rounded-t bg-[#27272a]" style={{ height: "20%" }} />
              </Link>

              {/* Right Column - Mini Path Grid */}
              <Link href="/pathfinding" className="flex items-center justify-center bg-black/40 rounded-lg p-4 border border-brand-border/40 h-full relative group hover:border-white/20 transition-all cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                  <span className="text-xs font-bold tracking-wider text-white border border-white/30 px-3 py-1.5 rounded bg-black">VIEW PATHFINDING</span>
                </div>
                <div className="grid grid-cols-6 gap-1 w-32">
                  {[...Array(24)].map((_, i) => {
                    let bg = "bg-brand-bg-dark";
                    if (i === 6) bg = "bg-brand-green"; // Start
                    if (i === 17) bg = "bg-brand-purple"; // End
                    if (i === 11 || i === 16 || i === 21) bg = "bg-white"; // Walls
                    if (i >= 7 && i <= 10) bg = "bg-brand-yellow"; // Path
                    return <div key={i} className={`w-4 h-4 border border-brand-border/30 rounded-sm ${bg}`} />;
                  })}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="border-t border-brand-border bg-black/20 py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">EXPERIENCE CORE CAPABILITIES</h2>
            <p className="text-sm text-brand-text-secondary max-w-lg mx-auto">
              Everything built with pixel-perfect modern web layouts and high-performance algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card premium-border p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-brand-border flex items-center justify-center text-white">
                <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white">Interactive Controls</h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                Play, pause, resume, step, or stop visualizers at any point. Instantly configure speeds and dataset sizes mid-execution.
              </p>
            </div>

            <div className="glass-card premium-border p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-brand-border flex items-center justify-center text-white">
                <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l-7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white">Race Comparisons</h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                Compare sorting algorithms side-by-side in "Race Mode". Determine the fastest algorithm with direct winner detection.
              </p>
            </div>

            <div className="glass-card premium-border p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-brand-border flex items-center justify-center text-white">
                <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white">Interactive Grids</h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                Generate mazes with Recursive Backtracking or Prim&apos;s algorithms, race Dijkstra vs A* side-by-side, and control obstacle density in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-border py-8 px-4 sm:px-6 mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-text-secondary font-medium">
          <p>© 2026 SortStory - <a href="https://adnan-mangaonkar.com" className="text-white">Adnan M.</a> All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/sort" className="hover:text-white transition-colors">SORTING</Link>
            <Link href="/pathfinding" className="hover:text-white transition-colors">PATHFINDING</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}