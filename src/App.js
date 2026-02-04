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
import ScrollToTop from "./components/ScrollToTop";
import { Helmet } from "react-helmet-async";

// Admin Pages
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import Registrations from "./pages/Admin/Registrations";
import IntakeReviews from "./pages/Admin/IntakeReviews";
import ProtectedRoute from "./components/shared/ProtectedRoute";

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
        <meta property="og:title" content="Your ABA Therapy Services in Georgia" />
        <meta property="og:description" content="Supporting children and families with compassionate, evidence-based ABA therapy." />
        <meta property="og:image" content="https://yourdomain.com/social-preview.jpg" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollToTop />
      
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/aba" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/what-to-expect" element={
          <>
            <Navbar />
            <WhatToExpect />
            <Footer />
          </>
        } />
        <Route path="/services/speech-therapy" element={
          <>
            <Navbar />
            <SpeechTherapy />
            <Footer />
          </>
        } />
        <Route path="/services/early-intervention" element={
          <>
            <Navbar />
            <EarlyIntervention />
            <Footer />
          </>
        } />
        <Route path="/services/autism-diagnostic" element={
          <>
            <Navbar />
            <AutismDiagnostic />
            <Footer />
          </>
        } />
        <Route path="/services/aba-therapy" element={
          <>
            <Navbar />
            <ABATherapy />
            <Footer />
          </>
        } />
        
        {/* Admin Routes - No Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/registrations" element={
          <ProtectedRoute>
            <Registrations />
          </ProtectedRoute>
        } />
        <Route path="/admin/intake-reviews" element={
          <ProtectedRoute>
            <IntakeReviews />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default App;
