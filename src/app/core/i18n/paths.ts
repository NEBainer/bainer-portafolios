import { CASE_SLUGS, CaseSlug, Lang } from './model';

/**
 * Las URLs del sitio en un solo lugar: se usan para armar links,
 * para el hreflang y para saber en qué página e idioma estamos.
 *
 *   es: /                     /proyectos/<slug>
 *   en: /en                   /en/projects/<slug>
 */
export type Page = { kind: 'home' } | { kind: 'case'; slug: CaseSlug };

export interface SiteRoute {
  lang: Lang;
  page: Page;
}

export const CASE_SEGMENT: Record<Lang, string> = { es: 'proyectos', en: 'projects' };

export function homePath(lang: Lang): string {
  return lang === 'es' ? '/' : '/en';
}

export function casePath(lang: Lang, slug: CaseSlug): string {
  const prefix = lang === 'es' ? '' : '/en';
  return `${prefix}/${CASE_SEGMENT[lang]}/${slug}`;
}

export function pagePath(lang: Lang, page: Page): string {
  return page.kind === 'home' ? homePath(lang) : casePath(lang, page.slug);
}

export function isCaseSlug(value: string): value is CaseSlug {
  return (CASE_SLUGS as readonly string[]).includes(value);
}

/** Interpreta una URL del sitio. Lo que no reconoce lo trata como la home. */
export function parseUrl(url: string): SiteRoute {
  const path = url.split(/[?#]/)[0].replace(/\/+$/, '');
  const segments = path.split('/').filter(Boolean);

  const lang: Lang = segments[0] === 'en' ? 'en' : 'es';
  const rest = lang === 'en' ? segments.slice(1) : segments;

  if (rest.length === 2 && rest[0] === CASE_SEGMENT[lang] && isCaseSlug(rest[1])) {
    return { lang, page: { kind: 'case', slug: rest[1] } };
  }
  return { lang, page: { kind: 'home' } };
}
