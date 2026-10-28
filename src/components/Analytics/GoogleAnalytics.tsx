'use client';

import Script from 'next/script';

const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-WXDPZ9GG33';

export function GoogleAnalytics() {
  const isDev = process.env.NODE_ENV !== 'production';
  const allowInDev = process.env.NEXT_PUBLIC_GA_DEV === 'true';

  // Do not track on localhost/development to avoid ad-blocker ERR_BLOCKED_BY_CLIENT
  // and prevent polluting production GA4 analytics with dev traffic.
  if (!gaId || (isDev && !allowInDev)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
