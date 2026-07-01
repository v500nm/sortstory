import { useState, useRef, useCallback, useEffect } from "react";
import { TreeAlgorithmStatus, TreeNode, TreeStep, TreeAlgorithmFn } from "@/lib/trees/types";

const SPEED_DELAYS: Record<number, number> = {
  1: 1500, // Slow
  2: 800,  // Normal
  3: 300,  // Fast
};

export function useTreeEngine() {
  const [nodes, setNodes] = useState<Record<string, TreeNode>>({});
  const [rootId, setRootId] = useState<string | null>(null);
  const [status, setStatus] = useState<TreeAlgorithmStatus>("idle");
  const [description, setDescription] = useState<string>("");
  const [speed, setSpeed] = useState(2);
  const [activeNodeIds, setActiveNodeIds] = useState<string[]>([]);

  const statusRef = useRef<TreeAlgorithmStatus>("idle");
  const speedRef = useRef(2);
  const generatorRef = useRef<Generator<TreeStep, void, unknown> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper to build a BST from an array of numbers
  const initializeTree = useCallback((values: number[]) => {
    const newNodes: Record<string, TreeNode> = {};
    let newRootId: string | null = null;

    const insert = (val: number, root: string | null): string => {
      if (!root) {
        const id = `node-${val}-${Math.random().toString(36).substr(2, 9)}`;
        newNodes[id] = { id, value: val, left: null, right: null, status: "default" };
        if (!newRootId) newRootId = id;
        return id;
      }
      const node = newNodes[root];
      if (val < node.value) {
        node.left = insert(val, node.left);
      } else {
        node.right = insert(val, node.right);
      }
      return root;
    };

    if (values.length > 0) {
      for (const val of values) {
        insert(val, newRootId);
      }
    }

    setNodes(newNodes);
    setRootId(newRootId);
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
    setRootId(state.rootId);
    setDescription(state.description);
    setActiveNodeIds(state.activeNodeIds);

    timeoutRef.current = setTimeout(step, SPEED_DELAYS[speedRef.current]);
  }, []);

  const run = useCallback(
    (algorithm: TreeAlgorithmFn, targetValue?: number) => {
      setStatus("running");
      generatorRef.current = algorithm(nodes, rootId, targetValue);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(step, 0);
    },
    [nodes, rootId, step]
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
    
    // reset node statuses
    setNodes(prev => {
      const cloned = { ...prev };
      for (const key in cloned) {
        cloned[key] = { ...cloned[key], status: "default" };
      }
      return cloned;
    });
    setDescription("");
    setActiveNodeIds([]);
  }, []);

  return {
    nodes,
    rootId,
    status,
    description,
    speed,
    activeNodeIds,
    setSpeed,
    initializeTree,
    run,
    pause,
    resume,
    stop,
  };
}
