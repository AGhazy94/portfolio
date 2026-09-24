// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Netlify sets URL to the primary domain and DEPLOY_PRIME_URL to each preview's own address; previews use
// theirs so a shared preview link shows its own OG card. The fallback covers local builds.
const preview = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;
const site = (preview || process.env.URL) ?? 'https://ahmed-ghazy.com';

export default defineConfig({
  site,
  server: { port: Number(process.env.PORT) || 4321 },
  build: { inlineStylesheets: 'always' },
  security: { csp: true },
  // No Markdown here; Shiki's inline styles would break the CSP if any arrived.
  markdown: { syntaxHighlight: false },
  // The form's thank-you page is noindex, so it stays out of the sitemap too.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/thanks/') })],
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
