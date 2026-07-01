import { useState, useRef, useCallback, useEffect } from "react";
import { GraphAlgorithmStatus, GraphNode, GraphEdge, GraphStep, GraphAlgorithmFn } from "@/lib/graphs/types";

const SPEED_DELAYS: Record<number, number> = {
  1: 1500, // Slow
  2: 800,  // Normal
  3: 300,  // Fast
};

export function useGraphEngine() {
  const [nodes, setNodes] = useState<Record<string, GraphNode>>({});
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [startNodeId, setStartNodeId] = useState<string>("");
  const [status, setStatus] = useState<GraphAlgorithmStatus>("idle");
  const [description, setDescription] = useState<string>("");
  const [speed, setSpeed] = useState(2);
  const [activeNodeIds, setActiveNodeIds] = useState<string[]>([]);

  const statusRef = useRef<GraphAlgorithmStatus>("idle");
  const speedRef = useRef(2);
  const generatorRef = useRef<Generator<GraphStep, void, unknown> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize graph from custom edges or default
  const initializeGraph = useCallback((edgeInput?: string) => {
    let newNodes: Record<string, GraphNode> = {};
    let newEdges: GraphEdge[] = [];

    const defaultInput = "A-B, B-C, C-D, A-E, E-F, F-C";
    const parseInput = edgeInput && edgeInput.trim() !== "" ? edgeInput : defaultInput;

    const pairs = parseInput.split(",").map(s => s.trim()).filter(s => s.includes("-"));
    
    // We will assign abstract x,y coordinates later in Visualizer, or we can do a simple circle layout here.
    // Let's do a simple circle layout for nodes here to keep them stable.
    const uniqueIds = new Set<string>();
    pairs.forEach(pair => {
      const [u, v] = pair.split("-").map(s => s.trim().toUpperCase());
      if (u && v) {
        uniqueIds.add(u);
        uniqueIds.add(v);
        newEdges.push({ id: `${u}-${v}`, source: u, target: v, status: "default" });
      }
    });

    const nodeArray = Array.from(uniqueIds);
    const radius = 200;
    const center = { x: 300, y: 300 }; // just base coordinates
    
    nodeArray.forEach((id, index) => {
      const angle = (index / nodeArray.length) * 2 * Math.PI - Math.PI / 2;
      newNodes[id] = {
        id,
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
        status: "default",
      };
    });

    setNodes(newNodes);
    setEdges(newEdges);
    setStartNodeId(nodeArray.length > 0 ? nodeArray[0] : "");
    setStatus("idle");
    setDescription("");
    setActiveNodeIds([]);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const step = useCallback(() => {
    if (statusRef.current !== "running" || !generatorRef.current) return;

    const result = generatorRef.current.next();

    if (result.done) {
      setStatus("completed");
      return;
    }

    const state = result.value;
    setNodes(state.nodes);
    setEdges(state.edges);
    setDescription(state.description);
    setActiveNodeIds(state.activeNodeIds);

    timeoutRef.current = setTimeout(step, SPEED_DELAYS[speedRef.current]);
  }, []);

  const run = useCallback(
    (algorithm: GraphAlgorithmFn) => {
      setStatus("running");
      generatorRef.current = algorithm(nodes, edges, startNodeId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(step, 0);
    },
    [nodes, edges, startNodeId, step]
  );

  const pause = useCallback(() => {
    if (status === "running") {
      setStatus("paused");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [status]);

  const resume = useCallback(() => {
    if (status === "paused") {
      setStatus("running");
      step();
    }
  }, [status, step]);

  const stop = useCallback(() => {
    setStatus("idle");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    generatorRef.current = null;
    
    setNodes(prev => {
      const cloned = { ...prev };
      for (const key in cloned) {
        cloned[key] = { ...cloned[key], status: "default" };
      }
      return cloned;
    });
    setEdges(prev => prev.map(e => ({ ...e, status: "default" })));
    setDescription("");
    setActiveNodeIds([]);
  }, []);

  return {
    nodes,
    edges,
    startNodeId,
    setStartNodeId,
    status,
    description,
    speed,
    activeNodeIds,
    setSpeed,
    initializeGraph,
    run,
    pause,
    resume,
    stop,
  };
}
