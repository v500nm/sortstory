"use client";
import { useState } from "react";
import { sortingCodeBlocks, sortingExamples } from "@/lib/sortingCode";
import { allAlgoData } from "@/lib/algoData";

interface AlgoDetailsProps {
  selectedAlgo: string;
}



type LanguageType = "javascript" | "python" | "java" | "cpp";

const LANGUAGE_LABELS: Record<LanguageType, string> = {
  javascript: "JAVASCRIPT",
  python: "PYTHON",
  java: "JAVA",
  cpp: "C++"
};

export default function AlgoDetails({ selectedAlgo }: AlgoDetailsProps) {
  const [activeTab, setActiveTab] = useState<"complexity" | "flow" | "pseudocode" | "usecase">("complexity");
  const [selectedLang, setSelectedLang] = useState<LanguageType>("javascript");
  
  const isUnified = !!allAlgoData[selectedAlgo];
  const unifiedData = allAlgoData[selectedAlgo] || allAlgoData.bubbleSort; // Fallback to bubbleSort to prevent undefined errors

  // Normalize data
  const name = unifiedData.name;
  const description = unifiedData.description;
  const bestCase = unifiedData.bestCase;
  const avgCase = unifiedData.avgCase;
  const worstCase = unifiedData.worstCase;
  const timeComplexity = unifiedData.timeComplexity;
  const spaceComplexity = unifiedData.spaceComplexity;
  const useCase = unifiedData.useCase;
  const flowSteps = unifiedData.algorithmFlow;
  let examples = unifiedData.examples;
  if (sortingExamples[selectedAlgo]) {
    examples = [{ title: "Scenario", description: sortingExamples[selectedAlgo], code: "" }];
  }

  // Handle Code Blocks
  let codeSnippet = "";
  if (sortingCodeBlocks[selectedAlgo] && sortingCodeBlocks[selectedAlgo][selectedLang]) {
    codeSnippet = sortingCodeBlocks[selectedAlgo][selectedLang].join('\n');
  } else if (isUnified) {
    codeSnippet = unifiedData.codeSnippets[selectedLang] || "// Code not available in this language yet.";
  } else {
    codeSnippet = "// Code not available";
  }

  return (
    <section className="glass-card premium-border p-6 relative overflow-hidden">
      {/* Details Panel Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded flex items-center justify-center bg-brand-border">
            <svg fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="12" className="text-brand-text-primary">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" x2="8" y1="13" y2="13"></line>
              <line x1="16" x2="8" y1="17" y2="17"></line>
              <line x1="10" x2="8" y1="9" y2="9"></line>
            </svg>
          </div>
          <h2 className="text-sm font-semibold tracking-wider text-brand-text-primary uppercase">Algorithm Details</h2>
        </div>
        <div className="flex flex-wrap items-center gap-1 border border-brand-border rounded-lg p-1 mt-3 xl:mt-0 bg-brand-bg-dark">
          <button
            onClick={() => setActiveTab("complexity")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "complexity"
                ? "bg-brand-border text-brand-text-primary"
                : "text-brand-text-secondary hover:text-brand-text-primary"
            }`}
          >
            COMPLEXITY
          </button>
          <button
            onClick={() => setActiveTab("flow")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "flow"
                ? "bg-brand-border text-brand-text-primary"
                : "text-brand-text-secondary hover:text-brand-text-primary"
            }`}
          >
            ALGORITHM FLOW
          </button>
          <button
            onClick={() => setActiveTab("pseudocode")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "pseudocode"
                ? "bg-brand-border text-brand-text-primary"
                : "text-brand-text-secondary hover:text-brand-text-primary"
            }`}
          >
            CODE EXAMPLES
          </button>
          <button
            onClick={() => setActiveTab("usecase")}
            className={`text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "usecase"
                ? "bg-brand-border text-brand-text-primary"
                : "text-brand-text-secondary hover:text-brand-text-primary"
            }`}
          >
            USE CASES
          </button>
        </div>
      </div>

      {/* Details Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-brand-text-primary tracking-wide">{name}</h3>
          <p className="text-brand-text-secondary text-sm leading-relaxed mt-2">{description}</p>
        </div>

        {activeTab === "complexity" && (
          <div className="border-t border-brand-border pt-4">
            <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary mb-3 uppercase">Complexity Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Best Case</span>
                <span className="text-brand-text-primary font-mono">{bestCase.split(" - ")[0]}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Time Complexity</span>
                <span className="text-brand-text-primary font-mono font-semibold">{timeComplexity}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Average Case</span>
                <span className="text-brand-text-primary font-mono">{avgCase.split(" - ")[0]}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2">
                <span className="text-brand-text-secondary font-medium">Space Complexity</span>
                <span className="text-brand-text-primary font-mono font-semibold">{spaceComplexity}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/40 pb-2 md:border-none md:pb-0">
                <span className="text-brand-text-secondary font-medium">Worst Case</span>
                <span className="text-brand-text-primary font-mono">{worstCase.split(" - ")[0]}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "flow" && (
          <div className="border-t border-brand-border pt-4 space-y-4">
             <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary uppercase">Algorithm Flow Breakdown</h4>
             <ul className="space-y-2">
               {flowSteps.map((step: string, i: number) => (
                 <li key={i} className="flex gap-3 text-sm text-brand-text-secondary">
                   <span className="font-mono text-brand-accent font-bold">{i + 1}.</span>
                   <span>{step}</span>
                 </li>
               ))}
               {flowSteps.length === 0 && (
                 <li className="text-sm text-brand-text-secondary italic">Flow details not available for this algorithm.</li>
               )}
             </ul>
          </div>
        )}

        {activeTab === "pseudocode" && (
          <div className="border-t border-brand-border pt-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary uppercase">Code Implementations</h4>
              <div className="flex flex-wrap gap-1 bg-black/40 p-1 border border-brand-border rounded-md w-fit">
                {(Object.keys(LANGUAGE_LABELS) as LanguageType[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`text-[9px] font-bold tracking-wider px-2 py-1 rounded transition-colors ${
                      selectedLang === lang
                        ? "bg-[#27272a] text-brand-text-primary"
                        : "text-brand-text-secondary hover:text-brand-text-primary"
                    }`}
                  >
                    {LANGUAGE_LABELS[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#070707] border border-brand-border/60 p-4 rounded-lg font-mono text-xs text-brand-text-secondary overflow-x-auto">
              <pre><code>{codeSnippet}</code></pre>
            </div>
          </div>
        )}

        {activeTab === "usecase" && (
          <div className="border-t border-brand-border pt-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary mb-2 uppercase">Real-World Use Case</h4>
              <div className="bg-[#070707] border border-brand-border/60 p-4 rounded-lg text-sm text-brand-text-secondary leading-relaxed">
                {useCase}
              </div>
            </div>
            {examples.length > 0 && examples.map((ex: any, i: number) => (
              <div key={i}>
                <h4 className="text-xs font-bold tracking-wider text-brand-text-secondary mb-2 uppercase">{ex.title}</h4>
                <div className="bg-[#070707] border border-[#22c55e]/20 p-4 rounded-lg text-sm text-brand-text-secondary leading-relaxed border-l-2 border-l-[#22c55e]">
                  <p>{ex.description}</p>
                  {ex.code && <pre className="mt-3 text-xs font-mono opacity-80 border-t border-brand-border/30 pt-3"><code>{ex.code}</code></pre>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}