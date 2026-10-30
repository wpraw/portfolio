import { useEffect, useRef } from "react";

/* Tło sekcji: przyciemnienie od lewej do prawej, liczone piksel po pikselu.
   Gradient w CSS/SVG na tak ciemnych kolorach daje pionowe pasy (banding —
   za mało odcieni na szerokość ekranu), a szum nakładany przez przeglądarkę
   bywa wygładzany po zatrzymaniu scrolla. Tu każdy piksel dostaje własny
   dithering (±0.5 odcienia) przed zaokrągleniem, więc pasów nie ma niezależnie
   od tego, jak przeglądarka komponuje warstwy.

   Odpowiada dawnemu: bg-navy + bg-gradient-to-r from-ink/85 via-navy/50 to-navy/15.
   Canvas jest nieprzezroczysty — warstwy nad nim (np. kod) przyciemniaj maską. */

const BASE = "--color-navy";
const STOPS = [
  { at: 0, color: "--color-ink", alpha: 0.85 },
  { at: 0.5, color: "--color-navy", alpha: 0.5 },
  { at: 1, color: "--color-navy", alpha: 0.15 },
];

const hexToRgb = (hex) => {
  const n = parseInt(hex.trim().replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

function draw(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
  const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const css = getComputedStyle(canvas);
  const base = hexToRgb(css.getPropertyValue(BASE));
  const stops = STOPS.map((s) => ({ ...s, rgb: hexToRgb(css.getPropertyValue(s.color)) }));

  // kolor każdej kolumny (0–255, bez zaokrąglania): gradient z alfą nałożony na bazę,
  // interpolacja na wartościach przemnożonych przez alfę — jak w przeglądarce
  const cols = new Float32Array(w * 3);
  for (let x = 0; x < w; x++) {
    const t = w > 1 ? x / (w - 1) : 0;
    let i = 0;
    while (i < stops.length - 2 && t > stops[i + 1].at) i++;
    const a = stops[i];
    const b = stops[i + 1];
    const f = (t - a.at) / (b.at - a.at);
    const alpha = a.alpha + (b.alpha - a.alpha) * f;
    for (let c = 0; c < 3; c++) {
      const premul = a.rgb[c] * a.alpha + (b.rgb[c] * b.alpha - a.rgb[c] * a.alpha) * f;
      cols[x * 3 + c] = premul + base[c] * (1 - alpha);
    }
  }

  // Uint8ClampedArray zaokrągla przy zapisie — losowe ±0.5 przed zaokrągleniem to dithering
  const img = ctx.createImageData(w, h);
  const data = img.data;
  for (let y = 0, p = 0; y < h; y++) {
    for (let x = 0; x < w; x++, p += 4) {
      data[p] = cols[x * 3] + Math.random() - 0.5;
      data[p + 1] = cols[x * 3 + 1] + Math.random() - 0.5;
      data[p + 2] = cols[x * 3 + 2] + Math.random() - 0.5;
      data[p + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

export default function DitheredGradient({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let raf = 0;
    const redraw = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => draw(canvas));
    };
    const observer = new ResizeObserver(redraw);
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none ${className}`} />;
}
