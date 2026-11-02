import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';
import { en } from './core/i18n/en';
import { techIconsFor } from './ui/tech-icons';
import { es } from './core/i18n/es';
import { parseUrl, pagePath } from './core/i18n/paths';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the semantic skeleton (header, main, footer) and a skip link', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('header, app-site-header')).not.toBeNull();
    expect(root.querySelector('main#contenido')).not.toBeNull();
    expect(root.querySelector('app-site-footer')).not.toBeNull();
    expect(root.querySelector('a.skip-link')).not.toBeNull();
  });
});

describe('i18n paths', () => {
  it('parses Spanish and English URLs', () => {
    expect(parseUrl('/')).toEqual({ lang: 'es', page: { kind: 'home' } });
    expect(parseUrl('/en')).toEqual({ lang: 'en', page: { kind: 'home' } });
    expect(parseUrl('/proyectos/fotograma#x')).toEqual({
      lang: 'es',
      page: { kind: 'case', slug: 'fotograma' },
    });
    expect(parseUrl('/en/projects/la-mesa')).toEqual({
      lang: 'en',
      page: { kind: 'case', slug: 'la-mesa' },
    });
  });

  it('falls back to the home for unknown URLs', () => {
    expect(parseUrl('/proyectos/no-existe').page).toEqual({ kind: 'home' });
    expect(parseUrl('/en/proyectos/fotograma').page).toEqual({ kind: 'home' });
  });

  it('builds the equivalent page in the other language', () => {
    const page = { kind: 'case', slug: 'fotograma' } as const;
    expect(pagePath('es', page)).toBe('/proyectos/fotograma');
    expect(pagePath('en', page)).toBe('/en/projects/fotograma');
  });
});

describe('dictionaries', () => {
  it('keep the same structure in both languages', () => {
    // El tipo ya lo garantiza en compilación; esto cuida los arrays (mismo largo).
    expect(en.projects.medium.length).toBe(es.projects.medium.length);
    expect(en.projects.others.length).toBe(es.projects.others.length);
    expect(en.experience.jobs.length).toBe(es.experience.jobs.length);
    expect(en.stack.groups.length).toBe(es.stack.groups.length);
    for (const slug of Object.keys(es.cases) as (keyof typeof es.cases)[]) {
      expect(en.cases[slug].sections.length).toBe(es.cases[slug].sections.length);
      expect(en.cases[slug].facts.length).toBe(es.cases[slug].facts.length);
    }
  });

  it('never claims an English level above B2', () => {
    const text = JSON.stringify(en).toLowerCase();
    expect(text).not.toMatch(/fluent|bilingual|c1|advanced english/);
  });
});

describe('Logos de tecnologías', () => {
  const titles = (label: string) => techIconsFor(label).map((icon) => icon.title);

  it('suma un logo por cada parte unida con + o /', () => {
    expect(titles('Node.js + Express + Prisma')).toEqual(['Node.js', 'Express', 'Prisma']);
    expect(titles('Git / GitHub')).toEqual(['Git', 'GitHub']);
  });

  it('ignora lo que está entre paréntesis y las versiones', () => {
    expect(titles('Supabase (Postgres, RLS, Edge Functions)')).toEqual(['Supabase']);
    expect(titles('Angular 22')).toEqual(['Angular']);
  });

  it('no inventa logos para lo que no es una tecnología', () => {
    expect(titles('Inglés B2')).toEqual([]);
    expect(titles('Scrum y metodologías ágiles')).toEqual([]);
  });

  it('todas las tecnologías del stack tienen logo (salvo idiomas y metodologías)', () => {
    const sinLogo = es.stack.groups
      .flatMap((group) => group.items)
      .filter((item) => techIconsFor(item).length === 0);
    expect(sinLogo).toEqual(['Scrum y metodologías ágiles', 'UML', 'Español nativo', 'Inglés B2']);
  });
});
