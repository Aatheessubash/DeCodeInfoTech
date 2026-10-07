'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Testimonial.module.css';
import { useData } from '@/context/useData';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonial() {
  const { testimonials } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    if (total) setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total) setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, total]);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, Math.max(total - 1, 0)));
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
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
    <section
      id="testimonials"
      className={styles.testimonialSection}
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.testimonialGrid}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Testimonials</p>
          <h2 id="testimonials-heading" className={styles.heading}>
            <span className={styles.headingLine}>Hear from our</span>
            <span className={styles.highlight}>happy customers</span>
          </h2>
          <p className={styles.subheading}>
            Business owners from across the world share proven ways to work more efficiently and
            drive impact with our suite of products.
          </p>
        </div>

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
                <div
                  key={t.id || idx}
                  className={styles.carouselSlide}
                  aria-hidden={idx !== currentIndex}
                >
                  <div className={styles.featuredCard}>
                    <div
                      className={styles.ratingBadge}
                      aria-label={`${t.rating || 5} out of 5 stars`}
                    >
                      {Array.from({
                        length: Math.max(0, Math.min(5, Math.round(Number(t.rating) || 5))),
                      }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
                      ))}
                    </div>

                    <blockquote className={styles.quoteText}>
                      “
                      {t.text.includes('DeCode') ? (
                        <>
                          {t.text.split('DeCode')[0]}
                          <span className={styles.brandWord}>DeCode</span>
                          {t.text.split('DeCode').slice(1).join('DeCode')}
                        </>
                      ) : (
                        t.text
                      )}
                      ”
                    </blockquote>

                    <div className={styles.authorMeta}>
                      <h4 className={styles.authorName}>{t.name}</h4>
                      <p className={styles.authorRole}>
                        {t.role}
                        {t.role && t.company ? ', ' : ''}
                        {t.company}
                      </p>
                    </div>

                    <div
                      className={styles.companyLockup}
                      aria-label={t.company || 'Client company'}
                    >
                      {t.logo ? (
                        <Image
                          className={styles.companyLogo}
                          src={t.logo}
                          alt={`${t.company} logo`}
                          width={220}
                          height={72}
                        />
                      ) : (
                        <>
                          <span className={styles.companyIcon}>
                            {t.avatar || t.name?.charAt(0) || 'D'}
                          </span>
                          <span className={styles.companyName}>{t.company}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
