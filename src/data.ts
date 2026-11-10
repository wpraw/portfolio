import photo from "./assets/photo.jpg";
import gpwLogo from "./assets/logos/gpw.svg";
import xkomLogo from "./assets/logos/x-kom.svg";
import brokulLogo from "./assets/logos/diety-od-brokula.svg";
import link4Logo from "./assets/logos/link4.png";
import pekaoLeasingLogo from "./assets/logos/pekao-leasing.svg";
import pkoLogo from "./assets/logos/pko-ubezpieczenia.svg";
import egisLogo from "./assets/logos/egis.svg";
import compensaLogo from "./assets/logos/compensa.svg";

export type Lang = "pl" | "en";

export interface Client {
  name: string;
  logo: string;
  /** logo dwuwierszowe — dostaje większą wysokość */
  tall?: boolean;
}

export interface TitledItem {
  title: string;
  desc: string;
}

export interface Project extends TitledItem {
  tags: string[];
  /** publiczny adres — bez niego nie ma „zobacz więcej” */
  link?: string;
  clients?: Client[];
}

export interface Content {
  meta: {
    title: string;
    /** meta description i opis w danych strukturalnych — ok. 150 znaków */
    description: string;
    /** og:locale, np. pl_PL */
    ogLocale: string;
  };
  role: string;
  /** krótko, czym się zajmuję — w H1 (dla czytników i wyszukiwarek) i w JSON-LD */
  tagline: string;
  location: string;
  sections: { id: string; label: string }[];
  langSwitch: string;
  home: { ctaPortfolio: string; ctaResume: string; ctaContact: string; scroll: string };
  about: {
    heading: string;
    hello: string;
    bio: string;
    facts: { value: string; label: string }[];
    hint: string;
    strap: string;
    approachTitle: string;
    principles: TitledItem[];
    photo: string;
  };
  resume: {
    skillsTitle: string;
    experienceTitle: string;
    teamValueTitle: string;
    clientTitle: string;
    titleBlock: { drawn: string; sheet: string; scale: string; rev: string };
  };
  portfolio: { heading: string; more: string; clients: string };
  /** oferta dla klientów freelance — te same treści trafiają do JSON-LD (usługi, FAQPage) i llms.txt */
  services: {
    heading: string;
    intro: string;
    cta: string;
    offerTitle: string;
    items: TitledItem[];
    processTitle: string;
    process: TitledItem[];
    faqTitle: string;
    faq: { q: string; a: string }[];
  };
  contact: { headline: string; sub: string };
  skills: string[];
  languages: { name: string; level: string; pct: number }[];
  experience: { period: string; title: string; place: string; desc: string }[];
  teamValue: TitledItem[];
  clientValue: TitledItem[];
  projects: Project[];
}

export const CONTACT = {
  name: "Wojciech Prawdzik",
  email: "w.prawdzik@onet.pl",
  phone: "+48 881 465 502",
  github: "https://github.com/wpraw",
  linkedin: "https://www.linkedin.com/in/wojciech-prawdzik-46754625a/",
};

/*  Najlepiej pionowe, min. 1024 × 1160 px (dół karty zasłania pasek z imieniem). */
export const PHOTO = photo;

/*  Loga klientów w oryginalnych kolorach — na stronie wybielane filtrem CSS
    (Link4 przerobione ręcznie na białe z wyciętymi literami, bo litery były białe).
    Źródła: GPW — Wikimedia Commons, x-kom / Diety od Brokuła / Link4 — ich strony. */
const FORM_CLIENTS: Client[] = [
  { name: "GPW", logo: gpwLogo },
  { name: "x-kom", logo: xkomLogo },
  { name: "Diety od Brokuła", logo: brokulLogo, tall: true },
  { name: "Link4", logo: link4Logo },
];

/*  Źródła: strony firm (Pekao Leasing, PKO Ubezpieczenia, Egis Pharmaceuticals, Compensa).
    Egis przycięty do znaku + nazwy, bez sloganu. */
const INTRANET_CLIENTS: Client[] = [
  { name: "Pekao Leasing", logo: pekaoLeasingLogo },
  { name: "PKO TU", logo: pkoLogo, tall: true },
  { name: "Link4", logo: link4Logo },
  { name: "Egis", logo: egisLogo, tall: true },
  { name: "Compensa", logo: compensaLogo, tall: true },
];

export const MARQUEE = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "Drizzle ORM",
  "Postgres",
  "Tailwind",
  "Nx",
  "Tauri",
  "Git",
  "Vite",
];

export const CONTENT: Record<Lang, Content> = {
  pl: {
    meta: {
      title: "Wojciech Prawdzik – programista stron i aplikacji webowych, Gdańsk",
      description:
        "Programista z Gdańska: szybkie strony firmowe, sklepy i aplikacje webowe w Next.js i React, przygotowane pod SEO. Trójmiasto i zdalnie w całej Polsce.",
      ogLocale: "pl_PL",
    },
    role: "INŻYNIER OPROGRAMOWANIA",
    tagline: "programista stron i aplikacji webowych (Next.js, React), Gdańsk",
    location: "Gdańsk, Polska",
    sections: [
      { id: "home", label: "Start" },
      { id: "about", label: "O mnie" },
      { id: "resume", label: "Życiorys" },
      { id: "portfolio", label: "Portfolio" },
      { id: "services", label: "Usługi" },
      { id: "contact", label: "Kontakt" },
    ],
    langSwitch: "Zmień język",

    home: {
      ctaPortfolio: "Portfolio",
      ctaResume: "Życiorys",
      ctaContact: "Kontakt",
      scroll: "scroll",
    },
    about: {
      heading: "O mnie",
      hello: "Cześć, jestem",
      bio: "Programista z 4-letnim doświadczeniem w React i Next.js, a przy aplikacji Lexody także fullstack (NestJS, Drizzle). Łączę programowanie z organizacją pracy zespołu: podejmuję decyzje architektoniczne, prowadzę code review i współpracuję bezpośrednio z klientami. Dopadła mnie psychoza AI więc coraz więcej czasu poświęcam też AI engineeringowi.",
      facts: [
        { value: "4", label: "lata w kodzie" },
        { value: "Gdańsk", label: "baza" },
        { value: "PL · EN", label: "języki" },
        { value: "0", label: "Fuckupów na prodzie" },
      ],
      hint: "złap mnie i rzuć",
      strap: "<HELLO WORLD />",
      approachTitle: "Jak pracuję",
      principles: [
        {
          title: "Architektura i jakość",
          desc: "Podejmuję decyzje architektoniczne na froncie i prowadzę code review, żeby aplikacje dało się łatwo rozwijać i utrzymywać.",
        },
        {
          title: "Blisko klienta",
          desc: "Biorę odpowiedzialność za produkt. Sam zbieram wymagania i rozmawiam z klientami, więc wiem, po co powstaje każda funkcja - od pierwszej rozmowy po wdrożenie.",
        },
        {
          title: "Zespół",
          desc: "Jako zastępca kierownika planuję pracę, deleguję zadania i wspieram innych mentoringiem w zespole 4–8 osób.",
        },
        {
          title: "Efekty",
          desc: "Dbam o klienta i dowoże coś co realnie działa i ma wartość.",
        },
      ],
      photo: "TWOJE ZDJĘCIE",
    },
    resume: {
      skillsTitle: "Umiem to…",
      experienceTitle: "Doświadczenie i edukacja",
      teamValueTitle: "Co wnoszę do zespołu",
      clientTitle: "Co wnoszę dla klienta",
      titleBlock: { drawn: "Rys.", sheet: "Ark.", scale: "Skala", rev: "Rew." },
    },
    portfolio: {
      heading: "Rzeczy, które zbudowałem",
      more: "zobacz więcej",
      clients: "Klienci",
    },
    services: {
      heading: "Jak mogę Ci pomóc",
      intro:
        "Przyjmuję zlecenia freelance: tworzę strony internetowe, sklepy i aplikacje webowe dla firm, gabinetów i startupów z Gdańska, Gdyni, Sopotu i całej Polski (zdalnie). Prowadzę projekt od pierwszej rozmowy, przez realizację, po wdrożenie i opiekę.",
      cta: "Zapytaj o wycenę",
      offerTitle: "Co mogę dla Ciebie zrobić",
      items: [
        {
          title: "Strony firmowe i wizytówki",
          desc: "Szybka, nowoczesna strona dla firmy, gabinetu lub usługodawcy w Next.js. Responsywna, łatwa w edycji i gotowa pod Google od pierwszego dnia.",
        },
        {
          title: "Sklepy internetowe",
          desc: "Sklepy i katalogi produktów, także headless z CMS: koszyk, płatności, logowanie klientów i szybkie ładowanie zdjęć.",
        },
        {
          title: "Aplikacje webowe i panele",
          desc: "Systemy rezerwacji, panele klienta, portale i narzędzia wewnętrzne. Frontend i backend (Next.js, NestJS, Postgres), także w wersji na Androida i iOS.",
        },
        {
          title: "SEO techniczne i wydajność",
          desc: "Metadane, dane strukturalne, sitemapa i Core Web Vitals. Poprawiam też istniejące strony, które są wolne albo niewidoczne w Google i w ChatGPT.",
        },
        {
          title: "Integracje AI",
          desc: "Chatboty odpowiadające na podstawie wiedzy firmy (RAG), automatyzacja powtarzalnych procesów i asystenci AI wpięci w stronę lub system.",
        },
        {
          title: "Opieka i rozwój",
          desc: "Przejmuję istniejące projekty w React i Next.js: naprawiam błędy, dodaję funkcje i dbam o aktualizacje.",
        },
      ],
      processTitle: "Jak wygląda współpraca",
      process: [
        { title: "Rozmowa", desc: "Bezpłatnie omawiamy cel, odbiorców i budżet." },
        { title: "Wycena", desc: "Zakres, termin i stała cena na piśmie." },
        { title: "Realizacja", desc: "Pracuję etapami, postępy widzisz na bieżąco na wersji testowej." },
        { title: "Wdrożenie", desc: "Publikacja, domena, analityka i zgłoszenie strony do Google." },
        { title: "Opieka", desc: "Poprawki, rozwój i wsparcie po starcie." },
      ],
      faqTitle: "Najczęstsze pytania",
      // TODO: kwoty i terminy to propozycja — sprawdź, zanim strona trafi do sieci
      faq: [
        {
          q: "Ile kosztuje strona internetowa?",
          a: "Prosta strona firmowa to zwykle od 3 000 zł, rozbudowany serwis lub sklep od 8 000 zł. Po krótkiej rozmowie dostajesz stałą wycenę, bez ukrytych kosztów.",
        },
        {
          q: "Ile trwa zrobienie strony?",
          a: "Strona firmowa zwykle 2–4 tygodnie, sklep lub aplikacja od 6 tygodni, zależnie od zakresu. Termin ustalamy przed startem prac.",
        },
        {
          q: "Czy zajmiesz się domeną, hostingiem i wdrożeniem?",
          a: "Tak. Pomagam wybrać domenę i hosting (np. Vercel, Netlify), wdrażam stronę, podpinam analitykę i Google Search Console.",
        },
        {
          q: "Czy strona będzie widoczna w Google i w ChatGPT?",
          a: "Każdą stronę przygotowuję pod SEO: szybkie ładowanie, metadane, dane strukturalne (JSON-LD) i sitemapa. Treść jest w HTML, więc czytają ją też wyszukiwarki AI, takie jak ChatGPT czy Perplexity.",
        },
        {
          q: "Czy będę mógł sam edytować treści?",
          a: "Tak, jeśli tego potrzebujesz. Podpinam wygodny panel (headless CMS), w którym zmienisz teksty i zdjęcia bez programisty.",
        },
        {
          q: "Czy pracujesz zdalnie?",
          a: "Tak. Mieszkam w Gdańsku i chętnie spotkam się w Trójmieście, a z klientami z reszty Polski i z zagranicy pracuję zdalnie, po polsku lub angielsku.",
        },
        {
          q: "Czy przejmiesz istniejącą stronę lub aplikację?",
          a: "Tak. Robię przegląd kodu, naprawiam błędy i rozwijam projekty w React, Next.js i Node.js. Mogę też przenieść starą stronę na szybszy Next.js.",
        },
      ],
    },
    contact: {
      headline: "Masz pomysł na projekt?",
      sub: "Pogadajmy.",
    },

    skills: [
      "TypeScript / JavaScript",
      "React / Next.js",
      "Redux Toolkit / TanStack Query",
      "Tailwind / Styled Components / CSS Modules",
      "Node.js / NestJS / Express",
      "Drizzle ORM / Postgres / MsSql",
      "AI engineering, RAG, MCP, context management, workflow design",
      "Tauri (WebView)",
      "Nx / Git / GitLab CI/CD",
      "Microsoft 365 / SharePoint / SPFx",
    ],
    languages: [
      { name: "Polski", level: "ojczysty", pct: 100 },
      { name: "Angielski", level: "C1", pct: 85 },
      { name: "Niemiecki", level: "A2", pct: 45 },
    ],
    experience: [
      {
        period: "2022 - teraz",
        title: "Software Developer",
        place: "Nexpertis Sp. z o.o., Gdańsk",
        desc: "Rozpocząłem jako programista frontendowy, teraz fullstack przy Lexody (Next.js, NestJS, Drizzle, Nx, Tauri), aplikacje dla klientów, code review i mentoring, zastępca kierownika zespołu.",
      },
      {
        period: "2026",
        title: "AI_devs 4 Builders",
        place: "Certyfikat AI_devs",
        desc: "Context engineering, projektowanie agentów AI i workflowów, wdrażanie aplikacji generatywnych.",
      },
      {
        period: "2019 - 2023",
        title: "Informatyka, inżynier",
        place: "Wyższa Szkoła Bankowa w Poznaniu",
        desc: "Specjalizacja: programowanie. Praca dyplomowa: portal społecznościowy z modułem kursów (React, Redux, .NET C#).",
      },
      {
        period: "2015 - 2022",
        title: "Kierownik",
        place: "Mobilna kawiarnia",
        desc: "Zarządzanie, szkolenie pracowników i prowadzenie sprzedaży.",
      },
    ],
    teamValue: [
      {title:"Kontakt z klientem", desc:"od zbierania wymagań, przez realizację, po rozmowy sprzedażowe."}, 
      {title:"Samodzielność", desc:"prowadzę funkcję od pomysłu do produkcji, po stronie frontendu i backendu."}, 
      {title:"Organizacja pracy", desc:"planning, delegowanie zadań i reagowanie w nagłych sytuacjach."}, 
      {title:"Mentoring i dzielenie się wiedzą", desc:"standardy pracy i code review w zespole."},
    ],
    clientValue: [
      {title:"Zrozumienie potrzeb", desc:"zanim napiszę kod, dopytuję o cel biznesowy i użytkowników."}, 
      {title:"Przewidywalność", desc:"jasno komunikuję postępy, terminy i ryzyka."}, 
      {title:"Działający produkt", desc:"dowożę funkcje gotowe do wdrożenia i łatwe w dalszym rozwoju."}, 
      {title:"Doradztwo technologiczne", desc:"pomagam dobrać rozwiązanie do budżetu i skali, także z AI."},
    ],
    projects: [
      {
        title: "Lexody",
        link: "https://lexody.pl",
        tags: ["Next.js", "NestJS", "Drizzle", "Postgres", "Nx", "Tauri"],
        desc: "Rozwijam fullstackowo aplikację dla prawników do obsługi zleceń. Użytkownik znajduje w niej zastępstwo procesowe albo podejmuje zlecenie z listy ogłoszeń. Pracowałem też nad modułem dla osób spoza branży, które w kilka kliknięć dobierają prawnika do konsultacji lub poprowadzenia sprawy. Aplikacja działa także na Androidzie i iOS.",
      },
      {
        title: "Colway",
        link: "https://sklep.colway.pl",
        tags: ["Next.js", "Redux", "Styled Components"],
        desc: "Tworzyłem aplikację dla użytkowników z branży marketingu wielopoziomowego: sklep internetowy, zarządzanie wielopoziomową strukturą sprzedaży i złożoną logikę biznesową. Wdrożyłem headless CMS, autoryzację i uwierzytelnianie z zarządzaniem sesją, a komunikację z zewnętrznym REST API oparłem na architekturze BFF. Zoptymalizowałem też renderowanie sklepu ze zdjęciami i miniaturami produktów.",
      },
      {
        title: "Formularze dla klientów",
        tags: ["React", "TypeScript"],
        desc: "Tworzyłem formularze i narzędzia biznesowe dla organizacji takich jak GPW, x-kom, Diety od Brokuła i Link4. Budowałem wielokrokowe procesy z rozbudowaną walidacją biznesową wprowadzanych danych i dbałem o to, żeby działały wydajnie i dały się skalować.",
        clients: FORM_CLIENTS,
      },
      {
        title: "Intranety SharePoint",
        tags: ["SharePoint", "SPFx", "Power Automate", "Azure", "Microsoft 365"],
        desc: "Projektowałem i budowałem intranety oraz rozwiązania szyte na miarę w SharePoint Server i SharePoint Online. Analizowałem strukturę i wymagania firm, wdrażałem i konfigurowałem SharePoint, a procesy automatyzowałem w Power Automate. Prototypowałem też witryny pod kątem UI/UX.",
        clients: INTRANET_CLIENTS,
      },
      {
        title: "Oddech Nieba",
        link: "https://oddechnieba.pl",
        tags: ["Next.js", "TypeScript", "Tailwind", "GSAP", "Framer Motion", "Vercel"],
        desc: "Zbudowałem serwis gabinetu Oddech Nieba ze Słupska - o bezdechu sennym, wodoroterapii i terapiach, które gabinet oferuje. Przygotowałem bazę wiedzy, opisy metod leczenia i wielokrokowy test ryzyka bezdechu z punktacją. Strona jest w pełni statyczna (SSG) i dopracowana pod polskie SEO: metadane, dane strukturalne JSON-LD i sitemapa. Animacje zrobiłem w GSAP i Framer Motion, a całość wdrożyłem na Vercel.",
      },
    ],
  },

  en: {
    meta: {
      title: "Wojciech Prawdzik – Freelance Web Developer (Next.js, React), Gdańsk",
      description:
        "Web developer from Gdańsk, Poland: fast business websites, online stores and web apps built with Next.js and React, ready for SEO. Working remotely worldwide.",
      ogLocale: "en_GB",
    },
    role: "SOFTWARE ENGINEER",
    tagline: "freelance web developer (Next.js, React) based in Gdańsk, Poland",
    location: "Gdańsk, Poland",
    sections: [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "resume", label: "Resume" },
      { id: "portfolio", label: "Portfolio" },
      { id: "services", label: "Services" },
      { id: "contact", label: "Contact" },
    ],
    langSwitch: "Change language",

    home: {
      ctaPortfolio: "Portfolio",
      ctaResume: "Resume",
      ctaContact: "Contact",
      scroll: "scroll",
    },
    about: {
      heading: "About",
      hello: "Hi, I'm",
      bio: "Software developer with 4 years of experience in React and Next.js, also working fullstack on the Lexody application (NestJS, Drizzle). I combine hands-on development with team coordination: I make architecture decisions, run code reviews and work directly with clients. I got AI psychosis lately so I'm spending more and more time on AI engineering.",
      facts: [
        { value: "4", label: "years in code" },
        { value: "Gdańsk", label: "based in" },
        { value: "PL · EN", label: "languages" },
        { value: "0", label: "Fuckups on prod" },
      ],
      hint: "grab me & throw",
      strap: "<HELLO WORLD />",
      approachTitle: "How I work",
      principles: [
        {
          title: "Architecture & quality",
          desc: "I make frontend architecture decisions and run code reviews, so applications stay easy to extend and maintain.",
        },
        {
          title: "Close to the client",
          desc: "I gather requirements and talk to clients myself, so I know why every feature exists - from the first call to release.",
        },
        {
          title: "Team",
          desc: "As Deputy Team Lead I plan work, delegate tasks and mentor others in a team of 4–8 people.",
        },
        {
          title: "Results",
          desc: "I take responsibility for the product. I gather requirements and talk to clients myself, so I know why every feature exists - from the first call to release.",
        },
      ],
      photo: "YOUR PHOTO",
    },
    resume: {
      skillsTitle: "Things I'm good at…",
      experienceTitle: "Experience & education",
      teamValueTitle: "What I bring to a team",
      clientTitle: "What I bring to a client",
      titleBlock: { drawn: "Drawn", sheet: "Sheet", scale: "Scale", rev: "Rev." },
    },
    portfolio: {
      heading: "Things I've built",
      more: "see more",
      clients: "Clients",
    },
    services: {
      heading: "How I can help",
      intro:
        "I take on freelance projects: websites, online stores and web apps for businesses, clinics and startups in Gdańsk, the Tri-City area and remotely across Poland and Europe. I lead the project from the first call through development to launch and maintenance.",
      cta: "Ask for a quote",
      offerTitle: "What I can build for you",
      items: [
        {
          title: "Business websites",
          desc: "A fast, modern website for your company, clinic or service built with Next.js. Responsive, easy to edit and ready for Google from day one.",
        },
        {
          title: "Online stores",
          desc: "Stores and product catalogs, including headless commerce with a CMS: cart, payments, customer accounts and fast-loading images.",
        },
        {
          title: "Web apps & dashboards",
          desc: "Booking systems, client portals, dashboards and internal tools. Frontend and backend (Next.js, NestJS, Postgres), with Android and iOS versions if needed.",
        },
        {
          title: "Technical SEO & performance",
          desc: "Metadata, structured data, sitemaps and Core Web Vitals. I also fix existing sites that are slow or invisible in Google and ChatGPT.",
        },
        {
          title: "AI integrations",
          desc: "Chatbots that answer from your company's knowledge (RAG), automation of repetitive processes and AI assistants built into your site or system.",
        },
        {
          title: "Maintenance & development",
          desc: "I take over existing React and Next.js projects: fix bugs, add features and keep everything up to date.",
        },
      ],
      processTitle: "How we'll work together",
      process: [
        { title: "Call", desc: "A free chat about your goals, audience and budget." },
        { title: "Quote", desc: "Scope, deadline and a fixed price in writing." },
        { title: "Build", desc: "I work in stages and you follow progress on a staging version." },
        { title: "Launch", desc: "Deployment, domain, analytics and submitting the site to Google." },
        { title: "Support", desc: "Fixes, new features and help after launch." },
      ],
      faqTitle: "Frequently asked questions",
      // TODO: kwoty i terminy to propozycja — sprawdź, zanim strona trafi do sieci
      faq: [
        {
          q: "How much does a website cost?",
          a: "A simple business website usually starts at PLN 3,000 (about €700), a larger site or online store at PLN 8,000 (about €1,900). After a short call you get a fixed quote with no hidden costs.",
        },
        {
          q: "How long does it take to build a website?",
          a: "A business website usually takes 2–4 weeks, a store or web app 6 weeks or more depending on scope. We agree on the deadline before work starts.",
        },
        {
          q: "Can you handle the domain, hosting and deployment?",
          a: "Yes. I help you choose a domain and hosting (e.g. Vercel, Netlify), deploy the site and set up analytics and Google Search Console.",
        },
        {
          q: "Will my site show up in Google and ChatGPT?",
          a: "Every site I build is ready for SEO: fast loading, metadata, structured data (JSON-LD) and a sitemap. The content is in plain HTML, so AI search engines like ChatGPT and Perplexity can read it too.",
        },
        {
          q: "Will I be able to edit the content myself?",
          a: "Yes, if you need to. I connect an easy-to-use admin panel (headless CMS) where you can change text and images without a developer.",
        },
        {
          q: "Do you work remotely?",
          a: "Yes. I'm based in Gdańsk and happy to meet in the Tri-City area, and I work remotely with clients from the rest of Poland and abroad, in English or Polish.",
        },
        {
          q: "Can you take over an existing website or app?",
          a: "Yes. I review the code, fix bugs and develop projects built with React, Next.js and Node.js. I can also migrate an old site to a faster Next.js stack.",
        },
      ],
    },
    contact: {
      headline: "Got a project in mind?",
      sub: "Let's talk.",
    },

    skills: [
      "TypeScript / JavaScript",
      "React / Next.js",
      "Redux Toolkit / TanStack Query",
      "Tailwind / Styled Components / SCSS",
      "Node.js / NestJS / Express",
      "Drizzle ORM / Postgres / MsSql",
      "AI engineering, RAG, MCP, context management, workflow design",
      "Tauri (WebView)",
      "Nx / Git / GitLab CI/CD",
      "Microsoft 365 / SharePoint / SPFx",
    ],
    languages: [
      { name: "Polish", level: "native", pct: 100 },
      { name: "English", level: "C1", pct: 85 },
      { name: "German", level: "A2", pct: 45 },
    ],
    experience: [
      {
        period: "2022 - present",
        title: "Software Developer",
        place: "Nexpertis Sp. z o.o., Gdańsk",
        desc: "Started with Frontend stack, now fullstack on Lexody (Next.js, NestJS, Drizzle, Nx, Tauri), client applications, code reviews and mentoring, Deputy Team Lead.",
      },
      {
        period: "2026",
        title: "AI_devs 4 Builders",
        place: "AI_devs certificate",
        desc: "Context engineering, AI agent and workflow design, deploying generative applications.",
      },
      {
        period: "2019 - 2023",
        title: "BEng in Computer Science",
        place: "WSB University in Poznań",
        desc: "Specialization: programming. Thesis: social platform with a course module (React, Redux, .NET C#).",
      },
      {
        period: "2015 - 2022",
        title: "Manager",
        place: "Mobile coffee shop",
        desc: "Daily operations, employee training and sales.",
      },
    ],
    teamValue: [
      {title:"Client communication", desc:"from gathering requirements through delivery to sales conversations."}, 
      {title:"Ownership", desc:"I take a feature from idea to production, across frontend and backend."}, 
      {title:"Work organization", desc:"planning, task delegation and handling urgent situations."}, 
      {title:"Mentoring and knowledge sharing", desc:"engineering standards and code reviews in the team."},
    ],
    clientValue: [
      {title:"Understanding your needs", desc:"before I write code, I ask about business goals and users."}, 
      {title:"Predictability", desc:"clear updates on progress, deadlines and risks."}, 
      {title:"A working product", desc:"features ready for release and easy to build on."}, 
      {title:"Technology advice", desc:"I help pick a solution that fits your budget and scale, AI included."}],
    projects: [
      {
        title: "Lexody",
        link: "https://lexody.pl",
        tags: ["Next.js", "NestJS", "Drizzle", "Postgres", "Nx", "Tauri"],
        desc: "I develop a fullstack app for lawyers to manage legal assignments. Users find a substitute lawyer for a hearing or take on an assignment from a list of postings. I also worked on a module for non-lawyers, who can match with a lawyer for a consultation or a case in just a few clicks. The app also runs on Android and iOS.",
      },
      {
        title: "Colway",
        link: "https://sklep.colway.pl",
        tags: ["Next.js", "Redux", "Styled Components"],
        desc: "I developed an app for users in the multi-level marketing industry: an online store, management of a multi-level sales structure and complex business logic. I implemented a headless CMS, authentication and authorization with session management, and based communication with an external REST API on a BFF architecture. I also optimized store rendering with product images and thumbnails.",
      },
      {
        title: "Client forms",
        tags: ["React", "TypeScript"],
        desc: "I built forms and business tools for organizations such as the Warsaw Stock Exchange (GPW), x-kom, Diety od Brokuła and Link4. I built multi-step flows with in-depth business validation of the entered data and made sure they performed well and scaled.",
        clients: FORM_CLIENTS,
      },
      {
        title: "SharePoint intranets",
        tags: ["SharePoint", "SPFx", "Power Automate", "Azure", "Microsoft 365"],
        desc: "I designed and built intranets and custom solutions in SharePoint Server and SharePoint Online. I analyzed company structures and requirements, deployed and configured SharePoint, and automated processes with Power Automate. I also prototyped sites with UI/UX in mind.",
        clients: INTRANET_CLIENTS,
      },
      {
        title: "Oddech Nieba",
        link: "https://oddechnieba.pl",
        tags: ["Next.js", "TypeScript", "Tailwind", "GSAP", "Framer Motion", "Vercel"],
        desc: "I built the website of the Oddech Nieba clinic in Słupsk - about sleep apnea, hydrogen therapy and the treatments the clinic offers. I prepared a knowledge base, treatment descriptions and a multi-step sleep apnea risk test with scoring. The site is fully static (SSG) and tuned for Polish SEO: metadata, JSON-LD structured data and a sitemap. I made the animations with GSAP and Framer Motion and deployed it on Vercel.",
      },
    ],
  },
};
