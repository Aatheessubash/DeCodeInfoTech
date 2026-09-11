import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        width: '46px',
        height: '46px',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
        color: '#7C3AED',
        border: '1.5px solid rgba(124, 58, 237, 0.25)',
        boxShadow: '0 8px 24px rgba(18, 14, 44, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 99,
        transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.backgroundColor = '#7C3AED';
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(124, 58, 237, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.backgroundColor = '#FFFFFF';
        e.currentTarget.style.color = '#7C3AED';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(18, 14, 44, 0.12)';
      }}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}

export default ScrollToTop;

