"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { translations } from "@/lib/translations";

export type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<string>("es");

  const value = useMemo<LanguageContextType>(() => {
    const defaultLanguage = "es";

    const t = (key: string) => {
      const currentDict = translations[language] || translations[defaultLanguage] || {};
      const fallbackDict = translations[defaultLanguage] || {};
      return currentDict[key] ?? fallbackDict[key] ?? key;
    };

    return { language, setLanguage, t };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  return ctx;
}
