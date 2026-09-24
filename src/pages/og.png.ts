import type { APIRoute } from 'astro';
import { ogCard } from '../lib/graphics';
import { renderPng } from '../lib/render';

export const GET: APIRoute = async ({ site }) => {
  // The card prints the primary domain even on previews, where `site` is the preview's address.
  const host = new URL(process.env.URL ?? site!.href).host;
  const png = await renderPng(ogCard(host), 1200, 630);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
