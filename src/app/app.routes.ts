import { Routes } from '@angular/router';

import { HomePage } from './home/home-page';

/**
 * Español en la raíz, inglés bajo /en. Los mismos componentes sirven a los dos
 * idiomas: el idioma se deduce de la URL (ver core/i18n/i18n.service.ts).
 * Los casos de estudio se cargan aparte (lazy) para no sumar peso a la home.
 */
const loadCaseStudy = () => import('./case-study/case-study-page').then((m) => m.CaseStudyPage);

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePage },
  { path: 'proyectos/:slug', loadComponent: loadCaseStudy },
  { path: 'en', pathMatch: 'full', component: HomePage },
  { path: 'en/projects/:slug', loadComponent: loadCaseStudy },
  { path: '**', redirectTo: '' },
];
