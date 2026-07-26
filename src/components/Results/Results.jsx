import React from 'react';
import styles from './Results.module.css';
import { SectionBadge } from '../shared/SectionBadge';
import { BlurFadeText } from '../shared/BlurFadeText';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export function Results() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  const industries = [
    { name: 'Startups & SaaS', icon: '🚀' },
    { name: 'Education & Training', icon: '🎓' },
    { name: 'Construction & Real Estate', icon: '🏗️' },
    { name: 'Agriculture & Operations', icon: '🌾' },
    { name: 'Restaurants & Hospitality', icon: '🍽️' },
    { name: 'Local Service Businesses', icon: '🏪' },
    { name: 'Agencies & Creators', icon: '🎨' },
    { name: 'E-commerce Brands', icon: '🛍️' },
  ];

  return (
    <section className="section-padding glow-bg" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <SectionBadge>Industries</SectionBadge>
        <h2>
          Built for different <br />
          <span style={{ color: '#9CA3AF' }}>kinds of businesses.</span>
        </h2>
        <p>
          We work with businesses and founders who need a reliable digital presence or a custom system to <BlurFadeText>simplify their work.</BlurFadeText>
        </p>
      </div>

      <div className={styles.industriesGrid}>
        {industries.map((ind, idx) => (
          <div
            key={ind.name}
            className={`card-panel ${styles.industryCard} reveal delay-${(idx % 4) + 1} ${isVisible ? 'visible' : ''}`}
          >
            <div className={styles.industryIcon}>{ind.icon}</div>
            <div className={styles.industryName}>{ind.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
