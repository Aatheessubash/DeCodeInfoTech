import React from 'react';
import styles from './Results.module.css';
import { SectionBadge } from '../shared/SectionBadge';
import { BlurFadeText } from '../shared/BlurFadeText';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Rocket, GraduationCap, Building2, Tractor, Utensils, Briefcase, Paintbrush, ShoppingCart } from 'lucide-react';

export function Results() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  const industries = [
    { name: 'Startups & SaaS', icon: <Rocket size={20} aria-hidden="true" /> },
    { name: 'Education & Training', icon: <GraduationCap size={20} aria-hidden="true" /> },
    { name: 'Construction & Real Estate', icon: <Building2 size={20} aria-hidden="true" /> },
    { name: 'Agriculture & Operations', icon: <Tractor size={20} aria-hidden="true" /> },
    { name: 'Restaurants & Hospitality', icon: <Utensils size={20} aria-hidden="true" /> },
    { name: 'Local Service Businesses', icon: <Briefcase size={20} aria-hidden="true" /> },
    { name: 'Agencies & Creators', icon: <Paintbrush size={20} aria-hidden="true" /> },
    { name: 'E-commerce Brands', icon: <ShoppingCart size={20} aria-hidden="true" /> },
  ];

  const infiniteIndustries = [...industries, ...industries, ...industries];

  return (
    <section className="section-padding glow-bg" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <SectionBadge>Industries</SectionBadge>
        <h2>
          Built for different <br />
          <span style={{ color: '#64748B' }}>kinds of businesses.</span>
        </h2>
        <p>
          We work with businesses and founders who need a reliable digital presence or a custom system to <BlurFadeText>simplify their work.</BlurFadeText>
        </p>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.scrollTrack}>
          {infiniteIndustries.map((ind, idx) => (
            <div
              key={`${ind.name}-${idx}`}
              className={`card-panel ${styles.industryCard}`}
              aria-hidden={idx >= industries.length}
            >
              <div className={styles.industryIcon}>{ind.icon}</div>
              <div className={styles.industryName}>{ind.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
