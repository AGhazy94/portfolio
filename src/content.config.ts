import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ question: z.string(), answer: z.string() })).default([]);

// Situation pages under /services/: one buyer need each, one primary phrase each.
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
    faq,
  }),
});

// Case studies under /work/: only what the commit history backs.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    kind: z.string(),
    order: z.number(),
    updated: z.coerce.date(),
    href: z.url().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { services, blog, work };
