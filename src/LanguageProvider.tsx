import { useEffect, useState, type ReactNode } from "react";
import { CONTENT, type Lang } from "./data";
import { LANGS, LanguageContext } from "./i18n";

/* Język strony: zapisany wybór użytkownika → preferencje przeglądarki
   (navigator.languages) → angielski jako domyślny dla reszty świata. */

const DEFAULT_LANG: Lang = "en";
const STORAGE_KEY = "lang";

const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);

function detectLanguage(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // localStorage bywa niedostępny (tryb prywatny, zablokowane ciasteczka) — wtedy decyduje przeglądarka
  }

  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of prefs) {
    const base = tag?.toLowerCase().split("-")[0]; // "pl-PL" → "pl"
    if (isLang(base)) return base;
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = CONTENT[lang].meta.title;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // bez localStorage wybór działa tylko do przeładowania strony
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}
