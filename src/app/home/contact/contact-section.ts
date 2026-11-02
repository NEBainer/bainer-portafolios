import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { I18n } from '../../core/i18n/i18n.service';
import { CV_PATH, PROFILE } from '../../core/links';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';

@Component({
  selector: 'app-contact-section',
  imports: [Button, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="band">
      <section class="container section" [id]="t().ids.contact" aria-labelledby="contact-title">
        <h2 id="contact-title" class="section-title">{{ t().contact.heading }}</h2>
        <p class="lead">{{ t().contact.text }}</p>

        <ul class="channels stagger">
          <li class="email">
            <a [href]="'mailto:' + t().contact.email">
              <app-icon name="mail" />
              <span>{{ t().contact.email }}</span>
            </a>
            <!-- Copiar el mail: a muchos recruiters el link mailto: no les abre nada. -->
            <button
              type="button"
              class="copy"
              [class.done]="copied()"
              [attr.aria-label]="t().ui.copyEmail"
              (click)="copyEmail()"
            >
              <app-icon [name]="copied() ? 'check' : 'copy'" [size]="18" />
            </button>
            <span class="copied" aria-live="polite">{{ copied() ? t().ui.emailCopied : '' }}</span>
          </li>
          <li>
            <a [href]="whatsappUrl()">
              <app-icon name="whatsapp" />
              <span>{{ t().contact.whatsapp }}</span>
            </a>
          </li>
          <li>
            <a [href]="'tel:' + profile.phone" [attr.aria-label]="t().contact.phoneLabel">
              <app-icon name="phone" />
              <span>{{ t().contact.phone }}</span>
            </a>
          </li>
          <li>
            <a [href]="profile.linkedin">
              <app-icon name="linkedin" />
              <span>linkedin.com/in/ezequielbainer</span>
            </a>
          </li>
          <li>
            <a [href]="profile.github">
              <app-icon name="github" />
              <span>github.com/NEBainer</span>
            </a>
          </li>
        </ul>

        <a appButton="secondary" class="cv" [href]="cvPath()" download>
          <app-icon name="download" [size]="18" />
          {{ t().ui.downloadCvPdf }}
        </a>
      </section>
    </div>
  `,
  styles: `
    .band {
      background: var(--color-sky-soft);
    }

    .lead {
      max-width: var(--measure);
      margin: 0 0 var(--space-8);
      color: var(--color-text-body);
      font-size: var(--fs-md);
    }

    .channels {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin: 0 0 var(--space-8);
      padding: 0;
      list-style: none;
    }

    .channels a {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      min-height: var(--tap-min);
      color: var(--color-ink);
      font-size: var(--fs-md);
      font-weight: 600;
      text-underline-offset: 4px;
      /* Los mails largos cortan en vez de romper el ancho en 390px. */
      overflow-wrap: anywhere;
    }

    .channels a,
    .channels app-icon {
      transition:
        color var(--duration-fast) ease,
        translate var(--duration-base) var(--ease-out);
    }

    .channels a:hover app-icon {
      translate: 0 -2px;
    }

    .email {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: var(--space-2);
    }

    .copy {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--tap-min);
      height: var(--tap-min);
      padding: 0;
      border: 1.5px solid var(--color-border-cool);
      border-radius: var(--radius-pill);
      background: transparent;
      color: var(--color-ink);
      cursor: pointer;
      transition:
        background-color var(--duration-fast) ease,
        border-color var(--duration-fast) ease;
    }

    .copy:hover {
      border-color: var(--color-ink);
    }

    .copy.done {
      border-color: var(--color-ink);
      background: var(--color-ink);
      color: var(--color-bg);
    }

    .copied {
      color: var(--color-text-body);
      font-size: var(--fs-sm);
      font-weight: 600;
    }

    .channels a:hover {
      color: var(--color-link-hover);
    }

    .cv {
      width: 100%;
    }

    @media (min-width: 48rem) {
      .cv {
        width: auto;
      }
    }
  `,
})
export class ContactSection {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly profile = PROFILE;
  protected readonly cvPath = computed(() => CV_PATH[this.i18n.lang()]);
  protected readonly whatsappUrl = computed(
    () => `${PROFILE.whatsapp}?text=${encodeURIComponent(this.t().contact.whatsappMessage)}`,
  );

  /** true durante unos segundos después de copiar: cambia el ícono y avisa a lectores de pantalla. */
  protected readonly copied = signal(false);
  private copiedTimer?: ReturnType<typeof setTimeout>;

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      // Sin acceso al portapapeles moderno: método viejo con un textarea temporal.
      if (!copyWithTextarea(PROFILE.email)) return; // Queda el link mailto.
    }
    this.copied.set(true);
    clearTimeout(this.copiedTimer);
    this.copiedTimer = setTimeout(() => this.copied.set(false), 2500);
  }
}

/** Copia con document.execCommand: más viejo, pero funciona donde la API nueva está bloqueada. */
function copyWithTextarea(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.append(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  textarea.remove();
  return ok;
}
