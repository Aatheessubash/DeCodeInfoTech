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

test('migrates legacy project images and resets obsolete project collections', () => {
  const customProjects = [
    { id: 'custom-1', title: 'Custom App', image: '/assets/project-lms.jpg' },
    { id: 'custom-2', title: 'Second App', image: '/assets/portfolio-2.jpg' },
  ];
  const migrated = migrateCopy('decode_projects_v6', customProjects);
  assert.equal(migrated[0].image, '/assets/portfolio-azhagappar.jpg');
  assert.equal(migrated[1].image, '/assets/portfolio-thozha.jpg');

  // Obsolete v1 project collections with legacy ids trigger reset (null return)
  const legacyList = [{ id: 'agro', title: 'Agro', image: '/assets/project-agro.jpg' }];
  assert.equal(migrateCopy('decode_projects_v6', legacyList), null);
  assert.equal(migrateCopy('decode_projects', legacyList), null);
});
