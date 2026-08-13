"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getCodeSnippetForAlgo } from "@/lib/sortingCode";
import { formatAlgoName } from "@/lib/utils";

export type CodeLanguage =
  | "javascript"
  | "typescript"
  | "c"
  | "cpp"
  | "python"
  | "java"
  | "go"
  | "php"
  | "rust";

export const LANGUAGE_LABELS: Record<CodeLanguage, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  c: "C",
  cpp: "C++",
  python: "Python",
  java: "Java",
  go: "Go",
  php: "PHP",
  rust: "Rust",
};

interface CodeViewerProps {
  topic: string;
  algo: string;
  initialLang?: CodeLanguage;
}

export default function CodeViewer({ topic, algo, initialLang = "python" }: CodeViewerProps) {
  const [selectedLang, setSelectedLang] = useState<CodeLanguage>(initialLang);
  const [copied, setCopied] = useState(false);
  const [datasetPreset, setDatasetPreset] = useState("random");
  const [customData, setCustomData] = useState("5, 2, 9, 1, 5, 6");

  const codeSnippet = getCodeSnippetForAlgo(algo, selectedLang);
  const algoTitle = formatAlgoName(algo);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDemoOutput = () => {
    let rawArr: number[] = [5, 2, 9, 1, 5, 6];
    if (datasetPreset === "nearlySorted") rawArr = [1, 2, 3, 5, 4, 6];
    else if (datasetPreset === "reverse") rawArr = [9, 8, 7, 6, 5, 1];
    else if (datasetPreset === "unique") rawArr = [3, 1, 3, 2, 1, 2];
    else if (datasetPreset === "custom") {
      rawArr = customData
        .split(",")
        .map((n) => parseInt(n.trim(), 10))
        .filter((n) => !isNaN(n));
      if (rawArr.length === 0) rawArr = [5, 2, 9, 1, 5, 6];
    }

    const sortedArr = [...rawArr].sort((a, b) => a - b);
    return {
      input: JSON.stringify(rawArr),
      output: JSON.stringify(sortedArr),
    };
  };

  const demoResult = getDemoOutput();

  const visualizerHref =
    topic === "sorting"
      ? "/sort"
      : topic === "searching"
      ? "/search"
      : topic === "pathfinding"
      ? "/pathfinding"
      : topic === "linked-lists"
      ? "/linked-lists"
      : topic === "trees"
      ? "/trees"
      : topic === "graphs"
      ? "/graphs"
      : "/sort";

  return (
    <div className="w-full space-y-6">
      {/* Code Header & Language Selector Tabs */}
      <div className="bg-brand-bg-card border border-brand-border rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border/40">
          <div>
            <h2 className="text-xl font-black text-brand-text-primary">
              {algoTitle} Code Implementations
            </h2>
            <p className="text-xs text-brand-text-secondary mt-1">
              Complete, production-grade implementations in 9 programming languages with test dataset runner.
            </p>
          </div>

          <Link
            href={visualizerHref}
            className="px-4 py-2 bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-xs font-bold font-mono rounded-full hover:scale-105 active:scale-95 transition-transform shrink-0 text-center"
          >
            View Live Animation →
          </Link>
        </div>

        {/* Text-Only Language Selector Tabs (No Icons) */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {(
            [
              "javascript",
              "typescript",
              "c",
              "cpp",
              "python",
              "java",
              "go",
              "php",
              "rust",
            ] as CodeLanguage[]
          ).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 ${
                selectedLang === lang
                  ? "bg-brand-purple text-white shadow-md font-bold"
                  : "bg-brand-bg-dark text-brand-text-secondary hover:text-brand-text-primary border border-brand-border/60"
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Box & Demo Dataset Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Code Box */}
        <div className="lg:col-span-2 bg-brand-bg-dark border border-brand-border rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="px-5 py-3 bg-brand-bg-medium border-b border-brand-border flex items-center justify-between font-mono text-xs">
            <span className="text-brand-cyan font-bold">
              {LANGUAGE_LABELS[selectedLang]} Implementation
            </span>

            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-brand-bg-dark border border-brand-border rounded-md text-[11px] font-mono text-brand-text-secondary hover:text-brand-text-primary transition-colors flex items-center gap-1.5"
            >
              <span>{copied ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>

          <div className="p-4 overflow-x-auto custom-scrollbar flex-1 bg-black/40 font-mono text-xs text-brand-text-primary leading-relaxed">
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: Demo Dataset Runner & Test Input */}
        <div className="bg-brand-bg-card border border-brand-border rounded-2xl p-5 shadow-xl space-y-4 flex flex-col">
          <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-brand-purple pb-2 border-b border-brand-border/40">
            Demo Test Dataset
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-mono text-brand-text-secondary">
              Select Preset Pattern:
            </label>
            <select
              value={datasetPreset}
              onChange={(e) => setDatasetPreset(e.target.value)}
              className="w-full bg-brand-bg-dark border border-brand-border rounded-lg p-2 text-xs font-mono text-brand-cyan outline-none"
            >
              <option value="random">Random Dataset [5, 2, 9, 1, 5, 6]</option>
              <option value="nearlySorted">Nearly Sorted [1, 2, 3, 5, 4, 6]</option>
              <option value="reverse">Reverse Sorted [9, 8, 7, 6, 5, 1]</option>
              <option value="unique">Few Unique [3, 1, 3, 2, 1, 2]</option>
              <option value="custom">Custom Array Input</option>
            </select>
          </div>

          {datasetPreset === "custom" && (
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-brand-text-secondary">
                Enter Numbers (comma separated):
              </label>
              <input
                type="text"
                value={customData}
                onChange={(e) => setCustomData(e.target.value)}
                className="w-full bg-brand-bg-dark border border-brand-border rounded-lg p-2 text-xs font-mono text-brand-text-primary outline-none"
                placeholder="10, 4, 7, 2, 8"
              />
            </div>
          )}

          {/* Test Execution Output Box */}
          <div className="p-3 bg-brand-bg-dark border border-brand-border rounded-xl space-y-2 font-mono text-xs mt-auto">
            <div>
              <span className="text-[10px] text-brand-text-secondary uppercase block font-bold">
                Input Array:
              </span>
              <span className="text-brand-yellow">{demoResult.input}</span>
            </div>
            <div className="pt-2 border-t border-brand-border/30">
              <span className="text-[10px] text-brand-text-secondary uppercase block font-bold">
                Sorted Output:
              </span>
              <span className="text-brand-green font-bold">{demoResult.output}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
