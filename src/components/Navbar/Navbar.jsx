import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <a href="#home" className={styles.logoLink}>
          <img
            src="/DeCode_Logo.png"
            alt="DeCode Logo"
            className={styles.logoImg}
          />
        </a>

        {/* Visible Desktop Navigation Buttons */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.navBtn}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <a href="#contact" className="btn-primary">
            Start a Project
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary"
              onClick={() => setMobileMenuOpen(false)}
              style={{ marginTop: '1rem', width: '100%', textCenter: 'center' }}
            >
              Start a Project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
