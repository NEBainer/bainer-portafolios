import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AboutSection } from './about/about-section';
import { ContactSection } from './contact/contact-section';
import { ExperienceSection } from './experience/experience-section';
import { Hero } from './hero/hero';
import { ProjectsSection } from './projects/projects-section';
import { StackSection } from './stack/stack-section';

/** Home de una sola página. El orden sigue el brief: quién es, qué hizo, cómo contactarlo. */
@Component({
  selector: 'app-home-page',
  imports: [Hero, ProjectsSection, ExperienceSection, StackSection, AboutSection, ContactSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-projects-section />
    <app-experience-section />
    <app-stack-section />
    <app-about-section />
    <app-contact-section />
  `,
})
export class HomePage {}
