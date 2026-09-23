import type { APIRoute } from 'astro';
import { ogCard } from '../lib/graphics';
import { renderPng } from '../lib/render';

export const GET: APIRoute = async ({ site }) => {
  const png = await renderPng(ogCard(site!.host), 1200, 630);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
