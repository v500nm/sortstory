"use client";
import { useState, useEffect, useCallback } from "react";
import ControlsPanel, { algorithmInfo } from "@/components/ControlsPanel";
import BarsVisualizer from "@/components/BarsVisualizer";
import AlgoDetails from "@/components/AlgoDetails";
import IntroModal from "@/components/IntroModal";
import ComparativeView from "@/components/ComparativeView";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import { useSortEngine } from "@/hooks/useSortEngine";
import * as sorts from "@/lib/index";
import type { SortAlgorithmFn } from "@/lib/types";
import Link from "next/link";
import InitialMountLoader from "@/components/loaders/InitialMountLoader";
import SortingBarsLoader from "@/components/loaders/SortingBarsLoader";

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

  const [presetDataset, setPresetDataset] = useState("random");

  const handleSelectPreset = useCallback((preset: string) => {
    setPresetDataset(preset);
    if (preset === "random") {
      engine.generateArray(arraySize);
    } else if (preset === "nearlySorted") {
      const arr = Array.from({ length: arraySize }, (_, i) => Math.floor((i + 1) * (90 / arraySize)) + 5);
      if (arr.length > 3) {
        const mid = Math.floor(arr.length / 2);
        [arr[mid], arr[mid + 1]] = [arr[mid + 1], arr[mid]];
      }
      engine.setCustomArray(arr);
    } else if (preset === "reverseSorted") {
      const arr = Array.from({ length: arraySize }, (_, i) => Math.floor((arraySize - i) * (90 / arraySize)) + 5);
      engine.setCustomArray(arr);
    } else if (preset === "fewUnique") {
      const uniqueVals = [15, 35, 65, 85];
      const arr = Array.from({ length: arraySize }, () => uniqueVals[Math.floor(Math.random() * uniqueVals.length)]);
      engine.setCustomArray(arr);
    }
  }, [arraySize, engine]);

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <InitialMountLoader>
        <SortingBarsLoader />
      </InitialMountLoader>
      {showIntro && <IntroModal close={() => setShowIntro(false)} />}

      <Header />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
        <PageHeader 
          title="Sorting Visualizer" 
          description="Visualize and compare 16 sorting algorithms in real-time, side-by-side or individually." 
        />
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
                presetDataset={presetDataset}
                onSelectPreset={handleSelectPreset}
              />
            </div>

            {/* Visualization — Main Content */}
            <div className="flex-grow animate-in space-y-4" style={{ animationDelay: '100ms' }}>
              {/* Inline Quick Info Bar */}
              {(() => {
                const info = algorithmInfo[selectedAlgo] || algorithmInfo.bubbleSort;
                return (
                  <div className="glass-card premium-border px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-brand-text-primary uppercase tracking-wider text-[10px] bg-brand-bg-medium px-2 py-1 rounded border border-brand-border">INFO</span>
                      <p className="text-brand-text-secondary font-medium">{info.description}</p>
                    </div>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="bg-brand-bg-medium border border-brand-border px-2.5 py-1 rounded text-brand-yellow font-semibold">TIME: {info.time}</span>
                      <span className="bg-brand-bg-medium border border-brand-border px-2.5 py-1 rounded text-brand-cyan font-semibold">SPACE: {info.space}</span>
                    </div>
                  </div>
                );
              })()}

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