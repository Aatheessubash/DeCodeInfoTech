import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useData } from '../../context/useData';
import styles from './Hero.module.css';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const [heroRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { siteContent } = useData();

  return (
    <section id="home" className={`glow-hero-bg ${styles.heroSection}`} ref={heroRef}>
      <div className={styles.container}>
        <div className={`${styles.content} reveal ${isVisible ? 'visible' : ''}`}>
          {/* Eyebrow Badge */}
          <div className={styles.badgeWrapper}>
            <div className="pill-badge">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{siteContent?.heroEyebrow || 'TECHNOLOGY. STRATEGY. IMPACT.'}</span>
            </div>
          </div>

          {/* Main Hero Headline */}
          <h1 className={styles.headline}>
            Decoding the Future of <br className={styles.breakOnDesktop} />
            <span className="text-purple">Digital Innovation.</span>
          </h1>

          {/* Subtext */}
          <p className={styles.subtext}>
            {siteContent?.heroSubtext ||
              'We partner with forward-thinking enterprises to design, build, and scale transformative digital products that drive measurable impact and technical superiority.'}
          </p>

          {/* Action CTAs */}
          <div className={styles.ctaGroup}>
            <Link to="/contact" className="btn-primary">
              <span>{siteContent?.heroPrimaryCta || 'Start A Project'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn-secondary">
              <span>{siteContent?.heroSecondaryCta || 'Explore Services'}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
