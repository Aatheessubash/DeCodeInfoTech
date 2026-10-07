'use client';

import React from 'react';
import { useData } from '@/context/useData';
import styles from './Portfolio.module.css';

const CLIENT_LOGOS: Record<string, string> = {
  'azhagappar-academy': '/Azhagappar Academy_Logo.png',
  'thozha-associates': '/ThozhaAssociates.png',
  'neuerung-healthtech': '/neuerung.png',
  'hotel-vetri-vel': '/Vetrivel Unavagam_Logo.png',
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');

export function Portfolio() {
  const { projects } = useData();

  if (!projects?.length) return null;

  return (
    <section id="projects" className={`section-padding ${styles.section}`}>
      <span id="work" aria-hidden="true" style={{ position: 'absolute', top: 0 }} />
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionHeading}>
          Our Valuable <span>Clients</span>
        </h2>
        <p className={styles.sectionSub}>
          Trusted business clients who choose <strong>DeCode</strong> for reliable digital
          solutions, professional service, and long-term value.
        </p>
        <p className={styles.sectionDetail}>
          We partner with ambitious businesses to create digital systems that improve operations,
          strengthen customer trust, generate better leads, and open new growth opportunities with
          technology built for the future.
        </p>
      </div>
      <div className={styles.panel}>
        <div className={styles.carouselViewport} role="region" aria-label="Our clients">
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
                  const logo = CLIENT_LOGOS[project.id];

                  return (
                    <article
                      className={`${styles.projectCard} ${cardIndex === 1 ? styles.featuredCard : ''}`}
                      key={`${copy}-${project.id}`}
                      style={{ '--card-delay': `${cardIndex * 90}ms` } as React.CSSProperties}
                    >
                      <div className={styles.logoWrap} aria-hidden="true">
                        {logo ? (
                          <img
                            className={styles.clientLogo}
                            src={logo}
                            alt=""
                            loading={projectIndex === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                          />
                        ) : (
                          <span className={styles.clientInitials}>
                            {getInitials(project.title)}
                          </span>
                        )}
                      </div>

                      <h3>{project.title}</h3>
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
