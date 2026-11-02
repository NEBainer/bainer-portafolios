/**
 * Capturas de los proyectos (en public/img/proyectos/): del celular de Ezequiel y de las que
 * le pasaron por WhatsApp (LA MESA, octubre 2026), del README (Aroma & Miga) y de la demo (Fotograma).
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
  fotogramaButacas: { src: '/img/proyectos/fotograma-butacas.webp', width: 1336, height: 633 },
  fotogramaCartelera: { src: '/img/proyectos/fotograma-cartelera.webp', width: 1366, height: 552 },
  aromaYMigaCatalogo: { src: '/img/proyectos/aroma-y-miga-catalogo.webp', width: 1200, height: 673 },
} as const;
