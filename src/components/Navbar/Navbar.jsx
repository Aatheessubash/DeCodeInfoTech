import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [capabilitiesDropdownOpen, setCapabilitiesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link to="/" className={styles.logoLink}>
          <img
            src="/DeCode_Logo.png"
            alt="DeCode Logo"
            className={styles.logoImg}
          />
        </Link>

        {/* Kovai.co Style Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <NavLink to="/" className={styles.navBtn}>
            Home
          </NavLink>

          {/* Company Dropdown ▾ */}
          <div
            className={styles.dropdownGroup}
            onMouseEnter={() => setCompanyDropdownOpen(true)}
            onMouseLeave={() => setCompanyDropdownOpen(false)}
          >
            <button className={styles.navBtn}>
              Company {companyDropdownOpen ? '▴' : '▾'}
            </button>
            <div className={`${styles.dropdownMenu} ${companyDropdownOpen ? styles.open : ''}`}>
              <Link to="/about" className={styles.dropdownItem} onClick={() => setCompanyDropdownOpen(false)}>
               About Us
              </Link>
              <Link to="/careers" className={styles.dropdownItem} onClick={() => setCompanyDropdownOpen(false)}>
                Careers
              </Link>
              <Link to="/about" className={styles.dropdownItem} onClick={() => setCompanyDropdownOpen(false)}>
               Our Quality Promise
              </Link>
              <Link to="/about" className={styles.dropdownItem} onClick={() => setCompanyDropdownOpen(false)}>
               Client Reviews
              </Link>
            </div>
          </div>

          {/* Capabilities Dropdown ▾ */}
          <div
            className={styles.dropdownGroup}
            onMouseEnter={() => setCapabilitiesDropdownOpen(true)}
            onMouseLeave={() => setCapabilitiesDropdownOpen(false)}
          >
            <button className={styles.navBtn}>
              Capabilities {capabilitiesDropdownOpen ? '▴' : '▾'}
            </button>
            <div className={`${styles.dropdownMenu} ${capabilitiesDropdownOpen ? styles.open : ''}`}>
              <Link to="/services" className={styles.dropdownItem} onClick={() => setCapabilitiesDropdownOpen(false)}>
               Services
              </Link>
              <Link to="/services" className={styles.dropdownItem} onClick={() => setCapabilitiesDropdownOpen(false)}>
              Tech Stack & DevOps
              </Link>
              <Link to="/services" className={styles.dropdownItem} onClick={() => setCapabilitiesDropdownOpen(false)}>
               Development Process
              </Link>
            </div>
          </div>

          <NavLink to="/work" className={styles.navBtn}>
            Work
          </NavLink>

          <NavLink to="/careers" className={styles.navBtn}>
            Careers
          </NavLink>

          <NavLink to="/contact" className={styles.navBtn}>
            Contact
          </NavLink>
        </nav>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link to="/contact" className={styles.actionBtn}>
            Start a Project
          </Link>

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
            <Link to="/" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/services" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
              Capabilities & Services
            </Link>
            <Link to="/work" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
              Selected Work
            </Link>
            <Link to="/about" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
              Company
            </Link>
            <Link to="/careers" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
              Careers
            </Link>
            <Link to="/contact" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <Link
              to="/contact"
              className={styles.actionBtn}
              onClick={() => setMobileMenuOpen(false)}
              style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}
            >
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
