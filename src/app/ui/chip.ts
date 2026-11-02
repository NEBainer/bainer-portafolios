import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Chip de equipo: "Individual", "En equipo de 4". Celeste suave, texto navy. */
@Component({
  selector: 'app-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-pill);
      background: var(--color-sky-soft);
      color: var(--color-ink);
      font-size: var(--fs-sm);
      font-weight: 600;
      line-height: 1.4;
    }
  `,
})
export class Chip {}
