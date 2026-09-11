import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../../context/useData';
import styles from './Footer.module.css';

export function Footer() {
  const { siteContent } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
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
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
          >
            <img src="/DeCode_Logo.png" alt="DeCode Logo" className={styles.logoImg} />
          </button>
          <p className={styles.tagline}>
            {siteContent?.heroEyebrow || 'WHERE VISION BECOMES REALITY'}
          </p>
          <p className={styles.desc}>
            {siteContent?.agencyName || 'DeCode'} is a modern software studio that designs, builds, and launches fast, scalable websites and custom web applications.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.linkList}>
            <li>
              <button type="button" onClick={() => scrollToSection('home')} className={styles.linkBtn}>
                Home
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('about')} className={styles.linkBtn}>
                About Us
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('standards')} className={styles.linkBtn}>
                Quality Standards
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('services')} className={styles.linkBtn}>
                Services
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('work')} className={styles.linkBtn}>
                Portfolio &amp; Work
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('careers')} className={styles.linkBtn}>
                Careers &amp; Jobs
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('faq')} className={styles.linkBtn}>
                FAQ
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('contact')} className={styles.linkBtn}>
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Capabilities</h4>
          <ul className={styles.linkList}>
            <li>
              <button type="button" onClick={() => scrollToSection('services')} className={styles.linkBtn}>
                Web App Development
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('technology')} className={styles.linkBtn}>
                Full-Stack React &amp; Node
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('services')} className={styles.linkBtn}>
                SaaS Platform Design
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('process')} className={styles.linkBtn}>
                Development Roadmap
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('services')} className={styles.linkBtn}>
                Speed &amp; SEO Optimization
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Get in Touch</h4>
          <p className={styles.contactText}>{siteContent?.contactLocation || 'Tamil Nadu, India'}</p>
          <p className={styles.contactText}>{siteContent?.contactEmail || 'contact@decodeinfotech.com'}</p>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="btn-primary"
            style={{ marginTop: '14px', cursor: 'pointer' }}
          >
            Start a Project
          </button>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© {new Date().getFullYear()} {siteContent?.agencyName || 'DeCode Studio'}. All rights reserved.</p>
          <p className={styles.tag}>{siteContent?.heroEyebrow || 'WHERE VISION BECOMES REALITY'}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
