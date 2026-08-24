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
    tags: ['Scope', 'Users', 'Goals'],
  },
  {
    number: '02',
    title: 'Plan',
    tag: 'Strategy',
    icon: Layers,
    desc: 'Architecture blueprint & sprint roadmap.',
    tags: ['Tech Stack', 'Roadmap', 'Sprint'],
  },
  {
    number: '03',
    title: 'Design',
    tag: 'Creation',
    icon: Palette,
    desc: 'Intuitive UX layouts & Figma prototypes.',
    tags: ['Wireframe', 'UI Kit', 'Prototype'],
  },
  {
    number: '04',
    title: 'Build',
    tag: 'Engineering',
    icon: Code2,
    desc: 'Modular frontend, robust APIs & cloud.',
    tags: ['Frontend', 'Backend', 'APIs'],
  },
  {
    number: '05',
    title: 'Test',
    tag: 'QA & Security',
    icon: ShieldCheck,
    desc: 'Speed audits, device testing & zero bugs.',
    tags: ['Device QA', 'Speed', 'Security'],
  },
  {
    number: '06',
    title: 'Launch',
    tag: 'Go-Live',
    icon: Rocket,
    desc: 'Production deploy, cloud setup & support.',
    tags: ['Deploy', 'Cloud', 'Scaling'],
  },
];

// Custom Stylized Peacock Feather SVG
function PeacockFeather({ width = 32, height = 32, active = false, angle = 0 }) {
  return (
    <svg
      viewBox="0 0 44 44"
      width={width}
      height={height}
      className={`${styles.peacockSvg} ${active ? styles.peacockActive : ''}`}
      style={{
        transform: `rotate(${angle}deg)`,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="featherStem" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="60%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <radialGradient id="peacockEyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="35%" stopColor="#7C3AED" />
          <stop offset="65%" stopColor="#0284C7" />
          <stop offset="85%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#D4AF37" />
        </radialGradient>
      </defs>

      {/* Feather Quill Stem */}
      <path
        d="M 6,38 Q 18,26 30,10"
        fill="none"
        stroke="url(#featherStem)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Left Wisps / Barbs */}
      <path
        d="M 12,32 Q 6,26 4,20 M 16,27 Q 9,21 8,14 M 20,22 Q 13,16 13,9 M 25,17 Q 18,11 20,4"
        fill="none"
        stroke="#0D9488"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Right Wisps / Barbs */}
      <path
        d="M 14,34 Q 22,30 26,28 M 18,29 Q 26,24 30,22 M 22,24 Q 30,19 34,17 M 27,19 Q 34,14 36,10"
        fill="none"
        stroke="#0D9488"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Outer Peacock Eye Medallion */}
      <ellipse
        cx="30"
        cy="10"
        rx="7.5"
        ry="6"
        transform="rotate(-30 30 10)"
        fill="url(#peacockEyeGlow)"
        stroke="#D4AF37"
        strokeWidth="1"
      />

      {/* Inner Purple Pupil with Gold Shimmer */}
      <ellipse
        cx="30"
        cy="10"
        rx="3.8"
        ry="3"
        transform="rotate(-30 30 10)"
        fill="#7C3AED"
      />
      <circle cx="30" cy="10" r="1.8" fill="#0F172A" />
      <circle cx="31.2" cy="9" r="0.8" fill="#D4AF37" />
    </svg>
  );
}

export function Process() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through zigzag section
      const totalDist = rect.height - windowHeight * 0.4;
      const currentPassed = windowHeight * 0.6 - rect.top;
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
      <div className="section-header reveal visible">
        <SectionBadge>Process</SectionBadge>
        <h2 className={styles.sectionTitle}>
          A simple process. <br />
          <span className={styles.highlightText}>A better outcome.</span>
        </h2>
        <p className={styles.sectionDesc}>
          Follow the peacock feather path — step-by-step zigzag milestones from first idea{' '}
          <BlurFadeText>to launch.</BlurFadeText>
        </p>
      </div>

      <div className={styles.zigzagContainer}>
        {PROCESS_STEPS.map((step, idx) => {
          const IconComponent = step.icon;
          const isPassed = idx <= activeStepIndex && scrollProgress > 0.02;
          const isCurrent = idx === activeStepIndex && scrollProgress > 0.02;
          const isLeft = idx % 2 === 0; // 0, 2, 4 = Left | 1, 3, 5 = Right
          const hasNext = idx < PROCESS_STEPS.length - 1;
          const isNextPassed = idx + 1 <= activeStepIndex && scrollProgress > 0.02;

          return (
            <div key={step.number} className={styles.zigzagBlock}>
              {/* Row with Circular Disc Stepping-Stone Card */}
              <div
                className={`${styles.stageRow} ${isLeft ? styles.stageLeft : styles.stageRight} ${
                  isPassed ? styles.stagePassed : ''
                } ${isCurrent ? styles.stageActive : ''}`}
              >
                {/* Circular Stepping-Stone Disc */}
                <div className={styles.cardWrapper}>
                  <div
                    className={`${styles.circularDisc} ${isPassed ? styles.discPassed : ''} ${
                      isCurrent ? styles.discActive : ''
                    }`}
                  >
                    {/* Floating Step Number Crown */}
                    <div className={styles.topNumberBadge}>
                      {step.number}
                    </div>

                    {/* Circular Icon Orb */}
                    <div className={styles.innerIconOrb}>
                      <IconComponent size={24} />
                    </div>

                    {/* Stage Name & Tag */}
                    <h3 className={styles.discTitle}>{step.title}</h3>
                    <span className={styles.discTag}>{step.tag}</span>

                    {/* Short Description */}
                    <p className={styles.discDesc}>{step.desc}</p>

                    {/* Mini Chips */}
                    <div className={styles.discChipsRow}>
                      {step.tags.map((t, i) => (
                        <span key={i} className={styles.discChip}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Floating Peacock Feather Follower on Active Stage */}
                    {isCurrent && (
                      <div className={styles.activeFeatherBadge}>
                        <PeacockFeather width={22} height={22} active={true} angle={-15} />
                        <span>Current Stage</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Zigzag Diagonal Connector Trail with Following Peacock Feathers */}
              {hasNext && (
                <div className={`${styles.connectorTrack} ${isLeft ? styles.connectorLeftToRight : styles.connectorRightToLeft}`}>
                  {/* SVG Winding Zigzag Line */}
                  <svg className={styles.connectorSvg} preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path
                      d={isLeft ? 'M 25,0 C 25,50 75,50 75,100' : 'M 75,0 C 75,50 25,50 25,100'}
                      className={styles.svgPathBase}
                    />
                    <path
                      d={isLeft ? 'M 25,0 C 25,50 75,50 75,100' : 'M 75,0 C 75,50 25,50 25,100'}
                      className={`${styles.svgPathActive} ${isNextPassed ? styles.svgPathFilled : ''}`}
                    />
                  </svg>

                  {/* Peacock Feathers Guiding along the Diagonal */}
                  <div className={styles.diagonalFeathersGroup}>
                    <div className={styles.featherItem}>
                      <PeacockFeather
                        width={22}
                        height={22}
                        active={isPassed}
                        angle={isLeft ? 40 : -40}
                      />
                    </div>
                    <div className={styles.centerFeatherFollower}>
                      <PeacockFeather
                        width={30}
                        height={30}
                        active={isNextPassed || isCurrent}
                        angle={isLeft ? 45 : -45}
                      />
                    </div>
                    <div className={styles.featherItem}>
                      <PeacockFeather
                        width={22}
                        height={22}
                        active={isNextPassed}
                        angle={isLeft ? 40 : -40}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Process;
