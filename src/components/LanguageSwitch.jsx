import { LANGS, useLanguage } from "../i18n.jsx";

/* Przełącznik PL / EN w belce nawigacji. */

export default function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div role="group" aria-label={t.langSwitch} className="flex items-center font-code text-[11px] tracking-[0.25em] md:text-xs">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-paper/30">/</span>}
          {/* padding powiększa pole kliknięcia, ujemny margines pionowy nie podnosi belki */}
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`-my-2 px-2.5 py-2 uppercase transition-colors ${
              lang === l ? "text-paper" : "text-paper/50 hover:text-paper"
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
