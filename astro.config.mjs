// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Netlify sets URL to the site's primary domain at build time; the fallback covers local builds.
const site = process.env.URL ?? 'https://ahmed-ghazy.com';

export default defineConfig({
  site,
  server: { port: Number(process.env.PORT) || 4321 },
  build: { inlineStylesheets: 'always' },
  security: { csp: true },
  // No Markdown here; Shiki's inline styles would break the CSP if any arrived.
  markdown: { syntaxHighlight: false },
  integrations: [sitemap()],
  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.fontsource(),
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
