import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatToExpect from "./components/WhatToExpect";
import SpeechTherapy from "./components/ServicePages/SpeechTherapy";
import EarlyIntervention from "./components/ServicePages/EarlyIntervention";
import AutismDiagnostic from "./components/ServicePages/AutismDiagnostic";
import ABATherapy from "./components/ServicePages/ABATherapy";
// import VoteBanner from "./components/VoteBanner";
import ScrollToTop from "./components/ScrollToTop";
import { Helmet } from "react-helmet-async";

// Skip to main content link for keyboard navigation
const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: #cd1b1b;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  z-index: 10000;
  border-radius: 0 0 4px 0;
  
  &:focus {
    top: 0;
  }
`;

const Home = () => (
  <main id="main-content">
    <section id="home" aria-label="Welcome to Mommy Angels Autism Center">
      <Hero />
    </section>
    <section id="about" aria-label="About our center">
      <About />
    </section>
    <section id="services" aria-label="Our services">
      <Services />
    </section>
    <section id="contact" aria-label="Contact us">
      <Contact />
    </section>
  </main>
);

const App = () => {
  return (
    <>
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>
      <Helmet>
        <title>Mommy Angels Autism Center ABA Therapy Services in Georgia | Home</title>
        <meta name="description" content="Expert ABA therapy services for children in Georgia. Contact us today for a personalized intake." />
        <meta name="keywords" content="ABA therapy, autism, behavioral therapy, Georgia, child development" />
        <link rel="canonical" href="https://mommyangelsspecialtycare.com/" />
        <meta property="og:title" content="Your ABA Therapy Services in Georgia" />
        <meta property="og:description" content="Supporting children and families with compassionate, evidence-based ABA therapy." />
        <meta property="og:image" content="https://yourdomain.com/social-preview.jpg" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollToTop />
      <Navbar />
      {/* <VoteBanner /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aba" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/what-to-expect" element={<WhatToExpect />} />
        <Route path="/services/speech-therapy" element={<SpeechTherapy />} />
        <Route path="/services/early-intervention" element={<EarlyIntervention />} />
        <Route path="/services/autism-diagnostic" element={<AutismDiagnostic />} />
        <Route path="/services/aba-therapy" element={<ABATherapy />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;