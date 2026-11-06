import { DEMOS, PROFILE, REPOS } from '../links';
import { SHOTS } from '../media';
import { Dictionary } from './model';

/**
 * English texts, translated from es.ts (docs/contenido.es.md).
 * DRAFT: pending Ezequiel's review (docs/contenido.en.md).
 * Rule: translate, never add. English level is "Upper-intermediate (B2)".
 */
export const en: Dictionary = {
  lang: 'en',
  locale: 'en_US',
  seo: {
    homeTitle: 'Ezequiel Bainer · Junior Full Stack Developer',
    homeDescription:
      'Junior Full Stack Developer in Buenos Aires. Projects built with Angular, TypeScript, Supabase and PostgreSQL. Available for on-site, hybrid or remote work.',
    caseTitle: (name) => `${name}: case study · Ezequiel Bainer`,
    jobTitle: 'Junior Full Stack Developer',
    ogImageAlt: 'Ezequiel Bainer, Junior Full Stack Developer, photo on a navy arch',
  },
  ui: {
    skipLink: 'Skip to content',
    mainNav: 'Main',
    footerNav: 'Profiles and contact',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    switchLang: { label: 'ES', hidden: 'Versión en español' },
    downloadCvPdf: 'Download CV (PDF)',
    viewProjects: 'View projects',
    viewCase: 'Read the case study',
    demo: 'Demo',
    repo: 'Repository',
    openDemo: 'Open the demo',
    backToProjects: 'Projects',
    otherProjectsLink: 'See other projects',
    notFound: "I couldn't find that project.",
    darkMode: 'Dark mode',
    screenshots: 'Screenshots',
    close: 'Close',
    previousScreenshot: 'Previous screenshot',
    nextScreenshot: 'Next screenshot',
    copyEmail: 'Copy email',
    emailCopied: 'Email copied',
  },
  ids: {
    projects: 'projects',
    experience: 'experience',
    stack: 'stack',
    about: 'about',
    contact: 'contact',
  },
  nav: { projects: 'Projects', experience: 'Experience', contact: 'Contact' },
  hero: {
    name: 'Ezequiel Bainer',
    role: 'Junior Full Stack Developer',
    intro:
      'I build web applications with Angular, TypeScript and Supabase. Before programming I worked in Occupational Health and Safety analyzing processes, and that habit stuck: first I understand how people work, then I write the code.',
    facts: [
      { icon: 'map-pin', text: 'Lomas de Zamora, Buenos Aires' },
      { icon: 'briefcase', text: 'On-site, hybrid or remote' },
      { icon: 'graduation', text: 'Programming Technician degree, UTN: December 2026' },
    ],
    photoAlt: 'Ezequiel Bainer smiling, wearing a light blue T-shirt',
  },
  projects: {
    heading: 'Projects',
    intro:
      'For each project I note whether it was individual or a team effort, and what my part was.',
    featured: {
      caseSlug: 'la-mesa',
      name: 'LA MESA',
      chips: ['Team of 4', 'Team coordination'],
      description:
        "Android app to manage a restaurant with QR ordering, from the table to the kitchen. It's my degree's final project.",
      bullets: [
        "I set up the repository and the branching workflow, and did 14 of the team's 43 merges.",
        'I developed the real-time chat between customer and waiter, and the notifications.',
        'I programmed the discount games, validated with SQL functions and covered by unit tests.',
      ],
      tags: ['Ionic', 'Angular', 'Supabase', 'Capacitor'],
      repo: REPOS.laMesa,
      note: "It's an Android app: there is no web demo.",
      media: [
        { ...SHOTS.laMesaMesas, alt: 'Table management: list with photo, seats and status' },
        { ...SHOTS.laMesaPortada, alt: 'LA MESA start screen with the logo and the team members' },
        { ...SHOTS.laMesaJuegos, alt: 'Games list with each discount and whether it was already played' },
      ],
    },
    medium: [
      {
        caseSlug: 'fotograma',
        name: 'Fotograma',
        chips: ['Individual'],
        description:
          'Ticket sales for a cinema: real-time seat selection with no double booking, security enforced in the database and single-use QR tickets.',
        tags: ['Angular', 'Supabase', 'PWA'],
        demo: DEMOS.fotograma,
        repo: REPOS.fotograma,
        media: [
          {
            ...SHOTS.fotogramaCartelera,
            alt: 'Fotograma listings: the three most popular movies, search box and genre filters',
          },
        ],
      },
      {
        name: 'Aroma & Miga',
        chips: ['Individual'],
        description:
          'Responsive website for a fictional coffee shop: catalog with combinable filters, debounced search, sorting, pagination and light or dark theme.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        demo: DEMOS.aromaYMiga,
        repo: REPOS.aromaYMiga,
        media: [{ ...SHOTS.aromaYMigaDestacados, alt: 'Aroma & Miga featured products: flat white, cheesecake and veggie wrap' }],
      },
    ],
    othersHeading: 'Other projects',
    others: [
      {
        name: 'GigaShop',
        summary: 'I developed the backend (REST API with Node, Express and Prisma), in a team of 2.',
        href: REPOS.gigashop,
      },
      {
        name: 'Course grade average app',
        summary:
          'I developed the FastAPI backend, the Dockerfile and error reporting to Sentry, in a team of 4.',
        href: REPOS.promedio,
      },
      {
        name: 'Booking system',
        summary: 'I built a practice REST API with Spring Boot: layers, DTOs, validation and error handling.',
        href: REPOS.reservas,
      },
    ],
    seeAll: 'See everything on GitHub',
  },
  cases: {
    fotograma: {
      name: 'Fotograma',
      summary:
        'Web system for a cinema: ticket sales with real-time seat selection, role permissions enforced in the database and an admin panel.',
      facts: [
        { term: 'Team', detail: 'Individual' },
        { term: 'When', detail: 'September to October 2026' },
        { term: 'Context', detail: 'Programming IV coursework, UTN' },
        { term: 'Commits', detail: '27, all mine' },
      ],
      demo: DEMOS.fotograma,
      repo: REPOS.fotograma,
      media: [
        {
          ...SHOTS.fotogramaButacas,
          alt: 'Fotograma seat selection: theater map with free, accessible and VIP seats that updates in real time',
        },
        {
          ...SHOTS.fotogramaCartelera,
          alt: 'Fotograma listings: the three most popular movies, search box and genre filters',
        },
      ],
      sections: [
        {
          kind: 'text',
          heading: 'The problem',
          text: 'A cinema needs to sell tickets online without two people buying the same seat, control access at the door, and make sure each role (customer, employee, administrator) only sees what it should.',
        },
        {
          kind: 'list',
          heading: 'What I built',
          items: [
            'Real-time seat selection that prevents double booking.',
            'Registered or guest checkout, candy bar and combos, points, credit and coupons.',
            'Single-use QR tickets and PDFs, validated by camera from the employee profile.',
            'Admin panel: movies, showtimes with automatic theater assignment, pricing, and PDF and Excel reports.',
            'PWA with push notifications for new releases.',
          ],
        },
        {
          kind: 'cards',
          heading: 'Technical decisions',
          cards: [
            {
              title: 'Security lives in the database',
              text: "Each role's permissions are defined with Postgres Row Level Security. Angular guards only control navigation: even if someone bypasses them, the database won't return data that isn't theirs.",
            },
            {
              title: 'Seats synced with Realtime',
              text: 'Each customer sees, live, the seats other people are taking, using Supabase Realtime.',
            },
            {
              title: 'Documented requirements and decisions',
              text: 'The repo documents 42 requirements and 14 technical decisions, each decision with the alternatives I evaluated.',
            },
          ],
        },
        {
          kind: 'tags',
          heading: 'Stack',
          tags: [
            'Angular 22',
            'TypeScript',
            'Signals',
            'Supabase Auth',
            'Postgres + RLS',
            'Realtime',
            'Storage',
            'Edge Functions',
            'PWA',
            'Vitest',
            'Vercel',
          ],
        },
        {
          kind: 'list',
          heading: "What I'd do differently",
          items: [
            "I'd test the layout on phones from day one: today, on narrow screens, the listings get cut off on the right.",
            "I'd plan from the start how to keep the demo alive. When I handed in the project, showtimes were loaded by hand and expired; later I added a scheduled database job (pg_cron) that creates the next weeks' showtimes every day.",
          ],
        },
      ],
    },
    'la-mesa': {
      name: 'LA MESA',
      summary:
        "Android app to manage a restaurant end to end (check-in, table, order, kitchen and bar, games, survey and payment) with 7 profiles: owner, supervisor, maître d', waiter, cook, bartender and customer.",
      facts: [
        {
          term: 'Team',
          detail:
            '4 members (Ezequiel Bainer, Maximiliano Arcieri, Noelia Storgato, Lucía Cicchelli)',
        },
        { term: 'My role', detail: 'Coordination and development' },
        { term: 'Context', detail: 'Final Integrative Project, UTN' },
        { term: 'Since', detail: 'August 2026, weekly deliveries' },
      ],
      repo: REPOS.laMesa,
      note: "It's an Android app: there is no web demo.",
      media: [
        { ...SHOTS.laMesaPortada, alt: 'LA MESA start screen with the logo and the team members' },
        {
          ...SHOTS.laMesaAltaMesa,
          alt: 'New table form: number, seats, table type and a photo taken with the camera',
        },
        { ...SHOTS.laMesaQr, alt: 'New table created with its QR code for the customer to scan' },
        { ...SHOTS.laMesaMesas, alt: 'Table management: list with photo, seats and status' },
        { ...SHOTS.laMesaChatMozo, alt: 'Real-time question chat, waiter view' },
        { ...SHOTS.laMesaJuegos, alt: 'Games list with each discount and whether it was already played' },
        { ...SHOTS.laMesaAhorcado, alt: 'Hangman in progress: right letters in green, wrong ones in red' },
        { ...SHOTS.laMesaMemotest, alt: 'Memory game in progress, with photos of dishes from the menu' },
      ],
      sections: [
        {
          kind: 'list',
          heading: 'Coordination',
          items: [
            'I created and managed the repository.',
            'I defined the branching workflow: one branch per member, integration in dev and the stable version in main.',
            "I integrated the team's work: I did 14 of the 43 merges, more than any other member.",
            "I kept the README up to date with progress, each member's modules, screenshots and the data model.",
          ],
        },
        {
          kind: 'list',
          heading: 'What I developed',
          items: [
            'Table creation and management: form with a camera photo, QR generation, validations and profile-restricted access.',
            'Real-time customer–waiter chat and a waiter inbox with unanswered questions.',
            'Validation that the scanned QR matches the assigned table.',
            'Notifications for the owner or supervisor, waiters and customers.',
            'Discount games (hangman 10%, memory game 15%, trivia 20%), first attempt only: an attempts table and SQL functions that validate and calculate the discount, with unit tests.',
          ],
        },
        {
          kind: 'text',
          heading: 'Built by my teammates',
          text: 'Initial schema, authentication and RLS, employee onboarding, table assignment, login and sign-up, ID scanning, emails, survey, bill, menu, orders and kitchen/bar.',
        },
        {
          kind: 'tags',
          heading: 'Stack',
          tags: [
            'Ionic',
            'Angular',
            'TypeScript',
            'Capacitor',
            'ML Kit',
            'Supabase (Postgres, RLS, Edge Functions)',
            'Vitest',
          ],
        },
        {
          kind: 'list',
          heading: "What I'd do differently",
          items: [
            "I'd add tests to more modules: today only the game logic has unit tests, and the order and payment flows need them too.",
            "I'd plan from the start a way to show it without installing it, like a short video: since it's an Android app, it's hard to present in an interview.",
          ],
        },
      ],
    },
  },
  experience: {
    heading: 'Experience',
    jobs: [
      {
        company: 'AgentesAI',
        role: 'Process analysis and AI agent development',
        period: 'September 2026 – present',
        mode: 'Hybrid, part-time',
        context: 'AI automation consultancy. Project for a client in the hospital supplies sector.',
        bullets: [
          'I mapped the Administration, Purchasing, Sales and Operations processes through interviews with staff and management.',
          'I documented them as standard operating procedures (SOPs) with roles, owners and tools for each step, and validated them with the users.',
          "I analyzed the client's ERP (REST API with more than 170 endpoints and an MCP connector) to define what could be integrated or automated.",
          'I tested AI access to the ERP data through a read-only MCP connector, to generate automatic reports and cross-checks.',
          'I defined what to automate, and with what priority, for the development stage.',
        ],
      },
      {
        company: 'Lihué Ingeniería S.A.',
        role: 'Health and Safety Analyst',
        period: 'February 2025 – September 2026',
        bullets: [
          'I prepared risk matrices, process analyses and technical documentation.',
          'I trained staff and worked in coordination with multidisciplinary teams.',
          'I took part in continuous process improvement initiatives.',
        ],
      },
    ],
  },
  stack: {
    heading: 'What I work with',
    groups: [
      {
        title: 'I use it in my projects',
        items: [
          'Angular',
          'TypeScript',
          'Supabase',
          'PostgreSQL / SQL',
          'HTML',
          'CSS / SCSS',
          'JavaScript',
          'Git / GitHub',
        ],
      },
      {
        title: "I've used it in projects or coursework",
        items: [
          'Node.js + Express + Prisma',
          'Python + FastAPI',
          'Ionic + Capacitor',
          'Java 17',
          'Spring Boot',
          'Docker',
          'Vercel',
          'Netlify',
          'Sentry',
        ],
      },
      { title: 'AI and automation tools', items: ['Claude Code', 'n8n', 'MCP connectors'] },
      {
        title: 'Academic training',
        items: ['MySQL', 'Linux', 'Scrum and agile methodologies', 'UML'],
      },
      { title: 'Languages', items: ['Spanish (native)', 'English: Upper-intermediate (B2)'] },
    ],
  },
  about: {
    heading: 'About me',
    paragraphs: [
      "I graduated with a bachelor's degree in Occupational Health and Safety in 2021 and worked in the field analyzing processes, writing technical documentation and training teams. That's where I learned to look at how people work and to spot what is done by hand and could be done better.",
      "Today I'm finishing the Programming Technician degree at UTN and I bring that perspective to software: first understand the real problem, then write clean, documented code.",
      'Away from the computer, I like working out and going for bike rides.',
    ],
    photoAlt: 'Ezequiel riding a bike outdoors, with a light blue sky behind him',
  },
  contact: {
    heading: 'Contact',
    text: "I'm looking for my first role as a full stack developer. For an open position or an interview, here are my contact details.",
    email: PROFILE.email,
    phone: '+54 11 3602-8457',
    phoneLabel: 'Call +54 11 3602-8457',
    whatsapp: 'Message on WhatsApp',
    whatsappMessage: 'Hi Ezequiel, I saw your portfolio and wanted to get in touch.',
  },
  footer: { location: 'Buenos Aires, Argentina' },
};
