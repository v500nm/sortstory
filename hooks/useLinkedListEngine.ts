import { useState, useRef, useCallback, useEffect } from "react";
import { ListNode, LinkedListStep, LinkedListAlgorithmFn, LinkedListMetrics } from "@/lib/linked-lists/types";

export type LinkedListEngineStatus = "idle" | "running" | "paused" | "completed";

export function useLinkedListEngine() {
  const [nodes, setNodes] = useState<ListNode[]>([]);
  const [headId, setHeadId] = useState<string | null>(null);
  const [pointers, setPointers] = useState<Record<string, string | null>>({});
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<LinkedListEngineStatus>("idle");
  const [metrics, setMetrics] = useState<LinkedListMetrics>({ steps: 0, comparisons: 0, timeMs: 0 });
  const [speed, setSpeed] = useState<number>(2); // 1: Fast, 2: Normal, 3: Slow
  const [listSize, setListSize] = useState<number>(5);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("reverseList");

  const generatorRef = useRef<Generator<LinkedListStep, void, unknown> | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Helper to generate a random or custom linked list
  const initializeList = useCallback((size: number, createCycle: boolean = false, customValues?: number[]) => {
    const newNodes: ListNode[] = [];
    const actualSize = customValues ? customValues.length : size;
    
    for (let i = 0; i < actualSize; i++) {
      newNodes.push({
        id: `node-${i}`,
        value: customValues ? customValues[i] : Math.floor(Math.random() * 90) + 10,
        next: i < actualSize - 1 ? `node-${i + 1}` : null,
        prev: i > 0 ? `node-${i - 1}` : null,
        status: "default",
      });
    }

    if (createCycle && actualSize > 2) {
      // Connect last node to a random node in the middle
      const targetIndex = Math.floor(Math.random() * (actualSize - 1));
      newNodes[actualSize - 1].next = newNodes[targetIndex].id;
    }

    setNodes(newNodes);
    setHeadId(actualSize > 0 ? newNodes[0].id : null);
    setPointers({});
    setDescription("");
    setStatus("idle");
    setMetrics({ steps: 0, comparisons: 0, timeMs: 0 });
    generatorRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // Initialize on mount or when size changes
  useEffect(() => {
    initializeList(listSize);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [listSize, initializeList]);

  const executeStep = useCallback(() => {
    if (!generatorRef.current) return;

    const result = generatorRef.current.next();
    
    if (result.done) {
      setStatus("completed");
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const step = result.value;
    setNodes(step.nodes);
    setPointers(step.pointers);
    setDescription(step.description);
    
    setMetrics(prev => ({
      ...prev,
      steps: prev.steps + 1,
      timeMs: Date.now() - startTimeRef.current
    }));
  }, []);

  const run = useCallback((algorithm: LinkedListAlgorithmFn) => {
    // Reset nodes visual state
    const cleanNodes = nodes.map(n => ({ ...n, status: "default" as const }));
    setNodes(cleanNodes);
    setPointers({});
    setDescription("Starting algorithm...");
    setMetrics({ steps: 0, comparisons: 0, timeMs: 0 });
    
    generatorRef.current = algorithm(cleanNodes, headId);
    setStatus("running");
    startTimeRef.current = Date.now();
  }, [nodes, headId]);

  useEffect(() => {
    if (status === "running") {
      const delay = speed === 1 ? 200 : speed === 2 ? 600 : 1200;
      timerRef.current = setInterval(executeStep, delay);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, speed, executeStep]);

  const pause = useCallback(() => {
    if (status === "running") setStatus("paused");
  }, [status]);

  const resume = useCallback(() => {
    if (status === "paused") {
      startTimeRef.current = Date.now() - metrics.timeMs;
      setStatus("running");
    }
  }, [status, metrics.timeMs]);

  const stop = useCallback(() => {
    setStatus("idle");
    generatorRef.current = null;
    setPointers({});
    setDescription("");
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Clean up node statuses
    setNodes(prev => prev.map(n => ({ ...n, status: "default" })));
  }, []);

  const stepForward = useCallback(() => {
    if (status === "paused" || status === "idle") {
      executeStep();
    }
  }, [status, executeStep]);

  return {
    nodes,
    headId,
    pointers,
    description,
    status,
    metrics,
    speed,
    setSpeed,
    listSize,
    setListSize,
    selectedAlgorithm,
    setSelectedAlgorithm,
    run,
    pause,
    resume,
    stop,
    stepForward,
    initializeList,
  };
}
