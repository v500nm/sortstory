import { useGameOfLifeEngine } from "@/hooks/useAutomataEngine";

interface Props {
  engine: ReturnType<typeof useGameOfLifeEngine>;
}

export default function GameOfLifeVisualizer({ engine }: Props) {
  const { grid, toggleCell, description } = engine;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Description Overlay */}
      {description && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-brand-border text-brand-cyan font-mono text-sm shadow-xl flex items-center gap-3 animate-in fade-in">
          <svg fill="currentColor" viewBox="0 0 24 24" height="16" width="16">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {description}
        </div>
      )}

      {/* Grid */}
      <div className="flex flex-col gap-[2px] mt-12 overflow-auto max-w-full max-h-[70vh] p-4 bg-brand-bg-dark rounded-xl border border-brand-border shadow-2xl">
        {grid.map((row, y) => (
          <div key={`row-${y}`} className="flex gap-[2px]">
            {row.map((cell, x) => {
              let bg = "bg-[#1a1a1a]"; // dead
              if (cell.isAlive) {
                if (cell.isNewlyBorn) bg = "bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]";
                else bg = "bg-brand-purple shadow-[0_0_10px_rgba(129,140,248,0.6)]";
              } else if (cell.isNewlyDied) {
                bg = "bg-brand-yellow/50";
              }

              return (
                <div
                  key={`cell-${x}-${y}`}
                  onPointerDown={() => toggleCell(x, y)}
                  onPointerEnter={(e) => {
                    if (e.buttons === 1) toggleCell(x, y);
                  }}
                  className={`w-6 h-6 rounded-sm transition-all duration-300 cursor-pointer touch-none select-none element-3d ${bg}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
