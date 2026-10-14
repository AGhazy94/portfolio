import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';

export const getServices = async () => (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);

// Drafts exist so the finished site can be previewed in dev; production never builds or lists them.
export const getPosts = async () =>
  (await getCollection('blog', ({ data }) => !import.meta.env.PROD || data.status === 'published')).sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );

export const getWork = async () =>
  (await getCollection('work', ({ data }) => !import.meta.env.PROD || data.status === 'shipped')).sort(
    (a, b) => a.data.order - b.data.order,
  );

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/content/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

// Drop <id>.png (or .jpg, .webp) into src/assets/content/<collection>/ and the page picks it up.
export function contentImage(collection: 'services' | 'work' | 'blog', id: string) {
  for (const ext of ['png', 'jpg', 'jpeg', 'webp']) {
    const found = images[`../assets/content/${collection}/${id}.${ext}`];
    if (found) return found.default;
  }
}

export const formatDate = (value: Date) =>
  value.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
