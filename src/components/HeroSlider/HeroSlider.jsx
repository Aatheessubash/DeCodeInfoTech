import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Play, Pause } from 'lucide-react';

/* ============================================================
   SLIDE DATA — Aligned with DeCode Brand & New Service Offerings
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
   KEYFRAME CSS — Injected for smooth animations & hover effects
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
  .hs-primary-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.92rem;
    letter-spacing: 0.02em;
    background: #ffffff;
    color: #120331;
    border: 2px solid #ffffff;
    cursor: pointer;
    text-decoration: none;
    transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  .hs-primary-cta:hover {
    background: var(--hs-accent, #D4AF37);
    color: #120331;
    border-color: var(--hs-accent, #D4AF37);
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.4);
  }
  .hs-secondary-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.92rem;
    letter-spacing: 0.02em;
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    cursor: pointer;
    text-decoration: none;
    transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hs-secondary-cta:hover {
    background: rgba(255, 255, 255, 0.25);
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
  @media (min-width: 768px) {
    .hs-primary-cta, .hs-secondary-cta {
      padding: 14px 32px;
      font-size: 1rem;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hs-primary-cta,
    .hs-secondary-cta,
    .hs-dot,
    .hs-nav-btn {
      transition: none;
    }
  }
`;

const TRANSITION_MS = 1000;

/* ============================================================
   DecorativeCircles — DeCode Brand Purple & Gold Glow Accents
   ============================================================ */
function DecorativeCircles({ accentColor, secondaryAccent }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {/* Large brand purple blob — top-right */}
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
      {/* Brand gold blob — bottom-right */}
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
      {/* Bright ping dot */}
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
      {/* Subtle lavender floating dot */}
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
      {/* Tiny gold accent dot */}
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

/* ============================================================
   SlidePanel — Silky fade & easing with no abrupt cuts
   ============================================================ */
function SlidePanel({ slide, isActive, isExiting, direction }) {
  const springEase = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const fadeEase = 'cubic-bezier(0.25, 1, 0.5, 1)';

  let textTransform = 'translateX(0px)';
  let textOpacity = 0;

  if (isActive) {
    textTransform = 'translateX(0px)';
    textOpacity = 1;
  } else if (isExiting) {
    textTransform = direction === 'next' ? 'translateX(-30px)' : 'translateX(30px)';
    textOpacity = 0;
  } else {
    textTransform = direction === 'next' ? 'translateX(30px)' : 'translateX(-30px)';
    textOpacity = 0;
  }

  return (
    <div
      role="group"
      aria-hidden={!isActive}
      aria-roledescription="slide"
      aria-label={`Slide: ${slide.category}`}
      style={{
        position: 'absolute',
        inset: 0,
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 10 : isExiting ? 5 : 0,
        transition: `opacity ${TRANSITION_MS}ms ${fadeEase}`,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {/* Background image + smooth continuous ambient zoom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform, opacity',
          transform: isActive ? 'scale(1.04) translateZ(0)' : 'scale(1.10) translateZ(0)',
          transition: `transform 9000ms cubic-bezier(0.25, 1, 0.5, 1), opacity ${TRANSITION_MS}ms ${fadeEase}`,
        }}
      >
        {/* Deep brand gradient overlays for readability and luxury aesthetics */}
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

      {/* Brand animated decorative circles */}
      <DecorativeCircles
        accentColor={slide.accentColor}
        secondaryAccent={slide.secondaryAccent}
      />

      {/* Content layout */}
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
            padding: 'clamp(28px, 7vw, 96px)',
            paddingTop: 'clamp(90px, 11vw, 130px)',
          }}
        >
          <div
            style={{
              maxWidth: '720px',
              textAlign: 'left',
            }}
          >
            {/* Category label */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${slide.accentColor}55`,
                marginBottom: '18px',
                transform: textTransform,
                opacity: textOpacity,
                transition: isActive
                  ? `transform 750ms 50ms ${springEase}, opacity 600ms 50ms ease`
                  : `transform 400ms 0ms ease, opacity 350ms 0ms ease`,
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

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 4.8vw, 3.4rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                marginBottom: 'clamp(14px, 2.2vw, 22px)',
                textShadow: '0 2px 24px rgba(0,0,0,0.5)',
                transform: textTransform,
                opacity: textOpacity,
                transition: isActive
                  ? `transform 780ms 100ms ${springEase}, opacity 620ms 100ms ease`
                  : `transform 400ms 0ms ease, opacity 350ms 0ms ease`,
              }}
            >
              {slide.headline}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.8vw, 1.12rem)',
                color: 'rgba(255,255,255,0.86)',
                lineHeight: 1.65,
                marginBottom: 'clamp(24px, 3.5vw, 36px)',
                maxWidth: '600px',
                fontWeight: 400,
                transform: textTransform,
                opacity: textOpacity,
                transition: isActive
                  ? `transform 800ms 160ms ${springEase}, opacity 640ms 160ms ease`
                  : `transform 400ms 0ms ease, opacity 350ms 0ms ease`,
              }}
            >
              {slide.description}
            </p>

            {/* CTA Button Group */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                transform: textTransform,
                opacity: textOpacity,
                transition: isActive
                  ? `transform 820ms 220ms ${springEase}, opacity 660ms 220ms ease`
                  : `transform 400ms 0ms ease, opacity 350ms 0ms ease`,
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
}

/* ============================================================
   HeroSlider — Main Exported Component
   ============================================================ */
export function HeroSlider({ slides = slideData, autoPlayInterval = 5500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const [direction, setDirection] = useState('next');
  const [prefersReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [isPaused, setIsPaused] = useState(prefersReducedMotion);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const exitTimerRef = useRef(null);

  const handlePrev = useCallback(() => {
    setCurrentIndex((curr) => {
      const next = (curr - 1 + slides.length) % slides.length;
      setDirection('prev');
      clearTimeout(exitTimerRef.current);
      setExitingIndex(curr);
      exitTimerRef.current = setTimeout(() => setExitingIndex(null), TRANSITION_MS + 50);
      return next;
    });
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((curr) => {
      const next = (curr + 1) % slides.length;
      setDirection('next');
      clearTimeout(exitTimerRef.current);
      setExitingIndex(curr);
      exitTimerRef.current = setTimeout(() => setExitingIndex(null), TRANSITION_MS + 50);
      return next;
    });
  }, [slides.length]);

  const handleDotClick = useCallback((index) => {
    setCurrentIndex((curr) => {
      if (index === curr) return curr;
      const dir = index >= curr ? 'next' : 'prev';
      setDirection(dir);
      clearTimeout(exitTimerRef.current);
      setExitingIndex(curr);
      exitTimerRef.current = setTimeout(() => setExitingIndex(null), TRANSITION_MS + 50);
      return index;
    });
  }, []);

  useEffect(() => () => clearTimeout(exitTimerRef.current), []);

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
        {/* ═══ SLIDE PANELS ═══ */}
        {slides.map((slide, index) => {
          if (index !== currentIndex && index !== exitingIndex) return null;

          return (
            <SlidePanel
              key={slide.id}
              slide={slide}
              isActive={index === currentIndex}
              isExiting={index === exitingIndex}
              direction={direction}
            />
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
