import { useState, useRef, useCallback } from 'react';

export function useCarousel(totalSlides) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  const prev = useCallback(() => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? totalSlides - 1 : prevIdx - 1));
  }, [totalSlides]);

  const next = useCallback(() => {
    setCurrentIndex((prevIdx) => (prevIdx === totalSlides - 1 ? 0 : prevIdx + 1));
  }, [totalSlides]);

  const goTo = useCallback((index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
    }
  }, [totalSlides]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartX.current = null;
  };

  return {
    currentIndex,
    prev,
    next,
    goTo,
    handleTouchStart,
    handleTouchEnd
  };
}
