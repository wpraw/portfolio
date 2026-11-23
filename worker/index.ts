// Worker przed statycznymi plikami: loguje wejścia (bez IP) i obsługuje linki-źródła.
// Do Workera trafia wszystko poza /assets/*, favicon i og.png (run_worker_first w wrangler.jsonc).

import { classify } from "./classify";

interface Env {
  ASSETS: Fetcher;
  VISITS?: AnalyticsEngineDataset;
}

// Linki śledzące źródło wejścia: /cv, /li, /ref, /ref/<dowolny-tag>.
// 302 (nie 301), żeby przeglądarka nie zapamiętała przekierowania.
const SOURCE_LINK = /^\/(cv|li|ref)(?:\/([\w.-]{1,40}))?\/?$/i;

function sourceTag(path: string): string | null {
  const m = path.match(SOURCE_LINK);
  if (!m) return null;
  const [, base, tag] = m;
  if (tag && base.toLowerCase() !== "ref") return null; // podtagi tylko dla /ref
  return tag ? `${base}/${tag}`.toLowerCase() : base.toLowerCase();
}

function refererHost(request: Request): string {
  const ref = request.headers.get("Referer");
  if (!ref) return "";
  try {
    return new URL(ref).hostname;
  } catch {
    return "invalid";
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const src = sourceTag(url.pathname);

    const response = src
      ? Response.redirect(new URL("/", url).toString(), 302)
      : await env.ASSETS.fetch(request);

    // /en → /en/ itp.: następne żądanie i tak zostanie zalogowane, nie liczymy podwójnie
    if (!src && response.status >= 300 && response.status < 400) return response;

    try {
      const cf = request.cf;
      const ua = request.headers.get("User-Agent") ?? "";
      const asOrg = String(cf?.asOrganization ?? "");
      const { kind, reason } = classify(url.pathname, ua, asOrg);

      const record = {
        kind,
        reason,
        path: url.pathname.slice(0, 200),
        src: src ?? "",
        status: response.status,
        method: request.method,
        country: String(cf?.country ?? ""),
        city: String(cf?.city ?? ""),
        asn: Number(cf?.asn ?? 0),
        asOrg,
        ref: refererHost(request),
        ua: ua.slice(0, 300),
      };

      // Kolejność pól = schemat zapytań w scripts/stats.mjs. Nie przestawiać.
      env.VISITS?.writeDataPoint({
        indexes: [kind],
        blobs: [
          record.kind, // blob1
          record.path, // blob2
          record.src, // blob3
          record.country, // blob4
          record.city, // blob5
          record.asOrg, // blob6
          record.ref, // blob7
          record.ua, // blob8
          record.method, // blob9
          record.reason, // blob10
        ],
        doubles: [record.status, record.asn], // double1, double2
      });

      // Workers Logs (panel → Workers → portfolio → Logs), kilka dni wstecz
      console.log(record);
    } catch (err) {
      console.error("visit log failed", err);
    }

    return response;
  },
} satisfies ExportedHandler<Env>;
