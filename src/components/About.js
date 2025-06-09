import React from "react";
import styled from "styled-components";
// import HeroSlider from "./HeroSlider"; // Ensure to import your HeroSlider component
import { motion } from "framer-motion";
// ...imports remain unchanged
import placeholderImg from "../assets/IMG_6867.png"; // Add your placeholder image
import placeholderImg2 from "../assets/IMG_8886 2.png"; // Add your placeholder image

import Leadership from "../components/Leadership";  // Adjust the path if necessary

// Styled-components for your container
// const AboutContainer = styled.section`
// position: relative;
// border-radius: 10px;
// background-color: rgba(240, 248, 255, 0.9); /* Soft blue background */
// padding: 40px 20px;
// text-align: center;
// margin: 1.5rem auto;
// border-bottom: 8px solid #A0D9FF; /* Soft light blue border */
// border-right: 8px solid #A3D39C; /* Soft green border */
// border-top: 8px solid #FFEB8A; /* Soft yellow border */
// border-left: 8px solid #FF9AA2; /* Soft pink border */
// max-width: 1200px;
// `;

// const AboutContentWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   flex-wrap: wrap;
//   gap: 3rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     text-align: center;
//   }
// `;

// const AboutColumn = styled.div`
//   flex: 1;
//   text-align: left;
//   padding: 1rem;
//   @media (max-width: 768px) {
//     text-align: center;
//   }
// `;

// const AboutTitle = styled.h2`
// font-size: 2.5rem;
// color: #00695C; /* Calming teal color for title */
// margin-bottom: 1.5rem;
// font-family: "Poppins", sans-serif;
// font-weight: 600;
// text-transform: uppercase;
// `;

const AboutText = styled(motion.p)`
  font-size: clamp(1rem, 1.3vw, 1.3rem);
  color: #444;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-family: "Poppins", sans-serif;
`;


const textAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const Section = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ bg }) => bg || "transparent"};
  border: ${({ border }) => border || "transparent"};
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  img {
    width: 100%;
    max-width: 400px; /* Limit image size on large screens */
    height: auto;
    border-radius: 10px;
    object-fit: cover;

    @media (min-width: 1024px) {
      max-width: 350px;
    }

    @media (min-width: 1440px) {
      max-width: 300px;
    }
  }
`;


const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #00695c;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
  text-align: center;
`;

// const SectionSubtext = styled.p`
//   font-size: 1.25rem;
//   color: #444;
//   text-align: center;
//   max-width: 800px;
//   margin: 0 auto 2.5rem;
// `;

const SplitLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextColumn = styled.div`
  flex: 1;
  max-width: 600px; /* Prevents text from stretching too wide */
  padding: 1rem;

  @media (min-width: 1024px) {
    max-width: 550px;
  }

  @media (min-width: 1440px) {
    max-width: 500px;
  }

  @media (max-width: 768px) {
    text-align: center;
    max-width: 100%;
  }
`;

const ImageColumn = styled(ImageWrapper)`
  flex: 1;
`;

const About = () => (
  <main>
    {/* <HeroSlider /> */}

    {/* OUR STORY Section */}
    <Section bg="rgba(240, 248, 255, 0.9)" border="20px solid rgba(0, 128, 0, 0.5)">
      <SplitLayout>
        <ImageColumn>
          <img src={placeholderImg} alt="Our story" />
        </ImageColumn>
        <TextColumn>
          <SectionTitle>Our Story</SectionTitle>
          <AboutText
            initial="hidden"
            animate="visible"
            variants={textAnimation}
          >
            At Mommy Angel’s Specialty Care and Autism Center, we provide a
            nurturing and supportive environment where children with autism can
            thrive. Our mission is to meet each child where they are, while
            offering the extra support needed to help them grow, learn, and feel
            confident in their progress. As a proud sister program of Mommy
            Angels Daycare, our angels spend time in both settings—strengthening
            their social skills, engaging with peers, and enjoying outdoor play
            in a safe, inclusive environment. 
            <br />
            We also offer a specialized Readiness Program, featuring a classrooms designed just like a Pre-K
            setting. This helps prepare your child for a smooth and successful
            transition into a traditional Pre-K classroom. At Mommy Angel’s
            Specialty Care and Autism Center, we believe in socialization, not
            isolation. Your child will be supported, included, and celebrated
            every step of the way.
          </AboutText>
        </TextColumn>
      </SplitLayout>
    </Section>

    {/* WHAT IS ABA THERAPY Section */}
    <Section border="20px solid rgba(255, 255, 0, 0.5)">
      <SplitLayout>
        <TextColumn>
          <SectionTitle>What is ABA Therapy?</SectionTitle>
          <AboutText
            initial="hidden"
            animate="visible"
            variants={textAnimation}
          >
            Applied Behavior Analysis (ABA) therapy helps children with autism
            develop essential skills, improve behavior, and achieve their full
            potential. Our therapists create individualized plans that are
            engaging and tailored to each child’s needs.
          </AboutText>
          <AboutText>
            ABA focuses on positive reinforcement to encourage desirable
            behaviors, helping children develop independence and social skills.
            It is a structured and evidence-based approach tailored to each
            child's learning pace.
          </AboutText>
        </TextColumn>
        <ImageColumn>
          <img src={placeholderImg2} alt="ABA Therapy" />
        </ImageColumn>
      </SplitLayout>
    </Section>
    <Leadership />
  </main>
);

export default About;