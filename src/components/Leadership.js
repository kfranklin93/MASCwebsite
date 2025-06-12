import React from "react";
import styled from "styled-components";
import placeholderImage from "../assets/right side puzzle pieces Background Removed.png"; // Add placeholder headshot
import anthony from "../assets/Anthony-edited Background Removed.png";
import shruthi from "../assets/IMG_9536 Background Removed.png";
import ruffin from "../assets/ruffin Background Removed.png";

const LeadershipSection = styled.section`
  background-color: #fff9e6;
  padding: 4rem 2rem;
  text-align: center;
  // border: 20px solid red;
  border: 20px solid rgba(255, 0, 0, 0.5);
`;

const Title = styled.h2`
  font-family: "Bubblegum Sans";
  font-size: 2.5rem;
  color: #dc1b1b;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem; /* Smaller title on mobile */
  }

  @media (max-width: 480px) {
    font-size: 1.8rem; /* Even smaller title on very small screens */
  }
`;

const Description = styled.p`
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  font-family: "Nunito", sans-serif;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size on mobile */
    padding: 0 1rem; /* Add some padding to the sides on mobile */
  }

  @media (max-width: 480px) {
    font-size: 0.95rem; /* Slightly smaller on very small screens */
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
    gap: 1.5rem; /* Smaller gap on mobile */
  }

  @media (max-width: 480px) {
    gap: 1rem; /* Even smaller gap on very small screens */
  }
`;

const LeaderCard = styled.div`
  width: 250px; /* Default size for desktop */
  text-align: center;

  @media (max-width: 768px) {
    width: 200px; /* Adjust width for tablet devices */
  }

  @media (max-width: 480px) {
    width: 160px; /* Adjust width for small mobile devices */
  }
`;

const LeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* Changed from center top to just center */
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
    font-size: 1rem; /* Adjust font size on mobile */
  }

  @media (max-width: 480px) {
    font-size: 0.95rem; /* Slightly smaller font on small mobile screens */
  }
`;

const LeaderTitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Adjust font size on mobile */
  }

  @media (max-width: 480px) {
    font-size: 0.85rem; /* Slightly smaller font on very small screens */
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
      <Title>Servant Leadership</Title>
      <Description>
        At Mommy Angel's Specialty Care & Autism Center, our leadership is
        grounded in the heart of service. We believe in leading with empathy,
        compassion, and a deep commitment to our families, team members, and the
        community. By empowering our staff, we nurture an environment where
        every child can thrive.
      </Description>

      <LeadersGrid>
        <LeaderCard>
          <ImageWrapper>
            <LeaderImage src={placeholderImage} alt="CEO Headshot" />
          </ImageWrapper>
          {/* <LeaderImage src={placeholderImage} alt="CEO Headshot" /> */}
          <LeaderName>Crissy</LeaderName>
          <LeaderTitle>Board Certified Behavior Analyst</LeaderTitle>
        </LeaderCard>

        <LeaderCard>
          <ImageWrapper>
            <LeaderImage src={ruffin} alt="Clinical Director Headshot" />
          </ImageWrapper>
          {/* <LeaderImage src={ruffin} alt="Clinical Director Headshot" /> */}
          <LeaderName>Tereva</LeaderName>
          <LeaderTitle>Speech Pathologist</LeaderTitle>
        </LeaderCard>

        <LeaderCard>
          <ImageWrapper>
            <LeaderImage src={shruthi} alt="Program Manager Headshot" />
          </ImageWrapper>
          {/* <LeaderImage src={shruthi} alt="Program Manager Headshot" /> */}
          <LeaderName>Shruthi</LeaderName>
          <LeaderTitle>Operations Manager</LeaderTitle>
        </LeaderCard>

        <LeaderCard>
          <ImageWrapper>
            <LeaderImage src={anthony} alt="Operations Headshot" />
          </ImageWrapper>
          {/* <LeaderImage src={anthony} alt="Operations Headshot" /> */}
          <LeaderName>Anthony</LeaderName>
          <LeaderTitle>Lead RBT</LeaderTitle>
        </LeaderCard>
      </LeadersGrid>
    </LeadershipSection>
  );
};

export default Leadership;