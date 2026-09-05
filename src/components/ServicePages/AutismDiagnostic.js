import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import diagnosticImage from "../../assets/music-4.jpg";

const PageContainer = styled.div`
  padding: 120px 2rem 4rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;

  &::before {
    content: "";
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
  background: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  border-left: 4px solid #cd1b1b;
  border-right: 4px solid #4a90e2;
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
  border-top: 3px solid #ffd700;
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
    content: "";
    position: absolute;
    inset: -10%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.4)
    );
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 15px;
    border: 3px solid #4a90e2;
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
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid #4a90e2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureTitle = styled.h2`
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
  background: ${(props) => (props.secondary ? "#E3F2FD" : "#4A90E2")};
  color: ${(props) => (props.secondary ? "#4A90E2" : "#FFFFFF")};
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  border: 2px solid #4a90e2;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    background: ${(props) => (props.secondary ? "#4A90E2" : "#CD1B1B")};
    color: #ffffff;
    box-shadow: 0 6px 15px rgba(74, 144, 226, 0.3);
  }
`;

const AutismDiagnostic = () => {
  const features = [
    {
      title: "Comprehensive Assessment",
      description:
        "Thorough evaluation using gold-standard diagnostic tools and methods.",
    },
    {
      title: "Expert Team",
      description:
        "Experienced professionals specializing in autism spectrum disorders.",
    },
    {
      title: "Family-Centered",
      description:
        "Support and guidance for families throughout the diagnostic process.",
    },
    {
      title: "Detailed Reporting",
      description:
        "Clear, actionable reports with specific recommendations and next steps.",
    },
  ];

  return (
    <PageContainer>
      <ContentWrapper>
        <Section>
          <Title>Assessments & Referrals</Title>

          <SplitLayout>
            <TextContent>
              <Description>
                <p>
                  Our comprehensive autism assessments and referral services are
                  grounded in evidence-based practices and designed to provide
                  clear, actionable insights. We understand that navigating the
                  diagnostic journey can feel overwhelming, and we’re here to
                  support you with care, clarity, and compassion every step of
                  the way.
                </p>
              </Description>
              <Description>
                Our experienced team uses a combination of standardized
                assessments, clinical observations, and parent input to provide
                accurate diagnoses. We take the time to understand your child's
                unique strengths and challenges.
              </Description>
              <Description>
                Following the evaluation, we provide detailed recommendations
                and connect families with appropriate resources and support
                services. Our goal is to help you understand your child's needs
                and access the right interventions.
              </Description>
            </TextContent>
            <ImageContainer>
              <img src={diagnosticImage} alt="Diagnostic Assessment Session" />
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
            <Button to="/contact">Schedule an Evaluation</Button>
            <Button to="/what-to-expect" secondary>
              Learn More
            </Button>
          </ButtonContainer>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AutismDiagnostic;
