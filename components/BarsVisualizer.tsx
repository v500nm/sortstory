"use client";
import type { BarColor } from "@/lib/types";

interface BarsVisualizerProps {
  array: number[];
  colors: BarColor[];
  comparisons: number;
  swaps: number;
  time: number;
  algoLabel?: string;
}

// Sleek solid colors for a premium high-contrast look
const BAR_STYLE_MAP: Record<BarColor, { bg: string; shadow: string }> = {
  normal: {
    bg: "#27272a", /* Zinc 800 */
    shadow: "none",
  },
  active: {
    bg: "#ffffff",
    shadow: "0 0 16px rgba(255,255,255,0.4)",
  },
  comparing: {
    bg: "#facc15", /* Amber 400 */
    shadow: "0 0 16px rgba(250,204,21,0.25)",
  },
  sorted: {
    bg: "#34d399", /* Emerald 400 */
    shadow: "0 0 16px rgba(52,211,153,0.2)",
  },
  pivot: {
    bg: "#fb7185", /* Rose 400 */
    shadow: "0 0 16px rgba(251,113,133,0.25)",
  },
};

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export default function BarsVisualizer({
  array,
  colors,
  comparisons,
  swaps,
  time,
  algoLabel,
}: BarsVisualizerProps) {
  const maxVal = Math.max(...array, 1);
  const barCount = array.length;
  const gap = barCount > 50 ? 1 : barCount > 30 ? 2 : barCount > 20 ? 3 : 4;
  const showValues = barCount <= 25;

  return (
    <section className="glass-card premium-border flex flex-col w-full h-[50vh] min-h-[350px] lg:h-[65vh] max-h-[600px] overflow-hidden">
      <div className="p-5 pb-0 flex-shrink-0">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded flex items-center justify-center bg-brand-border">
              <svg fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="12" className="text-white">
                <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold tracking-wider text-brand-text-primary">
              {algoLabel || "VISUALIZATION"}
            </h2>
          </div>

          {/* Metrics row */}
          <div className="flex items-center gap-2">
            <MetricChip icon="compare" label="Comp" value={comparisons} color="text-brand-yellow" />
            <MetricChip icon="swap" label="Swap" value={swaps} color="text-brand-purple" />
            <MetricChip icon="time" label="" value={formatTime(time)} color="text-brand-green" />
          </div>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="flex-grow relative mx-5 mb-2 mt-4">
        {/* Subtle reference lines */}
        <div className="absolute inset-x-4 bottom-2 top-8 flex flex-col justify-between pointer-events-none opacity-[0.05]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-white border-dashed" />
          ))}
        </div>

        <div
          className="absolute inset-x-0 sm:inset-x-4 bottom-2 top-8 flex items-end justify-center"
          style={{ gap: `${gap}px` }}
        >
          {array.map((value, index) => {
            const heightPct = (value / maxVal) * 100;
            const color = colors[index] || "normal";
            const style = BAR_STYLE_MAP[color];
            const barWidth = Math.max(
              4,
              Math.min(40, Math.floor((100 / barCount) * 0.85 * 10))
            );

            return (
              <div
                key={index}
                className="rounded-t-[2px] flex flex-col items-center justify-end relative"
                style={{
                  height: `${Math.max(heightPct, 2)}%`,
                  width: `${barWidth}px`,
                  minWidth: "1px",
                  flexShrink: 1,
                  background: style.bg,
                  boxShadow: style.shadow,
                  transition: "height 0.12s cubic-bezier(0.4,0,0.2,1), background 0.15s ease",
                }}
              >
                {showValues && barWidth >= 14 && (
                  <span
                    className="font-mono font-medium select-none leading-none"
                    style={{
                      fontSize: barWidth >= 24 ? "10px" : "8px",
                      color: color === "normal" ? "#a1a1aa" : "#000000",
                      marginBottom: "4px",
                    }}
                  >
                    {value}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="border-t border-brand-border mx-5 mb-4 pt-3 flex-shrink-0">
        <div className="flex flex-wrap items-center gap-5 text-[12px] font-medium text-brand-text-secondary">
          <LegendDot color="#27272a" label="Unsorted" />
          <LegendDot color="#ffffff" label="Active" />
          <LegendDot color="#facc15" label="Comparing" />
          <LegendDot color="#34d399" label="Sorted" />
          <LegendDot color="#fb7185" label="Pivot" />
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ──

function MetricChip({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md border border-brand-border text-[11px] font-mono">
      {icon === "compare" && (
        <svg fill="none" height="11" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="11" className={color}>
          <path d="m16 16-4-4" /><path d="m12 16 4-4" /><rect x="2" y="2" width="20" height="20" rx="2" />
        </svg>
      )}
      {icon === "swap" && (
        <svg fill="none" height="11" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="11" className={color}>
          <path d="M7 16V4m0 0L3 8m4-4l4 4" /><path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )}
      {icon === "time" && (
        <svg fill="none" height="11" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="11" className={color}>
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {label && <span className="text-brand-text-secondary uppercase">{label}</span>}
      <span className="text-white font-semibold">
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="w-2.5 h-2.5 rounded-sm"
        style={{ background: color }}
      />
      <span>{label}</span>
    </div>
  );
}