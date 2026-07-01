"use client";
import { useState } from "react";
import { useLinkedListEngine } from "@/hooks/useLinkedListEngine";
import { linkedListAlgorithms } from "@/lib/linked-lists/algorithms";

interface Props {
  engine: ReturnType<typeof useLinkedListEngine>;
}

export default function LinkedListControls({ engine }: Props) {
  const {
    status,
    run,
    pause,
    resume,
    stop,
    stepForward,
    initializeList,
    listSize,
    setListSize,
    speed,
    setSpeed,
  } = engine;

  const isBusy = status === "running" || status === "paused";
  const [selectedAlgo, setSelectedAlgo] = useState("reverseList");
  const [customInput, setCustomInput] = useState("");

  const handleRunClick = () => {
    if (selectedAlgo === "reverseList") run(linkedListAlgorithms.reverseList);
    if (selectedAlgo === "detectCycle") run(linkedListAlgorithms.detectCycle);
    if (selectedAlgo === "findMiddle") run(linkedListAlgorithms.findMiddle);
  };

  const handleInitialize = (withCycle: boolean) => {
    let customValues: number[] | undefined = undefined;
    if (customInput.trim()) {
       customValues = customInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
       if (customValues.length === 0) customValues = undefined;
    }
    initializeList(listSize, withCycle, customValues);
  };

  return (
    <aside className="card-3d p-6 space-y-6 relative overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold tracking-wide text-brand-text-primary uppercase">
          Operations
        </h2>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0a0a0a] border border-brand-border">
          <span
            className={`w-2 h-2 rounded-full ${
              status === "running" ? "bg-brand-green animate-pulse" :
              status === "paused" ? "bg-brand-yellow animate-pulse" :
              status === "completed" ? "bg-brand-purple" :
              "bg-slate-500"
            }`}
          />
          <span className="text-[10px] text-brand-text-secondary uppercase">{status}</span>
        </div>
      </div>

      {/* Operation Select */}
      <div className="space-y-2">
        <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
          ALGORITHM
        </label>
        <select
          value={selectedAlgo}
          onChange={(e) => {
            setSelectedAlgo(e.target.value);
            // Automatically initialize a list with cycle if cycle detection is selected
            if (e.target.value === "detectCycle") {
               handleInitialize(true);
            } else {
               handleInitialize(false);
            }
          }}
          disabled={isBusy}
          className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2 px-3 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-purple outline-none"
        >
          <option value="reverseList">Reverse List</option>
          <option value="detectCycle">Detect Cycle (Tortoise & Hare)</option>
          <option value="findMiddle">Find Middle Node</option>
        </select>
      </div>

      {/* List Size */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            LIST SIZE
          </label>
          <span className="text-xs font-mono bg-[#111111] px-2 py-0.5 rounded border border-brand-border text-white">
            {listSize}
          </span>
        </div>
        <input
          type="range"
          min="3"
          max="15"
          value={listSize}
          onChange={(e) => {
            setListSize(Number(e.target.value));
            handleInitialize(selectedAlgo === "detectCycle");
          }}
          disabled={isBusy}
          className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-purple"
        />
      </div>

      {/* Speed Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
            SPEED
          </label>
          <span className="text-xs font-mono text-brand-text-primary bg-[#111111] px-2 py-0.5 rounded border border-brand-border">
            {speed === 1 ? "Fast" : speed === 2 ? "Normal" : "Slow"}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="3"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-cyan"
        />
      </div>

      {/* Custom Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold tracking-wide text-brand-text-secondary">
          CUSTOM LIST (COMMA SEPARATED)
        </label>
        <input
          type="text"
          placeholder="e.g. 5, 10, 15"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          disabled={isBusy}
          className="w-full bg-brand-bg-dark border border-brand-border rounded-lg py-2 px-3 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-purple outline-none"
        />
      </div>

      {/* Generation Actions */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={() => handleInitialize(false)}
          disabled={isBusy}
          className="btn-3d py-2 px-3 text-[11px] font-semibold tracking-wide text-white"
        >
          NEW LIST
        </button>
        <button
          onClick={() => handleInitialize(true)}
          disabled={isBusy}
          className="btn-3d py-2 px-3 text-[11px] font-semibold tracking-wide text-white"
        >
          NEW (WITH CYCLE)
        </button>
      </div>

      {/* Main Actions */}
      <div className="space-y-3 pt-4 border-t border-brand-border/50 mt-auto">
        {!isBusy ? (
          <button
            onClick={handleRunClick}
            className="btn-3d btn-3d-white w-full font-bold py-3 px-4 flex items-center justify-center gap-2 tracking-wide"
          >
            START ALGORITHM
          </button>
        ) : (
          <div className="flex gap-2">
            {status === "running" ? (
              <button
                onClick={pause}
                className="btn-3d btn-3d-yellow flex-1 font-bold py-3 flex items-center justify-center gap-2"
              >
                PAUSE
              </button>
            ) : (
              <button
                onClick={resume}
                className="btn-3d btn-3d-white flex-1 font-bold py-3 flex items-center justify-center gap-2"
              >
                RESUME
              </button>
            )}
            <button
              onClick={stepForward}
              disabled={status !== "paused"}
              className="btn-3d btn-3d-purple flex-1 font-bold py-3 flex items-center justify-center disabled:opacity-50"
            >
              STEP
            </button>
          </div>
        )}

        <button
          onClick={stop}
          disabled={!isBusy && status !== "completed"}
          className="btn-3d btn-3d-rose w-full font-medium py-2.5 px-4 flex items-center justify-center text-sm disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
