// Prueba de punta a punta del sitio compilado. Uso:
//   npm run build && (cd dist && python3 -m http.server 4321) &
//   BASE=http://127.0.0.1:4321 PWCORE=<ruta a playwright-core> npm run test:e2e
// Sin PWCORE usa el paquete playwright-core instalado.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PWCORE ?? 'playwright-core');

const BASE = process.env.BASE ?? 'http://127.0.0.1:4321';
const site = 'https://renteriah.github.io';
let failures = 0;
const fail = (msg) => {
  failures++;
  console.log('  ✗', msg);
};

const sitemap = await (await fetch(`${BASE}/sitemap-0.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(site, ''));
console.log(`Páginas en el sitemap: ${pages.length}`);

const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL ?? 'chrome' });
const checkedLinks = new Map();

for (const path of pages) {
  for (const width of [360, 390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    if (res.status() !== 200) fail(`${path} devolvió ${res.status()}`);
    await page.evaluate(async () => { for (const img of document.querySelectorAll('img')) { img.loading = 'eager'; } await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) fail(`${path} a ${width}px tiene ${overflow}px de desplazamiento horizontal`);
    if (errors.length) fail(`${path}: errores en consola: ${errors.join(' | ')}`);

    if (width === 1440) {
      const meta = await page.evaluate(() => ({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content ?? '',
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
        hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => l.hreflang),
        og: ['og:title', 'og:description', 'og:image', 'og:url'].every((p) => document.querySelector(`meta[property="${p}"]`)?.content),
        h1: document.querySelectorAll('h1').length,
        lang: document.documentElement.lang,
        imgsNoAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
        imgsBroken: [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
        links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
        jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
          try { return JSON.parse(s.textContent)['@type']; } catch { return 'INVÁLIDO'; }
        }),
      }));
      if (!meta.title || meta.title.length > 70) fail(`${path}: título ausente o largo (${meta.title.length})`);
      if (meta.description.length < 50 || meta.description.length > 170) fail(`${path}: descripción de ${meta.description.length} caracteres`);
      if (!meta.canonical.startsWith(site)) fail(`${path}: canonical inválido`);
      if (!['es-MX', 'en', 'x-default'].every((h) => meta.hreflang.includes(h))) fail(`${path}: faltan hreflang`);
      if (!meta.og) fail(`${path}: faltan etiquetas Open Graph`);
      if (meta.h1 !== 1) fail(`${path}: tiene ${meta.h1} h1`);
      if (!meta.lang) fail(`${path}: sin atributo lang`);
      if (meta.imgsNoAlt) fail(`${path}: ${meta.imgsNoAlt} imágenes sin alt`);
      if (meta.imgsBroken.length) fail(`${path}: imágenes rotas: ${meta.imgsBroken.join(', ')}`);
      if (meta.jsonLd.includes('INVÁLIDO')) fail(`${path}: JSON-LD inválido`);

      for (const href of meta.links) {
        if (/^(https?:|mailto:)/.test(href)) continue; // externos: se revisan aparte, no en CI
        const url = new URL(href, BASE + path);
        const key = url.pathname;
        if (!checkedLinks.has(key)) checkedLinks.set(key, (await fetch(url)).status);
        if (checkedLinks.get(key) !== 200) fail(`${path}: enlace roto ${href} (${checkedLinks.get(key)})`);
        if (url.hash) {
          const id = decodeURIComponent(url.hash.slice(1));
          if (url.pathname === new URL(BASE + path).pathname && !(await page.$(`[id="${id}"]`))) fail(`${path}: ancla inexistente ${href}`);
        }
      }

      // Teclado: el primer Tab debe llevar al enlace «Saltar al contenido» y ser visible.
      await page.keyboard.press('Tab');
      const skip = await page.evaluate(() => {
        const el = document.activeElement;
        const r = el.getBoundingClientRect();
        return { cls: el.className, visible: r.top >= 0 && r.height > 0 };
      });
      if (!String(skip.cls).includes('skip') || !skip.visible) fail(`${path}: el enlace de salto no recibe el foco visible`);
    }
    await page.close();
  }
}

for (const pdf of ['/cv/Guillermo_Renteria_CV_ES.pdf', '/cv/Guillermo_Renteria_CV_EN.pdf']) {
  const r = await fetch(BASE + pdf);
  if (r.status !== 200 || !(r.headers.get('content-type') ?? '').includes('pdf')) fail(`${pdf} no se sirve como PDF`);
}

await browser.close();
console.log(failures ? `\n${failures} fallos` : `\nTodo correcto: ${pages.length} páginas × 3 anchos, ${checkedLinks.size} rutas internas verificadas`);
process.exit(failures ? 1 : 0);
