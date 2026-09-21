'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useData } from '@/context/useData';
import styles from './Navbar.module.css';

const SECTION_IDS = [
  'home',
  'about',
  'standards',
  'services',
  'process',
  'projects',
  'industries',
  'testimonials',
  'careers',
  'faq',
  'contact',
];

export function Navbar() {
  const { siteContent } = useData();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (pathname !== '/') return undefined;

    const determineActiveSection = () => {
      const scrollPos = window.scrollY + 140;
      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    determineActiveSection();
    window.addEventListener('scroll', determineActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', determineActiveSection);
  }, [pathname]);

  const scrollToSection = useCallback(
    (id: string) => {
      setMobileMenuOpen(false);

      if (pathname !== '/') {
        router.push(`/#${id}`);
        setTimeout(() => {
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
        }, 150);
        return;
      }

      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
        return;
      }

      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 56;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setActiveSection(id);
      }
    },
    [pathname, router],
  );

  const isHomeActive = activeSection === 'home' && pathname === '/';
  const isAboutActive = ['about', 'standards'].includes(activeSection) && pathname === '/';
  const isServicesActive = ['services', 'process'].includes(activeSection) && pathname === '/';
  const isProjectsActive =
    ['projects', 'work', 'industries'].includes(activeSection) && pathname === '/';
  const isCareersActive = pathname === '/careers' || activeSection === 'careers';
  const isContactActive = ['contact', 'faq'].includes(activeSection) && pathname === '/';

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className={styles.logoLink}
          aria-label={`${siteContent?.agencyName || 'DeCode'} home`}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img
            src={siteContent?.logoUrl || '/DeCode_Logo.png'}
            alt={siteContent?.agencyName || 'DeCode InfoTech'}
            className={styles.logoImg}
            width={120}
            height={42}
          />
        </button>

        {/* Clean Primary Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <button
            type="button"
            className={`${styles.navBtn} ${isHomeActive ? styles.activeNav : ''}`}
            onClick={() => scrollToSection('home')}
          >
            Home
          </button>

          <button
            type="button"
            className={`${styles.navBtn} ${isAboutActive ? styles.activeNav : ''}`}
            onClick={() => scrollToSection('about')}
          >
            About
          </button>

          <button
            type="button"
            className={`${styles.navBtn} ${isServicesActive ? styles.activeNav : ''}`}
            onClick={() => scrollToSection('services')}
          >
            Services
          </button>

          <button
            type="button"
            className={`${styles.navBtn} ${isProjectsActive ? styles.activeNav : ''}`}
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </button>

          <Link
            href="/careers"
            className={`${styles.navBtn} ${isCareersActive ? styles.activeNav : ''}`}
          >
            Careers
          </Link>

          <button
            type="button"
            className={`${styles.navBtn} ${isContactActive ? styles.activeNav : ''}`}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className={styles.actionBtn}
          >
            Get Started
          </button>

          <button
            type="button"
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation">
            <button
              type="button"
              className={`${styles.mobileLink} ${isHomeActive ? styles.activeNav : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </button>
            <button
              type="button"
              className={`${styles.mobileLink} ${isAboutActive ? styles.activeNav : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
            <button
              type="button"
              className={`${styles.mobileLink} ${isServicesActive ? styles.activeNav : ''}`}
              onClick={() => scrollToSection('services')}
            >
              Services
            </button>
            <button
              type="button"
              className={`${styles.mobileLink} ${isProjectsActive ? styles.activeNav : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>
            <Link
              href="/careers"
              className={`${styles.mobileLink} ${isCareersActive ? styles.activeNav : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Careers
            </Link>
            <button
              type="button"
              className={`${styles.mobileLink} ${isContactActive ? styles.activeNav : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className={styles.actionBtn}
              style={{ marginTop: '12px', justifyContent: 'center' }}
            >
              Get Started <ArrowRight className="w-4 h-4 inline ml-1" aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
