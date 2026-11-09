import { createContext, useContext } from "react";
import type { Content, Lang } from "./data";

/* Kontekst i hook w osobnym pliku od <LanguageProvider> — Fast Refresh działa
   tylko dla modułów, które eksportują wyłącznie komponenty. */

export const LANGS: readonly Lang[] = ["pl", "en"];
export const STORAGE_KEY = "lang";

export const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);

/* Każdy język ma własny adres (/ i /en/) — wyszukiwarki i boty AI widzą obie wersje
   jako osobne, wyrenderowane strony (prerender w scripts/prerender.mjs). */
export const pathFor = (lang: Lang) => (lang === "pl" ? "/" : `/${lang}/`);

export function langFromPath(pathname: string): Lang {
  const first = pathname.split("/")[1]?.toLowerCase();
  return isLang(first) ? first : "pl";
}

/** wybór zapisany przełącznikiem języka; null, gdy go nie ma albo localStorage jest niedostępny */
export function readSavedLang(): Lang | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isLang(saved) ? saved : null;
  } catch {
    return null;
  }
}

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
