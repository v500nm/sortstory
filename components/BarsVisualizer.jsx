"use client";

import { useEffect, useState } from "react";
import { metricsReset, metricsLive } from "@/lib/metrics";

export default function BarsVisualizer() {
  const [metrics, setMetrics] = useState(metricsLive);

  useEffect(() => {
    const id = setInterval(() => setMetrics({ ...metricsLive }), 200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex-1 p-6 flex flex-col">
      
      <div className="text-right pr-6 mb-2 text-gray-700 font-semibold">
        {metrics.selectedAlgo || "No Algorithm Selected"}
      </div>

      <div id="bars" className="flex-1 bg-gray-200 flex items-end justify-center overflow-hidden rounded-lg" />

      {/* LIVE METRICS */}
      <div className="bg-white mt-4 p-4 rounded-lg shadow grid grid-cols-3 gap-4 text-center">
        <div><span className="metric">⏱ Time</span><p>{metrics.time} ms</p></div>
        <div><span className="metric">🔀 Swaps</span><p>{metrics.swaps}</p></div>
        <div><span className="metric">📊 Comparisons</span><p>{metrics.comparisons}</p></div>
      </div>
    </section>
  );
}
