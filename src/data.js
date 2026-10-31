import photo from "./assets/photo.jpg";

export const CONTACT = {
  name: "Wojciech Prawdzik",
  email: "w.prawdzik@onet.pl",
  phone: "+48 881 465 502",
  github: "https://github.com/wpraw",
  linkedin: "https://www.linkedin.com/in/wojciech-prawdzik-46754625a/",
};

/*  Najlepiej pionowe, min. 1024 × 1160 px (dół karty zasłania pasek z imieniem). */
export const PHOTO = photo;

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

export const CONTENT = {
  pl: {
    meta: { title: "Wojciech Prawdzik - Programista" },
    role: "INŻYNIER OPROGRAMOWANIA",
    location: "Gdańsk, Polska",
    sections: [
      { id: "home", label: "Start" },
      { id: "about", label: "O mnie" },
      { id: "resume", label: "Życiorys" },
      { id: "portfolio", label: "Portfolio" },
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
      hint: "złap mnie i rzuć ↻",
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
      // tabliczka rysunkowa w prawym dolnym rogu (blueprint)
      titleBlock: { drawn: "Rys.", sheet: "Ark.", scale: "Skala", rev: "Rew." },
    },
    portfolio: {
      heading: "Rzeczy, które zbudowałem",
      more: "zobacz więcej →",
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
        tags: ["Next.js", "NestJS", "Drizzle", "Postgres", "Nx", "Tauri"],
        desc: "Aplikacja dla prawników do obsługi zleceń prawniczych.",
      },
      {
        title: "Colway",
        tags: ["Next.js", "Redux", "Styled Components"],
        desc: "Aplikacja dla użytkowników sklepu internetowego i zarządzania wielopoziomową strukturą marketingową - złożona logika biznesowa i integracje API.",
      },
      {
        title: "Formularze dla klientów",
        tags: ["React", "TypeScript"],
        desc: "Formularze i narzędzia biznesowe dla różnych organizacji - od wymagań zebranych z klientem po wdrożenie.",
      },
      {
        title: "Intranety SharePoint",
        tags: ["SharePoint", "SPFx", "Power Automate", "Azure", "Microsoft 365"],
        desc: "Design i development intranetów oraz customowe rozwiązania w SharePoint Server, SharePoint Online.",
      },
    ],
  },

  en: {
    meta: { title: "Wojciech Prawdzik - Developer" },
    role: "SOFTWARE ENGINEER",
    location: "Gdańsk, Poland",
    sections: [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "resume", label: "Resume" },
      { id: "portfolio", label: "Portfolio" },
      { id: "contact", label: "Contact" },
    ],
    langSwitch: "Change language",

    home: {
      // greeting: "Come on in, friend -",
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
      hint: "grab me & throw ↻",
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
      more: "see more →",
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
        tags: ["Next.js", "NestJS", "Drizzle", "Postgres", "Nx", "Tauri"],
        desc: "An application for lawyers handling legal assignments.",
      },
      {
        title: "Colway",
        tags: ["React", "Redux", "Styled Components"],
        desc: "An app for online store users and for managing a multi-level marketing structure - complex business logic and API integrations.",
      },
      {
        title: "Client forms",
        tags: ["React", "TypeScript"],
        desc: "Forms and business tools for different organizations - from requirements gathered with the client to release.",
      },
      {
        title: "SharePoint intranets",
        tags: ["SharePoint", "SPFx", "Power Automate", "Azure", "Microsoft 365"],
        desc: "Designing and developing intranets and custom solutions in SharePoint Server, SharePoint Online.",
      },
    ],
  },
};
