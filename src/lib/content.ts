import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { locales } from '../i18n/locales.mjs';

type Locale = keyof typeof locales;
type Localized<T> = T & { locale: Locale };

// Drafts exist so the finished site can be previewed in dev; production never builds or lists them.
const live = (status: string, published: string) => !import.meta.env.PROD || status === published;

// Each English entry, replaced by its translation where one exists; `locale` says which language it is in.
function localize<E extends { id: string }, T extends { id: string }>(
  english: E[],
  translated: T[],
  locale: Locale,
): Localized<E | T>[] {
  const byId = new Map(translated.map((entry) => [entry.id, entry]));
  return english.map((entry) => {
    const translation = byId.get(entry.id);
    return translation ? { ...translation, locale } : { ...entry, locale: 'en' };
  });
}

// Asking Astro for an empty collection logs a warning on every call, so translations are looked up only once files exist.
const translationFiles = Object.keys(import.meta.glob('../content/ar/*/*.md'));
const hasTranslations = (collection: string) =>
  translationFiles.some((file) => file.startsWith(`../content/ar/${collection}/`));

// Translations whose English page does not exist would never be reached, so the build stops on them.
async function orphans(collection: 'services' | 'blog' | 'work', translated: { id: string }[]) {
  const ids = new Set((await getCollection(collection)).map(({ id }) => id));
  const orphan = translated.find(({ id }) => !ids.has(id));
  if (orphan) throw new Error(`src/content/ar/${collection}/${orphan.id}.md has no English page with the same name.`);
}

export async function getServices(locale: Locale = 'en') {
  const english = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
  const translated = locale === 'ar' && hasTranslations('services') ? await getCollection('servicesAr') : [];
  await orphans('services', translated);
  return localize<CollectionEntry<'services'>, CollectionEntry<'servicesAr'>>(english, translated, locale);
}

export type ServiceEntry = Awaited<ReturnType<typeof getServices>>[number];

export async function getPosts(locale: Locale = 'en') {
  const english = (await getCollection('blog', ({ data }) => live(data.status, 'published'))).sort(
    // getCollection's order is platform-dependent, so the id settles same-day posts the same way on every build.
    (a, b) => b.data.published.getTime() - a.data.published.getTime() || a.id.localeCompare(b.id),
  );
  const translated =
    locale === 'ar' && hasTranslations('blog')
      ? await getCollection('blogAr', ({ data }) => live(data.status, 'published'))
      : [];
  await orphans('blog', translated);
  return localize<CollectionEntry<'blog'>, CollectionEntry<'blogAr'>>(english, translated, locale);
}

export async function getWork(locale: Locale = 'en') {
  const english = (await getCollection('work', ({ data }) => live(data.status, 'shipped'))).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const translated =
    locale === 'ar' && hasTranslations('work')
      ? await getCollection('workAr', ({ data }) => live(data.status, 'shipped'))
      : [];
  await orphans('work', translated);
  return localize<CollectionEntry<'work'>, CollectionEntry<'workAr'>>(english, translated, locale);
}

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/content/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

// Drop <id>.png (or .jpg, .webp) into src/assets/content/<collection>/ and the page picks it up; translations share it.
export function contentImage(collection: 'services' | 'work' | 'blog', id: string) {
  for (const ext of ['png', 'jpg', 'jpeg', 'webp']) {
    const found = images[`../assets/content/${collection}/${id}.${ext}`];
    if (found) return found.default;
  }
}
