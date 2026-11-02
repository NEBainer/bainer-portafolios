import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { en } from './i18n/en';
import { es } from './i18n/es';
import { Dictionary, Lang } from './i18n/model';
import { SiteRoute, pagePath } from './i18n/paths';
import { PROFILE, SITE_URL } from './links';

const LANGS: Lang[] = ['es', 'en'];

/**
 * Escribe el <head> de cada página: lang, title, description, Open Graph,
 * canonical, hreflang y datos estructurados `Person`.
 * Corre durante el prerender, así que todo queda en el HTML estático
 * (lo que leen Google y la vista previa de LinkedIn).
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  apply({ lang, page }: SiteRoute): void {
    const t: Dictionary = lang === 'es' ? es : en;
    const caseStudy = page.kind === 'case' ? t.cases[page.slug] : null;

    const title = caseStudy ? t.seo.caseTitle(caseStudy.name) : t.seo.homeTitle;
    const description = caseStudy ? caseStudy.summary : t.seo.homeDescription;
    const url = absolute(pagePath(lang, page));

    this.document.documentElement.lang = lang;
    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:type', content: caseStudy ? 'article' : 'profile' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Ezequiel Bainer' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: t.locale });
    // Imagen de la vista previa al compartir el link (LinkedIn, WhatsApp, Slack…).
    // JPG y no WebP: algunas plataformas no muestran WebP en la vista previa.
    const image = absolute(`/og/og-${lang}.jpg`);
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: t.seo.ogImageAlt });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setLink({ rel: 'canonical' }, url);
    for (const alt of LANGS) {
      this.setLink({ rel: 'alternate', hreflang: alt }, absolute(pagePath(alt, page)));
    }
    this.setLink({ rel: 'alternate', hreflang: 'x-default' }, absolute(pagePath('es', page)));

    this.setPersonJsonLd(page.kind === 'home' ? t : null);
  }

  /** Crea o actualiza un <link> identificado por sus atributos. */
  private setLink(attrs: Record<string, string>, href: string): void {
    const selector = Object.entries(attrs)
      .map(([key, value]) => `[${key}="${value}"]`)
      .join('');
    let link = this.document.head.querySelector<HTMLLinkElement>(`link${selector}`);
    if (!link) {
      link = this.document.createElement('link');
      for (const [key, value] of Object.entries(attrs)) link.setAttribute(key, value);
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  /** Datos estructurados solo en la home; en los casos se sacan. */
  private setPersonJsonLd(t: Dictionary | null): void {
    const id = 'person-jsonld';
    let script = this.document.getElementById(id);
    if (!t) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ezequiel Bainer',
      alternateName: 'Nicolás Ezequiel Bainer',
      jobTitle: t.seo.jobTitle,
      url: absolute(pagePath(t.lang, { kind: 'home' })),
      email: `mailto:${PROFILE.email}`,
      telephone: PROFILE.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lomas de Zamora',
        addressRegion: 'Buenos Aires',
        addressCountry: 'AR',
      },
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Universidad Tecnológica Nacional' },
        { '@type': 'CollegeOrUniversity', name: 'Universidad de Morón' },
      ],
      sameAs: [PROFILE.github, PROFILE.linkedin],
    });
  }
}

function absolute(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
