import React from 'react';
import { useData } from '../../context/useData';
import styles from './Hero.module.css';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const { siteContent } = useData();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 56;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.videoWrapper} aria-hidden="true">
        <video
          className={styles.videoBackground}
          src="/sample.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className={styles.videoOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Eyebrow Live Status Badge */}
          {/* <div className={`${styles.badgeWrapper} reveal delay-1`}>
            <div className="pill-badge">
              <span className={styles.pulseDot} aria-hidden="true" />
              <span>{siteContent?.heroEyebrow || 'FULL-STACK & AI PRODUCT STUDIO'}</span>
            </div>
          </div> */}

          {/* Main Hero Headline */}
          <h1 className={`${styles.headline} reveal delay-2`}>
            Decoding the Future of <br className={styles.breakOnDesktop} />
            <span className="text-purple">Digital Innovation.</span>
          </h1>

          {/* Subtext */}
          <p className={`${styles.subtext} reveal delay-3`}>
            {siteContent?.heroSubtext ||
              'Empowering businesses to grow through innovation and technology. We deliver scalable, future-ready solutions that enhance operations, drive sustainable growth, and create long-term business value.'}
          </p>

          {/* Action CTAs */}
          <div className={`${styles.ctaGroup} reveal delay-4`}>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className={styles.primaryCta}
            >
              <span>{siteContent?.heroPrimaryCta || 'Start A Project'}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a
              href="#services"
              className={styles.secondaryCta}
            >
              Explore our services <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Social Proof & Trust Strip */}
          {/* <div className={`${styles.trustStrip} reveal delay-5`}>
            <div className={styles.trustItem}>
              <div className={styles.starGroup} aria-label="5 out of 5 stars">
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
              </div>
              <span><strong className={styles.trustNumber}>4.9/5</strong> Rating</span>
            </div>

            <div className={styles.divider} aria-hidden="true" />

            <div className={styles.trustItem}>
              <Zap size={16} color="#0071e3" aria-hidden="true" />
              <span><strong className={styles.trustNumber}>200+</strong> Products Shipped</span>
            </div>

            <div className={styles.divider} aria-hidden="true" />

            <div className={styles.trustItem}>
              <ShieldCheck size={16} color="#0071e3" aria-hidden="true" />
              <span><strong className={styles.trustNumber}>98%</strong> Client Retention</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;
