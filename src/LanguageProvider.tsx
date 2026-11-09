import { useEffect, useState, type ReactNode } from "react";
import { CONTENT, type Lang } from "./data";
import { langFromPath, LanguageContext, pathFor, STORAGE_KEY } from "./i18n";

/* Język wynika z adresu (/ = PL, /en/ = EN), więc HTML z prerenderu i pierwszy render
   w przeglądarce są identyczne. Przełącznik zmienia adres (pushState) i zapamiętuje wybór —
   przy kolejnej wizycie main.tsx przekieruje na zapisany język.
   Celowo bez przekierowań po navigator.languages: Googlebot ma en-US
   i nigdy nie zobaczyłby polskiej wersji. */

export function LanguageProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const { meta } = CONTENT[lang];
    document.documentElement.lang = lang;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [lang]);

  // Wstecz / Dalej między / i /en/
  useEffect(() => {
    const onPop = () => setLangState(langFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setLang = (next: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // bez localStorage wybór działa tylko do przeładowania strony
    }
    if (next === lang) return;
    setLangState(next);
    window.history.pushState(null, "", pathFor(next));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}
