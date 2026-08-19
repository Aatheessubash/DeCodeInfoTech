import React from 'react';
import { PromiseSection } from '../components/Promise/Promise';
import { BusinessTypes } from '../components/BusinessTypes/BusinessTypes';
import { Testimonial } from '../components/Testimonial/Testimonial';

export function AboutPage() {
  return (
    <div style={{ paddingTop: '88px' }}>
      <PromiseSection />
      <BusinessTypes />
      <Testimonial />
    </div>
  );
}
