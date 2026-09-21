'use client';

import React, { useRef } from 'react';
import { useData } from '@/context/useData';
import styles from './Hero.module.css';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

export function Hero() {
  const { siteContent } = useData();
  const headlineLead = siteContent?.heroHeadline
    ? siteContent.heroHeadline.replace(/Digital Innovation\.?/i, '').trim()
    : 'Decoding the Future of';
  const leadContent =
    headlineLead === 'Decoding the Future of' ? (
      <>
        Decoding the
        <span className={styles.mobileLineBreak}>
          <br />
        </span>{' '}
        Future of
      </>
    ) : (
      headlineLead
    );
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const headline = headlineRef.current;
        const headlineParts = headline?.querySelectorAll('[data-hero-line]');
        const targets = headlineParts?.length ? Array.from(headlineParts) : headline;

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(
            targets,
            { opacity: 0, y: 32, rotationX: 8 },
            { opacity: 1, y: 0, rotationX: 0, duration: 0.85, stagger: 0.12 },
          )
          .fromTo(
            subtextRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.5',
          )
          .fromTo(
            ctaGroupRef.current?.children || [],
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
            '-=0.4',
          );
      });
      return () => media.revert();
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
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
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
          {/* Main Hero Headline */}
          <h1 ref={headlineRef} className={styles.headline}>
            {siteContent?.heroHeadline ? (
              siteContent.heroHeadline.includes('Digital Innovation') ? (
                <>
                  <span data-hero-line className={styles.headlineLead}>
                    {leadContent}
                  </span>{' '}
                  <span data-hero-line className={styles.headlineAccent}>
                    Digital Innovation.
                  </span>
                </>
              ) : (
                siteContent.heroHeadline
              )
            ) : (
              <>
                <span data-hero-line className={styles.headlineLead}>
                  {leadContent}
                </span>{' '}
                <span data-hero-line className={styles.headlineAccent}>
                  Digital Innovation.
                </span>
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
