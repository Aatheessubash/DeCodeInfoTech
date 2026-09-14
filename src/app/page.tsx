import React from 'react';
import { Hero } from '@/components/Hero/Hero';
import { WhoWeAre } from '@/components/WhoWeAre/WhoWeAre';
import { PromiseSection } from '@/components/Promise/Promise';
import { Services } from '@/components/Services/Services';
import { Process } from '@/components/Process/Process';
import { Portfolio } from '@/components/Portfolio/Portfolio';
import { BusinessTypes } from '@/components/BusinessTypes/BusinessTypes';
import { Testimonial } from '@/components/Testimonial/Testimonial';
import { Careers } from '@/components/Careers/Careers';
import { FAQ } from '@/components/FAQ/FAQ';
import { Contact } from '@/components/Contact/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <PromiseSection />
      <Services />
      <Process />
      <Portfolio />
      <BusinessTypes />
      <Testimonial />
      <Careers />
      <FAQ />
      <Contact />
    </>
  );
}
