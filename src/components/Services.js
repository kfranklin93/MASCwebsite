import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import stimulationFavImg from "../assets/stimulationFav-6.jpg";
import manipulativesImg from "../assets/manipulatives-final.jpg";
import artsImg from "../assets/arts-5.jpg";
import dramaticPlayImg from "../assets/dramaticPlay-2.jpg";
import transportationImg from "../assets/transportation-3.jpg";
import sensoryImg from "../assets/sensory-Enhanced-SR-1.jpg";
import musicImg from "../assets/music-4.jpg";
import grassroomFrontImg from "../assets/grassroomFront.jpg";
import leappadImg from "../assets/stimulationFav-6.jpg";

const PageBackground = styled.div`
  background: linear-gradient(135deg, #f3f9f9 0%, #ffffff 50%, #e8fdf5 100%);
  padding: 2rem 0;
  min-height: 100vh;
`;

const ServicesContainer = styled.section`
  width: 100%;
  max-width: 100vw;
  background: linear-gradient(to right, #f3f9f9, #ffffff);
  padding: 3rem 0;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  font-size: 3.5rem;
  color: #CD1B1B;
  margin-bottom: 1rem;
  font-family: "Bubblegum Sans", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderDescription = styled.p`
  font-size: 1.2rem;
  color: #00695c;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: "Nunito", sans-serif;
`;

const ServiceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
`;

const ServiceCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 25px;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 500px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 1px solid rgba(74, 144, 226, 0.1);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(74, 144, 226, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #CD1B1B, #4A90E2, #FFD700);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  color: #00695c;
  margin: 1rem 0;
  font-family: "Bubblegum Sans", sans-serif;
  text-align: center;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #FFD700;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, border 0.3s ease;
  border: 6px solid #ff6f61;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    border-color: #f3a847;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    border: 6px dashed #ffeb3b;
    animation: rainbow-border 1.5s infinite;
  }

  @keyframes rainbow-border {
    0% { border-color: #ff6f61; }
    25% { border-color: #ffeb3b; }
    50% { border-color: #4caf50; }
    75% { border-color: #2196f3; }
    100% { border-color: #9c27b0; }
  }
`;

const ServiceDescription = styled.div`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.8;
  flex-grow: 1;
  max-height: 200px;
  overflow-y: auto;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  font-family: "Nunito", sans-serif;
  box-shadow: inset  0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    li {
      padding: 0.8rem 1rem;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 255, 0.9) 100%);
      border-radius: 12px;
      border-left: 4px solid #4A90E2;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      position: relative;
      font-weight: 500;

      &:hover {
        transform: translateX(8px);
        background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(240, 248, 255, 1) 100%);
        border-left-color: #FFD700;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      }

      &:nth-child(even) {
        border-left-color: #CD1B1B;
        
        &:hover {
          border-left-color: #4A90E2;
        }
      }

      &:nth-child(3n) {
        border-left-color: #FFD700;
        
        &:hover {
          border-left-color: #CD1B1B;
        }
      }

      &::before {
        content: '';
        position: absolute;
        left: -4px;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 20px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent);
        border-radius: 2px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover::before {
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    max-height: none;
    padding: 1rem;
    overflow-y: visible;

    ul {
      gap: 0.5rem;

      li {
        padding: 0.6rem 0.8rem;
        
        &:hover {
          transform: translateX(4px);
        }
      }
    }
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(74, 144, 226, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const EnlargedImageOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const EnlargedImage = styled.img`
  max-width: 90%;
  max-height: 80vh;
  border-radius: 10px;
`;

const GeneralServicesSection = styled.section`
  margin: 2rem 0;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.1);
  scroll-margin-top: 100px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const GeneralServiceTitle = styled.h2`
  font-size: 2.2rem;
  font-family: "Bubblegum Sans", sans-serif;
  color: #CD1B1B;
  margin-bottom: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    color: #4A90E2;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const GeneralServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  font-family: "Nunito", sans-serif;

  li {
    margin-bottom: 1.2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateX(5px);
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    strong {
      color: #00695c;
      font-weight: 600;
    }
  }
`;

// New styled component for highlighting the text
const HighlightedText = styled.span`
  background-color: #FFD700; /* Bright yellow/gold background */
  padding: 2px 5px;
  border-radius: 5px;
  font-weight: 600; /* Extra bold */
  color: #CD1B1B; /* Red text for contrast */
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  display: inline-block; /* Allows padding and shadow */
  line-height: 1.5; /* Ensures text aligns well within its line */
`;

const Services = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSections, setOpenSections] = useState({
    general: false,
    autism: false,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [setIsMobile]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <PageBackground>
      <ServicesContainer>
        <ContentWrapper>
          <SectionHeader>
            <HeaderTitle>Our Services</HeaderTitle>
            <HeaderDescription>
              Discover our comprehensive range of therapeutic and educational services designed to support your child's growth and development in a nurturing, engaging environment.
            </HeaderDescription>
            <HighlightedText>We do not offer stand-alone speech therapy services.</HighlightedText>
          </SectionHeader>

          <GeneralServicesSection id="general-services">
            <GeneralServiceTitle onClick={() => toggleSection("general")}>
              Behavioral & Educational Services {openSections.general ? "▲" : "▼"}
            </GeneralServiceTitle>
            <AnimatePresence>
              {openSections.general && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GeneralServiceList>
                    <li>Autism Diagnostic Services</li>
                    <li>Occupational Therapy</li>
                    <li>
                      <p>
                      <HighlightedText>Our Speech Therapy Services are exclusively offered as an integrated component of our comprehensive ABA Therapy programs.</HighlightedText> We believe that by combining speech therapy with ABA, we can provide a holistic approach that maximizes communication development within the broader context of your child's individualized treatment plan.
                      </p>
                    </li>
                    <li>1:1 Therapy Tailored to Your Child's Needs</li>
                    <li>Center-Based ABA Therapy</li>
                    <li>Parent Training</li>
                    <li>Pre-K Readiness Programs</li>
                    <li>Daily Progress Monitoring and Goal Tracking</li>
                  </GeneralServiceList>
                </motion.div>
              )}
            </AnimatePresence>
          </GeneralServicesSection>

          <GeneralServicesSection id="autism-diagnostic">
            <GeneralServiceTitle onClick={() => toggleSection("autism")}>
              Autism Diagnostic Services {openSections.autism ? "▲" : "▼"}
            </GeneralServiceTitle>
            <AnimatePresence>
              {openSections.autism && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GeneralServiceList>
                    <li>
                      <strong>Empathetic Assessments:</strong> We provide thorough and accurate evaluations in a supportive environment, understanding the emotional journey families undertake when seeking autism testing.
                    </li>
                    <li>
                      <strong>Experienced Team:</strong> Our services are led by a highly qualified psychologist, combining compassion with clinical expertise to guide families toward a clear path forward.
                    </li>
                    <li>
                      <strong>Personalized Approach:</strong> Recognizing that every child is unique, we tailor our evaluations to reflect individual needs and developmental stages.
                    </li>
                    <li>
                      <strong>Comprehensive Process:</strong> Our diagnostic process includes developmental monitoring, screening tools, clinical interviews, and history-taking to ensure a holistic understanding of your child's needs.
                    </li>
                  </GeneralServiceList>
                </motion.div>
              )}
            </AnimatePresence>
          </GeneralServicesSection>

          <ServiceList className={isMobile ? "mobile-layout" : "desktop-layout"}>
            {[
              {
                title: "Rock Walls & Leap Pads",
                img: leappadImg,
                desc: [
                  "Builds strength, coordination, and confidence.",
                  "Improves balance and agility through fun challenges.",
                  "Encourages goal-setting and perseverance.",
                ],
              },
              {
                title: "Dramatic Play",
                img: dramaticPlayImg,
                desc: [
                  "Improves language and storytelling skills.",
                  "Encourages social-emotional development through pretend play.",
                  "Encourages imaginative play and creativity.",
                  "Supports social, emotional, and cognitive development.",
                  "Helps children practice problem-solving and communication skills.",
                  "Promotes teamwork and role-playing.",
                ],
              },
              {
                title: "Grass Room",
                img: grassroomFrontImg,
                desc: [
                  "Provides a natural environment for relaxation and play.",
                  "Supports balance, coordination, and teamwork.",
                  "Encourages outdoor exploration in a safe space.",
                ],
              },
              {
                title: "Manipulatives",
                img: manipulativesImg,
                desc: [
                  "Teaches parents ABA strategies for home reinforcement.",
                  "Helps children generalize skills across different settings.",
                  "Improves problem-solving and independence.",
                ],
              },
              {
                title: "Arts & Crafts",
                img: artsImg,
                desc: [
                  "Encourages creativity and self-expression in a structured environment.",
                  "Improves fine motor skills through activities like cutting, coloring, and painting.",
                  "Enhance hand-eye coordination and spatial awareness.",
                  "Teaches patience, focus, and task completion by following step-by-step instruction.",
                  "Encourages independence and responsibility through organizing and cleaning up.",
                ],
              },
              {
                title: "Stimulation Play",
                img: stimulationFavImg,
                desc: [
                  "Enhances communication and social skills through structured activities.",
                  "Encourages positive behavior reinforcement.",
                  "Provides a safe and nurturing learning environment.",
                ],
              },
              {
                title: "Music",
                img: musicImg,
                desc: [
                  "Encourages creative and self-expression through music.",
                  "Supports cognitive development, including memory, concentration, and problem-solving.",
                  "Enhance emotional regulation and stress relief.",
                  "Improves fine and gross motor skills through instrument play.",
                  "Promotes teamwork and collaboration during music sessions.",
                  "Builds cultural awareness and appreciation for different musical styles.",
                ],
              },
              {
                title: "Transportation Room",
                img: transportationImg,
                desc: [
                  "Encourages developmentally appropriate play to support motor, cognitive, and social skills.",
                  "Provides a structured environment for learning through hands-on activities.",
                  "Facilitates sensory exploration and regulation.",
                  "Promotes focus, attention, and problem-solving through task-oriented activities.",
                  "Support goal-oriented learning, such as improving fine motor skills or spatial awareness.",
                  "Develops motor coordination and spatial awareness.",
                  "Encourages imaginative role-playing scenarios.",
                  "Strengthens problem-solving and teamwork.",
                ],
              },
              {
                title: "Sensory Play",
                img: sensoryImg,
                desc: [
                  "Helps children regulate sensory input in a safe and controlled environment.",
                  "Provides a calming space for de-escalation during moments of stress or overstimulation.",
                  "Improves self-regulation and emotional control.",
                  "Reduces anxiety and offers a space to decompress.",
                  "Promotes emotional well-being and builds confidence.",
                  "Teaches children to independently manage sensory needs using tools.",
                ],
              },
            ].map((service, index) => (
              <ServiceCard key={index}>
                <ServiceImage
                  src={service.img}
                  alt={service.title}
                  onClick={() => setSelectedImage(service.img)}
                />
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>
                  <ul>
                    {service.desc.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </ServiceDescription>
              </ServiceCard>
            ))}
          </ServiceList>

          <AnimatePresence>
            {selectedImage && (
              <EnlargedImageOverlay
                onClick={() => setSelectedImage(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EnlargedImage src={selectedImage} alt="Enlarged View" />
              </EnlargedImageOverlay>
            )}
          </AnimatePresence>
        </ContentWrapper>
      </ServicesContainer>
    </PageBackground>
  );
};

export default Services;