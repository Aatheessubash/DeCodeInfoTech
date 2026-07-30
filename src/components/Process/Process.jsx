import React from 'react';
import styles from './Process.module.css';
import { SectionBadge } from '../shared/SectionBadge';
import { BlurFadeText } from '../shared/BlurFadeText';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export function Process() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const steps = [
    {
      number: '01',
      title: 'Discover',
      desc: 'We understand your idea, target users, business goals, required features, timeline, and the problem your product needs to solve.',
    },
    {
      number: '02',
      title: 'Plan',
      desc: 'We define the project scope, choose the right technology, organize features by priority, and create a clear roadmap before development starts.',
    },
    {
      number: '03',
      title: 'Design',
      desc: 'We create the user flow, page structure, and visual direction so the product feels clear, modern, and easy to use on every screen size.',
    },
    {
      number: '04',
      title: 'Build',
      desc: 'We develop the product in focused stages, sharing updates and collecting feedback as each core part takes shape.',
    },
    {
      number: '05',
      title: 'Test',
      desc: 'We test key user flows, responsiveness, performance, forms, APIs, and major edge cases before the product goes live.',
    },
    {
      number: '06',
      title: 'Launch and Support',
      desc: 'We deploy the product, configure the domain and hosting, and provide support for improvements, updates, and future features.',
    },
  ];

  return (
    <section id="process" className="section-padding glow-bg" ref={sectionRef}>
      <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
        <SectionBadge>Process</SectionBadge>
        <h2>
          A simple process. <br />
          <span style={{ color: 'var(--muted)' }}>A better outcome.</span>
        </h2>
        <p>
          Clear steps, regular updates, and focused execution from the first conversation <BlurFadeText>to launch.</BlurFadeText>
        </p>
      </div>

      <div className={styles.processGrid}>
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className={`card-panel ${styles.stepCard} reveal delay-${(idx % 3) + 1} ${isVisible ? 'visible' : ''}`}
          >
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>{step.number}</span>
              <span className={styles.stepBadge}>Step {idx + 1}</span>
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
