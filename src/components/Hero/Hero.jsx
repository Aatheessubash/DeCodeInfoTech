import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useData } from '../../context/DataContext';
import styles from './Hero.module.css';
import { ShieldCheck, Zap, TrendingUp, ArrowRight } from 'lucide-react';

export function Hero() {
  const [heroRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [activeModalProject, setActiveModalProject] = useState(null);
  const { projects, siteContent } = useData();

  // Split projects into 2 columns for ticker
  const mid = Math.ceil(projects.length / 2);
  const col1Projects = projects.slice(0, mid);
  const col2Projects = projects.slice(mid);

  // Duplicate arrays to guarantee seamless, uninterrupted infinity loop
  const infiniteCol1 = [...col1Projects, ...col1Projects];
  const infiniteCol2 = col2Projects.length > 0 ? [...col2Projects, ...col2Projects] : infiniteCol1;

  return (
    <section id="home" className={`glow-bg ${styles.hero}`} ref={heroRef}>
      <div className={styles.container}>
        {/* LEFT COLUMN: HERO CONTENT */}
        <div className={`${styles.content} reveal ${isVisible ? 'visible' : ''}`}>
          <div className="pill-badge">
            <span className="badge-dot"></span>
            {siteContent.heroEyebrow || 'WHERE VISION BECOMES REALITY'}
          </div>

          <h1 className={styles.headline}>
            {siteContent.heroHeadline || 'We build digital experiences that help businesses grow.'}
          </h1>

          <p className={styles.subtext}>
            {siteContent.heroSubtext ||
              'From high-converting websites to complete custom web platforms — DeCode designs, builds, and launches fast, scalable digital products engineered for long-term growth.'}
          </p>

          <div className={styles.ctaGroup}>
            <a href="#contact" className="btn-primary">
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#work" className="btn-secondary">
              Explore Our Work
            </a>
          </div>

          {/* Trust Metrics Pill */}
          <div className={styles.trustFooter}>
            <div className={styles.avatars}>
              <div className={styles.avatarPill}><ShieldCheck className="w-4 h-4 text-[#120331]" /></div>
              <div className={styles.avatarPill}><Zap className="w-4 h-4 text-[#120331]" /></div>
              <div className={styles.avatarPill}><TrendingUp className="w-4 h-4 text-[#120331]" /></div>
            </div>
            <span className={styles.trustText}>
              <strong>{siteContent.agencyName || 'DeCode Studio'}</strong> — Built on trust, speed & measurable business results.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: BIDIRECTIONAL INFINITY MARQUEE TICKER */}
        <div className={`${styles.tickerWrapper} reveal delay-2 ${isVisible ? 'visible' : ''}`}>
          {/* Column 1: DOWN TO UP (Scroll Up - 25s) */}
          <div className={`${styles.tickerColumn} ${styles.column1}`}>
            <div className={`${styles.trackUp} ${styles.track}`}>
              {infiniteCol1.map((item, idx) => (
                <div
                  key={`col1-${idx}`}
                  className={styles.tickerCard}
                  onClick={() => setActiveModalProject(item)}
                  title="Click to preview project"
                >
                  <img src={item.image} alt={item.title} className={styles.cardImg} loading="lazy" />
                  <div className={styles.cardOverlay}>
                    <span className={styles.cardTag}>{item.category}</span>
                    <h4 className={styles.cardTitle}>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: UP TO DOWN (Scroll Down - 30s) */}
          <div className={`${styles.tickerColumn} ${styles.column2}`}>
            <div className={`${styles.trackDown} ${styles.track}`}>
              {infiniteCol2.map((item, idx) => (
                <div
                  key={`col2-${idx}`}
                  className={styles.tickerCard}
                  onClick={() => setActiveModalProject(item)}
                  title="Click to preview project"
                >
                  <img src={item.image} alt={item.title} className={styles.cardImg} loading="lazy" />
                  <div className={styles.cardOverlay}>
                    <span className={styles.cardTag}>{item.category}</span>
                    <h4 className={styles.cardTitle}>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE LIGHTBOX PREVIEW MODAL */}
      {activeModalProject && (
        <div className={styles.modalBackdrop} onClick={() => setActiveModalProject(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setActiveModalProject(null)}>
              ✕
            </button>
            <div className={styles.modalImgWrapper}>
              <img src={activeModalProject.image} alt={activeModalProject.title} className={styles.modalImg} />
            </div>
            <div className={styles.modalBody}>
              <span className={styles.modalTag}>{activeModalProject.category}</span>
              <h3 className={styles.modalTitle}>{activeModalProject.title}</h3>
              <p className={styles.modalDesc}>{activeModalProject.problem || activeModalProject.desc}</p>
              <div className={styles.modalActions}>
                <a href="#contact" className="btn-primary" onClick={() => setActiveModalProject(null)}>
                  Discuss Similar Project
                </a>
                <a href="#work" className="btn-secondary" onClick={() => setActiveModalProject(null)}>
                  View All Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
