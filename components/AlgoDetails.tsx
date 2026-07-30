"use client";
import { useState, useEffect } from "react";
import { sortingCodeBlocks, sortingExamples } from "@/lib/sortingCode";
import { allAlgoData } from "@/lib/algoData";
import { useLanguage } from "@/contexts/LanguageContext";

interface AlgoDetailsProps {
  selectedAlgo: string;
}

type LanguageType = "javascript" | "python" | "java" | "cpp" | "c" | "typescript" | "go" | "rust";

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JAVASCRIPT",
  python: "PYTHON",
  java: "JAVA",
  cpp: "C++",
  c: "C",
  typescript: "TYPESCRIPT",
  go: "GO",
  rust: "RUST",
};

export default function AlgoDetails({ selectedAlgo }: AlgoDetailsProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"complexity" | "flow" | "pseudocode" | "usecase">("complexity");
  const [selectedLang, setSelectedLang] = useState<LanguageType>(language as any || "python");

  // Sync with global stack language preference
  useEffect(() => {
    if (language) {
      setSelectedLang(language as any);
    }
  }, [language]);
  
  const isUnified = !!allAlgoData[selectedAlgo];
  const unifiedData = allAlgoData[selectedAlgo] || allAlgoData.bubbleSort;

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

  // Handle Code Blocks with safe double assertion
  let codeSnippet = "";
  const codeBlocksForAlgo = (sortingCodeBlocks[selectedAlgo] as unknown) as Record<string, string[]> | undefined;
  if (codeBlocksForAlgo && codeBlocksForAlgo[selectedLang]) {
    codeSnippet = codeBlocksForAlgo[selectedLang].join('\n');
  } else if (isUnified && unifiedData.codeSnippets) {
    const snippets = (unifiedData.codeSnippets as unknown) as Record<string, string>;
    codeSnippet = snippets[selectedLang] || snippets["python"] || snippets["javascript"] || "// Code implementation in selected language.";
  } else {
    codeSnippet = `// ${selectedLang.toUpperCase()} implementation for ${name}`;
  }

  const tcDisplay = typeof timeComplexity === "string" ? timeComplexity : "O(N log N)";

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
          <h2 className="text-sm font-semibold tracking-wider text-brand-text-primary uppercase">
            Algorithm Details ({LANGUAGE_LABELS[selectedLang] || selectedLang.toUpperCase()})
          </h2>
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
            CODE EXAMPLES ({selectedLang.toUpperCase()})
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

      {/* Tab Content */}
      <div className="min-h-[220px]">
        {activeTab === "complexity" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-brand-bg-dark border border-brand-border p-4 rounded-xl">
              <span className="text-[10px] font-mono font-bold text-brand-text-secondary uppercase">Best Case</span>
              <div className="text-xl font-bold font-mono text-brand-green mt-1">{bestCase || tcDisplay}</div>
            </div>
            <div className="bg-brand-bg-dark border border-brand-border p-4 rounded-xl">
              <span className="text-[10px] font-mono font-bold text-brand-text-secondary uppercase">Average Case</span>
              <div className="text-xl font-bold font-mono text-brand-cyan mt-1">{avgCase || tcDisplay}</div>
            </div>
            <div className="bg-brand-bg-dark border border-brand-border p-4 rounded-xl">
              <span className="text-[10px] font-mono font-bold text-brand-text-secondary uppercase">Worst Case</span>
              <div className="text-xl font-bold font-mono text-brand-rose mt-1">{worstCase || tcDisplay}</div>
            </div>
            <div className="bg-brand-bg-dark border border-brand-border p-4 rounded-xl">
              <span className="text-[10px] font-mono font-bold text-brand-text-secondary uppercase">Space Complexity</span>
              <div className="text-xl font-bold font-mono text-brand-purple mt-1">{spaceComplexity || "O(1)"}</div>
            </div>
          </div>
        )}

        {activeTab === "flow" && (
          <div className="space-y-3 font-mono text-xs text-brand-text-secondary">
            {flowSteps && flowSteps.length > 0 ? (
              flowSteps.map((step, idx) => (
                <div key={idx} className="p-3 bg-brand-bg-dark border border-brand-border rounded-xl flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))
            ) : (
              <p>Step-by-step algorithm flow description for {name}.</p>
            )}
          </div>
        )}

        {activeTab === "pseudocode" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-brand-text-secondary">Language Syntax: <strong className="text-brand-cyan uppercase">{selectedLang}</strong></span>
              <div className="flex flex-wrap items-center gap-2">
                {(["python", "javascript", "cpp", "java", "typescript", "go", "rust"] as LanguageType[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${selectedLang === lang ? 'bg-brand-purple text-white font-bold' : 'bg-brand-bg-dark text-brand-text-secondary hover:text-brand-text-primary'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <pre className="p-4 bg-brand-bg-dark border border-brand-border rounded-xl font-mono text-xs text-brand-cyan overflow-x-auto custom-scrollbar">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}

        {activeTab === "usecase" && (
          <div className="space-y-4">
            <p className="text-xs font-mono text-brand-text-secondary leading-relaxed">
              {useCase || description || `Practical engineering applications and interview scenarios for ${name}.`}
            </p>

            {examples && examples.map((ex, idx) => (
              <div key={idx} className="p-4 bg-brand-bg-dark border border-brand-border rounded-xl space-y-2">
                <h4 className="text-xs font-bold font-mono text-brand-text-primary">{ex.title}</h4>
                <p className="text-xs font-mono text-brand-text-secondary">{ex.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}