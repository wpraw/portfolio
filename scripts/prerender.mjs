/* Prerender po `vite build`: wstawia wyrenderowany HTML i tagi <head> do każdej
   wersji językowej (dist/index.html = PL, dist/en/index.html = EN) i generuje
   sitemap.xml, robots.txt oraz llms.txt. Wejście SSR (dist-ssr) usuwa po sobie. */

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const ssr = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const { render, buildHead, buildSitemap, buildRobots, buildLlmsTxt, LANGS, pathFor, DEFAULT_SITE_URL } = ssr;

const site = (process.env.SITE_URL || process.env.URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
if (site === DEFAULT_SITE_URL) {
  console.warn(`\n⚠  SITE_URL nie ustawiony — używam ${site}. Wpisz domenę w src/site.ts albo ustaw zmienną SITE_URL.\n`);
}

/** podmiana dokładnie jednego miejsca; funkcja zamiast stringa, żeby "$" w treści nie był wzorcem */
function inject(html, marker, value) {
  if (!html.includes(marker)) throw new Error(`Brak znacznika ${marker} w dist/index.html`);
  return html.replace(marker, () => value);
}

const template = await readFile(path.join(dist, "index.html"), "utf8");

for (const lang of LANGS) {
  let html = template.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  html = inject(html, "<!--app-head-->", buildHead(lang, site));
  html = inject(html, "<!--app-html-->", render(lang));

  const out = path.join(dist, pathFor(lang), "index.html");
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`prerender: ${path.relative(root, out)} (${lang})`);
}

const today = new Date().toISOString().slice(0, 10);
await writeFile(path.join(dist, "sitemap.xml"), buildSitemap(site, today));
await writeFile(path.join(dist, "robots.txt"), buildRobots(site));
await writeFile(path.join(dist, "llms.txt"), buildLlmsTxt(site));
console.log(`prerender: sitemap.xml, robots.txt, llms.txt dla ${site}`);

await rm(ssrDir, { recursive: true, force: true });
