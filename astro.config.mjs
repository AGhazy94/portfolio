// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { satteri } from '@astrojs/markdown-satteri';
import { hastExternalLinks, hastLocalizedLinks } from './src/lib/external-links.mjs';
import { defaultLocale, locales, sharedPaths } from './src/i18n/locales.mjs';

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
// English paths with a live Arabic page; each takes the newer of its English and translation dates.
const arabicPaths = new Set(sharedPaths);
for (const collection of ['services', 'blog', 'work']) {
  const dir = `./src/content/ar/${collection}`;
  const dates = [];
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
    const path = `/${collection}/${file.slice(0, -3)}/`;
    const source = readFileSync(`${dir}/${file}`, 'utf8');
    // A draft on either side is never built in production, so nothing may link to it.
    if (!lastmod.has(path) || /^status: draft$/m.test(source)) continue;
    const date = [lastmod.get(path) ?? '', updatedIn(source) ?? ''].sort().at(-1) ?? '';
    lastmod.set(`/ar${path}`, date);
    arabicPaths.add(path);
    dates.push(date);
  }
  if (dates.length) {
    arabicPaths.add(`/${collection}/`);
    lastmod.set(`/ar/${collection}/`, [lastmod.get(`/${collection}/`) ?? '', ...dates].sort().at(-1) ?? '');
  }
}
const arabicDates = [...lastmod].filter(([path]) => path.startsWith('/ar/')).map(([, date]) => date);
lastmod.set('/ar/', [lastmod.get('/') ?? '', ...arabicDates].sort().at(-1) ?? '');

export default defineConfig({
  site,
  server: { port: Number(process.env.PORT) || 4321 },
  build: { inlineStylesheets: 'always' },
  // gtag.js (after consent) and Ahrefs' analytics.js are injected, so their origins join the hashed inline scripts.
  security: {
    csp: {
      scriptDirective: {
        resources: ["'self'", 'https://www.googletagmanager.com', 'https://analytics.ahrefs.com'],
      },
    },
  },
  // No Markdown here; Shiki's inline styles would break the CSP if any arrived.
  markdown: {
    syntaxHighlight: false,
    processor: satteri({
      hastPlugins: [
        hastExternalLinks({
          site,
          newTab: {
            en: profileSource.match(/newTab: '([^']+)'/)?.[1] ?? '',
            ar: JSON.parse(readFileSync('./src/i18n/ar.json', 'utf8'))['ui.newTab']?.ar ?? '',
          },
        }),
        hastLocalizedLinks({ locale: 'ar', paths: arabicPaths }),
      ],
    }),
  },
  // English stays at the root; Arabic lives under /ar/ (see src/i18n/).
  i18n: {
    defaultLocale,
    locales: Object.keys(locales),
    routing: { prefixDefaultLocale: false },
  },
  // The form's thank-you page is noindex, so it stays out of the sitemap too.
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/thanks/'),
      // Adds the hreflang alternates for pages that exist in both languages.
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(Object.entries(locales).map(([key, { lang }]) => [key, lang])),
      },
      serialize: (item) => {
        const date = lastmod.get(new URL(item.url).pathname);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  fonts: [
    {
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      provider: fontProviders.fontsource(),
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      name: 'Instrument Serif',
      cssVariable: '--font-instrument-serif',
      provider: fontProviders.fontsource(),
      weights: [400],
      styles: ['italic'],
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
    // Arabic glyphs only: Latin words inside Arabic text keep Space Grotesk and Geist.
    {
      name: 'Readex Pro',
      cssVariable: '--font-readex-pro',
      provider: fontProviders.fontsource(),
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['arabic'],
      // No fallbacks: a generated metric fallback has no unicode-range and would catch Latin text first.
      fallbacks: [],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
