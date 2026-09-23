import type { APIRoute } from 'astro';
import { monogram } from '../lib/graphics';
import { renderPng } from '../lib/render';

// A single-image ICO container wrapping a 32x32 PNG, which every modern browser accepts.
export const GET: APIRoute = async () => {
  const png = await renderPng(monogram({ rounded: true }), 512, 512, 32);
  const header = new DataView(new ArrayBuffer(22));
  header.setUint16(2, 1, true);
  header.setUint16(4, 1, true);
  header.setUint8(6, 32);
  header.setUint8(7, 32);
  header.setUint16(10, 1, true);
  header.setUint16(12, 32, true);
  header.setUint32(14, png.byteLength, true);
  header.setUint32(18, 22, true);

  const ico = new Uint8Array(22 + png.byteLength);
  ico.set(new Uint8Array(header.buffer), 0);
  ico.set(png, 22);
  return new Response(ico, { headers: { 'Content-Type': 'image/x-icon' } });
};
