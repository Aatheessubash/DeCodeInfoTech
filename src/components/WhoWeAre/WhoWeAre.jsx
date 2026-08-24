import React from 'react';
import { useData } from '../../context/useData';
import styles from './WhoWeAre.module.css';
import { Award } from 'lucide-react';

export function WhoWeAre() {
  const { siteContent } = useData();

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT COLUMN: TEXT & STATS */}
          <div className={`${styles.leftCol} reveal reveal-left`}>
            <span className={styles.eyebrow}>WHO WE ARE</span>

            <h2 className={styles.headline}>
              Sophisticated solutions for complex challenges.
            </h2>

            <p className={styles.description}>
              {siteContent?.agencyName || 'DeCode Infotech'} is a collective of visionary engineers, strategic thinkers, and meticulous designers. We don't just write code; we architect systems that empower businesses to lead in a digital-first world.
            </p>

            <div className={styles.statsRow}>
              <div className={`${styles.statCard} reveal delay-3`}>
                <div className={styles.statNumber}>200+</div>
                <div className={styles.statLabel}>PROJECTS DELIVERED</div>
              </div>

              <div className={`${styles.statCard} reveal delay-4`}>
                <div className={styles.statNumber}>98%</div>
                <div className={styles.statLabel}>CLIENT RETENTION</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TEAM IMAGE & FLOATING AWARD BADGE */}
          <div className={`${styles.rightCol} reveal reveal-right delay-2`}>
            <div className={styles.imageWrapper}>
              <img
                src="/assets/who-we-are.jpg"
                alt="DeCode Infotech team collaborating in modern office"
                className={styles.teamImage}
                loading="lazy"
              />

              {/* Floating Award Badge Overlay */}
              <div className={styles.floatingBadge}>
                <div className={styles.badgeIconBox}>
                  <Award className={styles.badgeIcon} aria-hidden="true" />
                </div>
                <div className={styles.badgeContent}>
                  <span className={styles.badgeTitle}>Award Winning</span>
                  <span className={styles.badgeSubtitle}>Design &amp; Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
