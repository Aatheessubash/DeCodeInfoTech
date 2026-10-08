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
const testimonialLogos = new Map([
  ['Azhagappar Academy', '/Azhagappar Academy_Logo.png'],
  ['Thozha Associates', '/ThozhaAssociates.png'],
  ['Neuerung HealthTech', '/neuerung.png'],
]);
const requiredTestimonials = [
  {
    id: '3',
    name: 'Thozha Associates Team',
    role: 'Civil Engineering & Construction Firm',
    company: 'Thozha Associates',
    logo: '/ThozhaAssociates.png',
    text: 'Our new website presents our projects, services, and enquiry flow with clarity. DeCode understood the Thozha Associates brand and delivered a polished experience.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Neuerung HealthTech Team',
    role: 'Healthcare Technology Team',
    company: 'Neuerung HealthTech',
    logo: '/neuerung.png',
    text: 'DeCode shaped our healthtech portal into a clean, credible experience that communicates our AI and IoT capabilities with clarity.',
    rating: 5,
  },
];

function normalizeTestimonials(value: unknown): unknown {
  if (!Array.isArray(value)) return value;

  const normalized = value
    .filter((item) => {
      if (item === null || typeof item !== 'object') return true;
      const company = 'company' in item ? item.company : undefined;
      const name = 'name' in item ? item.name : undefined;
      return (
        company !== 'AgroMate Technologies' &&
        company !== 'Vetrivel Unavagam' &&
        company !== 'Vetrivel Hospitality' &&
        name !== 'Thozha Associates Projects Team'
      );
    })
    .map((item) => {
      if (item === null || typeof item !== 'object') return item;
      const company = 'company' in item ? item.company : undefined;
      if (typeof company !== 'string') return item;

      const logo = testimonialLogos.get(company);
      if (!logo) return item;

      return {
        ...item,
        logo,
        avatar: undefined,
      };
    });

  for (const testimonial of requiredTestimonials) {
    const alreadyExists = normalized.some(
      (item) =>
        item !== null &&
        typeof item === 'object' &&
        'text' in item &&
        item.text === testimonial.text,
    );

    if (!alreadyExists) normalized.push(testimonial);
  }

  return normalized;
}

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

  const migrated = visit(value);
  if (key === 'decode_testimonials') return normalizeTestimonials(migrated);

  return migrated;
}
