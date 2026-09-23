import type { APIRoute } from 'astro';
import { monogram } from '../lib/graphics';
import { renderSvg } from '../lib/render';

export const GET: APIRoute = async () => {
  const svg = await renderSvg(monogram({ rounded: true }), 512, 512);
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
