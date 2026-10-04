// Genera los PDF del CV (texto seleccionable) a partir de /cv/ y /en/cv/ del sitio compilado.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PWCORE ?? 'playwright-core');
const base = process.env.BASE ?? 'http://127.0.0.1:4321';
mkdirSync('public/cv', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
await page.emulateMedia({ colorScheme: 'light' });
for (const [path, file] of [['/cv/', 'ES'], ['/en/cv/', 'EN']]) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.pdf({ path: `public/cv/Guillermo_Renteria_CV_${file}.pdf`, format: 'Letter', printBackground: false,
    margin: { top: '0.45in', bottom: '0.45in', left: '0.55in', right: '0.55in' } });
  console.log('ok', file);
}
await browser.close();
