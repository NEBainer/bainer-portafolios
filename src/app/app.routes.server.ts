import { RenderMode, ServerRoute } from '@angular/ssr';

import { CASE_SLUGS } from './core/i18n/model';

/** Todas las páginas se generan como HTML estático en el build. */
const caseParams = async () => CASE_SLUGS.map((slug) => ({ slug }));

export const serverRoutes: ServerRoute[] = [
  { path: 'proyectos/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: caseParams },
  { path: 'en/projects/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: caseParams },
  { path: '**', renderMode: RenderMode.Prerender },
];
