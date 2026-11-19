import type { APIRoute } from 'astro';
import { iconSvg } from '../lib/mark';

export const GET: APIRoute = () => new Response(iconSvg(true), { headers: { 'Content-Type': 'image/svg+xml' } });
