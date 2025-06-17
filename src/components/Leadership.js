import React from "react";
import styled from "styled-components";
import leadershipImg from "../assets/IMG_5236.png";
import placeholderImage from "../assets/right side puzzle pieces Background Removed.png";
import anthony from "../assets/Anthony-edited Background Removed.png";
import shruthi from "../assets/IMG_9536 Background Removed.png";

const MainLayout = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  min-height: 600px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    min-height: auto;
    gap: 2rem;
  }
`;

// New Container for AsideImage with gradient
const AsideImageContainer = styled.div`
  position: relative;
  width: 500px;
  height: auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;  // Changed from left to right
    width: 50%;  // Changed to 50% width
    height: 100%;
    background: linear-gradient(to left, rgba(240, 248, 255, 0.9) 0%, rgba(240, 248, 255, 0.6) 50%, rgba(240, 248, 255, 0.3) 80%, transparent 100%);
    z-index: 2;
    pointer-events: none;
    border-radius: 15px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 600px;

    &::before {
      width: 100%;
      background: linear-gradient(to top, rgba(240, 248, 255, 0.9), transparent);
    }
  }
`;

const AsideImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  align-self: center;
  margin: auto 0;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 600px;
    margin-bottom: 2rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 800px;
`;

const TextSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const LeadershipSection = styled.section`
  background-color: #fff9e6;
  padding: 4rem 2rem;
  text-align: center;
  border: 20px solid rgba(255, 0, 0, 0.5);
`;

const Title = styled.h2`
  font-family: "Bubblegum Sans";
  font-size: 2.5rem;
  color: #dc1b1b;
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  font-family: "Nunito", sans-serif;
  color: #333;
  margin: 1.5rem 0 0;
  padding: 0;
  line-height: 1.6;
  text-align: left;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const LeadersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  min-width: 1024px;

  @media (max-width: 1024px) {
    min-width: auto;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const LeaderCard = styled.div`
  width: 250px;
  text-align: center;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 160px;
  }
`;

const LeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
`;

const LeaderName = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 1.1rem;
  margin-top: 0.75rem;
  color: #000;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const LeaderTitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ImageWrapper = styled.div`
  width: 180px;
  height: 180px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

const Leadership = () => {
  return (
    <LeadershipSection>
      <MainLayout>
        <AsideImageContainer>
          <AsideImage src={leadershipImg} alt="Team Leadership" />
        </AsideImageContainer>
        <MainContent>
          <TextSection>
            <Title>Meet Our Team</Title>
            <Description>
              At Mommy Angel's Specialty Care & Autism Center, our leadership is
              grounded in the heart of service. We believe in leading with empathy,
              compassion, and a deep commitment to our families, team members, and the
              community. By empowering our staff, we nurture an environment where
              every child can thrive.
            </Description>
          </TextSection>
          <LeadersGrid>
            <LeaderCard>
              <ImageWrapper>
                <LeaderImage src={placeholderImage} alt="CEO Headshot" />
              </ImageWrapper>
              <LeaderName>Crissy</LeaderName>
              <LeaderTitle>Board Certified Behavior Analyst</LeaderTitle>
            </LeaderCard>

            <LeaderCard>
              <ImageWrapper>
                <LeaderImage src={shruthi} alt="Program Manager Headshot" />
              </ImageWrapper>
              <LeaderName>Shruthi</LeaderName>
              <LeaderTitle>Operations Manager</LeaderTitle>
            </LeaderCard>

            <LeaderCard>
              <ImageWrapper>
                <LeaderImage src={anthony} alt="Operations Headshot" />
              </ImageWrapper>
              <LeaderName>Anthony</LeaderName>
              <LeaderTitle>Lead RBT</LeaderTitle>
            </LeaderCard>
          </LeadersGrid>
        </MainContent>
      </MainLayout>
    </LeadershipSection>
  );
};

export default Leadership;