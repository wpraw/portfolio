import { useRef } from "react";
import GhostFibers from "../components/GhostFibers.jsx";
import TechText from "../components/TechText.jsx";
import { CONTACT } from "../data.js";
import { useLanguage } from "../i18n.jsx";

/* Strona startowa: pełnoekranowe tło Ghost Fibers (WebGL, React Bits),
   odręczny nagłówek + PROGRAMISTA, CTA do sekcji. */

/* ustawienia tła — odchudzone (2 warstwy, 44 włókna, rozdzielczość 0.75), płynne na dużych ekranach.
   Kolor włókna zależy od głębi: bliskie dostają glowColor, dalekie secondaryColor. */
const FIBERS = {
  // pierwsza zatwierdzona wersja: bliskie włókna ciemne, zlewały się z tłem
  calm: {
    glowColor: "#2a52c9",
    secondaryColor: "#7ea1e8",
    layers: 2,
    threads: 44,
    particles: 0.3,
    dpr: 0.75,
  },
  // bliskie włókna jaśniejsze i ostrzejsze: odwrócone kolory, płytsza głębia ostrości,
  // ostrość przesunięta nieco w stronę widza
  crisp: {
    glowColor: "#7ea1e8",
    secondaryColor: "#2a52c9",
    depthOfField: 0.5,
    focusDepth: -0.3,
    thickness: 1.4,
    glow: 1,
    brightness: 1.2,
    layers: 2,
    threads: 44,
    particles: 0.3,
    dpr: 0.75,
  },
};

export default function Home({ onNavigate }) {
  const { t } = useLanguage();
  const nameRef = useRef(null);

  return (
    <section className="panel relative flex h-screen w-screen shrink-0 items-center overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <GhostFibers {...FIBERS.crisp} />
      </div>
      <div data-hero aria-hidden className="absolute inset-0 z-5 text-paper">
        <TechText
          frameRef={nameRef}
          text={CONTACT.name.toUpperCase()}
          fontWeight={700}
          fontSize={128}
          letterSpacing={-0.025}
          align="left"
          accentColor="#7ea1e8"
          hoverPadding={40}
        />
      </div>

      <div className="pointer-events-none relative z-10 px-6 pt-16 md:px-16 lg:px-24">
        <p data-hero className="font-hand text-3xl text-paper/80 md:text-5xl">
          {t.home.greeting}
        </p>
        {/* miejsce na napis TechText — sztywne wymiary, bo komponent dopasowuje do nich rozmiar fontu */}
        <h1 ref={nameRef} className="mt-2 h-28 w-[79vw] md:h-40 md:w-[63vw] lg:h-48">
          <span className="sr-only">{CONTACT.name}</span>
        </h1>
        <p
          data-hero
          className="mt-1 font-code text-lg tracking-[0.55em] text-paper/70 md:text-2xl"
        >
          {t.role}
        </p>

        <div data-hero className="pointer-events-auto mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate(2)}
            className="border border-paper/60 px-7 py-3 font-code text-xs uppercase tracking-[0.2em] text-paper transition hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-paper)]"
          >
            {t.home.ctaResume}
          </button>
          <button
            onClick={() => onNavigate(3)}
            className="border border-paper/60 px-7 py-3 font-code text-xs uppercase tracking-[0.2em] text-paper transition hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-paper)]"
          >
            {t.home.ctaPortfolio}
          </button>
          <button
            onClick={() => onNavigate(4)}
            className="border border-paper/60 bg-paper px-7 py-3 font-code text-xs uppercase tracking-[0.2em] text-ink transition hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-royal)]"
          >
            {t.home.ctaContact}
          </button>
        </div>
      </div>

      {/* <a
        data-hero
        href={`mailto:${CONTACT.email}`}
        className="absolute bottom-6 left-6 z-10 font-hand text-2xl text-paper/60 hover:text-paper md:left-16"
      >
        {CONTACT.email}
      </a> */}

      {/* wskazówka scrolla */}
      <div
        data-hero
        className="absolute bottom-6 right-6 z-10 max-[1000px]:bottom-16 flex items-center gap-3 font-code text-[10px] uppercase tracking-[0.3em] text-paper/50 md:right-16"
      >
        {t.home.scroll}
        <span className="scroll-hint block h-px w-14 origin-left bg-paper/50" />
      </div>
    </section>
  );
}
