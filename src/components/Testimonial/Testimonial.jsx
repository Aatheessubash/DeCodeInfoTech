import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Testimonial.module.css';
import { useData } from '../../context/useData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Star, Quote, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonial() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { testimonials, siteContent } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const total = testimonials?.length || 0;

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleDotClick = (idx) => {
    setCurrentIndex(idx);
  };

  // Auto-advance 1-by-1 every 2.5s with smooth slide
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 2500);

    return () => clearInterval(timer);
  }, [isPaused, total, handleNext]);

  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (!testimonials || total === 0) return null;

  return (
    <section id="testimonials" className={styles.testimonialSection} ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`} style={{ marginBottom: '20px' }}>
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

      <div
        className={styles.singleCardWrapper}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <div className={styles.cardContainer}>
          <div
            className={styles.slideTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((t, idx) => (
              <div key={t.id || idx} className={styles.slide} aria-hidden={idx !== currentIndex}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.ratingRow}>
                      <div className={styles.stars}>
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} size={14} style={{ fill: '#7C3AED', color: '#7C3AED' }} aria-hidden="true" />
                        ))}
                      </div>
                      <span className={styles.verifiedBadge}>
                        <BadgeCheck size={12} style={{ color: '#7C3AED' }} aria-hidden="true" /> Verified
                      </span>
                    </div>
                    <Quote size={22} className={styles.quoteIcon} aria-hidden="true" />
                  </div>

                  <p className={styles.quoteText}>"{t.text}"</p>

                  <div className={styles.authorRow}>
                    <div className={styles.authorMeta}>
                      <h4 className={styles.authorName}>{t.name}</h4>
                      <p className={styles.authorRole}>{t.role}</p>
                      <span className={styles.companyTag}>{t.company}</span>
                    </div>
                    <span className={styles.counterBadge}>
                      {idx + 1} / {total}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      {total > 1 && (
        <div className={styles.dotsRow}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Testimonial;
