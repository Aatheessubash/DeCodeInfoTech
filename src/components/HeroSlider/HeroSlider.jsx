import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Play, Pause } from 'lucide-react';

/* ============================================================
   SLIDE DATA — 5 Curated Slides Aligned with Brand & Offerings
   ============================================================ */
const slideData = [
  {
    id: 1,
    category: 'Software & Technology Solutions',
    headline: 'Transforming Ideas Into Technology That Moves Businesses Forward',
    description:
      'From custom software architectures to intelligent automation, DeCode designs and engineers scalable digital solutions tailored to your business growth.',
    primaryCtaText: 'Start a Conversation',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Explore Our Services',
    secondaryCtaLink: '/services',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80',
    alt: 'Custom Enterprise Software Engineering',
    accentColor: '#D4AF37', // DeCode Gold
    secondaryAccent: '#7C3AED', // Royal Purple
  },
  {
    id: 2,
    category: 'Industrial Automation – AI & IoT',
    headline: 'Power Smarter Manufacturing With AI Vision & Smart IoT',
    description:
      'Transform factory floors and industrial operations with IoT telemetry, automated computer vision, and real-time process intelligence.',
    primaryCtaText: 'Start a Conversation',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Explore Our Services',
    secondaryCtaLink: '/services',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=80',
    alt: 'Industrial Automation & IoT Systems',
    accentColor: '#38BDF8', // Cyan / Sapphire
    secondaryAccent: '#6D28D9', // Deep Purple
  },
  {
    id: 3,
    category: 'UI/UX Design & SaaS Development',
    headline: 'High-Converting Digital Products & Multi-Tenant SaaS',
    description:
      'Craft intuitive design systems and cloud-native SaaS platforms engineered for high throughput, robust security, and seamless adoption.',
    primaryCtaText: 'Start a Conversation',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Explore Our Services',
    secondaryCtaLink: '/services',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80',
    alt: 'UI UX Design and SaaS Architecture',
    accentColor: '#F59E0B', // Warm Gold
    secondaryAccent: '#8B5CF6', // Lavender Purple
  },
  {
    id: 4,
    category: 'Mobile App & Full-Stack Development',
    headline: 'Native iOS, Android & Scalable Web Applications',
    description:
      'Deliver ultra-responsive mobile applications and modern web portals with offline sync, fast animations, and cloud-backed reliability.',
    primaryCtaText: 'Start a Conversation',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Explore Our Services',
    secondaryCtaLink: '/services',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1800&q=80',
    alt: 'Mobile & Full Stack Web Apps',
    accentColor: '#D4AF37', // Brand Gold
    secondaryAccent: '#3B82F6', // Blue Accent
  },
  {
    id: 5,
    category: 'Maintenance, Cloud & DevOps Support',
    headline: 'Resilient Cloud Infrastructure & 24/7 Ongoing Support',
    description:
      'Automated CI/CD workflows, secure container deployment, proactive monitoring, and SLA-backed maintenance to keep your business running nonstop.',
    primaryCtaText: 'Start a Conversation',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Explore Our Services',
    secondaryCtaLink: '/services',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=80',
    alt: 'Data Center & Cloud Infrastructure',
    accentColor: '#60A5FA', // Sky Blue
    secondaryAccent: '#7C3AED', // Royal Violet
  },
];

/* ============================================================
   STYLES — Silky Cross-Fade & Hardware-Accelerated Animations
   ============================================================ */
const SLIDER_STYLES = `
  @keyframes heroPulse {
    0%, 100% { transform: scale(1); opacity: 0.35; }
    50%      { transform: scale(1.15); opacity: 0.6; }
  }
  @keyframes heroFloat {
    0%, 100% { transform: translateY(0px); }
    50%      { transform: translateY(-16px); }
  }
  @keyframes heroPing {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50%      { transform: scale(1.6); opacity: 0; }
  }
  @keyframes heroProgressBar {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .hs-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1),
                visibility 1200ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity, transform;
    z-index: 1;
  }
  .hs-slide.is-active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    z-index: 10;
  }
  .hs-slide-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transform: scale(1.08);
    transition: transform 10000ms cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
  }
  .hs-slide.is-active .hs-slide-bg {
    transform: scale(1.02);
  }
  .hs-anim-item {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
                transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .hs-slide.is-active .hs-badge {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 200ms;
  }
  .hs-slide.is-active .hs-headline {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 350ms;
  }
  .hs-slide.is-active .hs-desc {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 500ms;
  }
  .hs-slide.is-active .hs-cta-group {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 650ms;
  }
  .hs-primary-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 26px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.92rem;
    letter-spacing: 0.01em;
    background: transparent;
    color: #ffffff;
    border: 1.5px solid #ffffff;
    cursor: pointer;
    text-decoration: none;
    transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hs-primary-cta:hover {
    background: var(--hs-accent, #7C3AED);
    color: #ffffff;
    border-color: var(--hs-accent, #7C3AED);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  }
  .hs-secondary-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 26px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.92rem;
    letter-spacing: 0.01em;
    background: transparent;
    color: #ffffff;
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
    text-decoration: none;
    transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hs-secondary-cta:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #ffffff;
    color: #ffffff;
    transform: translateY(-2px);
  }
  .hs-dot {
    transition: height 500ms cubic-bezier(0.16, 1, 0.3, 1),
                opacity 350ms ease,
                background-color 350ms ease,
                box-shadow 350ms ease;
    border-radius: 9999px;
    width: 4px;
  }
  .hs-nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: rgba(18, 3, 49, 0.65);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    transition: background 250ms ease, transform 250ms cubic-bezier(0.16,1,0.3,1), box-shadow 250ms ease;
  }
  .hs-nav-btn:hover {
    background: rgba(212, 175, 55, 0.35);
    border-color: #D4AF37;
    transform: scale(1.08);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
  }
  .hs-nav-btn:active {
    transform: scale(0.94);
  }
  @media (max-width: 640px) {
    .hs-primary-cta, .hs-secondary-cta {
      width: 100%;
      justify-content: center;
      padding: 12px 20px;
      font-size: 0.88rem;
    }
  }
  @media (min-width: 768px) {
    .hs-primary-cta, .hs-secondary-cta {
      padding: 14px 32px;
      font-size: 1rem;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hs-slide,
    .hs-slide-bg,
    .hs-anim-item,
    .hs-primary-cta,
    .hs-secondary-cta,
    .hs-dot,
    .hs-nav-btn {
      transition: none !important;
      animation: none !important;
    }
  }
`;

function DecorativeCircles({ accentColor, secondaryAccent }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '8%',
          width: 'clamp(180px, 22vw, 320px)',
          height: 'clamp(180px, 22vw, 320px)',
          borderRadius: '50%',
          background: secondaryAccent,
          filter: 'blur(90px)',
          animation: 'heroPulse 7s ease-in-out infinite',
          opacity: 0.45,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10px',
          right: '22%',
          width: 'clamp(160px, 20vw, 280px)',
          height: 'clamp(160px, 20vw, 280px)',
          borderRadius: '50%',
          background: accentColor,
          filter: 'blur(80px)',
          animation: 'heroFloat 9s ease-in-out infinite',
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '26%',
          right: '30%',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 20px 6px ${accentColor}88`,
          animation: 'heroPing 3.5s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '28%',
          right: '12%',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: secondaryAccent,
          boxShadow: `0 0 20px 6px ${secondaryAccent}55`,
          animation: 'heroPulse 5s ease-in-out infinite 1s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '64%',
          right: '42%',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 12px 4px ${accentColor}88`,
          animation: 'heroFloat 6s ease-in-out infinite 0.5s',
        }}
      />
    </div>
  );
}

export function HeroSlider({ slides = slideData, autoPlayInterval = 5500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [isPaused, setIsPaused] = useState(prefersReducedMotion);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((curr) => (curr - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((curr) => (curr + 1) % slides.length);
  }, [slides.length]);

  const handleDotClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || slides.length < 2) return;
    const timer = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, slides.length, handleNext, autoPlayInterval]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  const activeSlide = slides[currentIndex];

  return (
    <>
      <style>{SLIDER_STYLES}</style>

      <section
        id="hero-slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="DeCode InfoTech — Technology Highlights"
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        style={{
          position: 'relative',
          width: '100%',
          height: '100svh',
          minHeight: '620px',
          overflow: 'hidden',
          background: '#120331',
          userSelect: 'none',
          outline: 'none',
          cursor: 'default',
        }}
      >
        {/* ═══ PERSISTENT SLIDES WITH CSS CROSS-FADE ═══ */}
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={slide.id}
              className={`hs-slide ${isActive ? 'is-active' : ''}`}
              role="group"
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1}: ${slide.category}`}
            >
              {/* Background image */}
              <div
                className="hs-slide-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Luxury gradient overlays */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, rgba(18, 3, 49, 0.92) 0%, rgba(18, 3, 49, 0.65) 55%, rgba(18, 3, 49, 0.35) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(18, 3, 49, 0.3) 0%, transparent 40%, rgba(18, 3, 49, 0.8) 100%)',
                  }}
                />
              </div>

              {/* Decorative Brand Circles */}
              <DecorativeCircles
                accentColor={slide.accentColor}
                secondaryAccent={slide.secondaryAccent}
              />

              {/* Slide Content */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 20,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: 'clamp(20px, 5vw, 96px)',
                    paddingLeft: 'clamp(38px, 6vw, 96px)',
                    paddingTop: 'clamp(85px, 12vw, 130px)',
                    paddingBottom: 'clamp(80px, 12vw, 100px)',
                  }}
                >
                  <div style={{ maxWidth: '720px', textAlign: 'left' }}>
                    {/* Badge */}
                    <div
                      className="hs-anim-item hs-badge"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: `1px solid ${slide.accentColor}55`,
                        marginBottom: '18px',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: slide.accentColor,
                          boxShadow: `0 0 8px ${slide.accentColor}`,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 'clamp(0.72rem, 1.4vw, 0.84rem)',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: '#ffffff',
                        }}
                      >
                        {slide.category}
                      </span>
                    </div>

                    {/* Headline — only the active slide renders an h1 for proper SEO */}
                    {isActive ? (
                      <h1
                        className="hs-anim-item hs-headline"
                        style={{
                          fontSize: 'clamp(1.8rem, 4.8vw, 3.4rem)',
                          fontWeight: 800,
                          color: '#ffffff',
                          lineHeight: 1.12,
                          letterSpacing: '-0.02em',
                          marginBottom: 'clamp(14px, 2.2vw, 22px)',
                          textShadow: '0 2px 24px rgba(0,0,0,0.5)',
                        }}
                      >
                        {slide.headline}
                      </h1>
                    ) : (
                      <p
                        className="hs-anim-item hs-headline"
                        role="heading"
                        aria-level="2"
                        style={{
                          fontSize: 'clamp(1.8rem, 4.8vw, 3.4rem)',
                          fontWeight: 800,
                          color: '#ffffff',
                          lineHeight: 1.12,
                          letterSpacing: '-0.02em',
                          marginBottom: 'clamp(14px, 2.2vw, 22px)',
                          textShadow: '0 2px 24px rgba(0,0,0,0.5)',
                        }}
                      >
                        {slide.headline}
                      </p>
                    )}

                    {/* Description */}
                    <p
                      className="hs-anim-item hs-desc"
                      style={{
                        fontSize: 'clamp(0.92rem, 1.8vw, 1.12rem)',
                        color: 'rgba(255,255,255,0.86)',
                        lineHeight: 1.65,
                        marginBottom: 'clamp(24px, 3.5vw, 36px)',
                        maxWidth: '600px',
                        fontWeight: 400,
                      }}
                    >
                      {slide.description}
                    </p>

                    {/* CTAs */}
                    <div
                      className="hs-anim-item hs-cta-group"
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '14px',
                        alignItems: 'center',
                      }}
                    >
                      <Link
                        to={slide.primaryCtaLink || '/contact'}
                        className="hs-primary-cta"
                        style={{ '--hs-accent': slide.accentColor }}
                        tabIndex={isActive ? 0 : -1}
                      >
                        <span>{slide.primaryCtaText || 'Start a Conversation'}</span>
                        <ArrowRight style={{ width: '18px', height: '18px', flexShrink: 0 }} aria-hidden="true" />
                      </Link>

                      <Link
                        to={slide.secondaryCtaLink || '/services'}
                        className="hs-secondary-cta"
                        tabIndex={isActive ? 0 : -1}
                      >
                        <span>{slide.secondaryCtaText || 'Explore Our Services'}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ═══ LEFT-SIDE VERTICAL INDICATORS ═══ */}
        <nav
          aria-label="Slide indicators"
          style={{
            position: 'absolute',
            left: 'clamp(16px, 3vw, 36px)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {slides.map((slide, index) => {
            const isSelected = index === currentIndex;
            return (
              <button
                type="button"
                key={slide.id}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.category}`}
                aria-current={isSelected ? 'true' : 'false'}
                style={{
                  padding: '4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  outline: 'none',
                }}
              >
                <div
                  className="hs-dot"
                  style={{
                    height: isSelected ? '38px' : '8px',
                    background: isSelected
                      ? `linear-gradient(180deg, ${activeSlide.accentColor}, ${activeSlide.secondaryAccent})`
                      : 'rgba(255,255,255,0.3)',
                    boxShadow: isSelected
                      ? `0 0 14px 3px ${activeSlide.accentColor}77`
                      : 'none',
                    opacity: isSelected ? 1 : 0.5,
                  }}
                />
              </button>
            );
          })}
        </nav>

        {/* ═══ PREV / NEXT ARROW BUTTONS & PAUSE TOGGLE ═══ */}
        <div
          role="group"
          aria-label="Slide navigation controls"
          style={{
            position: 'absolute',
            right: 'clamp(16px, 3.5vw, 40px)',
            bottom: 'clamp(28px, 4vw, 44px)',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
            title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
            className="hs-nav-btn"
            style={{ padding: 'clamp(10px, 1.4vw, 14px)' }}
          >
            {isPaused ? (
              <Play style={{ width: '20px', height: '20px', marginLeft: '2px' }} aria-hidden="true" />
            ) : (
              <Pause style={{ width: '20px', height: '20px' }} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Go to previous slide"
            className="hs-nav-btn"
            style={{ padding: 'clamp(10px, 1.4vw, 14px)' }}
          >
            <ChevronLeft style={{ width: '20px', height: '20px' }} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Go to next slide"
            className="hs-nav-btn"
            style={{ padding: 'clamp(10px, 1.4vw, 14px)' }}
          >
            <ChevronRight style={{ width: '20px', height: '20px' }} aria-hidden="true" />
          </button>
        </div>

        {/* ═══ PROGRESS BAR ═══ */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 30,
          }}
        >
          <div
            key={`${currentIndex}-${isPaused}`}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${activeSlide.accentColor}, ${activeSlide.secondaryAccent})`,
              boxShadow: `0 0 10px 2px ${activeSlide.accentColor}66`,
              animation: isPaused || prefersReducedMotion
                ? 'none'
                : `heroProgressBar ${autoPlayInterval}ms linear forwards`,
            }}
          />
        </div>
      </section>
    </>
  );
}

export default HeroSlider;
