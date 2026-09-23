import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

// Resolve from the project root: endpoint code is bundled elsewhere at build time.
const require = createRequire(join(process.cwd(), 'package.json'));

type Style = Record<string, string | number>;
type Child = Node | string;
type Node = { type: string; props: { style?: Style; children?: Child | Child[] } };

export const h = (type: string, style: Style, children?: Child | Child[]): Node => ({
  type,
  props: { style, children },
});

const weights = [400, 500, 700] as const;
let fonts: ReturnType<typeof loadFonts> | undefined;

function loadFonts() {
  return Promise.all(
    weights.map(async (weight) => ({
      name: 'Inter',
      weight,
      style: 'normal' as const,
      data: await readFile(require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`)),
    })),
  );
}

export async function renderSvg(node: Node, width: number, height: number) {
  fonts ??= loadFonts();
  return satori(node as unknown as Parameters<typeof satori>[0], { width, height, fonts: await fonts });
}

export async function renderPng(node: Node, width: number, height: number, outputWidth = width) {
  const svg = await renderSvg(node, width, height);
  const png = await sharp(Buffer.from(svg)).resize(outputWidth).png({ compressionLevel: 9 }).toBuffer();
  return new Uint8Array(png);
}
