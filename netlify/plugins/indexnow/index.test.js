import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { onSuccess } from './index.js';

async function fixture(context) {
  const directory = await mkdtemp(join(tmpdir(), 'portfolio-indexnow-'));
  const previousContext = process.env.CONTEXT;
  context.after(async () => {
    if (previousContext === undefined) delete process.env.CONTEXT;
    else process.env.CONTEXT = previousContext;
    await rm(directory, { recursive: true, force: true });
  });
  process.env.CONTEXT = 'production';
  await writeFile(join(directory, 'indexnow.txt'), 'test-key-1234\n');
  await writeFile(
    join(directory, 'sitemap-0.xml'),
    '<urlset><url><loc>https://example.com/</loc></url><url><loc>https://example.com/work/</loc></url></urlset>',
  );
  return { constants: { PUBLISH_DIR: directory } };
}

test('skips deploy previews without reading files or notifying engines', async (context) => {
  const options = await fixture(context);
  process.env.CONTEXT = 'deploy-preview';
  const request = context.mock.method(globalThis, 'fetch', async () => {
    throw new Error('Preview must not submit URLs');
  });
  await onSuccess({ constants: { PUBLISH_DIR: join(options.constants.PUBLISH_DIR, 'missing') } });
  assert.equal(request.mock.callCount(), 0);
});

test('submits production URLs with a deadline and accepts pending key validation', async (context) => {
  const options = await fixture(context);
  const request = context.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 202 }));
  const deadline = context.mock.method(AbortSignal, 'timeout');
  const log = context.mock.method(console, 'log', () => {});
  const warning = context.mock.method(console, 'warn', () => {});
  await onSuccess(options);
  assert.equal(request.mock.callCount(), 1);
  const [url, init] = request.mock.calls[0].arguments;
  assert.equal(url, 'https://api.indexnow.org/indexnow');
  assert.equal(init.method, 'POST');
  assert.ok(init.signal instanceof AbortSignal);
  assert.equal(deadline.mock.calls[0].arguments[0], 10000);
  assert.deepEqual(JSON.parse(init.body), {
    host: 'example.com',
    key: 'test-key-1234',
    keyLocation: 'https://example.com/indexnow.txt',
    urlList: ['https://example.com/', 'https://example.com/work/'],
  });
  assert.match(log.mock.calls[0].arguments[0], /202 for 2 URLs/);
  assert.equal(warning.mock.callCount(), 0);
});

test('warns on rejection without reporting success or failing the deploy', async (context) => {
  const options = await fixture(context);
  context.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 403 }));
  const log = context.mock.method(console, 'log', () => {});
  const warning = context.mock.method(console, 'warn', () => {});
  await assert.doesNotReject(onSuccess(options));
  assert.equal(log.mock.callCount(), 0);
  assert.match(warning.mock.calls[0].arguments[0], /HTTP 403/);
});

test('warns on a timeout without failing the deploy', async (context) => {
  const options = await fixture(context);
  context.mock.method(globalThis, 'fetch', async () => {
    throw new DOMException('Request timed out', 'TimeoutError');
  });
  const warning = context.mock.method(console, 'warn', () => {});
  await assert.doesNotReject(onSuccess(options));
  assert.match(warning.mock.calls[0].arguments[0], /Request timed out/);
});
