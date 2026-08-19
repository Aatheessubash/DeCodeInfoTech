import React from 'react';
import styles from './Testimonial.module.css';
import { useData } from '../../context/useData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Star, Quote, BadgeCheck } from 'lucide-react';

export function Testimonial() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });
  const { testimonials, siteContent } = useData();

  return (
    <section className={`section-padding glow-bg ${styles.testimonialSection}`} ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <div className="pill-badge">
          <span className="badge-dot" />
          <span>Trust & Results</span>
        </div>
        <h2 className={styles.heading}>
          Client Testimonials & <span className={styles.highlight}>Feedback</span>
        </h2>
        <p className={styles.subheading}>
          Discover what founders and project leaders say about working with{' '}
          <strong>{siteContent.agencyName || 'DeCode Studio'}</strong>.
        </p>
      </div>

      <div className={styles.grid}>
        {testimonials.map((t, idx) => (
          <div
            key={t.id || idx}
            className={`${styles.card} reveal delay-${(idx % 3) + 1} ${isVisible ? 'visible' : ''}`}
          >
            <div className={styles.cardHeader}>
              <div className={styles.ratingRow}>
                <div className={styles.stars}>
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} style={{ fill: '#D4AF37', color: '#D4AF37' }} aria-hidden="true" />
                  ))}
                </div>
                <span className={styles.verifiedBadge}>
                  <BadgeCheck size={14} style={{ color: '#3b82f6' }} aria-hidden="true" /> Verified
                </span>
              </div>
              <Quote size={26} className={styles.quoteIcon} aria-hidden="true" />
            </div>

            <p className={styles.quoteText}>"{t.text}"</p>

            <div className={styles.authorRow}>
              <div className={styles.authorMeta}>
                <h4 className={styles.authorName}>{t.name}</h4>
                <p className={styles.authorRole}>{t.role}</p>
                <span className={styles.companyTag}>{t.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
