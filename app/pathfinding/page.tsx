"use client";

import { useState } from "react";
import Header from "@/components/Header";
import GridVisualizer from "@/components/pathfinding/GridVisualizer";
import PathfindingControls from "@/components/pathfinding/PathfindingControls";
import PathfindingRace from "@/components/pathfinding/PathfindingRace";
import { usePathfindingEngine } from "@/hooks/usePathfindingEngine";
import { ALGORITHM_INFO } from "@/components/pathfinding/PathfindingControls";
import AlgoDetails from "@/components/AlgoDetails";

export default function PathfindingPage() {
  const engine = usePathfindingEngine();
  const [selectedAlgo, setSelectedAlgo] = useState("dijkstra");
  const [raceMode, setRaceMode] = useState(false);
  const [obstacleDensity, setObstacleDensity] = useState(0.25);

  const info = ALGORITHM_INFO[selectedAlgo] || ALGORITHM_INFO.dijkstra;

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col max-w-[1500px] w-full mx-auto px-2 sm:px-2 py-2">
        {!raceMode ? (
          /* ═══ Single Algorithm Mode ═══ */
          <section className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
            {/* Controls — Left Sidebar */}
            <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col animate-in">
              <PathfindingControls
                engine={engine}
                selectedAlgo={selectedAlgo}
                setSelectedAlgo={setSelectedAlgo}
                raceMode={raceMode}
                setRaceMode={setRaceMode}
                obstacleDensity={obstacleDensity}
                setObstacleDensity={setObstacleDensity}
              />
            </div>

            {/* Visualization Area — Main Content */}
            <div className="flex-grow flex flex-col max-w-[1000px] relative min-h-[500px] animate-in space-y-4" style={{ animationDelay: "100ms" }}>
              {/* Algorithm Info Bar */}
              <div className="glass-card premium-border px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white uppercase tracking-wider text-[10px] bg-[#111111] px-2 py-1 rounded border border-brand-border">
                    INFO
                  </span>
                  <p className="text-brand-text-secondary font-medium">
                    {info.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="bg-[#111111] border border-brand-border px-2.5 py-1 rounded text-brand-yellow font-semibold">
                    TIME: {info.time}
                  </span>
                  <span className="bg-[#111111] border border-brand-border px-2.5 py-1 rounded text-brand-cyan font-semibold">
                    SPACE: {info.space}
                  </span>
                </div>
              </div>

              <GridVisualizer engine={engine} />
              
              {!raceMode && selectedAlgo && (
                <div className="mt-6 animate-in" style={{ animationDelay: '200ms' }}>
                  <AlgoDetails selectedAlgo={selectedAlgo} />
                </div>
              )}
            </div>
          </section>
        ) : (
          /* ═══ Race Mode ═══ */
          <section className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
            {/* Controls — Left Sidebar */}
            <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 flex flex-col animate-in">
              <PathfindingControls
                engine={engine}
                selectedAlgo={selectedAlgo}
                setSelectedAlgo={setSelectedAlgo}
                raceMode={raceMode}
                setRaceMode={setRaceMode}
                obstacleDensity={obstacleDensity}
                setObstacleDensity={setObstacleDensity}
              />
            </div>

            {/* Race Visualization — Main Content */}
            <div className="flex-grow animate-in min-h-[500px]" style={{ animationDelay: "100ms" }}>
              <PathfindingRace
                speed={engine.speed}
                obstacleDensity={obstacleDensity}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
