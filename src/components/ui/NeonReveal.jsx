import React from 'react';
import { cn } from '@/lib/utils';

export function NeonReveal({ children, className, containerClassName }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden group rounded-xl",
        containerClassName
      )}
    >
      <div className={cn("relative z-10", className)}>
        {children}
      </div>

      {/* Neon Bar Sweeping Effect */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transform -translate-x-full group-hover:animate-[neonSweep_1.5s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), rgba(56, 189, 248, 0.8), transparent)',
          width: '50%',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
}
