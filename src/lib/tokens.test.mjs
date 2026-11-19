import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { brand, colors, scrim } from './tokens.mjs';

const css = await readFile(new URL('../styles/global.css', import.meta.url), 'utf8');

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
};

const declarations = (block) =>
  Object.fromEntries([...block.matchAll(/^\s*--color-([\w-]+):\s*(.+);$/gm)].map(([, name, value]) => [name, value]));

const blockOf = (opening) => {
  const start = css.indexOf(opening);
  assert.notEqual(start, -1, `global.css has no "${opening}" block`);
  return css.slice(start, css.indexOf('\n}', start));
};

test('global.css declares exactly the colours in tokens.mjs', () => {
  assert.deepEqual(declarations(blockOf('@theme {')), { ...colors, scrim });
});

test('the brand colours keep their 60/30/10 roles', () => {
  assert.equal(colors.bg, brand.midnight);
  assert.equal(colors.brand, brand.electric);
  assert.equal(colors.loud, brand.sunset);
});

const pairs = [
  ...['fg', 'body', 'muted', 'accent'].flatMap((text) =>
    ['bg', 'surface', 'surface-2', 'band'].map((bg) => [text, bg, 4.5]),
  ),
  // The contact form panel is surface-2 on the band.
  ...['error', 'success'].flatMap((text) => ['surface', 'surface-2', 'field'].map((bg) => [text, bg, 4.5])),
  // Field text and placeholders.
  ['fg', 'field', 4.5],
  ['muted', 'field', 4.5],
  ...['field', 'surface', 'surface-2', 'band'].map((bg) => ['field-border', bg, 3]),
  // Primary buttons and ::selection: midnight text on sunset orange.
  ['bg', 'loud', 4.5],
  // The electric blue only ever carries large text on the page (3:1).
  ['brand', 'bg', 3],
];

test('text keeps 4.5:1, large text and field borders 3:1', () => {
  // luminance() reads #rrggbb only; anything else would give NaN and slip past the ratio check.
  for (const name of new Set(pairs.flatMap(([text, bg]) => [text, bg]))) {
    assert.match(colors[name], /^#[0-9a-f]{6}$/i, `${name} is not #rrggbb`);
  }
  const failures = pairs
    .map(([text, bg, min]) => ({ pair: `${text} on ${bg}`, ratio: contrast(colors[text], colors[bg]), min }))
    .filter(({ ratio, min }) => ratio < min);
  assert.deepEqual(failures, []);
});
