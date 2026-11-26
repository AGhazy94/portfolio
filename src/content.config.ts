import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ question: z.string(), answer: z.string() })).default([]);
const card = z.object({ title: z.string(), text: z.string() });

// Situation pages under /services/: one buyer need each, one primary phrase each. The page is laid out
// from these fields, so the copy stays data; a hero image is picked up by file name (src/assets/content/).
const serviceSchema = z.object({
  title: z.string(),
  heading: z.string(),
  description: z.string().max(160),
  cardTitle: z.string(),
  cardSummary: z.string(),
  order: z.number(),
  updated: z.coerce.date(),
  imageAlt: z.string().optional(),
  lead: z.string(),
  fit: z.array(z.string()),
  notFit: z.string().optional(),
  gets: z.array(card),
  steps: z.array(card),
  experience: z.array(z.string()),
  // ServiceBody sets the last line beside the CTA, so the terms need at least one line before it.
  terms: z.array(z.string()).min(2),
  faq,
});

// Buyer-question articles under /blog/; references use the English ids the Arabic files share.
const blogSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  published: z.coerce.date(),
  updated: z.coerce.date(),
  service: reference('services'),
  relatedArticles: z.array(reference('blog')).max(2).default([]),
  status: z.enum(['published', 'draft']).default('published'),
  imageAlt: z.string().optional(),
  faq,
});

// Case studies under /work/: only what the commit history backs. A `draft` is built in dev only.
const workSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  kind: z.string(),
  order: z.number(),
  updated: z.coerce.date(),
  status: z.enum(['shipped', 'draft']).default('shipped'),
  href: z.url().optional(),
  imageAlt: z.string().optional(),
  tags: z.array(z.string()),
  // Facts row under the title; each stays empty unless the case study's own text states it.
  role: z.string().optional(),
  period: z.string().optional(),
});

const collection = <S extends z.ZodType>(base: string, schema: S) =>
  defineCollection({ loader: glob({ pattern: '*.md', base }), schema });

// Arabic translations live in src/content/ar/<collection>/<same-id>.md; an English page without one stays English.
export const collections = {
  services: collection('./src/content/services', serviceSchema),
  blog: collection('./src/content/blog', blogSchema),
  work: collection('./src/content/work', workSchema),
  servicesAr: collection('./src/content/ar/services', serviceSchema),
  blogAr: collection('./src/content/ar/blog', blogSchema),
  workAr: collection('./src/content/ar/work', workSchema),
};
