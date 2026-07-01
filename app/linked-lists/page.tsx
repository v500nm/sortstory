"use client";
import LinkedListVisualizer from "@/components/linked-lists/LinkedListVisualizer";
import LinkedListControls from "@/components/linked-lists/LinkedListControls";
import { useLinkedListEngine } from "@/hooks/useLinkedListEngine";

import Header from "@/components/Header";
import AlgoDetails from "@/components/AlgoDetails";

export default function LinkedListsPage() {
  const engine = useLinkedListEngine();

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <Header />
      <div className="max-w-[1700px] mx-auto w-full flex-1 p-6 flex flex-col md:flex-row gap-6">
        {/* Visualizer Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="min-h-[500px]">
            <LinkedListVisualizer engine={engine} />
          </div>
          <AlgoDetails selectedAlgo={engine.listType} />
        </div>
        
        {/* Controls Area */}
        <div className="w-full md:w-[320px] xl:w-[360px] flex-shrink-0">
          <LinkedListControls engine={engine} />
        </div>
      </div>
    </main>
  );
}
