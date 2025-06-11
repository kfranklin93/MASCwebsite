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
// import puzzleMask from "../assets/puzzle-mask.svg";
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
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  background-color: rgba(255, 255, 255, 0.85);
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @supports (backdrop-filter: blur(50px)) {
    backdrop-filter: blur(50px);
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
    opacity: 0.3; /* Reduced opacity from default 1.0 to 0.3 */

    mask-repeat: no-repeat;
    mask-size: contain;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    -webkit-mask-position: center;
  }

  &::before {
    top: 10%;
    left: 5%;
    width: 30vw;
    height: 35vh;
    transform: rotate(15deg);
    background-image: url(${bk1});
    mask-image: url(${rotatedpuzzleMask});
    -webkit-mask-image: url(${rotatedpuzzleMask});
  }

  &::after {
    right: 5%;
    width: 30vw;
    bottom: -5%;
    height: 50vh;
    background-image: url(${bk2});
    mask-image: url(${rotatedpuzzleMask}); 
    -webkit-mask-image: url(${rotatedpuzzleMask});
  }

  /* Responsive resizing for puzzle masks */
  @media (max-width: 1024px) {
    &::before,
    &::after {
      width: 30vw;
      height: 25vh;
    }

    &::before {
      top: 8%;
      left: 4%;
    }

    &::after {
      bottom: 6%;
      right: 4%;
    }
  }

  @media (max-width: 768px) {
    background-image: none;
    background: linear-gradient(to bottom, #ffffff, #eafaf1);
    border: none;
    padding: 4rem 1rem 8rem;

    &::before,
    &::after {
      width: 35vw;
      height: 20vh;
      opacity: 0.2; /* Even lower opacity for mobile */
    }

    &::before {
      top: 6%;
      left: 2%;
    }

    &::after {
      bottom: 4%;
      right: 2%;
    }
  }

  @media (max-width: 600px) {
    &::before,
    &::after {
      width: 40vw;
      height: 18vh;
    }

    &::before {
      top: 4%;
      left: 1%;
    }

    &::after {
      bottom: 2%;
      right: 1%;
    }
  }

  @media (max-width: 480px) {
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
  gap: 1rem;
  z-index: 3;
  margin: 1.5rem 0;
  position: relative;
`;

const FloatingImage = styled.img`
  width: clamp(80px, 20vw, 210px);
  animation: float 3s ease-in-out infinite;
`;

const HeroImage = styled(motion.img)`
  width: 60vw;
  height: 30vh;
  object-fit: contain;
  z-index: 1;

  @media (max-width: 768px) {
    width: 60vw;
    height: auto;
  }

  @media (max-width: 480px) {
    width: 70vw;
    height: auto;
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
  font-size: 2rem;
  color: rgb(220, 27, 27);
  font-family: "Bubblegum Sans";

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
  font-family: "Bubblegum Sans";

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
  font-family: "Bubblegum Sans";
`;

const HeroTitle4 = styled.h2`
  font-size: 1.2rem;
  margin-top: 1rem;
  color: black;
  font-family: "Bubblegum Sans";
`;

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

  @media (min-width: 1367px) {
    display: none;
  }
`;

const MobilePuzzleBackgroundRight = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 45vw;
  max-width: 200px;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
  object-fit: contain;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Hero = () => {
  return (
    <>
      <Helmet>
        <title>
          Mommy Angel's Specialty Care | ABA Therapy, Autism Support & Pre-K
          Readiness
        </title>
        <link rel="canonical" href="https://mommyangelsspecialtycare.com" />
        <meta
          name="description"
          content="Mommy Angel's Specialty Care and Autism Center in Dunwoody, GA offers compassionate ABA therapy, speech therapy, and Pre-K readiness programs for children with autism. Socialization, not isolation."
        />
        <meta
          name="keywords"
          content="ABA therapy Dunwoody, autism center Georgia, special needs daycare, speech therapy for toddlers, Pre-K readiness, early intervention, autism support Georgia, inclusive childcare, RBT, BCBA, autism therapy near me"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Mommy Angel's Specialty Care & Autism Center"
        />
        <meta
          property="og:description"
          content="A loving space where your child can grow through ABA therapy, early learning, and social inclusion. Located in Dunwoody, GA."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/path-to-image.jpg"
        />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <HeroContainer>
        <MobilePuzzleBackgroundLeft
          src={leftsidepuzzleImage}
          alt="Puzzle Left"
        />
        <MobilePuzzleBackgroundRight
          src={rightsidepuzzleImage}
          alt="Puzzle Right"
        />
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
            The Bridge Between <HeroTitle2> ABA Therapy</HeroTitle2> & Everyday
            Learning
          </HeroTitle>
          <CTAButton text="Enroll Now" to="/contact" />
          <HeroTitle4>
            Contact us at: <HeroTitle3>(678) 353-6829</HeroTitle3>
          </HeroTitle4>
          <HeroTitle4>Located in Dunwoody, Georgia</HeroTitle4>
        </HeroTitlesWrapper>
      </HeroContainer>
    </>
  );
};

export default Hero;