import React, { useEffect } from 'react';
import { PromiseSection } from '../components/Promise/Promise';
import { Testimonial } from '../components/Testimonial/Testimonial';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      <PromiseSection />
      <Testimonial />
    </div>
  );
}
