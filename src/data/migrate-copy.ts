import updates from './copy-updates.json' with { type: 'json' };

const contentKeys = new Set([
  'decode_site_content',
  'decode_projects',
  'decode_testimonials',
  'decode_services',
  'decode_faqs',
  'decode_standards',
]);
const replacements = new Map(Object.entries(updates));

/** Refresh exact legacy defaults only; preserve custom copy and unrelated data. */
export function migrateCopy(key: string, value: unknown): unknown {
  if (!contentKeys.has(key)) return value;

  function visit(item: unknown): unknown {
    if (typeof item === 'string') {
      const direct = replacements.get(item);
      if (direct !== undefined) return direct;
      if (item.includes('hello@decode.com') || item.includes('contact@decodeinfotech.com')) {
        return item
          .replaceAll('hello@decode.com', 'contact@decodeinfotech.in')
          .replaceAll('contact@decodeinfotech.com', 'contact@decodeinfotech.in');
      }
      return item;
    }
    if (Array.isArray(item)) return item.map(visit);
    if (item !== null && typeof item === 'object') {
      return Object.fromEntries(Object.entries(item).map(([field, text]) => [field, visit(text)]));
    }
    return item;
  }

  return visit(value);
}
