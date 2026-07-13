"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ProgrammingLanguage = 'python' | 'javascript' | 'java' | 'cpp' | 'c';

interface LanguageContextType {
  language: ProgrammingLanguage;
  setLanguage: (lang: ProgrammingLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<ProgrammingLanguage>('javascript');

  useEffect(() => {
    const saved = localStorage.getItem('preferred_language') as ProgrammingLanguage;
    if (saved) setLanguageState(saved);
  }, []);

  const setLanguage = (lang: ProgrammingLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('preferred_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
