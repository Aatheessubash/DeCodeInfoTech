'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .gsap-reveal');
    if (elements.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    elements.forEach((el) => {
      el.classList.add('reveal-ready');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

export default SmoothScroll;
