import type { MetadataRoute } from 'next';
import { seoPages, siteUrl } from '@/data/seo-pages';

type SitemapEntry = MetadataRoute.Sitemap[number];

const absoluteUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return normalizedPath === '/' ? siteUrl : `${siteUrl}${normalizedPath}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: SitemapEntry[] = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        absoluteUrl('/assets/who-we-are.jpg'),
        absoluteUrl('/assets/portfolio-1.jpg'),
        absoluteUrl('/assets/portfolio-2.jpg'),
        absoluteUrl('/assets/portfolio-3.jpg'),
      ],
    },
    ...seoPages.map((page) => ({
      url: absoluteUrl(page.slug),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      images: [absoluteUrl(page.image)],
    })),
    {
      url: absoluteUrl('/careers'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
      images: [absoluteUrl('/assets/careers-team.png')],
    },
  ];

  return entries
    .filter((entry) => !entry.url.endsWith('/SA'))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}
