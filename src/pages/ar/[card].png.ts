import type { APIRoute, GetStaticPaths } from 'astro';
import { isBuilt, useCopy } from '../../i18n';
import { ogCard } from '../../lib/graphics';
import { renderPng } from '../../lib/render';

// Built only with the Arabic pages, so production never serves an Arabic card nothing links to.
export const getStaticPaths = (() => (isBuilt('ar') ? [{ params: { card: 'og' } }] : [])) satisfies GetStaticPaths;

export const GET: APIRoute = async () => {
  const { profile, meta } = await useCopy('ar');
  const png = await renderPng(await ogCard({ profile, dir: meta.dir }), 1200, 630);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
