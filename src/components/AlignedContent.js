import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import abaImage from "../assets/IMG_8886 2.png";

const AlignedSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f8ff 100%);
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

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const ContentGroup = styled.div`
  flex: 1;
  text-align: left;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: #00695c;
  margin-bottom: 1.5rem;
  font-family: "Nunito", sans-serif;
  line-height: 1.2;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #00695c, #4a90e2);
    margin-top: 0.5rem;
    border-radius: 2px;
  }
`;

const BodyText = styled.div`
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.8;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: ${props => props.secondary ? '#fff' : 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)'};
  color: ${props => props.secondary ? '#4a90e2' : '#fff'};
  border: 2px solid #4a90e2;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  box-shadow: ${props => props.secondary ? '0 2px 8px rgba(74, 144, 226, 0.2)' : '0 4px 15px rgba(74, 144, 226, 0.4)'};
  position: relative;
  overflow: hidden;

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

  &:hover {
    background: ${props => props.secondary ? 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)' : 'linear-gradient(135deg, #357abd 0%, #2868a8 100%)'};
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.5);
    border-color: ${props => props.secondary ? '#357abd' : '#4a90e2'};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(74, 144, 226, 0.4);
  }

  svg {
    margin-left: 0.5rem;
    width: 14px;
    height: 14px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const MediaContainer = styled.div`
  flex: 1;
  min-height: 400px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  &:hover img {
    transform: scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    min-height: 300px;
  }
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