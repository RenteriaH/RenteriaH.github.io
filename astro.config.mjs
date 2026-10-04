// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio estático bilingüe. El dominio definitivo se fija al aprobar el despliegue.
export default defineConfig({
  site: 'https://renteriah.github.io',
  trailingSlash: 'always',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-MX', en: 'en-US' } } }),
  ],
  build: { inlineStylesheets: 'auto' },
});
