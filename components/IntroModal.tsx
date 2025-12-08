"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function IntroModal({ close }: { close: () => void }) {
  const handleClose = (dontShow: boolean) => {
    if (dontShow) localStorage.setItem("sortviz_intro", "true");
    close();
  };

  return (
    <Dialog open={true} onOpenChange={() => handleClose(false)}>
      <DialogContent className="bg-card border-border text-foreground max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif-display italic">Welcome to SortViz 🎉</DialogTitle>
          <DialogDescription className="text-muted-foreground">
             Visualize 17+ sorting algorithms with real-time metrics, step-by-step execution, and deep dive analysis.
          </DialogDescription>
        </DialogHeader>

        <ul className="text-sm space-y-2 bg-background/50 p-4 rounded-lg border border-border">
           <li>• Select an algorithm from the <strong>Controls</strong> panel.</li>
           <li>• Adjust <strong>Size</strong> and <strong>Speed</strong> sliders.</li>
           <li>• Watch the <strong>Visualization</strong> update in real-time.</li>
        </ul>

        <DialogFooter className="flex sm:justify-between gap-2">
           <Button variant="ghost" onClick={() => handleClose(true)} className="text-muted-foreground">
             Don't show again
           </Button>
           <Button onClick={() => handleClose(false)} className="bg-primary hover:bg-primary/90 text-white">
             Get Started 🚀
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}