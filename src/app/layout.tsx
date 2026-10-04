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
  applicationName: 'DeCode InfoTech',
  referrer: 'origin-when-cross-origin',
  creator: 'DeCode InfoTech',
  publisher: 'DeCode InfoTech',
  category: 'Technology',
  title: 'DeCode InfoTech — Best Software & Web Development Company in Coimbatore',
  description:
    'Hire DeCode InfoTech, a Coimbatore software and web development company for business websites, custom software, SaaS platforms, ecommerce sites, and enterprise digital solutions.',
  keywords: [
    'best software company in coimbatore',
    'decode',
    'decode infotech',
    'best web development company in coimbatore',
    'best website development in coimbatore',
    'best webside development in coimbatore',
    'top software company in coimbatore',
    'best IT company in coimbatore',
    'best it company in coimbatore',
    'best it comany near me',
    'best IT company near me',
    'top IT company in coimbatore',
    'IT company near me',
    'software company near me',
    'web development company near me',
    'website development company near me',
    'website design company near me',
    'best software company near me',
    'best web development company near me',
    'top web development company in coimbatore',
    'top website development company in coimbatore',
    'web development company in coimbatore',
    'website development company in coimbatore',
    'software development company in coimbatore',
    'software developers in coimbatore',
    'web developers in coimbatore',
    'website developers in coimbatore',
    'IT company in coimbatore',
    'IT services company in coimbatore',
    'IT solutions company in coimbatore',
    'digital marketing and web development coimbatore',
    'web design and development company in coimbatore',
    'ecommerce website development coimbatore',
    'mobile app development company coimbatore',
    'app development company in coimbatore',
    'startup software development coimbatore',
    'enterprise software development coimbatore',
    'business software development coimbatore',
    'software consulting company coimbatore',
    'custom web application development coimbatore',
    'custom software development coimbatore',
    'website design company in coimbatore',
    'responsive website design coimbatore',
    'SEO friendly website development coimbatore',
    'saas product development coimbatore',
    'full stack developers in coimbatore',
    'UI UX design company coimbatore',
    'cloud software development coimbatore',
    'node js development company coimbatore',
    'react development company coimbatore',
    'next js development company coimbatore',
    'react nextjs web development coimbatore',
    'hire software company in coimbatore',
    'hire web development company in coimbatore',
    'hire website developer in coimbatore',
    'hire software developers in coimbatore',
    'hire react developers in coimbatore',
    'hire next js developers in coimbatore',
    'website development for small business coimbatore',
    'software development for small business coimbatore',
    'business website development coimbatore',
    'company website development coimbatore',
    'corporate website development coimbatore',
    'professional website development coimbatore',
    'affordable website development coimbatore',
    'affordable software development coimbatore',
    'website development packages coimbatore',
    'software development services coimbatore',
    'web development services coimbatore',
    'IT services for business coimbatore',
    'business automation software coimbatore',
    'CRM software development coimbatore',
    'ERP software development coimbatore',
    'billing software development coimbatore',
    'inventory software development coimbatore',
    'restaurant website development coimbatore',
    'hospital website development coimbatore',
    'school website development coimbatore',
    'college website development coimbatore',
    'real estate website development coimbatore',
    'construction website development coimbatore',
    'textile website development coimbatore',
    'manufacturing software development coimbatore',
    'digital transformation company coimbatore',
    'website redesign company coimbatore',
    'landing page development coimbatore',
    'lead generation website coimbatore',
    'SEO website development coimbatore',
    'fast website development coimbatore',
    'trusted software company coimbatore',
    'reliable web development company coimbatore',
    'software project quote coimbatore',
    'website development quote coimbatore',
    'IT solutions company coimbatore tamil nadu',
    'DeCode InfoTech',
    'DeCode Coimbatore',
  ],
  authors: [{ name: 'DeCode InfoTech' }],
  metadataBase: new URL('https://decodeinfotech.in'),
  alternates: {
    canonical: 'https://decodeinfotech.in',
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

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([professionalServiceJsonLd, websiteJsonLd, organizationJsonLd]),
          }}
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
