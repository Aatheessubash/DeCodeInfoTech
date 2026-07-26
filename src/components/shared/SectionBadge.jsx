import React from 'react';

export function SectionBadge({ children }) {
  return (
    <div className="pill-badge">
      <span className="badge-dot"></span>
      <span>{children}</span>
    </div>
  );
}
