import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

// Keep your existing container styles
const ExpectContainer = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f3f9f9 0%, #ffffff 50%, #e8fdf5 100%);
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #CD1B1B;
  margin-bottom: 1rem;
  font-family: "Bubblegum Sans", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #00695c;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
  font-family: "Nunito", sans-serif;
`;

// Updated Timeline Styles
const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 4rem auto;
  padding: 0;

  @media (max-width: 768px) {
    margin: 2rem auto;
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  margin: 2rem 0;
  position: relative;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    margin: 1rem 0;
    padding-left: 2rem;
  }
`;

const TimelinePoint = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: ${props => props.$isEven ? '#4A90E2' : '#CD1B1B'};
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 0 0 3px ${props => props.$isEven ? '#4A90E2' : '#CD1B1B'};
  z-index: 2;

  @media (max-width: 768px) {
    left: 0;
    transform: translateX(-50%);
  }
`;

const TimelineContent = styled(motion.div)`
  width: 45%;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  margin: ${props => props.$isEven ? '0 0 0 auto' : '0 auto 0 0'};
  border-top: 4px solid ${props => props.$isEven ? '#4A90E2' : '#CD1B1B'};

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.$isEven ? 'left: -15px;' : 'right: -15px;'}
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    ${props => props.$isEven 
      ? 'border-right: 15px solid white;' 
      : 'border-left: 15px solid white;'}
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 1rem 0;
    
    &::before {
      left: -15px;
      border-right: 15px solid white;
      border-left: none;
    }
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #CD1B1B, #4A90E2);
  border-radius: 2px;
  z-index: 1;

  @media (max-width: 768px) {
    left: 0;
  }
`;

const Step = styled.h2`
  font-size: 1.4rem;
  color: ${props => props.$isEven ? '#4A90E2' : '#CD1B1B'};
  margin-bottom: 1rem;
  font-family: "Bubblegum Sans", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    background: ${props => props.$isEven ? 'rgba(74, 144, 226, 0.1)' : 'rgba(205, 27, 27, 0.1)'};
    color: ${props => props.$isEven ? '#4A90E2' : '#CD1B1B'};
    padding: 0.2rem 0.8rem;
    border-radius: 20px;
    font-size: 1rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;
  font-family: "Nunito", sans-serif;
  margin: 0;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const NavButton = styled(Link)`
  display: inline-flex;
  align-items: center;
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
  font-size: 1.1rem;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.secondary ? '#008577' : '#e62020'};
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const WhatToExpect = () => {
  // Keep your existing steps array
  const steps = [
    {
      title: "Initial Consultation",
      description: "Meet with our team to discuss your child's needs, complete initial paperwork, and tour our facility. We'll explain our ABA therapy approach and answer any questions you have."
    },
    {
      title: "Assessment & Goal Setting",
      description: "Our BCBAs conduct a comprehensive assessment to understand your child's current skills and areas for growth. Together, we'll develop personalized goals and treatment plans."
    },
    {
      title: "Insurance Verification",
      description: "Our team works with your insurance provider to verify coverage and explain benefits. We'll handle the paperwork to make the process as smooth as possible."
    },
    {
      title: "Starting Therapy",
      description: "Your child begins one-on-one sessions with their dedicated RBT, supervised by a BCBA. We use play-based learning and positive reinforcement to work toward goals."
    },
    {
      title: "Progress Monitoring",
      description: "Regular progress updates and parent meetings ensure your child is advancing toward their goals. We adjust strategies as needed and celebrate achievements together."
    },
    {
      title: "Family Training",
      description: "We provide ongoing parent training to help you support your child's progress at home, ensuring consistency across all environments."
    }
  ];

  return (
    <ExpectContainer>
      <ContentWrapper>
        <HeaderSection>
          <Title>What to Expect in ABA Therapy</Title>
          <Subtitle>
            Understanding your journey with ABA therapy is important to us. Here's a step-by-step guide
            of what you can expect when starting your child's therapy program at Mommy Angel's.
          </Subtitle>
          <NavigationButtons>
            <NavButton to="/services/aba-therapy">
              Learn About ABA Therapy
            </NavButton>
            <NavButton to="/contact" secondary>
              Schedule a Consultation
            </NavButton>
          </NavigationButtons>
        </HeaderSection>

        <TimelineContainer>
          <TimelineLine />
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <TimelineItem
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <TimelinePoint $isEven={!isEven} />
                <TimelineContent 
                  $isEven={!isEven}
                  whileHover={{ 
                    scale: 1.02, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  <Step $isEven={!isEven}>
                    <span>Step {index + 1}</span>
                    {step.title}
                  </Step>
                  <Description>{step.description}</Description>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </TimelineContainer>

        <NavigationButtons>
          <NavButton to="/services/speech-therapy">
            Explore Speech Therapy
          </NavButton>
          <NavButton to="/services/early-intervention" secondary>
            Early Intervention Services
          </NavButton>
        </NavigationButtons>
      </ContentWrapper>
    </ExpectContainer>
  );
};

export default WhatToExpect;