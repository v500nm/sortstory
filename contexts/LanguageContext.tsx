"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type StackLanguage = "javascript" | "typescript" | "c" | "cpp" | "python" | "java" | "go" | "php" | "rust";

export interface LanguageMeta {
  id: StackLanguage;
  name: string;
  extension: string;
}

export const fontMeta: LanguageMeta[] = [
  { id: "javascript", name: "JavaScript", extension: ".js" },
  { id: "typescript", name: "TypeScript", extension: ".ts" },
  { id: "c", name: "C", extension: ".c" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "python", name: "Python", extension: ".py" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "go", name: "Go", extension: ".go" },
  { id: "php", name: "PHP", extension: ".php" },
  { id: "rust", name: "Rust", extension: ".rs" },
];

interface LanguageContextType {
  language: StackLanguage;
  setLanguage: (lang: StackLanguage) => void;
  langMeta: LanguageMeta;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "sortstory_preferred_language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<StackLanguage>("python");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as StackLanguage;
    if (stored && ["javascript", "typescript", "c", "cpp", "python", "java", "go", "php", "rust"].includes(stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: StackLanguage) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const currentMeta = fontMeta.find(m => m.id === language) || fontMeta[0];

  if (!isMounted) {
    return (
      <LanguageContext.Provider value={{ language: "python", setLanguage: () => {}, langMeta: fontMeta[0] }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, langMeta: currentMeta }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
