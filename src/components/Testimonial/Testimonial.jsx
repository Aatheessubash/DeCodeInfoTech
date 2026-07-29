import React from 'react';
import styles from './Testimonial.module.css';
import { useData } from '../../context/DataContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Star } from 'lucide-react';

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
              {[...Array(t.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className={styles.quoteText}>"{t.text}"</p>
            <div className={styles.authorRow}>
              <div className={styles.avatar}>
                <img src={`https://i.pravatar.cc/150?u=${t.name.replace(/\s+/g, '')}`} alt={t.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
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
