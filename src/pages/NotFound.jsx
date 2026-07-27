import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '160px 24px 120px 24px', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
      <div className="pill-badge" style={{ marginBottom: '1rem' }}>
        <span className="badge-dot"></span>
        404 — Page Not Found
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
        Oops! Page Doesn't Exist
      </h1>
      <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/" className="btn-primary">
          Back to Homepage
        </Link>
        <Link to="/contact" className="btn-secondary">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
