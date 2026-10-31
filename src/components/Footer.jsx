import { CONTACT } from "../data.js";
import LanguageSwitch from "./LanguageSwitch.jsx";
import SocialLinks from "./SocialLinks.jsx";

/* Stała dolna belka — tylko na wąskich ekranach (do 1000px), gdzie
   w nagłówku zostają same sekcje. Telefon, GitHub, LinkedIn i zmiana języka.
   Wysokość h-12 — panele zostawiają na nią miejsce (max-[1000px]:pb-12 / bottom-16). */

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 flex h-12 items-center justify-between bg-steel/90 px-5 min-[1001px]:hidden">
      <div className="flex items-center gap-5">
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          className="font-code text-[11px] tracking-widest text-paper/70 hover:text-paper"
        >
          {CONTACT.phone}
        </a>
        <SocialLinks />
      </div>
      <LanguageSwitch />
    </footer>
  );
}
