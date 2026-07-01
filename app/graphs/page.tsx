"use client";
import { useState } from "react";
import GraphVisualizer from "@/components/graphs/GraphVisualizer";
import GraphControls from "@/components/graphs/GraphControls";
import { useGraphEngine } from "@/hooks/useGraphEngine";
import Header from "@/components/Header";
import AlgoDetails from "@/components/AlgoDetails";

export default function GraphsPage() {
  const engine = useGraphEngine();
  const [selectedAlgo, setSelectedAlgo] = useState("traverseBFS");

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <Header />
      <div className="max-w-[1700px] mx-auto w-full flex-1 p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <div className="min-h-[500px]">
            <GraphVisualizer engine={engine} />
          </div>
          <AlgoDetails selectedAlgo={selectedAlgo === "traverseBFS" ? "bfs" : "dfs"} />
        </div>
        
        <div className="w-full md:w-[320px] xl:w-[360px] flex-shrink-0">
          <GraphControls engine={engine} selectedAlgo={selectedAlgo} setSelectedAlgo={setSelectedAlgo} />
        </div>
      </div>
    </main>
  );
}
