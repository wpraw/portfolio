/* Neutralne placeholdery — podmień na własne treści.
   CONTACT i MARQUEE są wspólne, reszta siedzi w CONTENT[lang]. */

export const CONTACT = {
  name: "Wojciech Prawdzik",
  email: "w.prawdzik@onet.pl",
  phone: "+48 881 465 502",
};

/* Zdjęcie na identyfikator w sekcji O mnie. null = placeholder.
   Żeby podmienić: wrzuć plik do src/assets i ustaw np.
     import photo from "./assets/photo.jpg";
     export const PHOTO = photo;
   Najlepiej pionowe, min. 1024 × 1160 px (dół karty zasłania pasek z imieniem). */
export const PHOTO = null;

export const MARQUEE = [
  "React",
  "TypeScript",
  "Node.js",
  "NestJS",
  "Tailwind",
  "GSAP",
  "PostgreSQL",
  "Docker",
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
      // greeting: "Wpadaj, przyjacielu —",
      ctaPortfolio: "Portfolio",
      ctaResume: "Życiorys",
      ctaContact: "Kontakt",
      scroll: "scroll",
    },
    about: {
      heading: "O mnie",
      hello: "Cześć, jestem",
      bio: "To jest placeholder na Twoje bio — dwa, trzy zdania o tym, kim jesteś, co programujesz i co Cię kręci w budowaniu softu.",
      facts: [
        { value: "4+", label: "lata w kodzie" },
        { value: "Gdańsk", label: "baza" },
        { value: "PL · EN", label: "języki" },
      ],
      hint: "złap mnie i rzuć ↻",
      // napis na smyczy identyfikatora (powtarzany wzdłuż taśmy)
      strap: "<HELLO WORLD />",
      approachTitle: "Jak pracuję",
      principles: [
        {
          title: "Prosto przed sprytnie",
          desc: "Czytelny kod wygrywa z błyskotliwym — następna osoba w zespole też musi go zrozumieć.",
        },
        {
          title: "Komunikacja",
          desc: "Pytam wcześnie, raportuję jasno i nie zostawiam niespodzianek na koniec sprintu.",
        },
        {
          title: "Dowożę",
          desc: "Działający, przetestowany kawałek dziś jest lepszy niż perfekcyjny za miesiąc.",
        },
      ],
      photo: "TWOJE ZDJĘCIE",
    },
    resume: {
      skillsTitle: "Umiem to i to…",
      experienceTitle: "Doświadczenie i edukacja",
      hobbiesTitle: "Hobby i co wnoszę",
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
      "JavaScript / TypeScript",
      "React + ekosystem",
      "Node.js / NestJS",
      "SQL / Drizzle ORM",
      "HTML / CSS / Tailwind",
      "Git / CI-CD",
      "REST / GraphQL",
      "Testy (Vitest, Jest)",
    ],
    languages: [
      { name: "Polski", level: "ojczysty", pct: 100 },
      { name: "Angielski", level: "C1", pct: 85 },
    ],
    experience: [
      {
        period: "2024 — teraz",
        title: "Fullstack Developer",
        place: "Nazwa firmy, Gdańsk",
        desc: "Krótki opis: co robisz, w jakim stacku, jaki był efekt.",
      },
      {
        period: "2022 — 2024",
        title: "Junior Developer",
        place: "Poprzednia firma",
        desc: "Placeholder — dwie linijki o zakresie obowiązków i technologiach.",
      },
      {
        period: "2019 — 2022",
        title: "Studia inżynierskie",
        place: "Uczelnia, kierunek",
        desc: "Edukacja — specjalizacja, projekt dyplomowy, koła naukowe.",
      },
    ],
    hobbies: [
      "Placeholder hobby #1 — np. wspinaczka",
      "Placeholder hobby #2 — np. fotografia",
      "Co wnoszę do zespołu: placeholder o samodzielności i komunikacji.",
    ],
    projects: [
      {
        title: "Projekt Alfa",
        tags: ["React", "GSAP", "Vite"],
        desc: "Placeholder opisu projektu — jedno zdanie o tym, co robi i dla kogo.",
      },
      {
        title: "Projekt Beta",
        tags: ["NestJS", "PostgreSQL"],
        desc: "Placeholder — API, architektura, ciekawy problem, który rozwiązałeś.",
      },
      {
        title: "Projekt Gamma",
        tags: ["TypeScript", "Tailwind"],
        desc: "Placeholder — aplikacja frontowa z naciskiem na animacje i UX.",
      },
      {
        title: "Projekt Delta",
        tags: ["Node.js", "Docker"],
        desc: "Placeholder — narzędzie CLI / automatyzacja / side-project.",
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
      // greeting: "Come on in, friend —",
      ctaPortfolio: "Portfolio",
      ctaResume: "Resume",
      ctaContact: "Contact",
      scroll: "scroll",
    },
    about: {
      heading: "About",
      hello: "Hi, I'm",
      bio: "This is a placeholder for your bio — two or three sentences about who you are, what you build and what excites you about making software.",
      facts: [
        { value: "4+", label: "years in code" },
        { value: "Gdańsk", label: "based in" },
        { value: "PL · EN", label: "languages" },
      ],
      hint: "grab me & throw ↻",
      strap: "<HELLO WORLD />",
      approachTitle: "How I work",
      principles: [
        {
          title: "Simple over clever",
          desc: "Readable code beats brilliant code — the next person on the team has to understand it too.",
        },
        {
          title: "Communication",
          desc: "I ask early, report clearly and leave no surprises for the end of the sprint.",
        },
        {
          title: "I ship",
          desc: "A working, tested slice today beats a perfect one next month.",
        },
      ],
      photo: "YOUR PHOTO",
    },
    resume: {
      skillsTitle: "Things I'm good at…",
      experienceTitle: "Experience & education",
      hobbiesTitle: "Hobbies & what I bring",
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
      "JavaScript / TypeScript",
      "React + ecosystem",
      "Node.js / NestJS",
      "SQL / Drizzle ORM",
      "HTML / CSS / Tailwind",
      "Git / CI-CD",
      "REST / GraphQL",
      "Testing (Vitest, Jest)",
    ],
    languages: [
      { name: "Polish", level: "native", pct: 100 },
      { name: "English", level: "C1", pct: 85 },
    ],
    experience: [
      {
        period: "2024 — present",
        title: "Fullstack Developer",
        place: "Company name, Gdańsk",
        desc: "Short summary: what you do, which stack, what the outcome was.",
      },
      {
        period: "2022 — 2024",
        title: "Junior Developer",
        place: "Previous company",
        desc: "Placeholder — two lines about responsibilities and technologies.",
      },
      {
        period: "2019 — 2022",
        title: "Engineering degree",
        place: "University, field of study",
        desc: "Education — specialization, thesis project, student clubs.",
      },
    ],
    hobbies: [
      "Placeholder hobby #1 — e.g. climbing",
      "Placeholder hobby #2 — e.g. photography",
      "What I bring to a team: placeholder about ownership and communication.",
    ],
    projects: [
      {
        title: "Project Alpha",
        tags: ["React", "GSAP", "Vite"],
        desc: "Project description placeholder — one sentence on what it does and for whom.",
      },
      {
        title: "Project Beta",
        tags: ["NestJS", "PostgreSQL"],
        desc: "Placeholder — API, architecture, an interesting problem you solved.",
      },
      {
        title: "Project Gamma",
        tags: ["TypeScript", "Tailwind"],
        desc: "Placeholder — a frontend app focused on animation and UX.",
      },
      {
        title: "Project Delta",
        tags: ["Node.js", "Docker"],
        desc: "Placeholder — a CLI tool / automation / side project.",
      },
    ],
  },
};
