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
 * Markdown links to other sites open in a new tab and carry our UTM tags, since rel="noreferrer"
 * hides the referrer from the site we link to.
 * @param {{ site: string, newTab: string }} options
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
        context.setProperty(node, 'href', href);
        context.setProperty(node, 'target', '_blank');
        context.setProperty(node, 'rel', ['noreferrer', 'noopener']);
        context.appendChild(node, {
          type: 'element',
          tagName: 'span',
          properties: { className: ['sr-only'] },
          children: [{ type: 'text', value: newTab }],
        });
      },
    },
  });
}
