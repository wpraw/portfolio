import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./LanguageProvider";
import { langFromPath, pathFor, readSavedLang } from "./i18n";

const lang = langFromPath(window.location.pathname);
const saved = readSavedLang();

if (saved && saved !== lang) {
  // gość wcześniej wybrał inny język — od razu na jego wersję
  window.location.replace(pathFor(saved) + window.location.hash);
} else {
  const container = document.getElementById("root")!;
  const app = (
    <StrictMode>
      <LanguageProvider initialLang={lang}>
        <App />
      </LanguageProvider>
    </StrictMode>
  );

  // build: HTML jest już wyrenderowany (prerender) — React go tylko ożywia;
  // dev: kontener jest pusty, więc zwykły render
  if (container.firstElementChild) hydrateRoot(container, app);
  else createRoot(container).render(app);
}
