"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
// Assuming you have lucide-react or similar icons installed
import { BarChart2, Clock, Zap, Layers } from 'lucide-react'; 

// Helper component for cleaner code and reusable styles
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-start p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-100">
    <div className="text-blue-600 mb-3">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600 mt-2">{description}</p>
  </div>
);

export default function Landing() {
  const router = useRouter();

  return (
    // Base: High-contrast light theme
    <main className="min-h-screen bg-white flex flex-col items-center justify-start text-gray-900 relative overflow-hidden">
      
      {/* 1. Header/Navigation Bar (New Structure Element) */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm shadow-md py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/assets/sortviz.png" 
              alt="SortViz Logo"
              width={32}
              height={32}
              className="rounded-md shadow-sm mr-2"
            />
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              SortViz
            </h2>
          </div>
          <nav className="hidden sm:flex space-x-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-blue-600 transition">Features</a>
            <a href="#" className="hover:text-blue-600 transition">Algorithms</a>
            <a href="#" className="hover:text-blue-600 transition">Documentation</a>
          </nav>
        </div>
      </header>
      
      {/* 2. Main Content Wrapper */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl w-full pt-32 pb-16 px-6 md:px-12">

        {/* LEFT COLUMN (COL 1-7): PRIMARY CONTENT & CTA */}
        <div className="lg:col-span-7 text-left order-2 lg:order-1">
          
          {/* Tagline */}
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2 flex items-center">
             <Zap size={16} className="mr-2"/> Engineering Clarity
          </p>

          {/* PRIMARY HEADLINE */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mt-3 leading-tight text-gray-900">
            Master the Mechanics of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Sorting Algorithms.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 text-lg text-gray-700 max-w-xl font-normal">
            SortViz provides a high-fidelity environment to **observe, measure, and step-through** the complexity of 17+ core data structure algorithms.
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={() => router.push("/sort")}
            className="mt-10 w-full sm:w-auto bg-gray-900 text-white font-bold text-xl px-12 py-4 rounded-lg shadow-xl transition-all duration-300 transform 
                       hover:bg-blue-600 hover:shadow-blue-400/50 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            Start Visualizing for Free →
          </button>
          
        </div>

        {/* RIGHT COLUMN (COL 8-12): VISUAL HERO (Simulated Fixed Position) */}
        <div className="lg:col-span-5 relative w-full h-[350px] md:h-[500px] order-1 lg:order-2">
          {/* This block is styled to look like a high-quality product mockup */}
          <div className="absolute inset-0 bg-gray-100 rounded-2xl shadow-[0_20px_60px_-10px_rgba(40,40,60,0.3)] border border-gray-200 flex flex-col overflow-hidden transform lg:scale-105 transition-transform duration-500">
            
            {/* Mock Header/Controls */}
            <div className="flex justify-between items-center h-12 px-4 bg-gray-200 border-b border-gray-300">
              <span className="text-xs font-semibold text-gray-700">Algorithm: QuickSort</span>
              <div className="flex space-x-2">
                 <button className="text-sm text-gray-500 hover:text-blue-600">Pause</button>
                 <button className="text-sm text-gray-500 hover:text-blue-600">Speed</button>
              </div>
            </div>

            {/* Simulated Bar Chart Visualization Area */}
            <div className="flex items-end h-full px-6 pt-6 pb-6 space-x-1.5 bg-white">
              {[...Array(25)].map((_, i) => (
                <div 
                  key={i}
                  // Calculate height based on index (simulates a visualization in progress)
                  style={{ height: `${(i / 25) * 85 + 10}%` }} // Slightly sorted
                  className={`w-1 rounded-t-sm transition-all duration-300 
                              ${i > 18 ? 'bg-green-500' : (i % 5 === 0 ? 'bg-red-500' : 'bg-blue-500')}`}
                ></div>
              ))}
            </div>
            
            <div className="bg-gray-100 p-3 text-xs text-gray-600 font-mono border-t border-gray-200">
                O(N log N) | Status: Comparing | Iteration: 45
            </div>
          </div>
        </div>

      </div>

      {/* 3. Features Section (Below the Fold) */}
      <div className="max-w-7xl w-full py-20 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900">
            Engineered for Deep Learning
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BarChart2 size={30} />} 
              title="Metric Comparison" 
              description="Side-by-side analysis of O(N) complexity, swaps, and time."
            />
            <FeatureCard 
              icon={<Clock size={30} />} 
              title="Time Travel Debugging" 
              description="Step forward or backward through the sorting process instantly."
            />
            <FeatureCard 
              icon={<Database size={30} />} 
              title="Custom Data Sets" 
              description="Upload your own arrays to test edge cases and performance."
            />
            <FeatureCard 
              icon={<Layers size={30} />} 
              title="Category Breakdown" 
              description="Filter algorithms by stability, memory use, and type (e.g., Merge, Insertion)."
            />
        </div>
      </div>
      
      {/* FOOTER - Minimalist and professional */}
      <footer className="w-full mt-10 py-6 text-sm text-gray-500 text-center border-t border-gray-100">
        © {new Date().getFullYear()} SortViz · Built by Adnan Shafiq Mangaonkar
      </footer>
    </main>
  );
}