import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import React, { act, StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import swc from 'next/dist/build/swc/index.js';
const require = createRequire(import.meta.url);
const { JSDOM } = require(join(process.env.TEMP, 'decode-validation/node_modules/jsdom'));
await swc.loadBindings();
const hookPath = resolve('src/hooks/useStoredData.ts');
const { code } = await swc.transform(await readFile(hookPath, 'utf8'), {
  filename: hookPath,
  jsc: { parser: { syntax: 'typescript' }, target: 'es2022' },
  module: { type: 'es6' },
});
await writeFile('.dist/validation/useStoredData.mjs', code);
const { useStoredData } = await import('./useStoredData.mjs');
const defaults = { heroHeadline: 'Default headline', heroVideoUrl: '/sample.mp4' };
const arrayDefaults = [{ id: 'default' }];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
async function check(label, saved, fallback, expected, { blocked = false, normalize } = {}) {
  delete globalThis.window;
  delete globalThis.document;
  delete globalThis.localStorage;
  const values = [];
  let update;
  function Probe() {
    const [value, setValue] = useStoredData('site', fallback, normalize);
    update = setValue;
    values.push(value);
    return React.createElement('output', null, JSON.stringify(value));
  }
  const app = React.createElement(StrictMode, null, React.createElement(Probe));
  const html = renderToString(app);
  values.length = 0;
  const dom = new JSDOM(`<div id="root">${html}</div>`, { url: 'http://localhost' });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.localStorage = dom.window.localStorage;
  if (saved !== undefined) localStorage.setItem('site', saved);
  if (blocked) globalThis.localStorage = { getItem() { throw Error('Blocked'); }, setItem() { throw Error('Blocked'); } };
  const errors = [];
  let root;
  await act(async () => {
    root = hydrateRoot(document.getElementById('root'), app, { onRecoverableError: error => errors.push(error.message) });
  });
  assert.deepEqual(errors, [], `${label}: hydration errors`);
  assert.deepEqual(values[0], fallback, `${label}: first render must match server`);
  assert.deepEqual(JSON.parse(document.querySelector('output').textContent), expected, `${label}: stored data`);
  if (!blocked) {
    assert.deepEqual(JSON.parse(localStorage.getItem('site')), expected, `${label}: persistence`);
    const edited = Array.isArray(fallback) ? [{ id: 'edited' }] : { ...expected, heroHeadline: 'Edited headline' };
    await act(async () => update(edited));
    assert.deepEqual(JSON.parse(localStorage.getItem('site')), edited, `${label}: updates persist`);
  }
  await act(async () => root.unmount());
  dom.window.close();
  console.log(`PASS ${label}`);
}
await check('custom content survives hydration and persists', JSON.stringify({ heroHeadline: 'Custom headline' }), defaults, { ...defaults, heroHeadline: 'Custom headline' });
await check('fresh storage', undefined, defaults, defaults);
await check('malformed JSON recovers', '{broken', defaults, defaults);
await check('null storage recovers', 'null', defaults, defaults);
await check('wrong object shape recovers', '[]', defaults, defaults);
await check('stored array survives hydration', '[{"id":"custom"}]', arrayDefaults, [{ id: 'custom' }]);
await check('wrong array shape recovers', '{}', arrayDefaults, arrayDefaults);
await check('blocked storage keeps site working', undefined, defaults, defaults, { blocked: true });
await check('content migration is preserved', '{"heroHeadline":"Old headline"}', defaults, { ...defaults, heroHeadline: 'New headline' }, { normalize: value => ({ ...value, heroHeadline: value.heroHeadline === 'Old headline' ? 'New headline' : value.heroHeadline }) });

