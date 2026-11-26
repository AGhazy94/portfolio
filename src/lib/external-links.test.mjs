import assert from 'node:assert/strict';
import { test } from 'node:test';
import { localizedHref, taggedHref } from './external-links.mjs';

const host = 'ahmed-ghazy.com';

test('adds our UTM tags to an external link and keeps the fragment', () => {
  assert.equal(
    taggedHref('https://supabase.com/docs/guides/auth#redirects', host),
    'https://supabase.com/docs/guides/auth?utm_source=ahmed-ghazy.com&utm_medium=referral#redirects',
  );
});

test('replaces tracking tags left by other sites and keeps real parameters', () => {
  assert.equal(
    taggedHref('https://example.com/page?id=7&utm_source=chatgpt.com&ref=perplexity', host),
    'https://example.com/page?id=7&utm_source=ahmed-ghazy.com&utm_medium=referral',
  );
});

test('leaves internal, relative and non-web links alone', () => {
  for (const href of ['/blog/', 'https://ahmed-ghazy.com/work/', 'mailto:hi@example.com', '#faq', undefined]) {
    assert.equal(taggedHref(href, host), null);
  }
});

test('moves internal links under the locale prefix only where the page is translated', () => {
  const paths = new Set(['/', '/services/', '/services/mvp-development/']);
  assert.equal(localizedHref('/services/mvp-development/#faq', 'ar', paths), '/ar/services/mvp-development/#faq');
  assert.equal(localizedHref('/', 'ar', paths), '/ar/');
  assert.equal(localizedHref('/#contact', 'ar', paths), '/ar/#contact');
  for (const href of ['/blog/how-to-fix-a-vibe-coded-app/', '/ahmed-ghazy-resume.pdf', '//cdn.example.com/x', '#faq']) {
    assert.equal(localizedHref(href, 'ar', paths), null);
  }
});
