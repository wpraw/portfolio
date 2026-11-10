import { IconArrowRight, IconPlus } from "@tabler/icons-react";
import { useId, useState } from "react";
import { useLanguage } from "../i18n";

/* Oferta dla klientów: po lewej wstęp, wycena i przebieg współpracy, w środku usługi,
   po prawej FAQ. FAQ to akordeon (jedno pytanie otwarte naraz) — odpowiedzi są w HTML także
   zwinięte, więc czytają je Google i boty AI; ta sama treść idzie do JSON-LD (FAQPage) i llms.txt.
   Klucze list = indeksy, żeby zmiana języka nie remountowała elementów z animacjami GSAP. */

// ta sama krzywa co szuflady w Portfolio
const EASE = "ease-[cubic-bezier(0.32,0,0.12,1)]";

export default function Services({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { t } = useLanguage();
  const s = t.services;
  const uid = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="panel relative h-screen w-[300vw] shrink-0 overflow-hidden bg-navy md:w-[200vw] lg:w-[170vw] touch:h-auto touch:w-full"
    >
      <h2
        data-parallax="0.35"
        className="ghost-title absolute bottom-4 left-[10vw] text-[22vw] font-bold uppercase md:text-[16vw]"
      >
        {t.sections.find((x) => x.id === "services")?.label}
      </h2>

      <div className="relative z-10 grid h-full grid-cols-[1fr_1.2fr_1fr] gap-[5vw] px-[6vw] pt-16 max-[1000px]:pb-12 touch:h-auto touch:grid-cols-1 touch:gap-14 touch:px-[8vw] touch:pt-24 touch:pb-[34vw] touch:md:grid-cols-2 touch:md:pb-[22vw]">
        {/* wstęp + przebieg współpracy */}
        <div data-enter="up" className="self-center">
          <p className="font-hand text-4xl text-paper/70 md:text-5xl">{s.heading}</p>
          <span className="mt-6 block h-px w-24 bg-[#7ea1e8]" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/75 md:text-base">{s.intro}</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("contact");
            }}
            className="mt-8 inline-flex items-center gap-2 border border-paper/60 bg-paper px-6 py-3 font-code text-xs uppercase tracking-[0.2em] text-ink transition hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-royal)]"
          >
            {s.cta}
            <IconArrowRight aria-hidden stroke={1.5} className="h-[1.1em] w-[1.1em]" />
          </a>

          <h3 className="mt-12 font-hand text-3xl text-paper/90 md:text-4xl">{s.processTitle}</h3>
          <ol className="mt-5 max-w-md space-y-3">
            {s.process.map((p, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-x-5">
                <span className="pt-0.5 font-code text-xs tracking-widest text-paper/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-paper/65">
                  <span className="font-semibold text-paper">{p.title}</span> – {p.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* usługi */}
        <div data-enter="up" className="self-center">
          <h3 className="font-hand text-4xl text-paper/90 md:text-5xl">{s.offerTitle}</h3>
          <ul className="mt-8 grid grid-cols-2 gap-x-10 gap-y-8 touch:max-md:grid-cols-1">
            {s.items.map((item, i) => (
              <li key={i} className="border-t border-paper/20 pt-4">
                <p className="text-lg font-semibold text-paper md:text-xl">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/65">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ — przy niskim oknie lista przewija się zamiast ucinać */}
        <div
          data-enter="up"
          className="flex max-h-full min-h-0 flex-col self-center pt-4 pb-6 touch:max-h-none touch:md:col-span-2"
        >
          <h3 className="font-hand text-4xl text-paper/90 md:text-5xl">{s.faqTitle}</h3>
          <div className="mt-6 min-h-0 divide-y divide-paper/15 overflow-y-auto border-y border-paper/15 [scrollbar-color:rgb(255_255_255/0.2)_transparent] [scrollbar-width:thin]">
            {s.faq.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-4 pr-2 text-left font-semibold text-paper transition-colors hover:text-[#7ea1e8] md:text-lg"
                  >
                    {f.q}
                    <IconPlus
                      aria-hidden
                      size={16}
                      stroke={1.5}
                      className={`shrink-0 text-paper/50 transition-transform duration-500 ${EASE} motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {/* wysokość: grid-rows 0fr ↔ 1fr (jak szuflady w Portfolio), treść dojeżdża opacity z opóźnieniem */}
                  <div
                    id={`${uid}-a${i}`}
                    role="region"
                    aria-labelledby={`${uid}-q${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ${EASE} motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div
                      inert={!isOpen}
                      className={`min-h-0 overflow-hidden transition-opacity motion-reduce:transition-none ${
                        isOpen ? "opacity-100 delay-150 duration-300" : "opacity-0 duration-200"
                      }`}
                    >
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-paper/65">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
