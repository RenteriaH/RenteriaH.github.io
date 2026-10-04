// Capturas de QA en un Chrome aislado (no usa el perfil del usuario).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PWCORE ?? 'playwright-core');
const base = process.env.BASE ?? 'http://127.0.0.1:4321';
const pages = (process.env.PAGES ?? '/,/en/,/casos/saneamiento-gymwarrior/,/cv/').split(',');
const browser = await chromium.launch({ channel: 'chrome' });
for (const scheme of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    for (const p of pages) {
      await page.goto(base + p, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const name = `${p.replace(/\//g, '_') || '_'}${width}_${scheme}.png`;
      await page.screenshot({ path: `qa-output/${name}`, fullPage: true });
      console.log(scheme, width, p, 'overflowX=' + overflow, errors.length ? 'ERR ' + errors.join(';') : '');
    }
    await ctx.close();
  }
}
await browser.close();
