import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Casos de estudio: un archivo por idioma en src/content/cases/<lang>/<slug>.md
const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Título y descripción cortos para buscadores (≤ 55 y ≤ 160 caracteres). */
    seoTitle: z.string().max(55),
    seoDescription: z.string().min(50).max(160),
    role: z.string(),
    org: z.string(),
    period: z.string(),
    stack: z.array(z.string()).min(1),
    order: z.number().int(),
    key: z.string().regex(/^[a-z0-9-]+$/),
  }),
});

export const collections = { cases };
