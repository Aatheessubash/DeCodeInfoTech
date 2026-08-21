import React from 'react';
import styles from './Testimonial.module.css';
import { useData } from '../../context/useData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Star, Quote, BadgeCheck } from 'lucide-react';

export function Testimonial() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });
  const { testimonials, siteContent } = useData();

  return (
    <section id="testimonials" className={`section-padding ${styles.testimonialSection}`} ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <div className="pill-badge">
          <span className="badge-dot" />
          <span>Trust &amp; Results</span>
        </div>
        <h2 className={styles.heading}>
          Client Testimonials &amp; <span className={styles.highlight}>Feedback</span>
        </h2>
        <p className={styles.subheading}>
          Discover what founders and project leaders say about working with{' '}
          <strong>{siteContent?.agencyName || 'DeCode Infotech'}</strong>.
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
                    <Star key={i} size={15} style={{ fill: '#7C3AED', color: '#7C3AED' }} aria-hidden="true" />
                  ))}
                </div>
                <span className={styles.verifiedBadge}>
                  <BadgeCheck size={13} style={{ color: '#7C3AED' }} aria-hidden="true" /> Verified
                </span>
              </div>
              <Quote size={24} className={styles.quoteIcon} aria-hidden="true" />
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

export default Testimonial;
