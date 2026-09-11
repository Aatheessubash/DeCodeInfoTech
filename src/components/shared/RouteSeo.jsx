import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Section aliases redirect to the homepage. Admin and unknown routes must
// not be indexed as duplicate copies of the public site's metadata.
export function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]');
    const original = robots?.getAttribute('content');
    robots?.setAttribute('content', pathname === '/'
      ? 'index, follow, max-image-preview:large'
      : 'noindex, follow');
    return () => {
      if (original) robots?.setAttribute('content', original);
    };
  }, [pathname]);

  return null;
}
