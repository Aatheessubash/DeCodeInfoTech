import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Testimonial.module.css';
import { useData } from '../../context/useData';
import { Star, Quote, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonial() {
  const { testimonials, siteContent } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 2.5 seconds (2500ms)
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(nextSlide, 2500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, total]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section id="testimonials" className={`section-padding ${styles.testimonialSection}`}>
      <div className="section-header reveal" style={{ marginBottom: '24px' }}>
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

      {/* 1-by-1 Smooth Auto-Change Carousel */}
      <div
        className={`${styles.carouselContainer} reveal delay-2`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((t, idx) => (
              <div key={t.id || idx} className={styles.carouselSlide}>
                <div className={styles.compactCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.ratingRow}>
                      <div className={styles.stars}>
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} size={15} style={{ fill: '#7C3AED', color: '#7C3AED' }} aria-hidden="true" />
                        ))}
                      </div>
                      <span className={styles.verifiedBadge}>
                        <BadgeCheck size={13} style={{ color: '#7C3AED' }} aria-hidden="true" /> Verified Client
                      </span>
                    </div>
                    <Quote size={24} className={styles.quoteIcon} aria-hidden="true" />
                  </div>

                  <p className={styles.quoteText}>"{t.text}"</p>

                  <div className={styles.authorRow}>
                    <div className={styles.authorAvatar}>
                      {t.name?.charAt(0) || 'C'}
                    </div>
                    <div className={styles.authorMeta}>
                      <h4 className={styles.authorName}>{t.name}</h4>
                      <p className={styles.authorRole}>{t.role} • <span className={styles.companyName}>{t.company}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          className={`${styles.navArrow} ${styles.prevArrow}`}
          onClick={prevSlide}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          className={`${styles.navArrow} ${styles.nextArrow}`}
          onClick={nextSlide}
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Dots & Progress */}
        <div className={styles.dotsRow}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
