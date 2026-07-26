import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useData } from '../../context/DataContext';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [activeIdx, setActiveIdx] = useState(0);
  const { projects } = useData();

  if (!projects || projects.length === 0) return null;

  const safeIdx = activeIdx >= projects.length ? 0 : activeIdx;
  const currentProject = projects[safeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleDotKeyDown = (e, idx) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIdx(idx);
    }
  };

  return (
    <section id="work" className="section-padding" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <div className="pill-badge">
          <span className="badge-dot"></span>
          Selected Work
        </div>
        <h2>Proven Digital Products Designed & Delivered</h2>
        <p>
          Explore real web applications and custom digital platforms engineered by <strong>DeCode</strong> for startups and growing enterprises.
        </p>
      </div>

      <div className={`${styles.carouselWrapper} reveal delay-1 ${isVisible ? 'visible' : ''}`}>
        {/* Prev Arrow */}
        <button
          className={`${styles.navArrow} ${styles.prevArrow}`}
          onClick={handlePrev}
          aria-label="Previous project"
        >
          ←
        </button>

        <div className={styles.carouselViewport}>
          <div
            className={styles.slidesTrack}
            style={{ transform: `translateX(-${safeIdx * 100}%)` }}
          >
            {projects.map((project, idx) => (
              <div
                key={project.id || idx}
                className={`${styles.slide} ${idx === safeIdx ? styles.active : ''}`}
              >
                <div
                  className={styles.cardInner}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${project.title}`}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIdx(idx);
                    }
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.slideImg}
                  />
                  <div className={styles.gradientOverlay}>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>{project.problem}</p>
                    <div className={styles.bottomRow}>
                      <div className={styles.techTags}>
                        {project.tech?.map((t, i) => (
                          <span key={i} className={styles.techTag}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button
          className={`${styles.navArrow} ${styles.nextArrow}`}
          onClick={handleNext}
          aria-label="Next project"
        >
          →
        </button>

        {/* Counter & Pagination Dots */}
        <div className={styles.dotsRow}>
          <span className={styles.counterText}>
            {String(safeIdx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          {projects.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${idx === safeIdx ? styles.activeDot : ''}`}
              onClick={() => setActiveIdx(idx)}
              onKeyDown={(e) => handleDotKeyDown(e, idx)}
              tabIndex={0}
              role="button"
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
