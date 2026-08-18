import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver({ threshold = 0.15, rootMargin = '0px' } = {}) {
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
    }, { threshold, rootMargin });

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
