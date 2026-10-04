# Arquitectura del portafolio

## Estructura

```
src/
  i18n/ui.ts            Textos de interfaz es/en y helpers t() y localePath()
  data/profile.ts       Datos tipados: persona, proyectos, experiencia, educación, tecnologías
  content/cases/<lang>/ Casos de estudio en Markdown (validados con Zod en content.config.ts)
  layouts/Base.astro    <head> (SEO, hreflang, Open Graph, JSON-LD Person), cabecera, pie, fuentes
  components/
    Home.astro          Página de inicio (compartida por / y /en/)
    Ledger.astro        Ilustración del protocolo de escritura (solo CSS, respeta movimiento reducido)
    Evidence.astro      Etiquetas de origen de la evidencia
    CaseStudy.astro     Plantilla de caso de estudio
    Resume.astro        CV de una columna; misma página para HTML y PDF
  pages/                Rutas: /, /en/, /casos/[key]/, /en/cases/[key]/, /cv/, /en/cv/, 404
  styles/global.css     Tokens de color y tipografía; modo claro/oscuro por prefers-color-scheme
scripts/
  build-cv.mjs          PDF del CV con Playwright (Letter, Arial, 1 página)
  cards.mjs             og.png y banner de LinkedIn desde design/card.html
  e2e.mjs               Prueba de punta a punta del sitio compilado
tests/content.test.ts   Reglas de confidencialidad y completitud bilingüe
```

## Flujo de contenido

1. Todo dato del sitio nace en `src/data/profile.ts` o en un caso de estudio.
2. Cada afirmación debe poder rastrearse a la auditoría y la evidencia del proyecto (fuera de este repositorio).
3. `tests/content.test.ts` bloquea en CI las cifras internas, los nombres de sistemas de terceros y el correo corporativo.
4. El CV en PDF se regenera desde la página `/cv/`, así que no puede divergir del sitio.

## Decisiones

- **Sin JavaScript en el cliente.** La única interacción (la leyenda de etiquetas) usa `<details>`.
- **Fuentes:** Schibsted Grotesk (títulos), Source Serif 4 (lectura), JetBrains Mono (etiquetas). Se aloja solo el
  subconjunto latino, se precarga y usa `font-display: optional`: en la primera visita lenta se ve la fuente del
  sistema, pero el contenido nunca salta (CLS 0 medido).
- **Accesibilidad:** enlace para saltar al contenido, foco visible, contraste AA en ambos temas, diagramas SVG con
  `<title>` y `<desc>`, `prefers-reduced-motion` respetado.
- **SEO:** canonical y `hreflang` (es-MX, en, x-default), sitemap con alternativas por idioma, JSON-LD `Person`,
  Open Graph con imagen de 1200×630, 404 con `noindex`.
- **Riesgo aceptado:** `npm audit` reporta `http-cache-semantics` (alto) como dependencia de compilación de Astro. No
  llega al sitio publicado, que es HTML estático sin servidor ni caché compartida.

## Despliegue

Pendiente de aprobación. Opciones gratuitas evaluadas en la investigación del proyecto: GitHub Pages (más simple) y
Cloudflare (permite cabeceras de seguridad propias). Ninguna requiere cambios en el código, salvo `site` en
`astro.config.mjs` si se usa un dominio propio.
