"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

const PRESS_OUTLETS = ["DEV.to", "Product Hunt", "Hashnode", "Medium", "Reddit", "Wikipedia"];

export default function PressLoader() {
  const [activeOutletIdx, setActiveOutletIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveOutletIdx((prev) => (prev + 1) % PRESS_OUTLETS.length);
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <PageLoader label="Fetching Press Releases & Media Coverage...">
      <div className="w-[260px] h-[130px] bg-brand-surface-1 border border-brand-border-light rounded-xl p-4 flex flex-col justify-between relative overflow-hidden font-mono shadow-2xl">
        {/* Newspaper Masthead Header */}
        <div className="flex items-center justify-between border-b border-brand-border-light pb-2">
          <span className="text-[10px] font-black font-serif uppercase tracking-widest text-brand-text-primary">
            SORTSTORY PRESS
          </span>
          <span className="text-[8px] font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 px-1.5 py-0.5 rounded-full font-bold">
            MEDIA KIT
          </span>
        </div>

        {/* Ticker / Publication badge */}
        <div className="flex items-center gap-2 my-2 bg-brand-surface-2 p-2 rounded-lg border border-brand-border-light">
          <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9px] text-brand-text-tertiary uppercase font-bold">Featured On</span>
            <span className="text-xs font-bold text-brand-purple">{PRESS_OUTLETS[activeOutletIdx]}</span>
          </div>
        </div>

        {/* Text lines mockup */}
        <div className="space-y-1 opacity-60">
          <div className="h-1.5 bg-brand-text-secondary/40 rounded-full w-full" />
          <div className="h-1.5 bg-brand-text-secondary/30 rounded-full w-4/5" />
          <div className="h-1.5 bg-brand-text-secondary/20 rounded-full w-3/5" />
        </div>
      </div>
    </PageLoader>
  );
}
