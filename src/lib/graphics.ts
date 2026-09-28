import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { h, img } from './render';
import { profile } from '../data/profile';

// The light theme's pinned values from global.css; satori can't read CSS variables.
const colors = {
  bg: '#fbfbfa',
  surface: '#f0f0ee',
  fg: '#111111',
  muted: '#6a6a6f',
};

let portrait: Promise<string> | undefined;

// satori needs the photo inline and astro:assets only hands out URLs, so this reads the source file.
async function loadPortrait() {
  const jpeg = await readFile(join(process.cwd(), 'src/assets/portrait.jpg'));
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
}

export function monogram({ rounded }: { rounded: boolean }) {
  return h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
      borderRadius: rounded ? '22%' : 0,
      color: colors.fg,
      fontFamily: 'Instrument Serif',
      fontSize: 300,
      letterSpacing: -6,
      paddingBottom: 24,
    },
    profile.name
      .split(' ')
      .map((part) => part[0])
      .join(''),
  );
}

export async function ogCard() {
  portrait ??= loadPortrait();
  return h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0 88px',
      backgroundColor: colors.surface,
      fontFamily: 'Geist',
    },
    [
      h('div', { display: 'flex', flexDirection: 'column', flexGrow: 1 }, [
        h(
          'div',
          { fontFamily: 'Instrument Serif', fontSize: 128, lineHeight: 0.92, letterSpacing: -2.5, color: colors.fg },
          profile.name,
        ),
        h('div', { marginTop: 30, fontSize: 40, fontWeight: 500, color: colors.fg }, profile.title),
        h('div', { marginTop: 14, fontSize: 30, color: colors.muted }, profile.location.label),
      ]),
      img(await portrait, 300, { marginLeft: 48, borderRadius: '50%', objectFit: 'cover' }),
    ],
  );
}
