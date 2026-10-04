// Genera og.png (1200×630) y el banner de LinkedIn (1584×396) desde branding/card.html.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PWCORE ?? 'playwright-core');
const tpl = readFileSync('design/card.html', 'utf8');
const jobs = [
  { out: 'public/og.png', W: 1200, H: 630, PAD: '72px', KS: 22, HS: 58, LS: 22, GD: 'block',
    KICK: 'Guillermo Rentería · Torreón, México', TITLE: 'Integraciones para sistemas que no se pueden apagar', SUB: 'APIs · datos · automatización con IA' },
  { out: 'design/linkedin-banner.png', W: 1584, H: 396, PAD: '48px 96px 48px 520px', KS: 22, HS: 50, LS: 22, GD: 'none',
    KICK: 'Desarrollador de software', TITLE: 'Integraciones, APIs y automatización con IA', SUB: 'Shopify · Node.js · Python · GraphQL' },
];
const browser = await chromium.launch({ channel: 'chrome' });
for (const j of jobs) {
  let html = tpl;
  for (const [k, v] of Object.entries(j)) html = html.replaceAll(`{{${k}}}`, String(v));
  const tmp = `design/_tmp_${j.W}.html`;
  writeFileSync(tmp, html);
  const page = await browser.newPage({ viewport: { width: j.W, height: j.H } });
  await page.goto('file://' + process.cwd() + '/' + tmp);
  await page.waitForTimeout(300);
  await page.screenshot({ path: j.out });
  await page.close();
  console.log('ok', j.out);
}
await browser.close();
