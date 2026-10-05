// Fuente única de los diez CV (5 perfiles × es/en) y de la página /cv/. Cada afirmación procede de cv2026/MAESTRO.md.
// Las versiones solo cambian la selección y el orden; los hechos, cargos y fechas son los mismos.

const links = {
  email: 'renteg18@gmail.com',
  portfolio: { es: 'https://renteriah.github.io/', en: 'https://renteriah.github.io/en/' },
  github: 'https://github.com/RenteriaH',
  linkedin: 'https://www.linkedin.com/in/guillermo-renteria-9263052a6/',
  gwCase: {
    es: 'https://renteriah.github.io/casos/saneamiento-gymwarrior/',
    en: 'https://renteriah.github.io/en/cases/saneamiento-gymwarrior/',
  },
  portfolioRepo: 'https://github.com/RenteriaH/RenteriaH.github.io',
  gwRepo: 'https://github.com/RenteriaH/GYMWARRIOR',
};

const t = {
  es: {
    location: 'Torreón, Coahuila, México',
    langs: ['Idiomas', 'Español (nativo) · Inglés (básico)'],
    h: { summary: 'Perfil', skills: 'Habilidades técnicas', exp: 'Experiencia', proj: 'Proyectos', edu: 'Educación' },
    job: {
      title: 'Desarrollador de software (Residencia profesional)',
      org: 'MAHA Home de México',
      meta: 'Torreón, Coahuila · Presencial',
      period: 'jul 2026 – actualidad',
    },
    edu: [
      ['Ingeniería en Sistemas Computacionales', 'Instituto Tecnológico de La Laguna', '2022 – dic 2026 (estimado)'],
      ['Bachillerato técnico en Electrónica', 'CECyTEC', '2021'],
    ],
  },
  en: {
    location: 'Torreón, Coahuila, Mexico',
    langs: ['Languages', 'Spanish (native) · English (basic)'],
    h: { summary: 'Summary', skills: 'Technical Skills', exp: 'Experience', proj: 'Projects', edu: 'Education' },
    job: {
      title: 'Software Developer Intern (Professional Residency)',
      org: 'MAHA Home de México',
      meta: 'Torreón, Mexico · On-site',
      period: 'Jul 2026 – Present',
    },
    edu: [
      ['B.Eng. in Computer Systems Engineering', 'Instituto Tecnológico de La Laguna', '2022 – Dec 2026 (expected)'],
      ['Technical High School Diploma in Electronics', 'CECyTEC', '2021'],
    ],
  },
};

// Viñetas de MAHA: solo funciones del puesto. Sin cifras, procesos internos, incidentes ni integraciones con nombre.
const maha = {
  front: {
    es: 'Desarrollo componentes adaptables para páginas de producto y carrito de una tienda Shopify Plus en producción con Liquid, HTML, CSS y JavaScript.',
    en: 'Build responsive components and features for product and cart pages on a production Shopify Plus store using Liquid, HTML, CSS and JavaScript.',
  },
  api: {
    es: 'Integro y consumo las APIs REST y GraphQL de Shopify, incluidas operaciones masivas.',
    en: 'Integrate and consume Shopify REST and GraphQL APIs, including bulk operations.',
  },
  data: {
    es: 'Organizo y modelo datos de producto con metacampos y metaobjetos.',
    en: 'Organize and model product data with metafields and metaobjects.',
  },
  quality: {
    es: 'Automatizo pruebas visuales con Node.js y Playwright, mejoro el rendimiento con Core Web Vitals y documento cada cambio.',
    en: 'Automate visual tests with Node.js and Playwright, improve Core Web Vitals and document each change.',
  },
};

const projects = {
  gymwarrior: {
    name: 'GYMWARRIOR',
    tag: { es: 'Tienda web académica (2024), saneada en 2026', en: 'Academic web store (2024), hardened in 2026' },
    stack: 'PHP, MySQL, JavaScript, Bootstrap, Playwright',
    link: (l) => ({ label: l === 'es' ? 'caso de estudio' : 'case study', href: links.gwCase[l] }),
    bullets: {
      es: [
        'Saneé con asistencia de IA diez problemas de seguridad: inyección SQL (consultas preparadas), CSRF, subidas sin validar y compra sin transacción.',
        'Validé la corrección con 13 pruebas de punta a punta (Playwright): 10 fallan en la versión original y 13 pasan en la saneada.',
      ],
      en: [
        'Fixed ten security issues with AI assistance: SQL injection (prepared statements), CSRF, unvalidated uploads and non-transactional checkout.',
        'Validated the fix with 13 Playwright end-to-end tests: 10 fail on the original and all 13 pass after hardening.',
      ],
    },
  },
  qce: {
    name: 'QCE',
    tag: { es: 'Motor de datos de mercado en tiempo real · repositorio privado', en: 'Real-time market data engine · private repository' },
    stack: 'Python, FastAPI, WebSockets, DuckDB, Parquet, React, pytest, mypy',
    bullets: {
      es: [
        'Definí la arquitectura y las reglas de riesgo de un sistema que ingiere datos por REST y WebSocket, los guarda en Parquet y DuckDB y exige aprobación humana.',
        'Dirigí y revisé el código, escrito mayormente por agentes de IA: unas 4,000 pruebas en Python y 82 en React, con mypy y ruff.',
      ],
      en: [
        'Defined the architecture and risk rules of a system that ingests REST and WebSocket data, stores it in Parquet and DuckDB, and requires human approval.',
        'Directed and reviewed code written mostly by AI agents; about 4,000 Python and 82 React tests, plus mypy and ruff.',
      ],
    },
  },
  ecomos: {
    name: 'EcomOS',
    tag: { es: 'Plataforma de operación de e-commerce · repositorio privado', en: 'E-commerce operations platform · private repository' },
    stack: 'Python, FastAPI, Node.js, GraphQL, PostgreSQL, Docker, systemd, pytest',
    bullets: {
      es: [
        'Diseñé integraciones con Shopify (GraphQL), Meta y un proveedor de dropshipping tras puertas de escritura: simulación, aprobación, respaldo y relectura.',
        'Desplegué servicios en un VPS Linux con systemd, Docker y versiones reversibles; código de agentes de IA bajo mi revisión, con unas 3,900 pruebas.',
      ],
      en: [
        'Designed integrations with Shopify (GraphQL), Meta and a dropshipping supplier API behind write gates: dry run, approval, backup and readback.',
        'Deployed services to a Linux VPS with systemd, Docker and reversible releases; code written by AI agents under my review, with about 3,900 tests.',
      ],
    },
  },
  portfolio: {
    name: { es: 'Portafolio profesional', en: 'Professional portfolio' },
    tag: { es: 'Sitio bilingüe con CI · código público', en: 'Bilingual site with CI · public code' },
    stack: 'Astro, TypeScript, Vitest, Playwright, GitHub Actions',
    link: () => ({ label: 'GitHub', href: links.portfolioRepo }),
    bullets: {
      es: [
        'Publiqué con agentes de IA un sitio bilingüe con pruebas de contenido y de punta a punta y despliegue continuo en GitHub Pages.',
        'Medí Lighthouse 99–100 en rendimiento y 100 en accesibilidad y SEO; una prueba bloquea términos confidenciales.',
      ],
      en: [
        'Shipped a bilingual site, built with AI agents, with content and end-to-end tests and continuous deployment to GitHub Pages.',
        'Verified Lighthouse 99–100 performance and 100 accessibility and SEO; a test blocks confidential terms.',
      ],
    },
  },
};

const skills = {
  lang: { es: 'Lenguajes', en: 'Languages' },
  front: { es: 'Frontend', en: 'Frontend' },
  back: { es: 'Backend y APIs', en: 'Backend & APIs' },
  data: { es: 'Datos', en: 'Data' },
  test: { es: 'Pruebas', en: 'Testing' },
  tools: { es: 'Herramientas', en: 'Tools' },
};

export const variants = {
  A: {
    slug: 'Software_Engineer',
    headline: { es: 'Desarrollador de software', en: 'Software Developer' },
    summary: {
      es: 'Desarrollador de software y estudiante de Ingeniería en Sistemas Computacionales con experiencia en una tienda Shopify Plus en producción: interfaces web, integración de APIs REST y GraphQL y modelado de datos. Trabajo con pruebas automatizadas y uso agentes de IA revisando y verificando cada cambio.',
      en: 'Software developer and Computer Systems Engineering student with experience on a production Shopify Plus store: web interfaces, REST and GraphQL API integration and data modeling. I work with automated tests and use AI agents while reviewing and verifying every change.',
    },
    skills: [
      ['lang', 'JavaScript, TypeScript, Python, PHP, SQL, HTML, CSS, Liquid'],
      ['back', 'REST, GraphQL, Node.js, FastAPI, WebSockets'],
      ['test', 'Playwright, pytest, Vitest, mypy, Core Web Vitals'],
      ['tools', 'Git, GitHub Actions, Linux, systemd, Docker, Shopify, Claude Code, Codex'],
    ],
    maha: ['front', 'api', 'data', 'quality'],
    projects: ['gymwarrior', 'qce', 'portfolio'],
  },
  B: {
    slug: 'Full_Stack',
    headline: { es: 'Desarrollador de software · Full Stack', en: 'Software Developer · Full Stack' },
    summary: {
      es: 'Desarrollador de software con experiencia de frontend a backend: componentes adaptables en una tienda Shopify Plus en producción, consumo de APIs REST y GraphQL y aplicaciones con PHP, MySQL, Python y React. Pruebo cada flujo de punta a punta y uso agentes de IA con revisión de cada cambio.',
      en: 'Software developer working from frontend to backend: responsive components on a production Shopify Plus store, REST and GraphQL API consumption, and applications built with PHP, MySQL, Python and React. I test every flow end to end and use AI agents while reviewing each change.',
    },
    skills: [
      ['front', 'JavaScript, TypeScript, HTML, CSS, Liquid, React, Astro, Bootstrap'],
      ['back', 'Node.js, PHP, Python, FastAPI, REST, GraphQL'],
      ['data', 'MySQL, PostgreSQL, SQLite, DuckDB'],
      ['test', 'Playwright, Vitest, pytest, Core Web Vitals, WCAG'],
      ['tools', 'Git, GitHub Actions, Linux, Docker, Shopify'],
    ],
    maha: ['front', 'api', 'data', 'quality'],
    projects: ['gymwarrior', 'portfolio', 'qce'],
  },
  C: {
    slug: 'Backend',
    headline: { es: 'Desarrollador de software · Backend', en: 'Software Developer · Backend' },
    summary: {
      es: 'Desarrollador de software orientado a backend: integración de APIs REST y GraphQL en una tienda Shopify Plus en producción y servicios propios en Python, Node.js y PHP con pruebas automatizadas y despliegue en Linux. Uso agentes de IA revisando y verificando cada cambio.',
      en: 'Backend-focused software developer: REST and GraphQL API integration on a production Shopify Plus store, plus my own services in Python, Node.js and PHP with automated tests and Linux deployment. I use AI agents while reviewing and verifying every change.',
    },
    skills: [
      ['lang', 'Python, JavaScript, TypeScript, PHP, SQL'],
      ['back', 'REST, GraphQL, WebSockets, FastAPI, Node.js, OAuth'],
      ['data', 'MySQL, PostgreSQL, SQLite, DuckDB, Parquet, JSON/CSV'],
      ['test', 'pytest, mypy, ruff, Playwright, Vitest'],
      ['tools', 'Git, GitHub Actions, Linux, systemd, Docker'],
    ],
    maha: ['api', 'data', 'quality', 'front'],
    projects: ['qce', 'ecomos', 'gymwarrior'],
  },
  D: {
    slug: 'Frontend_Web',
    headline: { es: 'Desarrollador de software · Frontend y Web', en: 'Software Developer · Frontend & Web' },
    summary: {
      es: 'Desarrollador web con experiencia en una tienda Shopify Plus en producción: componentes adaptables en Liquid, HTML, CSS y JavaScript, rendimiento medido con Core Web Vitals y pruebas visuales automatizadas. Construyo sitios accesibles y rápidos con Astro y TypeScript, y uso agentes de IA revisando y verificando cada cambio.',
      en: 'Web developer with experience on a production Shopify Plus store: responsive components in Liquid, HTML, CSS and JavaScript, performance measured with Core Web Vitals and automated visual tests. I build fast, accessible sites with Astro and TypeScript, and use AI agents while reviewing and verifying every change.',
    },
    skills: [
      ['front', 'HTML, CSS, JavaScript, TypeScript, Liquid, Astro, React, Bootstrap'],
      ['test', 'Playwright, Vitest, Lighthouse, Core Web Vitals, WCAG'],
      ['back', 'REST, GraphQL, Node.js, PHP'],
      ['tools', 'Git, GitHub Actions, GitHub Pages, Shopify, Claude Code, Codex'],
    ],
    maha: ['front', 'quality', 'api', 'data'],
    projects: ['portfolio', 'gymwarrior', 'qce'],
  },
  E: {
    slug: 'Automation_Integrations',
    headline: { es: 'Desarrollador de automatización e integración de APIs', en: 'Automation & API Integration Developer' },
    summary: {
      es: 'Desarrollador enfocado en integraciones y automatización: APIs REST y GraphQL de Shopify en una tienda en producción y sistemas propios en Python y Node.js con pruebas y despliegue en Linux. Dirijo agentes de IA que escriben buena parte del código; yo defino la arquitectura, integro, reviso y verifico.',
      en: 'Software developer focused on integrations and automation: Shopify REST and GraphQL APIs on a production store, plus my own Python and Node.js systems with validation, tests and Linux deployment. I direct AI agents that write much of the code; my work is architecture, integration, review and verification.',
    },
    skills: [
      ['back', 'REST, GraphQL, WebSockets, OAuth, Node.js, FastAPI'],
      ['lang', 'Python, JavaScript, TypeScript, SQL'],
      ['data', 'PostgreSQL, DuckDB, Parquet, JSON/CSV'],
      ['test', 'pytest, mypy, ruff, Playwright'],
      ['tools', 'Linux, systemd, Docker, GitHub Actions, Claude Code, Codex, MCP'],
    ],
    maha: ['api', 'quality', 'data', 'front'],
    projects: ['ecomos', 'qce', 'portfolio'],
  },
};

export { links, t, maha, projects, skills };
