import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18n } from '../../core/i18n/i18n.service';

/**
 * Texto y una foto fuera del trabajo (en bici), limpia, con bordes redondeados.
 * Celular: título, texto y foto abajo. Escritorio: foto a la izquierda (el hero la tiene
 * a la derecha, así se alterna) y el texto con su título a la derecha.
 */
@Component({
  selector: 'app-about-section',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container section" [id]="t().ids.about" aria-labelledby="about-title">
      <div class="layout">
        <div class="text">
          <h2 id="about-title" class="section-title">{{ t().about.heading }}</h2>
          <div class="paragraphs stagger">
            @for (paragraph of t().about.paragraphs; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>
        </div>

        <figure class="photo reveal">
          <img
            ngSrc="/img/ezequiel-bici.webp"
            width="800"
            height="1000"
            sizes="(min-width: 64rem) 28rem, (min-width: 48rem) 24rem, 90vw"
            [alt]="t().about.photoAlt"
          />
        </figure>
      </div>
    </section>
  `,
  styles: `
    .layout {
      display: grid;
      gap: var(--space-12);
    }

    .paragraphs {
      max-width: var(--measure);
      color: var(--color-text-body);
      font-size: var(--fs-md);
    }

    p {
      margin: 0 0 var(--space-4);
    }

    p:last-child {
      margin-bottom: 0;
    }

    /* ---------- Foto ---------- */
    .photo {
      width: min(100%, 24rem);
      margin: 0;
      justify-self: center;
    }

    .photo img {
      width: 100%;
      height: auto;
      border-radius: var(--radius-xl);
    }

    /* ---------- Escritorio: foto a la izquierda, texto a la derecha ---------- */
    @media (min-width: 64rem) {
      .layout {
        grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
        align-items: center;
        gap: var(--space-16);
      }

      .photo {
        order: -1;
        width: min(100%, 28rem);
        justify-self: start;
      }
    }
  `,
})
export class AboutSection {
  protected readonly t = inject(I18n).t;
}
