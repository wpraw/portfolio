import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./panels/Home.jsx";
import About from "./panels/About.jsx";
import Resume from "./panels/Resume.jsx";
import Portfolio from "./panels/Portfolio.jsx";
import Contact from "./panels/Contact.jsx";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase, useGSAP);

/* cubic-bezier dla nawigacji: szybki start, długie miękkie wyhamowanie —
   scrub (1 s) dokłada własne wygładzenie, więc krzywa jest "out"-heavy */
const NAV_EASE = CustomEase.create("navEase", "0.32, 0, 0.12, 1");

/* Pionowy scroll napędza poziomą podróż:
   - wrapper jest pinowany, tor (track) jedzie w lewo (scrub),
   - kontenery [data-enter] wjeżdżają do widoku i znikają przy wyjeździe
     (ScrollTrigger z containerAnimation),
   - tytuły-duchy [data-parallax] płyną wolniej niż tor. */

const ENTER_FROM = {
  up: { y: 90 },
  down: { y: -90 },
  left: { x: -140 },
  right: { x: 140 },
};

export default function App() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const stRef = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const track = trackRef.current;
      const panels = gsap.utils.toArray(".panel");
      const distance = () => track.scrollWidth - window.innerWidth;

      /* --- główny tween poziomy --- */
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
      stRef.current = tween.scrollTrigger;

      /* --- wjazd + zniknięcie kontenerów --- */
      gsap.utils.toArray("[data-enter]").forEach((el) => {
        const from = ENTER_FROM[el.dataset.enter] ?? ENTER_FROM.up;

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

      /* --- parallaxa tytułów-duchów --- */
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax);
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

      /* --- paski języków --- */
      gsap.utils.toArray(".lang-bar").forEach((el) => {
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
      /* --- marquee logotypów --- */
      gsap.to(".marquee", {
        xPercent: -50,
        ease: "none",
        duration: 22,
        repeat: -1,
      });

      /* --- wejście hero przy załadowaniu --- */
      gsap.from("[data-hero]", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from("[data-nav]", { yPercent: -100, duration: 0.7, ease: "power3.out" });

      /* --- pulsująca linia "scroll" --- */
      gsap.fromTo(
        ".scroll-hint",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, repeat: -1, yoyo: true, ease: "power2.inOut" }
      );
    },
    { scope: wrapperRef }
  );

  /* klik w nav → przewiń pionowy scroll do pozycji panelu */
  const goTo = (i) => {
    const st = stRef.current;
    const track = trackRef.current;
    if (!st || !track) return;
    const panels = track.querySelectorAll(".panel");
    const distance = track.scrollWidth - window.innerWidth;
    const progress = Math.min(panels[i].offsetLeft / distance, 1);
    const target = st.start + progress * (st.end - st.start);
    // czas zależny od dystansu: bliski panel ~0.8 s, drugi koniec ~1.6 s
    const span = Math.abs(target - window.scrollY) / (st.end - st.start);
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

      <div ref={wrapperRef} className="h-screen overflow-hidden">
        <div ref={trackRef} className="flex h-full w-max">
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
