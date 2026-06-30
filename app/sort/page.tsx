"use client";
import { useState, useEffect, useCallback } from "react";
import ControlsPanel from "@/components/ControlsPanel";
import BarsVisualizer from "@/components/BarsVisualizer";
import AlgoDetails from "@/components/AlgoDetails";
import IntroModal from "@/components/IntroModal";
import ComparativeView from "@/components/ComparativeView";
import Header from "@/components/Header";
import { useSortEngine } from "@/hooks/useSortEngine";
import * as sorts from "@/lib/index";
import type { SortAlgorithmFn } from "@/lib/types";
import Link from "next/link";

const sortMap: Record<string, SortAlgorithmFn> = sorts as unknown as Record<string, SortAlgorithmFn>;

export default function Sort() {
  const [showIntro, setShowIntro] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState("bubbleSort");
  const [selectedAlgoB, setSelectedAlgoB] = useState("selectionSort");
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(2);
  const [compareMode, setCompareMode] = useState(false);

  const engine = useSortEngine(arraySize);

  useEffect(() => {
    const shown = localStorage.getItem("sortviz_intro");
    if (!shown) setShowIntro(true);
  }, []);

  // Sync speed to engine
  useEffect(() => {
    engine.setSpeed(speed);
  }, [speed, engine.setSpeed]);

  // Regenerate array when size changes (only when idle)
  useEffect(() => {
    if (engine.status === "idle" || engine.status === "completed") {
      engine.generateArray(arraySize);
    }
  }, [arraySize]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRun = useCallback(() => {
    const sortFn = sortMap[selectedAlgo];
    if (sortFn) {
      engine.run(sortFn);
    }
  }, [selectedAlgo, engine]);

  const handleShuffle = useCallback(() => {
    engine.generateArray(arraySize);
  }, [arraySize, engine]);

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative">
      {showIntro && <IntroModal close={() => setShowIntro(false)} />}

      <Header />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {!compareMode ? (
          /* ═══ Single Mode ═══ */
          <section className="flex flex-col lg:flex-row gap-6">
            {/* Controls — Left Sidebar */}
            <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 animate-in">
              <ControlsPanel
                selectedAlgo={selectedAlgo}
                setSelectedAlgo={setSelectedAlgo}
                arraySize={arraySize}
                setArraySize={setArraySize}
                speed={speed}
                setSpeed={setSpeed}
                onRun={handleRun}
                onPause={engine.pause}
                onResume={engine.resume}
                onStop={engine.stop}
                onShuffle={handleShuffle}
                status={engine.status}
                compareMode={compareMode}
                setCompareMode={setCompareMode}
              />
            </div>

            {/* Visualization — Main Content */}
            <div className="flex-grow animate-in" style={{ animationDelay: '100ms' }}>
              <BarsVisualizer
                array={engine.array}
                colors={engine.colors}
                comparisons={engine.metrics.comparisons}
                swaps={engine.metrics.swaps}
                time={engine.metrics.timeMs}
              />
            </div>
          </section>
        ) : (
          /* ═══ Compare Mode ═══ */
          <section className="flex flex-col lg:flex-row gap-6">
            {/* Controls — Left Sidebar */}
            <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 animate-in">
              <ControlsPanel
                selectedAlgo={selectedAlgo}
                setSelectedAlgo={setSelectedAlgo}
                arraySize={arraySize}
                setArraySize={setArraySize}
                speed={speed}
                setSpeed={setSpeed}
                onRun={() => {}} // Handled by ComparativeView
                onPause={() => {}}
                onResume={() => {}}
                onStop={() => {}}
                onShuffle={() => {}}
                status="idle"
                compareMode={compareMode}
                setCompareMode={setCompareMode}
                selectedAlgoB={selectedAlgoB}
                setSelectedAlgoB={setSelectedAlgoB}
              />
            </div>

            {/* Comparative Visualization — Main Content */}
            <div className="flex-grow animate-in" style={{ animationDelay: '100ms' }}>
              <ComparativeView
                algoA={selectedAlgo}
                algoB={selectedAlgoB}
                arraySize={arraySize}
                speed={speed}
              />
            </div>
          </section>
        )}

        {/* Algorithm Details — always shown */}
        <div className="animate-in" style={{ animationDelay: '200ms' }}>
          <AlgoDetails selectedAlgo={selectedAlgo} />
        </div>
      </div>
    </main>
  );
}