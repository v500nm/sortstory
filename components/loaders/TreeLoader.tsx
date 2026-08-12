"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

// BST layout positions: each node has id, value, x, y, parentId
const TREE_NODES = [
  { id: 0, value: 50, x: 130, y: 15 },
  { id: 1, value: 30, x: 65, y: 60 },
  { id: 2, value: 70, x: 195, y: 60 },
  { id: 3, value: 20, x: 32, y: 105 },
  { id: 4, value: 40, x: 98, y: 105 },
  { id: 5, value: 60, x: 162, y: 105 },
  { id: 6, value: 80, x: 228, y: 105 },
];

const TREE_EDGES: [number, number][] = [
  [0, 1], [0, 2],
  [1, 3], [1, 4],
  [2, 5], [2, 6],
];

// In-order traversal: 3, 1, 4, 0, 5, 2, 6
const INORDER = [3, 1, 4, 0, 5, 2, 6];

export default function TreeLoader() {
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [currentNode, setCurrentNode] = useState<number>(-1);

  useEffect(() => {
    let cancelled = false;
    let step = 0;

    const run = () => {
      step = 0;
      setVisitedNodes(new Set());
      setCurrentNode(-1);

      const timer = setInterval(() => {
        if (cancelled) return;

        if (step < INORDER.length) {
          const nodeId = INORDER[step];
          setCurrentNode(nodeId);
          setVisitedNodes((prev) => new Set([...prev, nodeId]));
          step++;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            if (!cancelled) run();
          }, 700);
        }
      }, 280);

      return timer;
    };

    const timer = run();
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <PageLoader label="In-order traversal — BST...">
      <svg width="260" height="130" viewBox="0 0 260 130" className="overflow-visible">
        {/* Edges */}
        {TREE_EDGES.map(([parentId, childId]) => (
          <line
            key={`${parentId}-${childId}`}
            x1={TREE_NODES[parentId].x}
            y1={TREE_NODES[parentId].y}
            x2={TREE_NODES[childId].x}
            y2={TREE_NODES[childId].y}
            stroke={
              visitedNodes.has(parentId) && visitedNodes.has(childId)
                ? "var(--color-brand-purple)"
                : "var(--color-brand-border-light)"
            }
            strokeWidth={visitedNodes.has(parentId) && visitedNodes.has(childId) ? 2 : 1}
            strokeOpacity={visitedNodes.has(parentId) && visitedNodes.has(childId) ? 0.8 : 0.3}
            className="transition-all duration-200"
          />
        ))}

        {/* Nodes */}
        {TREE_NODES.map((node) => {
          const isCurrent = node.id === currentNode;
          const isVisited = visitedNodes.has(node.id);

          return (
            <g key={node.id}>
              {isCurrent && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="18"
                  fill="none"
                  stroke="var(--color-brand-yellow)"
                  strokeWidth="1"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    values="14;20;14"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0.1;0.5"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r="14"
                fill={
                  isCurrent
                    ? "var(--color-brand-yellow)"
                    : isVisited
                    ? "var(--color-brand-purple)"
                    : "var(--color-brand-bg-medium)"
                }
                stroke={
                  isCurrent
                    ? "var(--color-brand-yellow)"
                    : isVisited
                    ? "var(--color-brand-purple)"
                    : "var(--color-brand-border-light)"
                }
                strokeWidth="1.5"
                className="transition-all duration-200"
              />
              <text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontFamily="var(--font-mono)"
                fontWeight="700"
                fill={isVisited || isCurrent ? "#fff" : "var(--color-brand-text-secondary)"}
                className="transition-all duration-200"
              >
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>
    </PageLoader>
  );
}
