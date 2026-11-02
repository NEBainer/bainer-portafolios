import { Location } from '@angular/common';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { en } from './en';
import { es } from './es';
import { Dictionary, Lang } from './model';
import { Page, pagePath, parseUrl } from './paths';

const DICTIONARIES: Record<Lang, Dictionary> = { es, en };

/**
 * Idioma y página actuales, derivados de la URL.
 *
 * Por qué de la URL y no de un estado propio: el header y el footer se
 * renderizan fuera del <router-outlet>. Leyendo `Location.path()` saben el
 * idioma desde el primer render, tanto en el prerender como en el navegador,
 * y la hidratación encuentra el mismo HTML que se generó en el build.
 */
@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.location.path() || '/' },
  );

  readonly route = computed(() => parseUrl(this.url()));
  readonly lang = computed(() => this.route().lang);
  readonly page = computed(() => this.route().page);
  readonly t = computed(() => DICTIONARIES[this.lang()]);

  /** El otro idioma y la misma página en ese idioma (para el selector). */
  readonly otherLang = computed<Lang>(() => (this.lang() === 'es' ? 'en' : 'es'));
  readonly otherLangPath = computed(() => pagePath(this.otherLang(), this.page()));

  path(page: Page, lang: Lang = this.lang()): string {
    return pagePath(lang, page);
  }
}
