import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import playgroundImg from "../assets/IMG_5236.png";
import placeholderImage from "../assets/JTonos Background Removed.png";
import anthony from "../assets/Anthony-edited Background Removed.png";
import shruthi from "../assets/IMG_9536 Background Removed.png";

const MainLayout = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  min-height: 300px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    min-height: auto;
    gap: 2rem;
  }
`;

const AsideImageContainer = styled.div`
  position: relative;
  width: 800px;
  height: auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 90%;
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
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h2)`
  font-family: "Bubblegum Sans";
  font-size: 2.5rem;
  color: #dc1b1b;
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #dc1b1b, #FFD700);
    margin: 1rem auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  font-family: "Nunito", sans-serif;
  color: #333;
  margin: 1.5rem 0 0;
  padding: 0;
  line-height: 1.8;
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

const LeaderCard = styled(motion.div)`
  width: 250px;
  text-align: center;
  cursor: pointer;
  position: relative;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 160px;
  }
`;

const ImageWrapper = styled(motion.div)`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  position: relative;
  background: linear-gradient(135deg, #fff 0%, #f8f9ff 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #dc1b1b, #FFD700, #00695c);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  ${LeaderCard}:hover & {
    transform: scale(1.1) translateY(-10px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);

    &::before {
      opacity: 1;
    }
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

const LeaderImage = styled.img`
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  max-width: none;
  max-height: none;
  object-fit: contain;
  object-position: center;
  transform: scale(0.75);
  transition: transform 0.4s ease;
  filter: grayscale(0%);

  ${LeaderCard}:hover & {
    transform: scale(0.85);
    filter: grayscale(0%) brightness(1.1);
  }
`;

const LeaderName = styled(motion.h3)`
  font-family: "Nunito", sans-serif;
  font-size: 1.1rem;
  margin-top: 0.75rem;
  color: #000;
  font-weight: 700;
  transition: color 0.3s ease;

  ${LeaderCard}:hover & {
    color: #dc1b1b;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const LeaderTitle = styled(motion.p)`
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  color: #555;
  transition: color 0.3s ease;

  ${LeaderCard}:hover & {
    color: #00695c;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Leadership = () => {
  const leadershipRef = useRef(null);
  const isInView = useInView(leadershipRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <LeadershipSection ref={leadershipRef}>
      <MainLayout>
        <AsideImageContainer>
          <AsideImage src={playgroundImg} alt="Team Leadership" />
        </AsideImageContainer>
        <MainContent>
          <TextSection>
            <Title
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              Meet Our Team
            </Title>
            <Description
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              At Mommy Angel's Specialty Care & Autism Center, our leadership is
              grounded in the heart of service. We believe in leading with empathy,
              compassion, and a deep commitment to our families, team members, and the
              community. By empowering our staff, we nurture an environment where
              every child can thrive.
            </Description>
          </TextSection>
          <LeadersGrid
            as={motion.div}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
          <LeaderCard
            variants={cardVariants}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
              <ImageWrapper>
                <LeaderImage src={placeholderImage} alt="CEO Headshot" />
              </ImageWrapper>
              <LeaderName>Jordan</LeaderName>
              <LeaderTitle>Board Certified Behavior Analyst</LeaderTitle>
            </LeaderCard>

            <LeaderCard
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ImageWrapper>
                <LeaderImage src={shruthi} alt="Program Manager Headshot" />
              </ImageWrapper>
              <LeaderName>Shruthi</LeaderName>
              <LeaderTitle>Operations Manager</LeaderTitle>
            </LeaderCard>

            <LeaderCard
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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