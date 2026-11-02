import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { I18n } from '../../core/i18n/i18n.service';
import { PROFILE } from '../../core/links';
import { Icon } from '../../ui/icon';

@Component({
  selector: 'app-site-footer',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container inner">
      <div class="who">
        <p class="name">{{ t().hero.name }}</p>
        <p>{{ t().footer.location }}</p>
        <p>© {{ year }}</p>
      </div>
      <nav [attr.aria-label]="t().ui.footerNav">
        <ul>
          <li>
            <a [href]="profile.github"><app-icon name="github" [size]="18" />GitHub</a>
          </li>
          <li>
            <a [href]="profile.linkedin"><app-icon name="linkedin" [size]="18" />LinkedIn</a>
          </li>
          <li>
            <a [href]="whatsappUrl()"><app-icon name="whatsapp" [size]="18" />WhatsApp</a>
          </li>
          <li>
            <a [href]="'mailto:' + profile.email"><app-icon name="mail" [size]="18" />Mail</a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: `
    :host {
      display: block;
      background: var(--color-navy);
      color: var(--color-text-on-navy-muted);
    }
    .inner {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding-block: var(--space-8);
    }
    .who {
      display: flex;
      flex-wrap: wrap;
      column-gap: var(--space-4);
    }
    p {
      margin: 0;
    }
    .name {
      flex-basis: 100%;
      color: var(--color-text-on-navy);
      font-family: var(--font-display);
      font-weight: 800;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2) var(--space-6);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    a {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      min-height: var(--tap-min);
      color: var(--color-text-on-navy);
      font-weight: 600;
      text-decoration: none;
    }
    a:hover {
      color: var(--color-sky);
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    @media (min-width: 48rem) {
      .inner {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  `,
  host: { class: 'on-navy' },
})
export class SiteFooter {
  protected readonly t = inject(I18n).t;
  protected readonly profile = PROFILE;
  /** Año del build: el sitio se regenera en cada deploy. */
  protected readonly year = new Date().getFullYear();
  protected readonly whatsappUrl = computed(
    () => `${PROFILE.whatsapp}?text=${encodeURIComponent(this.t().contact.whatsappMessage)}`,
  );
}
