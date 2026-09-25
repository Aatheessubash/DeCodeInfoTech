'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useData } from '@/context/useData';
import styles from './Footer.module.css';
import { ArrowRight, ArrowUp, Mail, MapPin, Phone, Globe } from 'lucide-react';

export function Footer() {
  const { siteContent } = useData();
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (id: string) => {
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
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* 2. Main 4-Column Footer Grid */}
      <div className={styles.container}>
        {/* Column 1: Brand & Studio Identity */}
        <div className={styles.brandCol}>
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className={styles.logoLink}
            aria-label="DeCode InfoTech - Back to home"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textAlign: 'left',
            }}
          >
            <img
              src={siteContent?.logoUrl || '/DeCode_Logo.png'}
              alt={`${siteContent?.agencyName || 'DeCode'} Logo`}
              className={styles.logoImg}
            />
          </button>
          <span className={styles.tagline}>
            {siteContent?.heroEyebrow || 'WHERE VISION BECOMES REALITY'}
          </span>
          <p className={styles.desc}>
            {siteContent?.agencyName || 'DeCode InfoTech'} is a modern software studio and digital
            engineering firm. We design, engineer, and scale high-performance custom web
            applications, SaaS platforms, and enterprise solutions.
          </p>

          {/* Social Icons Strip */}
          <div className={styles.socialRow} aria-label="Social links">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.65-1.66 1.66 1.66 0 0 0-1.65-1.66Z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="GitHub"
              title="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="X / Twitter"
              title="X / Twitter"
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Instagram"
              title="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${(siteContent?.contactPhone || '917092802364').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.11-.23-.17-.48-.29z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.linkList}>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('home')}
                className={styles.linkBtn}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className={styles.linkBtn}
              >
                About Us
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Services &amp; Solutions
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('work')}
                className={styles.linkBtn}
              >
                Featured Work
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('process')}
                className={styles.linkBtn}
              >
                Roadmap &amp; Process
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('standards')}
                className={styles.linkBtn}
              >
                Quality Standards
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('careers')}
                className={styles.linkBtn}
              >
                Careers
                <span className={styles.hiringBadge}>Hiring</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('faq')}
                className={styles.linkBtn}
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className={styles.linkBtn}
              >
                Contact &amp; Consult
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Capabilities */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Capabilities</h4>
          <ul className={styles.linkList}>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Custom Web Applications
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                SaaS Product Engineering
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Full-Stack Next.js &amp; React
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                UI/UX Design Systems
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Cloud APIs &amp; Architecture
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Industrial AI &amp; IoT Solutions
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Core Web Vitals &amp; Speed
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Details & Connect */}
        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Get in Touch</h4>

          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <div className={styles.contactIconBox} aria-hidden="true">
                <MapPin size={16} />
              </div>
              <div className={styles.contactDetail}>
                <span className={styles.contactLabel}>Headquarters</span>
                <span className={styles.contactValue}>
                  {siteContent?.contactLocation || 'Coimbatore, Tamil Nadu, India'}
                </span>
                <span className={styles.contactSubtext}>Gandhipuram / Peelamedu Tech Corridor</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIconBox} aria-hidden="true">
                <Mail size={16} />
              </div>
              <div className={styles.contactDetail}>
                <span className={styles.contactLabel}>Email Us</span>
                <a
                  href={`mailto:${siteContent?.contactEmail || 'contact@decodeinfotech.in'}`}
                  className={styles.contactValue}
                >
                  {siteContent?.contactEmail || 'contact@decodeinfotech.in'}
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIconBox} aria-hidden="true">
                <Phone size={16} />
              </div>
              <div className={styles.contactDetail}>
                <span className={styles.contactLabel}>Direct Line</span>
                <a
                  href={`tel:${(siteContent?.contactPhone || '+91 7092802364').replace(/[^0-9+]/g, '')}`}
                  className={styles.contactValue}
                >
                  {siteContent?.contactPhone || '+91 7092802364'}
                </a>
                <span className={styles.contactSubtext}>Mon – Sat, 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className={styles.actionBox}>
            <p className={styles.actionBoxTitle}>Have an urgent requirement?</p>
            <p className={styles.actionBoxText}>
              Share your project specifications and receive an estimated timeline and tech proposal.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className={styles.actionBoxBtn}
            >
              <span>Request Consultation</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Attribution Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>
            &copy; {new Date().getFullYear()} {siteContent?.agencyName || 'DeCode InfoTech'}. All
            rights reserved.
          </p>

          <div className={styles.locationPill}>
            <Globe size={13} aria-hidden="true" />
            <span>Coimbatore, India • IST (UTC+5:30) • Worldwide Delivery</span>
          </div>

          <div className={styles.bottomRight}>
            <div className={styles.legalLinks}>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className={styles.legalLink}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                Privacy
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className={styles.legalLink}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                Terms
              </button>
              <a href="/SA" className={styles.legalLink}>
                Studio Admin
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className={styles.backToTopBtn}
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={13} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
