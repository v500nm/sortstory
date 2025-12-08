"use client";

import * as sorts from "@/lib/index";
import { resetStates, pause, resume, stop } from "@/lib/core";
import { useState } from "react";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);

  const run = fn => {
    resetStates();
    fn();
    setSelected(fn.name);
  };

  return (
    <aside className="w-72 bg-white border-r flex flex-col justify-between p-4">

      <div>
        <h2 className="text-xl font-bold mb-4">Algorithms</h2>

        {/* Shuffle + Sort */}
        <button onClick={() => location.reload()} className="btn w-full mb-3">
          Shuffle Array
        </button>

        <div className="space-y-3 overflow-y-auto h-[65vh] pr-2">
          <details open>
            <summary className="font-semibold cursor-pointer">Comparison</summary>
            {["bubbleSort","cocktailSort","gnomeSort","selectionSort","insertionSort"]
              .map(x => <button key={x} className="side-btn" onClick={() => run(sorts[x])}>{x.replace("Sort","")}</button>)}
          </details>

          <details>
            <summary className="font-semibold cursor-pointer">Divide & Conquer</summary>
            {["mergeSortWrapper","quickSortWrapper","heapSort","bitonicSortWrapper"]
              .map(x => <button key={x} className="side-btn" onClick={() => run(sorts[x])}>{x.replace("Sort","")}</button>)}
          </details>

          <details>
            <summary className="font-semibold cursor-pointer">Distribution</summary>
            {["radixSort","oddEvenSort"].map(x => (
              <button key={x} className="side-btn" onClick={() => run(sorts[x])}>{x.replace("Sort","")}</button>
            ))}
          </details>

          <details>
            <summary className="font-semibold cursor-pointer">Fun Sorts</summary>
            {["pancakeSort","bogoSort","stoogeSortWrapper"].map(x => (
              <button key={x} className="side-btn" onClick={() => run(sorts[x])}>{x.replace("Sort","")}</button>
            ))}
          </details>
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t">
        <button onClick={pause} className="btn w-full">Pause</button>
        <button onClick={resume} className="btn w-full">Resume</button>
        <button onClick={stop} className="btn w-full bg-red-500">Stop</button>
      </div>
    </aside>
  );
}
