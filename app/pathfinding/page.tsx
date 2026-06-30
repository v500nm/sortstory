"use client";

import Header from "@/components/Header";
import GridVisualizer from "@/components/pathfinding/GridVisualizer";
import PathfindingControls from "@/components/pathfinding/PathfindingControls";
import { usePathfindingEngine } from "@/hooks/usePathfindingEngine";

export default function PathfindingPage() {
  const engine = usePathfindingEngine();

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col max-w-[1700px] w-full mx-auto px-4 sm:px-6 py-6">
        <section className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          {/* Controls — Left Sidebar */}
          <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 flex flex-col">
            <PathfindingControls engine={engine} />
          </div>

          {/* Visualization Area — Main Content */}
          <div className="flex-grow flex flex-col relative min-h-[500px]">
            <GridVisualizer engine={engine} />
          </div>
        </section>
      </div>
    </main>
  );
}
