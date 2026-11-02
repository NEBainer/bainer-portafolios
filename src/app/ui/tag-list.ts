import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Tag } from './tag';
import { techIconsFor } from './tech-icons';

/** Lista de tags como <ul>: un lector de pantalla anuncia cuántos son. */
@Component({
  selector: 'app-tag-list',
  imports: [Tag],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="stagger">
      @for (tag of items(); track tag.label) {
        <li><app-tag [onDark]="onDark()" [icons]="tag.icons">{{ tag.label }}</app-tag></li>
      }
    </ul>
  `,
  styles: `
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `,
})
export class TagList {
  readonly tags = input.required<string[]>();
  readonly onDark = input(false);

  /** Cada tag con sus logos (se calcula una vez por lista, no en cada render). */
  protected readonly items = computed(() =>
    this.tags().map((label) => ({ label, icons: techIconsFor(label) })),
  );
}
