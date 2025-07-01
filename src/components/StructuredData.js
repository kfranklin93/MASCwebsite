import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Mommy Angel's Specialty Care and Autism Center",
    "image": "https://mommyangelsspecialtycare.com/images/hero-image.jpg",
    "description": "Leading ABA therapy and autism center in Dunwoody, GA, offering comprehensive behavioral therapy, speech therapy, occupational therapy, and Pre-K readiness programs for children with autism spectrum disorders.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dunwoody",
      "addressLocality": "Dunwoody",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "telephone": "(678) 353-6829",
    "url": "https://mommyangelsspecialtycare.com",
    "openingHours": "Mo-Fr 08:00-18:00",
    "priceRange": "$$",
    "medicalSpecialty": ["Applied Behavior Analysis", "Autism Therapy", "Speech Therapy", "Occupational Therapy"],
    "availableService": [
      {
        "@type": "MedicalTherapy",
        "name": "ABA Therapy",
        "description": "Applied Behavior Analysis therapy for children with autism"
      },
      {
        "@type": "MedicalTherapy", 
        "name": "Speech Therapy",
        "description": "Speech and language therapy for developmental delays"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Occupational Therapy", 
        "description": "Occupational therapy for sensory and motor skills"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Pre-K Readiness Program",
        "description": "Preparation program for traditional Pre-K classroom transition"
      }
    ],
    "areaServed": ["Dunwoody", "Atlanta", "Sandy Springs", "Roswell", "Alpharetta", "Johns Creek", "Brookhaven"],
    "sameAs": [
      "https://www.facebook.com/mommyangelsspecialtycare",
      "https://www.instagram.com/mommyangelsspecialtycare"
    ]
  };

  const faqData = {
    "@context": "https://schema.org", 
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is ABA therapy and how does it help children with autism?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Applied Behavior Analysis (ABA) therapy is an evidence-based treatment that helps children with autism develop essential skills, improve behavior, and achieve their full potential through positive reinforcement and individualized treatment plans."
        }
      },
      {
        "@type": "Question", 
        "name": "Where is Mommy Angel's Specialty Care located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We are located in Dunwoody, Georgia, serving families throughout the Atlanta metro area including Sandy Springs, Roswell, Alpharetta, and surrounding communities."
        }
      },
      {
        "@type": "Question",
        "name": "Do you accept insurance for ABA therapy services?", 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work with various insurance providers to make our ABA therapy and autism services accessible. Contact us at (678) 353-6829 to discuss insurance coverage and payment options."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(businessData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;