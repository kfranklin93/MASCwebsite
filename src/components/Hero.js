import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import heroImage from "../assets/Mommy-Angles-Specialty-Care-32-x-78-in_20240715_133946_0000.png";
import backgroundImg from "../assets/Untitled-design-7-1-2.png";
import puzzleBackground from "../assets/right side puzzle pieces.png";
import img1 from "../assets/Angel-1.png"; // Replace with your actual image paths
import img2 from "../assets/Angel-2.png";
import img3 from "../assets/Angel-3.png";

import NoWaitlistBadge from "./NoWaitlistBadge";

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  background: url(${backgroundImg}) no-repeat center center/cover;
  background-size: contain;
  backdrop-filter: blur(50px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${backgroundImg}) no-repeat center center/cover;
    opacity: 0.7;
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  color: #333;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.22);
  border-radius: 15px;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  color: rgb(220, 27, 27);
  font-family: 'Bubblegum Sans';
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;
const HeroTitle2 = styled.h2`
  font-size: 3rem;
  color: rgb(220, 27, 27);
  font-family: 'Bubblegum Sans';
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const HeroImage = styled(motion.img)`
  max-width: 100%;
  z-index: -1;
  // margin: -25%;
`;

// ✅ Positioned images over the background
const FloatingImage = styled.img`
  position: absolute;
  width: 100px; /* Adjust size as needed */
  height: auto;
  
  &.image1 {
    width: 200px;
    top: 50%;
    left: 20%;
    animation: float 3s ease-in-out infinite;
  }
  
  &.image2 {
    width:150px;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    animation: float 4s ease-in-out infinite;
  }

  &.image3 {
    width: 180px;
    top: 50%;
    right: 20%;
    animation: float 3.5s ease-in-out infinite;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
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
      
      <FloatingImage src={img1} alt="Floating Image 1" className="image1" />
      <FloatingImage src={img2} alt="Floating Image 2" className="image2" />
      <FloatingImage src={img3} alt="Floating Image 3" className="image3" />

      <HeroContent >
        <HeroTitle>Bridging<HeroTitle2>ABA Therapy</HeroTitle2> & Childcare for Every Milestone</HeroTitle>
        <NoWaitlistBadge/>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
