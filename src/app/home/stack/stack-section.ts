import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18n } from '../../core/i18n/i18n.service';
import { TagList } from '../../ui/tag-list';

/** Agrupado por evidencia (qué uso, qué usé, qué estudié), sin niveles inventados. */
@Component({
  selector: 'app-stack-section',
  imports: [TagList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="band">
      <section class="container section" [id]="t().ids.stack" aria-labelledby="stack-title">
        <h2 id="stack-title" class="section-title">{{ t().stack.heading }}</h2>
        <dl>
          @for (group of t().stack.groups; track group.title) {
            <div class="group reveal">
              <dt>{{ group.title }}</dt>
              <dd><app-tag-list [tags]="group.items" /></dd>
            </div>
          }
        </dl>
      </section>
    </div>
  `,
  styles: `
    .band {
      background: var(--color-surface);
    }

    dl {
      display: grid;
      gap: var(--space-8);
      margin: 0;
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    dt {
      font-weight: 600;
    }

    dd {
      margin: 0;
    }

    @media (min-width: 48rem) {
      dl {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-8) var(--space-12);
      }
    }
  `,
})
export class StackSection {
  protected readonly t = inject(I18n).t;
}
