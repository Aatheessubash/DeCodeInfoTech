import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Testimonial.module.css';
import { useData } from '../../context/useData';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonial() {
  const { testimonials, siteContent } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    if (total) setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total) setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Allow time to read each quote.
  useEffect(() => {
    if (isPaused || total <= 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, total]);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, Math.max(total - 1, 0)));
  }, [total]);

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

  if (!total) return null;

  return (
    <section id="testimonials" className={styles.testimonialSection} aria-labelledby="testimonials-heading">
      <div className={styles.sectionHeader}>
        <h2 id="testimonials-heading" className={styles.heading}>
          Client Testimonials &amp; <span className={styles.highlight}>Feedback</span>
        </h2>
        <p className={styles.subheading}>
          Discover what founders and project leaders say about working with{' '}
          <strong>{siteContent?.agencyName || 'DeCode Infotech'}</strong>.
        </p>
      </div>

      {/* 1-by-1 Smooth Auto-Change Carousel */}
      <div
        className={styles.carouselContainer}
        onFocusCapture={() => setIsPaused(true)}
        role="region"
        aria-label="Client testimonials"
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
              <div key={t.id || idx} className={styles.carouselSlide} aria-hidden={idx !== currentIndex}>
                <div className={styles.compactCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.ratingRow}>
                      <div className={styles.stars}>
                        {Array.from({ length: Math.max(0, Math.min(5, Math.round(Number(t.rating) || 5))) }).map((_, i) => (
                          <Star key={i} size={15} fill="currentColor" aria-hidden="true" />
                        ))}
                      </div>

                    </div>
                    <Quote size={24} className={styles.quoteIcon} aria-hidden="true" />
                  </div>

                  <blockquote className={styles.quoteText}>“{t.text}”</blockquote>

                  <div className={styles.authorRow}>
                    <div className={styles.authorAvatar}>
                      {t.name?.charAt(0) || 'C'}
                    </div>
                    <div className={styles.authorMeta}>
                      <h4 className={styles.authorName}>{t.name}</h4>
                      <p className={styles.authorRole}>{t.role}{t.role && t.company ? ' · ' : ''}<span className={styles.companyName}>{t.company}</span></p>
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
              aria-current={idx === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
