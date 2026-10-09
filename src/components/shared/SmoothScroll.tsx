'use client';

import { useEffect } from 'react';

export function SmoothScroll() {
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
  }, []);

  return null;
}

export default SmoothScroll;
