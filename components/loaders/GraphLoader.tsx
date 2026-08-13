"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

// Simple graph layout: nodes with (x, y) positions and edges
const NODES = [
  { id: 0, x: 120, y: 20 },
  { id: 1, x: 40, y: 70 },
  { id: 2, x: 200, y: 70 },
  { id: 3, x: 0, y: 130 },
  { id: 4, x: 80, y: 130 },
  { id: 5, x: 160, y: 130 },
  { id: 6, x: 240, y: 130 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2],
  [1, 3], [1, 4],
  [2, 5], [2, 6],
];

// BFS order from node 0
const BFS_ORDER = [0, 1, 2, 3, 4, 5, 6];

export default function GraphLoader() {
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [currentNode, setCurrentNode] = useState<number>(-1);
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    let step = 0;

    const timer = setInterval(() => {
      if (cancelled) return;

      if (step < BFS_ORDER.length) {
        const nodeId = BFS_ORDER[step];
        setCurrentNode(nodeId);
        setVisitedNodes((prev) => new Set([...prev, nodeId]));

        // Mark edges to this node as visited
        if (step > 0) {
          const parent = EDGES.find(([a, b]) => {
            return (
              (b === nodeId && BFS_ORDER.indexOf(a) < step) ||
              (a === nodeId && BFS_ORDER.indexOf(b) < step)
            );
          });
          if (parent) {
            setVisitedEdges((prev) =>
              new Set([...prev, `${parent[0]}-${parent[1]}`])
            );
          }
        }
        step++;
      } else {
        // Reset after pause
        setTimeout(() => {
          if (!cancelled) {
            setVisitedNodes(new Set());
            setCurrentNode(-1);
            setVisitedEdges(new Set());
            step = 0;
          }
        }, 600);
        clearInterval(timer);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <PageLoader label="Traversing graph — BFS...">
      <svg width="260" height="160" viewBox="-10 -5 270 165" className="overflow-visible">
        {/* Edges */}
        {EDGES.map(([a, b]) => {
          const edgeKey = `${a}-${b}`;
          const isVisited = visitedEdges.has(edgeKey);
          return (
            <line
              key={edgeKey}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke={
                isVisited
                  ? "var(--color-brand-cyan)"
                  : "var(--color-brand-border-light)"
              }
              strokeWidth={isVisited ? 2 : 1}
              strokeOpacity={isVisited ? 0.9 : 0.3}
              className="transition-all duration-200"
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const isCurrent = node.id === currentNode;
          const isVisited = visitedNodes.has(node.id);
          return (
            <g key={node.id}>
              {/* Glow ring for current */}
              {isCurrent && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="18"
                  fill="none"
                  stroke="var(--color-brand-cyan)"
                  strokeWidth="1"
                  opacity="0.4"
                  className="animate-ping"
                  style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: "1s" }}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r="12"
                fill={
                  isCurrent
                    ? "var(--color-brand-cyan)"
                    : isVisited
                    ? "var(--color-brand-green)"
                    : "var(--color-brand-bg-medium)"
                }
                stroke={
                  isVisited
                    ? "var(--color-brand-green)"
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
                fontSize="8"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                fill={isVisited ? "#fff" : "var(--color-brand-text-secondary)"}
                className="transition-all duration-200"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </PageLoader>
  );
}
