// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { satteri } from '@astrojs/markdown-satteri';
import { hastExternalLinks } from './src/lib/external-links.mjs';

// Netlify sets URL to the primary domain and DEPLOY_PRIME_URL to each preview's own address; previews use
// theirs so a shared preview link shows its own OG card. The fallback covers local builds.
const preview = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;
const site = (preview || process.env.URL) ?? 'https://ahmed-ghazy.com';

// The config can't import astro:content, so <lastmod> comes from the same frontmatter `updated` dates the pages use.
/** @param {string} source */
const updatedIn = (source) => source.match(/^\s*updated: '?([\d-]{10})/m)?.[1];
/** @type {Map<string, string>} */
const lastmod = new Map();
for (const collection of ['services', 'blog', 'work']) {
  const dir = `./src/content/${collection}`;
  const dates = [];
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
    const source = readFileSync(`${dir}/${file}`, 'utf8');
    const date = updatedIn(source);
    if (!date || /^status: draft$/m.test(source)) continue;
    lastmod.set(`/${collection}/${file.slice(0, -3)}/`, date);
    dates.push(date);
  }
  lastmod.set(`/${collection}/`, dates.sort().at(-1) ?? '');
}
const profileSource = readFileSync('./src/data/profile.ts', 'utf8');
lastmod.set('/', [updatedIn(profileSource) ?? '', ...lastmod.values()].sort().at(-1) ?? '');

export default defineConfig({
  site,
  server: { port: Number(process.env.PORT) || 4321 },
  build: { inlineStylesheets: 'always' },
  // gtag.js is injected after consent, so its origin joins the hashed inline scripts.
  security: { csp: { scriptDirective: { resources: ["'self'", 'https://www.googletagmanager.com'] } } },
  // No Markdown here; Shiki's inline styles would break the CSP if any arrived.
  markdown: {
    syntaxHighlight: false,
    processor: satteri({
      hastPlugins: [hastExternalLinks({ site, newTab: profileSource.match(/newTab: '([^']+)'/)?.[1] ?? '' })],
    }),
  },
  // The form's thank-you page is noindex, so it stays out of the sitemap too.
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/thanks/'),
      serialize: (item) => {
        const date = lastmod.get(new URL(item.url).pathname);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  fonts: [
    {
      name: 'Instrument Serif',
      cssVariable: '--font-instrument-serif',
      provider: fontProviders.fontsource(),
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      name: 'Geist',
      cssVariable: '--font-geist',
      provider: fontProviders.fontsource(),
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
