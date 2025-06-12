import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import placeholderImg from "../assets/IMG_6867.png";
import placeholderImg2 from "../assets/IMG_8886 2.png";
import Leadership from "../components/Leadership";

const AboutText = styled(motion.p)`
  font-size: clamp(1rem, 1.3vw, 1.3rem);
  color: #444;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
  line-height: 1.6;
  text-align: center;
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

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #00695c;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
  text-align: center;
  width: 100%;
`;

const SplitLayout = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const TextColumn = styled.div`
  flex: 1;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }

    @media (max-width: 1024px) {
      height: 350px;
    }

    @media (max-width: 768px) {
      height: 300px;
      max-width: 100%;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem; // Increased gap for better button separation
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2.5rem; // Increased top margin
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: ${props => props.secondary ? '#00695c' : '#CD1B1B'}; // Green for secondary, Red for primary
  color: white; // Always white text for better contrast
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  border: none; // Removed border for cleaner look
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: "Nunito", sans-serif;
  font-size: 1.1rem;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.secondary ? '#008577' : '#e62020'}; // Slightly brighter on hover
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const About = () => (
  <main>
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
            At Mommy Angel's Specialty Care and Autism Center, we provide a
            nurturing and supportive environment where children with autism can
            thrive. Our mission is to meet each child where they are, while
            offering the extra support needed to help them grow, learn, and feel
            confident in their progress. As a proud sister program of Mommy
            Angels Daycare, our angels spend time in both settings—strengthening
            their social skills, engaging with peers, and enjoying outdoor play
            in a safe, inclusive environment.
          </AboutText>
          <AboutText>
            We also offer a specialized Readiness Program, featuring classrooms designed just like a Pre-K
            setting. This helps prepare your child for a smooth and successful
            transition into a traditional Pre-K classroom. At Mommy Angel's
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
            engaging and tailored to each child's needs.
          </AboutText>
          <AboutText>
            ABA focuses on positive reinforcement to encourage desirable
            behaviors, helping children develop independence and social skills.
            It is a structured and evidence-based approach tailored to each
            child's learning pace.
          </AboutText>
          <ButtonContainer>
            <Button to="/contact">
              Contact Us
            </Button>
            <Button to="/what-to-expect" secondary>
              What to Expect in ABA Therapy
            </Button>
          </ButtonContainer>
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