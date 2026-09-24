import type { APIRoute } from 'astro';
import { profile } from '../data/profile';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: profile.name,
        short_name: profile.name.split(' ')[0],
        description: profile.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#fbfbfa',
        theme_color: '#fbfbfa',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
