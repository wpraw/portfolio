import { lazy, Suspense, useEffect, useState } from "react";
import { buildCardFaces } from "../components/cardFaces.js";
import { CONTACT, PHOTO } from "../data.js";
import { useLanguage } from "../i18n.jsx";

/* Sekcja O mnie, szeroka na ok. 1,5 ekranu: po lewej bio i fakty,
   w środku identyfikator na smyczy (Lanyard — można go złapać, rzucić,
   kliknąć, żeby się odwrócił), po prawej "Jak pracuję". Treści statyczne —
   rusza się tylko karta i tytuł-duch w tle. */

// Lanyard ciągnie three.js (~550 KB) — osobny plik, ładowany w tle, nie blokuje startu strony
const Lanyard = lazy(() => import("../components/Lanyard.jsx"));

export default function About() {
  const { lang, t } = useLanguage();
  const [faces, setFaces] = useState({});
  const firstName = CONTACT.name.split(" ")[0];

  // grafiki karty rysowane na canvasie — przerysuj przy zmianie języka
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
    }).then((next) => alive && setFaces(next));
    return () => {
      alive = false;
    };
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="panel relative h-screen w-[220vw] shrink-0 overflow-hidden bg-slate md:w-[150vw]">
      {/* wielki tytuł-duch w tle, jedzie z parallaxą */}
      <h2
        data-parallax="0.35"
        className="ghost-title absolute bottom-4 left-[10vw] text-[22vw] font-bold uppercase md:text-[16vw]"
      >
        {t.sections.find((s) => s.id === "about").label}
      </h2>

      {/* identyfikator na smyczy — zwisa spod belki nawigacji; warstwa na całą sekcję,
          więc kartę przycina dopiero granica sekcji (leży pod kolumnami z treścią) */}
      <div className="absolute inset-0">
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
        <p className="pointer-events-none absolute inset-x-0 bottom-[10%] text-center font-hand text-2xl text-paper/45">
          {t.about.hint}
        </p>
      </div>

      {/* siatka nie łapie kursora — tylko kolumny z treścią, reszta trafia do karty */}
      <div className="pointer-events-none relative z-10 grid h-full grid-cols-[1fr_minmax(0,0.9fr)_1fr]">
        {/* lewa kolumna — kim jestem */}
        <div className="pointer-events-auto self-center pt-16 pl-[8vw] pr-6">
          <p className="font-code text-[11px] uppercase tracking-[0.35em] text-paper/50">
            01 — {t.about.heading}
          </p>
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

          <a
            href={`mailto:${CONTACT.email}`}
            className="group mt-10 inline-flex items-center gap-3 font-code text-xs tracking-widest text-paper/70 transition hover:text-paper"
          >
            {CONTACT.email}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* środek pusty — tu wisi karta */}
        <div />

        {/* prawa kolumna — jak pracuję */}
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
