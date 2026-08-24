import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/useData';
import styles from './Hero.module.css';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const { siteContent } = useData();

  return (
    <section id="home" className={`glow-hero-bg ${styles.heroSection}`}>
      {/* Floating orb accents */}
      <div className={styles.orbAccent1} aria-hidden="true" />
      <div className={styles.orbAccent2} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Eyebrow Badge */}
          <div className={`${styles.badgeWrapper} reveal delay-1`}>
            <div className="pill-badge">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{siteContent?.heroEyebrow || 'TECHNOLOGY. STRATEGY. IMPACT.'}</span>
            </div>
          </div>

          {/* Main Hero Headline */}
          <h1 className={`${styles.headline} reveal delay-2`}>
            Decoding the Future of <br className={styles.breakOnDesktop} />
            <span className="text-purple">Digital Innovation.</span>
          </h1>

          {/* Subtext */}
          <p className={`${styles.subtext} reveal delay-3`}>
            {siteContent?.heroSubtext ||
              'We partner with forward-thinking enterprises to design, build, and scale transformative digital products that drive measurable impact and technical superiority.'}
          </p>

          {/* Action CTAs */}
          <div className={`${styles.ctaGroup} reveal delay-4`}>
            <Link to="/#contact" className="btn-primary">
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
