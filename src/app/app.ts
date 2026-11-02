import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { I18n } from './core/i18n/i18n.service';
import { Seo } from './core/seo.service';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteHeader } from './layout/site-header/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly i18n = inject(I18n);
  private readonly seo = inject(Seo);
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    // Cada vez que cambia la página o el idioma, se reescribe el <head>.
    effect(() => this.seo.apply(this.i18n.route()));

    // El header queda fijo arriba: al ir a una sección, se descuenta su alto
    // para que el título no quede tapado.
    const document = inject(DOCUMENT);
    inject(ViewportScroller).setOffset(() => [
      0,
      document.querySelector<HTMLElement>('app-site-header')?.offsetHeight ?? 0,
    ]);
  }

  /**
   * "Saltar al contenido": con <base href="/"> un href="#contenido" llevaría a la home
   * desde cualquier página, así que se mueve el foco a <main> a mano.
   */
  protected skipToContent(event: Event): void {
    event.preventDefault();
    this.main().nativeElement.focus();
  }
}
