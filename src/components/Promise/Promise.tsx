'use client';

import React, { useRef } from 'react';
import {
  MessageSquare,
  Code2,
  Zap,
  Target,
  Handshake,
  ScanEye,
  ShieldCheck,
  Award,
  CheckCircle,
  Sparkles,
  Star,
  Layers,
  Compass,
  type LucideIcon,
} from 'lucide-react';
import { useData } from '@/context/useData';
import styles from './Promise.module.css';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

const ICON_MAP: Record<string, LucideIcon> = {
  MessageSquare,
  Code2,
  Zap,
  Target,
  Handshake,
  ScanEye,
  ShieldCheck,
  Award,
  CheckCircle,
  Sparkles,
  Star,
  Layers,
  Compass,
};

export function PromiseSection() {
  const { standards, siteContent } = useData();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const standardsList =
    standards && standards.length > 0
      ? standards
      : [
          {
            id: '01',
            title: 'Clear & Direct Communication',
            desc: 'No confusing technical jargon. We provide straightforward progress updates, transparent timelines, and honest project roadmaps.',
            icon: 'MessageSquare',
          },
          {
            id: '02',
            title: 'Clean, Maintainable Code',
            desc: 'We write well-structured, thoroughly documented code that your engineering team can easily scale and build upon for years to come.',
            icon: 'Code2',
          },
          {
            id: '03',
            title: 'Fast Delivery Without Quality Trade-Offs',
            desc: 'We use modern frameworks, automated build pipelines, and efficient workflows to launch high-quality digital products on schedule.',
            icon: 'Zap',
          },
          {
            id: '04',
            title: 'Practical Solutions Focused on Business Goals',
            desc: 'Every design choice and feature we build directly aligns with your core business targets — driving user conversion and revenue.',
            icon: 'Target',
          },
          {
            id: '05',
            title: 'Long-Term Support After Launch',
            desc: 'Our relationship does not end at deployment. We stand by our work, providing post-launch support, monitoring, and updates.',
            icon: 'Handshake',
          },
          {
            id: '06',
            title: 'Quality is in the Details',
            desc: 'From microscopic micro-interactions to zero-layout-shift performance, we craft digital experiences that leave a lasting impression.',
            icon: 'ScanEye',
          },
        ];

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(`.${styles.valueCard}`);
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section id="standards" ref={sectionRef} className="section-padding glow-bg">
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>
          {siteContent?.standardsHeading ? (
            siteContent.standardsHeading.includes('Engineering Standards') ? (
              <>
                {siteContent.standardsHeading.replace(/\s*&?\s*Engineering Standards/i, '').trim()}{' '}
                &amp; <span>Engineering Standards</span>
              </>
            ) : (
              siteContent.standardsHeading
            )
          ) : (
            <>
              Our Core Foundation &amp; <span>Engineering Standards</span>
            </>
          )}
        </h2>
        <p className={styles.subheading}>
          {siteContent?.standardsSubheading || (
            <>
              <strong>{siteContent?.agencyName || 'DeCode'}</strong> is a modern software studio
              that designs, builds, and launches fast, scalable websites and custom web
              applications.
            </>
          )}
        </p>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {standardsList.map((val, idx) => {
          const Icon = ICON_MAP[val.icon] || Code2;
          return (
            <div key={val.id || idx} className={styles.valueCard}>
              <div className={styles.cardHeader}>
                <span className={styles.iconCircle}>
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
              <h3 className={styles.title}>{val.title}</h3>
              <p className={styles.desc}>{val.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const Promise = PromiseSection;
export default PromiseSection;
