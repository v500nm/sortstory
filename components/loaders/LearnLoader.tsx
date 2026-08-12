"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

const CODE_LINES = [
  "function bubbleSort(arr) {",
  "  for (let i = 0; i < arr.length; i++) {",
  "    for (let j = 0; j < arr.length - i - 1; j++) {",
  "      if (arr[j] > arr[j + 1]) {",
  "        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];",
  "      }",
  "    }",
  "  }",
  "  return arr;",
  "}",
];

const LINE_COLORS = [
  "var(--color-brand-purple)", // function keyword
  "var(--color-brand-cyan)",   // for loop
  "var(--color-brand-cyan)",   // inner for
  "var(--color-brand-yellow)", // if condition
  "var(--color-brand-green)",  // swap
  "var(--color-brand-text-secondary)", // closing
  "var(--color-brand-text-secondary)", // closing
  "var(--color-brand-text-secondary)", // closing
  "var(--color-brand-purple)", // return
  "var(--color-brand-text-secondary)", // closing
];

export default function LearnLoader() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let line = 0;
    let char = 0;

    const timer = setInterval(() => {
      if (cancelled) return;

      if (line < CODE_LINES.length) {
        char++;
        if (char > CODE_LINES[line].length) {
          line++;
          char = 0;
          setVisibleLines(line);
        }
        setCharCount(char);
      } else {
        // Reset after pause
        clearInterval(timer);
        setTimeout(() => {
          if (!cancelled) {
            setVisibleLines(0);
            setCharCount(0);
            line = 0;
            char = 0;
          }
        }, 800);
      }
    }, 30);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <PageLoader label="Loading curriculum...">
      <div className="bg-brand-bg-medium/80 border border-brand-border rounded-lg p-3 sm:p-4 font-mono text-[10px] sm:text-[11px] leading-relaxed w-full max-w-[380px] overflow-hidden">
        {/* Editor top bar */}
        <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-brand-border/40">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-rose/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-brand-green/60" />
          <span className="ml-2 text-[9px] text-brand-text-secondary/40 tracking-wider">
            lesson.js
          </span>
        </div>

        {/* Code lines */}
        <div className="space-y-[2px]">
          {CODE_LINES.map((line, i) => {
            if (i > visibleLines) return null;
            const isCurrentLine = i === visibleLines;
            const displayText = isCurrentLine
              ? line.slice(0, charCount)
              : line;

            return (
              <div key={i} className="flex items-start gap-2">
                <span className="text-brand-text-secondary/30 w-4 text-right text-[9px] select-none flex-shrink-0">
                  {i + 1}
                </span>
                <span
                  style={{ color: LINE_COLORS[i] }}
                  className="whitespace-pre"
                >
                  {displayText}
                  {isCurrentLine && (
                    <span className="inline-block w-[1px] h-[13px] bg-brand-text-primary ml-[1px] cursor-blink" />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .cursor-blink {
          animation: blink 0.6s steps(1) infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </PageLoader>
  );
}
