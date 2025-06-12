import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme, mixins } from '../../styles/theme';
import speechImage from "../../assets/sensory.jpg"; // Update with actual speech therapy image

// Reuse the styled components from ABATherapy
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
        <Section>
          <Title>Speech Therapy Services</Title>
          
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
      </ContentWrapper>
    </PageContainer>
  );
};

export default SpeechTherapy;