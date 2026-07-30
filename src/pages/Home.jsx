import React, { useEffect } from 'react';
import { Hero } from '../components/Hero/Hero';
import { Services } from '../components/Services/Services';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Testimonial } from '../components/Testimonial/Testimonial';
import { Contact } from '../components/Contact/Contact';

export function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Testimonial />
      <Contact />
    </>
  );
}
