import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            fontFamily: 'var(--font-family, sans-serif)',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              padding: '36px 28px',
              borderRadius: '20px',
              background: '#FFFFFF',
              boxShadow: '0 20px 50px rgba(18, 14, 44, 0.08)',
              border: '1px solid rgba(124, 58, 237, 0.15)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#F3E8FF',
                color: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                fontSize: '1.6rem',
                fontWeight: 'bold',
              }}
            >
              !
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '10px', color: '#110D2E' }}>
              Something went unexpected
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              We encountered a minor hiccup while loading this view. You can reload the page or return to our homepage.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-primary"
                style={{ padding: '10px 22px' }}
              >
                Reload Page
              </button>
              <a
                href="/"
                className="btn-secondary"
                style={{ padding: '10px 22px' }}
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

