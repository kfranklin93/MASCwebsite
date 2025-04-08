import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import heroImage from "../assets/Mommy-Angles-Specialty-Care-32-x-78-in_20240715_133946_0000.png";
import backgroundImg from "../assets/Untitled-design-7-1-2.png";
import img1 from "../assets/Angel-1.png";
import img2 from "../assets/Angel-2.png";
import img3 from "../assets/Angel-3.png";

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  min-height: 100vh;
  position: relative;
  background: url(${backgroundImg}) no-repeat center center/cover;
  backdrop-filter: blur(50px);
  padding: 2rem 1rem;
  background-size: cover;
  margin-top: 60px; /* Adjust this value based on your actual navbar height */
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: url(${backgroundImg}) no-repeat center center/cover;
    opacity: 0.7;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem 4rem;
    max-width: 100vw;
    overflow-x: hidden;
    background-size: cover;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.5rem 6rem;
    max-width: 100vw;
    overflow-x: hidden;
    background-size: cover;
  }
`;

const HeroImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  object-fit: cover;
  z-index: -1;
  @media (max-width: 768px) {
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const FloatingImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  z-index: 1;
  margin: 1rem 0;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`;

const FloatingImage = styled.img`
  &.image1 {
    width: clamp(80px, 20vw, 210px);
    animation: float 3s ease-in-out infinite;
  }

  &.image2 {
    width: clamp(80px, 20vw, 210px);
    animation: float 4s ease-in-out infinite;
  }

  &.image3 {
    width: clamp(70px, 20vw, 190px);
    animation: float 3.5s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    width: 120px;
  }

  @media (max-width: 480px) {
    width: 100px;
  }
`;

const HeroTitlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  padding: 2rem 1rem;
  max-width: 90%;
  width: 100%;
  text-align: center;
  margin-top: auto; /* Pushes the titles to the bottom */
  margin-bottom: calc(1vh + 50px); /* Adds space for URL bar (50px is an example) */

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    margin-bottom: calc(2vh + 40px); /* Adjust for smaller screens */
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    margin-bottom: calc(3vh + 30px); /* Further adjust for mobile screens */
  }
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  color: rgb(220, 27, 27);
  font-family: 'Bubblegum Sans';
  text-shadow: 2px 2px 4px rgba(220, 27, 27, 0.2);

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
  text-shadow: 2px 2px 4px rgba(220, 27, 27, 0.6);

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
  bottom: 1rem;
  color: rgb(220, 27, 27);
  font-family: 'Bubblegum Sans';
  // text-shadow: 2px 2px 4px rgba(220, 27, 27, 0.6);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroImage 
        src={heroImage} 
        alt="ABA Therapy Center" 
        initial={{ opacity: 0.7, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      <FloatingImagesContainer>
        <FloatingImage src={img1} alt="Floating Image 1" className="image1" />
        <FloatingImage src={img3} alt="Floating Image 3" className="image3" />
        <FloatingImage src={img2} alt="Floating Image 2" className="image2" />
      </FloatingImagesContainer>

      <HeroTitlesWrapper>
        <HeroTitle>
          The Bridge Between <HeroTitle2> ABA Therapy</HeroTitle2> & Everyday Learning
        </HeroTitle>
        <HeroTitle3>Contact us at: <strong>(678) 353-6829</strong></HeroTitle3>
        <HeroTitle3>Located in Dunwoody, Georgia</HeroTitle3>
      </HeroTitlesWrapper>
    </HeroContainer>
  );
};

export default Hero;