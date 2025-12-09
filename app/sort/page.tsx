"use client";
import { useState, useEffect } from "react";
import ControlsPanel from "@/components/ControlsPanel";
import BarsVisualizer from "@/components/BarsVisualizer";
import AlgoDetails from "@/components/AlgoDetails";
import IntroModal from "@/components/IntroModal";
import * as sorts from "@/lib/index";
import { resetStates } from "@/lib/core";
import { metricsLive, metricsReset } from "@/lib/metrics";

export default function Sort() {
  const [showIntro, setShowIntro] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState("bubbleSort");
  const [arraySize, setArraySize] = useState(15);
  const [speed, setSpeed] = useState(2);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("sortviz_intro");
    if (!shown) setShowIntro(true);
  }, []);

  // Update metrics from metricsLive
  useEffect(() => {
    const interval = setInterval(() => {
      setComparisons(metricsLive.comparisons);
      setSwaps(metricsLive.swaps);
      setTime(Math.round(metricsLive.time));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleRun = async () => {
    resetStates();
    metricsReset(selectedAlgo);
    setIsRunning(true);
    
    try {
      const sortFn = (sorts as any)[selectedAlgo];
      if (sortFn) {
        await sortFn();
      }
    } catch (error) {
      console.error("Error running sort:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleShuffle = () => {
    if (!isRunning) {
      resetStates();
      metricsReset("");
      setComparisons(0);
      setSwaps(0);
      setTime(0);
    }
  };

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary p-8 font-sans">
      {showIntro && <IntroModal close={() => setShowIntro(false)} />}

      <header className="text-center mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-serif-display italic text-white">
          Sorting Visualizer Dashboard
        </h1>
        <p className="text-brand-text-secondary mt-1">
          Interactive Sorting Algorithm Visualization
        </p>
      </header>

      <div className="space-y-6 max-w-[1600px] mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ControlsPanel
              selectedAlgo={selectedAlgo}
              setSelectedAlgo={setSelectedAlgo}
              arraySize={arraySize}
              setArraySize={setArraySize}
              speed={speed}
              setSpeed={setSpeed}
              onRun={handleRun}
              onShuffle={handleShuffle}
              isRunning={isRunning}
            />
          </div>

          <div className="lg:col-span-2">
            <BarsVisualizer
              comparisons={comparisons}
              swaps={swaps}
              time={time}
            />
          </div>
        </section>

        <AlgoDetails selectedAlgo={selectedAlgo} />
      </div>
    </main>
  );
}