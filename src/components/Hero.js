import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import heroImage from "../assets/Mommy-Angles-Specialty-Care-32-x-78-in_20240715_133946_0000.png";
import backgroundImg from "../assets/Untitled-design-7-1-2.png";
import img1 from "../assets/Angel-1.png";
import img2 from "../assets/Angel-2.png";
import img3 from "../assets/Angel-3.png";
import bk1 from "../assets/IMG_6881.png";
import bk2 from "../assets/IMG_9520.png";
import rotatedpuzzleMask from "../assets/puzzle-piece-mask.svg?url";
import rightsidepuzzleImage from "../assets/right side puzzle pieces Background Removed.png";
import leftsidepuzzleImage from "../assets/left side puzzle pieces Background Removed copy.png";
import { Helmet } from "react-helmet-async";
import CTAButton from "./ui/ctabutton";

// [Previous styled components remain the same until HeroTitle2]

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
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;  // Add width to ensure proper background coverage
    height: 100%; // Add height to ensure proper background coverage
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

// [Rest of the styled components remain the same]

const Hero = () => {
  return (
    <>
      <Helmet>
        {/* Helmet content remains the same */}
      </Helmet>

      <HeroContainer>
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
        
        <FloatingImagesContainer>
          <FloatingImage src={img1} alt="Therapeutic Activities - Children engaged in learning" />
          <FloatingImage src={img3} alt="Child Development - Building essential skills" />
          <FloatingImage src={img2} alt="Learning Through Play - Fun educational activities" />
        </FloatingImagesContainer>

        <HeroImage
          src={heroImage}
          alt="ABA Therapy Center - Children Learning and Playing"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        <HeroTitlesWrapper>
          <HeroTitle>
            The Bridge Between <HeroTitle2>ABA Therapy</HeroTitle2> & Everyday
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