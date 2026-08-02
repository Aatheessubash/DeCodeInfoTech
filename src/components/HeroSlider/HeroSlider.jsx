import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

/* ============================================================
   SLIDE DATA — 5 service category slides with curated content
   ============================================================ */
export const slideData = [
  {
    id: 1,
    category: 'Software & Technology Solutions',
    headline: 'Build, Scale & Innovate With Custom Software Solutions',
    description:
      'Empowering enterprises with tailored software, cloud, and AI solutions for seamless operations and growth.',
    buttonText: 'Read More',
    buttonLink: '/services',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80',
    alt: 'Custom Software & Microchip Technology',
    accentColor: '#f97316',
    secondaryAccent: '#8b5cf6',
  },
  {
    id: 2,
    category: 'eLearning Solutions',
    headline: 'Revolutionize Learning With Smart eLearning Solutions',
    description:
      'Interactive, immersive, and AI-powered learning platforms to enhance knowledge retention and engagement.',
    buttonText: 'Read More',
    buttonLink: '/services',
    image:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=2000&q=80',
    alt: 'Digital eLearning & Education Tech',
    accentColor: '#06b6d4',
    secondaryAccent: '#a855f7',
  },
  {
    id: 3,
    category: 'QA Solutions',
    headline: 'Deliver Flawless Products With Expert QA',
    description:
      'Comprehensive testing strategies to ensure bug-free, reliable, high-quality software.',
    buttonText: 'Read More',
    buttonLink: '/services',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2000&q=80',
    alt: 'Quality Assurance & Software Code Inspection',
    accentColor: '#10b981',
    secondaryAccent: '#3b82f6',
  },
  {
    id: 4,
    category: 'Data Center & Cloud Solutions',
    headline: 'Secure, Scalable, And Efficient Cloud Solutions',
    description:
      'Harness the power of cloud and data centers for business resilience and seamless scalability.',
    buttonText: 'Read More',
    buttonLink: '/services',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80',
    alt: 'Data Center Servers & Cloud Computing',
    accentColor: '#38bdf8',
    secondaryAccent: '#f97316',
  },
  {
    id: 5,
    category: 'Industry 4.0 & AI Vision',
    headline: 'Power Smarter Manufacturing With AI Vision',
    description:
      'AI-driven automation and vision systems for next-gen industrial efficiency.',
    buttonText: 'Read More',
    buttonLink: '/services',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80',
    alt: 'Smart Manufacturing & Industrial Automation',
    accentColor: '#f59e0b',
    secondaryAccent: '#6366f1',
  },
];

/* ============================================================
   KEYFRAME CSS — injected once via <style> tag
   ============================================================ */
const SLIDER_STYLES = `
  @keyframes heroKenBurns {
    0%   { transform: scale(1.05); }
    100% { transform: scale(1.14); }
  }
  @keyframes heroPulse {
    0%, 100% { transform: scale(1);    opacity: 0.28; }
    50%       { transform: scale(1.18); opacity: 0.5;  }
  }
  @keyframes heroFloat {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-22px); }
  }
  @keyframes heroPing {
    0%, 100% { transform: scale(1);    opacity: 0.75; }
    50%       { transform: scale(1.65); opacity: 0;    }
  }
  @keyframes heroProgressBar {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .hs-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.03em;
    background: #ffffff;
    color: #0f172a;
    border: 2px solid transparent;
    cursor: pointer;
    text-decoration: none;
    transition: background 320ms ease, color 320ms ease, border-color 320ms ease,
                transform 320ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 320ms ease;
    box-shadow: 0 4px 18px rgba(0,0,0,0.25);
    will-change: transform;
  }
  .hs-cta:hover {
    background: var(--hs-accent, #f97316);
    color: #ffffff;
    border-color: var(--hs-accent, #f97316);
    transform: translateY(-2px);
    box-shadow: 0 10px 28px -4px rgba(0,0,0,0.35);
  }
  .hs-cta svg {
    transition: transform 300ms ease;
  }
  .hs-cta:hover svg {
    transform: translateX(4px);
  }
  .hs-dot {
    transition: height 480ms cubic-bezier(0.16, 1, 0.3, 1),
                opacity 300ms ease,
                box-shadow 300ms ease;
    border-radius: 9999px;
    width: 3px;
  }
  .hs-nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: rgba(0,0,0,0.42);
    border: 1.5px solid rgba(255,255,255,0.18);
    color: #ffffff;
    cursor: pointer;
    transition: background 250ms ease, transform 250ms cubic-bezier(0.16,1,0.3,1), box-shadow 250ms ease;
  }
  .hs-nav-btn:hover {
    background: rgba(255,255,255,0.18);
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }
  .hs-nav-btn:active {
    transform: scale(0.92);
  }
  @media (min-width: 768px) {
    .hs-cta {
      padding: 14px 36px;
      font-size: 1rem;
    }
  }
`;

/* ============================================================
   DecorativeCircles — per-slide animated blobs
   ============================================================ */
function DecorativeCircles({ accentColor, secondaryAccent }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {/* Large purple/secondary blob — top-right */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '6%',
          width: 'clamp(160px, 20vw, 300px)',
          height: 'clamp(160px, 20vw, 300px)',
          borderRadius: '50%',
          background: secondaryAccent,
          filter: 'blur(80px)',
          animation: 'heroPulse 6s ease-in-out infinite',
        }}
      />
      {/* Large orange/accent blob — bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          right: '20%',
          width: 'clamp(140px, 18vw, 260px)',
          height: 'clamp(140px, 18vw, 260px)',
          borderRadius: '50%',
          background: accentColor,
          filter: 'blur(70px)',
          animation: 'heroFloat 8s ease-in-out infinite',
        }}
      />
      {/* Small bright ping circle */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          right: '33%',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 22px 8px ${accentColor}55`,
          animation: 'heroPing 3s ease-in-out infinite',
        }}
      />
      {/* Secondary medium circle */}
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          right: '10%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: secondaryAccent,
          boxShadow: `0 0 24px 8px ${secondaryAccent}44`,
          animation: 'heroPulse 4.5s ease-in-out infinite 1s',
        }}
      />
      {/* Tiny accent dot */}
      <div
        style={{
          position: 'absolute',
          top: '62%',
          right: '46%',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 12px 4px ${accentColor}66`,
          animation: 'heroFloat 5s ease-in-out infinite 0.7s',
        }}
      />
    </div>
  );
}

/* ============================================================
   SlidePanel — individual slide with image, overlay, content
   ============================================================ */
function SlidePanel({ slide, isActive, isExiting, direction }) {
  // Determine text offset based on active state and direction
  let textTransform = 'translateX(0px)';
  let textOpacity = 0;

  if (isActive) {
    textTransform = 'translateX(0px)';
    textOpacity = 1;
  } else if (isExiting) {
    textTransform = direction === 'next' ? 'translateX(-50px)' : 'translateX(50px)';
    textOpacity = 0;
  } else {
    textTransform = direction === 'next' ? 'translateX(50px)' : 'translateX(-50px)';
    textOpacity = 0;
  }

  // Smooth cubic-bezier spring curve for high-end feel
  const springEase = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const fadeEase = 'cubic-bezier(0.4, 0, 0.2, 1)';

  return (
    <div
      aria-hidden={!isActive}
      aria-roledescription="slide"
      aria-label={`Slide: ${slide.category}`}
      style={{
        position: 'absolute',
        inset: 0,
        opacity: isActive ? 1 : isExiting ? 0 : 0,
        zIndex: isActive ? 10 : isExiting ? 5 : 0,
        transition: `opacity 850ms ${fadeEase}`,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {/* Background image + continuous smooth scale */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform, opacity',
          transform: isActive ? 'scale(1.05) translateZ(0)' : 'scale(1.14) translateZ(0)',
          transition: `transform 8000ms cubic-bezier(0.25, 1, 0.5, 1), opacity 850ms ${fadeEase}`,
        }}
      >
        {/* Dark gradient overlays for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      {/* Animated decorative circles */}
      <DecorativeCircles
        accentColor={slide.accentColor}
        secondaryAccent={slide.secondaryAccent}
      />

      {/* Content — left-aligned, vertically centered */}
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
            padding: 'clamp(32px, 8vw, 96px)',
          }}
        >
          <div
            style={{
              maxWidth: '680px',
              textAlign: 'left',
            }}
          >
            {/* Category label — slides in 1st */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
                transform: textTransform,
                opacity: textOpacity,
                transition: isActive
                  ? `transform 700ms 0ms ${springEase}, opacity 550ms 0ms ease`
                  : `transform 450ms 0ms ease-in, opacity 400ms 0ms ease-in`,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  borderRadius: '2px',
                  background: slide.accentColor,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: slide.accentColor,
                }}
              >
                {slide.category}
              </span>
            </div>

            {/* Headline — slides in 2nd */}
            <h1
              style={{
                fontSize: 'clamp(1.6rem, 4.5vw, 3.25rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 'clamp(14px, 2.5vw, 24px)',
                textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                transform: textTransform,
                opacity: textOpacity,
                transition: isActive
                  ? `transform 720ms 70ms ${springEase}, opacity 580ms 70ms ease`
                  : `transform 450ms 0ms ease-in, opacity 400ms 0ms ease-in`,
              }}
            >
              {slide.headline}
            </h1>

            {/* Description — slides in 3rd */}
            <p
              style={{
                fontSize: 'clamp(0.875rem, 1.8vw, 1.1rem)',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.65,
                marginBottom: 'clamp(22px, 3.5vw, 36px)',
                maxWidth: '540px',
                fontWeight: 400,
                transform: textTransform,
                opacity: textOpacity,
                transition: isActive
                  ? `transform 740ms 140ms ${springEase}, opacity 610ms 140ms ease`
                  : `transform 450ms 0ms ease-in, opacity 400ms 0ms ease-in`,
              }}
            >
              {slide.description}
            </p>

            {/* CTA Button — slides in 4th */}
            <div
              style={{
                transform: textTransform,
                opacity: textOpacity,
                transition: isActive
                  ? `transform 760ms 210ms ${springEase}, opacity 640ms 210ms ease`
                  : `transform 450ms 0ms ease-in, opacity 400ms 0ms ease-in`,
              }}
            >
              <a
                href={slide.buttonLink || '/services'}
                className="hs-cta"
                style={{ '--hs-accent': slide.accentColor }}
              >
                <span>{slide.buttonText || 'Read More'}</span>
                <ArrowRight style={{ width: '18px', height: '18px', flexShrink: 0 }} aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HeroSlider — main exported component
   ============================================================ */
export function HeroSlider({ slides = slideData, autoPlayInterval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const exitTimerRef = useRef(null);

  const TRANSITION_MS = 900;

  const navigate = useCallback((nextIndex, dir) => {
    setDirection(dir);
    setCurrentIndex((curr) => {
      clearTimeout(exitTimerRef.current);
      setExitingIndex(curr); // current becomes the exiting slide
      exitTimerRef.current = setTimeout(() => setExitingIndex(null), TRANSITION_MS + 50);
      return nextIndex;
    });
  }, [TRANSITION_MS]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((curr) => {
      const next = (curr - 1 + slides.length) % slides.length;
      setDirection('prev');
      clearTimeout(exitTimerRef.current);
      setExitingIndex(curr);
      exitTimerRef.current = setTimeout(() => setExitingIndex(null), TRANSITION_MS + 50);
      return next;
    });
  }, [slides.length, TRANSITION_MS]);

  const handleNext = useCallback(() => {
    setCurrentIndex((curr) => {
      const next = (curr + 1) % slides.length;
      setDirection('next');
      clearTimeout(exitTimerRef.current);
      setExitingIndex(curr);
      exitTimerRef.current = setTimeout(() => setExitingIndex(null), TRANSITION_MS + 50);
      return next;
    });
  }, [slides.length, TRANSITION_MS]);

  const handleDotClick = useCallback((index) => {
    setCurrentIndex((curr) => {
      const dir = index >= curr ? 'next' : 'prev';
      setDirection(dir);
      clearTimeout(exitTimerRef.current);
      setExitingIndex(curr);
      exitTimerRef.current = setTimeout(() => setExitingIndex(null), TRANSITION_MS + 50);
      return index;
    });
  }, [TRANSITION_MS]);

  // Cleanup on unmount
  useEffect(() => () => clearTimeout(exitTimerRef.current), []);

  /* Auto-play */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, autoPlayInterval]);

  /* Touch swipe */
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

  /* Keyboard navigation */
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
        aria-label="DeCode InfoTech — Service Highlights"
        aria-live="polite"
        tabIndex={0}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(500px, 72vh, 680px)',
          marginTop: 'clamp(70px, 8vw, 110px)',
          overflow: 'hidden',
          background: '#020617',
          userSelect: 'none',
          outline: 'none',
        }}
      >
        {/* ═══ SLIDE PANELS ═══ */}
        {slides.map((slide, index) => (
          <SlidePanel
            key={slide.id}
            slide={slide}
            isActive={index === currentIndex}
            isExiting={index === exitingIndex}
            direction={direction}
          />
        ))}

        {/* ═══ LEFT-SIDE VERTICAL INDICATORS ═══ */}
        <nav
          aria-label="Slide indicators"
          style={{
            position: 'absolute',
            left: 'clamp(16px, 3vw, 32px)',
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
                      : 'rgba(255,255,255,0.35)',
                    boxShadow: isSelected
                      ? `0 0 12px 4px ${activeSlide.accentColor}55`
                      : 'none',
                    opacity: isSelected ? 1 : 0.55,
                  }}
                />
              </button>
            );
          })}
        </nav>

        {/* ═══ PREV / NEXT ARROW BUTTONS ═══ */}
        <div
          aria-label="Slide navigation arrows"
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
            onClick={handlePrev}
            aria-label="Go to previous slide"
            className="hs-nav-btn"
            style={{ padding: 'clamp(10px, 1.5vw, 14px)' }}
          >
            <ChevronLeft style={{ width: '22px', height: '22px' }} aria-hidden="true" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Go to next slide"
            className="hs-nav-btn"
            style={{ padding: 'clamp(10px, 1.5vw, 14px)' }}
          >
            <ChevronRight style={{ width: '22px', height: '22px' }} aria-hidden="true" />
          </button>
        </div>


        {/* ═══ PROGRESS BAR — bottom edge ═══ */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'rgba(255,255,255,0.08)',
            zIndex: 30,
          }}
        >
          <div
            key={`${currentIndex}-${isPaused}`}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${activeSlide.accentColor}, ${activeSlide.secondaryAccent})`,
              boxShadow: `0 0 10px 3px ${activeSlide.accentColor}55`,
              animation: isPaused
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
