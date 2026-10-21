import React from 'react';
import styles from './PageSkeleton.module.css';

export function PageSkeleton() {
  return (
    <div
      className={styles.pageSkeleton}
      role="status"
      aria-label="Loading page content"
      aria-busy="true"
    >
      <span className={styles.srOnly}>Loading page content, please wait...</span>

      {/* Top progress glow indicator */}
      <div className={styles.progressBar} aria-hidden="true">
        <div className={styles.progressGlow} />
      </div>

      <div className={styles.container}>
        {/* Hero Section Skeleton */}
        <section className={styles.heroSection} aria-hidden="true">
          <div className={styles.eyebrow} />

          <div className={styles.titleGroup}>
            <div className={styles.titleLine1} />
            <div className={styles.titleLine2} />
          </div>

          <div className={styles.subtitleGroup}>
            <div className={styles.subLine1} />
            <div className={styles.subLine2} />
            <div className={styles.subLine3} />
          </div>

          <div className={styles.actionsGroup}>
            <div className={styles.btnPrimary} />
            <div className={styles.btnSecondary} />
          </div>

          {/* Metrics / Stats Row */}
          <div className={styles.statsRow}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statNumber} />
                <div className={styles.statLabel} />
              </div>
            ))}
          </div>
        </section>

        {/* Content Section Skeleton */}
        <section className={styles.contentSection} aria-hidden="true">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow} />
            <div className={styles.sectionTitle} />
            <div className={styles.sectionDesc} />
          </div>

          {/* Cards Grid */}
          <div className={styles.cardGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardMedia} />
                <div className={styles.cardPill} />
                <div className={styles.cardHeading} />
                <div className={styles.cardBodyLine1} />
                <div className={styles.cardBodyLine2} />
                <div className={styles.cardFooter}>
                  <div className={styles.cardFooterText} />
                  <div className={styles.cardFooterIcon} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PageSkeleton;

