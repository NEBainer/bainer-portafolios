import { DEMOS, PROFILE, REPOS } from '../links';
import { SHOTS } from '../media';
import { Dictionary } from './model';

/**
 * Textos en español. Fuente: docs/contenido.es.md (se cambia allá y acá a la vez).
 * Lo que está entre corchetes es un dato que falta y se ve así en la web.
 */
export const es: Dictionary = {
  lang: 'es',
  locale: 'es_AR',
  seo: {
    homeTitle: 'Ezequiel Bainer · Desarrollador Full Stack Junior',
    homeDescription:
      'Desarrollador Full Stack Junior en Buenos Aires. Proyectos con Angular, TypeScript, Supabase y PostgreSQL. Disponible para trabajo presencial, híbrido o remoto.',
    caseTitle: (name) => `${name}: caso de estudio · Ezequiel Bainer`,
    jobTitle: 'Desarrollador Full Stack Junior',
    ogImageAlt:
      'Ezequiel Bainer, Desarrollador Full Stack Junior, con su foto sobre un arco azul marino',
  },
  ui: {
    skipLink: 'Saltar al contenido',
    mainNav: 'Principal',
    footerNav: 'Perfiles y contacto',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    switchLang: { label: 'EN', hidden: 'English version' },
    downloadCvPdf: 'Descargar CV (PDF)',
    viewProjects: 'Ver proyectos',
    viewCase: 'Ver el caso',
    demo: 'Demo',
    repo: 'Repositorio',
    openDemo: 'Abrir la demo',
    backToProjects: 'Proyectos',
    otherProjectsLink: 'Ver otros proyectos',
    notFound: 'No encontré ese proyecto.',
    darkMode: 'Modo noche',
    screenshots: 'Capturas de pantalla',
    close: 'Cerrar',
    previousScreenshot: 'Captura anterior',
    nextScreenshot: 'Captura siguiente',
    copyEmail: 'Copiar mail',
    emailCopied: 'Mail copiado',
  },
  ids: {
    projects: 'proyectos',
    experience: 'experiencia',
    stack: 'stack',
    about: 'sobre-mi',
    contact: 'contacto',
  },
  nav: { projects: 'Proyectos', experience: 'Experiencia', contact: 'Contacto' },
  hero: {
    name: 'Ezequiel Bainer',
    role: 'Desarrollador Full Stack Junior',
    intro:
      'Construyo aplicaciones web con Angular, TypeScript y Supabase. Antes de programar trabajé en Higiene y Seguridad analizando procesos, y de ahí me quedó una costumbre: primero entiendo cómo trabaja la gente y después escribo el código.',
    facts: [
      { icon: 'map-pin', text: 'Lomas de Zamora, Buenos Aires' },
      { icon: 'briefcase', text: 'Presencial, híbrido o remoto' },
      { icon: 'graduation', text: 'Técnico en Programación, UTN: diciembre 2026' },
    ],
    photoAlt: 'Ezequiel Bainer sonriendo, con remera celeste',
  },
  projects: {
    heading: 'Proyectos',
    intro: 'En cada proyecto aclaro si fue individual o en equipo y cuál fue mi parte.',
    featured: {
      caseSlug: 'la-mesa',
      name: 'LA MESA',
      chips: ['En equipo de 4', 'Coordinación del equipo'],
      description:
        'App Android para gestionar un restaurante con pedidos por QR, de la mesa a la cocina. Es el trabajo final de la carrera.',
      bullets: [
        'Armé el repositorio y el flujo de ramas, e hice 14 de los 43 merges del equipo.',
        'Desarrollé el chat en tiempo real entre cliente y mozo, y las notificaciones.',
        'Programé los juegos con descuento, validados con funciones SQL y cubiertos con tests unitarios.',
      ],
      tags: ['Ionic', 'Angular', 'Supabase', 'Capacitor'],
      repo: REPOS.laMesa,
      note: 'Es una app Android: no tiene demo web.',
      media: [
        { ...SHOTS.laMesaMesas, alt: 'Gestión de mesas: listado con foto, comensales y estado' },
        {
          ...SHOTS.laMesaPortada,
          alt: 'Pantalla de inicio de LA MESA con el logo y los integrantes del equipo',
        },
        { ...SHOTS.laMesaJuegos, alt: 'Listado de juegos con el descuento de cada uno y si ya se jugó' },
      ],
    },
    medium: [
      {
        caseSlug: 'fotograma',
        name: 'Fotograma',
        chips: ['Individual'],
        description:
          'Venta de entradas para un cine: butacas en tiempo real sin venta doble, seguridad en la base de datos y entradas con QR de un solo uso.',
        tags: ['Angular', 'Supabase', 'PWA'],
        demo: DEMOS.fotograma,
        repo: REPOS.fotograma,
        media: [
          {
            ...SHOTS.fotogramaCartelera,
            alt: 'Cartelera de Fotograma: las tres películas más elegidas, buscador y filtros por género',
          },
        ],
      },
      {
        name: 'Aroma & Miga',
        chips: ['Individual'],
        description:
          'Sitio responsive para una cafetería ficticia: catálogo con filtros combinables, búsqueda con debounce, orden, paginación y tema claro u oscuro.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        demo: DEMOS.aromaYMiga,
        repo: REPOS.aromaYMiga,
        media: [
          { ...SHOTS.aromaYMigaDestacados, alt: 'Productos destacados de Aroma & Miga: flat white, cheesecake y wrap vegetariano' },
        ],
      },
    ],
    othersHeading: 'Otros proyectos',
    others: [
      {
        name: 'GigaShop',
        summary: 'Desarrollé el backend (API REST con Node, Express y Prisma), en equipo de 2.',
        href: REPOS.gigashop,
      },
      {
        name: 'App de promedio de cursada',
        summary:
          'Desarrollé el backend con FastAPI, el Dockerfile y el envío de errores a Sentry, en equipo de 4.',
        href: REPOS.promedio,
      },
      {
        name: 'Sistema de reservas',
        summary:
          'Armé una API REST de práctica con Spring Boot: capas, DTOs, validaciones y manejo de errores.',
        href: REPOS.reservas,
      },
    ],
    seeAll: 'Ver todo en GitHub',
  },
  cases: {
    fotograma: {
      name: 'Fotograma',
      summary:
        'Sistema web para un cine: venta de entradas con butacas en tiempo real, roles con permisos en la base de datos y un panel de administración.',
      facts: [
        { term: 'Equipo', detail: 'Individual' },
        { term: 'Cuándo', detail: 'Septiembre a octubre 2026' },
        { term: 'Contexto', detail: 'Trabajo práctico de Programación IV, UTN' },
        { term: 'Commits', detail: '27, todos propios' },
      ],
      demo: DEMOS.fotograma,
      repo: REPOS.fotograma,
      media: [
        {
          ...SHOTS.fotogramaButacas,
          alt: 'Selección de butacas de Fotograma: mapa de la sala con butacas libres, accesibles y VIP, que se actualiza en tiempo real',
        },
        {
          ...SHOTS.fotogramaCartelera,
          alt: 'Cartelera de Fotograma: las tres películas más elegidas, buscador y filtros por género',
        },
      ],
      sections: [
        {
          kind: 'text',
          heading: 'El problema',
          text: 'Un cine necesita vender entradas online sin que dos personas compren la misma butaca, controlar el acceso en la puerta y que cada rol (cliente, empleado, administrador) vea solo lo que le corresponde.',
        },
        {
          kind: 'list',
          heading: 'Qué construí',
          items: [
            'Selección de butacas en tiempo real que evita la venta doble.',
            'Compra registrada o anónima, candy bar y combos, puntos, crédito y cupones.',
            'Entradas con QR de un solo uso y PDF, validadas por cámara desde el perfil de empleado.',
            'Panel de administración: películas, funciones con sala asignada automáticamente, precios y reportes en PDF y Excel.',
            'PWA con notificaciones push de estrenos.',
          ],
        },
        {
          kind: 'cards',
          heading: 'Decisiones técnicas',
          cards: [
            {
              title: 'La seguridad vive en la base de datos',
              text: 'Los permisos de cada rol están en Row Level Security de Postgres. Los guards de Angular solo controlan la navegación: aunque alguien los saltee, la base no le devuelve datos ajenos.',
            },
            {
              title: 'Butacas sincronizadas con Realtime',
              text: 'Cada cliente ve en vivo las butacas que toman los demás, con Supabase Realtime.',
            },
            {
              title: 'Requisitos y decisiones documentados',
              text: 'El repo documenta 42 requisitos y 14 decisiones técnicas, cada decisión con las alternativas que evalué.',
            },
          ],
        },
        {
          kind: 'tags',
          heading: 'Stack',
          tags: [
            'Angular 22',
            'TypeScript',
            'Signals',
            'Supabase Auth',
            'Postgres + RLS',
            'Realtime',
            'Storage',
            'Edge Functions',
            'PWA',
            'Vitest',
            'Vercel',
          ],
        },
        {
          kind: 'list',
          heading: 'Qué haría distinto',
          items: [
            'Probaría el diseño en celular desde el primer día: hoy, en pantallas angostas, la cartelera se corta a la derecha.',
            'Pensaría desde el principio en cómo mantener viva la demo. Al entregar el trabajo práctico, las funciones estaban cargadas a mano y se vencían; después agregué una tarea programada en la base (pg_cron) que todos los días crea las funciones de las próximas semanas.',
          ],
        },
      ],
    },
    'la-mesa': {
      name: 'LA MESA',
      summary:
        'App Android para gestionar un restaurante de punta a punta (ingreso, mesa, pedido, cocina y bar, juegos, encuesta y pago) con 7 perfiles: dueño, supervisor, metre, mozo, cocinero, cantinero y cliente.',
      facts: [
        {
          term: 'Equipo',
          detail:
            '4 integrantes (Ezequiel Bainer, Maximiliano Arcieri, Noelia Storgato, Lucía Cicchelli)',
        },
        { term: 'Mi rol', detail: 'Coordinación y desarrollo' },
        { term: 'Contexto', detail: 'Trabajo Final Integrador, UTN' },
        { term: 'Desde', detail: 'Agosto 2026, entregas semanales' },
      ],
      repo: REPOS.laMesa,
      note: 'Es una app Android: no tiene demo web.',
      media: [
        {
          ...SHOTS.laMesaPortada,
          alt: 'Pantalla de inicio de LA MESA con el logo y los integrantes del equipo',
        },
        {
          ...SHOTS.laMesaAltaMesa,
          alt: 'Alta de mesa: número, comensales, tipo de mesa y foto sacada con la cámara',
        },
        { ...SHOTS.laMesaQr, alt: 'Mesa creada con su código QR para que el cliente la escanee' },
        { ...SHOTS.laMesaMesas, alt: 'Gestión de mesas: listado con foto, comensales y estado' },
        { ...SHOTS.laMesaChatMozo, alt: 'Chat de consulta en tiempo real visto por el mozo' },
        { ...SHOTS.laMesaJuegos, alt: 'Listado de juegos con el descuento de cada uno y si ya se jugó' },
        { ...SHOTS.laMesaAhorcado, alt: 'Ahorcado en juego: letras acertadas en verde y erradas en rojo' },
        { ...SHOTS.laMesaMemotest, alt: 'Memotest en juego, con fotos de platos de la carta' },
      ],
      sections: [
        {
          kind: 'list',
          heading: 'Coordinación',
          items: [
            'Creé y administré el repositorio.',
            'Definí el flujo de ramas: una por integrante, integración en dev y versión estable en main.',
            'Integré el trabajo del equipo: hice 14 de los 43 merges, más que cualquier otro integrante.',
            'Mantuve actualizado el README con el estado de avance, los módulos de cada integrante, capturas y el modelo de datos.',
          ],
        },
        {
          kind: 'list',
          heading: 'Qué desarrollé',
          items: [
            'Alta y gestión de mesas: formulario con foto por cámara, generación de QR, validaciones y acceso restringido por perfil.',
            'Chat en tiempo real cliente–mozo y bandeja del mozo con las consultas sin responder.',
            'Validación de que el QR escaneado corresponda a la mesa asignada.',
            'Notificaciones para el dueño o supervisor, los mozos y los clientes.',
            'Juegos con descuento (ahorcado 10 %, memotest 15 %, trivia 20 %), solo en el primer intento: tabla de intentos y funciones SQL que validan y calculan el descuento, con tests unitarios.',
          ],
        },
        {
          kind: 'text',
          heading: 'Lo hicieron mis compañeros',
          text: 'Esquema inicial, autenticación y RLS, alta de empleados, asignación de mesa, login y registro, escaneo de DNI, mails, encuesta, cuenta, carta, pedidos y cocina/bar.',
        },
        {
          kind: 'tags',
          heading: 'Stack',
          tags: [
            'Ionic',
            'Angular',
            'TypeScript',
            'Capacitor',
            'ML Kit',
            'Supabase (Postgres, RLS, Edge Functions)',
            'Vitest',
          ],
        },
        {
          kind: 'list',
          heading: 'Qué haría distinto',
          items: [
            'Sumaría tests a más módulos: hoy solo la lógica de los juegos tiene tests unitarios, y los flujos de pedido y pago también los necesitan.',
            'Prepararía desde el principio una forma de mostrarla sin instalarla, como un video corto: al ser una app Android, cuesta presentarla en una entrevista.',
          ],
        },
      ],
    },
  },
  experience: {
    heading: 'Experiencia',
    jobs: [
      {
        company: 'AgentesAI',
        role: 'Análisis de procesos y desarrollo de agentes de IA',
        period: 'Septiembre 2026 – actualidad',
        mode: 'Híbrido, part-time',
        context:
          'Consultora de automatización con IA. Proyecto para un cliente del sector de insumos hospitalarios.',
        bullets: [
          'Relevé los procesos de Administración, Compras, Comercial y Operaciones con entrevistas al personal y a la dirección.',
          'Los documenté como procedimientos operativos estándar (SOPs) con roles, responsables y herramientas por paso, y los validé con los usuarios.',
          'Analicé el ERP del cliente (API REST de más de 170 endpoints y conector MCP) para definir qué se podía integrar o automatizar.',
          'Probé el acceso a los datos del ERP con IA mediante un conector MCP de solo lectura, para generar reportes y cruces automáticos.',
          'Definí qué automatizar y con qué prioridad para la etapa de desarrollo.',
        ],
      },
      {
        company: 'Lihué Ingeniería S.A.',
        role: 'Analista de Higiene y Seguridad',
        period: 'Febrero 2025 – septiembre 2026',
        bullets: [
          'Elaboré matrices de riesgo, análisis de procesos y documentación técnica.',
          'Capacité al personal y trabajé en coordinación con equipos multidisciplinarios.',
          'Participé en iniciativas de mejora continua de procesos.',
        ],
      },
    ],
  },
  stack: {
    heading: 'Con qué trabajo',
    groups: [
      {
        title: 'Lo uso en mis proyectos',
        items: [
          'Angular',
          'TypeScript',
          'Supabase',
          'PostgreSQL / SQL',
          'HTML',
          'CSS / SCSS',
          'JavaScript',
          'Git / GitHub',
        ],
      },
      {
        title: 'Lo usé en proyectos o trabajos prácticos',
        items: [
          'Node.js + Express + Prisma',
          'Python + FastAPI',
          'Ionic + Capacitor',
          'Java 17',
          'Spring Boot',
          'Docker',
          'Vercel',
          'Netlify',
          'Sentry',
        ],
      },
      {
        title: 'Herramientas de IA y automatización',
        items: ['Claude Code', 'n8n', 'Conectores MCP'],
      },
      {
        title: 'Formación académica',
        items: ['MySQL', 'Linux', 'Scrum y metodologías ágiles', 'UML'],
      },
      { title: 'Idiomas', items: ['Español nativo', 'Inglés B2'] },
    ],
  },
  about: {
    heading: 'Sobre mí',
    paragraphs: [
      'Me recibí de Licenciado en Higiene y Seguridad en 2021 y trabajé en el área analizando procesos, armando documentación técnica y capacitando equipos. Ahí aprendí a mirar cómo trabaja la gente y a encontrar lo que se hace a mano y podría hacerse mejor.',
      'Hoy estoy terminando la Tecnicatura en Programación en la UTN y llevo esa mirada al software: primero entender el problema real y después escribir código prolijo y documentado.',
      'Fuera de la compu me gusta entrenar y salir a andar en bicicleta.',
    ],
    photoAlt: 'Ezequiel andando en bicicleta al aire libre, con el cielo celeste de fondo',
  },
  contact: {
    heading: 'Contacto',
    text: 'Estoy buscando mi primer puesto como desarrollador full stack. Para una búsqueda abierta o una entrevista, estos son mis datos de contacto.',
    email: PROFILE.email,
    phone: '+54 11 3602-8457',
    phoneLabel: 'Llamar al +54 11 3602-8457',
    whatsapp: 'Mensaje por WhatsApp',
    whatsappMessage: 'Hola, Ezequiel. Vi tu portfolio y quería contactarte.',
  },
  footer: { location: 'Buenos Aires, Argentina' },
};
