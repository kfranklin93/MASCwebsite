import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import placeholderImg from "../assets/IMG_6867.png";
import placeholderImg2 from "../assets/Screenshot 2025-06-12 at 11.13.58 PM 2.png";
import placeholderImg3 from "../assets/Dramatic play w shruthi.png";

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
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #00695c;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
  text-align: center;
  width: 100%;
`;

const TextColumn = styled.div`
  flex: 2;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 3;
  padding: 0 2rem;

  .our-story & {
    @media (min-width: 1401px) {
      max-width: 60%;
    }
    
    @media (max-width: 1400px) {
      max-width: 60%;
      width: 100%;
      padding: 1.5rem;
    }
  }

  @media (max-width: 1200px) {
    max-width: 600px;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    order: 2;
  }
`;

const SplitLayout = styled.div`
  display: flex;
  gap: 3rem;
  align-items: stretch;
  justify-content: space-between;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;

  &.our-story {
    @media (max-width: 1400px) {
      flex-direction: column;
      align-items: center;
      
      > div {
        width: 100%;
        max-width: 900px;
      }
      
      > div:nth-child(2) {
        order: 2;
        padding: 0 2rem;
      }
      
      > div:first-child {
        order: 1;
      }
      
      > div:last-child {
        order: 3;
      }
    }
  }
  
  @media (max-width: 1200px) {
    gap: 2rem;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 0;
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  position: relative;
  z-index: 0;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const OurStoryImageColumn = styled(ImageColumn)`
  position: relative;
  width: 30%;
  min-width: 300px;
  
  img {
    height: 100%;
    min-height: 600px;
    object-fit: cover;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left, rgba(240, 248, 255, 0.9) 0%, rgba(240, 248, 255, 0.6) 50%, rgba(240, 248, 255, 0.3) 80%, transparent 100%);
    z-index: 2;
    pointer-events: none;
    border-radius: 15px;
  }

  @media (max-width: 1400px) {
    width: 100%;
    max-width: 600px;
    min-width: unset;
    
    img {
      min-height: 400px;
      max-height: 600px;
    }
  }

  @media (max-width: 768px) {
    min-width: 100%;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    
    img {
      min-height: 400px;
      max-height: 500px;
    }

    &::before {
      width: 100%;
      background: linear-gradient(to top, rgba(240, 248, 255, 0.9), transparent);
    }
  }

  @media (max-width: 480px) {
    img {
      min-height: 300px;
      max-height: 400px;
    }
  }
`;

const RightImageColumn = styled(OurStoryImageColumn)`
  &::before {
    right: auto;
    left: 0;
    background: linear-gradient(to left, transparent 0%, rgba(240, 248, 255, 0.3) 20%, rgba(240, 248, 255, 0.6) 50%, rgba(240, 248, 255, 0.9) 100%);
  }

  @media (max-width: 1400px) {
    order: 3;
    
    &::before {
      width: 100%;
      background: linear-gradient(to top, rgba(240, 248, 255, 0.9), transparent);
    }
  }
`;

const TextHeightImageColumn = styled(ImageColumn)`
  position: relative;
  height: 100%;
  min-height: 600px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, rgba(240, 248, 255, 0.9) 0%, rgba(240, 248, 255, 0.6) 50%, rgba(240, 248, 255, 0.3) 80%, transparent 100%);
    z-index: 2;
    pointer-events: none;
    border-radius: 15px;
  }

  @media (max-width: 1200px) {
    min-height: 500px;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 400px;
    max-height: 500px;
    margin: 0 auto;
    
    img {
      max-height: 500px;
    }
    
    &::before {
      width: 100%;
      background: linear-gradient(to top, rgba(240, 248, 255, 0.9), transparent);
    }
  }

  @media (max-width: 480px) {
    min-height: 300px;
    
    img {
      max-height: 400px;
    }
  }
`;

// eslint-disable-next-line no-unused-vars
const ResponsiveImageColumn = styled(ImageColumn)`
  position: relative;
  width: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 16/9;
    
    @media (min-width: 2000px) {
      max-height: 800px;
    }
    
    @media (max-width: 1920px) {
      max-height: 700px;
    }
    
    @media (max-width: 1440px) {
      max-height: 600px;
    }
    
    @media (max-width: 1024px) {
      max-height: 500px;
    }
    
    @media (max-width: 768px) {
      max-height: 400px;
    }
    
    @media (max-width: 480px) {
      max-height: 300px;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left, rgba(240, 248, 255, 0.9) 0%, rgba(240, 248, 255, 0.6) 50%, rgba(240, 248, 255, 0.3) 80%, transparent 100%);
    z-index: 2;
    pointer-events: none;
    border-radius: 15px;
  }

  @media (max-width: 768px) {
    &::before {
      width: 100%;
      background: linear-gradient(to top, rgba(240, 248, 255, 0.9), transparent);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    flex-direction: column;
    align-items: stretch;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: ${props => props.secondary ? '#00695c' : '#CD1B1B'};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: "Nunito", sans-serif;
  font-size: clamp(1rem, 1.1vw, 1.1rem);
  text-align: center;
  white-space: normal;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.secondary ? '#008577' : '#e62020'};
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem;
  }
`;

const About = () => (
  <>
    <Section bg="rgba(240, 248, 255, 0.9)" border="20px solid rgba(0, 128, 0, 0.5)">
      <SplitLayout className="our-story">
        <OurStoryImageColumn>
          <img src={placeholderImg} alt="Our story left" />
        </OurStoryImageColumn>
        
        <TextColumn>
          <SectionTitle>Our Story</SectionTitle>
          <AboutText initial="hidden" animate="visible" variants={textAnimation}>
            At Mommy Angel's Autism Center, we provide a nurturing
            and supportive environment where children with autism can thrive. Our mission
            is to meet each child where they are, while offering the extra support needed
            to help them grow, learn, and feel confident in their progress.
          </AboutText>

          <AboutText>
            {/* Mommy Angels Daycare sister program reference commented out */}
            {/* As a proud sister program of{" "}
            <a
              href="https://mommyangelsdaycare.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#00695c",
                fontWeight: "bold",
                textDecoration: "underline",
                backgroundColor: "#FFFACD",
                padding: "2px 5px",
                borderRadius: "3px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              Mommy Angels Daycare
            </a>
            , our center is uniquely positioned to support the whole family. */}
            Our center is uniquely positioned to support the whole family.
          </AboutText>

          {/* <AboutText>
            Picture this: while your child receives compassionate, individualized ABA care
            with us, their siblings are just next door at Mommy Angels Daycare—surrounded by
            the same loving values and joyful energy. With one drop-off and pick-up
            location, your mornings feel more manageable, your schedule feels lighter, and
            your heart feels at ease.
          </AboutText> */}

          <AboutText>
            We also offer a specialized Readiness Program, featuring classrooms designed just like a Pre-K
            setting. This helps prepare your child for a smooth and successful
            transition into a traditional Pre-K classroom.
          </AboutText>
        </TextColumn>

        <RightImageColumn>
          <img src={placeholderImg2} alt="Our story right" />
        </RightImageColumn>
      </SplitLayout>
    </Section>

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
        <TextHeightImageColumn>
          <img src={placeholderImg3} alt="ABA Therapy" />
        </TextHeightImageColumn>
      </SplitLayout>
    </Section>
    <Leadership />
  </>
);

export default About;