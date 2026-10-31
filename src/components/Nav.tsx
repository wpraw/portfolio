import { CONTACT } from "../data";
import { useLanguage } from "../i18n";
import LanguageSwitch from "./LanguageSwitch";
import SocialLinks from "./SocialLinks";

interface NavProps {
  active: number;
  onNavigate: (index: number) => void;
}

export default function Nav({ active, onNavigate }: NavProps) {
  const { t } = useLanguage();

  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-steel/90 px-4 py-3 min-[400px]:px-5 md:px-10"
    >
      <nav className="flex items-center gap-5 max-md:w-full max-md:justify-between max-md:gap-2 md:gap-8">
        {t.sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onNavigate(i)}
            className={`whitespace-nowrap font-code text-[10px] uppercase tracking-[0.12em] transition-colors max-[359px]:tracking-[0.05em] min-[400px]:text-[11px] min-[400px]:tracking-[0.16em] md:text-xs md:tracking-[0.25em] ${
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
      {/* do 1000px telefon, ikony i język są w stopce (Footer) */}
      <div className="hidden items-center gap-6 min-[1001px]:flex md:gap-8">
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          className="font-code text-xs tracking-widest text-paper/70 hover:text-paper"
        >
          {CONTACT.phone}
        </a>
        <div className="flex items-center gap-5">
          <SocialLinks />
        </div>
        <LanguageSwitch />
      </div>
    </header>
  );
}
