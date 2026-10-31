import { CONTACT } from "../data";
import LanguageSwitch from "./LanguageSwitch";
import SocialLinks from "./SocialLinks";

/* Tylko do 1000px — tam nagłówek mieści same sekcje. */

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
