import React from "react";
import { Routes, Route } from "react-router-dom";
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
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { Helmet } from "react-helmet-async";

const Home = () => (
  <>
    <section id="home"><Hero /></section>
    <section id="about"><About /></section>
    <section id="services"><Services /></section>
    <section id="contact"><Contact /></section>
  </>
);

const App = () => {
  return (
    <>
      <Helmet>
        <title>Mommy Angels Autism Center ABA Therapy Services in Georgia | Home</title>
        <meta name="description" content="Expert ABA therapy services for children in Georgia. Contact us today for a personalized intake." />
        <meta name="keywords" content="ABA therapy, autism, behavioral therapy, Georgia, child development" />
        <link rel="canonical" href="https://mommyangelsspecialtycare.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mommy Angels Specialty Care" />
        <meta property="og:title" content="ABA Therapy & Autism Services in Dunwoody, Georgia" />
        <meta property="og:description" content="Supporting children and families with compassionate, evidence-based ABA therapy." />
        <meta property="og:image" content="https://mommyangelsspecialtycare.com/social-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Mommy Angels Specialty Care" />
        <meta property="og:url" content="https://mommyangelsspecialtycare.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ABA Therapy & Autism Services in Dunwoody, Georgia" />
        <meta name="twitter:description" content="Supporting children and families with compassionate, evidence-based ABA therapy." />
        <meta name="twitter:image" content="https://mommyangelsspecialtycare.com/social-preview.png" />
        <meta name="twitter:image:alt" content="Mommy Angels Specialty Care" />
      </Helmet>

      <ScrollToTop />
      <Navbar />
      <main id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aba" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/what-to-expect" element={<WhatToExpect />} />
        <Route path="/services/speech-therapy" element={<SpeechTherapy />} />
        <Route path="/services/early-intervention" element={<EarlyIntervention />} />
        <Route path="/services/autism-diagnostic" element={<AutismDiagnostic />} />
        <Route path="/services/aba-therapy" element={<ABATherapy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;