import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TechIcon } from './tech-icons';

/**
 * Tag de stack, el único lugar donde va DM Mono.
 * Sobre navy: fondo navy-line. Sobre claro: borde frío.
 * Si la tecnología tiene logo, va adelante (del color del texto; con el mouse encima,
 * del color de la marca). El logo es decorativo: el nombre ya está en el texto.
 */
@Component({
  selector: 'app-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.on-dark]': 'onDark()' },
  template: `
    @for (icon of icons(); track icon.title) {
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        aria-hidden="true"
        focusable="false"
        [style.--brand]="icon.hex"
      >
        <path [attr.d]="icon.path" />
      </svg>
    }
    <span><ng-content /></span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      padding: var(--space-1) var(--space-3);
      border: 1px solid var(--color-border-cool);
      border-radius: var(--radius-pill);
      color: var(--color-ink);
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
      line-height: 1.5;
      transition: border-color var(--duration-fast) ease;
    }
    :host(.on-dark) {
      border-color: var(--color-navy-line);
      background: var(--color-navy-line);
      color: var(--color-text-on-navy-soft);
    }

    svg {
      flex-shrink: 0;
      fill: currentColor;
      transition:
        fill var(--duration-base) ease,
        scale var(--duration-base) var(--ease-out);
    }

    /* Con varios logos juntos ("Node.js + Express + Prisma"), un poco más pegados. */
    svg + svg {
      margin-left: -1px;
    }

    span {
      margin-left: var(--space-1);
    }

    @media (hover: hover) {
      :host(:hover) {
        border-color: var(--color-ink);
      }
      :host(.on-dark:hover) {
        border-color: var(--color-sky);
      }
      :host(:hover) svg {
        fill: var(--brand, currentColor);
        scale: 1.15;
      }
    }
  `,
})
export class Tag {
  readonly onDark = input(false);
  readonly icons = input<TechIcon[]>([]);
}
