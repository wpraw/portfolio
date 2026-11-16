import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./LanguageProvider";
import { langFromPath, pathFor, readSavedLang } from "./i18n";

const lang = langFromPath(window.location.pathname);
const saved = readSavedLang();

if (saved && saved !== lang) {
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

  if (container.firstElementChild) hydrateRoot(container, app);
  else createRoot(container).render(app);
}
