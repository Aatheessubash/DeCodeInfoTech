'use client';

import React, { useEffect, useRef } from 'react';
import gsap from '@/lib/gsap';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 960px)').matches) return;
    const glow = glowRef.current;
    if (!glow) return;

    const xTo = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - 200);
      yTo(e.clientY - 200);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 will-change-transform hidden md:block"
      style={{
        background: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.08) 0%, rgba(124, 58, 237, 0.02) 40%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}

export default CursorGlow;
