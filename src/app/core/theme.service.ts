import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type ThemeName = 'light' | 'dark';

/** Color de la barra del navegador en el celular (= fondo del header en cada tema). */
const THEME_COLOR: Record<ThemeName, string> = { light: '#DCEBEF', dark: '#16293A' };

/**
 * Modo día / noche.
 * El tema inicial lo pone un script en index.html (antes de pintar). Este servicio
 * lo lee después de hidratar, lo cambia con el botón del header y guarda la elección.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly root = this.document.documentElement;

  /** En el prerender no hay tema: arranca en día y se sincroniza en el navegador. */
  readonly current = signal<ThemeName>('light');

  /** Se llama desde afterNextRender: lee lo que dejó el script de index.html. */
  sync(): void {
    this.current.set(this.root.dataset['theme'] === 'dark' ? 'dark' : 'light');
  }

  /**
   * Cambia de tema. Si el navegador soporta View Transitions (y no se pidió menos
   * movimiento), el tema nuevo aparece como un círculo que crece desde el botón.
   */
  toggle(origin?: { x: number; y: number }): void {
    const next: ThemeName = this.current() === 'dark' ? 'light' : 'dark';
    const apply = () => this.apply(next);

    const view = this.document.defaultView;
    const reduceMotion = view?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!view || reduceMotion || !('startViewTransition' in this.document)) {
      // Sin animación: igual se apagan las transiciones durante el cambio (ver styles.css).
      this.root.classList.add('theme-switching');
      apply();
      view?.requestAnimationFrame(() => this.root.classList.remove('theme-switching'));
      return;
    }

    const x = origin?.x ?? view.innerWidth / 2;
    const y = origin?.y ?? 0;
    // Radio hasta la esquina más lejana: el círculo termina cubriendo toda la pantalla.
    const r = Math.hypot(Math.max(x, view.innerWidth - x), Math.max(y, view.innerHeight - y));
    this.root.style.setProperty('--vt-x', `${x}px`);
    this.root.style.setProperty('--vt-y', `${y}px`);
    this.root.style.setProperty('--vt-r', `${r}px`);
    this.root.classList.add('theme-switching');

    const transition = this.document.startViewTransition(apply);
    // Si se toca el botón de nuevo antes de que termine, la transición anterior se cancela
    // y sus promesas se rechazan: no es un error, se ignora.
    transition.ready.catch(() => undefined);
    transition.finished
      .catch(() => undefined)
      .finally(() => this.root.classList.remove('theme-switching'));
  }

  private apply(theme: ThemeName): void {
    this.root.dataset['theme'] = theme;
    this.current.set(theme);
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);
    try {
      this.document.defaultView?.localStorage.setItem('theme', theme);
    } catch {
      // Navegación privada o almacenamiento bloqueado: el tema dura hasta recargar.
    }
  }
}
