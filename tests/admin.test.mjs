import assert from 'node:assert/strict';
import test from 'node:test';
import { POST } from '../src/app/api/admin/login/route.ts';

const request = (body) =>
  new Request('https://example.com/api/admin/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });

test('admin login fails closed and only accepts configured credentials', async () => {
  const original = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };
  try {
    delete process.env.ADMIN_USERNAME;
    delete process.env.ADMIN_PASSWORD;
    assert.equal((await POST(request({ username: 'admin', password: 'admin' }))).status, 503);
    process.env.ADMIN_USERNAME = 'test-editor';
    process.env.ADMIN_PASSWORD = 'test-only-secret';
    assert.equal((await POST(request(null))).status, 400);
    assert.equal((await POST(request({ username: 'test-editor', password: 'wrong' }))).status, 401);
    assert.equal(
      (await POST(request({ username: 'test-editor', password: 'test-only-secret' }))).status,
      200,
    );
  } finally {
    for (const [key, value] of [
      ['ADMIN_USERNAME', original.username],
      ['ADMIN_PASSWORD', original.password],
    ]) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
