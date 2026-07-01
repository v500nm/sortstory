import { useEffect, useState, useRef, ReactNode } from "react";
import { useGraphEngine } from "@/hooks/useGraphEngine";
import { GraphNodeStatus } from "@/lib/graphs/types";

interface Props {
  engine: ReturnType<typeof useGraphEngine>;
}

interface NodePos {
  x: number;
  y: number;
}

export default function GraphVisualizer({ engine }: Props) {
  const { nodes, edges, description, activeNodeIds } = engine;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [positions, setPositions] = useState<Record<string, NodePos>>({});

  useEffect(() => {
    if (Object.keys(nodes).length === 0 || !containerRef.current) {
      setPositions({});
      return;
    }

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    const newPositions: Record<string, NodePos> = {};
    const nodeIds = Object.keys(nodes);
    
    // Calculate radius based on container size, leaving padding
    const radiusX = (width / 2) - 60;
    const radiusY = (height / 2) - 60;
    const centerX = width / 2;
    const centerY = height / 2;

    nodeIds.forEach((id, index) => {
      // Offset angle by -90 deg so first node is at top
      const angle = (index / nodeIds.length) * 2 * Math.PI - Math.PI / 2;
      newPositions[id] = {
        x: centerX + radiusX * Math.cos(angle),
        y: centerY + radiusY * Math.sin(angle),
      };
    });
    
    setPositions(newPositions);
  }, [nodes]); 

  const renderEdges = () => {
    const edgeElements: ReactNode[] = [];
    edges.forEach((edge) => {
      const sourcePos = positions[edge.source];
      const targetPos = positions[edge.target];
      if (!sourcePos || !targetPos) return;

      const isActive = edge.status === "active";

      edgeElements.push(
        <line
          key={edge.id}
          x1={sourcePos.x}
          y1={sourcePos.y}
          x2={targetPos.x}
          y2={targetPos.y}
          stroke={isActive ? "#818cf8" : "#333"}
          strokeWidth={isActive ? "4" : "2"}
          className="transition-all duration-300"
        />
      );
    });
    return edgeElements;
  };

  const getNodeColorClass = (status: GraphNodeStatus, id: string) => {
    if (activeNodeIds.includes(id) || status === "active") return "bg-brand-purple text-white shadow-[0_0_20px_rgba(129,140,248,0.5)] border-transparent";
    if (status === "visiting") return "bg-brand-yellow text-black shadow-[0_0_20px_rgba(250,204,21,0.5)] border-transparent";
    if (status === "visited") return "bg-brand-cyan text-black shadow-[0_0_20px_rgba(34,211,238,0.5)] border-transparent";
    return "bg-[#111111] text-brand-text-primary shadow-lg border border-brand-border/50";
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Description Overlay */}
      {description && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-brand-border text-brand-cyan font-mono text-sm shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <svg fill="currentColor" viewBox="0 0 24 24" height="16" width="16">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {description}
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="relative w-full h-[600px] mt-4" ref={containerRef}>
        
        {/* SVG Edges Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {renderEdges()}
        </svg>

        {/* HTML Nodes Layer */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {Object.values(nodes).map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;

            return (
              <div
                key={node.id}
                className={`absolute w-14 h-14 -ml-7 -mt-7 rounded-full flex flex-col items-center justify-center font-bold font-mono transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] element-3d pointer-events-auto ${getNodeColorClass(node.status, node.id)}`}
                style={{
                  left: pos.x,
                  top: pos.y,
                }}
              >
                {node.id}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
