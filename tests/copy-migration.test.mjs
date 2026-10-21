import assert from 'node:assert/strict';
import test from 'node:test';
import { migrateCopy } from '../src/data/migrate-copy.ts';

test('updates legacy defaults while preserving custom copy and contact details', () => {
  const saved = {
    heroPrimaryCta: 'Discuss Your Project',
    heroHeadline: 'My custom headline',
    contactEmail: 'team@example.com',
  };
  const updated = migrateCopy('decode_site_content', saved);
  assert.equal(updated.heroPrimaryCta, 'Start A Project');
  assert.equal(updated.heroHeadline, saved.heroHeadline);
  assert.equal(updated.contactEmail, saved.contactEmail);
  assert.equal(saved.heroPrimaryCta, 'Discuss Your Project');
  assert.deepEqual(migrateCopy('decode_site_content', updated), updated);
});

test('preserves custom collection entries, deletions, and unrelated saved data', () => {
  const services = [{ id: 'custom', title: 'My service', deliverables: ['Custom delivery'] }];
  assert.deepEqual(migrateCopy('decode_services', services), services);
  assert.deepEqual(migrateCopy('decode_services', []), []);
  const application = { message: 'Start A Project' };
  assert.equal(migrateCopy('decode_job_applications', application), application);
  assert.deepEqual(migrateCopy('decode_testimonials', application), application);
});

test('normalizes saved testimonials with current client logos and Thozha reviews', () => {
  const saved = [
    {
      id: '1',
      name: 'Ramesh Kumar',
      role: 'Founder & CEO',
      company: 'Azhagappar Academy',
      avatar: '✦',
      text: 'DeCode delivered ahead of schedule. The UI is exceptionally smooth and student engagement grew by 140%.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Sathish Kumar',
      role: 'Managing Partner',
      company: 'Thozha Associates',
      avatar: '⚡',
      text: 'DeCode gave Thozha Associates a professional digital presence that clearly presents our construction services and project credibility.',
      rating: 5,
    },
    {
      id: 'old-agro',
      name: 'Legacy Client',
      role: 'Founder',
      company: 'AgroMate Technologies',
      text: 'Old review',
      rating: 5,
    },
    {
      id: 'old-thozha-projects',
      name: 'Thozha Associates Projects Team',
      role: 'Project Management Team',
      company: 'Thozha Associates',
      text: 'Old Thozha Projects Team review',
      rating: 5,
    },
    {
      id: 'old-vetrivel',
      name: 'Hospitality Client',
      role: 'Managing Director',
      company: 'Vetrivel Hospitality',
      text: 'Old hospitality review',
      rating: 5,
    },
    {
      id: 'old-thozha-team',
      name: 'Thozha Associates Team',
      role: 'Civil Engineering & Construction Firm',
      company: 'Thozha Associates',
      text: 'Our new website presents our projects, services, and enquiry flow with clarity. DeCode understood the Thozha Associates brand and delivered a polished experience.',
      rating: 5,
    },
    {
      id: 'old-neuerung-team',
      name: 'Neuerung HealthTech Team',
      role: 'Healthcare Technology Team',
      company: 'Neuerung HealthTech',
      text: 'DeCode shaped our healthtech portal into a clean, credible experience that communicates our AI and IoT capabilities with clarity.',
      rating: 5,
    },
  ];

  const updated = migrateCopy('decode_testimonials', saved);
  assert.equal(
    updated.some((testimonial) => testimonial.company === 'AgroMate Technologies'),
    false,
  );
  assert.equal(updated[0].name, 'Shiva Suryan');
  assert.equal(updated[0].role, 'Founder & CEO');
  assert.equal(updated[0].company, 'Azhagappar Academy');
  assert.equal(updated[0].logo, '/Azhagappar Academy_Logo.png');
  assert.equal(updated[0].avatar, undefined);

  assert.equal(updated[1].name, 'Sathish Kumar');
  assert.equal(updated[1].logo, '/ThozhaAssociates.png');
  assert.equal(updated[1].avatar, undefined);

  assert.equal(
    updated.some((testimonial) => testimonial.name === 'Pavithra Tharan' && testimonial.role === 'CEO'),
    true,
  );
  assert.equal(
    updated.some((testimonial) => testimonial.name === 'Thozha Associates Team'),
    false,
  );
  assert.equal(
    updated.some((testimonial) => testimonial.name === 'Thozha Associates Projects Team'),
    false,
  );
  assert.equal(
    updated.some((testimonial) => testimonial.company === 'Vetrivel Hospitality'),
    false,
  );
  assert.equal(
    updated.some((testimonial) => testimonial.name === 'Dr.Pirai' && testimonial.role === 'Founder'),
    true,
  );
  assert.equal(
    updated.some((testimonial) => testimonial.name === 'Neuerung HealthTech Team'),
    false,
  );
});

test('migrates legacy emails (hello@decode.com, contact@decodeinfotech.com) to contact@decodeinfotech.in', () => {
  const legacyContent = {
    contactEmail: 'hello@decode.com',
  };
  const updatedContent = migrateCopy('decode_site_content', legacyContent);
  assert.equal(updatedContent.contactEmail, 'contact@decodeinfotech.in');

  const legacyFaq = [
    {
      id: 'faq-1',
      q: 'Questions?',
      a: 'Email us at hello@decode.com or contact@decodeinfotech.com anytime.',
    },
  ];
  const updatedFaq = migrateCopy('decode_faqs', legacyFaq);
  assert.equal(
    updatedFaq[0].a,
    'Email us at contact@decodeinfotech.in or contact@decodeinfotech.in anytime.',
  );
});
