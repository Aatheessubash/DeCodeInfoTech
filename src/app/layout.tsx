import type { Metadata, Viewport } from 'next';
import './globals.css';
import { DataProvider } from '@/context/DataContext';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { CursorGlow } from '@/components/shared/CursorGlow';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { GoogleAnalytics } from '@/components/Analytics/GoogleAnalytics';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  applicationName: 'DeCode InfoTech',
  referrer: 'origin-when-cross-origin',
  creator: 'DeCode InfoTech',
  publisher: 'DeCode InfoTech',
  category: 'Technology',
  title: {
    default: 'DeCode InfoTech | Software Development Company in Coimbatore',
    template: '%s',
  },
  description:
    'DeCode InfoTech builds websites, mobile apps, SaaS platforms, CRM automation, UI UX design, and custom software for businesses in Coimbatore and beyond.',
  keywords: [
    'DeCode InfoTech',
    'software development company in Coimbatore',
    'web development company in Coimbatore',
    'mobile app development company in Coimbatore',
    'SaaS development company',
    'CRM automation company',
  ],
  authors: [{ name: 'DeCode InfoTech' }],
  metadataBase: new URL('https://decodeinfotech.in'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
      'Hire DeCode InfoTech for business websites, custom software, SaaS platforms, ecommerce sites, and enterprise digital solutions in Coimbatore.',
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
      'Coimbatore software and web development company for business websites, custom software, SaaS platforms, ecommerce sites, and enterprise digital solutions.',
    images: ['/assets/who-we-are.jpg'],
  },
  icons: {
    icon: '/Infinity_logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const professionalServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://decodeinfotech.in/#professional-service',
    name: 'DeCode InfoTech',
    alternateName: [
      'Best Software Company in Coimbatore',
      'Best IT Company in Coimbatore',
      'Best IT Company Near Me',
      'Best Web Development Company in Coimbatore',
      'Best Website Development in Coimbatore',
      'Business Website Development in Coimbatore',
      'Custom Software Development in Coimbatore',
      'Website Development for Small Business Coimbatore',
      'DeCode Studio',
    ],
    url: 'https://decodeinfotech.in',
    logo: 'https://decodeinfotech.in/DeCode_Logo.png',
    image: 'https://decodeinfotech.in/assets/who-we-are.jpg',
    description:
      'DeCode InfoTech is the best software company in Coimbatore and premier web development company in Coimbatore, specializing in custom web applications, SaaS development, and modern digital engineering.',
    priceRange: '$$',
    telephone: '+91 70928 02356',
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
      'IT Services in Coimbatore',
      'Website Development in Coimbatore',
      'Business Website Development',
      'Business Automation Software',
      'CRM Software Development',
      'ERP Software Development',
      'Ecommerce Website Development',
      'Lead Generation Websites',
      'Digital Transformation',
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
    sameAs: ['https://decodeinfotech.in'],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://decodeinfotech.in/#website',
    name: 'DeCode InfoTech',
    url: 'https://decodeinfotech.in',
    publisher: {
      '@id': 'https://decodeinfotech.in/#professional-service',
    },
    inLanguage: 'en',
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://decodeinfotech.in/#organization',
    name: 'DeCode InfoTech',
    url: 'https://decodeinfotech.in',
    logo: 'https://decodeinfotech.in/DeCode_Logo.png',
    email: 'contact@decodeinfotech.in',
    telephone: '+91 70928 02356',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://decodeinfotech.in/#local-business',
    name: 'DeCode InfoTech',
    url: 'https://decodeinfotech.in',
    image: 'https://decodeinfotech.in/assets/who-we-are.jpg',
    logo: 'https://decodeinfotech.in/DeCode_Logo.png',
    email: 'contact@decodeinfotech.in',
    telephone: '+91 70928 02356',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: 'Coimbatore' },
      { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
      { '@type': 'Country', name: 'India' },
    ],
    priceRange: '$$',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              professionalServiceJsonLd,
              websiteJsonLd,
              organizationJsonLd,
              localBusinessJsonLd,
            ]),
          }}
        />
      </head>
      <body>
        <GoogleAnalytics />
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
