"use client";
import { useState } from "react";
import GameOfLifeVisualizer from "@/components/automata/GameOfLifeVisualizer";
import KMeansVisualizer from "@/components/automata/KMeansVisualizer";
import AutomataControls from "@/components/automata/AutomataControls";
import { useGameOfLifeEngine, useKMeansEngine } from "@/hooks/useAutomataEngine";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import AlgoDetails from "@/components/AlgoDetails";
import InitialMountLoader from "@/components/loaders/InitialMountLoader";
import AutomataLoader from "@/components/loaders/AutomataLoader";

export default function AutomataPage() {
  const golEngine = useGameOfLifeEngine();
  const kmeansEngine = useKMeansEngine();
  const [selectedModule, setSelectedModule] = useState<"gol" | "kmeans">("gol");

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <InitialMountLoader>
        <AutomataLoader />
      </InitialMountLoader>
      <Header />
      <div className="max-w-[1700px] mx-auto w-full flex-1 px-4 sm:px-6 py-4 md:py-6 flex flex-col">
        <PageHeader 
          title="Automata & ML Visualizer" 
          description="Interact with Conway's Game of Life cellular automaton and watch K-Means Clustering partition data points in real-time." 
        />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <div className="min-h-[500px]">
              {selectedModule === "gol" ? (
                <GameOfLifeVisualizer engine={golEngine} />
              ) : (
                <KMeansVisualizer engine={kmeansEngine} />
              )}
            </div>
            <AlgoDetails selectedAlgo={selectedModule} />
          </div>
          
          <div className="w-full md:w-[320px] xl:w-[360px] flex-shrink-0">
            <AutomataControls 
              golEngine={golEngine} 
              kmeansEngine={kmeansEngine} 
              selectedModule={selectedModule} 
              setSelectedModule={setSelectedModule} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
