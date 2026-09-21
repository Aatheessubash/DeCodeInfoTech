'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useData } from '@/context/useData';
import styles from './Footer.module.css';

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

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className={styles.logoLink}
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
          <p className={styles.tagline}>
            {siteContent?.heroEyebrow || 'WHERE VISION BECOMES REALITY'}
          </p>
          <p className={styles.desc}>
            {siteContent?.agencyName || 'DeCode'} is a modern software studio that designs, builds,
            and launches fast, scalable websites and custom web applications.
          </p>
        </div>

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
                onClick={() => scrollToSection('standards')}
                className={styles.linkBtn}
              >
                Quality Standards
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Services
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('work')}
                className={styles.linkBtn}
              >
                Portfolio &amp; Work
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('careers')}
                className={styles.linkBtn}
              >
                Careers &amp; Jobs
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
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Capabilities</h4>
          <ul className={styles.linkList}>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Software & Technology Solutions
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Website Development
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Custom Web App &amp; SaaS Solutions
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Full-Stack React &amp; Next.js
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('process')}
                className={styles.linkBtn}
              >
                Development Roadmap
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={styles.linkBtn}
              >
                Speed &amp; Local SEO Optimization
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Get in Touch</h4>
          <p className={styles.contactText}>
            {siteContent?.contactLocation || 'Coimbatore, Tamil Nadu, India'}
          </p>
          <p className={styles.contactText}>
            {siteContent?.contactEmail || 'contact@decodeinfotech.in'}
          </p>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="btn-primary"
            style={{ marginTop: '14px', cursor: 'pointer' }}
          >
            Start A Project
          </button>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>
            © {new Date().getFullYear()} {siteContent?.agencyName || 'DeCode InfoTech'}. All rights
            reserved.
          </p>
          <p className={styles.tag}>
            {siteContent?.heroEyebrow || 'INNOVATION & TECHNOLOGY SOLUTIONS'}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
