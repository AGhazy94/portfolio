import * as english from '../data/profile';
import { getPosts, getServices, getWork } from '../lib/content';
import { localizedHref } from '../lib/external-links.mjs';
import arabic from './ar.json';
import { defaultLocale, locales, sharedPaths } from './locales.mjs';

export type Locale = keyof typeof locales;
type Entry = { en: string; ar: string };

export { locales };

const localeOf = (value: string | undefined): Locale => (value && value in locales ? (value as Locale) : defaultLocale);

// Dev and Netlify previews build every locale so a draft translation can be checked before it goes live.
export const isBuilt = (locale: Locale) =>
  locales[locale].published || import.meta.env.DEV || import.meta.env.PUBLIC_NOINDEX === 'true';

const source = {
  profile: english.profile,
  statement: english.statement,
  about: english.about,
  socials: english.socials,
  experience: english.experience,
  projects: english.projects,
  testimonials: english.testimonials,
  ui: english.ui,
};
type Copy = typeof source;

// Kept verbatim in every language: links, ids, Netlify field names, tags, published quotes, the WebMCP tool.
const FIXED = [
  /^profile\.(name|email|linkedin|upwork|contra|resume|created|updated|knowsAbout|roles|location\.country)\b/,
  /^profile\.languages\.\d+\.code$/,
  /^profile\.education\.years$/,
  /\.href$/,
  /^socials\.\d+\.label$/,
  /^experience\.\d+\.(start|tags)\b/,
  /^projects\.\d+\.(caseStudy|logo|tags)\b/,
  /^testimonials\.\d+\.(quote|source)$/,
  /^ui\.sections\.\d+\.id$/,
  /^ui\.nav\.\d+\.section$/,
  /^ui\.contact\.(subject|tool)\b/,
  /^ui\.contact\.choices\.\d+\.(name|tool)$/,
  /^ui\.privacy\.sections\.\d+\.storage\.rows\.\d+\.name$/,
  /^ui\.notFound\.code$/,
];

const isTranslatable = (path: string) => !FIXED.some((pattern) => pattern.test(path));

// Every string leaf as [dotted.path, text]; array items use their index.
function leaves(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => leaves(item, path ? `${path}.${index}` : `${index}`));
  if (value && typeof value === 'object' && !('src' in value && 'width' in value)) {
    return Object.entries(value).flatMap(([key, item]) => leaves(item, path ? `${path}.${key}` : key));
  }
  return [];
}

const sourceStrings = () => new Map(leaves(source).filter(([path]) => isTranslatable(path)));

// Tokens a translation must carry over unchanged: {email}-style placeholders and inline link targets.
const tokens = (text: string) =>
  [...text.matchAll(/%?\{[^}]+\}|\]\(([^)]+)\)/g)].map((match) => match[1] ?? match[0]).sort();
const boldCount = (text: string) => text.split('**').length - 1;

function check(translations: Record<string, Entry>) {
  const strings = sourceStrings();
  const errors: string[] = [];
  const orphans: string[] = [];
  const stale: string[] = [];
  const valid = new Map<string, string>();
  for (const [path, entry] of Object.entries(translations)) {
    const current = strings.get(path);
    if (current === undefined) {
      orphans.push(`${path}: ${isTranslatable(path) ? 'no such English string any more' : 'must stay as written'}`);
      continue;
    }
    if (!entry.ar?.trim()) continue;
    // A changed English string makes its old translation stale; the page shows English until it is redone.
    if (entry.en !== current) {
      stale.push(path);
      continue;
    }
    if (tokens(entry.ar).join('|') !== tokens(current).join('|')) {
      errors.push(`${path}: keep every {placeholder} and link URL from the English`);
    } else if (boldCount(entry.ar) !== boldCount(current)) {
      errors.push(`${path}: keep the same **bold** markers as the English`);
    } else {
      valid.set(path, entry.ar);
    }
  }
  // The hero splits the offer on its accent word, so the two only count as translated together.
  const pair = ['profile.offer', 'profile.offerAccent'];
  if (pair.some((path) => !valid.has(path))) {
    for (const path of pair.filter((path) => valid.delete(path))) stale.push(path);
  }
  const missing = [...strings.keys()].filter((path) => !valid.has(path) && !stale.includes(path));
  return { errors, orphans, stale, missing, valid };
}

function apply(value: unknown, translated: Map<string, string>, path = ''): unknown {
  if (typeof value === 'string') return translated.get(path) ?? value;
  if (Array.isArray(value))
    return value.map((item, index) => apply(item, translated, path ? `${path}.${index}` : `${index}`));
  if (value && typeof value === 'object' && !('src' in value && 'width' in value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, apply(item, translated, path ? `${path}.${key}` : key)]),
    );
  }
  return value;
}

const dictionaries: Partial<Record<Locale, Record<string, Entry>>> = { ar: arabic as Record<string, Entry> };

// Strings still to translate for a locale, in the shape the dictionary file takes, for the translation prompt.
export function untranslated(locale: Exclude<Locale, 'en'>) {
  const { stale, missing } = check(dictionaries[locale] ?? {});
  const strings = sourceStrings();
  return Object.fromEntries([...stale, ...missing].map((path) => [path, { en: strings.get(path)!, ar: '' }]));
}

const copies = new Map<Locale, Copy>();

function copyFor(locale: Locale): Copy {
  if (locale === defaultLocale) return source;
  const cached = copies.get(locale);
  if (cached) return cached;
  const { errors, orphans, stale, missing, valid } = check(dictionaries[locale] ?? {});
  const copy = apply(source, valid) as Copy;
  if (copy.profile.offer.split(copy.profile.offerAccent).length !== 2) {
    errors.push('profile.offerAccent: must appear exactly once in profile.offer');
  }
  // Leftover keys only block a published locale; before that an English edit must not break previews.
  if (locales[locale].published) errors.push(...orphans);
  else if (orphans.length) console.warn(`[i18n] ${locale}: ignoring ${orphans.join('; ')}`);
  if (errors.length) throw new Error(`src/i18n/${locale}.json:\n  ${errors.join('\n  ')}`);
  const gaps = stale.length + missing.length;
  if (gaps && locales[locale].published) {
    throw new Error(
      `src/i18n/${locale}.json is published but ${gaps} strings are missing or stale; see /i18n/${locale}.todo.json in dev.`,
    );
  }
  if (gaps)
    console.warn(
      `[i18n] ${locale}: ${missing.length} strings untranslated, ${stale.length} stale; they show in English.`,
    );
  copies.set(locale, copy);
  return copy;
}

let routes: Promise<Set<string>> | undefined;

// English paths that also exist in Arabic; collection pages count once their translated Markdown exists.
export function translatedPaths(): Promise<Set<string>> {
  routes ??= (async () => {
    if (!isBuilt('ar')) return new Set();
    const paths = new Set(sharedPaths);
    const lists = { services: await getServices('ar'), blog: await getPosts('ar'), work: await getWork('ar') };
    for (const [collection, entries] of Object.entries(lists)) {
      const ids = entries.filter((entry) => entry.locale === 'ar').map(({ id }) => id);
      for (const id of ids) paths.add(`/${collection}/${id}/`);
      if (ids.length) paths.add(`/${collection}/`);
    }
    return paths;
  })();
  return routes;
}

// The English path of any page, with the locale prefix removed.
export const basePath = (pathname: string) => pathname.replace(/^\/ar(?=\/)/, '') || '/';

// Page URLs in each locale that has the page, for hreflang and the language switch.
export async function alternates(pathname: string): Promise<Partial<Record<Locale, string>>> {
  const path = basePath(pathname);
  const arabic = (await translatedPaths()).has(path);
  return arabic ? { en: path, ar: `/ar${path}` } : { en: path };
}

/** The copy, links and formatting for one locale; components call it with Astro.currentLocale. */
export async function useCopy(current: string | undefined) {
  const locale = localeOf(current);
  const translated = await translatedPaths();
  const copy = copyFor(locale);
  // Internal links go to the same locale when that page exists there, otherwise to the English page.
  const href = (target: string) => (locale !== defaultLocale && localizedHref(target, locale, translated)) || target;
  const formatDate = (value: Date) =>
    value.toLocaleDateString(locales[locale].dateLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  // Marks content shown in another language than the page, such as an English card on an Arabic page.
  const langOf = (other: Locale) => (other === locale ? {} : { lang: locales[other].lang, dir: locales[other].dir });
  return { ...copy, english: source, locale, meta: locales[locale], href, formatDate, langOf };
}
