"use client";
import { useEffect, useRef, useState } from "react";
import { useLinkedListEngine } from "@/hooks/useLinkedListEngine";
import { NodeStatus } from "@/lib/linked-lists/types";

interface Props {
  engine: ReturnType<typeof useLinkedListEngine>;
}

const STATUS_COLORS: Record<NodeStatus, string> = {
  default: "bg-brand-bg-card border-black text-brand-text-primary",
  evaluating: "bg-brand-cyan text-black shadow-[0_4px_0_0_#0891b2,inset_2px_2px_0_0_rgba(255,255,255,0.4)]",
  sorted: "bg-brand-green text-black shadow-[0_4px_0_0_#047857,inset_2px_2px_0_0_rgba(255,255,255,0.4)]",
  discarded: "bg-brand-bg-dark text-brand-text-secondary opacity-30",
  pointer1: "bg-brand-yellow text-black shadow-[0_4px_0_0_#b45309,inset_2px_2px_0_0_rgba(255,255,255,0.4)]", // curr / slow
  pointer2: "bg-brand-purple text-white shadow-[0_4px_0_0_#581c87,inset_2px_2px_0_0_rgba(255,255,255,0.4)]", // prev / fast
  cycle: "bg-brand-rose text-white shadow-[0_4px_0_0_#be123c,inset_2px_2px_0_0_rgba(255,255,255,0.4)] animate-pulse",
};

export default function LinkedListVisualizer({ engine }: Props) {
  const { nodes, headId, pointers, description, metrics } = engine;
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});

  // Update positions for SVG arrows whenever nodes change
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPos: Record<string, { x: number; y: number }> = {};
      
      nodes.forEach((node) => {
        const el = document.getElementById(`ll-node-${node.id}`);
        if (el) {
          const elRect = el.getBoundingClientRect();
          newPos[node.id] = {
            x: elRect.left - rect.left + elRect.width / 2,
            y: elRect.top - rect.top + elRect.height / 2,
          };
        }
      });
      setNodePositions(newPos);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [nodes]);

  // Group pointers by node ID to display labels
  const pointerLabelsByNode: Record<string, string[]> = {};
  Object.entries(pointers).forEach(([name, targetId]) => {
    if (targetId) {
      if (!pointerLabelsByNode[targetId]) pointerLabelsByNode[targetId] = [];
      pointerLabelsByNode[targetId].push(name);
    }
  });

  if (!nodes.length) {
    return <div className="card-3d p-6 h-full flex items-center justify-center text-brand-text-secondary">Initialize list to begin</div>;
  }

  return (
    <div className="card-3d flex flex-col h-full relative overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-brand-border/50 bg-black/20 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded flex items-center justify-center bg-brand-border">
            <svg fill="none" height="12" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="12" className="text-white">
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="12" r="3" />
              <line x1="9" x2="15" y1="12" y2="12" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold tracking-wider text-brand-accent">LINKED LIST</h2>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-semibold tracking-wider text-brand-text-secondary uppercase">Steps</span>
             <span className="text-sm font-mono text-brand-accent">{metrics.steps}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-brand-bg-dark/50 text-sm font-mono text-brand-yellow text-center z-20 border-b border-brand-border/30 h-14 flex items-center justify-center">
        {description || "Ready to run algorithm..."}
      </div>

      {/* Main visualization area */}
      <div className="flex-1 relative p-8 overflow-auto flex items-center justify-center" ref={containerRef}>
        
        {/* SVG layer for arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ minWidth: "100%", minHeight: "100%" }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ffffff" opacity="0.6" />
            </marker>
          </defs>
          
          {nodes.map((node) => {
            if (!node.next || !nodePositions[node.id] || !nodePositions[node.next]) return null;
            
            const start = nodePositions[node.id];
            const end = nodePositions[node.next];
            
            // If adjacent right (next node in array), draw straight line
            // If pointing somewhere else, draw curved line
            const isAdjacentRight = nodes.findIndex(n => n.id === node.id) + 1 === nodes.findIndex(n => n.id === node.next);
            
            let d = "";
            if (isAdjacentRight) {
               d = `M ${start.x + 35} ${start.y} L ${end.x - 35} ${end.y}`;
            } else {
               // Curve over or under
               const isBackward = start.x > end.x;
               const offset = isBackward ? 60 : -60;
               d = `M ${start.x} ${start.y + (isBackward ? 35 : -35)} Q ${(start.x + end.x) / 2} ${start.y + offset}, ${end.x} ${end.y + (isBackward ? 35 : -35)}`;
            }

            return (
              <path
                key={`link-${node.id}`}
                d={d}
                stroke="#ffffff"
                strokeWidth="3"
                strokeOpacity="0.4"
                fill="none"
                markerEnd="url(#arrowhead)"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Node Elements */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-16 max-w-5xl relative z-20">
          {nodes.map((node) => (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* Pointer Labels (Top) */}
              <div className="absolute -top-8 flex gap-1 whitespace-nowrap">
                {pointerLabelsByNode[node.id]?.map(label => (
                   <span key={label} className="px-1.5 py-0.5 text-[10px] bg-brand-bg-dark border border-brand-border rounded text-brand-accent font-mono uppercase shadow-sm">
                     {label}
                   </span>
                ))}
              </div>
              
              {/* Node Body */}
              <div
                id={`ll-node-${node.id}`}
                className={`element-3d w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold font-mono transition-all duration-300 ${STATUS_COLORS[node.status]}`}
              >
                {node.value}
              </div>

              {/* Node ID (Bottom) */}
              <div className="absolute -bottom-6 text-[10px] text-brand-text-secondary font-mono">
                {node.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
