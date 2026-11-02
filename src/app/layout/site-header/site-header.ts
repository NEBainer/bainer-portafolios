import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

import { I18n } from '../../core/i18n/i18n.service';
import { Theme } from '../../core/theme.service';
import { Icon } from '../../ui/icon';

/**
 * Dos variantes según la página:
 * - home: nombre, navegación a secciones, modo noche e idioma (en mobile, menú desplegable).
 *   El CV no va acá: está como botón en el hero y en Contacto.
 * - caso de estudio: "← Proyectos" e idioma.
 */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, Icon],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu(true)',
    '(window:scroll)': 'onScroll()',
    '[class.scrolled]': 'scrolled()',
  },
})
export class SiteHeader {
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly isHome = computed(() => this.i18n.page().kind === 'home');
  protected readonly homePath = computed(() => this.i18n.path({ kind: 'home' }));

  protected readonly theme = inject(Theme);
  private readonly document = inject(DOCUMENT);

  protected readonly menuOpen = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  /** Con la página scrolleada, el header (fijo arriba) muestra una línea de separación. */
  protected readonly scrolled = signal(false);

  protected readonly navLinks = computed(() => {
    const { ids, nav } = this.t();
    return [
      { id: ids.projects, label: nav.projects },
      { id: ids.experience, label: nav.experience },
      { id: ids.contact, label: nav.contact },
    ];
  });

  /** Sección que se está viendo: su link del menú queda marcado. */
  protected readonly activeSection = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      this.theme.sync();
      this.onScroll();
    });

    // Marca la sección visible. Se rearma al cambiar de página o de idioma (cambian los ids).
    afterRenderEffect((onCleanup) => {
      if (!this.isHome()) {
        this.activeSection.set(null);
        return;
      }
      const ids = this.navLinks().map((link) => link.id);
      const sections = ids
        .map((id) => this.document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.activeSection.set(entry.target.id);
          }
        },
        // Cuenta como "visible" la sección que cruza la franja del medio de la pantalla.
        { rootMargin: '-45% 0px -50% 0px' },
      );
      sections.forEach((section) => observer.observe(section));
      onCleanup(() => observer.disconnect());
    });

    // Si se navega (por ejemplo, con un link del menú), el menú se cierra.
    effect(() => {
      this.i18n.route();
      this.menuOpen.set(false);
    });
  }

  protected onScroll(): void {
    const scrolled = (this.document.defaultView?.scrollY ?? 0) > 8;
    if (scrolled !== this.scrolled()) this.scrolled.set(scrolled);
    // Arriba de todo (en el hero) no hay ninguna sección marcada.
    if (!scrolled) this.activeSection.set(null);
  }

  /** El círculo del cambio de tema nace en el centro del botón. */
  protected toggleTheme(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.theme.toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /** Escape cierra el menú y devuelve el foco al botón que lo abrió. */
  protected closeMenu(returnFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (returnFocus) this.menuButton()?.nativeElement.focus();
  }
}
