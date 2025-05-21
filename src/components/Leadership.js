import React from "react";
import styled from "styled-components";
import placeholderImage from "../assets/IMG_8895.png"; // Add placeholder headshot

const LeadershipSection = styled.section`
  background-color: #fff9e6;
  padding: 4rem 2rem;
  text-align: center;
  border: 20px solid red;
`;

const Title = styled.h2`
  font-family: 'Bubblegum Sans';
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
  font-family: 'Nunito', sans-serif;
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
  height: auto;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const LeaderName = styled.h3`
  font-family: 'Nunito', sans-serif;
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
  font-family: 'Nunito', sans-serif;
  font-size: 0.95rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Adjust font size on mobile */
  }

  @media (max-width: 480px) {
    font-size: 0.85rem; /* Slightly smaller font on very small screens */
  }
`;

const Leadership = () => {
  return (
    <LeadershipSection>
      <Title>Servant Leadership</Title>
      <Description>
        At Mommy Angel’s Specialty Care & Autism Center, our leadership is grounded in the heart of service. 
        We believe in leading with empathy, compassion, and a deep commitment to our families, team members, 
        and the community. By empowering our staff, we nurture an environment where every child can thrive.
      </Description>

      <LeadersGrid>
        <LeaderCard>
          <LeaderImage src={placeholderImage} alt="CEO Headshot" />
          <LeaderName>Crissy</LeaderName>
          <LeaderTitle>Board Certified Behavior Analyst</LeaderTitle>
        </LeaderCard>

        <LeaderCard>
          <LeaderImage src={placeholderImage} alt="Clinical Director Headshot" />
          <LeaderName>Tereva Ruffin</LeaderName>
          <LeaderTitle>Clinical Director</LeaderTitle>
        </LeaderCard>

        <LeaderCard>
          <LeaderImage src={placeholderImage} alt="Program Manager Headshot" />
          <LeaderName>Shruthi</LeaderName>
          <LeaderTitle>ABA Program Manager</LeaderTitle>
        </LeaderCard>

        <LeaderCard>
          <LeaderImage src={placeholderImage} alt="Operations Headshot" />
          <LeaderName>Karen</LeaderName>
          <LeaderTitle>Director of Operations</LeaderTitle>
        </LeaderCard>
      </LeadersGrid>
    </LeadershipSection>
  );
};

export default Leadership;
