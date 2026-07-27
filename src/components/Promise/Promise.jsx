import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useData } from '../../context/DataContext';
import styles from './Promise.module.css';

export function PromiseSection() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { siteContent } = useData();

  const coreValues = [
    {
      id: '01',
      title: 'Clear & Direct Communication',
      desc: 'No confusing technical jargon. We provide straightforward progress updates, transparent timelines, and honest project roadmaps.',
      icon: '✦',
    },
    {
      id: '02',
      title: 'Clean, Maintainable Code',
      desc: 'We write well-structured, thoroughly documented code that your engineering team can easily scale and build upon for years to come.',
      icon: '⚡',
    },
    {
      id: '03',
      title: 'Fast Delivery Without Quality Trade-Offs',
      desc: 'We use modern frameworks, automated build pipelines, and efficient workflows to launch high-quality digital products on schedule.',
      icon: '⚙',
    },
    {
      id: '04',
      title: 'Practical Solutions Focused on Business Goals',
      desc: 'Every design choice and feature we build directly aligns with your core business targets — driving user conversion and revenue.',
      icon: '◈',
    },
    {
      id: '05',
      title: 'Long-Term Support After Launch',
      desc: 'Our relationship does not end at deployment. We stand by our work, providing post-launch support, monitoring, and updates.',
      icon: '⬡',
    },
    {
      id: '06',
      title: 'Quality is in the Details',
      desc: 'From microscopic micro-interactions to zero-layout-shift performance, we craft digital experiences that leave a lasting impression.',
      icon: '❖',
    },
  ];

  return (
    <section id="about" className="section-padding glow-bg" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <div className="pill-badge">
          <span className="badge-dot"></span>
          About {siteContent?.agencyName || 'DeCode'}
        </div>
        <h2>Our Core Foundation & Engineering Standards</h2>
        <p>
          <strong>{siteContent?.agencyName || 'DeCode'}</strong> is a modern software studio that designs, builds, and launches fast, scalable websites and custom web applications.
        </p>
      </div>

      <div className={styles.grid}>
        {coreValues.map((val, idx) => (
          <div
            key={val.id}
            className={`card-panel ${styles.valueCard} reveal delay-${(idx % 3) + 1} ${isVisible ? 'visible' : ''}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.numBadge}>{val.id}</span>
              <span className={styles.iconCircle}>{val.icon}</span>
            </div>
            <h3 className={styles.title}>{val.title}</h3>
            <p className={styles.desc}>{val.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export const Promise = PromiseSection;
