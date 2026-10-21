import assert from 'node:assert/strict';
import test from 'node:test';
import { checkRateLimit, resetRateLimits } from '../src/lib/rate-limit.js';
import { checkPayloadSize, getClientIp, stripCrlf, verifySameOrigin } from '../src/lib/security.js';
import { handleSubmission, parseContact } from '../src/lib/submissions.ts';
import nextConfig from '../next.config.mjs';

test('production next.config.mjs specifies complete HTTP security headers', async () => {
  const headersConfig = await nextConfig.headers();
  assert.ok(Array.isArray(headersConfig));
  const rootRule = headersConfig.find((r) => r.source === '/:path*');
  assert.ok(rootRule, 'Must contain a global /:path* security headers rule');

  const headerMap = new Map(rootRule.headers.map((h) => [h.key, h.value]));
  assert.ok(headerMap.has('Content-Security-Policy'), 'Must have Content-Security-Policy');
  assert.ok(headerMap.has('Strict-Transport-Security'), 'Must have Strict-Transport-Security');
  assert.ok(headerMap.has('X-Content-Type-Options'), 'Must have X-Content-Type-Options');
  assert.ok(headerMap.has('X-Frame-Options'), 'Must have X-Frame-Options');
  assert.ok(headerMap.has('Referrer-Policy'), 'Must have Referrer-Policy');
  assert.ok(headerMap.has('Cross-Origin-Opener-Policy'), 'Must have Cross-Origin-Opener-Policy');
  assert.ok(headerMap.has('Permissions-Policy'), 'Must have Permissions-Policy');
});

test('rate limiter blocks requests when threshold is exceeded', () => {
  resetRateLimits();
  const testIp = '198.51.100.42';

  const first = checkRateLimit('sec-test', testIp, 3, 10000, { forceLimit: true });
  assert.equal(first.allowed, true);
  assert.equal(first.remaining >= 1, true);

  const second = checkRateLimit('sec-test', testIp, 3, 10000, { forceLimit: true });
  assert.equal(second.allowed, true);

  const third = checkRateLimit('sec-test', testIp, 3, 10000, { forceLimit: true });
  assert.equal(third.allowed, true);

  const fourth = checkRateLimit('sec-test', testIp, 3, 10000, { forceLimit: true });
  assert.equal(fourth.allowed, false);
  assert.equal(fourth.remaining, 0);
  assert.ok(fourth.resetSeconds > 0);
});

test('getClientIp normalizes IP and ignores invalid or spoofed values', () => {
  const reqWithXff = new Request('https://example.com', {
    headers: { 'x-forwarded-for': '203.0.113.195, 10.0.0.1' },
  });
  assert.equal(getClientIp(reqWithXff), '203.0.113.195');

  const reqWithSpoof = new Request('https://example.com', {
    headers: { 'x-forwarded-for': '<script>alert(1)</script>' },
  });
  assert.equal(getClientIp(reqWithSpoof), '127.0.0.1');
});

test('verifySameOrigin blocks cross-site and malicious origins', () => {
  const crossSiteReq = new Request('https://www.decodeinfotech.in/api/contact', {
    method: 'POST',
    headers: { 'sec-fetch-site': 'cross-site' },
  });
  assert.equal(verifySameOrigin(crossSiteReq), false);

  const evilOriginReq = new Request('https://www.decodeinfotech.in/api/contact', {
    method: 'POST',
    headers: { origin: 'https://evil-attacker.com' },
  });
  assert.equal(verifySameOrigin(evilOriginReq), false);

  const legitOriginReq = new Request('https://www.decodeinfotech.in/api/contact', {
    method: 'POST',
    headers: { origin: 'https://www.decodeinfotech.in' },
  });
  assert.equal(verifySameOrigin(legitOriginReq), true);
});

test('checkPayloadSize rejects oversized payloads before parsing', () => {
  const oversizedReq = new Request('https://example.com/api/contact', {
    method: 'POST',
    headers: { 'content-length': String(100 * 1024) }, // 100KB > 64KB
  });
  assert.equal(checkPayloadSize(oversizedReq, 64 * 1024), false);

  const validReq = new Request('https://example.com/api/contact', {
    method: 'POST',
    headers: { 'content-length': String(2 * 1024) },
  });
  assert.equal(checkPayloadSize(validReq, 64 * 1024), true);
});

test('stripCrlf eliminates newline characters preventing header injection', () => {
  assert.equal(
    stripCrlf('Jane Doe\r\nBcc: hacker@example.com'),
    'Jane Doe Bcc: hacker@example.com',
  );
});

test('honeypot silently drops automated bot submissions without delivering email', async () => {
  let delivered = false;
  const botRequest = new Request('https://example.com/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Bot Spammer',
      email: 'bot@spam.com',
      phone: '+91 98765 43210',
      projectType: 'Website Development',
      message: 'Cheap SEO deals!',
      website: 'http://spam-link.ru', // honeypot triggered
    }),
  });

  const response = await handleSubmission(botRequest, parseContact, async () => {
    delivered = true;
  });

  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(delivered, false, 'Email delivery must NOT be called for honeypot bot submissions');
});
