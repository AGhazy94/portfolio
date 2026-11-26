import type { APIRoute } from 'astro';
import { untranslated } from '../../i18n';

// Dev only: /i18n/ar.todo.json lists every interface string still to translate, in the shape src/i18n/ar.json takes.
export function getStaticPaths() {
  return import.meta.env.DEV ? [{ params: { file: 'ar.todo.json' } }] : [];
}

export const GET: APIRoute = () =>
  new Response(`${JSON.stringify(untranslated('ar'), null, 2)}\n`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
