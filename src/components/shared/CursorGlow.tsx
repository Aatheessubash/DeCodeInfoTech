'use client';

import React, { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 960px)').matches) return;
    const glow = glowRef.current;
    if (!glow) return;

    let animationFrame = 0;
    let x = 0;
    let y = 0;

    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX - 200;
      y = e.clientY - 200;

      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        animationFrame = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 will-change-transform hidden md:block"
      style={{
        background:
          'radial-gradient(circle at center, rgba(124, 58, 237, 0.08) 0%, rgba(124, 58, 237, 0.02) 40%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}

export default CursorGlow;
