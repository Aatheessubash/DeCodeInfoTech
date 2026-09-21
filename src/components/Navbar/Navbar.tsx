'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  House,
  Users,
  Layers3,
  BriefcaseBusiness,
  FolderKanban,
  MessageSquare,
} from 'lucide-react';
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
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
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
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === 'Tab') {
        const controls = Array.from(
          headerRef.current?.querySelectorAll<HTMLElement>('button, a[href]') || [],
        ).filter((element) => element.getClientRects().length > 0 && element.tabIndex >= 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    const desktop = window.matchMedia('(min-width: 1025px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      desktop.removeEventListener('change', closeOnDesktop);
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
    <header ref={headerRef} className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
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
            ref={toggleRef}
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
          <button
            type="button"
            className={styles.menuBackdrop}
            aria-label="Close navigation menu"
            tabIndex={-1}
            onClick={() => {
              setMobileMenuOpen(false);
              toggleRef.current?.focus();
            }}
          />
          <nav id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation">
            <div className={styles.menuHeading}>
              <span className={styles.menuEyebrow}>EXPLORE DECODE</span>
              <p>
                Ideas into impact<span>.</span>
              </p>
            </div>
            <div className={styles.menuLinks}>
              {[
                {
                  id: 'home',
                  label: 'Home',
                  detail: 'Discover DeCode',
                  icon: House,
                  active: isHomeActive,
                },
                {
                  id: 'about',
                  label: 'About us',
                  detail: 'The people behind the work',
                  icon: Users,
                  active: isAboutActive,
                },
                {
                  id: 'services',
                  label: 'Services',
                  detail: 'What we can build for you',
                  icon: Layers3,
                  active: isServicesActive,
                },
                {
                  id: 'projects',
                  label: 'Projects',
                  detail: 'Explore our work',
                  icon: FolderKanban,
                  active: isProjectsActive,
                },
                {
                  id: 'careers',
                  label: 'Careers',
                  detail: 'Build your next chapter',
                  icon: BriefcaseBusiness,
                  active: isCareersActive,
                },
                {
                  id: 'contact',
                  label: 'Contact',
                  detail: 'Let’s start a conversation',
                  icon: MessageSquare,
                  active: isContactActive,
                },
              ].map(({ id, label, detail, icon: Icon, active }) => {
                const content = (
                  <>
                    <span className={styles.linkIcon}>
                      <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className={styles.linkCopy}>
                      <span>{label}</span>
                      <small>{detail}</small>
                    </span>
                    <ArrowUpRight className={styles.linkArrow} size={17} aria-hidden="true" />
                  </>
                );
                const className = `${styles.mobileLink} ${active ? styles.activeNav : ''}`;
                return id === 'careers' ? (
                  <Link
                    key={id}
                    href="/careers"
                    className={className}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    key={id}
                    type="button"
                    className={className}
                    aria-current={active ? 'location' : undefined}
                    onClick={() => scrollToSection(id)}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
            <div className={styles.menuContact}>
              <div>
                <span className={styles.menuEyebrow}>LET’S WORK TOGETHER</span>
                <p>Have a project in mind?</p>
                <span className={styles.contactDescription}>Let’s make something great.</span>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className={styles.menuCta}
              >
                Get Started <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
