import assert from 'node:assert/strict';
import test from 'node:test';
import { sendContactEmail } from '../src/lib/mailer.ts';

const previousEnv = { ...process.env };

test.afterEach(() => {
  process.env = { ...previousEnv };
});

const lead = {
  name: 'Ada',
  email: 'ada@example.com',
  phone: '+91 98765 43210',
  company: 'Acme',
  projectType: 'Website Development',
  message: 'Build a website',
};

test('previews contact email in development when SMTP is not configured', async () => {
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  process.env.NODE_ENV = 'development';

  const result = await sendContactEmail(lead);
  assert.deepEqual(result.accepted, ['contact@decodeinfotech.in']);
  assert.equal(result.preview, true);
});

test('requires SMTP credentials in production', async () => {
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  process.env.NODE_ENV = 'production';

  await assert.rejects(() => sendContactEmail(lead), /SMTP credentials/);
});
