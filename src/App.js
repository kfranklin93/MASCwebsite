import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet-async";
// import CTAButton from "./components/ui/ctabutton";

const App = () => {
  return (
    <>
    <Helmet>
    <title>Mommy Anels Specialty Care ABA Therapy Services in Georgia | Home</title>
    <meta name="description" content="Expert ABA therapy services for children in Georgia. Contact us today for a personalized intake." />
    <meta name="keywords" content="ABA therapy, autism, behavioral therapy, Georgia, child development" />
    <link rel="canonical" href="https://mommyangelsspecialtycare.com/" />
    
    {/* Social (Open Graph) Tags */}
    <meta property="og:title" content="Your ABA Therapy Services in Georgia" />
    <meta property="og:description" content="Supporting children and families with compassionate, evidence-based ABA therapy." />
    <meta property="og:image" content="https://yourdomain.com/social-preview.jpg" />
    <meta property="og:url" content="https://yourdomain.com/" />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
      <Navbar />
      
      {/* Assign IDs for smooth scrolling */}
      <section id="home">
        <Hero />
        {/* <CTAButton text="Schedule A Tour" to="/contact" /> Button inside Hero */}
      </section>
    <section id="about"><About/></section>
      <section id="services"><Services /></section>
      <section id="contact"><Contact /></section>
      {/* <section id="about"><About /></section> */}

      <Footer />
    </>
  );
};

export default App;
