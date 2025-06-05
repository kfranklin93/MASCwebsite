import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import heroImage from "../assets/Mommy-Angles-Specialty-Care-32-x-78-in_20240715_133946_0000.png";
import backgroundImg from "../assets/Untitled-design-7-1-2.png";
import img1 from "../assets/Angel-1.png";
import img2 from "../assets/Angel-2.png";
import img3 from "../assets/Angel-3.png";
import bk1 from "../assets/IMG_7213.png";
import bk2 from "../assets/IMG_7205.png";
import puzzleMask from "../assets/puzzle-mask.svg";
import rotatedpuzzleMask from "../assets/rotated-puzzle-mask.svg";


import { Helmet } from "react-helmet-async";
import CTAButton from './ui/ctabutton';

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)),
              url(${backgroundImg}) center center / cover no-repeat;
  backdrop-filter: blur(50px);
  padding: 2rem 1rem;
  margin-top: calc(60px + 1rem);
  border: 20px solid #4a90e2;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &::before, &::after {
    content: "";
  position: absolute;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  z-index: 0;
  background-color: transparent; /* or any visible content */

  mask-image: url(${puzzleMask});
  
  mask-mode: alpha;
  mask-size: cover;
  mask-repeat: no-repeat;

  -webkit-mask-image: url(${puzzleMask});
  -webkit-mask-mode: alpha;
  -webkit-mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  }

  &::before {
    background-image: url(${bk1});
    top: 10%;
    left: 5%;
    width: 300px;
    height: 300px;
    // background-color: red; /* required for visibility */
    // mask-image: url('../assets/puzzle-mask.svg');
    mask-image: url(${rotatedpuzzleMask});s
    mask-size: contain;
    mask-repeat: no-repeat;
    // -webkit-mask-image: url(${puzzleMask}););
    -webkit-mask-size: cover;
    -webkit-mask-repeat: no-repeat;
    opacity: 0.8;
    z-index: 1;
  }

  &::after {
    // background-color: red;
    // transform: rotate(180deg);
    // transform-origin: 50% 50%;
    background-image: url(${bk2});
    bottom: 10%;
    right: 5%;
    width: 300px;
    height: 300px;
    // mask-image: url('../assets/puzzle-mask.svg');
    mask-image: url(${rotatedpuzzleMask});  
    mask-size: contain;
    mask-repeat: no-repeat;
    // -webkit-mask-image: url(${rotatedpuzzleMask});
    -webkit-mask-size: cover;
    -webkit-mask-repeat: no-repeat;
    opacity: 1;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem 4rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.5rem 6rem;
  }
`;

const FloatingImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  z-index: 1;
  margin: 1rem 0;
`;

const FloatingImage = styled.img`
  width: clamp(80px, 20vw, 210px);
  animation: float 3s ease-in-out infinite;
`;

const HeroImage = styled(motion.img)`
  width: clamp(200px, 40vw, 500px);
  height: auto;
  z-index: 1;
`;

const HeroTitlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  padding: 2rem 1rem;
  max-width: 90%;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  color: rgb(220, 27, 27);
  font-family: 'Bubblegum Sans';

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const HeroTitle2 = styled.h2`
  font-size: 4rem;
  color: rgb(220, 27, 27);
  font-family: 'Bubblegum Sans';

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroTitle3 = styled.h2`
  font-size: 1.2rem;
  margin-top: 1rem;
  color: rgb(220, 27, 27);
  font-family: 'Bubblegum Sans';
`;

const HeroTitle4 = styled.h2`
  font-size: 1.2rem;
  margin-top: 1rem;
  color: black;
  font-family: 'Bubblegum Sans';
`;

const Hero = () => {
  return (
    <>
      <Helmet>
        <title>Mommy Angel’s Specialty Care | ABA Therapy, Autism Support & Pre-K Readiness</title>
        <link rel="canonical" href="https://mommyangelsspecialtycare.com" />
        <meta name="description" content="Mommy Angel’s Specialty Care and Autism Center in Dunwoody, GA offers compassionate ABA therapy, speech therapy, and Pre-K readiness programs for children with autism. Socialization, not isolation." />
        <meta name="keywords" content="ABA therapy Dunwoody, autism center Georgia, special needs daycare, speech therapy for toddlers, Pre-K readiness, early intervention, autism support Georgia, inclusive childcare, RBT, BCBA, autism therapy near me" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mommy Angel’s Specialty Care & Autism Center" />
        <meta property="og:description" content="A loving space where your child can grow through ABA therapy, early learning, and social inclusion. Located in Dunwoody, GA." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yourwebsite.com/path-to-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <HeroContainer>
        <HeroImage
          src={heroImage}
          alt="ABA Therapy Center"
          initial={{ opacity: 0.7, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <FloatingImagesContainer>
          <FloatingImage src={img1} alt="Floating Image 1" />
          <FloatingImage src={img3} alt="Floating Image 3" />
          <FloatingImage src={img2} alt="Floating Image 2" />
        </FloatingImagesContainer>

        <HeroTitlesWrapper>
          <HeroTitle>
            The Bridge Between <HeroTitle2> ABA Therapy</HeroTitle2> & Everyday Learning
          </HeroTitle>
          <CTAButton text="Enroll Now" to="/contact" />
          <HeroTitle4>Contact us at: <HeroTitle3>(678) 353-6829</HeroTitle3></HeroTitle4>
          <HeroTitle4>Located in Dunwoody, Georgia</HeroTitle4>
        </HeroTitlesWrapper>
      </HeroContainer>
    </>
  );
};

export default Hero;