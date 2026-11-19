import { brand } from './tokens.mjs';

// The logo picked on 2026-11-19 ("curve", concept 1): the initials on a 64-unit grid, closed by a full stop.
const initials =
  'M4 49 13 19Q15 13 18 19L27 49M8 36H23M51 20Q48 16 42 16C35 16 30 22 30 32S35 48 42 48Q47 48 51 44V33H42';
const stroke = 7;

interface Mark {
  ink: string;
  dot?: string;
  // A tile turns the mark into an app icon; without one the viewBox hugs the letters.
  tile?: string;
  rounded?: boolean;
  size?: number;
  className?: string;
}

export function markSvg({ ink, dot = brand.sunset, tile, rounded = true, size, className }: Mark) {
  const viewBox = tile ? '-6 -6 76 76' : '0 12 64 40';
  const attributes = [
    'xmlns="http://www.w3.org/2000/svg"',
    `viewBox="${viewBox}"`,
    size && `width="${size}" height="${size}"`,
    className && `class="${className}"`,
    !size && 'aria-hidden="true" focusable="false"',
  ].filter(Boolean);
  const background = tile
    ? `<rect x="-6" y="-6" width="76" height="76" rx="${rounded ? 16.7 : 0}" fill="${tile}"/>`
    : '';
  return (
    `<svg ${attributes.join(' ')}>${background}` +
    `<path d="${initials}" fill="none" stroke="${ink}" stroke-width="${stroke}" stroke-linejoin="round"/>` +
    `<circle cx="59" cy="44.5" r="4.5" fill="${dot}"/></svg>`
  );
}

// Favicon and touch icons: white initials on electric blue, where they stand out in a tab bar.
export const iconSvg = (rounded: boolean, size = 512) =>
  markSvg({ ink: '#ffffff', tile: brand.electric, rounded, size });
