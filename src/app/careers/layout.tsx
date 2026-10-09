import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at DeCode InfoTech | Coimbatore Software Jobs',
  description:
    'Explore software, web development, design, and digital product career opportunities at DeCode InfoTech in Coimbatore.',
  alternates: {
    canonical: 'https://www.decodeinfotech.in/careers',
  },
  openGraph: {
    title: 'Careers at DeCode InfoTech | Coimbatore Software Jobs',
    description:
      'Explore software, web development, design, and digital product career opportunities at DeCode InfoTech in Coimbatore.',
    url: 'https://www.decodeinfotech.in/careers',
    siteName: 'DeCode InfoTech',
    images: [
      {
        url: '/assets/careers-team.png',
        width: 1254,
        height: 1254,
        alt: 'DeCode InfoTech careers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at DeCode InfoTech | Coimbatore Software Jobs',
    description:
      'Explore software, web development, design, and digital product career opportunities at DeCode InfoTech in Coimbatore.',
    images: ['/assets/careers-team.png'],
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
