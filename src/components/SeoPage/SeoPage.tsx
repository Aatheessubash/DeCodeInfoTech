'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { seoPages, siteUrl, type SeoPage } from '@/data/seo-pages';
import { SiteModal } from '@/components/shared/SiteModal';
import { ContactForm } from '@/components/Contact/ContactForm';
import styles from './SeoPage.module.css';

type SeoPageProps = {
  page: SeoPage;
};

const CATEGORY_MAP: Record<string, string> = {
  'industrial-automation': 'Industrial Automation / AI & IoT',
  'web-development': 'Website Development',
  'mobile-app-development': 'Mobile App Development',
  'saas-development': 'SaaS Platform',
  'ui-ux-design': 'UI/UX Design',
  '3d-motion-design': '3D Motion Design / Digital Media',
  'crm-automation': 'CRM Automation / Custom Software',
};

const MODAL_TITLES: Record<string, React.ReactNode> = {
  'industrial-automation': (
    <>
      Industrial Automation, AI &amp; IoT <span className="modal-title-accent">Solutions</span>
    </>
  ),
  'web-development': (
    <>
      Web Development &amp; Architecture <span className="modal-title-accent">Solutions</span>
    </>
  ),
  'mobile-app-development': (
    <>
      Mobile App Engineering <span className="modal-title-accent">Solutions</span>
    </>
  ),
  'saas-development': (
    <>
      SaaS &amp; Cloud Platform <span className="modal-title-accent">Engineering</span>
    </>
  ),
  'crm-automation': (
    <>
      CRM Automation &amp; Custom <span className="modal-title-accent">Software</span>
    </>
  ),
  'ui-ux-design': (
    <>
      UI/UX Design &amp; Product <span className="modal-title-accent">Experience</span>
    </>
  ),
  '3d-motion-design': (
    <>
      3D Motion Design &amp; Digital <span className="modal-title-accent">Media</span>
    </>
  ),
  about: (
    <>
      Enterprise Partnership &amp; <span className="modal-title-accent">Advisory</span>
    </>
  ),
  contact: (
    <>
      Initiate Executive <span className="modal-title-accent">Consultation</span>
    </>
  ),
  portfolio: (
    <>
      Discuss an Enterprise <span className="modal-title-accent">Case Study</span>
    </>
  ),
  blog: (
    <>
      Technical Architecture <span className="modal-title-accent">Inquiry</span>
    </>
  ),
};

function formatHeadingWithGradient(text: string) {
  const words = text.trim().split(' ');
  if (words.length <= 1) {
    return text;
  }
  const main = words.slice(0, -1).join(' ');
  const accent = words[words.length - 1];
  return (
    <>
      {main} <span className={styles.gradientWord}>{accent}</span>
    </>
  );
}

export function SeoPageTemplate({ page }: SeoPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? -1 : idx);
  };

  const pageUrl = `${siteUrl}/${page.slug}`;
  const relatedPages = seoPages
    .filter((item) => item.slug !== page.slug && item.slug !== 'contact' && item.slug !== 'blog')
    .slice(0, 3);

  const defaultCategory = CATEGORY_MAP[page.slug] || '';

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

      <section className={styles.hero}>
        <div className={styles.videoWrapper} aria-hidden="true">
          <video
            className={styles.videoBackground}
            src="/sample.webm"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className={styles.videoOverlay} />
        </div>
        <div className={styles.ambientGlow} aria-hidden="true" />

        <div className={styles.container}>
          {page.eyebrow ? <p className={styles.eyebrow}>{page.eyebrow}</p> : null}
          <h1 className={styles.title}>{formatHeadingWithGradient(page.h1)}</h1>

          <p className={styles.tagline} aria-label="Imagine it. Build it. Decode the future.">
            <span className={styles.taglineTop} aria-hidden="true">
              <span className={styles.taglineItem}>
                <span className={styles.taglineDot} />
                Imagine it
              </span>
              <span className={styles.taglineItem}>
                <span className={styles.taglineDot} />
                Build it
              </span>
            </span>
            <span className={styles.taglineBottom} aria-hidden="true">
              <span className={styles.taglineDot} />
              Decode the future
            </span>
          </p>

          <p className={styles.summary}>{page.summary}</p>
          <div className={styles.heroActions}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className={styles.primaryCta}
            >
              <span>Discuss a project</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
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
            <div className={styles.sectionsList}>
              {page.sections.map((section) => (
                <div key={section.title} className={styles.sectionCard}>
                  <h2 className={styles.sectionCardTitle}>{section.title}</h2>
                  <p className={styles.sectionCardBody}>{section.body}</p>
                </div>
              ))}
            </div>
            <aside className={styles.sidebar} aria-label={`${page.h1} summary`}>
              {page.image && (
                <div className={styles.featuredImageCard}>
                  <img
                    src={page.image}
                    alt={page.h1}
                    className={styles.featuredImage}
                    loading="lazy"
                  />
                  <div className={styles.imageBadge}>
                    <span className={styles.imageBadgeDot} aria-hidden="true" />
                    <span>Engineered by DeCode</span>
                  </div>
                </div>
              )}
              <section className={styles.highlights}>
                <h2 className={styles.sidebarHeading}>
                  What You <span>Get</span>
                </h2>
                <ul>
                  {page.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </section>
              <section className={styles.contactPanel}>
                <h2 className={styles.sidebarHeading}>
                  Enterprise <span>Engagement</span>
                </h2>
                <p>
                  DeCode InfoTech partners with global enterprises, high-growth venture startups,
                  and industry operators worldwide — deploying dedicated engineering pods,
                  cloud-native architectures, and SLA-backed product maintenance.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className={styles.contactPanelBtn}
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-label="Frequently Asked Questions">
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionHeading}>
              Frequently Asked <span>Questions</span>
            </h2>
            <p className={styles.sectionSub}>
              Architectural, commercial, and operational specifications for {page.h1}.
            </p>
          </div>
          <div className={styles.accordionWrapper}>
            {page.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.question}
                  className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}
                >
                  <button
                    type="button"
                    id={`seo-faq-btn-${idx}`}
                    className={styles.accordionQuestionBtn}
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`seo-faq-answer-${idx}`}
                  >
                    <span className={styles.accordionQuestionText}>{faq.question}</span>
                    <span
                      className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ''}`}
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`seo-faq-answer-${idx}`}
                      aria-labelledby={`seo-faq-btn-${idx}`}
                      className={styles.accordionAnswerBody}
                      role="region"
                    >
                      <p className={styles.accordionAnswerText}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.relatedSection} aria-label="Related Services">
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionHeading}>
              Related <span>Services</span>
            </h2>
            <p className={styles.sectionSub}>
              Cross-functional engineering capabilities to accelerate your product ecosystem.
            </p>
          </div>
          <div className={styles.relatedGrid}>
            {relatedPages.map((related) => (
              <Link key={related.slug} href={`/${related.slug}`} className={styles.relatedItem}>
                <h3 className={styles.relatedItemTitle}>{related.h1}</h3>
                <p className={styles.relatedItemBody}>{related.description}</p>
                <span className={styles.relatedItemLink}>
                  Explore service
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eyebrow={page.eyebrow || 'Discuss A Project'}
        title={
          MODAL_TITLES[page.slug] || (
            <>
              {page.h1} <span className="modal-title-accent">Inquiry</span>
            </>
          )
        }
        titleId="seo-project-modal-heading"
        closeLabel="Close project inquiry form"
      >
        <ContactForm idPrefix={`seo-${page.slug}`} defaultProjectType={defaultCategory} />
      </SiteModal>
    </article>
  );
}
