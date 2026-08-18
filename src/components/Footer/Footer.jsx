import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/useData';
import styles from './Footer.module.css';

export function Footer() {
  const { siteContent } = useData();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <Link to="/" className={styles.logoLink}>
            <img src="/DeCode_Logo.png" alt="DeCode Logo" className={styles.logoImg} />
          </Link>
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/work">Work</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers & Jobs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Capabilities</h4>
          <ul className={styles.linkList}>
            <li><Link to="/services">Web App Development</Link></li>
            <li><Link to="/services">Full-Stack React & Node</Link></li>
            <li><Link to="/services">SaaS Platform Design</Link></li>
            <li><Link to="/services">Website Redesign</Link></li>
            <li><Link to="/services">Speed & SEO Audit</Link></li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Get in Touch</h4>
          <p className={styles.contactText}>{siteContent?.contactLocation || 'Tamil Nadu, India'}</p>
          <p className={styles.contactText}>{siteContent?.contactEmail || 'hello@decode.com'}</p>
          <Link to="/contact" className="btn-primary" style={{ marginTop: '12px' }}>
            Start a Project
          </Link>
          <Link
            to="/admin"
            className="btn-secondary"
            style={{ marginTop: '10px', fontSize: '0.8rem', padding: '8px 16px' }}
          >
            ⚙ Admin Portal
          </Link>
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
