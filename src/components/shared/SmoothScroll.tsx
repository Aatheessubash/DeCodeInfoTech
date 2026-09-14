'use client';

import { useEffect } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';

export function SmoothScroll() {
  useEffect(() => {
    // Reveal all elements with .gsap-reveal or .reveal classes using ScrollTrigger
    const elements = document.querySelectorAll('.reveal, .gsap-reveal');

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}

export default SmoothScroll;
