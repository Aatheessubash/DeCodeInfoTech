import assert from 'node:assert/strict';
import test from 'node:test';
import { escapeHtml } from '../src/lib/html.ts';
import { handleSubmission, parseCareer, parseContact } from '../src/lib/submissions.ts';

const contact = { name: '  Ada  ', email: 'ada@example.com', message: 'Build a website' };
const request = (body) =>
  new Request('https://example.com/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  });

test('normalizes contact fields and supplies an optional category', () => {
  assert.deepEqual(parseContact(contact), {
    name: 'Ada',
    email: 'ada@example.com',
    message: 'Build a website',
    company: '',
    projectType: 'General enquiry',
  });
});

test('rejects malformed, missing, oversized, and non-string fields', () => {
  for (const input of [
    null,
    [],
    {},
    { ...contact, name: {} },
    { ...contact, message: ' ' },
    { ...contact, message: 'x'.repeat(10001) },
    { ...contact, email: 'invalid' },
    { ...contact, email: 'a@example.com\r\nBcc:other@example.com' },
  ]) {
    assert.throws(() => parseContact(input));
  }
});

test('career applications require a safe portfolio URL', () => {
  const application = { name: 'Ada', email: 'ada@example.com', portfolio: 'https://example.com' };
  assert.equal(parseCareer(application).jobTitle, 'General Application');
  for (const portfolio of ['javascript:alert(1)', 'file:///etc/passwd', 'invalid']) {
    assert.throws(() => parseCareer({ ...application, portfolio }));
  }
});

test('escapes user content before inserting it in HTML mail', () => {
  assert.equal(
    escapeHtml('<a href="x">Tom & \'Ada\'</a>'),
    '&lt;a href=&quot;x&quot;&gt;Tom &amp; &#39;Ada&#39;&lt;/a&gt;',
  );
});

test('does not deliver malformed submissions', async () => {
  let called = false;
  const response = await handleSubmission(request({}), parseContact, async () => {
    called = true;
  });
  assert.equal(response.status, 400);
  assert.equal(called, false);
});

test('invalid JSON returns a client error', async () => {
  const response = await handleSubmission(
    new Request('https://example.com', {
      method: 'POST',
      body: '{',
    }),
    parseContact,
    async () => {},
  );
  assert.equal(response.status, 400);
});

test('delivery failures return 503 without leaking provider details', async () => {
  const response = await handleSubmission(request(contact), parseContact, async () => {
    throw new Error('secret SMTP diagnostic');
  });
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.success, false);
  assert.ok(!body.message.includes('secret'));
});

test('successful submissions deliver normalized data before reporting success', async () => {
  let delivered;
  const response = await handleSubmission(request(contact), parseContact, async (value) => {
    delivered = value;
  });
  assert.equal(delivered.name, 'Ada');
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
});
