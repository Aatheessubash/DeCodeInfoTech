import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = { threshold: 0.15, rootMargin: '0px' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, unobserve so animation stays triggered
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}
