import { useState, useEffect } from "react";
import { useGameOfLifeEngine, useKMeansEngine } from "@/hooks/useAutomataEngine";
import * as algorithms from "@/lib/automata/algorithms";

interface Props {
  golEngine: ReturnType<typeof useGameOfLifeEngine>;
  kmeansEngine: ReturnType<typeof useKMeansEngine>;
  selectedModule: "gol" | "kmeans";
  setSelectedModule: (mod: "gol" | "kmeans") => void;
}

export default function AutomataControls({ golEngine, kmeansEngine, selectedModule, setSelectedModule }: Props) {
  const isGol = selectedModule === "gol";
  
  // Game of Life state
  const { 
    status: golStatus, run: golRun, pause: golPause, resume: golResume, stop: golStop, 
    initializeGrid, speed: golSpeed, setSpeed: setGolSpeed 
  } = golEngine;
  
  // KMeans state
  const {
    status: kmStatus, run: kmRun, pause: kmPause, resume: kmResume, stop: kmStop,
    initializeData, speed: kmSpeed, setSpeed: setKmSpeed
  } = kmeansEngine;

  const isBusy = (isGol ? golStatus : kmStatus) === "running" || (isGol ? golStatus : kmStatus) === "paused";

  // Init Game of Life
  useEffect(() => {
    initializeGrid(20, 20, false);
    initializeData(150, 4);
    // eslint-disable-next-exhaustive-deps
  }, []);

  const handleRunClick = () => {
    if (isGol) {
      golRun(algorithms.runGameOfLife, 1000);
    } else {
      kmRun(algorithms.runKMeans, 100);
    }
  };

  const handlePause = () => isGol ? golPause() : kmPause();
  const handleResume = () => isGol ? golResume() : kmResume();
  const handleStop = () => isGol ? golStop() : kmStop();
  
  const handleGenerate = () => {
    if (isGol) {
      initializeGrid(20, 20, true);
    } else {
      initializeData(150, 4); // default random
    }
  };
  
  const handleClear = () => {
    if (isGol) {
      initializeGrid(20, 20, false);
    }
  };

  return (
    <aside className="h-full flex flex-col bg-brand-bg-card rounded-2xl border border-brand-border/50 shadow-2xl relative overflow-hidden">
      <div className="p-5 border-b border-brand-border/50 bg-black/40 backdrop-blur-xl z-10 flex justify-between items-center">
        <h2 className="text-sm font-semibold tracking-wider text-brand-accent uppercase">
          {isGol ? "Game of Life Controls" : "K-Means Controls"}
        </h2>
        <div className="flex gap-2">
          <span className={`h-2 w-2 rounded-full ${isBusy ? "bg-brand-purple animate-pulse" : "bg-brand-text-secondary"}`} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Module Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            SIMULATION TYPE
          </label>
          <div className="grid grid-cols-2 gap-2 bg-[#111111] p-1 rounded-lg border border-brand-border">
            <button 
              onClick={() => { if(!isBusy) setSelectedModule("gol"); }}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${isGol ? 'bg-brand-purple text-brand-accent shadow-md' : 'text-brand-text-secondary hover:text-brand-accent'}`}
            >
              Game of Life
            </button>
            <button 
              onClick={() => { if(!isBusy) setSelectedModule("kmeans"); }}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${!isGol ? 'bg-brand-cyan text-brand-accent shadow-md' : 'text-brand-text-secondary hover:text-brand-accent'}`}
            >
              K-Means
            </button>
          </div>
        </div>

        {/* Generate / Clear Actions */}
        <div className="space-y-2 pt-2 border-t border-brand-border/30">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            {isGol ? "GRID SETUP (Draw on grid to toggle cells)" : "DATA SETUP"}
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleGenerate}
              disabled={isBusy}
              className="flex-1 py-2 bg-brand-bg-dark hover:bg-[#1a1a1a] border border-brand-border rounded-lg text-xs font-semibold tracking-wide transition-colors text-white"
            >
              {isGol ? "RANDOMIZE" : "GENERATE POINTS"}
            </button>
            {isGol && (
              <button
                onClick={handleClear}
                disabled={isBusy}
                className="flex-1 py-2 bg-brand-bg-dark hover:bg-brand-rose/20 border border-brand-border hover:border-brand-rose/50 rounded-lg text-xs font-semibold tracking-wide transition-colors text-brand-rose"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Speed */}
        <div className="space-y-2 pt-2 border-t border-brand-border/30">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
              SPEED
            </label>
            <span className="text-xs font-mono text-brand-text-primary bg-[#111111] px-2 py-0.5 rounded border border-brand-border">
              {(isGol ? golSpeed : kmSpeed) === 1 ? "Slow" : (isGol ? golSpeed : kmSpeed) === 2 ? "Normal" : "Fast"}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            value={isGol ? golSpeed : kmSpeed}
            onChange={(e) => isGol ? setGolSpeed(parseInt(e.target.value)) : setKmSpeed(parseInt(e.target.value))}
            disabled={isBusy}
            className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-cyan"
          />
        </div>
      </div>

      {/* Main Actions */}
      <div className="p-5 border-t border-brand-border/50 bg-black/20">
        {!isBusy ? (
          <button
            onClick={handleRunClick}
            className="btn-3d btn-3d-white w-full font-bold py-3 px-4 flex items-center justify-center gap-2 tracking-wide"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" height="16" width="16">
              <path d="M8 5v14l11-7z" />
            </svg>
            START
          </button>
        ) : (isGol ? golStatus : kmStatus) === "paused" ? (
          <button
            onClick={handleResume}
            className="btn-3d btn-3d-white w-full font-bold py-3 px-4 flex items-center justify-center gap-2 tracking-wide"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" height="16" width="16">
              <path d="M8 5v14l11-7z" />
            </svg>
            RESUME
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="btn-3d btn-3d-yellow w-full font-bold py-3 px-4 flex items-center justify-center gap-2 tracking-wide"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" height="16" width="16">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            PAUSE
          </button>
        )}

        <button
          onClick={handleStop}
          disabled={!isBusy}
          className="mt-3 w-full btn-3d btn-3d-rose font-medium py-2.5 px-4 flex items-center justify-center gap-2 text-sm"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" height="14" width="14">
            <path d="M6 6h12v12H6z" />
          </svg>
          STOP
        </button>
      </div>
    </aside>
  );
}
