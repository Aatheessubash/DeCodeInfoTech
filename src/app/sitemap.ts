import type { MetadataRoute } from 'next';
import { seoPages, siteUrl } from '@/data/seo-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${siteUrl}/assets/who-we-are.jpg`,
        `${siteUrl}/assets/portfolio-1.jpg`,
        `${siteUrl}/assets/portfolio-2.jpg`,
        `${siteUrl}/assets/portfolio-3.jpg`,
      ],
    },
    ...seoPages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      images: [`${siteUrl}${page.image}`],
    })),
    {
      url: `${siteUrl}/careers`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [`${siteUrl}/assets/careers-team.png`],
    },
  ];
}
