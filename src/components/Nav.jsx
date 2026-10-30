import { CONTACT } from "../data.js";
import { useLanguage } from "../i18n.jsx";
import LanguageSwitch from "./LanguageSwitch.jsx";

/* Stała belka nawigacji — szary pasek z makiety (strona 2).
   Kliknięcie sekcji przewija pionowy scroll do pozycji panelu. */

export default function Nav({ active, onNavigate }) {
  const { t } = useLanguage();

  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-steel/90 px-5 py-3 backdrop-blur-sm md:px-10"
    >
      <nav className="flex items-center gap-5 md:gap-8">
        {t.sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onNavigate(i)}
            className={`font-code text-[11px] uppercase tracking-[0.25em] transition-colors md:text-xs ${
              active === i ? "text-paper" : "text-paper/50 hover:text-paper"
            }`}
          >
            {s.label}
            <span
              className={`mt-1 block h-px bg-paper transition-transform duration-300 ${
                active === i ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-6 md:gap-8">
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          className="hidden font-code text-xs tracking-widest text-paper/70 hover:text-paper sm:block"
        >
          {CONTACT.phone}
        </a>
        <LanguageSwitch />
      </div>
    </header>
  );
}
