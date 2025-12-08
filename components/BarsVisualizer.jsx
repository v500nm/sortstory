"use client";

import { useEffect, useState } from "react";
import { metricsLive } from "@/lib/metrics";

export default function BarsVisualizer() {
  const [metrics, setMetrics] = useState(metricsLive);

  useEffect(() => {
    const id = setInterval(() => setMetrics({ ...metricsLive }), 200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex-1 p-6 flex flex-col space-y-4 relative">

      {/* Header */}
      <div className="text-center mb-1">
        <h1 className="text-4xl font-bold tracking-wide text-gray-100">SortViz</h1>
        <p className="text-sm text-gray-400">Interactive Sorting Algorithm Visualization</p>
      </div>

      {/* Visualization Card */}
      <div className="bg-[#0b1623]/80 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-4 flex flex-col h-[55vh]">
        <div className="flex justify-between text-gray-300 px-2 text-sm mb-2">
          <span>Visualization</span>
          <span className="flex gap-3">
            <span className="px-2 py-1 bg-purple-700/30 rounded-md text-purple-300 text-xs"> {metrics.swaps} Swaps </span>
            <span className="px-2 py-1 bg-yellow-600/30 rounded-md text-yellow-300 text-xs"> {metrics.comparisons} Comp </span>
            <span className="px-2 py-1 bg-blue-600/30 rounded-md text-blue-300 text-xs"> {metrics.time}ms </span>
          </span>
        </div>

        <div id="bars" className="flex-1 flex items-end justify-center overflow-hidden relative rounded-xl bg-gradient-to-b from-[#112031] to-[#0b1623] border border-white/5" />
      </div>

      {/* Legend */}
      <div className="bg-[#0b1623]/80 backdrop-blur-xl rounded-xl p-3 border border-white/10 shadow">
        <div className="grid grid-cols-5 text-center text-xs gap-3">
          <span className="flex items-center gap-2 justify-center">
            <div className="w-3 h-3 rounded bg-gray-400"></div> Normal
          </span>
          <span className="flex items-center gap-2 justify-center">
            <div className="w-3 h-3 rounded bg-purple-500"></div> Active
          </span>
          <span className="flex items-center gap-2 justify-center">
            <div className="w-3 h-3 rounded bg-yellow-400"></div> Comparing
          </span>
          <span className="flex items-center gap-2 justify-center">
            <div className="w-3 h-3 rounded bg-green-400"></div> Sorted
          </span>
          <span className="flex items-center gap-2 justify-center">
            <div className="w-3 h-3 rounded bg-red-500"></div> Pivot
          </span>
        </div>
      </div>
    </section>
  );
}
