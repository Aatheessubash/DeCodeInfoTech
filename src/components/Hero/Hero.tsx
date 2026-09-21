'use client';

import React, { useRef } from 'react';
import { useData } from '@/context/useData';
import styles from './Hero.module.css';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

export function Hero() {
  const { siteContent } = useData();
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 },
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.3',
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6',
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5',
        );
    },
    { scope: heroRef },
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 56;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" ref={heroRef} className={styles.heroSection}>
      <div className={styles.videoWrapper} aria-hidden="true">
        <video
          key={siteContent?.heroVideoUrl || '/sample.mp4'}
          className={styles.videoBackground}
          src={siteContent?.heroVideoUrl || '/sample.mp4'}
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
          {/* SEO Eyebrow Badge */}
          {/* <div ref={badgeRef} className={styles.badgeWrapper}>
            <div className="pill-badge">
              <span className={styles.pulseDot} aria-hidden="true" />
              <span>
                {siteContent?.heroEyebrow || 'Best Software & Web Development Company in Coimbatore'}
              </span>
            </div>
          </div> */}

          {/* Main Hero Headline */}
          <h1 ref={headlineRef} className={styles.headline}>
            {siteContent?.heroHeadline ? (
              siteContent.heroHeadline.includes('Digital Innovation') ? (
                <>
                  {siteContent.heroHeadline.replace(/Digital Innovation\.?/i, '')}{' '}
                  <br className={styles.breakOnDesktop} />
                  <span className="text-purple">Digital Innovation.</span>
                </>
              ) : (
                siteContent.heroHeadline
              )
            ) : (
              <>
                Decoding the Future of <br className={styles.breakOnDesktop} />
                <span className="text-purple">Digital Innovation.</span>
              </>
            )}
          </h1>

          {/* Subtext */}
          <p ref={subtextRef} className={styles.subtext}>
            {siteContent?.heroSubtext ||
              'Empowering businesses to grow through innovation and technology. We deliver scalable, future-ready solutions that enhance operations, drive sustainable growth, and create long-term business value.'}
          </p>

          {/* Action CTAs */}
          <div ref={ctaGroupRef} className={styles.ctaGroup}>
            <button type="button" onClick={() => scrollTo('contact')} className={styles.primaryCta}>
              <span>{siteContent?.heroPrimaryCta || 'Start A Project'}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('services')}
              className={styles.secondaryCta}
            >
              <span>{siteContent?.heroSecondaryCta || 'Explore our services'}</span>
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className={styles.ctaArrow}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
