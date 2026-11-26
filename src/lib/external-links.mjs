import { defineHastPlugin } from 'satteri';

// Tags other sites (AI tools included) put on a URL; ours replace them.
const TRACKING = /^(?:utm_.+|ref|ref_src|fbclid|gclid|msclkid)$/;

/**
 * The tagged address for an external link, or null for internal, relative and non-web links.
 * @param {unknown} href
 * @param {string} host
 */
export function taggedHref(href, host) {
  if (typeof href !== 'string' || !/^https?:\/\//.test(href)) return null;
  const url = new URL(href);
  if (url.hostname === host) return null;
  for (const key of [...url.searchParams.keys()]) if (TRACKING.test(key)) url.searchParams.delete(key);
  url.searchParams.set('utm_source', host);
  url.searchParams.set('utm_medium', 'referral');
  return url.href;
}

/**
 * An internal link moved under the locale prefix when that page exists in the locale, else unchanged.
 * @param {unknown} href
 * @param {string} locale
 * @param {Set<string>} paths English paths that exist in the locale
 */
export function localizedHref(href, locale, paths) {
  if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return null;
  const [, path = '/', rest = ''] = href.match(/^([^#?]*)(.*)$/) ?? [];
  return paths.has(path) ? `/${locale}${path}${rest}` : null;
}

/**
 * Translated Markdown keeps the English link targets; on its pages they point at the translated page when one exists.
 * @param {{ locale: string, paths: Set<string> }} options
 */
export function hastLocalizedLinks({ locale, paths }) {
  return defineHastPlugin({
    name: 'localized-links',
    element: {
      filter: ['a'],
      visit(node, context) {
        if (!context.fileURL?.pathname.includes(`/src/content/${locale}/`)) return;
        const href = localizedHref(node.properties.href, locale, paths);
        if (href) context.setProperty(node, 'href', href);
      },
    },
  });
}

/**
 * Markdown links to other sites open in a new tab and carry our UTM tags, since rel="noreferrer"
 * hides the referrer from the site we link to.
 * @param {{ site: string, newTab: Record<string, string> }} options `newTab` per locale; `en` is the fallback
 */
export function hastExternalLinks({ site, newTab }) {
  const host = new URL(site).hostname;
  return defineHastPlugin({
    name: 'external-links',
    element: {
      filter: ['a'],
      visit(node, context) {
        const href = taggedHref(node.properties.href, host);
        if (!href) return;
        const locale = context.fileURL?.pathname.match(/\/src\/content\/([a-z]{2})\//)?.[1] ?? 'en';
        context.setProperty(node, 'href', href);
        context.setProperty(node, 'target', '_blank');
        context.setProperty(node, 'rel', ['noreferrer', 'noopener']);
        context.appendChild(node, {
          type: 'element',
          tagName: 'span',
          properties: { className: ['sr-only'] },
          children: [{ type: 'text', value: newTab[locale] || newTab.en }],
        });
      },
    },
  });
}
