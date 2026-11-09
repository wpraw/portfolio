import { CONTACT, CONTENT, PHOTO, type Lang } from "./data";
import { LANGS, pathFor } from "./i18n";
import { OG_IMAGE } from "./site";

/* Wszystko, co trafia do <head> i plików dla crawlerów, liczone z data.ts —
   jedno źródło treści dla strony, Google i asystentów AI (ChatGPT, Perplexity, Claude).
   Używane tylko w buildzie (scripts/prerender.mjs przez entry-server). */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const xmlEsc = (s: string) => esc(s).replace(/'/g, "&apos;");

const pageUrl = (site: string, lang: Lang) => site + pathFor(lang);

/** "React / Next.js" → ["React", "Next.js"]; "GitLab CI/CD" zostaje w całości */
const splitSkills = (skills: string[]) =>
  skills.flatMap((s) => s.split(/\s+\/\s+|,\s*/)).filter(Boolean);

export function buildJsonLd(lang: Lang, site: string) {
  const t = CONTENT[lang];
  const url = pageUrl(site, lang);
  const person = `${site}/#person`;
  const photo = PHOTO.startsWith("/") ? site + PHOTO : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: CONTACT.name,
        url: `${site}/`,
        image: photo,
        jobTitle: lang === "pl" ? "Programista stron i aplikacji webowych" : "Web Developer",
        description: t.meta.description,
        email: `mailto:${CONTACT.email}`,
        telephone: CONTACT.phone.replace(/\s/g, ""),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gdańsk",
          addressRegion: "pomorskie",
          addressCountry: "PL",
        },
        sameAs: [CONTACT.github, CONTACT.linkedin],
        knowsAbout: splitSkills(t.skills),
        knowsLanguage: ["pl", "en", "de"],
        alumniOf: { "@type": "CollegeOrUniversity", name: "WSB University in Poznań" },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site}/#service`,
        name: `${CONTACT.name} – ${t.tagline}`,
        url: `${site}/`,
        description: t.meta.description,
        image: site + OG_IMAGE.path,
        founder: { "@id": person },
        email: CONTACT.email,
        telephone: CONTACT.phone.replace(/\s/g, ""),
        address: { "@type": "PostalAddress", addressLocality: "Gdańsk", addressCountry: "PL" },
        areaServed: [
          { "@type": "City", name: "Gdańsk" },
          { "@type": "City", name: "Gdynia" },
          { "@type": "City", name: "Sopot" },
          { "@type": "Country", name: "Poland" },
        ],
        knowsLanguage: ["pl", "en"],
        sameAs: [CONTACT.github, CONTACT.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: `${site}/`,
        name: CONTACT.name,
        inLanguage: [...LANGS],
        publisher: { "@id": person },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${site}/#website` },
        mainEntity: { "@id": person },
        about: { "@id": `${site}/#service` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#portfolio`,
        name: t.portfolio.heading,
        itemListElement: t.projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            description: p.desc,
            url: p.link,
            keywords: p.tags.join(", "),
            creator: { "@id": person },
          },
        })),
      },
    ],
  };
}

/** tagi do <head> danej wersji językowej */
export function buildHead(lang: Lang, site: string) {
  const t = CONTENT[lang];
  const url = pageUrl(site, lang);
  const image = site + OG_IMAGE.path;
  const others = LANGS.filter((l) => l !== lang);
  // JSON w <script> — "<" zamieniony, żeby tekst nie mógł zamknąć znacznika
  const jsonLd = JSON.stringify(buildJsonLd(lang, site)).replace(/</g, "\\u003c");

  return [
    `<title>${esc(t.meta.title)}</title>`,
    `<meta name="description" content="${esc(t.meta.description)}" />`,
    `<meta name="author" content="${esc(CONTACT.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta name="theme-color" content="#05172f" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${pageUrl(site, l)}" />`),
    // dla pozostałych języków świata — wersja angielska
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(site, "en")}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${esc(CONTACT.name)}" />`,
    `<meta property="og:title" content="${esc(t.meta.title)}" />`,
    `<meta property="og:description" content="${esc(t.meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${t.meta.ogLocale}" />`,
    ...others.map((l) => `<meta property="og:locale:alternate" content="${CONTENT[l].meta.ogLocale}" />`),
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${esc(`${CONTACT.name} – ${t.tagline}`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(t.meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(t.meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join("\n    ");
}

export function buildSitemap(site: string, lastmod: string) {
  const alternates = [
    ...LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${xmlEsc(pageUrl(site, l))}" />`),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${xmlEsc(pageUrl(site, "en"))}" />`,
  ].join("\n    ");

  const urls = LANGS.map(
    (l) => `  <url>
    <loc>${xmlEsc(pageUrl(site, l))}</loc>
    <lastmod>${lastmod}</lastmod>
    ${alternates}
  </url>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

/* Boty wyszukiwarek AI wpuszczone jawnie: OAI-SearchBot / ChatGPT-User (wyszukiwanie w ChatGPT),
   GPTBot (trening OpenAI), PerplexityBot, ClaudeBot / Claude-SearchBot, Google-Extended (Gemini).
   Bot z własną grupą ignoruje grupę "*", więc każda grupa ma swoje Allow. */
const AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export function buildRobots(site: string) {
  return `User-agent: *
Allow: /

${AI_BOTS.map((b) => `User-agent: ${b}`).join("\n")}
Allow: /

Sitemap: ${site}/sitemap.xml
`;
}

/* llms.txt (llmstxt.org) — streszczenie strony w markdownie dla modeli językowych. */
export function buildLlmsTxt(site: string) {
  const pl = CONTENT.pl;
  const en = CONTENT.en;

  const section = (lang: Lang) => {
    const t = CONTENT[lang];
    const projects = t.projects
      .map((p) => `- ${p.link ? `[${p.title}](${p.link})` : p.title} (${p.tags.join(", ")}): ${p.desc}`)
      .join("\n");
    const experience = t.experience.map((e) => `- ${e.period} — ${e.title}, ${e.place}. ${e.desc}`).join("\n");
    const values = t.clientValue.map((v) => `- ${v.title}: ${v.desc}`).join("\n");

    return `## ${lang === "pl" ? "Po polsku" : "In English"} (${pageUrl(site, lang)})

${t.about.bio}

### ${t.resume.clientTitle}
${values}

### ${t.resume.skillsTitle.replace(/…$/, "")}
${t.skills.map((s) => `- ${s}`).join("\n")}

### ${t.portfolio.heading}
${projects}

### ${t.resume.experienceTitle}
${experience}`;
  };

  return `# ${CONTACT.name} – ${en.tagline}

> ${en.meta.description}
> ${pl.meta.description}

- ${pl.location} / ${en.location}
- E-mail: ${CONTACT.email}
- ${pl.sections.find((s) => s.id === "contact")?.label} / Phone: ${CONTACT.phone}
- GitHub: ${CONTACT.github}
- LinkedIn: ${CONTACT.linkedin}

${section("pl")}

${section("en")}
`;
}
