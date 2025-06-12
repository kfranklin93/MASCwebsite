import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import abaImage from "../assets/IMG_8886 2.png";

const AlignedSection = styled.section`
  padding: 4rem 2rem;
  background: #fff;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    left: -20%;
    top: -20%;
    width: 70%;
    height: 140%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.95) 40%,
      rgba(255, 255, 255, 0.85) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;

    &::before {
      left: 0;
      top: 30%;
      width: 100%;
      height: 70%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.95) 20%,
        rgba(255, 255, 255, 1) 40%
      );
    }
  }
`;

const ContentGroup = styled.div`
  flex: 1;
  text-align: left;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(5px);
  padding: 2rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: #00695c;
  margin-bottom: 1.5rem;
  font-family: "Nunito", sans-serif;
  line-height: 1.2;
  position: relative;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const BodyText = styled.div`
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.6;
  margin-bottom: 2rem;
  position: relative;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);

  p {
    position: relative;
    z-index: 2;
    margin-bottom: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 1.5rem;
  background: ${props => props.secondary ? 'rgba(74, 144, 226, 0.1)' : '#4a90e2'};
  color: ${props => props.secondary ? '#4a90e2' : '#fff'};
  border: 2px solid #4a90e2;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: ${props => props.secondary ? '#4a90e2' : '#357abd'};
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
  }

  svg {
    margin-left: 0.5rem;
    width: 12px;
    height: 12px;
  }
`;

const MediaContainer = styled.div`
  flex: 1;
  min-height: 400px;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.2) 100%
    );
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    filter: contrast(1.05) brightness(1.02);
  }

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const BlendOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.8) 25%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 1;
  mix-blend-mode: overlay;
  pointer-events: none;
`;

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 8.485 8.485">
    <path 
      d="M0,0H4V4" 
      transform="translate(4.243 1.414) rotate(45)" 
      fill="none" 
      stroke="currentColor" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2"
    />
  </svg>
);

const AlignedContent = () => {
  return (
    <AlignedSection>
      <BlendOverlay />
      <Container>
        <ContentGroup>
          <Heading>What is ABA Therapy?</Heading>
          <BodyText>
            <p>
              Applied Behavior Analysis (ABA) therapy helps children with autism
              develop essential skills, improve behavior, and achieve their full
              potential. Our therapists create individualized plans that are
              engaging and tailored to each child's needs.
            </p>
            <p>
              ABA focuses on positive reinforcement to encourage desirable
              behaviors, helping children develop independence and social skills.
              It is a structured and evidence-based approach tailored to each
              child's learning pace.
            </p>
            <p>
              At Mommy Angel's Specialty Care, we provide top-quality ABA therapy delivered 
              by a skilled, dedicated team of board-certified behavior analysts (BCBAs) 
              and registered behavior technicians (RBTs). These compassionate professionals 
              know how to help your child succeed and offer the individualized attention 
              they deserve to thrive while providing family guidance assistance services.
            </p>
            <p>
              Our services also include in-home care outside our center. We accept most 
              major insurance plans, and we can help navigate the insurance process for you.
            </p>
          </BodyText>
          <ButtonContainer>
            <Button to="/contact">
              <span>Contact Us</span>
              <ArrowIcon />
            </Button>
            <Button to="/what-to-expect" secondary>
              <span>What to Expect in ABA Therapy</span>
              <ArrowIcon />
            </Button>
          </ButtonContainer>
        </ContentGroup>
        <MediaContainer>
          <img src={abaImage} alt="ABA Therapy Session" />
        </MediaContainer>
      </Container>
    </AlignedSection>
  );
};

export default AlignedContent;