import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

const navClassName = ({ isActive }) => `${styles.navBtn} ${isActive ? styles.activeNav : ''}`;

export function Navbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [capabilitiesDropdownOpen, setCapabilitiesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCompanyDropdownOpen(false);
    setCapabilitiesDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeOnFocusLeave = (setter) => (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setter(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink} aria-label="DeCode home">
          <img
            src="/DeCode_Logo.png"
            alt="DeCode Infotech"
            className={styles.logoImg}
            width="707"
            height="353"
            decoding="async"
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <NavLink to="/" className={navClassName}>
            Home
          </NavLink>

          <div
            className={styles.dropdownGroup}
            onMouseEnter={() => setCompanyDropdownOpen(true)}
            onMouseLeave={() => setCompanyDropdownOpen(false)}
            onBlur={closeOnFocusLeave(setCompanyDropdownOpen)}
          >
            <button
              type="button"
              className={`${styles.navBtn} ${pathname === '/about' || pathname === '/careers' ? styles.activeNav : ''}`}
              onClick={() => setCompanyDropdownOpen((open) => !open)}
              aria-expanded={companyDropdownOpen}
              aria-controls="company-menu"
            >
              About
              <ChevronDown className={`${styles.chevron} ${companyDropdownOpen ? styles.chevronOpen : ''}`} aria-hidden="true" />
            </button>
            <div id="company-menu" className={`${styles.dropdownMenu} ${companyDropdownOpen ? styles.open : ''}`}>
              <Link to="/about" className={styles.dropdownItem}>About Us</Link>
              <Link to="/careers" className={styles.dropdownItem}>Careers</Link>
              <Link to="/about" className={styles.dropdownItem}>Our Quality Promise</Link>
            </div>
          </div>

          <div
            className={styles.dropdownGroup}
            onMouseEnter={() => setCapabilitiesDropdownOpen(true)}
            onMouseLeave={() => setCapabilitiesDropdownOpen(false)}
            onBlur={closeOnFocusLeave(setCapabilitiesDropdownOpen)}
          >
            <button
              type="button"
              className={`${styles.navBtn} ${pathname === '/services' ? styles.activeNav : ''}`}
              onClick={() => setCapabilitiesDropdownOpen((open) => !open)}
              aria-expanded={capabilitiesDropdownOpen}
              aria-controls="capabilities-menu"
            >
              Services
              <ChevronDown className={`${styles.chevron} ${capabilitiesDropdownOpen ? styles.chevronOpen : ''}`} aria-hidden="true" />
            </button>
            <div id="capabilities-menu" className={`${styles.dropdownMenu} ${capabilitiesDropdownOpen ? styles.open : ''}`}>
              <Link to="/services" className={styles.dropdownItem}>All Services</Link>
              <Link to="/services" className={styles.dropdownItem}>Development Process</Link>
            </div>
          </div>

          <NavLink to="/work" className={navClassName}>Portfolio</NavLink>
          <NavLink to="/careers" className={navClassName}>Careers</NavLink>
          <NavLink to="/contact" className={navClassName}>Contact</NavLink>
        </nav>

        <div className={styles.actions}>
          <Link to="/contact" className={styles.actionBtn}>
            Get Started
          </Link>

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

      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation">
            <NavLink to="/" className={styles.mobileLink}>Home</NavLink>
            <NavLink to="/about" className={styles.mobileLink}>About</NavLink>
            <NavLink to="/services" className={styles.mobileLink}>Services</NavLink>
            <NavLink to="/work" className={styles.mobileLink}>Portfolio</NavLink>
            <NavLink to="/careers" className={styles.mobileLink}>Careers</NavLink>
            <NavLink to="/contact" className={styles.mobileLink}>Contact</NavLink>
            <Link to="/contact" className={styles.actionBtn}>
              Get Started <ArrowRight className="w-4 h-4 inline ml-1" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
