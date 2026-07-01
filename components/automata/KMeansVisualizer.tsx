import { useKMeansEngine } from "@/hooks/useAutomataEngine";

interface Props {
  engine: ReturnType<typeof useKMeansEngine>;
}

export default function KMeansVisualizer({ engine }: Props) {
  const { points, centroids, description } = engine;

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

      {/* Scatter Plot Area */}
      <div className="relative w-[500px] h-[500px] mt-12 bg-brand-bg-dark rounded-xl border border-brand-border shadow-2xl overflow-hidden">
        {/* Points */}
        {points.map((p) => {
          const centroid = p.clusterId !== null ? centroids.find(c => c.id === p.clusterId) : null;
          const color = centroid ? centroid.color : "#666";
          
          return (
            <div
              key={p.id}
              className="absolute w-3 h-3 rounded-full transition-all duration-700 ease-in-out"
              style={{
                left: `${p.x * 100}%`,
                top: `${p.y * 100}%`,
                backgroundColor: color,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 8px ${color}80`
              }}
            />
          );
        })}

        {/* Centroids */}
        {centroids.map((c) => (
          <div
            key={`centroid-${c.id}`}
            className="absolute w-6 h-6 rounded-sm element-3d flex items-center justify-center font-bold text-black z-10 transition-all duration-700 ease-in-out"
            style={{
              left: `${c.x * 100}%`,
              top: `${c.y * 100}%`,
              backgroundColor: c.color,
              transform: "translate(-50%, -50%) rotate(45deg)", // diamond shape
              boxShadow: `0 0 15px ${c.color}`
            }}
          >
            <div style={{ transform: "rotate(-45deg)", fontSize: "10px" }}>+</div>
          </div>
        ))}
      </div>
    </div>
  );
}
