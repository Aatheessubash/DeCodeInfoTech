import React from 'react';
import { useData } from '../../context/DataContext';
import styles from './Footer.module.css';

export function Footer() {
  const { setIsAdminOpen, siteContent } = useData();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <a href="#home" className={styles.logoLink}>
            <img src="/DeCode_Logo.png" alt="DeCode Logo" className={styles.logoImg} />
          </a>
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
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Capabilities</h4>
          <ul className={styles.linkList}>
            <li><a href="#services">Web App Development</a></li>
            <li><a href="#services">Full-Stack React & Node</a></li>
            <li><a href="#services">SaaS Platform Design</a></li>
            <li><a href="#services">Website Redesign</a></li>
            <li><a href="#services">Speed & SEO Audit</a></li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Get in Touch</h4>
          <p className={styles.contactText}>{siteContent?.contactLocation || 'Tamil Nadu, India'}</p>
          <p className={styles.contactText}>{siteContent?.contactEmail || 'hello@decode.com'}</p>
          <a href="#contact" className="btn-primary" style={{ marginTop: '12px' }}>
            Start a Project
          </a>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="btn-secondary"
            style={{ marginTop: '10px', fontSize: '0.8rem', padding: '8px 16px' }}
          >
            ⚙ Admin Portal
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
