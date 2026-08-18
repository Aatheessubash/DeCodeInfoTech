import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useData } from '../../context/useData';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const { projects } = useData();
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef(null);

  useEffect(() => {
    if (activeIndex >= (projects?.length || 0)) setActiveIndex(0);
  }, [activeIndex, projects?.length]);

  if (!projects?.length) return null;

  const activeProject = projects[activeIndex];
  const goToProject = (index) => {
    setActiveIndex((index + projects.length) % projects.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') goToProject(activeIndex - 1);
    if (event.key === 'ArrowRight') goToProject(activeIndex + 1);
  };

  const handlePointerUp = (event) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;

    if (Math.abs(distance) < 48) return;
    goToProject(activeIndex + (distance < 0 ? 1 : -1));
  };

  return (
    <section id="work" className={`section-padding ${styles.section}`}>
      <div className="section-header">
        <div className="pill-badge">
          <span className="badge-dot" />
          Our Work
        </div>
        <h2>Live Products Built for Real Businesses</h2>
        <p>
          Explore client platforms designed and developed by <strong>DeCode</strong> across education,
          construction, healthcare, and hospitality.
        </p>
      </div>

      <div className={styles.showcase}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.previousButton}`}
          onClick={() => goToProject(activeIndex - 1)}
          aria-label="Show previous project"
        >
          <ArrowLeft size={19} aria-hidden="true" />
        </button>

        <div
          className={styles.viewport}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client projects"
          tabIndex="0"
          onKeyDown={handleKeyDown}
          onPointerDown={(event) => {
            if (event.pointerType !== 'mouse' || event.button === 0) pointerStart.current = event.clientX;
          }}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
        >
          <article className={styles.project} key={activeProject.id || activeIndex}>
            <img
              className={styles.preview}
              src={activeProject.image}
              alt={`${activeProject.title} website preview`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className={styles.overlay}>
              <div className={styles.copy}>
                <span className={styles.category}>{activeProject.category}</span>
                <h3>{activeProject.title}</h3>
                <p>{activeProject.problem}</p>
              </div>

              <div className={styles.projectFooter}>
                <div className={styles.tags} aria-label="Project technologies">
                  {activeProject.tech?.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a
                  className={styles.visitLink}
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${activeProject.title} website (opens in a new tab)`}
                >
                  Visit Site
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={() => goToProject(activeIndex + 1)}
          aria-label="Show next project"
        >
          <ArrowRight size={19} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.pagination}>
        <span className={styles.counter} aria-live="polite">
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
        <div className={styles.dots} aria-label="Choose a project">
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.id || index}
              className={index === activeIndex ? styles.activeDot : ''}
              onClick={() => goToProject(index)}
              aria-label={`Show ${project.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
