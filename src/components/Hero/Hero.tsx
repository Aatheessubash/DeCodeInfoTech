'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useData } from '@/context/useData';
import styles from './Hero.module.css';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { ParticleText } from './ParticleText';
import { ContactForm } from '@/components/Contact/ContactForm';

const LEGACY_HERO_HEADLINES = new Set([
  'We build digital experiences that help businesses grow. Leading web development company for startups.',
  'We build digital experiences that help businesses grow.',
  'Transforming Ideas Into Technology That Moves Businesses Forward',
]);

const LEGACY_HERO_SUBTEXTS = new Set([
  'From high-converting modern website design services to complete custom web application development — DeCode designs, builds, and launches fast, scalable digital products engineered for long-term growth. We are your trusted UI UX design and development studio.',
  'From high-converting websites to complete custom web platforms — DeCode designs, builds, and launches fast, scalable digital products engineered for long-term growth.',
  'From custom software and industrial IoT to scalable SaaS and mobile apps — DeCode designs, engineers, and scales high-performance digital solutions tailored to your business goals.',
]);

export function Hero() {
  const { siteContent } = useData();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const rawHeadline = siteContent?.heroHeadline;
  const isLegacyHeadline = rawHeadline ? LEGACY_HERO_HEADLINES.has(rawHeadline) : false;
  const currentHeadline =
    !rawHeadline || isLegacyHeadline ? 'Decoding the Future of Digital Innovation.' : rawHeadline;

  const hasAccent = currentHeadline.includes('Digital Innovation');
  const headlineLead = hasAccent
    ? currentHeadline.replace(/Digital Innovation\.?/i, '').trim()
    : currentHeadline;
  const accentText = hasAccent ? 'Digital Innovation.' : '';

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

  const rawSubtext = siteContent?.heroSubtext;
  const isLegacySubtext = rawSubtext ? LEGACY_HERO_SUBTEXTS.has(rawSubtext) : false;
  const currentSubtext =
    !rawSubtext || isLegacySubtext
      ? 'Empowering businesses to grow through innovation and technology. We deliver scalable, future-ready solutions that enhance operations, drive sustainable growth, and create long-term business value.'
      : rawSubtext;
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const configuredHeroVideoUrl = siteContent?.heroVideoUrl?.trim() || '/sample.webm';
  const [heroVideoUrl, setHeroVideoUrl] = useState(configuredHeroVideoUrl);

  useEffect(() => {
    setHeroVideoUrl(configuredHeroVideoUrl);
  }, [configuredHeroVideoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const playVideo = () => {
      void video.play().catch(() => {
        // Muted autoplay can still be interrupted while the browser is restoring the tab.
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      playVideo();
      return;
    }

    video.addEventListener('canplay', playVideo, { once: true });
    return () => video.removeEventListener('canplay', playVideo);
  }, [heroVideoUrl]);

  useEffect(() => {
    if (!isProjectModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProjectModalOpen(false);
      }
    };

    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProjectModalOpen]);

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
          ref={videoRef}
          key={heroVideoUrl}
          className={styles.videoBackground}
          src={heroVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => {
            if (heroVideoUrl !== '/sample.webm') {
              setHeroVideoUrl('/sample.webm');
            }
          }}
        />
        <div className={styles.videoOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Main Hero Headline */}
          <h1 className={styles.headline}>
            {hasAccent ? (
              <>
                <span data-hero-line className={styles.headlineLead}>
                  {leadContent}
                </span>{' '}
                <span data-hero-line className={styles.headlineAccentWrapper}>
                  <ParticleText
                    text={accentText}
                    density={4}
                    mobileDensity={2.2}
                    mobileParticleSize={0.72}
                  />
                </span>
              </>
            ) : (
              currentHeadline
            )}
          </h1>

          <p className={styles.tagline} aria-label="Imagine it. Build it. Decode the future.">
            <span className={styles.taglineTop} aria-hidden="true">
              <span className={styles.taglineItem}>
                <span className={styles.taglineDot} />
                Imagine it
              </span>
              <span className={styles.taglineItem}>
                <span className={styles.taglineDot} />
                Build it
              </span>
            </span>
            <span className={styles.taglineBottom} aria-hidden="true">
              <span className={styles.taglineDot} />
              Decode the future
            </span>
          </p>

          {/* Subtext */}
          <p className={styles.subtext}>{currentSubtext}</p>

          {/* Action CTAs */}
          <div className={styles.ctaGroup}>
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(true)}
              className={styles.primaryCta}
            >
              <span>{siteContent?.heroPrimaryCta || 'Start a project'}</span>
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

      {isProjectModalOpen && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsProjectModalOpen(false);
            }
          }}
        >
          <div
            className={styles.projectModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-heading"
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.modalEyebrow}>Start A Project</p>
                <h2 id="project-modal-heading" className={styles.modalTitle}>
                  Let's Build Something <span>Exceptional</span>
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.modalClose}
                onClick={() => setIsProjectModalOpen(false)}
                aria-label="Close project form"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <ContactForm idPrefix="hero-project" />
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
