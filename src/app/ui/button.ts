import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'outline-light';

/**
 * Estilo de botón aplicado a un <a> o <button> real (selector de atributo),
 * así se mantiene la semántica: <a> navega, <button> ejecuta una acción.
 *
 *   primary        terracota: UN solo CTA por pantalla
 *   secondary      borde del color del texto (navy de día, claro de noche)
 *   light          fondo claro sobre navy
 *   outline-light  borde celeste sobre navy
 */
@Component({
  selector: 'a[appButton], button[appButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"btn btn--" + variant()' },
  template: '<ng-content />',
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      min-height: var(--btn-height);
      padding: 0 var(--space-6);
      border: 1.5px solid transparent;
      border-radius: var(--radius-pill);
      font-family: var(--font-body);
      font-size: var(--fs-md);
      font-weight: 600;
      line-height: 1.2;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition:
        background-color var(--duration-fast) ease,
        color var(--duration-fast) ease,
        border-color var(--duration-fast) ease,
        translate var(--duration-fast) ease,
        box-shadow var(--duration-fast) ease;
    }

    @media (hover: hover) {
      :host(:hover) {
        translate: 0 -2px;
      }
      :host(.btn--primary:hover) {
        box-shadow: var(--shadow-lift);
      }
    }

    :host(:active) {
      translate: 0;
    }

    :host(.btn--primary) {
      background: var(--color-terracotta);
      color: var(--color-on-primary);
    }
    :host(.btn--primary:hover) {
      background: var(--color-terracotta-dark);
    }

    :host(.btn--secondary) {
      border-color: var(--color-ink);
      color: var(--color-ink);
    }
    :host(.btn--secondary:hover) {
      background: var(--color-ink);
      color: var(--color-bg);
    }

    :host(.btn--light) {
      background: var(--color-cream);
      color: var(--color-navy);
    }
    :host(.btn--light:hover) {
      background: var(--color-sky);
    }

    :host(.btn--outline-light) {
      border-color: var(--color-sky);
      color: var(--color-text-on-navy);
    }
    :host(.btn--outline-light:hover) {
      background: var(--color-navy-line);
    }
  `,
})
export class Button {
  readonly variant = input<ButtonVariant, ButtonVariant | ''>('primary', {
    alias: 'appButton',
    // <a appButton> sin valor llega como '': se toma como primario.
    transform: (value) => value || 'primary',
  });
}
