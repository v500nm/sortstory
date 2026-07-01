"use client";
import { useState } from "react";
import TreeVisualizer from "@/components/trees/TreeVisualizer";
import TreeControls from "@/components/trees/TreeControls";
import { useTreeEngine } from "@/hooks/useTreeEngine";
import Header from "@/components/Header";
import AlgoDetails from "@/components/AlgoDetails";

export default function TreesPage() {
  const engine = useTreeEngine();
  const [selectedAlgo, setSelectedAlgo] = useState("searchBST");

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <Header />
      <div className="max-w-[1700px] mx-auto w-full flex-1 p-6 flex flex-col md:flex-row gap-6">
        {/* Visualizer Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="min-h-[500px]">
            <TreeVisualizer engine={engine} />
          </div>
          
          {/* Map internal Tree operation names to the AlgoDetails IDs */}
          <AlgoDetails selectedAlgo={
            selectedAlgo === "searchBST" || selectedAlgo === "insertBST" ? "bst" : 
            selectedAlgo === "traversePreOrder" ? "preOrder" :
            selectedAlgo === "traverseInOrder" ? "inOrder" : "postOrder"
          } />
        </div>
        
        {/* Controls Area */}
        <div className="w-full md:w-[320px] xl:w-[360px] flex-shrink-0">
          <TreeControls 
            engine={engine} 
            selectedAlgo={selectedAlgo} 
            setSelectedAlgo={setSelectedAlgo} 
          />
        </div>
      </div>
    </main>
  );
}
