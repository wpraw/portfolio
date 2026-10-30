import { MARQUEE } from "../data.js";
import { useLanguage } from "../i18n.jsx";

/* Strona 5 makiety: królewski niebieski, trzy kolumny
   (umiem / doświadczenie i edukacja / hobby + wartość dla firmy),
   paski języków, na dole animowany pas logotypów.
   Klucze list = indeksy, żeby zmiana języka nie remountowała
   elementów z animacjami GSAP (np. .lang-bar). */

export default function Resume() {
  const { t } = useLanguage();

  return (
    <section className="panel relative flex h-screen w-[140vw] shrink-0 flex-col overflow-hidden bg-royal md:w-screen">
      <h2 data-parallax="0.35" className="ghost-title absolute -top-4 right-10 text-[20vw] font-bold uppercase md:text-[13vw]">
        {t.sections.find((s) => s.id === "resume").label}
      </h2>

      <div className="relative z-10 mt-24 grid flex-1 grid-cols-3 gap-6 px-6 md:mt-28 md:gap-10 md:px-16">
        {/* Umiem */}
        <div data-enter="up" className="border-l border-paper/25 pl-5 md:pl-8">
          <h3 className="font-hand text-3xl text-paper md:text-4xl">{t.resume.skillsTitle}</h3>
          <ul className="mt-5 space-y-2">
            {t.skills.map((s, i) => (
              <li key={i}className="skill-item font-code text-[11px] text-paper/80 md:text-sm">
                <span className="mr-2 text-paper/40">→</span>
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-7 space-y-4">
            {t.languages.map((l, i) => (
              <div key={i}>
                <div className="flex justify-between font-code text-[10px] uppercase tracking-widest text-paper/70 md:text-xs">
                  <span>{l.name}</span>
                  <span>{l.level}</span>
                </div>
                <div className="mt-1 h-1 bg-paper/20">
                  <div className="lang-bar h-full origin-left bg-paper" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doświadczenie i edukacja */}
        <div data-enter="up" className="border-l border-paper/25 pl-5 md:pl-8">
          <h3 className="font-hand text-3xl text-paper md:text-4xl">{t.resume.experienceTitle}</h3>
          <ol className="mt-5 space-y-6">
            {t.experience.map((e, i) => (
              <li key={i}className="skill-item">
                <p className="font-code text-[10px] tracking-widest text-paper/50">{e.period}</p>
                <p className="mt-1 font-semibold text-paper md:text-lg">{e.title}</p>
                <p className="text-xs text-paper/70 md:text-sm">{e.place}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-paper/60 md:text-xs">{e.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Hobby / wartość */}
        <div data-enter="up" className="border-l border-paper/25 pl-5 md:pl-8">
          <h3 className="font-hand text-3xl text-paper md:text-4xl">{t.resume.hobbiesTitle}</h3>
          <ul className="mt-5 space-y-4">
            {t.hobbies.map((h, i) => (
              <li key={i}className="skill-item text-xs leading-relaxed text-paper/75 md:text-sm">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* pas logotypów — infinite marquee */}
      <div data-enter="up" className="relative z-10 mb-0 border-t border-paper/20 bg-ink/30 py-5">
        <div className="marquee flex w-max gap-14 whitespace-nowrap px-7">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="font-code text-sm uppercase tracking-[0.3em] text-paper/60">
              ◍ {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
