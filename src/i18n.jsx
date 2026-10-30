import { createContext, useContext, useEffect, useState } from "react";
import { CONTENT } from "./data.js";

/* Język strony: zapisany wybór użytkownika → preferencje przeglądarki
   (navigator.languages) → angielski jako domyślny dla reszty świata. */

export const LANGS = ["pl", "en"];
const DEFAULT_LANG = "en";
const STORAGE_KEY = "lang";

function detectLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {}

  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of prefs) {
    const base = tag?.toLowerCase().split("-")[0]; // "pl-PL" → "pl"
    if (LANGS.includes(base)) return base;
  }
  return DEFAULT_LANG;
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = CONTENT[lang].meta.title;
  }, [lang]);

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage musi być użyty wewnątrz <LanguageProvider>");
  return ctx;
}
