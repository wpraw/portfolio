import { useMemo } from "react";

/* Generowana "tekstura kodu" — zamiennik screenshota z makiety.
   Deterministyczny pseudo-kod, rozmyty i przygaszony, czysto dekoracyjny. */

const KEYWORDS = ["const", "let", "if", "return", "async", "await", "for", "import", "export"];
const IDENTS = ["tempString", "dataCal", "flagCheck", "typeOfId", "myEvent", "parseLine", "buffer", "payload", "offset", "renderQueue"];
const OPS = ["===", "=>", "!==", "+=", "&&", "||"];
const VALS = ["'ASCII_STRING'", "0x14f", "true", "null", "[]", "{}", "'utf-8'", "1024", "i + 1"];

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildLines(count, seed) {
  const rnd = mulberry32(seed);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  return Array.from({ length: count }, (_, i) => {
    const indent = "  ".repeat(Math.floor(rnd() * 4));
    const roll = rnd();
    if (roll < 0.2) return `${indent}${pick(KEYWORDS)} ${pick(IDENTS)} = ${pick(VALS)};`;
    if (roll < 0.4) return `${indent}if (${pick(IDENTS)} ${pick(OPS)} ${pick(VALS)}) {`;
    if (roll < 0.55) return `${indent}${pick(IDENTS)}.replace(${pick(VALS)}, ${pick(IDENTS)});`;
    if (roll < 0.7) return `${indent}return ${pick(IDENTS)} ${pick(OPS)} ${pick(VALS)};`;
    if (roll < 0.85) return `${indent}${pick(IDENTS)} = ${pick(IDENTS)}.map((v, i) => v ${pick(OPS)} ${pick(VALS)});`;
    if (roll > 0.85) return `\n`;
    return `${indent}} // ${pick(IDENTS)}:${i}`;
  });
}

export default function CodeBackdrop({ lines = 42, seed = 7, className = "" }) {
  const code = useMemo(() => buildLines(lines, seed), [lines, seed]);
  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      <pre className="font-code text-[13px] leading-relaxed blur-[2px] opacity-90 select-none [text-shadow:0_0_16px_#2a52c9]">
        {code.map((l, i) => (
          <div key={i}>
            <span className="mr-4 opacity-40">{String(i + 10).padStart(3, "0")}</span>
            <span className="text-[#7ea1e8]">{l}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
