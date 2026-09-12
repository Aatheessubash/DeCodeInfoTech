import React, { lazy, Suspense, useCallback, useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { ScrollToTop } from './components/shared/ScrollToTop';
import { RouteSeo } from './components/shared/RouteSeo';
import { MotionEffects } from './components/shared/MotionEffects';

const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));

/* ===========================================================
   PAGE TRANSITION WRAPPER
   =========================================================== */
function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      setTransitionStage('fadeOut');
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage('fadeIn');
        prevPath.current = location.pathname;
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [location.pathname, children]);

  return (
    <div
      className={`page-transition ${transitionStage}`}
      aria-live="polite"
    >
      {displayChildren}
    </div>
  );
}

/* ===========================================================
   ROUTE EFFECTS: PRECISE HASH SCROLLING WITH NAVBAR OFFSET
   =========================================================== */
function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      let attempts = 0;

      const performScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 84;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        } else if (attempts < 6) {
          attempts += 1;
          setTimeout(performScroll, 80);
        }
      };

      // Slight timeout to ensure layout is measured
      const timer = setTimeout(performScroll, 120);
      return () => clearTimeout(timer);
    } else if (pathname === '/') {
      if (!window.location.hash && window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [pathname, hash]);

  return null;
}

/* ===========================================================
   SCROLL REVEAL OBSERVER
   =========================================================== */
function ScrollRevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
      ).forEach((el) => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });
    };

    observeAll();

    // Re-observe on DOM changes (for dynamic lists & CMS updates)
    const mutationObserver = new MutationObserver(observeAll);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

/* ===========================================================
   SMOOTH CURSOR GLOW (DESKTOP ONLY)
   =========================================================== */
function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 960px)').matches;
    if (isMobile) return;

    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.06);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.06);
      glow.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
  );
}

function RouteFallback() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-loading__spinner" aria-hidden="true" />
      <span>Loading...</span>
    </div>
  );
}

function AdminRoute() {
  const navigate = useNavigate();
  const handleClose = useCallback(() => navigate('/'), [navigate]);
  return <AdminDashboard onClose={handleClose} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RouteSeo />
        <MotionEffects />
        <RouteEffects />
        <ScrollRevealObserver />
        <CursorGlow />
        <ScrollToTop />
        <div className="ambient-background" aria-hidden="true" />
        <div className="app-root">
          <Navbar />
          <main>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {/* Single Page Application Main Route */}
                <Route path="/" element={<Home />} />

                {/* Legacy / Direct Route Aliases gracefully redirect to Single Page Section Anchors */}
                <Route path="/about" element={<Navigate to="/#about" replace />} />
                <Route path="/standards" element={<Navigate to="/#standards" replace />} />
                <Route path="/services" element={<Navigate to="/#services" replace />} />
                <Route path="/technology" element={<Navigate to="/#services" replace />} />
                <Route path="/process" element={<Navigate to="/#process" replace />} />
                <Route path="/work" element={<Navigate to="/#projects" replace />} />
                <Route path="/portfolio" element={<Navigate to="/#projects" replace />} />
                <Route path="/projects" element={<Navigate to="/#projects" replace />} />
                <Route path="/industries" element={<Navigate to="/#industries" replace />} />
                <Route path="/testimonials" element={<Navigate to="/#testimonials" replace />} />
                <Route path="/team" element={<Navigate to="/#about" replace />} />
                <Route path="/careers" element={<Navigate to="/#careers" replace />} />
                <Route path="/faq" element={<Navigate to="/#faq" replace />} />
                <Route path="/contact" element={<Navigate to="/#contact" replace />} />

                {/* Secure CMS / Admin route */}
                <Route path="/SA" element={<AdminRoute />} />

                {/* Catch-all 404 Route */}
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
