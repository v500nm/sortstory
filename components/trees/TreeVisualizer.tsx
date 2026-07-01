import { useEffect, useState, useRef, ReactNode } from "react";
import { useTreeEngine } from "@/hooks/useTreeEngine";
import { TreeNode } from "@/lib/trees/types";

interface Props {
  engine: ReturnType<typeof useTreeEngine>;
}

interface NodePos {
  x: number;
  y: number;
}

export default function TreeVisualizer({ engine }: Props) {
  const { nodes, rootId, description, activeNodeIds } = engine;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Stores calculated pixel positions of each node
  const [positions, setPositions] = useState<Record<string, NodePos>>({});

  useEffect(() => {
    if (!rootId || !containerRef.current) {
      setPositions({});
      return;
    }

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // We compute a level-order or recursive pass to assign abstract coordinates
    const newPositions: Record<string, NodePos> = {};
    
    // Depth Y offset, X offset is based on width
    const Y_STEP = 80;
    const START_Y = 40;

    const assignPositions = (nodeId: string, depth: number, x: number, xOffset: number) => {
      const node = nodes[nodeId];
      if (!node) return;

      newPositions[nodeId] = { x, y: START_Y + depth * Y_STEP };

      if (node.left) {
        assignPositions(node.left, depth + 1, x - xOffset, xOffset / 2);
      }
      if (node.right) {
        assignPositions(node.right, depth + 1, x + xOffset, xOffset / 2);
      }
    };

    // start root at center
    assignPositions(rootId, 0, width / 2, width / 4);
    
    setPositions(newPositions);
  }, [nodes, rootId]); // Recalculate if tree structure changes

  // Helper to draw a curved SVG line between parent and child
  const renderEdge = (parentId: string, childId: string) => {
    const parentPos = positions[parentId];
    const childPos = positions[childId];
    if (!parentPos || !childPos) return null;

    // A simple cubic bezier curve going down
    const path = `M ${parentPos.x} ${parentPos.y + 24} 
                  C ${parentPos.x} ${parentPos.y + 60}, 
                    ${childPos.x} ${childPos.y - 40}, 
                    ${childPos.x} ${childPos.y - 24}`;

    return (
      <path
        key={`${parentId}-${childId}`}
        d={path}
        fill="none"
        stroke="#333"
        strokeWidth="3"
        strokeDasharray="4 4"
        className="transition-all duration-300"
      />
    );
  };

  const renderEdges = () => {
    const edges: ReactNode[] = [];
    Object.values(nodes).forEach((node) => {
      if (node.left) {
        edges.push(renderEdge(node.id, node.left));
      }
      if (node.right) {
        edges.push(renderEdge(node.id, node.right));
      }
    });
    return edges;
  };

  const getNodeColorClass = (status: TreeNode["status"], id: string) => {
    if (activeNodeIds.includes(id) || status === "active") return "bg-brand-purple text-white shadow-[0_0_20px_rgba(129,140,248,0.5)]";
    if (status === "found") return "bg-brand-cyan text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]";
    if (status === "comparing") return "bg-brand-yellow text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]";
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
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center font-bold font-mono transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] element-3d pointer-events-auto ${getNodeColorClass(node.status, node.id)}`}
                style={{
                  left: pos.x,
                  top: pos.y,
                }}
              >
                {node.value}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
