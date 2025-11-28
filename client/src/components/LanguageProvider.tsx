import { useState, useEffect, type ReactNode } from "react";
import { LanguageContext, type Language, getTranslation } from "@/lib/i18n";

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("roughan-language");
      if (stored === "en" || stored === "de") {
        return stored;
      }
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("de")) {
        return "de";
      }
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("roughan-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => getTranslation(language, key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
