import SideRays from "../components/SideRays.jsx";
import { CONTACT } from "../data.js";
import { useLanguage } from "../i18n.jsx";

/* Strona 6 makiety: niemal czarna, szara belka, odręczny nagłówek,
   telefon + e-mail. Treść zastąpiona neutralnym placeholderem. */

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section className="panel relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden bg-ink">
      {/* snopy światła z prawego górnego rogu — kolory z palety (paper + jasny niebieski z tekstury kodu) */}
      <SideRays
        className="!absolute inset-0"
        rayColor1="#e9e7e1"
        rayColor2="#7ea1e8"
        origin="top-right"
        speed={4.6}
        intensity={0.95}
        spread={3.3}
        density={7}
        followMouse={false}
        sharpness={0.18}
        glow={0.9}
        saturation={2}
        dust={0.81}
        mouseInfluence={0.63}
      />


      <div className="relative z-10 px-6 text-center">
        <p data-enter="up" className="font-hand text-5xl leading-tight text-paper/85 md:text-7xl">
          {t.contact.headline}
        </p>
        <p data-enter="up" className="mt-3 font-hand text-3xl text-paper/50 md:text-4xl">
          {t.contact.sub}
        </p>

        <div data-enter="up" className="mt-14 flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-14">
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="font-code text-lg tracking-[0.2em] text-paper/70 transition hover:text-paper md:text-2xl"
          >
            {CONTACT.phone}
          </a>
          <span className="hidden h-8 w-px bg-paper/25 md:block" />
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-code text-lg tracking-[0.2em] text-paper/70 underline decoration-royal decoration-2 underline-offset-8 transition hover:text-paper md:text-2xl"
          >
            {CONTACT.email}
          </a>
        </div>

        <p data-enter="up" className="mt-16 font-code text-[10px] uppercase tracking-[0.4em] text-paper/30">
          © {new Date().getFullYear()} {CONTACT.name} · {t.location}
        </p>
      </div>
    </section>
  );
}
