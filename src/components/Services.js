import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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

  &:hover::before {
    left: 100%;
  }
`;

const HeaderTitle = styled(motion.h1)`
  font-size: 3.5rem;
  color: #cd1b1b;
  margin-bottom: 1rem;
  font-family: "Bubblegum Sans", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #cd1b1b, #ffd700);
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

const HeaderDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: #00695c;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  font-family: "Nunito", sans-serif;
`;

const ServiceList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
`;

const ServiceCard = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 500px;
  position: relative;
  overflow: visible;
  z-index: 1;
  border: 1px solid rgba(74, 144, 226, 0.1);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(74, 144, 226, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #cd1b1b, #4a90e2, #ffd700);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(74, 144, 226, 0.1), transparent);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
    z-index: 0;
    pointer-events: none;
  }

  &:hover::after {
    width: 500px;
    height: 500px;
  }
  
  /* Ensure child elements are above the ::after pseudo-element */
  > * {
    position: relative;
    z-index: 1;
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
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #ffd700;
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
    0% {
      border-color: #ff6f61;
    }
    25% {
      border-color: #ffeb3b;
    }
    50% {
      border-color: #4caf50;
    }
    75% {
      border-color: #2196f3;
    }
    100% {
      border-color: #9c27b0;
    }
  }
`;

const ServiceDescription = styled.div`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.8;
  flex-grow: 1;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  font-family: "Nunito", sans-serif;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  position: relative;
  z-index: 10;
  
  /* Ensure scrolling works on touch devices */
  -webkit-overflow-scrolling: touch;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    li {
      padding: 0.8rem 1rem;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(248, 249, 255, 0.9) 100%
      );
      border-radius: 12px;
      border-left: 4px solid #4a90e2;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      position: relative;
      font-weight: 500;

      &:hover {
        transform: translateX(8px);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(240, 248, 255, 1) 100%
        );
        border-left-color: #ffd700;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      }

      &:nth-child(even) {
        border-left-color: #cd1b1b;

        &:hover {
          border-left-color: #4a90e2;
        }
      }

      &:nth-child(3n) {
        border-left-color: #ffd700;

        &:hover {
          border-left-color: #cd1b1b;
        }
      }

      &::before {
        content: "";
        position: absolute;
        left: -4px;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 20px;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.8),
          transparent
        );
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

const GeneralServicesSection = styled(motion.section)`
  margin: 2rem 0;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.1);
  scroll-margin-top: 100px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

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
  color: #cd1b1b;
  margin-bottom: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    color: #4a90e2;
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
  display: grid;
  gap: 1rem;

  li {
    margin-bottom: 0;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border-left: 5px solid #4a90e2;
    position: relative;

    &:hover {
      transform: translateX(8px);
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      border-left-color: #ffd700;
    }

    &:nth-child(even) {
      border-left-color: #cd1b1b;

      &:hover {
        border-left-color: #4a90e2;
      }
    }

    &:nth-child(3n) {
      border-left-color: #ffd700;

      &:hover {
        border-left-color: #cd1b1b;
      }
    }

    strong {
      color: #00695c;
      font-weight: 600;
    }

    p {
      margin: 0.5rem 0 0 0;
      line-height: 1.7;
    }
  }
`;

const ServiceIcon = styled.span`
  display: inline-block;
  font-size: 1.5rem;
  margin-right: 0.75rem;
  vertical-align: middle;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;

  li:hover & {
    transform: scale(1.2) rotate(5deg);
  }
`;

// New styled component for highlighting the text
const HighlightedText = styled.span`
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.08) 0%, rgba(205, 27, 27, 0.08) 100%);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  color: #cd1b1b;
  border-left: 4px solid #4a90e2;
  display: inline-block;
  line-height: 1.6;
  font-style: italic;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Services = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSections, setOpenSections] = useState({
    general: false,
    autism: false,
  });
  const [isMobile, setIsMobile] = useState(false);
  
  const headerRef = useRef(null);
  const servicesListRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesListRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setIsMobile]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <PageBackground>
      <ServicesContainer as="main" role="main" aria-label="Our Services">
        <ContentWrapper>
          <SectionHeader
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <HeaderTitle
              id="services-heading"
              initial={{ opacity: 0, y: -20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
            >
              Our Services
            </HeaderTitle>
            <HeaderDescription
              initial={{ opacity: 0, y: -20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
            >
              Discover our comprehensive range of therapeutic and educational
              services designed to support your child's growth and development
              in a nurturing, engaging environment.
            </HeaderDescription>
            <HighlightedText>
              We do not offer stand-alone speech therapy services.
            </HighlightedText>
          </SectionHeader>

          <GeneralServicesSection
            id="general-services"
            aria-labelledby="general-services-heading"
          >
            <GeneralServiceTitle
              id="general-services-heading"
              onClick={() => toggleSection("general")}
              role="button"
              aria-expanded={openSections.general}
              aria-controls="general-services-content"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleSection("general");
                }
              }}
            >
              Behavioral & Educational Services{" "}
              <span aria-hidden="true">{openSections.general ? "▲" : "▼"}</span>
            </GeneralServiceTitle>
            <AnimatePresence>
              {openSections.general && (
                <motion.div
                  id="general-services-content"
                  role="region"
                  aria-labelledby="general-services-heading"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GeneralServiceList role="list">
                    <li>
                      <ServiceIcon aria-hidden="true">📋</ServiceIcon>
                      <strong>Assessments & Referrals</strong>
                    </li>
                    <li>
                      <ServiceIcon aria-hidden="true">🧩</ServiceIcon>
                      <strong>Occupational Therapy</strong>
                    </li>
                    <li>
                      <ServiceIcon aria-hidden="true">🔍</ServiceIcon>
                      <p>
                        <HighlightedText>
                          While we do not provide formal diagnostic evaluations,
                          we offer comprehensive assessments for children who
                          have already received a diagnosis from a licensed
                          psychiatrist or psychologist.
                        </HighlightedText>
                        <br /><br />
                        Our thorough assessments help us develop individualized
                        ABA therapy plans tailored to each child's unique
                        strengths, needs, and developmental goals.
                      </p>
                    </li>
                    <li>
                      <ServiceIcon aria-hidden="true">👥</ServiceIcon>
                      <strong>1:1 Therapy Tailored to Your Child's Needs</strong>
                    </li>
                    <li>
                      <ServiceIcon aria-hidden="true">🏢</ServiceIcon>
                      <strong>Center-Based ABA Therapy</strong>
                    </li>
                    <li>
                      <ServiceIcon aria-hidden="true">👨‍👩‍👧</ServiceIcon>
                      <strong>Parent Training</strong>
                    </li>
                    <li>
                      <ServiceIcon aria-hidden="true">🎓</ServiceIcon>
                      <strong>Pre-K Readiness Programs</strong>
                    </li>
                    <li>
                      <ServiceIcon aria-hidden="true">📊</ServiceIcon>
                      <strong>Daily Progress Monitoring and Goal Tracking</strong>
                    </li>
                  </GeneralServiceList>
                </motion.div>
              )}
            </AnimatePresence>
          </GeneralServicesSection>

          <GeneralServicesSection
            id="autism-diagnostic"
            aria-labelledby="autism-diagnostic-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <GeneralServiceTitle
              id="autism-diagnostic-heading"
              onClick={() => toggleSection("autism")}
              role="button"
              aria-expanded={openSections.autism}
              aria-controls="autism-diagnostic-content"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleSection("autism");
                }
              }}
            >
              Assessments & Referrals <span aria-hidden="true">{openSections.autism ? "▲" : "▼"}</span>
            </GeneralServiceTitle>
            <AnimatePresence>
              {openSections.autism && (
                <motion.div
                  id="autism-diagnostic-content"
                  role="region"
                  aria-labelledby="autism-diagnostic-heading"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GeneralServiceList role="list">
                  <li>
  <strong>Compassionate Assessments:</strong> We provide in-depth, personalized 
  assessments in a supportive environment for children who have already received 
  an autism diagnosis. We understand the emotional journey families are on and meet
   them with care and clarity.
</li>

                    <li>
                      <strong>Experienced Team:</strong> Our services are led by
                      a highly qualified psychologist, combining compassion with
                      clinical expertise to guide families toward a clear path
                      forward.
                    </li>
                    <li>
                      <strong>Personalized Approach:</strong> Recognizing that
                      every child is unique, we tailor our evaluations to
                      reflect individual needs and developmental stages.
                    </li>
                    <li>
                      <strong>Comprehensive Process:</strong> Our diagnostic
                      process includes developmental monitoring, screening
                      tools, clinical interviews, and history-taking to ensure a
                      holistic understanding of your child's needs.
                    </li>
                  </GeneralServiceList>
                </motion.div>
              )}
            </AnimatePresence>
          </GeneralServicesSection>

          <ServiceList
            ref={servicesListRef}
            className={isMobile ? "mobile-layout" : "desktop-layout"}
            role="list"
            aria-label="Therapeutic and educational services"
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
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
              <ServiceCard
                key={index}
                role="listitem"
                aria-labelledby={`service-title-${index}`}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <ServiceImage
                  src={service.img}
                  alt={`${service.title} - Click to enlarge image`}
                  onClick={() => setSelectedImage(service.img)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedImage(service.img);
                    }
                  }}
                  loading="lazy"
                />
                <ServiceTitle id={`service-title-${index}`}>{service.title}</ServiceTitle>
                <ServiceDescription>
                  <ul aria-label={`Benefits of ${service.title}`}>
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
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setSelectedImage(null);
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-label="Enlarged image view"
                tabIndex={-1}
              >
                <EnlargedImage
                  src={selectedImage}
                  alt="Enlarged view of service image - Press Escape to close"
                />
              </EnlargedImageOverlay>
            )}
          </AnimatePresence>
        </ContentWrapper>
      </ServicesContainer>
    </PageBackground>
  );
};

export default Services;
