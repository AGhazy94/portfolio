import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { iconSvg } from './mark';
import { h, img } from './render';
import { brand, colors } from './tokens.mjs';
import { profile as english } from '../data/profile';

type Card = { profile: Pick<typeof english, 'name' | 'title' | 'ogLine'>; dir: 'ltr' | 'rtl' };
type Style = Parameters<typeof h>[1];

let portrait: Promise<string> | undefined;
const backgrounds = new Map<Card['dir'], Promise<string>>();

// satori needs pictures inline and astro:assets only hands out URLs, so this reads the source files.
async function inline(file: string, type: string, mirror = false) {
  const path = join(process.cwd(), 'src/assets', file);
  const data = mirror ? await sharp(path).flop().png().toBuffer() : await readFile(path);
  return `data:${type};base64,${data.toString('base64')}`;
}

// satori has no bidi: it sets every word left to right, so an Arabic line is laid out word by word, right to left.
function rtlLine(text: string, style: Style) {
  const words: string[] = [];
  for (const word of text.split(' ')) {
    const latin = !/[؀-ۿ]/.test(word);
    if (latin && words.length && !/[؀-ۿ]/.test(words[words.length - 1])) words[words.length - 1] += ` ${word}`;
    else words.push(word);
  }
  return h(
    'div',
    { ...style, display: 'flex', flexDirection: 'row-reverse', alignItems: 'baseline', columnGap: '0.26em' },
    words.map((word) => h('div', { fontFamily: /[؀-ۿ]/.test(word) ? 'Readex Pro' : 'Geist' }, word)),
  );
}

export async function ogCard({ profile, dir }: Card = { profile: english, dir: 'ltr' }) {
  const rtl = dir === 'rtl';
  const line = (text: string, style: Style) => (rtl ? rtlLine(text, style) : h('div', style, text));
  portrait ??= inline('portrait.jpg', 'image/jpeg');
  // The glow and app panels; it leaves one side empty and a circle free where the portrait goes, mirrored for RTL.
  if (!backgrounds.has(dir)) backgrounds.set(dir, inline('brand/og-background.png', 'image/png', rtl));
  const mark = `data:image/svg+xml;base64,${Buffer.from(iconSvg(true, 84)).toString('base64')}`;
  return h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      ...(rtl ? { flexDirection: 'row-reverse' } : {}),
      alignItems: 'center',
      padding: '0 88px',
      backgroundColor: colors.bg,
      fontFamily: 'Geist',
    },
    [
      img((await backgrounds.get(dir))!, 1200, { position: 'absolute', top: 0, left: 0 }, 630),
      h('div', { display: 'flex', flexDirection: 'column', flexGrow: 1, ...(rtl ? { alignItems: 'flex-end' } : {}) }, [
        img(mark, 84, {}),
        h(
          'div',
          {
            marginTop: 40,
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: 104,
            lineHeight: 0.98,
            letterSpacing: -4,
            color: colors.fg,
          },
          profile.name,
        ),
        // One line would push the portrait off the card, so each part of the title gets its own.
        h(
          'div',
          {
            marginTop: 26,
            display: 'flex',
            flexDirection: 'column',
            ...(rtl ? { alignItems: 'flex-end', rowGap: 4 } : {}),
            fontSize: 40,
            fontWeight: 500,
            color: colors.accent,
          },
          profile.title.split(' · ').map((part) => line(part, {})),
        ),
        line(profile.ogLine, { marginTop: rtl ? 16 : 12, fontSize: 30, color: colors.body }),
      ]),
      img(await portrait, 300, {
        [rtl ? 'marginRight' : 'marginLeft']: 48,
        borderRadius: '50%',
        border: `8px solid ${brand.electric}`,
        objectFit: 'cover',
      }),
    ],
  );
}
