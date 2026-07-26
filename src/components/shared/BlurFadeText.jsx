import React from 'react';

export function BlurFadeText({ children, className = '' }) {
  return (
    <span className={`blur-fade-text ${className}`}>
      {children}
    </span>
  );
}
