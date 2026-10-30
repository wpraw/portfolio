import { useRef } from "react";
import CodeBackdrop from "../components/CodeBackdrop.jsx";
import DitheredGradient from "../components/DitheredGradient.jsx";
import TechText from "../components/TechText.jsx";
import { CONTACT } from "../data.js";
import { useLanguage } from "../i18n.jsx";

/* Strona 3 makiety: pełnoekranowe tło z rozmytym kodem,
   odręczny nagłówek + PROGRAMISTA, dwa CTA, e-mail w lewym dolnym rogu. */

export default function Home({ onNavigate }) {
  const { t } = useLanguage();
  const nameRef = useRef(null);

  return (
    <section className="panel relative flex h-screen w-screen shrink-0 items-center overflow-hidden bg-navy">
      {/* tekstura kodu na całości */}
      <DitheredGradient className="absolute inset-0 h-full w-full" />
      {/* maska = 1 − krycie przyciemnienia: kod po lewej przygaszony jak pod dawną nakładką */}
      <CodeBackdrop
        lines={46}
        seed={3}
        className="absolute inset-0 scale-110 [mask-image:linear-gradient(to_right,rgb(0_0_0/0.15),rgb(0_0_0/0.5)_50%,rgb(0_0_0/0.85))]"
      />

      {/* TechText na całą sekcję — litery można przeciągać wszędzie, przycina je dopiero
          krawędź sekcji. Napis układa się w prostokącie h1 poniżej (frameRef). Warstwa leży
          pod treścią, a treść przepuszcza kursor poza przyciskami. */}
      <div data-hero aria-hidden className="absolute inset-0 z-[5] text-paper">
        <TechText
          frameRef={nameRef}
          text={CONTACT.name.toUpperCase()}
          fontWeight={700}
          fontSize={128}
          letterSpacing={-0.025}
          align="left"
          accentColor="#7ea1e8"
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
        className="absolute bottom-6 right-6 z-10 flex items-center gap-3 font-code text-[10px] uppercase tracking-[0.3em] text-paper/50 md:right-16"
      >
        {t.home.scroll}
        <span className="scroll-hint block h-px w-14 origin-left bg-paper/50" />
      </div>
    </section>
  );
}
