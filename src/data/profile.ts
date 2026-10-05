import type { Locale } from '../i18n/ui';

/**
 * Contenido del sitio. Regla: cada afirmación debe poder rastrearse a
 * ../../audit/ (auditoría 2026-10-03 y evidencia local). Si no está allí, no va aquí.
 */

export type Evidence = 'verified' | 'lab' | 'ai' | 'academic' | 'private';

export const evidenceLabel: Record<Locale, Record<Evidence, string>> = {
  es: { verified: 'verificado', lab: 'laboratorio', ai: 'con IA', academic: 'académico', private: 'privado' },
  en: { verified: 'verified', lab: 'lab', ai: 'AI-built', academic: 'coursework', private: 'private' },
};

type L<T> = Record<Locale, T>;

export const person = {
  name: 'Guillermo Rentería Hernández',
  shortName: 'Guillermo Rentería',
  location: L_({ es: 'Torreón, Coahuila, México', en: 'Torreón, Coahuila, Mexico' }),
  github: 'https://github.com/RenteriaH',
  linkedin: 'https://www.linkedin.com/in/guillermo-renteria-9263052a6/',
  /** PENDIENTE: correo profesional personal. No se usa el correo corporativo. */
  email: null as string | null,
};

function L_<T>(v: L<T>): L<T> {
  return v;
}

export interface Project {
  id: string;
  title: L<string>;
  oneLiner: L<string>;
  problem: L<string>;
  solution: L<string>;
  role: L<string>;
  status: L<string>;
  stack: string[];
  evidence: Evidence[];
  facts: L<string[]>;
  caseSlug?: string;
  repo?: string;
  /** Código visible sin sesión. Solo true tras comprobarlo de forma anónima. */
  public?: boolean;
}

export const projects: Project[] = [
  {
    id: 'ecomos',
    title: L_({ es: 'EcomOS', en: 'EcomOS' }),
    oneLiner: L_({
      es: 'Sistema propio para operar una tienda de dropshipping: catálogo, proveedor, precios, anuncios y un panel de control.',
      en: 'My own system to run a dropshipping store: catalog, supplier, pricing, ads and a control panel.',
    }),
    problem: L_({
      es: 'Automatizar una operación de e-commerce sin que la automatización publique, gaste o borre nada sin permiso.',
      en: 'Automate an e-commerce operation without letting automation publish, spend or delete anything unapproved.',
    }),
    solution: L_({
      es: 'Integraciones con Shopify, Meta, Zendrop y TikTok detrás de puertas de escritura (simulación, aprobación, respaldo y relectura); servidores MCP con lista de herramientas permitidas; despliegue por versiones con reversión.',
      en: 'Shopify, Meta, Zendrop and TikTok integrations behind write gates (dry run, approval, backup, readback); MCP servers with a tool allowlist; versioned releases with rollback.',
    }),
    role: L_({
      es: 'Arquitectura, criterios de aceptación y revisión. El código lo escribieron agentes de IA (Claude Code y Codex) bajo mi dirección.',
      en: 'Architecture, acceptance criteria and review. The code was written by AI agents (Claude Code and Codex) under my direction.',
    }),
    // Despliegue VERIFICADO por el informe del repo (ago 2026); el estado actual del VPS no se consultó.
    status: L_({ es: 'Desplegado en un VPS Linux propio', en: 'Deployed on my own Linux VPS' }),
    stack: ['Python', 'FastAPI', 'Node.js', 'MCP', 'Shopify GraphQL', 'Meta Graph API', 'systemd', 'Docker', 'PostgreSQL', 'pytest'],
    evidence: ['ai', 'private'],
    facts: L_({
      es: [
        '117 commits entre julio y septiembre de 2026',
        'Alrededor de 3,900 pruebas automatizadas en Python, más pruebas en Node',
        '27 unidades systemd y scripts de despliegue y reversión',
      ],
      en: [
        '117 commits between July and September 2026',
        'About 3,900 automated Python tests, plus Node tests',
        '27 systemd units and release/rollback scripts',
      ],
    }),
  },
  {
    // Fuente: audit/github_repos.md (repo privado). Sin resultados financieros: no se publican.
    id: 'qce',
    title: L_({ es: 'QCE — motor de datos de mercado', en: 'QCE — market data engine' }),
    oneLiner: L_({
      es: 'Sistema en Python que ingiere datos de mercado de criptomonedas en tiempo real, los guarda, los valida y exige aprobación humana antes de cualquier operación.',
      en: 'Python system that ingests real-time crypto market data, stores and validates it, and requires human approval before any operation.',
    }),
    problem: L_({
      es: 'Investigar si una idea funciona sin engañarse con los datos, y que ningún proceso automático pueda actuar sin control.',
      en: 'Test whether an idea works without fooling yourself with the data, and make sure no automated process can act unchecked.',
    }),
    solution: L_({
      es: 'Ingesta REST y WebSocket, almacenamiento en Parquet y DuckDB, registro contable decimal exacto, separación estricta entre investigación y producción, servicios gestionados con systemd y una puerta de aprobación humana.',
      en: 'REST and WebSocket ingestion, Parquet and DuckDB storage, an exact decimal ledger, strict research/production separation, systemd-managed services and a human approval gate.',
    }),
    role: L_({
      es: 'Arquitectura, reglas de riesgo y criterios de validación. Código escrito mayormente con agentes de IA bajo mi dirección y revisión.',
      en: 'Architecture, risk rules and validation criteria. Code written mostly by AI agents under my direction and review.',
    }),
    status: L_({ es: 'En desarrollo activo (sep–oct 2026)', en: 'In active development (Sep–Oct 2026)' }),
    stack: ['Python', 'WebSockets', 'REST', 'DuckDB', 'Parquet', 'pydantic', 'FastAPI', 'React', 'systemd', 'pytest', 'mypy'],
    evidence: ['ai', 'private'],
    facts: L_({
      es: [
        '408 commits en un mes',
        'Alrededor de 4,000 pruebas en Python más 82 en el frontend (Vitest)',
        'Verificación de tipos con mypy y análisis estático con ruff',
      ],
      en: [
        '408 commits in one month',
        'About 4,000 Python tests plus 82 frontend tests (Vitest)',
        'Type checking with mypy and static analysis with ruff',
      ],
    }),
  },
  {
    id: 'feed-doctor',
    title: L_({ es: 'Shopify Feed Doctor', en: 'Shopify Feed Doctor' }),
    oneLiner: L_({
      es: 'Herramienta web que convierte el CSV de un proveedor al formato de importación de Shopify.',
      en: 'Web tool that maps a supplier CSV to Shopify’s import format.',
    }),
    problem: L_({
      es: 'Mapear columnas automáticamente es fácil; saber cuándo el mapeo está mal es lo difícil.',
      en: 'Mapping columns automatically is easy; knowing when the mapping is wrong is the hard part.',
    }),
    solution: L_({
      es: 'Un motor de puntuación más una capa de «falsación» que solo puede bajar la confianza de un mapeo, nunca subirla. Probado contra paquetes ciegos de datos.',
      en: 'A scoring engine plus a “falsification” layer that can only lower a mapping’s confidence, never raise it. Tested against blind data packs.',
    }),
    role: L_({
      es: 'Diseño del método de validación y dirección del desarrollo, en parte con IA.',
      en: 'Designed the validation method and directed development, partly AI-assisted.',
    }),
    status: L_({ es: 'Versión 1.0.1 publicada como etiqueta', en: 'v1.0.1 tagged' }),
    stack: ['TypeScript', 'Vite', 'Vitest', 'ESLint'],
    evidence: ['private'],
    facts: L_({
      es: ['44 commits, etiquetas v1.0.0 y v1.0.1', 'Unos 150 casos de prueba con Vitest', 'Sin backend: todo corre en el navegador'],
      en: ['44 commits, tags v1.0.0 and v1.0.1', 'About 150 Vitest test cases', 'No backend: everything runs in the browser'],
    }),
  },
  {
    id: 'tsf',
    title: L_({ es: 'Pipeline de video para TikTok', en: 'TikTok video pipeline' }),
    oneLiner: L_({
      es: 'Render vertical con ffmpeg, clientes de las APIs oficiales de TikTok y una puerta humana antes de publicar.',
      en: 'Vertical rendering with ffmpeg, clients for TikTok’s official APIs, and a human gate before publishing.',
    }),
    problem: L_({
      es: 'Producir video corto a escala sin publicar nada que no tenga derechos ni revisión humana.',
      en: 'Produce short video at scale without publishing anything lacking rights or human review.',
    }),
    solution: L_({
      es: 'Render 1080×1920, control de derechos, publicador simulado por defecto y clientes de Content Posting y Shop API con firma de peticiones.',
      en: '1080×1920 rendering, rights checks, a mock publisher by default, and Content Posting and Shop API clients with request signing.',
    }),
    role: L_({ es: 'Diseño y dirección; código escrito con agentes de IA.', en: 'Design and direction; code written with AI agents.' }),
    status: L_({
      es: 'Sin publicaciones reales: espera la autorización de la API de TikTok',
      en: 'No real posts yet: waiting on TikTok API approval',
    }),
    stack: ['Python', 'ffmpeg', 'Pillow', 'OAuth', 'REST'],
    evidence: ['ai', 'private'],
    facts: L_({
      es: ['Unas 780 pruebas automatizadas', 'Despliegue por versiones con sha256 y reversión'],
      en: ['About 780 automated tests', 'Versioned deploys with sha256 and rollback'],
    }),
  },
  {
    id: 'level10',
    title: L_({ es: 'LEVEL 10 — juego web', en: 'LEVEL 10 — web game' }),
    oneLiner: L_({
      es: 'Juego tipo runner con un núcleo independiente del motor y adaptadores para web y Cocos Creator.',
      en: 'Runner game with an engine-agnostic core and adapters for web and Cocos Creator.',
    }),
    problem: L_({
      es: 'Escribir la lógica del juego una sola vez y poder llevarla a distintas plataformas.',
      en: 'Write the game logic once and be able to ship it to different platforms.',
    }),
    solution: L_({
      es: 'Monorepo en TypeScript con el núcleo separado de la presentación, y CI en GitHub Actions sobre Ubuntu y Windows con Node 20 y 24.',
      en: 'TypeScript monorepo with the core separated from presentation, and GitHub Actions CI on Ubuntu and Windows with Node 20 and 24.',
    }),
    role: L_({ es: 'Diseño y dirección; código escrito con agentes de IA.', en: 'Design and direction; code written with AI agents.' }),
    status: L_({ es: 'No publicado en tiendas', en: 'Not published to stores' }),
    stack: ['TypeScript', 'Node.js', 'GitHub Actions'],
    evidence: ['ai', 'private'],
    facts: L_({
      es: ['86 pruebas, 84 pasan fuera del repositorio (2 requieren git)', 'CI en matriz de 2 sistemas × 2 versiones de Node'],
      en: ['86 tests, 84 pass outside the repo (2 need git)', 'CI on a 2 OS × 2 Node version matrix'],
    }),
  },
];

projects.unshift({
  // Código público en un repositorio nuevo, sin el historial anterior (verificado sin sesión el 2026-10-04).
  id: 'gymwarrior',
  title: L_({ es: 'GYMWARRIOR — tienda en PHP y MySQL', en: 'GYMWARRIOR — PHP and MySQL store' }),
  oneLiner: L_({
    es: 'Tienda web académica con catálogo, registro, carrito, pago de prueba con PayPal y panel de inventario.',
    en: 'Academic web store with catalog, sign-up, cart, PayPal sandbox checkout and an inventory dashboard.',
  }),
  problem: L_({
    es: 'Un proyecto de 2024 que funcionaba, pero con inyección SQL, subidas sin validar y datos de usuarios en el repositorio.',
    en: 'A 2024 project that worked, but had SQL injection, unvalidated uploads and user data in the repository.',
  }),
  solution: L_({
    es: 'Saneamiento en 2026: consultas preparadas, CSRF, validación de subidas, compra en transacción, configuración por entorno y datos ficticios. Pruebas de punta a punta que fallan en la versión original y pasan en la corregida.',
    en: '2026 hardening: prepared statements, CSRF, upload validation, transactional checkout, environment-based config and fictional data. End-to-end tests that fail on the original and pass on the fix.',
  }),
  role: L_({
    es: 'Desarrollo original en la escuela; saneamiento, pruebas y documentación en 2026 con asistencia de IA.',
    en: 'Original build at school; hardening, tests and documentation in 2026 with AI assistance.',
  }),
  status: L_({ es: 'Código público', en: 'Public code' }),
  stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Playwright'],
  evidence: ['academic', 'verified'],
  caseSlug: 'saneamiento-gymwarrior',
  repo: 'https://github.com/RenteriaH/GYMWARRIOR',
  public: true,
  facts: L_({
    es: ['13 de 13 pruebas de punta a punta pasan (10 fallaban en la versión original)', 'Diez problemas de seguridad corregidos y documentados'],
    en: ['13 of 13 end-to-end tests pass (10 failed on the original)', 'Ten security issues fixed and documented'],
  }),
});


// Proyectos con código público (verificado sin sesión el 2026-10-04).
projects.splice(1, 0, {
  id: 'portfolio',
  title: L_({ es: 'Portafolio profesional', en: 'Professional portfolio' }),
  oneLiner: L_({
    es: 'Este sitio: bilingüe, estático y con pruebas en cada cambio.',
    en: 'This site: bilingual, static and tested on every change.',
  }),
  problem: L_({
    es: 'Presentar trabajo real sin exponer sistemas privados ni datos de la empresa.',
    en: 'Showing real work without exposing private systems or company data.',
  }),
  solution: L_({
    es: 'Astro con contenido tipado, una prueba que bloquea términos confidenciales, pruebas e2e en tres anchos y despliegue continuo en GitHub Pages.',
    en: 'Astro with typed content, a test that blocks confidential terms, end-to-end tests at three widths and continuous deployment to GitHub Pages.',
  }),
  role: L_({ es: 'Diseño, contenido y revisión; código escrito con agentes de IA.', en: 'Design, content and review; code written with AI agents.' }),
  status: L_({ es: 'En producción', en: 'Live' }),
  stack: ['Astro', 'TypeScript', 'Vitest', 'Playwright', 'GitHub Actions'],
  evidence: ['verified', 'ai'],
  repo: 'https://github.com/RenteriaH/RenteriaH.github.io',
  public: true,
  facts: L_({
    es: ['Lighthouse 100 en accesibilidad y SEO', 'Rendimiento móvil 99–100 (mediana de 3)'],
    en: ['Lighthouse 100 for accessibility and SEO', 'Mobile performance 99–100 (median of 3)'],
  }),
});
projects.push({
  id: 'spotify',
  title: L_({ es: 'Cliente Android de Spotify', en: 'Spotify Android client' }),
  oneLiner: L_({
    es: 'App en Kotlin y Jetpack Compose que consume 28 endpoints de la Web API de Spotify, con OAuth y reproducción.',
    en: 'Kotlin and Jetpack Compose app consuming 28 Spotify Web API endpoints, with OAuth and playback.',
  }),
  problem: L_({
    es: 'Explorar el catálogo y la biblioteca de un usuario con un token que caduca, sin exponer credenciales.',
    en: 'Browsing a user’s catalog and library with an expiring token, without exposing credentials.',
  }),
  solution: L_({
    es: 'Servicios Retrofit, inyección con Hilt, renovación del token y credenciales fuera del código (local.properties).',
    en: 'Retrofit services, Hilt injection, token refresh and credentials kept out of the code (local.properties).',
  }),
  role: L_({ es: 'Proyecto académico propio; saneado en 2026.', en: 'Own coursework project; hardened in 2026.' }),
  status: L_({ es: 'Código público con instrucciones', en: 'Public code with instructions' }),
  stack: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Hilt'],
  evidence: ['academic'],
  repo: 'https://github.com/RenteriaH/Spotify-API-Public',
  public: true,
  facts: L_({ es: [], en: [] }),
});
projects.push({
  id: 'racing',
  title: L_({ es: 'Simulador de carreras 2D', en: '2D racing simulator' }),
  oneLiner: L_({
    es: 'Juego en Python con pistas generadas a partir de imágenes y colisiones por máscara.',
    en: 'Python game with tracks generated from images and mask-based collisions.',
  }),
  problem: L_({
    es: 'Detectar con precisión cuándo un coche sale de una pista de forma irregular.',
    en: 'Detecting precisely when a car leaves an irregularly shaped track.',
  }),
  solution: L_({
    es: 'Máscaras de píxeles para las colisiones y sensores de distancia para el coche.',
    en: 'Pixel masks for collisions and distance sensors for the car.',
  }),
  role: L_({ es: 'Proyecto académico propio.', en: 'Own coursework project.' }),
  status: L_({ es: 'Código público con instrucciones', en: 'Public code with instructions' }),
  stack: ['Python', 'pygame', 'NumPy', 'SciPy'],
  evidence: ['academic'],
  repo: 'https://github.com/RenteriaH/VIDEOGAME_CARRERA',
  public: true,
  facts: L_({ es: [], en: [] }),
});

export interface Job {
  org: string;
  title: L<string>;
  period: L<string>;
  place: L<string>;
  bullets: L<string[]>;
  stack: string[];
  caseSlug?: string;
}

export const experience: Job[] = [
  {
    org: 'MAHA Home de México',
    title: L_({ es: 'Desarrollador de software · Residencia profesional', en: 'Software Developer · Professional internship' }),
    period: L_({ es: 'Jul 2026 – actualidad', en: 'Jul 2026 – Present' }),
    place: L_({ es: 'Torreón, Coahuila', en: 'Torreón, Mexico' }),
    // Solo funciones del puesto. Sin procesos internos, cifras, incidentes ni arquitectura de la empresa.
    bullets: L_({
      es: [
        'Desarrollo y optimización de una tienda en línea en Shopify Plus.',
        'Personalización del tema con Liquid, HTML, CSS y JavaScript, y desarrollo de componentes y funcionalidades para páginas de producto y carrito.',
        'Integración y consumo de las APIs REST y GraphQL de Shopify, incluidas operaciones masivas.',
        'Organización y modelado de datos de producto con metacampos y metaobjetos.',
        'Mejoras de rendimiento web y experiencia de usuario, medidas con Core Web Vitals.',
        'Automatización de tareas y pruebas visuales en varios anchos de pantalla con Node.js y Playwright.',
        'Depuración, mantenimiento, control de cambios con verificación y documentación técnica.',
        'Uso de agentes de IA en el desarrollo, con revisión y verificación de cada cambio.',
      ],
      en: [
        'Developed and optimized an online store on Shopify Plus.',
        'Customized the theme with Liquid, HTML, CSS and JavaScript, and built components and features for product and cart pages.',
        'Integrated and consumed Shopify REST and GraphQL APIs, including bulk operations.',
        'Organized and modeled product data with metafields and metaobjects.',
        'Improved web performance and user experience, measured with Core Web Vitals.',
        'Automated tasks and visual tests across screen widths with Node.js and Playwright.',
        'Debugging, maintenance, verified change control and technical documentation.',
        'Used AI agents in development, reviewing and verifying every change.',
      ],
    }),
    stack: ['Shopify', 'Liquid', 'JavaScript', 'HTML', 'CSS', 'GraphQL', 'REST', 'Node.js', 'Playwright'],
  },
];

export const education = [
  {
    school: 'Instituto Tecnológico de La Laguna',
    degree: L_({ es: 'Ingeniería en Sistemas Computacionales', en: 'B.Eng. in Computer Systems Engineering' }),
    /** PENDIENTE: confirmar fecha de egreso (CV: 2026; LinkedIn: may 2027). */
    period: L_({ es: '2022 – en curso', en: '2022 – present' }),
  },
  {
    school: 'CECyTEC',
    degree: L_({ es: 'Bachillerato técnico en Electrónica', en: 'Technical high-school diploma in Electronics' }),
    period: L_({ es: '2021', en: '2021' }),
  },
];

export const skills: Record<'prod' | 'proj' | 'acad', string[]> = {
  prod: ['JavaScript', 'CSS', 'HTML', 'Shopify Liquid', 'Node.js', 'GraphQL', 'REST APIs', 'OAuth client credentials', 'Playwright', 'Core Web Vitals', 'WCAG contrast', 'PowerShell', 'JSON / JSONL'],
  proj: ['Python', 'FastAPI', 'pytest', 'TypeScript', 'React', 'Vitest', 'MCP', 'WebSockets', 'DuckDB', 'systemd', 'Docker', 'Linux', 'GitHub Actions', 'Git', 'ffmpeg', 'SQLite'],
  acad: ['PHP', 'MySQL', 'Kotlin', 'Jetpack Compose', 'Java', 'C#', 'Swift', 'Haskell', 'Flutter', 'Redes (Packet Tracer)'],
};
