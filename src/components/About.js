import React from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { Link } from 'react-router-dom';
import { useRef } from "react";
import placeholderImg from "../assets/IMG_6867.png";
import placeholderImg2 from "../assets/Screenshot-2025-06-12-at-11.13.58-PM-2.png";
import placeholderImg3 from "../assets/Dramatic play w shruthi.png";

import Leadership from "../components/Leadership";

// Decorative floating shapes
const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
`;

const Circle1 = styled(FloatingShape)`
  width: 200px;
  height: 200px;
  background: #00695c;
  top: 10%;
  right: 5%;
`;

const Circle2 = styled(FloatingShape)`
  width: 150px;
  height: 150px;
  background: #CD1B1B;
  bottom: 15%;
  left: 8%;
`;

const Circle3 = styled(FloatingShape)`
  width: 100px;
  height: 100px;
  background: #FFD700;
  top: 50%;
  left: 3%;
`;

const AboutText = styled(motion.p)`
  font-size: clamp(1rem, 1.3vw, 1.3rem);
  color: #444;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
  line-height: 1.9;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 1rem;
  
  strong {
    color: #00695c;
    font-weight: 700;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(to right, #00695c, transparent);
      opacity: 0.3;
    }
  }
  
  em {
    color: #CD1B1B;
    font-style: normal;
    font-weight: 600;
  }
`;

// Enhanced animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Section = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ bg }) => bg || "transparent"};
  background: ${({ bg }) => bg || "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f8ff 100%)"};
  border: ${({ border }) => border || "transparent"};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(0, 105, 92, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(205, 27, 27, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0.5rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #00695c;
  margin-bottom: 2rem;
  font-family: "Poppins", sans-serif;
  text-align: center;
  width: 100%;
  position: relative;
  z-index: 1;
  font-weight: 700;
  letter-spacing: -0.5px;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #CD1B1B, #FFD700);
    margin: 1rem auto 0;
    border-radius: 2px;
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% {
      opacity: 1;
      transform: scaleX(1);
    }
    50% {
      opacity: 0.7;
      transform: scaleX(1.1);
    }
  }
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

const ImageColumn = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  position: relative;
  z-index: 1;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: scale(1.05) translateY(-5px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
      filter: brightness(1.05);
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
  padding: 1.2rem 2.5rem;
  background: ${props => props.secondary
    ? 'linear-gradient(135deg, #00695c 0%, #008577 100%)'
    : 'linear-gradient(135deg, #CD1B1B 0%, #e62020 100%)'};
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 700;
  border: none;
  transition: all 0.3s ease;
  box-shadow: ${props => props.secondary
    ? '0 6px 20px rgba(0, 105, 92, 0.4)'
    : '0 6px 20px rgba(205, 27, 27, 0.4)'};
  font-family: "Nunito", sans-serif;
  font-size: clamp(1.05rem, 1.2vw, 1.2rem);
  text-align: center;
  white-space: normal;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.3px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  &::after {
    content: '→';
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
    display: inline-block;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    background: ${props => props.secondary
      ? 'linear-gradient(135deg, #008577 0%, #00a389 100%)'
      : 'linear-gradient(135deg, #e62020 0%, #ff3333 100%)'};
    box-shadow: ${props => props.secondary
      ? '0 8px 25px rgba(0, 105, 92, 0.5)'
      : '0 8px 25px rgba(205, 27, 27, 0.5)'};

    &::before {
      left: 100%;
    }

    &::after {
      transform: translateX(5px);
    }
  }

  &:active {
    transform: translateY(-1px) scale(1);
    box-shadow: ${props => props.secondary
      ? '0 4px 15px rgba(0, 105, 92, 0.4)'
      : '0 4px 15px rgba(205, 27, 27, 0.4)'};
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1.1rem 2rem;
  }
`;

const About = () => {
  const storyRef = useRef(null);
  const abaRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const abaInView = useInView(abaRef, { once: true, margin: "-100px" });

  return (
    <main id="main-content" role="main" aria-label="About Mommy Angel's Autism Center">
      <Section
        bg="rgba(240, 248, 255, 0.9)"
        border="20px solid rgba(0, 128, 0, 0.5)"
        as="section"
        aria-labelledby="our-story-heading"
        ref={storyRef}
      >
        {/* Floating decorative shapes */}
        <Circle1 {...floatingAnimation} />
        <Circle2
          animate={{
            y: [0, 20, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        <Circle3
          animate={{
            y: [0, -15, 0],
            transition: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        <SplitLayout className="our-story">
          <OurStoryImageColumn
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            <img
              src={placeholderImg}
              alt="Children engaged in therapeutic activities at Mommy Angel's Autism Center"
              loading="lazy"
            />
          </OurStoryImageColumn>
          
          <motion.div
            as={TextColumn}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <SectionTitle
              id="our-story-heading"
              variants={fadeInUp}
            >
              Our Story
            </SectionTitle>
            <AboutText variants={fadeInUp}>
            At Mommy Angel's Autism Center, we provide a nurturing
            and supportive environment where children with autism can thrive. Our mission
            is to meet each child where they are, while offering the extra support needed
            to help them grow, learn, and feel confident in their progress.
          </AboutText>

          <AboutText variants={fadeInUp}>
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

          <AboutText variants={fadeInUp}>
            We also offer a specialized Readiness Program, featuring classrooms designed just like a Pre-K
            setting. This helps prepare your child for a smooth and successful
            transition into a traditional Pre-K classroom.
          </AboutText>
          </motion.div>

        <RightImageColumn
          initial="hidden"
          animate={storyInView ? "visible" : "hidden"}
          variants={fadeInRight}
        >
          <img
            src={placeholderImg2}
            alt="Happy children learning and playing in our specialized Pre-K readiness classroom"
            loading="lazy"
          />
        </RightImageColumn>
      </SplitLayout>
    </Section>

    <Section
      border="20px solid rgba(255, 255, 0, 0.5)"
      as="section"
      aria-labelledby="aba-therapy-heading"
      ref={abaRef}
    >
      <SplitLayout>
        <motion.div
          as={TextColumn}
          initial="hidden"
          animate={abaInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <SectionTitle
            id="aba-therapy-heading"
            variants={fadeInUp}
          >
            What is ABA Therapy?
          </SectionTitle>
          <AboutText variants={fadeInUp}>
            Applied Behavior Analysis (ABA) therapy helps children with autism
            develop essential skills, improve behavior, and achieve their full
            potential. Our therapists create individualized plans that are
            engaging and tailored to each child's needs.
          </AboutText>
          <AboutText variants={fadeInUp}>
            ABA focuses on positive reinforcement to encourage desirable
            behaviors, helping children develop independence and social skills.
            It is a structured and evidence-based approach tailored to each
            child's learning pace.
          </AboutText>
          <ButtonContainer role="navigation" aria-label="ABA Therapy actions">
            <Button
              to="/contact"
              aria-label="Schedule your free tour today"
            >
              Schedule Your Free Tour Today
            </Button>
            <Button
              to="/what-to-expect"
              secondary
              aria-label="See how ABA therapy works"
            >
              See How ABA Therapy Works
            </Button>
          </ButtonContainer>
        </motion.div>
        <TextHeightImageColumn
          initial="hidden"
          animate={abaInView ? "visible" : "hidden"}
          variants={fadeInRight}
        >
          <img
            src={placeholderImg3}
            alt="Child participating in ABA therapy session with therapist"
            loading="lazy"
          />
        </TextHeightImageColumn>
      </SplitLayout>
    </Section>
    <Leadership />
  </main>
  );
};

export default About;