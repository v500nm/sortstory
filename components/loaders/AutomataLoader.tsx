"use client";

import { useState, useEffect, useCallback } from "react";
import PageLoader from "./PageLoader";

const GRID_SIZE = 11;

// Glider pattern (relative positions)
const GLIDER = [
  [0, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

function createGrid(): boolean[][] {
  const grid = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(false)
  );
  // Place glider near top-left
  GLIDER.forEach(([r, c]) => {
    grid[r + 1][c + 1] = true;
  });
  return grid;
}

function nextGeneration(grid: boolean[][]): boolean[][] {
  const next = grid.map((row) => [...row]);
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      let neighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = (r + dr + GRID_SIZE) % GRID_SIZE;
          const nc = (c + dc + GRID_SIZE) % GRID_SIZE;
          if (grid[nr][nc]) neighbors++;
        }
      }
      if (grid[r][c]) {
        next[r][c] = neighbors === 2 || neighbors === 3;
      } else {
        next[r][c] = neighbors === 3;
      }
    }
  }
  return next;
}

export default function AutomataLoader() {
  const [grid, setGrid] = useState(createGrid);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const timer = setInterval(() => {
      if (cancelled) return;
      setGrid((prev) => nextGeneration(prev));
      setGeneration((g) => {
        if (g >= 28) {
          // Reset
          setTimeout(() => {
            if (!cancelled) {
              setGrid(createGrid());
              setGeneration(0);
            }
          }, 200);
          return 0;
        }
        return g + 1;
      });
    }, 150);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <PageLoader label={`Conway's Game of Life — Gen ${generation}`}>
      <div
        className="grid gap-[1px]"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {grid.flat().map((alive, idx) => (
          <div
            key={idx}
            className="rounded-[1px] transition-all duration-100"
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: alive
                ? "var(--color-brand-green)"
                : "var(--color-brand-bg-medium)",
              boxShadow: alive
                ? "0 0 6px var(--color-brand-green)30"
                : "none",
              border: "1px solid",
              borderColor: alive
                ? "var(--color-brand-green)"
                : "var(--color-brand-border)",
              opacity: alive ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </PageLoader>
  );
}
