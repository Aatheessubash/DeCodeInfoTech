'use client';

import React from 'react';
import { useData } from '@/context/useData';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const { projects } = useData();

  if (!projects?.length) return null;

  return (
    <section id="projects" className={`section-padding ${styles.section}`}>
      <span id="work" aria-hidden="true" style={{ position: 'absolute', top: 0 }} />
      <div className={styles.panel}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>
            Measurable Digital Products for <span>Real Businesses</span>
          </h2>
          <p className={styles.sectionSub}>
            Client platforms designed by <strong>DeCode</strong> to improve visibility, workflows,
            enquiries, and customer experience across industries.
          </p>
        </div>

        <div className={styles.carouselViewport} role="region" aria-label="Project cards">
          <div
            className={styles.scrollTrack}
            style={{ '--duration': `${Math.max(projects.length, 4) * 7}s` } as React.CSSProperties}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className={styles.projectGroup}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {projects.map((project, projectIndex) => {
                  const cardIndex = projectIndex % 3;

                  return (
                    <article
                      className={`${styles.projectCard} ${cardIndex === 1 ? styles.featuredCard : ''}`}
                      key={`${copy}-${project.id}`}
                      style={{ '--card-delay': `${cardIndex * 90}ms` } as React.CSSProperties}
                    >
                      <div className={styles.cardTop}>
                        <div>
                          <h3>{project.title}</h3>
                          <p>{project.category}</p>
                        </div>
                      </div>

                      <div className={styles.imageStack} aria-hidden="true">
                        <span />
                        <span />
                      </div>

                      <img
                        className={styles.preview}
                        src={project.image}
                        alt={`${project.title} website preview`}
                        loading={projectIndex === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
