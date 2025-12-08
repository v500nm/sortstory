"use client";

import { 
  Play, 
  Pause, 
  Square, 
  Shuffle, 
  SlidersHorizontal,
  Settings2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { resetStates, pause, resume, stop } from "@/lib/core"; 
import * as sorts from "@/lib/index"; 

// 1. Configuration Data: Maps categories to algorithm function names
const algoCategories = [
  {
    category: "Comparison",
    items: [
      { name: "Bubble", key: "bubbleSort" },
      { name: "Cocktail", key: "cocktailSort" },
      { name: "Gnome", key: "gnomeSort" },
      { name: "Selection", key: "selectionSort" },
      { name: "Insertion", key: "insertionSort" },
    ]
  },
  {
    category: "Divide & Conquer",
    items: [
      { name: "Merge", key: "mergeSortWrapper" },
      { name: "Quick", key: "quickSortWrapper" },
      { name: "Heap", key: "heapSort" },
      { name: "Bitonic", key: "bitonicSortWrapper" },
    ]
  },
  {
    category: "Distribution",
    items: [
      { name: "Radix", key: "radixSort" },
      { name: "Odd Even", key: "oddEvenSort" },
    ]
  },
  {
    category: "Fun Sorts",
    items: [
      { name: "Pancake", key: "pancakeSort" },
      { name: "Bogo", key: "bogoSort" },
      { name: "Stooge", key: "stoogeSortWrapper" },
    ]
  }
];

interface Props {
  selectedAlgo: string;
  setSelectedAlgo: (val: string) => void;
  onRun: () => void;
}

export default function ControlsPanel({ selectedAlgo, setSelectedAlgo, onRun }: Props) {

  // Logic to handle running an algorithm immediately upon selection
  const handleAlgoSelect = (key: string) => {
    resetStates();
    setSelectedAlgo(key);
    
    // We get the function from the library using the string key
    const sortFn = (sorts as any)[key];
    if (sortFn) {
        sortFn();
    }
  };

  const handleShuffle = () => {
    // Reload is a simple way to shuffle, or you can call a specific shuffle function
    resetStates();
    location.reload(); 
  };

  return (
    <Card className="border-none shadow-xl bg-card h-[calc(100vh-100px)] flex flex-col">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg font-semibold text-foreground">Controls</CardTitle>
            </div>
        </div>
      </CardHeader>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Scrollable Area for Controls & List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            
            {/* 1. Global Actions */}
            <Button 
                onClick={handleShuffle} 
                variant="outline" 
                className="w-full border-dashed border-border hover:bg-muted text-muted-foreground hover:text-foreground"
            >
                <Shuffle className="w-4 h-4 mr-2" /> Randomize Array
            </Button>

            {/* 2. Sliders */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Array Size</label>
                    <Slider defaultValue={[15]} max={50} min={5} step={1} className="cursor-pointer" onValueChange={() => resetStates()} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Speed</label>
                    <Slider defaultValue={[2]} max={5} min={1} step={1} className="cursor-pointer" />
                </div>
            </div>

            {/* 3. Algorithm List (Accordion) */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Algorithms</label>
                
                <Accordion type="single" collapsible defaultValue="Comparison" className="w-full">
                    {algoCategories.map((cat) => (
                        <AccordionItem key={cat.category} value={cat.category} className="border-border">
                            <AccordionTrigger className="text-sm py-3 hover:no-underline hover:text-primary transition-colors">
                                {cat.category}
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-1 pb-3">
                                {cat.items.map((algo) => (
                                    <Button
                                        key={algo.key}
                                        variant={selectedAlgo === algo.key ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => handleAlgoSelect(algo.key)}
                                        className={`w-full justify-start pl-4 font-normal ${
                                            selectedAlgo === algo.key 
                                            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        }`}
                                    >
                                        {algo.name}
                                    </Button>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
      </div>

      {/* Footer: Playback Controls */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-2">
            <Button 
                onClick={pause} 
                variant="outline" 
                className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
            >
                <Pause className="w-4 h-4 mr-1" /> Pause
            </Button>
            <Button 
                onClick={resume} 
                variant="outline" 
                className="border-green-500/30 text-green-500 hover:bg-green-500/10 hover:text-green-400"
            >
                <Play className="w-4 h-4 mr-1" /> Resume
            </Button>
            <Button 
                onClick={stop} 
                variant="outline" 
                className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
                <Square className="w-4 h-4 mr-1 fill-current" /> Stop
            </Button>
        </div>
      </div>
    </Card>
  );
}