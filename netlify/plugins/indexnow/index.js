import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const onSuccess = async ({ constants }) => {
  if (process.env.CONTEXT !== 'production') return;

  try {
    const dir = constants.PUBLISH_DIR;
    const key = (await readFile(join(dir, 'indexnow.txt'), 'utf8')).trim();
    const sitemap = await readFile(join(dir, 'sitemap-0.xml'), 'utf8');
    const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
    const { host, origin } = new URL(urlList[0]);

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation: `${origin}/indexnow.txt`, urlList }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`IndexNow rejected the request with HTTP ${response.status}`);
    console.log(`IndexNow: ${response.status} for ${urlList.length} URLs`);
  } catch (error) {
    // A failed ping must never read as a failed deploy.
    console.warn(`IndexNow skipped: ${error.message}`);
  }
};
