'use client';

import React from 'react';
import { ArrowUpRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import { useData } from '@/context/useData';
import styles from './WhoWeAre.module.css';

export function WhoWeAre() {
  const { siteContent } = useData();

  const rawHeading = siteContent?.aboutHeading || 'Building What’s Next.';
  const hasNext =
    rawHeading.toLowerCase().includes('what’s next') ||
    rawHeading.toLowerCase().includes("what's next") ||
    rawHeading.toLowerCase().includes('next');

  const caption = siteContent?.aboutCaption || 'Built To Evolve. Designed For What’s Next.';
  const captionParts = caption.includes('.') ? caption.split('.') : [caption, ''];
  const captionTitle = captionParts[0]?.trim() ? `${captionParts[0].trim()}.` : 'Built To Evolve.';
  const captionSub = captionParts.slice(1).join('.').trim() || 'Designed For What’s Next.';

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Narrative & Strategic Positioning */}
          <div className={styles.copyColumn}>
            <div className={`${styles.copy} reveal`}>
              <h2 id="about-heading" className={styles.headline}>
                {hasNext ? (
                  <>
                    Building What’s <span className={styles.gradientWord}>Next.</span>
                  </>
                ) : (
                  rawHeading
                )}
              </h2>

              <p className={styles.lead}>
                {siteContent?.aboutLead ||
                  'We turn complex business challenges into intelligent digital solutions.'}
              </p>

              {/* Detailed Narrative */}
              <div className={styles.description}>
                <p>
                  {siteContent?.aboutDesc1 ||
                    'At DeCode InfoTech, we bring technology, strategy, and design together to build software that moves businesses forward. From custom applications and scalable SaaS platforms to intelligent automation, we create solutions tailored to your goals.'}
                </p>
                <p>
                  {siteContent?.aboutDesc2 ||
                    'We believe technology should do more than solve today’s problems — it should open doors to new opportunities. That’s why we focus on building reliable, adaptable, and future-ready digital experiences that simplify operations, accelerate growth, and create lasting value.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Dynamic Badges */}
          <figure className={`${styles.visualContainer} reveal`}>
            <div className={styles.imageCard}>
              <img
                src={siteContent?.aboutImage || '/assets/who-we-are.jpg'}
                alt={`${siteContent?.agencyName || 'DeCode InfoTech'} team collaborating in a modern engineering studio`}
                className={styles.image}
                loading="lazy"
              />

              {/* Floating Synergy Tag (Top-Left) */}
              <div className={styles.floatingDisciplineBadge}>
                <span className={styles.disciplineDot} aria-hidden="true" />
                <span className={styles.disciplineText}>
                  Technology &bull; Strategy &bull; Design
                </span>
              </div>

              {/* Floating Status Pill (Top-Right) */}
              <div className={styles.floatingStatusBadge}>
                <span className={styles.statusPulse} aria-hidden="true" />
                <span className={styles.statusText}>Future-Ready</span>
              </div>

              {/* Glassmorphism Caption Overlay (Bottom) */}
              <figcaption className={styles.glassCaption}>
                <div className={styles.captionIcon} aria-hidden="true">
                  <ArrowUpRight size={20} strokeWidth={2} />
                </div>
                <div className={styles.captionText}>
                  <p className={styles.captionTitle}>{captionTitle}</p>
                  <p className={styles.captionSub}>{captionSub}</p>
                </div>
              </figcaption>
            </div>
          </figure>
        </div>

        {/* Value & Impact Outcomes Grid */}
        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIconBox} aria-hidden="true">
              <CheckCircle2 size={22} strokeWidth={2} />
            </div>
            <div className={styles.valueContent}>
              <h3 className={styles.valueTitle}>Simplify Operations</h3>
              <p className={styles.valueDesc}>
                Reliable, adaptable digital systems and intelligent automation that eliminate
                bottlenecks and streamline daily execution.
              </p>
            </div>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIconBox} aria-hidden="true">
              <TrendingUp size={22} strokeWidth={2} />
            </div>
            <div className={styles.valueContent}>
              <h3 className={styles.valueTitle}>Accelerate Growth</h3>
              <p className={styles.valueDesc}>
                High-performance custom applications and scalable SaaS platforms built to turn
                market opportunities into measurable momentum.
              </p>
            </div>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIconBox} aria-hidden="true">
              <ShieldCheck size={22} strokeWidth={2} />
            </div>
            <div className={styles.valueContent}>
              <h3 className={styles.valueTitle}>Create Lasting Value</h3>
              <p className={styles.valueDesc}>
                Engineered with future-ready standards so your technology evolves effortlessly
                without disruptive rewrites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
