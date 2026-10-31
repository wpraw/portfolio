import { IconArrowRight, IconMinus, IconPlus } from "@tabler/icons-react";
import { useState, type CSSProperties } from "react";
import { useLanguage } from "../i18n";

export default function Portfolio() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(0);
  const contentW = `min(47rem, calc(100vw - 13rem - ${t.projects.length - 1} * 5.75rem))`;

  return (
    <section
      style={{ "--content-w": contentW } as CSSProperties}
      className="panel relative flex h-screen w-screen shrink-0 flex-col overflow-hidden bg-olive px-5 pb-6 pt-20 max-[1000px]:pb-16 md:px-16 md:pt-24"
    >
      <p data-enter="up" className="relative z-10 font-hand text-3xl text-paper/80 md:text-5xl">
        {t.portfolio.heading}
      </p>

      <div className="relative z-10 mt-4 flex min-h-0 flex-1 flex-col gap-2 [--spine:3rem] min-[1001px]:max-h-[46rem] min-[1001px]:flex-row min-[1001px]:gap-3 min-[1001px]:[--spine:5rem] md:mt-10">
        {/* klucz = indeks, żeby zmiana języka nie remountowała kart */}
        {t.projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <article
              key={i}
              onMouseEnter={() => setOpen(i)}
              style={{ flex: isOpen ? "1 1 0%" : "0 0 var(--spine)" }}
              className={`group flex min-h-0 min-w-0 flex-col overflow-hidden border border-paper/15 transition-[flex,background-color] duration-500 ease-[cubic-bezier(0.32,0,0.12,1)] min-[1001px]:max-w-[52rem] min-[1001px]:flex-row ${
                isOpen ? "bg-navy" : "bg-navy/50 hover:bg-navy/70"
              }`}
            >
              {/* grzbiet: w pionie writing-mode + rotate-180, więc ten sam flex
                  układa tytuł na dole, a znacznik (ms-auto) na górze.
                  Padding w pionie logiczny: przy vertical-rl ps = dół (przy tytule), pe = góra (przy znaczniku) */}
              <h3 className="shrink-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  className="flex h-[var(--spine)] w-full items-center gap-4 px-5 text-left min-[1001px]:h-full min-[1001px]:w-[var(--spine)] min-[1001px]:rotate-180 min-[1001px]:py-0 min-[1001px]:ps-8 min-[1001px]:pe-6 min-[1001px]:[writing-mode:vertical-rl]"
                >
                  <span className="truncate font-bold uppercase tracking-wider text-paper md:text-lg">{p.title}</span>
                  {isOpen ? (
                    <IconMinus aria-hidden size={16} stroke={1.5} className="ms-auto shrink-0 text-paper/50" />
                  ) : (
                    <IconPlus aria-hidden size={16} stroke={1.5} className="ms-auto shrink-0 text-paper/50" />
                  )}
                </button>
              </h3>

              {/* gdy treść nie mieści się w oknie (niskie ekrany), przewija się zamiast ucinać */}
              <div
                inert={!isOpen}
                className={`min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden transition-opacity duration-300 [scrollbar-color:rgb(255_255_255/0.2)_transparent] [scrollbar-width:thin] ${
                  isOpen ? "opacity-100 delay-200" : "opacity-0"
                }`}
              >
                <div className="px-5 pb-5 min-[1001px]:w-[var(--content-w)] min-[1001px]:py-8 min-[1001px]:pl-2 min-[1001px]:pr-8">
                  <p aria-hidden className="hidden text-4xl font-bold uppercase text-paper min-[1001px]:block xl:text-5xl">
                    {p.title}
                  </p>
                  <p className="text-xs leading-relaxed text-paper/65 md:text-sm min-[1001px]:mt-5">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="border border-paper/25 px-2 py-1 font-code text-[10px] uppercase tracking-widest text-paper/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.clients && (
                    <div className="mt-6">
                      <p className="font-code text-[10px] uppercase tracking-widest text-paper/40">{t.portfolio.clients}</p>
                      <ul className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-4">
                        {p.clients.map((c) => (
                          <li key={c.name}>
                            <img
                              src={c.logo}
                              alt={c.name}
                              className={`w-auto opacity-80 brightness-0 invert ${c.tall ? "h-9 md:h-11" : "h-6 md:h-8"}`}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 font-hand text-xl text-paper/50 transition hover:text-paper md:mt-6"
                    >
                      {t.portfolio.more}
                      <IconArrowRight aria-hidden stroke={1.5} className="h-[0.9em] w-[0.9em]" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* w przepływie (nie absolute) — rezerwuje dół sekcji, parallaxa i tak jedzie tylko w poziomie;
          mt-auto dociska go do dołu, gdy akordeon zatrzyma się na max-h */}
      <h2 data-parallax="0.35" className="ghost-title mt-auto shrink-0 pt-3 text-[16vw] max-[1000px]:[@media(max-height:740px)]:hidden font-bold uppercase md:mb-4 md:pt-6 md:text-[min(14vw,20vh)]">
        {t.sections.find((s) => s.id === "portfolio")?.label}
      </h2>
    </section>
  );
}
