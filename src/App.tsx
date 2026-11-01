import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./panels/Home";
import About from "./panels/About";
import Resume from "./panels/Resume";
import Portfolio from "./panels/Portfolio";
import Contact from "./panels/Contact";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase, useGSAP);

const NAV_EASE = CustomEase.create("navEase", "0.32, 0, 0.12, 1");

/* Dwa tryby przewijania (gsap.matchMedia):
   - mysz / touchpad: pionowy scroll napędza poziomą podróż —
     wrapper jest pinowany, tor (track) jedzie w lewo (scrub),
     kontenery [data-enter] wjeżdżają do widoku i znikają przy wyjeździe
     (ScrollTrigger z containerAnimation), tytuły-duchy [data-parallax] płyną wolniej niż tor;
   - urządzenie dotykowe: sekcje leżą jedna pod drugą i strona przewija się zwyczajnie w pionie
     (układ przełączają klasy touch: w panelach). */

// ten sam warunek co wariant `touch` w index.css
const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";
const MOUSE_QUERY = "not all and (hover: none) and (pointer: coarse)";

type EnterDir = "up" | "down" | "left" | "right";

const ENTER_FROM: Record<EnterDir, { x?: number; y?: number }> = {
  up: { y: 90 },
  down: { y: -90 },
  left: { x: -140 },
  right: { x: 140 },
};

const isTouch = () => window.matchMedia(TOUCH_QUERY).matches;

export default function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const track = trackRef.current!;
      const panels = gsap.utils.toArray<HTMLElement>(".panel");
      const mm = gsap.matchMedia();

      // --- mysz: pozioma podróż ---
      mm.add(MOUSE_QUERY, () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // aktywna sekcja = panel pod środkiem ekranu
              const x = self.progress * distance() + window.innerWidth / 2;
              const idx = panels.findIndex(
                (p) => x >= p.offsetLeft && x < p.offsetLeft + p.offsetWidth
              );
              if (idx !== -1) setActive(idx);
              gsap.set("[data-progress]", { scaleX: self.progress });
            },
          },
        });
        stRef.current = tween.scrollTrigger ?? null;

        gsap.utils.toArray<HTMLElement>("[data-enter]").forEach((el) => {
          const from = ENTER_FROM[el.dataset.enter as EnterDir] ?? ENTER_FROM.up;

          gsap.from(el, {
            ...from,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: "left 100%",
              end: "left 55%",
              scrub: true,
            },
          });

          gsap.to(el, {
            x: from.x ? -from.x * 0.6 : 0,
            y: from.y ? -from.y * 0.6 : 0,
            opacity: 0,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: "right 40%",
              end: "right 0%",
              scrub: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax ?? "0");
          gsap.fromTo(
            el,
            { x: () => window.innerWidth * speed },
            {
              x: () => -window.innerWidth * speed,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".lang-bar").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: "left 90%",
              end: "left 45%",
              scrub: true,
            },
          });
        });

        return () => {
          stRef.current = null;
        };
      });

      // --- dotyk: zwykły pionowy scroll ---
      mm.add(TOUCH_QUERY, () => {
        panels.forEach((p, i) => {
          ScrollTrigger.create({
            trigger: p,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => gsap.set("[data-progress]", { scaleX: self.progress }),
        });

        gsap.utils.toArray<HTMLElement>("[data-enter]").forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 70%",
              scrub: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".lang-bar").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 65%",
              scrub: true,
            },
          });
        });
      });

      gsap.to(".marquee", {
        xPercent: -50,
        ease: "none",
        duration: 22,
        repeat: -1,
      });

      gsap.from("[data-hero]", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from("[data-nav]", { yPercent: -100, duration: 0.7, ease: "power3.out" });

      gsap.fromTo(
        ".scroll-hint",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, repeat: -1, yoyo: true, ease: "power2.inOut" }
      );

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const panels = track.querySelectorAll<HTMLElement>(".panel");

    let target: number;
    if (isTouch()) {
      target = panels[i].getBoundingClientRect().top + window.scrollY;
    } else {
      const st = stRef.current;
      if (!st) return;
      const distance = track.scrollWidth - window.innerWidth;
      const progress = Math.min(panels[i].offsetLeft / distance, 1);
      target = st.start + progress * (st.end - st.start);
    }

    // czas zależny od dystansu: bliski panel ~0.8 s, drugi koniec ~1.6 s
    const total = Math.max(1, ScrollTrigger.maxScroll(window));
    const span = Math.min(1, Math.abs(target - window.scrollY) / total);
    gsap.to(window, {
      scrollTo: target,
      duration: 0.8 + 0.8 * span,
      ease: NAV_EASE,
      overwrite: "auto",
    });
  };

  return (
    <div className="noise">
      <Nav active={active} onNavigate={goTo} />

      <div ref={wrapperRef} className="h-screen overflow-hidden touch:h-auto touch:overflow-visible">
        <div ref={trackRef} className="flex h-full w-max touch:h-auto touch:w-full touch:flex-col">
          <Home onNavigate={goTo} />
          <About />
          <Resume />
          <Portfolio />
          <Contact />
        </div>
      </div>

      <Footer />

      {/* pasek postępu podróży — do 1000px leży na górnej krawędzi stopki */}
      <div className="fixed bottom-0 left-0 z-50 h-[3px] w-full bg-paper/10 max-[1000px]:bottom-12">
        <div data-progress className="h-full w-full origin-left scale-x-0 bg-royal" />
      </div>
    </div>
  );
}
