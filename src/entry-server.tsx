import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import type { Lang } from "./data";
import { LanguageProvider } from "./LanguageProvider";

/* Wejście buildu SSR — używane tylko przez scripts/prerender.mjs, który zapisuje
   gotowy HTML każdej wersji językowej do dist/. Dzięki temu treść widzą też boty,
   które nie uruchamiają JavaScriptu (ChatGPT, Perplexity, Claude). */

export { LANGS, pathFor } from "./i18n";
export { buildHead, buildLlmsTxt, buildRobots, buildSitemap } from "./seo";
export { DEFAULT_SITE_URL } from "./site";

export function render(lang: Lang) {
  return renderToString(
    <StrictMode>
      <LanguageProvider initialLang={lang}>
        <App />
      </LanguageProvider>
    </StrictMode>
  );
}
