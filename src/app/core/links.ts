/**
 * URLs que no cambian con el idioma. Viven en un solo lugar para que
 * el español y el inglés no puedan apuntar a links distintos.
 */
export const SITE_URL = 'https://ezequielbainer.com.ar';

export const PROFILE = {
  github: 'https://github.com/NEBainer',
  linkedin: 'https://linkedin.com/in/ezequielbainer',
  email: 'ezzebainer@hotmail.com',
  /** Formato E.164 para el link tel: (sin espacios ni guiones). */
  phone: '+541136028457',
  /** WhatsApp en Argentina: celulares con 9 después del 54 y sin el 15. */
  whatsapp: 'https://wa.me/5491136028457',
} as const;

/** Se exportan desde los .docx de la raíz (español con foto, inglés sin foto). */
export const CV_PATH = {
  es: '/cv-nicolas-ezequiel-bainer.pdf',
  en: '/cv-nicolas-ezequiel-bainer-en.pdf',
} as const;

export const REPOS = {
  laMesa: 'https://github.com/NEBainer/losjuniors-2026',
  fotograma: 'https://github.com/NEBainer/Ezequiel-Bainer-tp1-prog4-2026-c2',
  gigashop: 'https://github.com/NEBainer/BainerCichelli.TP',
  promedio: 'https://github.com/NEBainer/proyecto-promedio',
  reservas: 'https://github.com/NEBainer/sistema-reservas-springboot',
  aromaYMiga: 'https://github.com/NEBainer/aroma-y-miga-website',
} as const;

export const DEMOS = {
  fotograma: 'https://ezequiel-bainer-tp1-prog4-2026-c2.vercel.app',
  aromaYMiga: 'https://nebainer.github.io/aroma-y-miga-website/',
} as const;
