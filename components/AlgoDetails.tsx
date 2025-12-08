import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const algoData: Record<string, any> = {
  bubbleSort: {
    name: "Bubble Sort",
    desc: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted.",
    time: "O(n²)",
    space: "O(1)",
    best: "O(n)",
    worst: "O(n²)"
  },
  // Add others...
  quickSortWrapper: {
    name: "Quick Sort",
    desc: "A divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.",
    time: "O(n log n)",
    space: "O(log n)",
    best: "O(n log n)",
    worst: "O(n²)"
  }
};

export default function AlgoDetails({ selectedAlgo }: { selectedAlgo: string }) {
  const info = algoData[selectedAlgo] || algoData.bubbleSort;

  return (
    <Card className="border-none shadow-lg bg-card">
       <CardContent className="p-6">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="flex items-center gap-3">
               <BookOpen className="text-primary w-6 h-6" />
               <h2 className="text-lg font-semibold">Algorithm Details</h2>
            </div>
            <div className="flex gap-2 mt-3 sm:mt-0">
               <Badge variant="secondary" className="bg-background text-foreground">Time Complexity</Badge>
               <Badge variant="outline" className="text-muted-foreground border-border">Pseudocode</Badge>
            </div>
         </div>

         <div>
           <h3 className="text-xl font-bold text-primary mb-2">{info.name}</h3>
           <p className="text-muted-foreground leading-relaxed text-sm mb-6 max-w-4xl">
             {info.desc}
           </p>

           <div className="border-t border-border pt-4">
              <h4 className="font-semibold mb-3 text-sm">Complexity Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                 <div>
                    <span className="block text-muted-foreground text-xs mb-1">Time (Average)</span>
                    <span className="text-primary font-mono font-bold">{info.time}</span>
                 </div>
                 <div>
                    <span className="block text-muted-foreground text-xs mb-1">Space</span>
                    <span className="text-foreground font-mono font-bold">{info.space}</span>
                 </div>
                 <div>
                    <span className="block text-muted-foreground text-xs mb-1">Best Case</span>
                    <span className="text-muted-foreground font-mono">{info.best}</span>
                 </div>
                 <div>
                    <span className="block text-muted-foreground text-xs mb-1">Worst Case</span>
                    <span className="text-destructive font-mono">{info.worst}</span>
                 </div>
              </div>
           </div>
         </div>
       </CardContent>
    </Card>
  );
}