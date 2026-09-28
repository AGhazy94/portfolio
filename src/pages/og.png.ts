import type { APIRoute } from 'astro';
import { ogCard } from '../lib/graphics';
import { renderPng } from '../lib/render';

export const GET: APIRoute = async () => {
  const png = await renderPng(await ogCard(), 1200, 630);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
