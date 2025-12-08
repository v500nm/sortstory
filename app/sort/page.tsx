"use client";
import { useState, useEffect } from "react";
import ControlsPanel from "@/components/ControlsPanel";
import BarsVisualizer from "@/components/BarsVisualizer";
import AlgoDetails from "@/components/AlgoDetails";
import IntroModal from "@/components/IntroModal";
import * as sorts from "@/lib/index"; // Assuming your sorts are here
import { resetStates } from "@/lib/core";

export default function Sort() {
  const [showIntro, setShowIntro] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState("bubbleSort");

  useEffect(() => {
    const shown = localStorage.getItem("sortviz_intro");
    if (!shown) setShowIntro(true);
  }, []);

  // Handler to run algorithms
  const handleRun = () => {
    resetStates();
    // Dynamically call the sort function from your lib based on string key
    // Ensure your exports in lib/index match these names
    const sortFn = (sorts as any)[selectedAlgo]; 
    if(sortFn) sortFn();
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground p-4 md:p-8 font-sans">
      {showIntro && <IntroModal close={() => setShowIntro(false)} />}

      {/* Page Header */}
      <header className="text-center mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-serif-display italic text-white mb-2">Sorting Visualizer Dashboard</h1>
        <p className="text-muted-foreground">Interactive Sorting Algorithm Visualization</p>
      </header>

      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Top Section: Controls + Vis */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-1">
             <ControlsPanel 
               selectedAlgo={selectedAlgo} 
               setSelectedAlgo={setSelectedAlgo}
               onRun={handleRun}
             />
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-2">
            <BarsVisualizer />
          </div>
        </section>

        {/* Bottom Section: Details */}
        <AlgoDetails selectedAlgo={selectedAlgo} />
      </div>
    </main>
  );
}