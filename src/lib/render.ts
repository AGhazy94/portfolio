import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

// Resolve from the project root: endpoint code is bundled elsewhere at build time.
const require = createRequire(join(process.cwd(), 'package.json'));

type Style = Record<string, string | number>;
type Child = Node | string;
type Node = {
  type: string;
  props: { style?: Style; children?: Child | Child[]; src?: string; width?: number; height?: number };
};

export const h = (type: string, style: Style, children?: Child | Child[]): Node => ({
  type,
  props: { style, children },
});

export const img = (src: string, width: number, style: Style, height = width): Node => ({
  type: 'img',
  props: { src, width, height, style },
});

// satori reads WOFF but not WOFF2, so the files come from the Fontsource packages.
const faces = [
  {
    name: 'Instrument Serif',
    weight: 400,
    style: 'italic',
    file: '@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff',
  },
  {
    name: 'Space Grotesk',
    weight: 700,
    style: 'normal',
    file: '@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff',
  },
  { name: 'Geist', weight: 400, style: 'normal', file: '@fontsource/geist/files/geist-latin-400-normal.woff' },
  { name: 'Geist', weight: 500, style: 'normal', file: '@fontsource/geist/files/geist-latin-500-normal.woff' },
  {
    name: 'Readex Pro',
    weight: 400,
    style: 'normal',
    file: '@fontsource/readex-pro/files/readex-pro-arabic-400-normal.woff',
  },
  {
    name: 'Readex Pro',
    weight: 500,
    style: 'normal',
    file: '@fontsource/readex-pro/files/readex-pro-arabic-500-normal.woff',
  },
] as const;
let fonts: ReturnType<typeof loadFonts> | undefined;

function loadFonts() {
  return Promise.all(
    faces.map(async ({ name, weight, style, file }) => ({
      name,
      weight,
      style,
      data: await readFile(require.resolve(file)),
    })),
  );
}

// The SVG rasteriser scales photos softly, so drawing at twice the size and shrinking with Lanczos keeps them sharp.
export async function rasterise(svg: string, outputWidth: number) {
  const png = await sharp(Buffer.from(svg), { density: 144 })
    .resize(outputWidth)
    .png({ compressionLevel: 9 })
    .toBuffer();
  return new Uint8Array(png);
}

export async function renderPng(node: Node, width: number, height: number) {
  fonts ??= loadFonts();
  const svg = await satori(node as unknown as Parameters<typeof satori>[0], { width, height, fonts: await fonts });
  return rasterise(svg, width);
}
