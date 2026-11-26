import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { iconSvg } from './mark';
import { h, img } from './render';
import { brand, colors } from './tokens.mjs';
import { profile } from '../data/profile';

let portrait: Promise<string> | undefined;
let background: Promise<string> | undefined;

// satori needs pictures inline and astro:assets only hands out URLs, so this reads the source files.
async function inline(file: string, type: string) {
  const data = await readFile(join(process.cwd(), 'src/assets', file));
  return `data:${type};base64,${data.toString('base64')}`;
}

export async function ogCard() {
  portrait ??= inline('portrait.jpg', 'image/jpeg');
  // The glow and app panels; it leaves the left side empty and a circle free where the portrait goes.
  background ??= inline('brand/og-background.png', 'image/png');
  const mark = `data:image/svg+xml;base64,${Buffer.from(iconSvg(true, 84)).toString('base64')}`;
  return h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0 88px',
      backgroundColor: colors.bg,
      fontFamily: 'Geist',
    },
    [
      img(await background, 1200, { position: 'absolute', top: 0, left: 0 }, 630),
      h('div', { display: 'flex', flexDirection: 'column', flexGrow: 1 }, [
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
            fontSize: 40,
            fontWeight: 500,
            color: colors.accent,
          },
          profile.title.split(' · ').map((part) => h('div', {}, part)),
        ),
        h('div', { marginTop: 12, fontSize: 30, color: colors.body }, profile.ogLine),
      ]),
      img(await portrait, 300, {
        marginLeft: 48,
        borderRadius: '50%',
        border: `8px solid ${brand.electric}`,
        objectFit: 'cover',
      }),
    ],
  );
}
