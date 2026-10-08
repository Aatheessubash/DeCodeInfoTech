'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import styles from './Promise.module.css';
import {
  Compass,
  Layers,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  ArrowUpRight,
  Zap,
  Target,
  Search,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useData } from '@/context/useData';
import type { ProcessStep } from '@/lib/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Compass,
  Layers,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  Zap,
  Target,
  Search,
  CheckCircle,
};

const DEFAULT_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    tag: 'Exploration',
    icon: 'Compass',
    desc: 'Goal mapping, user needs & project scope.',
  },
  {
    number: '02',
    title: 'Plan',
    tag: 'Strategy',
    icon: 'Layers',
    desc: 'Architecture blueprint & sprint roadmap.',
  },
  {
    number: '03',
    title: 'Design',
    tag: 'Creation',
    icon: 'Palette',
    desc: 'Intuitive UX layouts & Figma prototypes.',
  },
  {
    number: '04',
    title: 'Build',
    tag: 'Engineering',
    icon: 'Code2',
    desc: 'Modular frontend, robust APIs & cloud.',
  },
  {
    number: '05',
    title: 'Test',
    tag: 'QA & Security',
    icon: 'ShieldCheck',
    desc: 'Performance audits, device testing & security checks.',
  },
  {
    number: '06',
    title: 'Launch',
    tag: 'Go-Live',
    icon: 'Rocket',
    desc: 'Production deploy, cloud setup & support.',
  },
];

export function PromiseSection() {
  const { processSteps, siteContent } = useData();
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [maxDrag, setMaxDrag] = useState(0);

  const x = useMotionValue(0);

  const stepsList = useMemo(
    () => (processSteps && processSteps.length > 0 ? processSteps : DEFAULT_STEPS),
    [processSteps],
  );

  // Screen size check for mobile view (<= 768px)
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        x.set(0);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [x]);

  // Recalculate drag boundaries when track / container dimensions change
  const updateConstraints = useCallback(() => {
    if (!isMobile || !containerRef.current || !stepsRef.current) {
      setMaxDrag(0);
      return;
    }
    const scrollW = stepsRef.current.scrollWidth;
    const offsetW = containerRef.current.offsetWidth;
    const max = Math.max(0, scrollW - offsetW);
    setMaxDrag(max);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return undefined;
    updateConstraints();

    const ro = new ResizeObserver(() => {
      updateConstraints();
    });

    if (containerRef.current) ro.observe(containerRef.current);
    if (stepsRef.current) ro.observe(stepsRef.current);

    return () => ro.disconnect();
  }, [isMobile, updateConstraints, stepsList]);

  // Handle drag release: swipe left / right with momentum and snap
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
  ) => {
    if (!isMobile || !stepsRef.current) return;
    const cards = stepsRef.current.children;
    const count = stepsList.length;
    if (!cards || count === 0) return;

    const currentX = x.get();
    const gutter = parseFloat(getComputedStyle(stepsRef.current).paddingLeft) || 20;

    // Find closest card to current position
    let closest = 0;
    let minDiff = Infinity;
    for (let i = 0; i < count; i++) {
      const card = cards[i] as HTMLElement;
      if (!card) continue;
      const cardOffset = -(card.offsetLeft - gutter);
      const diff = Math.abs(currentX - cardOffset);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    }

    // Velocity or swipe distance threshold to advance / regress card
    if (info.velocity.x < -200 || info.offset.x < -40) {
      closest = Math.min(count - 1, closest + 1);
    } else if (info.velocity.x > 200 || info.offset.x > 40) {
      closest = Math.max(0, closest - 1);
    }

    const targetCard = cards[closest] as HTMLElement;
    if (targetCard) {
      const targetX = -Math.min(Math.max(0, targetCard.offsetLeft - gutter), maxDrag);
      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  };

  return (
    <section id="process" className={styles.processSection} aria-labelledby="process-heading">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 id="process-heading" className={styles.sectionTitle}>
            {siteContent?.processHeading ? (
              siteContent.processHeading.toLowerCase().includes('better outcome') ? (
                <>
                  {siteContent.processHeading.replace(/A better outcome\.?/i, '').trim()}
                  <br />
                  <span>A Better Outcome.</span>
                </>
              ) : (
                siteContent.processHeading
              )
            ) : (
              <>
                A Simple Process.
                <br />
                <span>A Better Outcome.</span>
              </>
            )}
          </h2>
          <p className={styles.sectionDesc}>
            {siteContent?.processSubheading ||
              'From the first conversation to launch, we bring clarity to every stage — with a shared plan and a clear next step.'}
          </p>
        </header>

        <div
          ref={containerRef}
          className={styles.carouselWrapper}
          role="region"
          aria-label="Process steps"
        >
          <motion.ol
            ref={stepsRef}
            className={styles.steps}
            drag={isMobile ? 'x' : false}
            dragConstraints={isMobile ? { left: -maxDrag, right: 0 } : undefined}
            dragElastic={0.12}
            style={{ x, touchAction: isMobile ? 'pan-y' : 'auto' }}
            onDragEnd={isMobile ? handleDragEnd : undefined}
          >
            {stepsList.map((step) => {
              const Icon = ICON_MAP[step.icon] || Compass;
              return (
                <li key={step.number} className={styles.step}>
                  <div className={styles.stepHeader}>
                    <span className={styles.icon}>
                      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className={styles.stepNumber}>{step.number}</span>
                  </div>
                  <div className={styles.stepBody}>
                    <p className={styles.stage}>{step.tag}</p>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </li>
              );
            })}
          </motion.ol>
        </div>
        <div className={styles.closing}>
          <p>{siteContent?.processClosingText || 'Your idea. A clear path forward.'}</p>
          <Link href="/contact" className={styles.contactLink}>
            <span>Let’s talk about your project</span>
            <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export const Promise = PromiseSection;
export default PromiseSection;
