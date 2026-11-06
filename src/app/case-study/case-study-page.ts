import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import { I18n } from '../core/i18n/i18n.service';
import { isCaseSlug } from '../core/i18n/paths';
import { MOBILE_MEDIA_QUERY } from '../core/media';
import { Button } from '../ui/button';
import { Lightbox } from '../ui/lightbox';
import { TagList } from '../ui/tag-list';

/**
 * Página de caso de estudio (/proyectos/:slug y /en/projects/:slug).
 * El slug llega como input gracias a withComponentInputBinding().
 */
@Component({
  selector: 'app-case-study-page',
  imports: [NgOptimizedImage, RouterLink, Button, Lightbox, TagList],
  templateUrl: './case-study-page.html',
  styleUrl: './case-study-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudyPage {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly mobileQuery = MOBILE_MEDIA_QUERY;

  readonly slug = input.required<string>();

  protected readonly caseStudy = computed(() => {
    const slug = this.slug();
    return isCaseSlug(slug) ? this.t().cases[slug] : null;
  });

  protected readonly repoIsUrl = computed(
    () => this.caseStudy()?.repo.startsWith('http') ?? false,
  );

  protected readonly homePath = computed(() => this.i18n.path({ kind: 'home' }));
}
