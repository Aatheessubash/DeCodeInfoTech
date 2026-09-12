import { useEffect } from 'react';

export function MotionEffects() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const seen = new WeakSet();
    const animations = new Set();
    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (preference.matches || !target.animate) return;
        const animation = target.animate([
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], {
          duration: 650,
          delay: Math.min(stagger++ * 65, 260),
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'backwards',
        });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.08 });
    const scan = () => {
      document.querySelectorAll('[data-motion]').forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    };
    const stop = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    scan();
    const changes = new MutationObserver(scan);
    changes.observe(document.querySelector('main'), { childList: true, subtree: true });
    preference.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      changes.disconnect();
      preference.removeEventListener('change', stop);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  return null;
}
