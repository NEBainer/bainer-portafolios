/**
 * Capturas de los proyectos (en public/img/proyectos/): del celular de Ezequiel y de las que
 * le pasaron por WhatsApp (LA MESA, octubre 2026), de la demo (Aroma & Miga, productos destacados, y Fotograma).
 * Acá van la ruta y el tamaño real; el `alt` va en cada idioma.
 */
export const SHOTS = {
  // LA MESA: capturas del celular (sin barra de estado ni de navegación), todas 1:2.
  laMesaPortada: { src: '/img/proyectos/la-mesa-portada.webp', width: 480, height: 960 },
  laMesaAltaMesa: { src: '/img/proyectos/la-mesa-alta-mesa.webp', width: 480, height: 960 },
  laMesaQr: { src: '/img/proyectos/la-mesa-qr.webp', width: 480, height: 960 },
  laMesaMesas: { src: '/img/proyectos/la-mesa-mesas.webp', width: 480, height: 960 },
  laMesaChatMozo: { src: '/img/proyectos/la-mesa-chat-mozo.webp', width: 480, height: 960 },
  laMesaJuegos: { src: '/img/proyectos/la-mesa-juegos.webp', width: 480, height: 960 },
  laMesaAhorcado: { src: '/img/proyectos/la-mesa-ahorcado.webp', width: 480, height: 960 },
  laMesaMemotest: { src: '/img/proyectos/la-mesa-memotest.webp', width: 480, height: 960 },
  // Capturas de escritorio: cada una con un recorte para mobile (ver `Shot.mobile`).
  fotogramaButacas: {
    src: '/img/proyectos/fotograma-butacas.webp',
    width: 1336,
    height: 633,
    mobile: { src: '/img/proyectos/fotograma-butacas-mobile.webp', width: 560, height: 373 },
  },
  fotogramaCartelera: {
    src: '/img/proyectos/fotograma-cartelera.webp',
    width: 1366,
    height: 552,
    mobile: { src: '/img/proyectos/fotograma-cartelera-mobile.webp', width: 580, height: 387 },
  },
  aromaYMigaDestacados: {
    src: '/img/proyectos/aroma-y-miga-destacados.webp',
    width: 1365,
    height: 767,
    mobile: { src: '/img/proyectos/aroma-y-miga-destacados-mobile.webp', width: 730, height: 487 },
  },
} as const;

/** Desde dónde se usa el recorte de mobile (hasta antes del breakpoint de tablet, 48rem). */
export const MOBILE_MEDIA_QUERY = '(max-width: 47.99rem)';
