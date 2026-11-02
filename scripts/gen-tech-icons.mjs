// Genera src/app/ui/tech-icons.ts con los logos de Simple Icons (CC0) que usa la web.
// Uso: npm run icons
// Para sumar una tecnología: agregarla en ALIASES y volver a correr el comando.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const pkg = 'node_modules/simple-icons';
const out = 'src/app/ui/tech-icons.ts';

// Nombre en la web (en minúsculas) -> slug de Simple Icons.
// Un nombre matchea si el texto es igual o empieza con "nombre " (ej. "angular 22").
const ALIASES = {
  angular: 'angular',
  typescript: 'typescript',
  supabase: 'supabase',
  postgresql: 'postgresql',
  postgres: 'postgresql',
  sql: 'postgresql',
  html: 'html5',
  css: 'css',
  scss: 'sass',
  javascript: 'javascript',
  git: 'git',
  github: 'github',
  'node.js': 'nodedotjs',
  node: 'nodedotjs',
  express: 'express',
  prisma: 'prisma',
  python: 'python',
  fastapi: 'fastapi',
  ionic: 'ionic',
  capacitor: 'capacitor',
  java: 'openjdk',
  'spring boot': 'springboot',
  docker: 'docker',
  vercel: 'vercel',
  netlify: 'netlify',
  sentry: 'sentry',
  'claude code': 'claude',
  n8n: 'n8n',
  'conectores mcp': 'modelcontextprotocol',
  'mcp connectors': 'modelcontextprotocol',
  mysql: 'mysql',
  linux: 'linux',
  vitest: 'vitest',
  pwa: 'pwa',
};

const data = JSON.parse(readFileSync(join(pkg, 'data/simple-icons.json'), 'utf8'));
const list = Array.isArray(data) ? data : data.icons;

function slugOf(icon) {
  if (icon.slug) return icon.slug;
  return icon.title
    .toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/\./g, 'dot')
    .replace(/&/g, 'and')
    .normalize('NFD')
    .replace(/[^a-z0-9]/g, '');
}

function luminance(hex) {
  const c = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const f = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
}

const icons = {};
for (const slug of new Set(Object.values(ALIASES))) {
  const meta = list.find((i) => slugOf(i) === slug);
  if (!meta) throw new Error(`Sin datos para ${slug}`);
  const svg = readFileSync(join(pkg, 'icons', `${slug}.svg`), 'utf8');
  const path = svg.match(/<path d="([^"]+)"/)[1];
  const L = luminance(meta.hex);
  // Colores de marca muy oscuros o muy claros no se ven en los dos temas: esos quedan
  // del color del texto también en el hover.
  icons[slug] = { title: meta.title, path, hex: L < 0.05 || L > 0.8 ? null : `#${meta.hex}` };
}

const ts = `/* Archivo generado: no editar a mano.
 * Logos de Simple Icons (https://simpleicons.org, licencia CC0), solo los que usa la web.
 * Para sumar una tecnología: agregarla en ALIASES de scripts/gen-tech-icons.mjs y
 * correr npm run icons. Las marcas pertenecen a sus dueños; se usan solo para
 * identificar cada tecnología.
 */

export interface TechIcon {
  title: string;
  /** Path de 24×24. */
  path: string;
  /** Color de marca para el hover; null si no se vería en alguno de los dos temas. */
  hex: string | null;
}

export const TECH_ICONS: Record<string, TechIcon> = ${JSON.stringify(icons, null, 2)};

/** Nombre en la web (en minúsculas) -> clave de TECH_ICONS. */
const ALIASES: Record<string, string> = ${JSON.stringify(ALIASES, null, 2)};

/**
 * Logos para el texto de un tag. Lo que está entre paréntesis es detalle y no suma logos;
 * las partes unidas con "+", "/" o "," suman uno cada una.
 *   "Node.js + Express + Prisma"  -> Node.js, Express, Prisma
 *   "Supabase (Postgres, RLS)"    -> Supabase
 *   "Inglés B2"                   -> ninguno
 */
export function techIconsFor(label: string): TechIcon[] {
  const main = label.replace(/\\(.*?\\)/g, '').toLowerCase();
  const found: TechIcon[] = [];
  for (const part of main.split(/[+/,]/)) {
    const token = part.trim();
    const alias = Object.keys(ALIASES).find((key) => token === key || token.startsWith(key + ' '));
    const icon = alias ? TECH_ICONS[ALIASES[alias]] : undefined;
    if (icon && !found.includes(icon)) found.push(icon);
  }
  return found;
}
`;
writeFileSync(out, ts);
console.log(Object.keys(icons).length, 'iconos', Object.entries(icons).map(([k, v]) => `${k}:${v.hex}`).join(' '));
