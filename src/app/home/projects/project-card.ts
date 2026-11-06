import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { I18n } from '../../core/i18n/i18n.service';
import { MOBILE_MEDIA_QUERY } from '../../core/media';
import { ProjectCard as ProjectCardData } from '../../core/i18n/model';
import { Chip } from '../../ui/chip';
import { TagList } from '../../ui/tag-list';

/**
 * Tarjeta de proyecto sobre navy. Dos tamaños para que haya jerarquía:
 * - featured (LA MESA): capturas grandes y bullets de "qué hice".
 * - medium (Fotograma, Aroma & Miga): captura chica y descripción.
 * Todas con los mismos links de texto (caso, demo, repo); el caso solo si tiene página propia.
 */
@Component({
  selector: 'app-project-card',
  imports: [NgOptimizedImage, NgTemplateOutlet, RouterLink, Chip, TagList],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.featured]': 'featured()' },
})
export class ProjectCard {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;

  protected readonly mobileQuery = MOBILE_MEDIA_QUERY;

  readonly project = input.required<ProjectCardData>();
  readonly featured = input(false);

  protected readonly casePath = computed(() => {
    const slug = this.project().caseSlug;
    return slug ? this.i18n.path({ kind: 'case', slug }) : null;
  });
  protected readonly repoIsUrl = computed(() => this.project().repo.startsWith('http'));

  /** A dónde llevan las capturas: el caso de estudio si existe; si no, la demo. */
  protected readonly mediaLink = computed<{ kind: 'case' | 'demo'; href: string } | null>(() => {
    const path = this.casePath();
    if (path) return { kind: 'case', href: path };
    const demo = this.project().demo;
    return demo ? { kind: 'demo', href: demo } : null;
  });
}
