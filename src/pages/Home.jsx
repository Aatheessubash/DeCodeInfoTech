import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { WhoWeAre } from '../components/WhoWeAre/WhoWeAre';
import { PromiseSection } from '../components/Promise/Promise';
import { Services } from '../components/Services/Services';
import { Technology } from '../components/Technology/Technology';
import { Process } from '../components/Process/Process';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { BusinessTypes } from '../components/BusinessTypes/BusinessTypes';
import { Results } from '../components/Results/Results';
import { Testimonial } from '../components/Testimonial/Testimonial';
import { Team } from '../components/Team/Team';
import { Careers } from '../components/Careers/Careers';
import { FAQ } from '../components/FAQ/FAQ';
import { Contact } from '../components/Contact/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <PromiseSection />
      <Services />
      <Technology />
      <Process />
      <Portfolio />
      <BusinessTypes />
      <Results />
      <Testimonial />
      <Team />
      <Careers />
      <FAQ />
      <Contact />
    </>
  );
}

export default Home;
