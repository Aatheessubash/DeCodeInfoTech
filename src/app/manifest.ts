import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DeCode InfoTech',
    short_name: 'DeCode',
    description:
      'Software and web development company in Coimbatore building modern digital products.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/Infinity_logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
