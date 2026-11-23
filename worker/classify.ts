// Klasyfikacja ruchu: kto (lub co) wszedł na stronę.
// Heurystyki — bez Bot Management (Enterprise) nie ma pewności, ale odsiewa większość botów.

export type Kind =
  | "human" // wygląda na człowieka
  | "suspect" // przeglądarkowy UA, ale coś się nie zgadza (stara wersja, serwerownia)
  | "preview" // podgląd linku (LinkedIn, Slack, WhatsApp…)
  | "search" // wyszukiwarki
  | "ai" // crawlery i agenci AI
  | "bot" // inne boty, skrypty, monitoring
  | "scanner"; // szukanie dziur (/.env, wp-config.php…)

export interface Verdict {
  kind: Kind;
  reason: string;
}

const SCANNER_PATH =
  /(\/\.(env|git|aws|ssh|svn|hg|ds_store|vscode|idea|vercel|docker)|wp-|wordpress|xmlrpc|phpmyadmin|\.php|cgi-bin|_profiler|actuator|\.ya?ml$|\.sql|\.bak|\.swp|\.old$|\.ini$|secrets|\.\.;|node_modules|\/vendor\/|\/admin|\/backup|\/debug|\/console|\/server-status|\.aspx?$|\.jsp$)/i;

const AI_UA =
  /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|GoogleOther|CCBot|Bytespider|Amazonbot|Applebot-Extended|meta-externalagent|meta-externalfetcher|cohere-ai|Diffbot|YouBot|DuckAssistBot|MistralAI|AI2Bot|Timpibot|ImagesiftBot|PetalBot/i;

const SEARCH_UA =
  /Googlebot|Google-InspectionTool|bingbot|BingPreview|YandexBot|YandexImages|DuckDuckBot|Baiduspider|Applebot|SeznamBot|Qwantbot|Sogou|Exabot|MojeekBot/i;

const PREVIEW_UA =
  /LinkedInBot|facebookexternalhit|facebookcatalog|Twitterbot|Slackbot|Slack-ImgProxy|Discordbot|WhatsApp|TelegramBot|SkypeUriPreview|Teams|Embedly|redditbot|Pinterest|vkShare|Iframely|Mastodon|Bluesky|Viber|Signal/i;

const BOT_UA =
  /\bbot\b|bot[/;)]|crawl|spider|scan|curl|wget|python|go-http|java\/|okhttp|axios|node-fetch|undici|headless|httpclient|libwww|scrapy|zgrab|masscan|nmap|nuclei|httpx|shodan|censys|xpanse|ahrefs|semrush|mj12|dotbot|uptime|monitor|pingdom|statuscake|lighthouse|pagespeed|gtmetrix|feed|rss|archive\.org|^mozilla\/5\.0$/i;

// Sieci serwerowni — przeglądarkowy UA stąd to prawie zawsze automat.
// Celowo bez Cloudflare/Akamai/Fastly (iCloud Private Relay, WARP).
const DATACENTER_ORG =
  /amazon|aws|google cloud|google llc|microsoft|azure|digitalocean|hetzner|ovh|linode|contabo|alibaba|tencent|huawei cloud|oracle|vultr|choopa|scaleway|leaseweb|m247|datacamp|hostinger|ionos|netcup|kamatera|cdn77|psychz|colocrossing|aeza|stark industries|pfcloud|g-core|gcore|servers\.com|frantech|buyvm|hostroyale|selectel|timeweb|cherry servers|zenlayer|ucloud/i;

// Przybliżona aktualna wersja główna przeglądarki (oba wydają co 4 tygodnie).
const DAY = 86_400_000;
function expectedMajor(base: number, baseDate: string, now: number) {
  return base + Math.floor((now - Date.parse(baseDate)) / (28 * DAY));
}

function outdatedBrowser(ua: string, now: number): string | null {
  const chrome = ua.match(/Chrome\/(\d+)/);
  if (chrome && !/Edg\/|OPR\//.test(ua)) {
    const v = Number(chrome[1]);
    if (v < expectedMajor(131, "2024-11-12", now) - 12) return `old-chrome-${v}`;
  }
  const firefox = ua.match(/Firefox\/(\d+)/);
  if (firefox) {
    // luźniej — Firefox ESR żyje ok. roku
    const v = Number(firefox[1]);
    if (v < expectedMajor(133, "2024-11-26", now) - 20) return `old-firefox-${v}`;
  }
  const safari = ua.match(/Version\/(\d+)[.\d]* (Mobile\/\w+ )?Safari/);
  if (safari && !chrome) {
    const v = Number(safari[1]);
    if (v < 15) return `old-safari-${v}`;
  }
  return null;
}

export function classify(path: string, ua: string, asOrg: string, now = Date.now()): Verdict {
  if (SCANNER_PATH.test(path)) return { kind: "scanner", reason: "path" };
  if (!ua) return { kind: "bot", reason: "no-ua" };
  if (AI_UA.test(ua)) return { kind: "ai", reason: "ua" };
  if (SEARCH_UA.test(ua)) return { kind: "search", reason: "ua" };
  if (PREVIEW_UA.test(ua)) return { kind: "preview", reason: "ua" };
  if (BOT_UA.test(ua) || !/^Mozilla\/5\.0 \(/.test(ua)) return { kind: "bot", reason: "ua" };

  const old = outdatedBrowser(ua, now);
  if (old) return { kind: "suspect", reason: old };
  if (DATACENTER_ORG.test(asOrg)) return { kind: "suspect", reason: "datacenter" };

  return { kind: "human", reason: "" };
}
