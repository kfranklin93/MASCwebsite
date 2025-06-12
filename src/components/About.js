import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import placeholderImg from "../assets/IMG_6867.png";
import placeholderImg2 from "../assets/IMG_8886 2.png";
import Leadership from "../components/Leadership";

const AboutText = styled(motion.p)`
  font-size: clamp(1rem, 1.3vw, 1.3rem);
  color: #444;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
  line-height: 1.6;
  text-align: center;
`;

const textAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const Section = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ bg }) => bg || "transparent"};
  border: ${({ border }) => border || "transparent"};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #00695c;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
  text-align: center;
  width: 100%;
`;

const SplitLayout = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const TextColumn = styled.div`
  flex: 1;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 3;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -50%;
    width: 100%;
    height: 100%;
    // background: linear-gradient(to right, rgba(255, 255, 255, 0.95), transparent);
    z-index: -1;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
    
    &::before {
      right: 0;
      // background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), transparent);
    }
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    position: relative;
    z-index: 1;

    &:hover {
      transform: scale(1.02);
    }

    @media (max-width: 1024px) {
      height: 350px;
    }

    @media (max-width: 768px) {
      height: 300px;
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    &::before {
      left: 0;
      top: -20%;
      height: 150%;
      width: 100%;
      background: linear-gradient(to top, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 0.95) 100%);
    }
  }
`;

/* Our Story Section - Image on left, fade to right */
const OurStoryImageColumn = styled(ImageColumn)`
  height: auto;
  min-height: 100%;
  align-self: stretch;

  img {
    width: 100%;
    height: 100%;
    min-height: 500px;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    position: relative;
    z-index: 1;
    mask: 
      /* Top edge fade */
      linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%),
      /* Bottom edge fade */
      linear-gradient(to top, transparent 0%, white 5%, white 95%, transparent 100%),
      /* Left edge fade */
      linear-gradient(to right, transparent 0%, white 3%, white 97%, transparent 100%),
      /* Right edge fade */
      linear-gradient(to left, transparent 0%, white 3%, white 97%, transparent 100%);
    mask-composite: intersect;
    -webkit-mask: 
      linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%),
      linear-gradient(to top, transparent 0%, white 5%, white 95%, transparent 100%),
      linear-gradient(to right, transparent 0%, white 3%, white 97%, transparent 100%),
      linear-gradient(to left, transparent 0%, white 3%, white 97%, transparent 100%);
    -webkit-mask-composite: source-in;

    &:hover {
      transform: scale(1.02);
    }

    @media (max-width: 1024px) {
      min-height: 450px;
    }

    @media (max-width: 768px) {
      min-height: 400px;
    }
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   width: 50%;
  //   height: 100%;
  //   background: linear-gradient(to left, rgba(240, 248, 255, 0.9) 0%, rgba(240, 248, 255, 0.6) 50%, rgba(240, 248, 255, 0.3) 80%, transparent 100%);
  //   z-index: 2;
  //   pointer-events: none;
  // }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0; // ← changed from right for OurStoryImageColumn
    width: 100%;
    height: 100%;
    background: linear-gradient(to left, rgba(240, 248, 255, 0.9) 0%, rgba(240, 248, 255, 0.6) 50%, rgba(240, 248, 255, 0.3) 80%, transparent 100%);
    z-index: 2;
    pointer-events: none;

    @media (max-width: 768px) {
      background: linear-gradient(to top, rgba(240, 248, 255, 0.9), transparent); // ← new mobile-friendly gradient
    }
  }
`;

/* ABA Therapy Section - Image on right, fade to left */
const ABAImageColumn = styled(ImageColumn)`
  height: auto;
  min-height: 100%;
  align-self: stretch;

  img {
    width: 100%;
    height: 100%;
    min-height: 500px;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    position: relative;
    z-index: 1;
    mask: 
      /* Top edge fade */
      linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%),
      /* Bottom edge fade */
      linear-gradient(to top, transparent 0%, white 5%, white 95%, transparent 100%),
      /* Left edge fade */
      linear-gradient(to right, transparent 0%, white 3%, white 97%, transparent 100%),
      /* Right edge fade */
      linear-gradient(to left, transparent 0%, white 3%, white 97%, transparent 100%);
    mask-composite: intersect;
    -webkit-mask: 
      linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%),
      linear-gradient(to top, transparent 0%, white 5%, white 95%, transparent 100%),
      linear-gradient(to right, transparent 0%, white 3%, white 97%, transparent 100%),
      linear-gradient(to left, transparent 0%, white 3%, white 97%, transparent 100%);
    -webkit-mask-composite: source-in;

    &:hover {
      transform: scale(1.02);
    }

    @media (max-width: 1024px) {
      min-height: 450px;
    }

    @media (max-width: 768px) {
      min-height: 400px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.3) 80%, transparent 100%);
    z-index: 2;
    pointer-events: none;

    @media (max-width: 768px) {
      background: linear-gradient(to bottom, rgba(240, 248, 255, 0.9), transparent); // ← new mobile-friendly gradient
    }
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
  background: ${props => props.secondary ? '#00695c' : '#CD1B1B'};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: "Nunito", sans-serif;
  font-size: 1.1rem;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.secondary ? '#008577' : '#e62020'};
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Helper styled component for the highlighted text
// const StrongHighlight = styled.strong`
//   color: #CD1B1B; /* Use a prominent color from your palette */
//   font-weight: 800; /* Make it extra bold */
//   background-color: #FFFACD; /* A light, warm background to make it pop */
//   padding: 0 4px;
//   border-radius: 3px;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.1);
// `;

const About = () => (
  <main>
    {/* OUR STORY Section */}
    <Section bg="rgba(240, 248, 255, 0.9)" border="20px solid rgba(0, 128, 0, 0.5)">
      <SplitLayout>
        <OurStoryImageColumn>
          <img src={placeholderImg} alt="Our story" />
        </OurStoryImageColumn>
        <TextColumn>
  <SectionTitle>Our Story</SectionTitle>
  <AboutText initial="hidden" animate="visible" variants={textAnimation}>
    At Mommy Angel's Specialty Care and Autism Center, we provide a nurturing
    and supportive environment where children with autism can thrive. Our mission
    is to meet each child where they are, while offering the extra support needed
    to help them grow, learn, and feel confident in their progress.
  </AboutText>

  {/* Combined and emphasized paragraph */}
  <AboutText>
  As a proud sister program of{" "}
  <a
    href="https://mommyangelsdaycare.com"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#CD1B1B",
      fontWeight: "bold",
      textDecoration: "underline",
      backgroundColor: "#FFFACD",
      padding: "2px 5px",
      borderRadius: "3px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    }}
  >
    Mommy Angels Daycare
  </a>
  , our center is uniquely positioned to support the whole family. We understand
  the daily rhythm of parenting, and we're proud to offer{" "}
  <span
    style={{
      fontWeight: "bold",
      color: "#00695c",
    }}
  >
    thoughtful convenience
  </span>{" "}
  that makes a real difference. For families with multiple children, especially
  those whose siblings may not need ABA therapy but still thrive in a nurturing
  daycare setting, this connected approach can be a true{" "}
  <span
    style={{
      fontWeight: "bold",
      color: "#CD1B1B",
    }}
  >
    game changer
  </span>
  .
</AboutText>

<AboutText>
  Picture this: while your child receives compassionate, individualized ABA care
  with us, their siblings are just next door at Mommy Angels Daycare—surrounded by
  the same loving values and joyful energy. With one drop-off and pick-up
  location, your mornings feel more manageable, your schedule feels lighter, and
  your heart feels at ease.
</AboutText>

<AboutText>
  This integrated care model offers more than just{" "}
  <span
    style={{
      fontWeight: "bold",
      fontStyle: "italic",
      color: "#00695c",
    }}
  >
    simplified routines
  </span>
  —it creates a{" "}
  <span
    style={{
      fontWeight: "bold",
      backgroundColor: "#e6f4f1",
      padding: "2px 6px",
      borderRadius: "4px",
    }}
  >
    connected family experience
  </span>
  . Our angels often interact across both programs, building strong social skills,
  developing friendships, and spending time outdoors together in a safe,
  inclusive environment. To explore this unique blend of support and connection,
  visit{" "}
  <Button
    as="a"
    href="https://www.mommyangelsdaycare.com/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      whiteSpace: "nowrap",
      display: "inline-flex",
      verticalAlign: "middle",
      marginLeft: "5px",
    }}
  >
    MommyAngelsDaycare.com
  </Button>
  .
</AboutText>

  <AboutText>
    We also offer a specialized Readiness Program, featuring classrooms designed just like a Pre-K
    setting. This helps prepare your child for a smooth and successful
    transition into a traditional Pre-K classroom. At Mommy Angel's
    Specialty Care and Autism Center, we believe in socialization, not
    isolation. Your child will be supported, included, and celebrated
    every step of the way.
  </AboutText>
</TextColumn>
      </SplitLayout>
    </Section>

    {/* WHAT IS ABA THERAPY Section */}
    <Section border="20px solid rgba(255, 255, 0, 0.5)">
      <SplitLayout>
        <TextColumn>
          <SectionTitle>What is ABA Therapy?</SectionTitle>
          <AboutText
            initial="hidden"
            animate="visible"
            variants={textAnimation}
          >
            Applied Behavior Analysis (ABA) therapy helps children with autism
            develop essential skills, improve behavior, and achieve their full
            potential. Our therapists create individualized plans that are
            engaging and tailored to each child's needs.
          </AboutText>
          <AboutText>
            ABA focuses on positive reinforcement to encourage desirable
            behaviors, helping children develop independence and social skills.
            It is a structured and evidence-based approach tailored to each
            child's learning pace.
          </AboutText>
          <ButtonContainer>
            <Button to="/contact">
              Contact Us
            </Button>
            <Button to="/what-to-expect" secondary>
              What to Expect in ABA Therapy
            </Button>
          </ButtonContainer>
        </TextColumn>
        <ABAImageColumn>
          <img src={placeholderImg2} alt="ABA Therapy" />
        </ABAImageColumn>
      </SplitLayout>
    </Section>
    <Leadership />
  </main>
);

export default About;