import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { dark, light, scrim } from './tokens.mjs';

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

test('global.css declares exactly the colours in tokens.mjs', () => {
  const declared = Object.fromEntries(
    [...css.matchAll(/^\s*--color-([\w-]+):\s*(.+);$/gm)].map(([, name, value]) => [name, value]),
  );
  const expected = { scrim };
  for (const name of Object.keys(light)) expected[name] = `light-dark(${light[name]}, ${dark[name]})`;

  assert.deepEqual(Object.keys(dark).sort(), Object.keys(light).sort());
  assert.deepEqual(declared, expected);
});

const pairs = [
  ...['fg', 'body', 'muted', 'accent'].flatMap((text) => ['bg', 'surface', 'surface-2'].map((bg) => [text, bg, 4.5])),
  ...['error', 'success'].flatMap((text) => ['surface', 'field'].map((bg) => [text, bg, 4.5])),
  // Field placeholders.
  ['muted', 'field', 4.5],
  ...['field', 'surface', 'surface-2'].map((bg) => ['field-border', bg, 3]),
  // Primary buttons: text-bg on bg-fg, and text-surface on bg-fg in the contact band; ::selection is text-bg on bg-accent.
  ['bg', 'fg', 4.5],
  ['surface', 'fg', 4.5],
  ['bg', 'accent', 4.5],
];

for (const [theme, palette] of Object.entries({ light, dark })) {
  test(`${theme} theme keeps text at 4.5:1 and field borders at 3:1`, () => {
    // luminance() reads #rrggbb only; anything else would give NaN and slip past the ratio check.
    for (const name of new Set(pairs.flatMap(([text, bg]) => [text, bg]))) {
      assert.match(palette[name], /^#[0-9a-f]{6}$/i, `${theme} ${name} is not #rrggbb`);
    }
    const failures = pairs
      .map(([text, bg, min]) => ({ pair: `${text} on ${bg}`, ratio: contrast(palette[text], palette[bg]), min }))
      .filter(({ ratio, min }) => ratio < min);
    assert.deepEqual(failures, []);
  });
}
