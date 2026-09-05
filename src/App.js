import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import StructuredData from "./components/StructuredData";
import { Helmet } from "react-helmet-async";

// Navbar / Hero / About / Services / Footer stay eager: they are all part of
// the landing page, so deferring them would only add a round trip.
// Everything below is only reachable by navigation, so it ships as its own chunk.
const Contact = lazy(() => import("./components/Contact"));
const WhatToExpect = lazy(() => import("./components/WhatToExpect"));
const SpeechTherapy = lazy(() => import("./components/ServicePages/SpeechTherapy"));
const EarlyIntervention = lazy(() => import("./components/ServicePages/EarlyIntervention"));
const AutismDiagnostic = lazy(() => import("./components/ServicePages/AutismDiagnostic"));
const ABATherapy = lazy(() => import("./components/ServicePages/ABATherapy"));
const NotFound = lazy(() => import("./components/NotFound"));

// Visually hidden until focused, so keyboard users can jump past the nav.
const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 2000;
  padding: 0.75rem 1.25rem;
  background: #ffffff;
  color: #1c5f8a;
  font-weight: 700;
  text-decoration: none;
  border: 3px solid #1c5f8a;
  border-radius: 0 0 8px 0;

  &:focus {
    left: 0;
  }
`;

// Reserves vertical space so swapping in the real page does not shift layout.
const RouteFallback = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00695c;
  font-size: 1.1rem;
`;

// Shorter boundary for a single section inside an already-rendered page.
const SectionFallback = styled(RouteFallback)`
  min-height: 40vh;
`;

const Loading = ({ as: As = RouteFallback, label = "Loading page" }) => (
  <As role="status" aria-live="polite">
    {label}&hellip;
  </As>
);

const Home = () => (
  <>
    <section id="home"><Hero /></section>
    <section id="about"><About /></section>
    <section id="services"><Services /></section>
    {/* Contact is lazy, so it gets its own boundary. Without this the outer
        boundary would suspend the whole landing page while its chunk loads. */}
    <section id="contact">
      <Suspense fallback={<Loading as={SectionFallback} label="Loading contact form" />}>
        <Contact />
      </Suspense>
    </section>
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

      <StructuredData />

      <SkipLink href="#main-content">Skip to main content</SkipLink>

      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default App;
