import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import heroImage from "../assets/Mommy-Angles-Specialty-Care-32-x-78-in_20240715_133946_0000.png";
import backgroundImg from "../assets/Untitled-design-7-1-2.png";
import img1 from "../assets/Angel-1.png";
import img2 from "../assets/Angel-2.png";
import img3 from "../assets/Angel-3.png";
import bk1 from "../assets/IMG_7213.png";
import bk2 from "../assets/IMG_8886.png";
import rotatedpuzzleMask from "../assets/rotated-puzzle-mask.svg";
import rightsidepuzzleImage from "../assets/right side puzzle pieces Background Removed.png";
import leftsidepuzzleImage from "../assets/left side puzzle pieces Background Removed copy.png";

import { Helmet } from "react-helmet-async";
import CTAButton from "./ui/ctabutton";

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  min-height: 100dvh;
  width: 100%;
  padding: 2rem 1rem 6rem;
  margin-top: calc(60px + 1rem);
  border: 20px solid #4a90e2;
  border-radius: 5px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  background-color: rgba(255, 255, 255, 0.92);
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url(${backgroundImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @supports (backdrop-filter: blur(50px)) {
    backdrop-filter: blur(50px);
    background-color: rgba(255, 255, 255, 0.85);
  }

  /* iPad Pro Portrait and similar tall screens */
  @media (min-device-width: 1024px) and (max-device-height: 1366px) and (orientation: portrait) {
    background-size: contain;
    background-position: center top;
  }

  /* Floating Puzzle Background Shapes */
  &::before,
  &::after {
    content: "";
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    z-index: 1;
    pointer-events: none;
    opacity: 0.35;
    transition: all 0.5s ease-in-out;

    mask-repeat: no-repeat;
    mask-size: contain;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    -webkit-mask-position: center;
  }

  &::before {
    width: 45vw;
    height: 50vh;
    top: 5%;
    left: 2%;
    transform: rotate(15deg);
    background-image: url(${bk1});
    mask-image: url(${rotatedpuzzleMask});
    -webkit-mask-image: url(${rotatedpuzzleMask});
    // animation: floatBackground 8s ease-in-out infinite;
  }

  &::after {
    right: 5%;
    width: 30vw;
    bottom: -5%;
    height: 50vh;
    background-image: url(${bk2});
    mask-image: url(${rotatedpuzzleMask});
    -webkit-mask-image: url(${rotatedpuzzleMask});
    // animation: floatBackground 8s ease-in-out infinite reverse;
  }

  // @keyframes floatBackground {
  //   0%, 100% { transform: translateY(0) rotate(15deg); }
  //   50% { transform: translateY(-20px) rotate(18deg); }
  // }

  @media (max-width: 1024px) {
    &::before {
      width: 40vw;
      height: 40vh;
      top: 6%;
      left: 3%;
    }
  }

  @media (max-width: 768px) {
    background: linear-gradient(135deg, #ffffff, #eafaf1);
    border-width: 12px;
    padding: 4rem 1rem 8rem;

    &::before {
      width: 45vw;
      height: 30vh;
      opacity: 0.25;
    }

    &::after {
      width: 40vw;
      height: 30vh;
      opacity: 0.25;
    }
  }

  @media (max-width: 480px) {
    border-width: 8px;
    
    &::before,
    &::after {
      display: none;
    }
  }
`;

const FloatingImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  z-index: 3;
  margin: 2rem 0;
  position: relative;
  padding: 1rem;
`;

const FloatingImage = styled.img`
  width: clamp(90px, 22vw, 230px);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;
  border-radius: 20px;
  
  &:hover {
    transform: scale(1.08) rotate(2deg);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));
  }

  @keyframes float {
    0%, 100% { 
      transform: translateY(0) rotate(0deg);
    }
    33% { 
      transform: translateY(-15px) rotate(1deg);
    }
    66% { 
      transform: translateY(-8px) rotate(-1deg);
    }
  }

  animation: float 4s ease-in-out infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: -1.3s;
  }

  &:nth-child(3) {
    animation-delay: -2.6s;
  }
`;

const PuzzleDecorations = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
`;

const PuzzlePiece = styled.div`
  position: absolute;
  opacity: 0.15;
  animation: gentleFloat 8s ease-in-out infinite;
  
  &:nth-child(1) {
    top: 15%;
    left: 5%;
    animation-delay: 0s;
    font-size: 3rem;
    color: #FFD700;
  }
  
  &:nth-child(2) {
    top: 25%;
    right: 8%;
    animation-delay: -2s;
    font-size: 2.5rem;
    color: #4A90E2;
  }
  
  &:nth-child(3) {
    bottom: 20%;
    left: 12%;
    animation-delay: -4s;
    font-size: 2.8rem;
    color: #CD1B1B;
  }
  
  &:nth-child(4) {
    top: 35%;
    left: 85%;
    animation-delay: -6s;
    font-size: 2.2rem;
    color: #FFD700;
  }
  
  &:nth-child(5) {
    bottom: 35%;
    right: 15%;
    animation-delay: -1s;
    font-size: 2.6rem;
    color: #4A90E2;
  }

  @keyframes gentleFloat {
    0%, 100% { 
      transform: translateY(0) rotate(0deg);
    }
    25% { 
      transform: translateY(-10px) rotate(5deg);
    }
    50% { 
      transform: translateY(-15px) rotate(-3deg);
    }
    75% { 
      transform: translateY(-5px) rotate(2deg);
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;


const HeroImage = styled(motion.img)`
  width: clamp(300px, 60vw, 800px);
  height: auto;
  object-fit: contain;
  z-index: 1;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.1));
  margin: 1rem 0;
  
  @media (max-width: 768px) {
    width: 70vw;
  }

  @media (max-width: 480px) {
    width: 85vw;
  }
`;

const HeroTitlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  padding: 2rem 1rem;
  max-width: 90%;
  text-align: center;
  padding-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  color: rgb(220, 27, 27);
  font-family: "Bubblegum Sans";
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.3;
  margin-bottom: 0.5rem;
  position: relative;
  
  // &::before {
  //   content: '🌟';
  //   position: absolute;
  //   left: -2rem;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   animation: bounce 2s ease-in-out infinite;
  // }
  
  // &::after {
  //   content: '🌟';
  //   position: absolute;
  //   right: -2rem;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   animation: bounce 2s ease-in-out infinite reverse;
  // }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(-50%) scale(1); }
    50% { transform: translateY(-60%) scale(1.1); }
  }
  
  @media (max-width: 768px) {
    &::before, &::after {
      display: none;
    }
  }
`;

const HeroTitle2 = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4.2rem);
  color: rgb(220, 27, 27);
  font-family: "Bubblegum Sans";
  margin: 0.5rem 0;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #CD1B1B, #FF4444, #CD1B1B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  
  &::before {
    // content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(45deg, #FFD700, #FFA500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    z-index: -1;
    transform: translate(2px, 2px);
  }
  
  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const HeroTitle3 = styled.h2`
  font-size: 1.4rem;
  margin-top: 1rem;
  color: rgb(220, 27, 27);
  font-family: "Bubblegum Sans";
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #ff1a1a;
    transform: scale(1.05);
    text-shadow: 0 0 10px rgba(255, 26, 26, 0.5);
  }
  
  &::before {
    content: '📞';
    margin-right: 0.5rem;
  }
`;

const HeroTitle4 = styled.h2`
  font-size: 1.3rem;
  margin-top: 1rem;
  color: #333;
  font-family: "Bubblegum Sans";
  line-height: 1.4;
  position: relative;
  
  &::before {
    content: '📍';
    margin-right: 0.5rem;
  }
`;

// const WelcomeText = styled(motion.div)`
//   font-size: 1.2rem;
//   color: #4A90E2;
//   font-family: "Bubblegum Sans";
//   margin-bottom: 1rem;
//   text-align: center;
  
//   // &::before {
//   //   content: '🎈 ';
//   // }
  
//   // &::after {
//   //   content: ' 🎈';
//   // }
// `;

const MobilePuzzleBackgroundLeft = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 45vw;
  max-width: 200px;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
  object-fit: contain;
  // animation: rotateSlow 20s linear infinite;

  @media (min-width: 1367px) {
    display: none;
  }

//   @keyframes rotateSlow {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
// `;

const MobilePuzzleBackgroundRight = styled(MobilePuzzleBackgroundLeft)`
  bottom: 0;
  right: 0;
  left: auto;
  top: auto;
  // animation: rotateSlow 20s linear infinite reverse;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Hero = () => {
  return (
    <>
      <Helmet>
        <title>
          #1 ABA Therapy Dunwoody GA | Mommy Angel's Specialty Care | Autism Center & Pre-K Readiness
        </title>
        <link rel="canonical" href="https://mommyangelsspecialtycare.com" />
        
        {/* Enhanced Meta Description */}
        <meta
          name="description"
          content="Top-rated ABA therapy center in Dunwoody, GA. Expert autism support, speech therapy, occupational therapy & Pre-K readiness. BCBA certified. Call (678) 353-6829. Socialization, not isolation."
        />
        
        {/* Enhanced Keywords */}
        <meta
          name="keywords"
          content="ABA therapy Dunwoody, autism center Georgia, BCBA certified, special needs daycare Dunwoody, speech therapy toddlers Georgia, Pre-K readiness autism, early intervention Dunwoody, autism support Georgia, inclusive childcare, RBT therapy, autism therapy near me, applied behavior analysis, autism diagnostic services, occupational therapy autism, parent training ABA, center-based ABA therapy, autism spectrum disorder, developmental delays, behavioral therapy children"
        />
        
        {/* Location-based SEO */}
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Dunwoody" />
        <meta name="geo.position" content="33.9462;-84.3346" />
        <meta name="ICBM" content="33.9462, -84.3346" />
        
        {/* Business Info */}
        <meta name="author" content="Mommy Angel's Specialty Care" />
        <meta name="contact" content="(678) 353-6829" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Enhanced Open Graph */}
        <meta property="og:title" content="#1 ABA Therapy Center in Dunwoody GA | Mommy Angel's Specialty Care" />
        <meta property="og:description" content="Expert ABA therapy, autism support & Pre-K readiness in Dunwoody, GA. BCBA certified therapists. Socialization-focused approach. Call (678) 353-6829 today." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mommyangelsspecialtycare.com/images/hero-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Mommy Angel's Specialty Care ABA Therapy Center in Dunwoody Georgia" />
        <meta property="og:url" content="https://mommyangelsspecialtycare.com" />
        <meta property="og:site_name" content="Mommy Angel's Specialty Care" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="#1 ABA Therapy Dunwoody GA | Expert Autism Support Center" />
        <meta name="twitter:description" content="Top-rated ABA therapy & autism support in Dunwoody, GA. BCBA certified. Pre-K readiness programs. Call (678) 353-6829." />
        <meta name="twitter:image" content="https://mommyangelsspecialtycare.com/images/hero-image.jpg" />
        <meta name="twitter:image:alt" content="Mommy Angel's Specialty Care ABA Therapy Center" />
        
        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#CD1B1B" />
        <meta name="msapplication-TileColor" content="#CD1B1B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
      </Helmet>

      <HeroContainer>
        {/* <FloatingClouds /> */}
        
        <PuzzleDecorations>
          <PuzzlePiece>🧩</PuzzlePiece>
          <PuzzlePiece>🧩</PuzzlePiece>
          <PuzzlePiece>🧩</PuzzlePiece>
          <PuzzlePiece>🧩</PuzzlePiece>
          <PuzzlePiece>🧩</PuzzlePiece>
        </PuzzleDecorations>
        
        <MobilePuzzleBackgroundLeft
          src={leftsidepuzzleImage}
          alt="Decorative Puzzle Pattern Left"
        />
        <MobilePuzzleBackgroundRight
          src={rightsidepuzzleImage}
          alt="Decorative Puzzle Pattern Right"
        />
        
        {/* <WelcomeText
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Welcome to Our Joyful Learning Adventure!
        </WelcomeText> */}
        
        <HeroImage
          src={heroImage}
          alt="ABA Therapy Center - Children Learning and Playing"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <FloatingImagesContainer>
          <FloatingImage src={img1} alt="Therapeutic Activities - Children engaged in learning" />
          <FloatingImage src={img3} alt="Child Development - Building essential skills" />
          <FloatingImage src={img2} alt="Learning Through Play - Fun educational activities" />
        </FloatingImagesContainer>
        
        <HeroTitlesWrapper>
          <HeroTitle>
            The Bridge Between <HeroTitle2 data-text="ABA Therapy">ABA Therapy</HeroTitle2> & Everyday
            Learning
          </HeroTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <CTAButton text="🚀 Start Your Journey Today!" to="/contact" />
          </motion.div>
          <HeroTitle4>
            Contact us at: <HeroTitle3>(678) 353-6829</HeroTitle3>
          </HeroTitle4>
          <HeroTitle4>Located in Dunwoody, Georgia</HeroTitle4>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{ 
              marginTop: '1.5rem', 
              fontFamily: '"Bubblegum Sans"', 
              color: '#4A90E2',
              fontSize: '1.1rem'
            }}
          >
            🌈 "Socialization, not isolation" - Where every child thrives! ✨
          </motion.div>
        </HeroTitlesWrapper>
      </HeroContainer>
    </>
  );
};

export default Hero;