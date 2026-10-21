'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useData } from '@/context/useData';
import styles from './Hero.module.css';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ParticleText } from './ParticleText';
import { ContactForm } from '@/components/Contact/ContactForm';
import { SiteModal } from '@/components/shared/SiteModal';
import { PageSkeleton } from '@/components/shared/PageSkeleton';

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
  const configuredHeroVideoUrl = siteContent?.heroVideoUrl?.trim() || '/sample.webm';
  const [heroVideoUrl, setHeroVideoUrl] = useState(configuredHeroVideoUrl);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setHeroVideoUrl(configuredHeroVideoUrl);
  }, [configuredHeroVideoUrl]);

  // Safety fallback: Never keep the user waiting longer than 3.2s
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsVideoReady(true);
    }, 3200);
    return () => clearTimeout(safetyTimer);
  }, []);

  // Remove skeleton overlay from DOM after fade-out transition completes
  useEffect(() => {
    if (isVideoReady) {
      const unmountTimer = setTimeout(() => {
        setShowSkeleton(false);
      }, 500);
      return () => clearTimeout(unmountTimer);
    }
  }, [isVideoReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const onReady = () => {
      setIsVideoReady(true);
      void video.play().catch(() => {
        // Muted autoplay can still be interrupted while the browser is restoring the tab.
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      onReady();
      return;
    }

    video.addEventListener('loadeddata', onReady, { once: true });
    video.addEventListener('canplay', onReady, { once: true });
    video.addEventListener('playing', onReady, { once: true });

    return () => {
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('playing', onReady);
    };
  }, [heroVideoUrl]);

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
    <>
      {showSkeleton && (
        <div
          className={`${styles.skeletonOverlay} ${isVideoReady ? styles.skeletonFadeOut : ''}`}
          aria-hidden={isVideoReady}
        >
          <PageSkeleton />
        </div>
      )}

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
            onLoadedData={() => setIsVideoReady(true)}
            onCanPlay={() => setIsVideoReady(true)}
            onError={() => {
              setIsVideoReady(true);
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

      <SiteModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        eyebrow="Start A Project"
        title={
          <>
            Let's Build Something <span className="modal-title-accent">Exceptional</span>
          </>
        }
        titleId="project-modal-heading"
        closeLabel="Close project form"
      >
        <ContactForm idPrefix="hero-project" />
      </SiteModal>
    </section>
  </>
  );
}

export default Hero;
