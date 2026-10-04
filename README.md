# Portafolio — Guillermo Rentería

Sitio personal bilingüe (español e inglés) con mi experiencia, proyectos, un caso de estudio y mi CV.
Es un sitio estático: no tiene servidor, base de datos ni rastreadores.

**En línea:** `https://renteriah.github.io/` (pendiente de publicar). Repositorio: `RenteriaH/RenteriaH.github.io`; se despliega con `.github/workflows/deploy.yml`.

## Qué contiene

- Inicio con proyectos seleccionados; cada uno indica el origen de su evidencia (verificado, laboratorio, con IA, académico, privado).
- Caso de estudio: saneamiento de seguridad de una aplicación PHP propia, con pruebas antes y después.
- Experiencia profesional descrita como funciones del puesto, sin información interna de la empresa.
- Tecnologías agrupadas por dónde las he usado: producción, proyectos propios o formación académica.
- CV en HTML y en PDF de una página, generado desde el mismo contenido.

## Stack y decisiones

| Decisión | Por qué |
|---|---|
| [Astro 7](https://astro.build), salida estática | Genera HTML sin JavaScript en el cliente; el sitio solo necesita contenido |
| Enrutado i18n de Astro (`/` español, `/en/` inglés) | Rutas claras y `hreflang` correcto sin librerías extra |
| *Content collections* con esquema Zod | Los casos de estudio se validan al compilar (título SEO ≤ 55, descripción ≤ 160) |
| Fuentes autoalojadas con `font-display: optional` y precarga | Sin peticiones a terceros y sin desplazamiento de contenido al cargar |
| CV generado con Playwright desde la página `/cv/` | Una sola fuente de verdad; PDF con texto seleccionable y fuente Arial para ATS |
| Sin analítica | No hace falta para un portafolio y evita banners de cookies |

Más detalle en [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).

## Desarrollo

```bash
npm ci
npm run dev          # http://localhost:4321
npm run build        # astro check + compilación en dist/
npm test             # pruebas de integridad del contenido (Vitest)
```

Pruebas de punta a punta contra el sitio compilado (usa Google Chrome instalado):

```bash
(cd dist && python3 -m http.server 4321) &
BASE=http://127.0.0.1:4321 npm run test:e2e
```

Regenerar el CV en PDF y las imágenes para redes (con el sitio sirviéndose en 4321):

```bash
npm run cv      # public/cv/*.pdf
npm run cards   # public/og.png y design/linkedin-banner.png
```

## Calidad medida

Lighthouse 12.8.2, medición local sobre el sitio compilado (2026-10-03, tras el último cambio de contenido):

| Página | Rendimiento móvil | Rendimiento escritorio | Accesibilidad | Buenas prácticas | SEO | CLS |
|---|---|---|---|---|---|---|
| Inicio ES | 99 | 100 | 100 | 100 | 100 | 0 |
| Inicio EN | 99 | 100 | 100 | 100 | 100 | 0 |
| Caso de estudio ES / EN | 100 / 100 | 100 / 100 | 100 | 100 | 100 | 0 |
| CV ES / EN | 100 / 100 | 100 / 100 | 100 | 100 | 100 | 0 |

Medido en local; se repetirá tras el despliegue.

## Pruebas

- `tests/content.test.ts` (37 pruebas): sin cifras, procesos internos ni nombres de sistemas de la empresa (lista guardada como huellas SHA-256), contenido completo en ambos idiomas, los proyectos privados no enlazan a código y los que se hicieron con IA lo declaran.
- `scripts/e2e.mjs`: todas las páginas del sitemap a 360, 390 y 1440 px. Comprueba que no haya desplazamiento horizontal ni errores en consola; valida título, descripción, canonical, `hreflang`, Open Graph, JSON-LD, un solo `h1`, imágenes con `alt`, enlaces internos, anclas y foco del enlace de salto.
- CI: `.github/workflows/ci.yml` ejecuta todo lo anterior en cada push.

## Licencia

El código está bajo licencia MIT ([LICENSE](LICENSE)). Los textos, el caso de estudio y el CV son contenido personal y no se licencian para reutilización.
