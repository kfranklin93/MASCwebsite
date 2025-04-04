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
  // justify-content: flex-end;
  align-items: center;
  // justify-content: center;
  justify-content: space-between;
  text-align: center;
  min-height: 100vh;
  position: relative;
  background: url(${backgroundImg}) no-repeat center center/cover;
  background-size: cover;
  backdrop-filter: blur(50px);
  padding-bottom: 6rem;

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

  @media (max-width: 768px) {
    background-size: cover;
    padding-bottom: 8rem;
  }

  @media (max-width: 480px) {
    background-size: cover;
    padding-bottom: 10rem;
  }
`;


// const HeroContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   max-width: 800px;
//   color: #333;
//   padding: 2rem;
//   border-radius: 15px;
//   z-index: 2;

//   @media (max-width: 768px) {
//     padding: 1.5rem;
//     max-width: 90%;
//   }

//   @media (max-width: 480px) {
//     padding: 1rem;
//     max-width: 95%;
//   }
// `;

// const FloatingImagesWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 20px;
//   margin-top: 2rem;
//   position: relative;
//   z-index: 2;

//   @media (max-width: 768px) {
//     flex-direction: row;
//     gap: 15px;
//   }
// `;

// const FloatingImage = styled.img`
//   width: 220px;
//   height: auto;
//   animation: float 3s ease-in-out infinite;

//   @media (max-width: 768px) {
//     width: 120px;
//   }

//   @media (max-width: 480px) {
//     width: 100px;
//   }
// `;

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
  position: absolute;
  bottom: 1rem;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: rgb(220, 27, 27);
  font-family: 'Bubblegum Sans';
  text-shadow: 2px 2px 4px rgba(220, 27, 27, 0.6);
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;
const HeroTitlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem; /* Push it below floating images */
  margin-bottom: 1.5rem;
  z-index: 2;

  @media (max-width: 768px) {
    margin-top: 3rem;
  }

  @media (max-width: 480px) {
    margin-top: 4rem;
  }
`;
// const HeroTitlesWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 4rem; /* Adjust this to control spacing between titles and footer */
//   z-index: 2;

//   @media (max-width: 768px) {
//     margin-bottom: 3rem;
//   }

//   @media (max-width: 480px) {
//     margin-bottom: 3.5rem;
//   }
// `;
const HeroImage = styled(motion.img)`
  max-width: 100%;
  z-index: -1;
`;
const FloatingImagesContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 40%; /* Adjust vertical alignment */
  z-index: 1;
  
  & > img {
    margin: 0 1rem;
  }

  @media (max-width: 768px) {
    top: 50%; /* Adjust vertical position */
  }

  @media (max-width: 480px) {
    top: 55%; /* Adjust vertical position */
  }
`;
const FloatingImage = styled.img`
  height: auto;

  &.image1 {
    width: 220px;
    animation: float 3s ease-in-out infinite;
  }

  &.image2 {
    width: 210px;
    animation: float 4s ease-in-out infinite;
  }

  &.image3 {
    width: 200px;
    animation: float 3.5s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    width: 120px;
  }

  @media (max-width: 480px) {
    width: 100px;
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
    </HeroTitlesWrapper>
      {/* <HeroContent> */}
        {/* <HeroTitle>Bridging <br /> <HeroTitle2>ABA Therapy</HeroTitle2> & Childcare <br/> for Every Milestone</HeroTitle> */}
        {/* <HeroTitle>The Bridge Between <HeroTitle2> ABA Therapy</HeroTitle2> & Everyday Learning</HeroTitle> */}
        {/* <NoWaitlistBadge/> */}
      {/* </HeroContent> */}
      <HeroTitle3>Located in Dunwoody ,Georgia</HeroTitle3>

    </HeroContainer>
    
  );
};


export default Hero;
