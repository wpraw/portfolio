import { LANGS, pathFor, useLanguage } from "../i18n";

/* Prawdziwe linki do /, /en/ (dla wyszukiwarek i otwierania w nowej karcie),
   zwykły klik przełącza język bez przeładowania. */

export default function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div role="group" aria-label={t.langSwitch} className="flex items-center font-code text-[11px] tracking-[0.25em] md:text-xs">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-paper/30">/</span>}
          <a
            href={pathFor(l)}
            hrefLang={l}
            lang={l}
            aria-current={lang === l ? "page" : undefined}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              setLang(l);
            }}
            className={`-my-2 px-2.5 py-2 uppercase transition-colors ${
              lang === l ? "text-paper" : "text-paper/50 hover:text-paper"
            }`}
          >
            {l}
          </a>
        </span>
      ))}
    </div>
  );
}
