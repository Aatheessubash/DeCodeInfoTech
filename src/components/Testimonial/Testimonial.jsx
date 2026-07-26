import React from 'react';
import styles from './Testimonial.module.css';
import { useData } from '../../context/DataContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export function Testimonial() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const { testimonials, siteContent } = useData();

  return (
    <section className="section-padding glow-bg" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <div className="pill-badge">
          <span className="badge-dot" />
          <span>Trust & Results</span>
        </div>
        <h2>Client Testimonials & Feedback</h2>
        <p>
          Discover what founders and project leaders say about working with <strong>{siteContent.agencyName || 'DeCode Studio'}</strong>.
        </p>
      </div>

      <div className={styles.grid}>
        {testimonials.map((t, idx) => (
          <div
            key={t.id || idx}
            className={`card-panel ${styles.card} reveal delay-${(idx % 3) + 1} ${isVisible ? 'visible' : ''}`}
          >
            <div className={styles.rating}>
              {'★'.repeat(t.rating || 5)}
            </div>
            <p className={styles.quoteText}>"{t.text}"</p>
            <div className={styles.authorRow}>
              <div className={styles.avatar}>{t.avatar || '✦'}</div>
              <div className={styles.authorMeta}>
                <h4 className={styles.authorName}>{t.name}</h4>
                <p className={styles.authorRole}>{t.role}, {t.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
