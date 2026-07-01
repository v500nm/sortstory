import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col overflow-x-hidden transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-4 py-10 lg:py-16 max-w-[1200px] mx-auto relative z-10">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-forwards max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-bg-card border border-brand-purple/30 shadow-[0_0_20px_rgba(129,140,248,0.15)] px-4 py-2 rounded-full text-xs font-bold tracking-widest text-brand-purple uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            Advanced Algorithmic Execution Engine
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-brand-text-primary leading-[1.1]">
            Master Computer Science <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-rose">Through Visual Execution.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-brand-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
            SortStory bridges the gap between abstract code and memory state. Explore, execute, and analyze over 20+ Data Structures and Algorithms with high-performance, real-time visualization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/sort" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-text-primary text-brand-bg-dark font-bold rounded-lg hover:opacity-90 transition-opacity tracking-wide shadow-xl"
            >
              Start Executing
            </Link>
            <a 
              href="#modules" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-bg-card border border-brand-border text-brand-text-primary font-bold rounded-lg hover:bg-brand-bg-light transition-colors tracking-wide"
            >
              Explore Modules
            </a>
          </div>
        </div>
      </section>

      {/* Depth & Features Section (Bento Grid) */}
      <section id="modules" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-20 relative z-10 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300 fill-mode-forwards">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-brand-text-primary">Comprehensive DSA Modules</h2>
          <p className="text-brand-text-secondary mt-2 font-medium max-w-2xl">Dive deep into complexities, execution flows, and real-world implementations across 6 distinct computational domains.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Sorting */}
          <Link href="/sort" className="group bg-brand-bg-card border border-brand-border rounded-2xl p-6 hover:border-brand-green/50 hover:bg-brand-bg-light transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text-primary mb-1 group-hover:text-brand-green transition-colors">Sorting Algorithms</h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed">Visualize 10+ sorting algorithms including Quick, Merge, Heap, and Radix Sort. Compare their performance in real-time races.</p>
            </div>
            <div className="mt-auto pt-4 flex gap-2">
              <span className="text-[10px] font-mono bg-brand-bg-dark px-2 py-1 rounded text-brand-text-secondary border border-brand-border">16 Algorithms</span>
              <span className="text-[10px] font-mono bg-brand-bg-dark px-2 py-1 rounded text-brand-text-secondary border border-brand-border">O(n log n)</span>
            </div>
          </Link>

          {/* Pathfinding */}
          <Link href="/pathfinding" className="group bg-brand-bg-card border border-brand-border rounded-2xl p-6 hover:border-brand-cyan/50 hover:bg-brand-bg-light transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text-primary mb-1 group-hover:text-brand-cyan transition-colors">Pathfinding</h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed">Navigate dynamic grids with obstacles using Dijkstra's and A* Search. Understand heuristic optimizations and shortest-path guarantees.</p>
            </div>
            <div className="mt-auto pt-4 flex gap-2">
              <span className="text-[10px] font-mono bg-brand-bg-dark px-2 py-1 rounded text-brand-text-secondary border border-brand-border">Dijkstra</span>
              <span className="text-[10px] font-mono bg-brand-bg-dark px-2 py-1 rounded text-brand-text-secondary border border-brand-border">A* Search</span>
            </div>
          </Link>

          

          {/* Linked Lists */}
          <Link href="/linked-lists" className="group bg-brand-bg-card border border-brand-border rounded-2xl p-6 hover:border-brand-rose/50 hover:bg-brand-bg-light transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-rose/10 border border-brand-rose/20 flex items-center justify-center text-brand-rose">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text-primary mb-1 group-hover:text-brand-rose transition-colors">Linked Lists</h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed">Visualize Singly and Doubly Linked Lists. Watch pointers update in real-time as you reverse the list or detect cycles using Floyd's algorithm.</p>
            </div>
          </Link>

          {/* Graphs & Automata combined row */}
            <Link href="/graphs" className="group bg-brand-bg-card border border-brand-border rounded-2xl p-6 hover:border-brand-purple/50 hover:bg-brand-bg-light transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-text-primary mb-1 group-hover:text-brand-purple transition-colors">Graphs</h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">Traverse custom networks using Breadth-First and Depth-First Search. Understand topological exploration and state tracking.</p>
              </div>
            </Link>

            <Link href="/automata" className="group bg-brand-bg-card border border-brand-border rounded-2xl p-6 hover:border-yellow-400/50 hover:bg-brand-bg-light transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-text-primary mb-1 group-hover:text-yellow-400 transition-colors">Automata & ML</h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">Explore Cellular Automata via Conway's Game of Life, and visualize iterative Machine Learning with K-Means Clustering.</p>
              </div>
            </Link>
            {/* Trees */}
          <Link href="/trees" className="group bg-brand-bg-card border border-brand-border rounded-2xl p-6 hover:border-yellow-400/50 hover:bg-brand-bg-light transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center text-orange-400">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text-primary mb-1 group-hover:text-orange-400 transition-colors">Trees (BST)</h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed">Interact with Binary Search Trees. Insert nodes, search for values, and run Pre-Order, In-Order, and Post-Order traversals to see how hierarchical data memory is accessed.</p>
            </div>
           
          </Link>

        </div>
      </section>

      {/* Feature Depth Breakdown */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-20 border-t border-brand-border/40 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-brand-text-primary">Algorithm Flows</h4>
            <p className="text-sm text-brand-text-secondary leading-relaxed">Step-by-step logic traces for every algorithm. Don't just watch the animation—read the exact sequence of logical deductions occurring under the hood.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-brand-text-primary">Multi-Language Code</h4>
            <p className="text-sm text-brand-text-secondary leading-relaxed">Every algorithm includes production-ready code implementations in JavaScript, Python, Java, and C++. Switch seamlessly to learn syntax differences.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-brand-text-primary">Complexity & Use Cases</h4>
            <p className="text-sm text-brand-text-secondary leading-relaxed">Complete breakdowns of Best, Average, and Worst case Time/Space complexities, paired with real-world enterprise engineering use cases.</p>
          </div>
        </div>
      </section>

    </main>
  );
}