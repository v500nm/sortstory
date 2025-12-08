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
    <aside className="w-80 bg-[#0b1623]/80 backdrop-blur-xl border-r border-white/10 p-5 flex flex-col justify-between shadow-xl">

      <div>
        <h2 className="text-lg font-semibold text-gray-200 mb-4">Controls</h2>

        <button onClick={() => location.reload()} className="bg-blue-600/90 hover:bg-blue-500 w-full text-white py-2 rounded-lg mb-3">
          Shuffle
        </button>

        <div className="max-h-[60vh] overflow-y-auto space-y-4 text-gray-300">
          
          {/* Example Category */}
          <details open className="group">
            <summary className="cursor-pointer font-semibold text-gray-100">Comparison</summary>
            <div className="mt-2 flex flex-col gap-2">
              {["bubbleSort","cocktailSort","gnomeSort","selectionSort","insertionSort"].map(x => (
                <button
                  key={x}
                  className={`px-3 py-2 rounded-md text-sm bg-white/5 hover:bg-white/10 border border-white/5 ${
                    selected === x ? "bg-blue-600 text-white border-blue-400" : ""
                  }`}
                  onClick={() => run(sorts[x])}
                >
                  {x.replace("Sort","")}
                </button>
              ))}
            </div>
          </details>

          {/* Add remaining exact same pattern */}
        </div>
      </div>

      {/* Footer Btns */}
      <div className="space-y-3">
        <button onClick={pause} className="w-full py-2 rounded-lg bg-yellow-400/20 text-yellow-300 border border-yellow-500/30">Pause</button>
        <button onClick={resume} className="w-full py-2 rounded-lg bg-green-400/20 text-green-300 border border-green-500/30">Resume</button>
        <button onClick={stop} className="w-full py-2 rounded-lg bg-red-500/40 text-red-300 border border-red-600/30">Stop</button>
      </div>
    </aside>
  );
}
