/**
 * Forma de todos los textos del sitio.
 * `es.ts` la define y `en.ts` está tipado con ella: si el español tiene un
 * texto que el inglés no tiene, el build falla.
 */
export type Lang = 'es' | 'en';

export const CASE_SLUGS = ['la-mesa', 'fotograma'] as const;
export type CaseSlug = (typeof CASE_SLUGS)[number];

export type IconName =
  | 'map-pin'
  | 'phone'
  | 'whatsapp'
  | 'moon'
  | 'sun'
  | 'copy'
  | 'check'
  | 'briefcase'
  | 'graduation'
  | 'download'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'menu'
  | 'close'
  | 'arrow-left'
  | 'arrow-right';

/** Texto que todavía falta: se muestra tal cual, entre corchetes. */
export type Placeholder = `[${string}]`;

/** Archivo de imagen con su tamaño real (el navegador reserva el espacio antes de cargarla). */
export interface ImageFile {
  src: string;
  width: number;
  height: number;
}

/**
 * Una captura real. Si todavía no existe, en su lugar va un Placeholder.
 * `mobile`: recorte con zoom para pantallas angostas. Una captura de escritorio achicada
 * a 390px no se lee; el recorte muestra menos cosas, pero más grandes.
 */
export interface Shot extends ImageFile {
  alt: string;
  mobile?: ImageFile;
}
export type Media = Placeholder | Shot;

export interface ProjectCard {
  /** Solo los proyectos con página de caso de estudio. */
  caseSlug?: CaseSlug;
  name: string;
  chips: string[];
  description: string;
  bullets?: string[];
  tags: string[];
  demo?: string;
  /** URL del repo, o un placeholder si todavía no es público. */
  repo: string | Placeholder;
  note?: string;
  /** Capturas, o placeholders mientras no existan. */
  media: Media[];
}

export interface OtherProject {
  name: string;
  status?: string;
  summary: string;
  href: string | Placeholder;
}

export type CaseSection =
  | { kind: 'text'; heading: string; text: string }
  | { kind: 'list'; heading: string; items: string[] }
  | { kind: 'cards'; heading: string; cards: { title: string; text: string }[] }
  | { kind: 'tags'; heading: string; tags: string[] };

export interface CaseStudy {
  name: string;
  summary: string;
  facts: { term: string; detail: string }[];
  demo?: string;
  repo: string | Placeholder;
  note?: string;
  media: Placeholder | Shot[];
  sections: CaseSection[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  mode?: string;
  context?: string;
  bullets: string[];
}

export interface Dictionary {
  lang: Lang;
  /** Para `og:locale`. */
  locale: string;
  seo: {
    homeTitle: string;
    homeDescription: string;
    caseTitle: (name: string) => string;
    jobTitle: string;
    /** Texto alternativo de la imagen Open Graph. */
    ogImageAlt: string;
  };
  ui: {
    skipLink: string;
    mainNav: string;
    footerNav: string;
    menuOpen: string;
    menuClose: string;
    switchLang: { label: string; hidden: string };
    downloadCvPdf: string;
    viewProjects: string;
    viewCase: string;
    demo: string;
    repo: string;
    openDemo: string;
    backToProjects: string;
    otherProjectsLink: string;
    notFound: string;
    darkMode: string;
    screenshots: string;
    close: string;
    previousScreenshot: string;
    nextScreenshot: string;
    copyEmail: string;
    emailCopied: string;
  };
  /** Ids de las secciones de la home (anclas de la URL). */
  ids: { projects: string; experience: string; stack: string; about: string; contact: string };
  nav: { projects: string; experience: string; contact: string };
  hero: {
    name: string;
    role: string;
    intro: string;
    facts: { icon: IconName; text: string }[];
    photoAlt: string;
  };
  projects: {
    heading: string;
    intro: string;
    featured: ProjectCard;
    medium: ProjectCard[];
    othersHeading: string;
    others: OtherProject[];
    seeAll: string;
  };
  cases: Record<CaseSlug, CaseStudy>;
  experience: { heading: string; jobs: Job[] };
  stack: { heading: string; groups: { title: string; items: string[] }[] };
  about: { heading: string; paragraphs: string[]; photoAlt: string };
  contact: {
    heading: string;
    text: string;
    email: string;
    phone: string;
    phoneLabel: string;
    whatsapp: string;
    /** Mensaje que aparece ya escrito al abrir el chat. */
    whatsappMessage: string;
  };
  footer: { location: string };
}
