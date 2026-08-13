"use client";

import { useState, useEffect, useCallback } from "react";
import PageLoader from "./PageLoader";

const GRID_SIZE = 9;
const CENTER = Math.floor(GRID_SIZE / 2);

export default function PathfindingLoader() {
  const [activeCells, setActiveCells] = useState<Set<string>>(new Set());
  const [pathCells, setPathCells] = useState<Set<string>>(new Set());
  const [wave, setWave] = useState(0);

  const cellKey = (r: number, c: number) => `${r},${c}`;

  const reset = useCallback(() => {
    setActiveCells(new Set());
    setPathCells(new Set());
    setWave(0);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let currentWave = 0;
    const maxWave = CENTER + 2;

    const timer = setInterval(() => {
      if (cancelled) return;

      if (currentWave > maxWave) {
        // Show path then reset
        const path = new Set<string>();
        for (let i = 0; i <= CENTER; i++) {
          path.add(cellKey(CENTER, i));
        }
        for (let i = 0; i <= CENTER; i++) {
          path.add(cellKey(i, CENTER));
        }
        setPathCells(path);

        setTimeout(() => {
          if (!cancelled) reset();
          currentWave = 0;
        }, 600);
        clearInterval(timer);
        return;
      }

      const newActive = new Set<string>();
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          const dist = Math.abs(r - CENTER) + Math.abs(c - CENTER);
          if (dist <= currentWave) {
            newActive.add(cellKey(r, c));
          }
        }
      }
      setActiveCells(newActive);
      setWave(currentWave);
      currentWave++;
    }, 180);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [reset]);

  return (
    <PageLoader label="Expanding search frontier...">
      <div
        className="grid gap-[2px]"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, idx) => {
          const r = Math.floor(idx / GRID_SIZE);
          const c = idx % GRID_SIZE;
          const key = cellKey(r, c);
          const isStart = r === CENTER && c === CENTER;
          const isPath = pathCells.has(key);
          const isActive = activeCells.has(key);
          const dist = Math.abs(r - CENTER) + Math.abs(c - CENTER);

          return (
            <div
              key={idx}
              className="rounded-[2px] transition-all duration-150 ease-out"
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: isStart
                  ? "var(--color-brand-yellow)"
                  : isPath
                  ? "var(--color-brand-green)"
                  : isActive
                  ? `color-mix(in srgb, var(--color-brand-cyan) ${Math.max(20, 100 - dist * 12)}%, var(--color-brand-bg-light))`
                  : "var(--color-brand-bg-medium)",
                boxShadow: isStart
                  ? "0 0 8px var(--color-brand-yellow)40"
                  : isPath
                  ? "0 0 6px var(--color-brand-green)30"
                  : isActive
                  ? `0 0 4px var(--color-brand-cyan)${Math.max(10, 30 - dist * 4)}`
                  : "none",
                border: "1px solid",
                borderColor: isActive
                  ? "var(--color-brand-cyan)"
                  : "var(--color-brand-border)",
                opacity: isActive ? 1 : 0.4,
              }}
            />
          );
        })}
      </div>
    </PageLoader>
  );
}
