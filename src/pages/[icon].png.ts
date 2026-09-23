import type { APIRoute, GetStaticPaths } from 'astro';
import { monogram } from '../lib/graphics';
import { renderPng } from '../lib/render';

// Touch and maskable icons get a full-bleed square; platforms apply their own corner mask.
const sizes = {
  'apple-touch-icon': 180,
  'icon-192': 192,
  'icon-512': 512,
};

export const getStaticPaths = (() =>
  Object.entries(sizes).map(([icon, size]) => ({ params: { icon }, props: { size } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderPng(monogram({ rounded: false }), 512, 512, (props as { size: number }).size);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
