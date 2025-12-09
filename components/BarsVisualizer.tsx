"use client";
import { useState, useEffect } from "react";

interface BarsVisualizerProps {
  comparisons: number;
  swaps: number;
  time: number;
}

export default function BarsVisualizer({ comparisons, swaps, time }: BarsVisualizerProps) {
  // Sample data - replace with actual sorting state
  const [bars] = useState([
    { value: 24, height: 45, color: "gray" },
    { value: 47, height: 75, color: "gray" },
    { value: 46, height: 70, color: "purple" },
    { value: 31, height: 55, color: "gray" },
    { value: 18, height: 35, color: "gray" },
    { value: 45, height: 70, color: "purple" },
    { value: 48, height: 80, color: "yellow" },
    { value: 69, height: 95, color: "gray" },
    { value: 15, height: 30, color: "gray" },
    { value: 64, height: 90, color: "yellow" },
    { value: 48, height: 80, color: "gray" },
    { value: 56, height: 85, color: "gray" },
    { value: 12, height: 25, color: "gray" },
    { value: 70, height: 96, color: "green" },
    { value: 76, height: 100, color: "green" },
  ]);

  const getBarColor = (color: string) => {
    switch (color) {
      case "purple":
        return "bg-purple-400";
      case "yellow":
        return "bg-brand-yellow";
      case "green":
        return "bg-brand-green";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTextColor = (color: string) => {
    return color === "yellow" || color === "green" ? "text-black" : "text-white";
  };

  return (
    <section className="bg-brand-bg-light p-6 rounded-xl shadow-lg flex flex-col min-h-[500px]">
      {/* Visualization Panel Header */}
      <div className="flex justify-between mb-6 items-baseline">
        <div className="flex items-center gap-3">
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <h2 className="text-lg font-semibold">Visualization</h2>
        </div>
        <div className="flex items-center gap-4 text-sm text-brand-text-secondary">
          <span className="flex items-center gap-1.5">
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.25 2H2.75a.75.75 0 0 0-.75.75v18.5c0 .41.34.75.75.75h18.5a.75.75 0 0 0 .75-.75V2.75a.75.75 0 0 0-.75-.75Z"></path>
              <path d="m15.5 15.5-4-4"></path>
              <path d="m11.5 15.5 4-4"></path>
            </svg>
            {comparisons}
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path>
              <path d="m16 16-4-4"></path>
              <path d="m12 16 4-4"></path>
            </svg>
            {swaps}
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {time}ms
          </span>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="flex-grow flex items-end justify-center gap-2 px-4">
        {bars.map((bar, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-2 w-10 rounded-t-md font-bold ${getBarColor(bar.color)} ${getTextColor(bar.color)}`}
            style={{ height: `${bar.height}%` }}
          >
            <span className="mt-auto mb-2">{bar.value}</span>
          </div>
        ))}
      </div>

      {/* Legend Section */}
      <div className="border-t border-brand-border mt-6 pt-4">
        <h3 className="text-sm mb-3">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-brand-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-500"></span>
            Normal
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-400"></span>
            Active
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-yellow"></span>
            Comparing
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-green"></span>
            Sorted
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            Pivot
          </div>
        </div>
      </div>
    </section>
  );
}