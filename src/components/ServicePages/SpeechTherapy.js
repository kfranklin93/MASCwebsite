import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme, mixins } from '../../styles/theme';
import speechImage from "../../assets/sensory.jpg"; // Update with actual speech therapy image
import terevaLogo from "../../assets/HHSLP Logo.png"; // **ASSUMPTION:** You'll have a logo for Tereva here
import ruffin from "../../assets/TRuffin Background Removed.png"; // Assuming this is Tereva's image based on your provided code


const PageContainer = styled.div`
  padding: 120px 2rem 4rem;
  min-height: 100vh;
  background: ${theme.gradients.primary};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.background.overlay};
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Section = styled.div`
  background: ${theme.colors.background.primary};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: ${mixins.cardShadow};
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  border-left: 4px solid ${theme.colors.primary.red};
  border-right: 4px solid ${theme.colors.primary.blue};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.primary.green};
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
  background: ${theme.gradients.card};
  box-shadow: ${mixins.cardShadow};
  border-top: 3px solid ${theme.colors.primary.yellow};
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${theme.colors.text.primary};
  margin-bottom: 1.5rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -10%;
    background: ${theme.gradients.overlay};
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 15px;
    border: 3px solid ${theme.colors.primary.blue};
    box-shadow: ${mixins.cardShadow};

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
  background: ${theme.colors.background.secondary};
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid ${theme.colors.primary.blue};
  box-shadow: ${mixins.cardShadow};
  transition: ${mixins.transition};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureTitle = styled.h3`
  color: ${theme.colors.primary.green};
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
  background: ${props => props.secondary ? theme.colors.secondary.lightBlue : theme.colors.primary.blue};
  color: ${props => props.secondary ? theme.colors.primary.blue : theme.colors.text.light};
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  border: 2px solid ${theme.colors.primary.blue};
  transition: ${mixins.transition};
  box-shadow: ${mixins.buttonShadow};

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.secondary ? theme.colors.primary.blue : theme.colors.primary.red};
    color: ${theme.colors.text.light};
    box-shadow: 0 6px 15px rgba(74, 144, 226, 0.3);
  }
`;

// Partner Styles
const PartnerSection = styled.div`
  margin-top: 2rem; /* Adjusted margin as it's now inside AsideContainer */
  text-align: center;
`;

const PartnerTitle = styled.h2`
  font-size: 2rem;
  color: ${theme.colors.primary.green};
  margin-bottom: 2rem;
  font-family: "Nunito", sans-serif;
`;

const PartnerCard = styled.div`
  width: 280px; /* Adjusted slightly for more prominent partner display */
  text-align: center;
  background: ${theme.colors.background.secondary};
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: ${mixins.cardShadow};
  margin: 0 auto; /* Center the card */
  border-bottom: 5px solid ${theme.colors.primary.red};

  @media (max-width: 768px) {
    width: 220px;
  }

  @media (max-width: 480px) {
    width: 180px;
  }
`;

const PartnerImageWrapper = styled.div`
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
  border: 3px solid ${theme.colors.primary.blue}; /* Added border */

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

const PartnerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
`;

const PartnerName = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 1.3rem; /* Slightly larger for prominence */
  margin-top: 0.75rem;
  color: ${theme.colors.primary.blue}; /* Changed color */

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const PartnerTitleText = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 1rem; /* Space before website link */

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const PartnerWebsiteLink = styled.a`
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  color: ${theme.colors.primary.red};
  text-decoration: none;
  font-weight: bold;
  transition: ${mixins.transition};

  &:hover {
    color: ${theme.colors.secondary.lightBlue};
    text-decoration: underline;
  }
`;

const CredentialBadge = styled.div`
  background: ${theme.colors.primary.yellow};
  color: ${theme.colors.text.dark};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 0.75rem;
  display: inline-block; /* To center it horizontally if needed */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PartnerLogoContainer = styled.div`
  width: 100%;
  height: 80px; /* Adjust as needed for logo size */
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
  border-radius: 10px;
  overflow: hidden; /* Ensure logo doesn't spill */
  box-shadow: inset 0 0 5px rgba(0,0,0,0.05);

  img {
    max-width: 90%;
    max-height: 70px;
    object-fit: contain;
  }
`;
const MainContentAndAsideWrapper = styled.div`
  display: flex;
  gap: 3rem; /* Space between main content and aside */
  align-items: flex-start; /* Aligns items to the top */

  @media (max-width: 1024px) {
    flex-direction: column; /* Stack on tablets and smaller */
    align-items: center; /* Center items when stacked */
  }
`;

const MainContent = styled.div`
  flex: 3; /* Gives more space to the main content */
  min-width: 0; /* Prevents overflow issues with flex items */

  @media (max-width: 1024px) {
    width: 100%; /* Take full width when stacked */
  }
`;

const AsideContainer = styled.aside`
  flex: 1; /* Gives less space to the aside */
  min-width: 280px; /* Ensures the aside has a minimum width, matching PartnerCard's default */
  max-width: 350px; /* Prevents the aside from getting too wide */
  position: sticky; /* Makes it sticky as you scroll */
  top: 140px; /* Adjust sticky position based on your header height */
  padding: 1rem;
  background: ${theme.colors.background.primary};
  border-radius: 15px;
  box-shadow: ${mixins.cardShadow};
  border-left: 4px solid ${theme.colors.primary.yellow}; /* A subtle border for distinction */

  @media (max-width: 1024px) {
    position: static; /* Remove sticky behavior when stacked */
    width: 80%; /* Adjust width for better appearance when stacked */
    margin-top: 2rem; /* Add some space when stacked below main content */
    max-width: 400px; /* Cap max width for the stacked card */
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const SpeechTherapy = () => {
  const features = [
    {
      title: "Comprehensive Evaluations",
      description: "Detailed assessments of speech, language, and communication skills."
    },
    {
      title: "Individualized Treatment",
      description: "Customized therapy plans targeting specific communication goals."
    },
    {
      title: "Play-Based Therapy",
      description: "Engaging activities that make learning fun and natural."
    },
    {
      title: "Parent Collaboration",
      description: "Regular updates and home practice strategies for continued progress."
    }
  ];

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>Speech Therapy Services</Title> {/* Moved Title outside Section for broader scope */}
        
        <MainContentAndAsideWrapper>
          <MainContent>
            <Section>
              <SplitLayout>
                <TextContent>
                  <Description>
                    Our speech therapy program is designed to help children develop effective communication
                    skills and overcome speech-related challenges. We work with children of all ages and
                    abilities, using evidence-based techniques in a supportive environment.
                  </Description>
                  <Description>
                    Our licensed speech-language pathologists focus on improving articulation, language
                    comprehension, social communication, and fluency. We believe in making therapy engaging
                    and meaningful for each child.
                  </Description>
                  <Description>
                    Through a combination of structured activities and play-based learning, we help children
                    build the confidence they need to communicate effectively in all settings.
                  </Description>
                </TextContent>
                <ImageContainer>
                  <img src={speechImage} alt="Speech Therapy Session" />
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
                  Schedule an Evaluation
                </Button>
                <Button to="/what-to-expect" secondary>
                  Learn More
                </Button>
              </ButtonContainer>
            </Section>
          </MainContent>

          <AsideContainer>
            <PartnerSection>
              <PartnerTitle>Our Valued Partner</PartnerTitle>
              <PartnerCard>
                <PartnerImageWrapper>
                  <PartnerImage src={ruffin} alt="Tereva, Speech Pathologist" />
                </PartnerImageWrapper>
                <PartnerName>Tereva</PartnerName>
                <PartnerTitleText>Speech Pathologist</PartnerTitleText>
                <PartnerWebsiteLink href="https://www.helpinghandsspeechservices.com/" target="_blank" rel="noopener noreferrer">
                  Visit Helping Hands Speech Services
                </PartnerWebsiteLink>
                <PartnerLogoContainer>
                  <img src={terevaLogo} alt="Helping Hands Speech Services Logo" />
                </PartnerLogoContainer>
                <CredentialBadge>CCC-SLP</CredentialBadge> {/* Example credential badge */}
              </PartnerCard>
            </PartnerSection>
          </AsideContainer>
        </MainContentAndAsideWrapper>

      </ContentWrapper>
    </PageContainer>
  );
};

export default SpeechTherapy;