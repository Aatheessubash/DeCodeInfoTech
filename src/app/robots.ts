import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/SA', '/api/', '/admin/'],
    },
    sitemap: 'https://decodeinfotech.in/sitemap.xml',
  };
}
