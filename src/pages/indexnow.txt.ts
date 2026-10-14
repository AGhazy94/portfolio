import type { APIRoute } from 'astro';

// IndexNow checks this key against the keyLocation sent by netlify/plugins/indexnow.
const key = 'e206f7322a406fd87eec1df66b5acb78';

export const GET: APIRoute = () => new Response(key, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
