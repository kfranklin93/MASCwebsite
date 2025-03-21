import React from "react";
import styled from "styled-components";
import HeroSlider from "./HeroSlider"; // Ensure to import your HeroSlider component
import { motion } from "framer-motion";

// Styled-components for your container
const AboutContainer = styled.section`
position: relative;
border-radius: 10px;
background-color: rgba(240, 248, 255, 0.9); /* Soft blue background */
padding: 40px 20px;
text-align: center;
margin: 1.5rem auto;
border-bottom: 8px solid #A0D9FF; /* Soft light blue border */
border-right: 8px solid #A3D39C; /* Soft green border */
border-top: 8px solid #FFEB8A; /* Soft yellow border */
border-left: 8px solid #FF9AA2; /* Soft pink border */
max-width: 1200px;
`;

const AboutContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AboutColumn = styled.div`
  flex: 1;
  text-align: left;
  padding: 1rem;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const AboutTitle = styled.h2`
font-size: 2.5rem;
color: #00695C; /* Calming teal color for title */
margin-bottom: 1.5rem;
font-family: "Poppins", sans-serif;
font-weight: 600;
text-transform: uppercase;
`;

const AboutText = styled(motion.p)`
font-size: 1.3rem;
color: #444; /* Slightly darker grey for better readability */
max-width: 800px;
margin: 0 auto 3rem;
font-family: "Poppins", sans-serif;
`;

const textAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

// Tooltip Styled Component (Defined First)
const Tooltip = styled.div`
  visibility: hidden;
  position: absolute;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 1rem;
  width: 150px;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

// Behavior Item Styled Component (With Tooltip Hover Functionality)
const BehaviorItem = styled.li`
  ffont-size: 1.5rem;
  color: #333;
  padding: 0.5rem 1rem;
  background: rgba(0, 35, 142, 0.2); /* Soft blue */
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;

  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`;

const BehaviorList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const BehaviorsSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 3rem;
// background-color: #E8F7FE; /* Soft light blue background */
padding: 2rem;
border-radius: 8px;
`;

const TestimonialContainer = styled.section`
margin-top: 3rem;
padding: 2rem;
// background-color: #F1F9FF; /* Light grey-blue background */
background-color: rgba(255, 255, 255, 0.8); /* Light grey-blue background */

border-radius: 8px;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
`;

const TestimonialCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin: 1rem auto;
  font-family: "Poppins", sans-serif;
  border-left: 5px solid #00897b; /* Calming teal border */
`;

const TestimonialQuote = styled.p`
  font-style: italic;
  color: #333;
  margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #8bc34a; /* Soft green color */
`;

const TestimonialRole = styled.p`
  color: #777;
  font-size: 1rem;
`;

const About = () => (
  <AboutContainer>
    <HeroSlider /> {/* Add the Hero Slider here */}

    {/* About Section - Two Columns */}
    <AboutContentWrapper>
      {/* Column 1 - What is ABA Therapy? */}
      <AboutColumn>
        <AboutTitle>What is ABA Therapy?</AboutTitle>
        <AboutText initial="hidden" animate="visible" variants={textAnimation}>
          Applied Behavior Analysis (ABA) therapy helps children with autism develop essential skills, 
          improve behavior, and achieve their full potential. Our therapists create individualized plans 
          that are engaging and tailored to each child’s needs.
        </AboutText>
        <AboutText>
          ABA focuses on positive reinforcement to encourage desirable behaviors, helping children develop 
          independence and social skills. It is a structured and evidence-based approach tailored to each 
          child's learning pace.
        </AboutText>
      </AboutColumn>

      {/* Column 2 - What behaviors can ABA Therapy help with? */}
      <AboutColumn>
        <AboutTitle>What behaviors can ABA Therapy help with?</AboutTitle>
        <BehaviorsSection>
          <BehaviorList>
            <BehaviorItem>
              Communication Skills
              <Tooltip>Improves verbal and non-verbal communication skills.</Tooltip>
            </BehaviorItem>
            <BehaviorItem>
              Social Skills
              <Tooltip>Helps with understanding social cues and interactions.</Tooltip>
            </BehaviorItem>
            <BehaviorItem>
              Self-Regulation
              <Tooltip>Supports emotional control and behavior regulation.</Tooltip>
            </BehaviorItem>
            <BehaviorItem>
              Daily Living Skills
              <Tooltip>Teaches essential skills for everyday independence.</Tooltip>
            </BehaviorItem>
            <BehaviorItem>
              Emotional Management
              <Tooltip>Helps children recognize and manage emotions.</Tooltip>
            </BehaviorItem>
            <BehaviorItem>
              Focus & Attention
              <Tooltip>Improves the ability to focus and stay engaged.</Tooltip>
            </BehaviorItem>
          </BehaviorList>
        </BehaviorsSection>
      </AboutColumn>
    </AboutContentWrapper>

    {/* Testimonials Section */}
    <TestimonialContainer>
      <AboutTitle>What Parents & Therapists Are Saying</AboutTitle>
      <TestimonialCard>
        <TestimonialQuote>
          "ABA therapy has been a game-changer for my child. They’ve made significant progress in communication
          and social interactions. It’s incredible to see the transformation!"
        </TestimonialQuote>
        <TestimonialAuthor>Jane D.</TestimonialAuthor>
        <TestimonialRole>Parent of a child with autism</TestimonialRole>
      </TestimonialCard>

      <TestimonialCard>
        <TestimonialQuote>
          "As a therapist, I’ve witnessed firsthand how ABA helps children become more independent, improving 
          their social skills and emotional regulation."
        </TestimonialQuote>
        <TestimonialAuthor>Michael S.</TestimonialAuthor>
        <TestimonialRole>Board Certified Behavior Analyst (BCBA)</TestimonialRole>
      </TestimonialCard>

      <TestimonialCard>
        <TestimonialQuote>
          "ABA therapy gave me the tools to better understand and manage my emotions. It has made a huge difference in my life."
        </TestimonialQuote>
        <TestimonialAuthor>Amy R.</TestimonialAuthor>
        <TestimonialRole>Teen benefiting from ABA therapy</TestimonialRole>
      </TestimonialCard>
    </TestimonialContainer>
  </AboutContainer>
);

export default About;

// import React, { useState } from "react";
// import styled from "styled-components";
// import HeroSlider from "./HeroSlider"; // Ensure to import your HeroSlider component
// import { motion } from 'framer-motion';

// // Styled-components for your container
// const AboutContainer = styled.section`
//   position: relative;
//   border-radius: 10px;
//   background-color: rgba(104, 115, 176, 0.08);
//   padding: 40px 20px;
//   text-align: center;
//   margin: 4rem auto;
//   padding: 2rem;
//   border-bottom: 10px solid rgb(255, 43, 43, 0.8); /* Red top border */
//   border-right: 10px solid #00670e; /* Green left border */
//   border-top: 10px solid #fbff00; /* Yellow right border */
//   border-left: 10px solid rgb(0, 0, 255, 0.6); /* Blue bottom border */
// `;

// const AboutContentWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     text-align: center;
//   }
// `;

// const AboutColumn = styled.div`
//   flex: 1;
//   text-align: left;
// `;

// const AboutTitle = styled.h2`
//   font-size: 2.5rem;
//   color: #00670e;
//   margin-bottom: 1.5rem;
//   font-family: Bubblegum Sans, sans-serif;
// `;

// // Motion styled component for AboutText
// const AboutText = styled(motion.p)`
//   font-size: 1.2rem;
//   color: #333;
//   max-width: 800px;
//   margin: 0 auto 3rem;
// `;

// const textAnimation = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 1 } },
// };

// // Tooltip Styled Component (Defined First)
// const Tooltip = styled.div`
//   visibility: hidden;
//   position: absolute;
//   background-color: #333;
//   color: white;
//   text-align: center;
//   padding: 5px;
//   border-radius: 5px;
//   z-index: 1;
//   opacity: 0;
//   transition: opacity 0.3s;
//   font-size: 1rem;
//   width: 150px;
//   bottom: 100%;
//   left: 50%;
//   transform: translateX(-50%);
// `;

// // Behavior Item Styled Component (With Tooltip Hover Functionality)
// const BehaviorItem = styled.li`
//   font-size: 1.5rem;
//   color: #333;
//   padding: 0.5rem 1rem;
//   background: rgba(0, 35, 142, 0.2);
//   border-radius: 8px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   position: relative;
//   cursor: pointer;

//   &:hover ${Tooltip} {
//     visibility: visible;
//     opacity: 1;
//   }
// `;

// const BehaviorList = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 2rem;
//   justify-content: center;
// `;

// const BehaviorsSection = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 3rem;
// `;

// const TestimonialContainer = styled.section`
//   margin-top: 3rem;
//   padding: 2rem;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
// `;

// const TestimonialCard = styled.div`
//   background-color: #fff;
//   padding: 1.5rem;
//   border-radius: 8px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//   margin-bottom: 1.5rem;
//   max-width: 600px;
//   margin: 1rem auto;
// `;

// const TestimonialQuote = styled.p`
//   font-style: italic;
//   color: #333;
//   margin-bottom: 1rem;
// `;

// const TestimonialAuthor = styled.h4`
//   font-size: 1.2rem;
//   font-weight: 600;
//   color: #00670e;
// `;

// const TestimonialRole = styled.p`
//   color: #777;
//   font-size: 1rem;
// `;
// const About = () => (

//   <AboutContainer>
//     <HeroSlider /> {/* Add the Hero Slider here */}

//     {/* About Section - Two Columns */}
//     <AboutContentWrapper>
//       {/* Column 1 - What is ABA Therapy? */}
//       <AboutColumn>
//         <AboutTitle>What is ABA Therapy?</AboutTitle>
//         <AboutText initial="hidden" animate="visible" variants={textAnimation}>
//           Applied Behavior Analysis (ABA) therapy helps children with autism develop essential skills, 
//           improve behavior, and achieve their full potential. Our therapists create individualized plans 
//           that are engaging and tailored to each child’s needs.
//         </AboutText>
//         <AboutText>
//           ABA focuses on positive reinforcement to encourage desirable behaviors, helping children develop 
//           independence and social skills. It is a structured and evidence-based approach tailored to each 
//           child's learning pace.
//         </AboutText>
//       </AboutColumn>

//       {/* Column 2 - What behaviors can ABA Therapy help with? */}
//       <AboutColumn>
//         <AboutTitle>What behaviors can ABA Therapy help with?</AboutTitle>
//         <BehaviorsSection>
//           <BehaviorList>
//             <BehaviorItem>
//               Communication Skills
//               <Tooltip>Improves verbal and non-verbal communication skills.</Tooltip>
//             </BehaviorItem>
//             <BehaviorItem>
//               Social Skills
//               <Tooltip>Helps with understanding social cues and interactions.</Tooltip>
//             </BehaviorItem>
//             <BehaviorItem>
//               Self-Regulation
//               <Tooltip>Supports emotional control and behavior regulation.</Tooltip>
//             </BehaviorItem>
//             <BehaviorItem>
//               Daily Living Skills
//               <Tooltip>Teaches essential skills for everyday independence.</Tooltip>
//             </BehaviorItem>
//             <BehaviorItem>
//               Emotional Management
//               <Tooltip>Helps children recognize and manage emotions.</Tooltip>
//             </BehaviorItem>
//             <BehaviorItem>
//               Focus & Attention
//               <Tooltip>Improves the ability to focus and stay engaged.</Tooltip>
//             </BehaviorItem>
//           </BehaviorList>
//         </BehaviorsSection>
//       </AboutColumn>
//     </AboutContentWrapper>
//   {/* Testimonials Section */}
//   <TestimonialContainer>
//       <AboutTitle>What Parents & Therapists Are Saying</AboutTitle>
//       <TestimonialCard>
//         <TestimonialQuote>
//           "ABA therapy has been a game-changer for my child. They’ve made significant progress in communication
//           and social interactions. It’s incredible to see the transformation!"
//         </TestimonialQuote>
//         <TestimonialAuthor>Jane D.</TestimonialAuthor>
//         <TestimonialRole>Parent of a child with autism</TestimonialRole>
//       </TestimonialCard>

//       <TestimonialCard>
//         <TestimonialQuote>
//           "As a therapist, I’ve witnessed firsthand how ABA helps children become more independent, improving 
//           their social skills and emotional regulation."
//         </TestimonialQuote>
//         <TestimonialAuthor>Michael S.</TestimonialAuthor>
//         <TestimonialRole>Board Certified Behavior Analyst (BCBA)</TestimonialRole>
//       </TestimonialCard>

//       <TestimonialCard>
//         <TestimonialQuote>
//           "ABA therapy gave me the tools to better understand and manage my emotions. It has made a huge difference in my life."
//         </TestimonialQuote>
//         <TestimonialAuthor>Amy R.</TestimonialAuthor>
//         <TestimonialRole>Teen benefiting from ABA therapy</TestimonialRole>
//       </TestimonialCard>
//     </TestimonialContainer>
//   </AboutContainer>

// );

// export default About;
