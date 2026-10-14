import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ question: z.string(), answer: z.string() })).default([]);
const card = z.object({ title: z.string(), text: z.string() });

// Situation pages under /services/: one buyer need each, one primary phrase each. The page is laid out
// from these fields, so the copy stays data; a hero image is picked up by file name (src/assets/content/).
const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: z.object({
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
    terms: z.array(z.string()),
    faq,
  }),
});

// Decision articles under /blog/, written for the buyer's question.
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    service: reference('services'),
    relatedArticles: z.array(reference('blog')).max(2).default([]),
    status: z.enum(['published', 'draft']).default('published'),
    imageAlt: z.string().optional(),
    faq,
  }),
});

// Case studies under /work/: only what the commit history backs. A `draft` is built in dev only.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    kind: z.string(),
    order: z.number(),
    updated: z.coerce.date(),
    status: z.enum(['shipped', 'draft']).default('shipped'),
    href: z.url().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { services, blog, work };
