import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import abaImage from "../../assets/IMG_8886 2.png";

const PageContainer = styled.div`
  padding: 120px 2rem 4rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Section = styled.div`
  background: #FFFFFF;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  border-left: 4px solid #CD1B1B;
  border-right: 4px solid #4A90E2;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #00695c;
  margin-bottom: 2rem;
  text-align: center;
  font-family: "Nunito", sans-serif;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SplitLayout = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
  padding: 2rem;
  border-radius: 10px;
  background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-top: 3px solid #FFD700;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333333;
  margin-bottom: 1.5rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -10%;
    background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.4));
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 15px;
    border: 3px solid #4A90E2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 1024px) {
      height: 350px;
    }

    @media (max-width: 768px) {
      height: 300px;
    }
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled(motion.div)`
  background: #F8F9FA;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid #4A90E2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureTitle = styled.h3`
  color: #00695c;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-family: "Nunito", sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: ${props => props.secondary ? '#E3F2FD' : '#4A90E2'};
  color: ${props => props.secondary ? '#4A90E2' : '#FFFFFF'};
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  border: 2px solid #4A90E2;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.secondary ? '#4A90E2' : '#CD1B1B'};
    color: #FFFFFF;
    box-shadow: 0 6px 15px rgba(74, 144, 226, 0.3);
  }
`;

const ABATherapy = () => {
  const features = [
    {
      title: "Individualized Programs",
      description: "Custom-tailored therapy plans designed to meet your child's unique needs and goals."
    },
    {
      title: "Skill Development",
      description: "Focus on communication, social skills, daily living skills, and behavioral management."
    },
    {
      title: "Family Integration",
      description: "Parent training and support to ensure consistency across all environments."
    },
    {
      title: "Progress Tracking",
      description: "Continuous monitoring and adjustment of programs based on your child's development."
    }
  ];

  return (
    <PageContainer>
      <ContentWrapper>
        <Section>
          <Title>ABA Therapy at Mommy Angel's</Title>
          
          <SplitLayout>
            <TextContent>
              <Description>
                Applied Behavior Analysis (ABA) therapy helps children with autism develop essential skills,
                improve behavior, and achieve their full potential. Our therapists create individualized
                plans that are engaging and tailored to each child's needs.
              </Description>
              <Description>
                ABA focuses on positive reinforcement to encourage desirable behaviors, helping children
                develop independence and social skills. It is a structured and evidence-based approach
                tailored to each child's learning pace.
              </Description>
              <Description>
                At Mommy Angel's Autism Center, we provide top-quality ABA therapy delivered by a skilled,
                dedicated team of board-certified behavior analysts (BCBAs) and registered behavior
                technicians (RBTs).
              </Description>
            </TextContent>
            <ImageContainer>
              <img src={abaImage} alt="ABA Therapy Session" />
            </ImageContainer>
          </SplitLayout>

          <Features>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureTitle>{feature.title}</FeatureTitle>
                <Description>{feature.description}</Description>
              </FeatureCard>
            ))}
          </Features>

          <ButtonContainer>
            <Button to="/contact">
              Schedule a Consultation
            </Button>
            <Button to="/what-to-expect" secondary>
              What to Expect
            </Button>
          </ButtonContainer>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ABATherapy;