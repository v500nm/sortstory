import { SearchMetrics, SearchNodeStatus } from "@/lib/search/types";

interface SearchVisualizerProps {
  array: number[];
  statuses: SearchNodeStatus[];
  target: number;
  metrics: SearchMetrics;
}

export default function SearchVisualizer({
  array,
  statuses,
  target,
  metrics,
}: SearchVisualizerProps) {
  
    const getStatusClasses = (status: SearchNodeStatus) => {
      switch (status) {
        case "evaluating":
          return "bg-brand-yellow text-brand-bg-dark border-[#b45309] scale-110 z-10 shadow-[0_4px_0_0_#b45309,inset_2px_2px_0_0_rgba(255,255,255,0.4),inset_-2px_-2px_0_0_rgba(0,0,0,0.3)]";
        case "found":
          return "bg-brand-green text-brand-bg-dark border-[#047857] scale-110 z-10 shadow-[0_4px_0_0_#047857,inset_2px_2px_0_0_rgba(255,255,255,0.4),inset_-2px_-2px_0_0_rgba(0,0,0,0.3)]";
        case "discarded":
          return "bg-brand-bg-dark text-brand-text-secondary border-brand-border opacity-30 shadow-[0_4px_0_0_rgba(0,0,0,0.5),inset_2px_2px_0_0_rgba(255,255,255,0.1)] translate-y-1";
        case "unsearched":
        default:
          return "bg-brand-bg-card text-brand-text-primary border-black element-3d";
      }
    };

  return (
    <div className="card-3d p-6 flex flex-col h-full relative overflow-hidden">
      {/* Header & Target */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#111111] flex items-center justify-center border border-brand-border shadow-inner">
            <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" className="text-white">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-brand-text-secondary uppercase">Searching For</h2>
            <div className="text-2xl font-bold text-brand-accent font-mono">{target}</div>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold tracking-wider text-brand-text-secondary uppercase">Comparisons</span>
            <span className="text-lg font-mono text-brand-accent">{metrics.comparisons}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold tracking-wider text-brand-text-secondary uppercase">Time</span>
            <span className="text-lg font-mono text-brand-accent">{metrics.timeElapsed}ms</span>
          </div>
        </div>
      </div>

      {/* Array Display */}
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-wrap gap-2 justify-center max-w-4xl">
          {array.map((value, index) => {
            const status = statuses[index] || "unsearched";
            return (
              <div
                key={`${index}-${value}`}
                className={`
                  relative flex items-center justify-center
                  w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                  rounded-lg border-2 font-mono text-sm md:text-lg font-bold
                  transition-all duration-300 ease-out
                  ${getStatusClasses(status)}
                `}
              >
                {value}
                {/* Index label */}
                <span className="absolute -bottom-5 text-[10px] text-brand-text-secondary opacity-50 font-sans">
                  {index}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-brand-bg-card border border-brand-border" />
          <span className="text-brand-text-secondary">Unsearched</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-brand-yellow shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          <span className="text-brand-text-secondary">Evaluating</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-brand-bg-dark border border-brand-border opacity-50" />
          <span className="text-brand-text-secondary">Discarded</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-brand-green shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          <span className="text-brand-text-secondary">Found</span>
        </div>
      </div>
    </div>
  );
}
