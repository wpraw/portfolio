// Podsumowanie wejść z Workers Analytics Engine (dataset zapisywany przez worker/index.ts).
//   npm run stats          → ostatnie 7 dni
//   npm run stats -- 30    → ostatnie 30 dni
// Wymaga w .env:
//   CLOUDFLARE_ACCOUNT_ID=...
//   CLOUDFLARE_API_TOKEN=...   (token z uprawnieniem Account → Account Analytics → Read)

try {
  process.loadEnvFile(".env");
} catch {
  // brak pliku — zostają zmienne środowiskowe
}

const { CLOUDFLARE_ACCOUNT_ID: account, CLOUDFLARE_API_TOKEN: token } = process.env;
if (!account || !token) {
  console.error("Brak CLOUDFLARE_ACCOUNT_ID lub CLOUDFLARE_API_TOKEN (.env).");
  process.exit(1);
}

const days = Math.max(1, Math.min(90, Number(process.argv[2]) || 7));
const T = "portfolio_visits";
const WHEN = `timestamp > NOW() - INTERVAL '${days}' DAY`;
const PEOPLE = `(blob1 = 'human' OR blob1 = 'suspect')`;
const HITS = "SUM(_sample_interval) AS hits";

const sections = [
  ["Rodzaj ruchu", `SELECT blob1 AS kind, ${HITS} FROM ${T} WHERE ${WHEN} GROUP BY kind ORDER BY hits DESC`],
  [
    "Linki-źródła (/cv, /li, /ref…)",
    `SELECT blob3 AS src, blob1 AS kind, ${HITS} FROM ${T} WHERE ${WHEN} AND blob3 != '' GROUP BY src, kind ORDER BY hits DESC LIMIT 30`,
  ],
  [
    "Ludzie dziennie",
    `SELECT toDate(timestamp) AS day, blob1 AS kind, ${HITS} FROM ${T} WHERE ${WHEN} AND ${PEOPLE} AND double1 = 200 GROUP BY day, kind ORDER BY day, kind`,
  ],
  [
    "Ludzie: strony",
    `SELECT blob2 AS path, blob1 AS kind, ${HITS} FROM ${T} WHERE ${WHEN} AND ${PEOPLE} AND double1 = 200 GROUP BY path, kind ORDER BY hits DESC LIMIT 15`,
  ],
  [
    "Ludzie: skąd (sieć / miasto)",
    `SELECT blob6 AS network, blob5 AS city, blob4 AS country, blob1 AS kind, ${HITS} FROM ${T} WHERE ${WHEN} AND ${PEOPLE} GROUP BY network, city, country, kind ORDER BY hits DESC LIMIT 25`,
  ],
  [
    "Ludzie: referrer",
    `SELECT blob7 AS referer, ${HITS} FROM ${T} WHERE ${WHEN} AND ${PEOPLE} AND blob7 != '' AND blob7 != 'wpraw.dev' GROUP BY referer ORDER BY hits DESC LIMIT 15`,
  ],
  [
    "Boty (AI, wyszukiwarki, podglądy, inne)",
    `SELECT blob1 AS kind, substring(blob8, 1, 90) AS ua, ${HITS} FROM ${T} WHERE ${WHEN} AND (blob1 = 'ai' OR blob1 = 'search' OR blob1 = 'preview' OR blob1 = 'bot') GROUP BY kind, ua ORDER BY hits DESC LIMIT 20`,
  ],
  [
    "Skanery: najczęstsze ścieżki",
    `SELECT blob2 AS path, ${HITS} FROM ${T} WHERE ${WHEN} AND blob1 = 'scanner' GROUP BY path ORDER BY hits DESC LIMIT 10`,
  ],
];

async function query(sql) {
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/analytics_engine/sql`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: `${sql} FORMAT JSON`,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status}: ${text}`);
  return JSON.parse(text).data;
}

console.log(`\nwpraw.dev — ostatnie ${days} dni\n`);
for (const [title, sql] of sections) {
  console.log(`── ${title}`);
  try {
    const rows = await query(sql);
    if (rows.length) console.table(rows.map((r) => ({ ...r, hits: Number(r.hits) })));
    else console.log("(brak danych)\n");
  } catch (err) {
    console.error(`błąd: ${err.message}\n`);
  }
}
