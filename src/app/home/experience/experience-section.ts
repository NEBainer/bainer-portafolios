import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';

/**
 * Línea de tiempo (lo más reciente primero). Acá la secuencia sí tiene sentido,
 * por eso es una <ol>.
 */
@Component({
  selector: 'app-experience-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container section" [id]="t().ids.experience" aria-labelledby="experience-title">
      <h2 id="experience-title" class="section-title">{{ t().experience.heading }}</h2>
      <ol class="timeline">
        @for (job of t().experience.jobs; track job.company) {
          <li class="reveal">
            <article>
              <h3>
                <span class="company">{{ job.company }}</span>
                <span class="role">{{ job.role }}</span>
              </h3>
              <ul class="meta">
                <li>{{ job.period }}</li>
                @if (job.mode) {
                  <li>{{ job.mode }}</li>
                }
              </ul>
              @if (job.context) {
                <p class="context">{{ job.context }}</p>
              }
              <ul class="bullets stagger">
                @for (bullet of job.bullets; track bullet) {
                  <li>{{ bullet }}</li>
                }
              </ul>
            </article>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .timeline {
      display: flex;
      flex-direction: column;
      gap: var(--space-12);
      margin: 0;
      padding: 0 0 0 var(--space-6);
      list-style: none;
      border-left: 2px solid var(--color-border-cool);
    }

    .timeline > li {
      position: relative;
    }

    /* Punto de la línea de tiempo */
    .timeline > li::before {
      content: '';
      position: absolute;
      top: 0.45em;
      left: calc(-1 * var(--space-6) - 7px);
      width: 12px;
      height: 12px;
      border-radius: var(--radius-pill);
      background: var(--color-ink);
      box-shadow: 0 0 0 4px var(--color-bg);
    }

    article {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      max-width: var(--measure);
    }

    h3 {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      margin: 0;
    }

    .company {
      font-family: var(--font-display);
      font-size: var(--fs-h3);
      font-weight: 800;
      line-height: var(--lh-heading);
    }

    .role {
      font-size: var(--fs-md);
      font-weight: 600;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .meta li {
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-pill);
      background: var(--color-sky-soft);
      font-size: var(--fs-sm);
      font-weight: 600;
    }

    .context {
      margin: 0;
      color: var(--color-text-muted);
    }

    .bullets {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin: 0;
      padding-left: var(--space-5);
      color: var(--color-text-body);
      /* Está dentro de otra lista: sin esto el navegador usa círculos huecos. */
      list-style: disc;
    }
  `,
})
export class ExperienceSection {
  protected readonly t = inject(I18n).t;
}
