import type { Metadata, Viewport } from 'next';
import './globals.css';
import { DataProvider } from '@/context/DataContext';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { CursorGlow } from '@/components/shared/CursorGlow';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'DeCode InfoTech — Best Software & Web Development Company in Coimbatore',
  description:
    'DeCode InfoTech is recognized as the best software company in Coimbatore and top web development company in Coimbatore. We design, build, and launch high-performance custom web applications, SaaS platforms, and enterprise digital solutions.',
  keywords: [
    'best software company in coimbatore',
    'best web development company in coimbatore',
    'top software company in coimbatore',
    'web development company in coimbatore',
    'software development company in coimbatore',
    'custom web application development coimbatore',
    'website design company in coimbatore',
    'saas product development coimbatore',
    'full stack developers in coimbatore',
    'react nextjs web development coimbatore',
    'IT solutions company coimbatore tamil nadu',
    'DeCode InfoTech',
    'DeCode Coimbatore',
  ],
  authors: [{ name: 'DeCode InfoTech' }],
  metadataBase: new URL('https://decodeinfotech.in'),
  alternates: {
    canonical: 'https://decodeinfotech.in',
  },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Coimbatore',
    'geo.position': '11.0168;76.9558',
    ICBM: '11.0168, 76.9558',
  },
  openGraph: {
    title: 'DeCode InfoTech — Best Software & Web Development Company in Coimbatore',
    description:
      'DeCode InfoTech is the best software company in Coimbatore and leading web development company in Coimbatore, delivering scalable web apps, custom SaaS, and enterprise software.',
    url: 'https://decodeinfotech.in',
    siteName: 'DeCode InfoTech',
    images: [
      {
        url: '/assets/who-we-are.jpg',
        width: 1200,
        height: 800,
        alt: 'DeCode InfoTech — Best Software Company in Coimbatore',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeCode InfoTech — Best Software & Web Development Company in Coimbatore',
    description:
      'Top-rated software and web development company in Coimbatore, Tamil Nadu. Building scalable web apps and custom SaaS platforms.',
    images: ['/assets/who-we-are.jpg'],
  },
  icons: {
    icon: '/DeCode_Logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'DeCode InfoTech',
    alternateName: [
      'Best Software Company in Coimbatore',
      'Best Web Development Company in Coimbatore',
      'DeCode Studio',
    ],
    url: 'https://decodeinfotech.in',
    logo: 'https://decodeinfotech.in/DeCode_Logo.png',
    image: 'https://decodeinfotech.in/assets/who-we-are.jpg',
    description:
      'DeCode InfoTech is the best software company in Coimbatore and premier web development company in Coimbatore, specializing in custom web applications, SaaS development, and modern digital engineering.',
    priceRange: '$$',
    telephone: '+91 98765 43210',
    email: 'contact@decodeinfotech.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gandhipuram / Peelamedu Tech Corridor',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      postalCode: '641001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 11.0168,
      longitude: 76.9558,
    },
    areaServed: [
      { '@type': 'City', name: 'Coimbatore' },
      { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Global' },
    ],
    knowsAbout: [
      'Software Development',
      'Web Application Development',
      'SaaS Development',
      'Full Stack Development',
      'UI/UX Design',
      'Next.js & React',
      'Technical SEO',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software & Web Development Services Coimbatore',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Software Development in Coimbatore',
            description: 'Bespoke enterprise software, cloud APIs, and microservices.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Application Development in Coimbatore',
            description: 'High-performance React, Next.js, and Node.js web applications.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SaaS Product Engineering in Coimbatore',
            description:
              'Multi-tenant cloud architecture, billing integration, and analytics dashboards.',
          },
        },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@decodeinfotech.in',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil'],
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ErrorBoundary>
          <DataProvider>
            <SmoothScroll />
            <CursorGlow />
            <div className="ambient-background" aria-hidden="true" />
            <div className="app-root">
              <Navbar />
              <main id="main-content">{children}</main>
              <Footer />
            </div>
          </DataProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
