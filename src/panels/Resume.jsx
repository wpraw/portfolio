import { CONTACT, MARQUEE } from "../data.js";
import { useLanguage } from "../i18n.jsx";

/* Strona 5 makiety: królewski niebieski, trzy kolumny
   (umiem / doświadczenie i edukacja / hobby + wartość dla firmy),
   paski języków, na dole animowany pas logotypów.
   Stylizacja na blueprint: papier milimetrowy, ramka arkusza ze strefami
   (1–6 / A–D), linie wymiarowe nad kolumnami, węzły na osi czasu,
   podziałka pod paskami języków i tabliczka rysunkowa obok pasa logotypów.
   Klucze list = indeksy, żeby zmiana języka nie remountowała
   elementów z animacjami GSAP (np. .lang-bar). */

const ZONES_X = [1, 2, 3, 4, 5, 6];
const ZONES_Y = ["A", "B", "C", "D"];

// L-kształtne znaczniki narożników ramki
const CORNERS = [
  "-left-2 -top-2 border-l border-t",
  "-right-2 -top-2 border-r border-t",
  "-left-2 -bottom-2 border-l border-b",
  "-right-2 -bottom-2 border-r border-b",
];

export default function Resume() {
  const { t } = useLanguage();
  const sheet = t.sections.findIndex((s) => s.id === "resume") + 1;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="panel relative flex h-screen w-[140vw] shrink-0 flex-col overflow-hidden bg-royal max-[1000px]:pb-12 md:w-screen">
      <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0" />

      {/* bez data-parallax — na blueprincie tytuł stoi w miejscu razem z arkuszem */}
      <h2 className="ghost-title absolute -top-4 right-10 text-[20vw] font-bold uppercase md:text-[13vw]">
        {t.sections.find((s) => s.id === "resume").label}
      </h2>

      {/* pole rysunku — ramka arkusza kończy się nad pasem logotypów */}
      <div className="relative min-h-0 flex-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 bottom-3 top-16 border border-paper/25 font-code text-[9px] text-paper/35 md:inset-x-6"
        >
          {CORNERS.map((c) => (
            <span key={c} className={`absolute h-3 w-3 border-paper/60 ${c}`} />
          ))}
          {/* strefy arkusza: cyfry u góry, litery z lewej, kreski na granicach */}
          {ZONES_X.map((n, i) => (
            <span key={n}>
              <span className="absolute top-1 -translate-x-1/2" style={{ left: `${((i + 0.5) / ZONES_X.length) * 100}%` }}>
                {n}
              </span>
              {i > 0 && (
                <span className="absolute top-0 h-2 w-px bg-paper/25" style={{ left: `${(i / ZONES_X.length) * 100}%` }} />
              )}
            </span>
          ))}
          {ZONES_Y.map((l, i) => (
            <span key={l}>
              <span className="absolute left-1.5 -translate-y-1/2" style={{ top: `${((i + 0.5) / ZONES_Y.length) * 100}%` }}>
                {l}
              </span>
              {i > 0 && (
                <span className="absolute left-0 h-px w-2 bg-paper/25" style={{ top: `${(i / ZONES_Y.length) * 100}%` }} />
              )}
            </span>
          ))}
        </div>

        <div className="relative z-10 grid h-full grid-cols-3 gap-6 px-6 pt-24 md:gap-10 md:px-16 md:pt-28">
          {/* Umiem */}
          <div data-enter="up" className="border-l border-paper/25 pl-5 md:pl-8">
            <p aria-hidden className="dim mb-3 font-code text-[9px] tracking-[0.3em] text-paper/40">DET. A</p>
            <h3 className="font-hand text-3xl text-paper md:text-4xl">{t.resume.skillsTitle}</h3>
            <ul className="mt-5 space-y-2">
              {t.skills.map((s, i) => (
                <li key={i} className="skill-item font-code text-[11px] text-paper/80 md:text-sm">
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
                  <div aria-hidden className="gauge" />
                </div>
              ))}
            </div>
          </div>

          {/* Doświadczenie i edukacja — węzły osi czasu siedzą na lewej krawędzi kolumny */}
          <div data-enter="up" className="border-l border-paper/25 pl-5 md:pl-8">
            <p aria-hidden className="dim mb-3 font-code text-[9px] tracking-[0.3em] text-paper/40">DET. B</p>
            <h3 className="font-hand text-3xl text-paper md:text-4xl">{t.resume.experienceTitle}</h3>
            <ol className="mt-5 space-y-6">
              {t.experience.map((e, i) => (
                <li key={i} className="skill-item relative">
                  <span
                    aria-hidden
                    className="absolute -left-[25px] top-0.5 h-[9px] w-[9px] rounded-full border border-paper/70 bg-royal md:-left-[37px]"
                  />
                  <p className="font-code text-[10px] tracking-widest text-paper/50">{e.period}</p>
                  <p className="mt-1 font-semibold text-paper md:text-lg">{e.title}</p>
                  <p className="text-xs text-paper/70 md:text-sm">{e.place}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-paper/60 md:text-xs">{e.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Wartość dla zespołu */}
          <div data-enter="up" className="border-l border-paper/25 pl-5 md:pl-8">
            <p aria-hidden className="dim mb-3 font-code text-[9px] tracking-[0.3em] text-paper/40">DET. C</p>
            <h3 className="font-hand text-3xl text-paper md:text-4xl">{t.resume.teamValueTitle}</h3>
            <ul className="mt-5 space-y-4">
              {t.teamValue.map((h, i) => (
                <li key={i} className="skill-item">
                  <p className="font-semibold text-paper md:text-lg">{h.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-paper/60 md:text-xs">{h.desc}</p>
                </li>
              ))}
            </ul>

          {/* Wartość dla klienta */}
            <h3 className="mt-10 font-hand text-3xl text-paper md:text-4xl">{t.resume.clientTitle}</h3>
            <ul className="mt-5 space-y-4">
              {t.clientValue.map((c, i) => (
                <li key={i} className="skill-item">
                  <p className="font-semibold text-paper md:text-lg">{c.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-paper/60 md:text-xs">{c.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* pas logotypów (infinite marquee) + tabliczka rysunkowa po prawej */}
      <div data-enter="up" className="relative z-10 flex border-t border-paper/20 bg-ink/30">
        <div className="min-w-0 flex-1 overflow-hidden py-5">
          <div className="marquee flex w-max gap-14 whitespace-nowrap px-7">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="font-code text-sm uppercase tracking-[0.3em] text-paper/60">
                ◍ {m}
              </span>
            ))}
          </div>
        </div>
        {/* pr — panel ma 100vw, więc prawy brzeg chowa się pod paskiem przewijania */}
        <dl className="hidden shrink-0 divide-x divide-paper/20 border-l border-paper/20 pr-5 font-code uppercase md:flex">
          {[
            [t.resume.titleBlock.drawn, CONTACT.name],
            [t.resume.titleBlock.sheet, `${pad(sheet)} / ${pad(t.sections.length)}`],
            [t.resume.titleBlock.scale, "1:1"],
            [t.resume.titleBlock.rev, new Date().getFullYear()],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col justify-center px-4">
              <dt className="text-[9px] tracking-[0.25em] text-paper/40">{label}</dt>
              <dd className="text-[11px] tracking-widest text-paper/80">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
