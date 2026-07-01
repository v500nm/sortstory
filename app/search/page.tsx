"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useSearchEngine } from "@/hooks/useSearchEngine";
import SearchControls from "@/components/search/SearchControls";
import SearchVisualizer from "@/components/search/SearchVisualizer";
import SearchRace from "@/components/search/SearchRace";
import AlgoDetails from "@/components/AlgoDetails";

export default function SearchPage() {
  const [arraySize, setArraySize] = useState(15);
  const [selectedAlgo, setSelectedAlgo] = useState("linearSearch");
  const [raceMode, setRaceMode] = useState(false);

  // Engine for single mode & Linear Search in race mode
  const enginePrimary = useSearchEngine();
  
  // Engine for Binary Search in race mode
  const engineSecondary = useSearchEngine();

  // Initial setup
  useEffect(() => {
    enginePrimary.initialize(arraySize, selectedAlgo === "binarySearch");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg-dark text-brand-text-primary flex flex-col font-sans selection:bg-brand-purple/30">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 pt-24 h-screen flex flex-col max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
          
          {/* Controls Sidebar */}
          <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0">
            <SearchControls
              engine={enginePrimary}
              selectedAlgo={selectedAlgo}
              setSelectedAlgo={setSelectedAlgo}
              arraySize={arraySize}
              setArraySize={setArraySize}
              raceMode={raceMode}
              setRaceMode={setRaceMode}
            />
          </div>

          {/* Visualization Area */}
          <div className="flex-1 min-w-0 flex flex-col gap-6 h-full min-h-0">
            {raceMode ? (
              <SearchRace
                arraySize={arraySize}
                engineLinear={enginePrimary}
                engineBinary={engineSecondary}
                onStopRace={() => {
                  enginePrimary.stop();
                  engineSecondary.stop();
                }}
              />
            ) : (
              <div className="flex-1 min-h-0">
                <SearchVisualizer
                  array={enginePrimary.array}
                  statuses={enginePrimary.statuses}
                  target={enginePrimary.target}
                  metrics={enginePrimary.metrics}
                />
              </div>
            )}
            
            {!raceMode && selectedAlgo && (
              <div className="mt-6 animate-in" style={{ animationDelay: '200ms' }}>
                <AlgoDetails selectedAlgo={selectedAlgo} />
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
