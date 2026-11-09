import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // gsap to pakiet CJS z plikami ESM — w buildzie SSR (prerender) musi przejść przez bundler
  ssr: { noExternal: ["gsap", "@gsap/react"] },
});
