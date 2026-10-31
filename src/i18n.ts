import { createContext, useContext } from "react";
import type { Content, Lang } from "./data";

/* Kontekst i hook w osobnym pliku od <LanguageProvider> — Fast Refresh działa
   tylko dla modułów, które eksportują wyłącznie komponenty. */

export const LANGS: readonly Lang[] = ["pl", "en"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: Content;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage musi być użyty wewnątrz <LanguageProvider>");
  return ctx;
}
