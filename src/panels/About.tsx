import { IconRotateClockwise } from "@tabler/icons-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { buildCardFaces, type CardFaces } from "../components/cardFaces";
import { CONTACT, PHOTO } from "../data";
import { useLanguage } from "../i18n";

/* Po lewej bio i fakty, w środku identyfikator na smyczy (Lanyard — można go złapać,
   rzucić, kliknąć, żeby się odwrócił), po prawej "Jak pracuję". */

// Lanyard ciągnie three.js (~550 KB) — osobny plik, ładowany w tle, nie blokuje startu strony
const Lanyard = lazy(() => import("../components/Lanyard"));

export default function About() {
  const { t } = useLanguage();
  const [faces, setFaces] = useState<Partial<CardFaces>>({});
  const firstName = CONTACT.name.split(" ")[0];

  // grafiki karty rysowane na canvasie — przerysowywane, gdy zmienią się teksty (język)
  useEffect(() => {
    let alive = true;
    buildCardFaces({
      photo: PHOTO,
      label: t.about.photo,
      name: CONTACT.name,
      role: t.role,
      location: t.location,
      email: CONTACT.email,
      strap: t.about.strap,
    }).then((next) => {
      if (alive) setFaces(next);
    });
    return () => {
      alive = false;
    };
  }, [t.about.photo, t.about.strap, t.role, t.location]);

  return (
    <section className="panel relative h-screen w-[220vw] shrink-0 overflow-hidden bg-slate md:w-[150vw]">
      <h2
        data-parallax="0.35"
        className="ghost-title absolute bottom-4 left-[10vw] text-[22vw] font-bold uppercase md:text-[16vw]"
      >
        {t.sections.find((s) => s.id === "about")?.label}
      </h2>

      {/* identyfikator na smyczy — zwisa spod belki nawigacji; warstwa na całą sekcję,
          więc kartę przycina dopiero granica sekcji (leży pod kolumnami z treścią) */}
      <div className="absolute inset-0">
        {/* podpowiedź przed kartą w DOM — przeciągnięta karta ją przykrywa */}
        <p className="pointer-events-none absolute inset-x-0 bottom-[20%] flex items-center justify-center gap-2 font-hand text-2xl text-paper/45">
          {t.about.hint}
          <IconRotateClockwise aria-hidden stroke={1.5} className="h-[0.8em] w-[0.8em]" />
        </p>
        <Suspense fallback={null}>
          <Lanyard
            frontImage={faces.front}
            backImage={faces.back}
            strapImage={faces.strap}
            cardColor="#05172f"
            strapColor="#05207f"
            size={0.5}
            strapLength={0.45}
            inertia={1}
          />
        </Suspense>
      </div>

      {/* siatka nie łapie kursora — tylko kolumny z treścią, reszta trafia do karty */}
      <div className="pointer-events-none relative z-10 grid h-full grid-cols-[1fr_minmax(0,0.9fr)_1fr]">
        <div className="pointer-events-auto self-center pt-16 pl-[8vw] pr-6">
          <p className="mt-8 font-hand text-4xl text-paper/70 md:text-5xl">{t.about.hello}</p>
          <h3 className="text-6xl font-bold uppercase leading-[0.95] tracking-tight text-paper md:text-8xl">
            {firstName}.
          </h3>
          <span className="mt-6 block h-px w-24 bg-[#7ea1e8]" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/75 md:text-base">{t.about.bio}</p>

          <dl className="mt-10 flex max-w-md divide-x divide-paper/15">
            {t.about.facts.map((f, i) => (
              <div key={i} className="flex-1 px-4 first:pl-0">
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-xl font-bold text-paper md:text-2xl">{f.value}</dd>
                <dd className="mt-1 font-code text-[10px] uppercase tracking-widest text-paper/50">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* środek pusty — tu wisi karta */}
        <div />

        <div className="pointer-events-auto self-center pt-16 pl-6 pr-[8vw]">
          <h3 className="font-hand text-4xl text-paper/90 md:text-5xl">{t.about.approachTitle}</h3>
          <ol className="mt-8 max-w-md divide-y divide-paper/15 border-y border-paper/15">
            {t.about.principles.map((p, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-x-6 py-6">
                <span className="pt-1 font-code text-xs tracking-widest text-paper/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-lg font-semibold text-paper md:text-xl">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-paper/65">{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
