import React from 'react';
import { ParticleBackground } from './components/shared/ParticleBackground';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Services } from './components/Services/Services';
import { Portfolio } from './components/Portfolio/Portfolio';
import { Process } from './components/Process/Process';
import { Technology } from './components/Technology/Technology';
import { PromiseSection } from './components/Promise/Promise';
import { Testimonial } from './components/Testimonial/Testimonial';
import { Results } from './components/Results/Results';
import { FAQ } from './components/FAQ/FAQ';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { AdminDashboard } from './components/Admin/AdminDashboard';

export default function App() {
  return (
    <div className="app-root">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Technology />
        <PromiseSection />
        <Testimonial />
        <Results />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <AdminDashboard />
    </div>
  );
}
