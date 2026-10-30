import { useLanguage } from "../i18n.jsx";

/* Strona zaprojektowana od zera w vibe kolażu (nie było jej w makiecie):
   oliwkowo-grafitowe tło, karty projektów porozrzucane na przemiennych
   wysokościach, nachodzące na tytuł-ducha. */

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <section className="panel relative h-screen w-[160vw] shrink-0 overflow-hidden bg-olive md:w-[120vw]">
      <h2 data-parallax="0.35" className="ghost-title absolute bottom-10 left-10 text-[20vw] font-bold uppercase md:text-[14vw]">
        {t.sections.find((s) => s.id === "portfolio").label}
      </h2>

      <p data-enter="up" className="absolute left-8 top-24 z-10 font-hand text-3xl text-paper/80 md:left-16 md:text-5xl">
        {t.portfolio.heading}
      </p>

      <div className="relative z-10 flex h-full items-center gap-8 px-8 pt-16 md:gap-14 md:px-24">
        {/* klucz = indeks, żeby zmiana języka nie remountowała kart z animacjami GSAP */}
        {t.projects.map((p, i) => (
          <article
            key={i}
            data-enter={i % 2 ? "down" : "up"}
            className={`group w-64 shrink-0 border border-paper/15 bg-navy p-6 transition-shadow duration-300 hover:shadow-[14px_14px_0_0_var(--color-royal)] md:w-80 md:p-8 ${
              i % 2 ? "-translate-y-10" : "translate-y-10"
            }`}
          >
            <span className="font-code text-[10px] tracking-[0.35em] text-paper/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-2xl font-bold uppercase text-paper md:text-3xl">{p.title}</h3>
            <p className="mt-4 text-xs leading-relaxed text-paper/65 md:text-sm">{p.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="border border-paper/25 px-2 py-1 font-code text-[10px] uppercase tracking-widest text-paper/60">
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-6 block font-hand text-xl text-paper/50 transition group-hover:text-paper">
              {t.portfolio.more}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
