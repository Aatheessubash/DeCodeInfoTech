import React, { useState, useEffect, useRef } from 'react';
import styles from './Process.module.css';
import { SectionBadge } from '../shared/SectionBadge';
import { BlurFadeText } from '../shared/BlurFadeText';
import {
  Compass,
  Layers,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    tag: 'Exploration',
    icon: Compass,
    desc: 'Goal mapping, user needs & project scope.',
    tags: ['Scope', 'Goals'],
  },
  {
    number: '02',
    title: 'Plan',
    tag: 'Strategy',
    icon: Layers,
    desc: 'Architecture blueprint & sprint roadmap.',
    tags: ['Tech Stack', 'Roadmap'],
  },
  {
    number: '03',
    title: 'Design',
    tag: 'Creation',
    icon: Palette,
    desc: 'Intuitive UX layouts & Figma prototypes.',
    tags: ['Wireframe', 'Prototype'],
  },
  {
    number: '04',
    title: 'Build',
    tag: 'Engineering',
    icon: Code2,
    desc: 'Modular frontend, robust APIs & cloud.',
    tags: ['Frontend', 'Backend'],
  },
  {
    number: '05',
    title: 'Test',
    tag: 'QA & Security',
    icon: ShieldCheck,
    desc: 'Speed audits, device testing & zero bugs.',
    tags: ['Device QA', 'Security'],
  },
  {
    number: '06',
    title: 'Launch',
    tag: 'Go-Live',
    icon: Rocket,
    desc: 'Production deploy, cloud setup & support.',
    tags: ['Deploy', 'Scaling'],
  },
];

export function Process() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 540);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = rect.height - windowHeight * 0.3;
      const currentPassed = windowHeight * 0.7 - rect.top;
      const progress = Math.min(Math.max(currentPassed / totalDist, 0), 1);

      setScrollProgress(progress);

      const stepFraction = 1 / PROCESS_STEPS.length;
      const currentIdx = Math.min(
        Math.floor(progress / stepFraction),
        PROCESS_STEPS.length - 1
      );
      setActiveStepIndex(progress > 0.02 ? currentIdx : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="process" className={`section-padding ${styles.processSection}`} ref={containerRef}>
      <div className="section-header reveal" style={{ marginBottom: '24px' }}>
        <SectionBadge>Process</SectionBadge>
        <h2 className={styles.sectionTitle}>
          A simple process. <br />
          <span className={styles.highlightText}>A better outcome.</span>
        </h2>
        <p className={styles.sectionDesc}>
          Follow our straight left-to-right roadmap — milestone by milestone from first idea{' '}
          <BlurFadeText>to launch.</BlurFadeText>
        </p>
      </div>

      <div className={styles.horizontalTrackContainer}>
        {/* Horizontal progress line — only renders on desktop (CSS hides on mobile/tablet) */}
        {!isMobile && (
          <div className={styles.straightTrackWrapper}>
            <div className={styles.trackBaseLine} />
            <div
              className={styles.trackGlowLine}
              style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
            >
              <div className={styles.travelingPulseHead} />
            </div>
          </div>
        )}

        {/* Steps grid — auto adapts via CSS: 6-col desktop / 3-col tablet / vertical mobile */}
        <div className={`${styles.stagesRow} reveal delay-1`}>
          {PROCESS_STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            const isPassed = idx <= activeStepIndex && scrollProgress > 0.02;
            const isCurrent = idx === activeStepIndex && scrollProgress > 0.02;

            return (
              <div
                key={step.number}
                className={`${styles.stageColumn} ${isPassed ? styles.stagePassed : ''} ${
                  isCurrent ? styles.stageActive : ''
                }`}
              >
                {/* Milestone Node */}
                <div className={styles.milestoneNode}>
                  <div
                    className={styles.nodeCircle}
                    style={{
                      borderColor: isPassed ? '#7C3AED' : 'rgba(124, 58, 237, 0.2)',
                      boxShadow: isCurrent ? '0 0 24px rgba(124, 58, 237, 0.45)' : 'none',
                    }}
                  >
                    <IconComponent
                      size={16}
                      style={{ color: isPassed ? '#7C3AED' : 'var(--muted)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <span className={styles.nodeNumberPill}>{step.number}</span>
                </div>

                {/* Info Card */}
                <div className={styles.discCard}>
                  <h3 className={styles.discTitle}>{step.title}</h3>
                  <span className={styles.discTag}>{step.tag}</span>
                  <p className={styles.discDesc}>{step.desc}</p>

                  <div className={styles.chipsRow}>
                    {step.tags.map((t, i) => (
                      <span key={i} className={styles.chip}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Process;
