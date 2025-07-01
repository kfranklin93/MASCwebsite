import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ABATherapy from './components/ABATherapy';
import Insurance from './components/Insurance';
import WhatToExpect from './components/WhatToExpect';
import Footer from './components/Footer';
import Contact from './components/Contact';
import HiringBanner from './components/HiringBanner';
import NoWaitlistBadge from './components/NoWaitlistBadge';
import HiringBadge from './components/HiringBadge';
import VoteBanner from './components/VoteBanner';

// Import Service Pages
import SpeechTherapy from './components/ServicePages/SpeechTherapy';
import EarlyIntervention from './components/ServicePages/EarlyIntervention';
import AutismDiagnostic from './components/ServicePages/AutismDiagnostic';
import ABATherapyPage from './components/ServicePages/ABATherapy';

const HomePage = () => (
  <>
    <Hero />
    <HiringBanner />
    <About />
    <NoWaitlistBadge />
    <Services />
    <HiringBadge />
    <Insurance />
    <VoteBanner />
  </>
);

function App() {
  return (
    <HelmetProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/aba-therapy" element={<ABATherapy />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/what-to-expect" element={<WhatToExpect />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/speech-therapy" element={<SpeechTherapy />} />
        <Route path="/early-intervention" element={<EarlyIntervention />} />
        <Route path="/autism-diagnostic" element={<AutismDiagnostic />} />
        <Route path="/aba-therapy-page" element={<ABATherapyPage />} />
      </Routes>
      <Footer />
    </HelmetProvider>
  );
}

export default App;