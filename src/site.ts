/* Adres produkcyjny strony — kanoniczne URL-e, hreflang, sitemapa, robots.txt, og:image.
   Prerender bierze go po kolei z: zmiennej SITE_URL, zmiennej URL (Netlify ustawia ją sam
   na główną domenę serwisu), a na końcu z tej stałej. Po kupnie domeny wpisz ją tutaj. */
export const DEFAULT_SITE_URL = "https://twoja-domena.pl";

/** obrazek podglądu linku (1200 × 630) z public/ */
export const OG_IMAGE = { path: "/og.png", width: 1200, height: 630 };
