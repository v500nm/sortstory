"use client";

import { useEffect, useState } from "react";
import { metricsLive } from "@/lib/metrics";
import { BarChart3, Activity, Clock, RefreshCcw } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function BarsVisualizer() {
  const [metrics, setMetrics] = useState(metricsLive);

  useEffect(() => {
    const id = setInterval(() => setMetrics({ ...metricsLive }), 100);
    return () => clearInterval(id);
  }, []);

  return (
    <Card className="h-full border-none shadow-lg bg-card flex flex-col p-6">
      
      {/* Header Stats */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 items-baseline border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-primary w-6 h-6" />
          <h2 className="text-lg font-semibold">Visualization</h2>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2 sm:mt-0">
          <span className="flex items-center gap-1.5" title="Comparisons">
             <Activity className="w-4 h-4 text-purple-400" /> {metrics.comparisons}
          </span>
          <span className="flex items-center gap-1.5" title="Swaps">
             <RefreshCcw className="w-4 h-4 text-yellow-400" /> {metrics.swaps}
          </span>
          <span className="flex items-center gap-1.5" title="Time">
             <Clock className="w-4 h-4 text-green-400" /> {metrics.time}ms
          </span>
        </div>
      </div>

      {/* Bar Chart Area - Matches logic of your original component but updated container */}
      <div 
        id="bars" 
        className="flex-grow flex items-end justify-center gap-1 px-4 min-h-[300px] relative"
      >
        {/* Bars are injected here by your Vanilla JS / Lib logic via ID */}
        {/* If your logic generates divs, ensure they have the class 'bar' defined in CSS */}
      </div>

      {/* Legend */}
      <div className="border-t border-border mt-6 pt-4">
        <h3 className="text-sm mb-3 font-semibold text-muted-foreground">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary"></span>Normal</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--primary)] brightness-125"></span>Active</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--color-brand-yellow)]"></span>Comparing</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--color-brand-green)]"></span>Sorted</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span>Pivot</div>
        </div>
      </div>
    </Card>
  );
}