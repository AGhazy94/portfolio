import type { APIRoute, GetStaticPaths } from 'astro';
import { iconSvg } from '../lib/mark';
import { rasterise } from '../lib/render';

// Touch icons get a full-bleed square; platforms apply their own corner mask.
const sizes = {
  'apple-touch-icon': 180,
  'icon-192': 192,
};

export const getStaticPaths = (() =>
  Object.entries(sizes).map(([icon, size]) => ({ params: { icon }, props: { size } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await rasterise(iconSvg(false), (props as { size: number }).size);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
