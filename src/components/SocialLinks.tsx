import { IconBrandGithubFilled, IconBrandLinkedinFilled } from "@tabler/icons-react";
import { CONTACT } from "../data";

const SOCIALS = [
  { id: "github", label: "GitHub", href: CONTACT.github, Icon: IconBrandGithubFilled },
  { id: "linkedin", label: "LinkedIn", href: CONTACT.linkedin, Icon: IconBrandLinkedinFilled },
];

// bez własnego wrappera — ikony wpadają w flex rodzica i dziedziczą jego odstępy
export default function SocialLinks() {
  return SOCIALS.map(({ id, label, href, Icon }) => (
    <a
      key={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-paper/60 transition-colors hover:text-paper"
    >
      {/* ikony Tablera mają ~2px marginesu w polu 24×24, stąd 21px ≈ dawne 18px bez marginesu */}
      <Icon size={21} aria-hidden />
    </a>
  ));
}
