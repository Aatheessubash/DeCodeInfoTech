'use client';

import React, { useMemo } from 'react';
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
  const stepsList = useMemo(
    () => (processSteps && processSteps.length > 0 ? processSteps : DEFAULT_STEPS),
    [processSteps],
  );

  return (
    <section id="process" className={styles.processSection} aria-label="Process">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <p className={styles.sectionDesc}>
            {siteContent?.processSubheading ||
              'From the first conversation to launch, we bring clarity to every stage — with a shared plan and a clear next step.'}
          </p>
        </header>

        <div className={styles.carouselWrapper} role="region" aria-label="Process steps">
          <ol className={styles.steps}>
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
          </ol>
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
