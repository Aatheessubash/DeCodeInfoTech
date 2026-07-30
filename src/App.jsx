import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';
import { NotFound } from './pages/NotFound';
import Antigravity from './components/Antigravity';
//import App.css



export default function App() {
  return (
    <div className="box">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Antigravity
          count={80}
          magnetRadius={14}
          ringRadius={1}
          waveSpeed={1.2}
          waveAmplitude={3.9}
          particleSize={1.5}
          lerpSpeed={0.01}
          color="#3874FF"
          autoAnimate={false}
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>
    <BrowserRouter>
      <div className="app-root">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <AdminDashboard />
      </div>
    </BrowserRouter>
    </div>
  );
}
