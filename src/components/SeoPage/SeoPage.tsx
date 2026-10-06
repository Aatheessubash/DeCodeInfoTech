import Link from 'next/link';
import { seoPages, siteUrl, type SeoPage } from '@/data/seo-pages';
import styles from './SeoPage.module.css';

type SeoPageProps = {
  page: SeoPage;
};

export function SeoPageTemplate({ page }: SeoPageProps) {
  const pageUrl = `${siteUrl}/${page.slug}`;
  const relatedPages = seoPages
    .filter((item) => item.slug !== page.slug && item.slug !== 'contact' && item.slug !== 'blog')
    .slice(0, 3);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: page.h1,
    description: page.description,
    url: pageUrl,
    provider: {
      '@id': `${siteUrl}/#professional-service`,
    },
    areaServed: [
      { '@type': 'City', name: 'Coimbatore' },
      { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
      { '@type': 'Country', name: 'India' },
    ],
    keywords: page.focusKeyword,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.h1,
        item: pageUrl,
      },
    ],
  };

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceJsonLd, faqJsonLd, breadcrumbJsonLd]),
        }}
      />
      <section
        className={styles.hero}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(8, 30, 47, 0.88), rgba(15, 73, 94, 0.78)), url('${page.image}')`,
        }}
      >
        <div className={styles.container}>
          <p className={styles.eyebrow}>{page.eyebrow}</p>
          <h1 className={styles.title}>{page.h1}</h1>
          <p className={styles.summary}>{page.summary}</p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryCta}>
              Discuss a project
            </Link>
            <Link href="/portfolio" className={styles.secondaryCta}>
              View portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.contentBand}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.h1}</span>
          </nav>
          <div className={styles.grid}>
            <div>
              {page.sections.map((section) => (
                <section key={section.title} className={styles.section}>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
            <aside className={styles.sidebar} aria-label={`${page.h1} summary`}>
              <section className={styles.highlights}>
                <h2>What You Get</h2>
                <ul>
                  {page.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </section>
              <section className={styles.contactPanel}>
                <h2>Local Visibility</h2>
                <p>
                  DeCode InfoTech serves Coimbatore businesses while supporting remote product and
                  software teams across India and global markets.
                </p>
                <Link href="/contact">Contact the team</Link>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.container}>
          <h2>Common Questions</h2>
          <div className={styles.faqGrid}>
            {page.faqs.map((faq) => (
              <section key={faq.question} className={styles.faqItem}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.related}>
        <div className={styles.container}>
          <h2>Related Services</h2>
          <div className={styles.relatedGrid}>
            {relatedPages.map((related) => (
              <Link key={related.slug} href={`/${related.slug}`} className={styles.relatedItem}>
                <h3>{related.h1}</h3>
                <p>{related.description}</p>
                <span>Explore service</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
