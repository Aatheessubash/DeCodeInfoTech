import updates from './copy-updates.json' with { type: 'json' };

const contentKeys = new Set([
  'decode_site_content',
  'decode_projects',
  'decode_projects_v6',
  'decode_testimonials',
  'decode_services',
  'decode_faqs',
  'decode_standards',
]);
const replacements = new Map(Object.entries(updates));

const LEGACY_PROJECT_IDS = new Set([
  'agro',
  'construction',
  'linkroaster',
  'lms',
  'news',
  'restaurant',
]);

/** Refresh exact legacy defaults only; preserve custom copy and unrelated data. */
export function migrateCopy(key: string, value: unknown): unknown {
  if (!contentKeys.has(key)) return value;

  if ((key === 'decode_projects' || key === 'decode_projects_v6') && Array.isArray(value)) {
    const hasLegacy = value.some(
      (item) =>
        item && typeof item === 'object' && 'id' in item && LEGACY_PROJECT_IDS.has(String(item.id)),
    );
    if (hasLegacy) {
      return null;
    }
  }

  function visit(item: unknown): unknown {
    if (typeof item === 'string') return replacements.get(item) ?? item;
    if (Array.isArray(item)) return item.map(visit);
    if (item !== null && typeof item === 'object') {
      return Object.fromEntries(Object.entries(item).map(([field, text]) => [field, visit(text)]));
    }
    return item;
  }

  return visit(value);
}
