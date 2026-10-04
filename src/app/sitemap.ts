import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://decodeinfotech.in';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/assets/who-we-are.jpg`,
        `${baseUrl}/assets/portfolio-1.jpg`,
        `${baseUrl}/assets/portfolio-2.jpg`,
        `${baseUrl}/assets/portfolio-3.jpg`,
      ],
    },
    {
      url: `${baseUrl}/careers`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [`${baseUrl}/assets/careers-team.png`],
    },
  ];
}
