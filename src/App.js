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

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

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
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/aba" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/what-to-expect" element={<PublicLayout><WhatToExpect /></PublicLayout>} />
        <Route path="/services/speech-therapy" element={<PublicLayout><SpeechTherapy /></PublicLayout>} />
        <Route path="/services/early-intervention" element={<PublicLayout><EarlyIntervention /></PublicLayout>} />
        <Route path="/services/autism-diagnostic" element={<PublicLayout><AutismDiagnostic /></PublicLayout>} />
        <Route path="/services/aba-therapy" element={<PublicLayout><ABATherapy /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/registrations" element={<ProtectedRoute><Registrations /></ProtectedRoute>} />
        <Route path="/admin/intake-reviews" element={<ProtectedRoute><IntakeReviews /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;