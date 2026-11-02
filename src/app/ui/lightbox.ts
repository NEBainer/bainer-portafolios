import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { I18n } from '../core/i18n/i18n.service';
import { Shot } from '../core/i18n/model';
import { Icon } from './icon';

/**
 * Visor de capturas en grande, en la misma pantalla y con el fondo oscurecido.
 *
 * Usa <dialog> nativo con showModal(): el navegador ya resuelve lo difícil de accesibilidad
 * (el foco queda adentro mientras está abierto, Escape cierra, lo de atrás queda inerte
 * para lectores de pantalla) y el oscurecido de atrás es su ::backdrop.
 *
 * Se cierra con Escape, con el botón ✕ o tocando afuera de la imagen.
 * Con varias capturas: flechas en pantalla y del teclado para pasar de una a otra.
 */
@Component({
  selector: 'app-lightbox',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialog
      [attr.aria-label]="t().ui.screenshots"
      (click)="onClick($event)"
      (keydown)="onKeydown($event)"
      (close)="onClose()"
    >
      @if (current(); as shot) {
        <figure>
          <img [src]="shot.src" [alt]="shot.alt" [width]="shot.width" [height]="shot.height" />
          <figcaption>
            <span>{{ shot.alt }}</span>
            @if (shots().length > 1) {
              <span class="count">{{ index() + 1 }} / {{ shots().length }}</span>
            }
          </figcaption>
        </figure>
      }

      <button type="button" class="control close" [attr.aria-label]="t().ui.close" (click)="close()">
        <app-icon name="close" />
      </button>

      @if (shots().length > 1) {
        <button
          type="button"
          class="control prev"
          [attr.aria-label]="t().ui.previousScreenshot"
          (click)="step(-1)"
        >
          <app-icon name="arrow-left" />
        </button>
        <button
          type="button"
          class="control next"
          [attr.aria-label]="t().ui.nextScreenshot"
          (click)="step(1)"
        >
          <app-icon name="arrow-right" />
        </button>
      }
    </dialog>
  `,
  styles: `
    /* El dialog ocupa toda la pantalla y es transparente: lo oscuro es el ::backdrop.
       Así cualquier toque fuera de la imagen y de los botones cae en el dialog y cierra. */
    dialog {
      width: 100vw;
      max-width: 100vw;
      height: 100dvh;
      max-height: 100dvh;
      margin: 0;
      /* Abajo, lugar para las flechas (en celular van abajo, a mano del pulgar). */
      padding: var(--space-16) var(--space-4) calc(var(--tap-min) + var(--space-8));
      border: 0;
      background: transparent;
      color: var(--color-text-on-navy);
    }

    dialog[open] {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    dialog::backdrop {
      background: rgb(10 16 23 / 0.85);
      animation: fade-in var(--duration-base) ease both;
    }

    figure {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
      max-width: 100%;
      max-height: 100%;
      margin: 0;
      animation: zoom-in var(--duration-base) var(--ease-out) both;
    }

    img {
      display: block;
      width: auto;
      max-width: min(100%, 64rem);
      height: auto;
      /* Espacio para la leyenda debajo. */
      max-height: calc(100dvh - 10rem);
      border-radius: var(--radius-sm);
      object-fit: contain;
      box-shadow: 0 24px 60px -20px rgb(0 0 0 / 0.6);
    }

    figcaption {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-2) var(--space-4);
      max-width: 40rem;
      color: var(--color-text-on-navy-soft);
      font-size: var(--fs-sm);
      text-align: center;
    }

    .count {
      color: var(--color-text-on-navy-muted);
      font-variant-numeric: tabular-nums;
    }

    /* ---------- Botones (44×44, sobre el oscuro) ---------- */
    .control {
      position: fixed;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--tap-min);
      height: var(--tap-min);
      padding: 0;
      border: 0;
      border-radius: var(--radius-pill);
      background: rgb(255 255 255 / 0.12);
      color: var(--color-text-on-navy);
      cursor: pointer;
      transition: background-color var(--duration-fast) ease;
    }

    .control:hover {
      background: rgb(255 255 255 / 0.24);
    }

    .control:focus-visible {
      outline-color: var(--color-sky);
    }

    .close {
      top: var(--space-4);
      right: var(--space-4);
    }

    /* En celular, las flechas abajo (a mano del pulgar); en escritorio, a los costados. */
    .prev,
    .next {
      bottom: var(--space-4);
    }
    .prev {
      left: var(--space-4);
    }
    .next {
      right: var(--space-4);
    }

    @media (min-width: 48rem) {
      dialog {
        padding: var(--space-16) var(--space-16) var(--space-8);
      }

      .prev,
      .next {
        top: 50%;
        bottom: auto;
        translate: 0 -50%;
      }
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
    }

    @keyframes zoom-in {
      from {
        opacity: 0;
        scale: 0.94;
      }
    }
  `,
})
export class Lightbox {
  protected readonly t = inject(I18n).t;

  readonly shots = input.required<Shot[]>();

  protected readonly index = signal(0);
  protected readonly current = computed(() => this.shots()[this.index()] ?? null);

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  /** El link que abrió el visor: al cerrar, el foco vuelve ahí. */
  private trigger: HTMLElement | null = null;

  open(index: number, event?: Event): void {
    // El link sigue apuntando a la imagen (sirve sin JS); con JS se abre acá.
    event?.preventDefault();
    this.trigger = (event?.currentTarget as HTMLElement | null) ?? null;
    this.index.set(index);
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  protected step(delta: number): void {
    const total = this.shots().length;
    this.index.update((i) => (i + delta + total) % total);
  }

  /** Un toque que no cae en la imagen ni en un botón es "afuera": cierra. */
  protected onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('img, button')) this.close();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.shots().length < 2) return;
    if (event.key === 'ArrowRight') this.step(1);
    if (event.key === 'ArrowLeft') this.step(-1);
  }

  protected onClose(): void {
    this.trigger?.focus();
    this.trigger = null;
  }
}
