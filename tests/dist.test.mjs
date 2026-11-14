// Reads the built site, so it runs after `npm run build` (npm run test:dist), never inside `npm test`.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join, sep } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const NEW_TAB = '(opens in a new tab)';
// JSON data blocks never execute, so the CSP has nothing to allow.
const DATA_TYPES = new Set(['application/ld+json', 'application/json']);

function loadPages() {
  let files;
  try {
    files = readdirSync(dist, { recursive: true }).filter((file) => file.endsWith('.html'));
  } catch {
    throw new Error('dist/ is missing: run `npm run build` first.');
  }
  return files.map((file) => ({
    file,
    path: `/${file.split(sep).join('/')}`.replace(/\/index\.html$/, '/').replace(/\.html$/, ''),
    html: readFileSync(join(dist, file), 'utf8'),
  }));
}

const pages = loadPages();
const siteHost = new URL(readFileSync(join(dist, 'sitemap-index.xml'), 'utf8').match(/<loc>([^<]+)<\/loc>/)[1]).host;

const ATTRIBUTE = /\s*([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/y;

function parseAttributes(source, from = 0) {
  const attrs = {};
  ATTRIBUTE.lastIndex = from;
  let index = from;
  for (let match; (match = ATTRIBUTE.exec(source)); index = ATTRIBUTE.lastIndex) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return { attrs, end: source.indexOf('>', index) + 1 };
}

// Start tags of one element, in document order; quoted values may hold ">".
function* tags(html, name) {
  for (const match of html.matchAll(new RegExp(`<${name}(?=[\\s/>])`, 'gi'))) {
    const { attrs, end } = parseAttributes(html, match.index + match[0].length);
    yield { attrs, start: match.index, end };
  }
}

const inner = (html, tag, name) => html.slice(tag.end, html.indexOf(`</${name}>`, tag.end));

const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const scripts = (html) =>
  [...html.matchAll(SCRIPT)].map(([, attributes, source]) => ({ attrs: parseAttributes(attributes).attrs, source }));

// Script and style text and comments can hold tag-like strings that are not markup.
const markup = (html) => html.replace(SCRIPT, '').replace(/<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, '');

function contactForm(html) {
  const body = markup(html);
  const forms = [...tags(body, 'form')].filter(({ attrs }) => attrs.name === 'contact');
  if (!forms.length) return null;
  assert.equal(forms.length, 1, 'a page renders the contact form once');
  const fields = ['input', 'select', 'textarea']
    .flatMap((name) => [...tags(inner(body, forms[0], 'form'), name)].map((tag) => ({ name, ...tag })))
    .filter(({ attrs }) => attrs.name)
    .sort((a, b) => a.start - b.start);
  return { attrs: forms[0].attrs, fields };
}

test('the contact form keeps the Netlify contract, with the same fields on every page', () => {
  const found = pages.map((page) => ({ page, form: contactForm(page.html) })).filter(({ form }) => form);
  assert.ok(
    found.some(({ page }) => page.path === '/'),
    'the home page has no contact form',
  );

  const signature = ({ fields }) => fields.map(({ name, attrs }) => `${name}[${attrs.type ?? ''}] ${attrs.name}`);
  const count = (list) => found.filter(({ form }) => `${signature(form)}` === `${list}`).length;
  // The field set most pages share is the reference, so one broken page doesn't flag every other one.
  const expected = found.map(({ form }) => signature(form)).sort((a, b) => count(b) - count(a))[0];
  const problems = [];
  for (const { page, form } of found) {
    const field = (name) => form.fields.find(({ attrs }) => attrs.name === name)?.attrs;
    const expect = (ok, message) => ok || problems.push(`${page.file}: ${message}`);
    expect(form.attrs.method?.toUpperCase() === 'POST', 'method is not POST');
    expect(form.attrs.action === '/thanks/', 'action is not /thanks/');
    expect(form.attrs['data-netlify'] === 'true', 'data-netlify="true" is missing');
    expect(form.attrs['netlify-honeypot'] === 'bot-field', 'netlify-honeypot="bot-field" is missing');
    expect(field('form-name')?.type === 'hidden' && field('form-name').value === 'contact', 'no hidden form-name');
    expect(field('bot-field'), 'no bot-field honeypot input');
    expect(field('email')?.type === 'email', 'no email input');
    expect(field('subject')?.type === 'hidden', 'no hidden subject');
    expect(field('page')?.type === 'hidden' && field('page').value === page.path, `page field is not ${page.path}`);
    const firstTouch = form.fields.filter(({ attrs }) => attrs.name.startsWith('first-'));
    expect(firstTouch.length && firstTouch.every(({ attrs }) => attrs.type === 'hidden'), 'no hidden first-* fields');
    const fields = signature(form);
    const missing = expected.filter((field) => !fields.includes(field));
    const extra = fields.filter((field) => !expected.includes(field));
    expect(
      `${fields}` === `${expected}`,
      `fields differ from the other pages (missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'})`,
    );
  }
  assert.deepEqual(problems, []);
});

test('every external link opens in a new tab and says so', () => {
  const problems = [];
  for (const page of pages) {
    const body = markup(page.html);
    for (const link of tags(body, 'a')) {
      const { href = '', target, rel = '' } = link.attrs;
      if (!/^https?:\/\//i.test(href) || new URL(href).host === siteHost) continue;
      const text = inner(body, link, 'a');
      const hint = [...tags(text, 'span')].some(
        (span) => span.attrs.class?.split(/\s+/).includes('sr-only') && inner(text, span, 'span').trim() === NEW_TAB,
      );
      const tokens = rel.split(/\s+/);
      const expect = (ok, message) => ok || problems.push(`${page.file}: ${href} ${message}`);
      expect(target === '_blank', 'has no target="_blank"');
      expect(tokens.includes('noreferrer') && tokens.includes('noopener'), 'needs rel="noreferrer noopener"');
      expect(hint, `has no sr-only "${NEW_TAB}" span`);
      expect(!('aria-label' in link.attrs) && !('aria-labelledby' in link.attrs), 'replaces its text with a label');
    }
  }
  assert.deepEqual(problems, []);
});

test("every inline script is hashed in its page's CSP", () => {
  const problems = [];
  for (const page of pages) {
    const meta = [...tags(page.html, 'meta')].find(
      ({ attrs }) => attrs['http-equiv']?.toLowerCase() === 'content-security-policy',
    );
    const scriptSrc =
      meta?.attrs.content
        .split(';')
        .map((directive) => directive.trim().split(/\s+/))
        .find(([name]) => name === 'script-src') ?? [];
    for (const { attrs, source } of scripts(page.html)) {
      if ('src' in attrs || DATA_TYPES.has(attrs.type?.toLowerCase())) continue;
      const hash = `'sha256-${createHash('sha256').update(source).digest('base64')}'`;
      const excerpt = source.trim().replace(/\s+/g, ' ').slice(0, 60);
      if (!scriptSrc.includes(hash)) problems.push(`${page.file}: ${hash} is missing from script-src (${excerpt}…)`);
    }
  }
  assert.deepEqual(problems, []);
});
