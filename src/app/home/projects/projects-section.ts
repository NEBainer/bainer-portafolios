import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18n } from '../../core/i18n/i18n.service';
import { PROFILE } from '../../core/links';
import { ProjectCard } from './project-card';

@Component({
  selector: 'app-projects-section',
  imports: [ProjectCard],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'on-navy' },
})
export class ProjectsSection {
  protected readonly t = inject(I18n).t;
  protected readonly github = PROFILE.github;

  protected isUrl(href: string): boolean {
    return href.startsWith('http');
  }
}
