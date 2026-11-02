import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Los parámetros de ruta (:slug) llegan como input() del componente.
      withComponentInputBinding(),
      // Los links a #proyectos, #contacto, etc. hacen scroll; al cambiar de página, arriba.
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      // Transición animada al cambiar de página (styles.css). Si solo cambia el #ancla
      // (ir a una sección de la misma página), no hay transición: hace scroll suave.
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition, from, to }) => {
          if (fullPath(from) === fullPath(to)) {
            // Saltear la transición rechaza `ready`: es esperado, no un error.
            transition.ready.catch(() => undefined);
            transition.skipTransition();
          }
        },
      }),
    ),
    // Reutiliza el HTML prerenderizado y repite los clicks hechos antes de que cargue el JS.
    provideClientHydration(withEventReplay()),
  ],
};

/** Ruta completa de un snapshot ("proyectos/fotograma"), para comparar páginas. */
function fullPath(snapshot: ActivatedRouteSnapshot): string {
  const parts: string[] = [];
  for (let s: ActivatedRouteSnapshot | null = snapshot; s; s = s.firstChild) {
    parts.push(...s.url.map((segment) => segment.path));
  }
  return parts.join('/');
}
