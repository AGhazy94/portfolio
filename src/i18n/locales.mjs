// Plain JS so astro.config.mjs can read it as well as the pages.
export const defaultLocale = 'en';

/**
 * `published: false` keeps a locale out of production; dev and Netlify previews still build it.
 * @type {Record<'en' | 'ar', { lang: string; dir: 'ltr' | 'rtl'; name: string; ogLocale: string; dateLocale: string; published: boolean }>}
 */
export const locales = {
  en: { lang: 'en', dir: 'ltr', name: 'English', ogLocale: 'en_US', dateLocale: 'en-GB', published: true },
  // Latin digits: the audience reads prices, versions and years in them, and they match the English pages.
  ar: { lang: 'ar', dir: 'rtl', name: 'العربية', ogLocale: 'ar_AR', dateLocale: 'ar-EG-u-nu-latn', published: false },
};

// Pages that exist in every locale; collection pages exist once their translated Markdown does.
export const sharedPaths = ['/', '/privacy/', '/legal/', '/thanks/'];
