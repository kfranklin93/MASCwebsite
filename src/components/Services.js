import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Import motion for animation
import roomsImg from "../assets/Group-12-scaled.png"; // Assuming this is the center's image

const ServicesContainer = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: auto;
  background: #f3f9f9;
  border-radius: 20px;
`;

const ServicesTitle = styled.h2`
  font-size: 3rem;
  color: #00670e;
  margin-bottom: 2.5rem;
  font-family: 'Bubblegum Sans', sans-serif;
  text-transform: uppercase;
`;

const ServiceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 3rem;
`;

const ServiceCard = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 25px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 320px; /* Set a fixed height for cards to avoid uneven rows */
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: linear-gradient(45deg, #f4d06f, #ff6f61);
    background: ${({ isYellow }) => (isYellow ? '#FFEB8A' : '#A3D39C')}; /* Soft yellow or green */

    opacity: 0.15;
    z-index: -1;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  color: #00670e;
  margin-bottom: 15px;
  font-weight: bold;
`;

// const ServiceDescription = styled.p`
//   font-size: 1.1rem;
//   color: #333;
//   line-height: 1.6;
//   text-overflow: ellipsis; /* Adds an ellipsis if text overflows */
//   display: -webkit-box;
//   // -webkit-line-clamp: 3; /* Limits the text to 3 lines */
//   -webkit-box-orient: vertical;
//   flex-grow: 1; /* Allows the description to expand naturally */
//   // overflow: hidden; /* Prevents text overflow */
// `;
const ServiceDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  flex-grow: 1; /* Allows the description to expand naturally */
  max-height: 150px; /* Set a maximum height for the description */
  overflow-y: auto; /* Enables vertical scrolling if the content exceeds the max-height */
  padding-right: 10px; /* Optional: Adds space to prevent the scrollbar from covering the text */
 
  /* Hide the scrollbar */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
  `;


const RoomImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  margin-bottom: 4rem;

  border-radius: 5px;
  // overflow: hidden;
`;

const RoomImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  width: 90%;
  object-fit: fill; /* Ensures the image covers the area without being stretched */
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Services = () => (
  <ServicesContainer>
    <ServicesTitle>Our Services</ServicesTitle>
    <RoomImageWrapper>
      <RoomImage 
        src={roomsImg} 
        alt="ABA Therapy Center" 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1.25 }}
        transition={{ duration: 0.5 }}
      />
    </RoomImageWrapper>
    <ServiceList>
      <ServiceCard isYellow>
        <ServiceTitle>Individualized Therapy Plans</ServiceTitle>
        <ServiceDescription>
          Every child is unique. We design customized ABA therapy plans based on each child's specific strengths, challenges, and developmental needs. Our approach is focused on improving communication, social skills, and reducing maladaptive behaviors.
        </ServiceDescription>
      </ServiceCard>

      <ServiceCard>
        <ServiceTitle>Parent Training and Support</ServiceTitle>
        <ServiceDescription>
          We believe in empowering parents as key members of the therapy team. Through our training, parents learn how to implement ABA strategies effectively at home, creating a consistent, supportive environment for their child’s growth.
        </ServiceDescription>
      </ServiceCard>

      <ServiceCard isYellow>
        <ServiceTitle>Behavioral Assessments</ServiceTitle>
        <ServiceDescription>
          Our comprehensive behavioral assessments identify specific needs, track progress, and guide treatment plans. These assessments provide valuable insights into your child’s behavior and how to best address it with evidence-based interventions.
        </ServiceDescription>
      </ServiceCard>

      <ServiceCard>
        <ServiceTitle>Social Skills Groups</ServiceTitle>
        <ServiceDescription>
          Group therapy sessions focus on enhancing peer interactions, communication, and social understanding. These groups help children develop appropriate social behaviors, practice social interactions, and build lasting friendships.
        </ServiceDescription>
      </ServiceCard>

      <ServiceCard isYellow>
        <ServiceTitle>School and Community Integration Support</ServiceTitle>
        <ServiceDescription>
          We work closely with schools and other community settings to ensure the successful integration of ABA strategies in daily life. Our goal is to help your child navigate social situations and transitions with confidence and ease.
        </ServiceDescription>
      </ServiceCard>

      <ServiceCard>
        <ServiceTitle>Functional Communication Training</ServiceTitle>
        <ServiceDescription>
          Our focus is on helping children communicate their needs and desires more effectively. Through structured teaching, we use a variety of methods, including sign language, communication boards, and speech therapy techniques.
        </ServiceDescription>
      </ServiceCard>
    </ServiceList>
  </ServicesContainer>
);

export default Services;

// // src/components/Services.js
// import React from 'react';
// import styled from 'styled-components';
// import { motion } from 'framer-motion'; // Import motion for animation
// import roomsImg from "../assets/Group-12-scaled.png";


// const ServicesContainer = styled.section`
//   text-align: center;
//   padding: 4rem 2rem;
//   max-width: 1200px;
//   margin: auto;
// `;


// const ServicesTitle = styled.h2`
//   font-size: 2.5rem;
//   color: #00670e;
//   margin-bottom: 2rem;
//   font-family: Bubblegum Sans, sans-serif;
// `;

// const ServiceList = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   gap: 20px;
//   margin-bottom: 3rem; /* Adds spacing between the service cards and the image */
// `;

// const ServiceCard = styled.div`
//   background: #fff;
//   border-radius: 12px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   padding: 20px;
//   width: 300px;
//   transition: transform 0.3s ease-in-out;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const ServiceTitle = styled.h3`
//   font-size: 1.5rem;
//   margin-bottom: 10px;
// `;

// const ServiceDescription = styled.p`
//   font-size: 1rem;
// `;

// const RoomImageWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 3rem; /* Ensures space between services and image */
// `;

// const RoomImage = styled(motion.img)`
//   max-width: 100%;
//   width: 80%;
//   height: auto;
//   margin-top: 40px;
//   border-radius: 12px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const Services = () => (
//   <ServicesContainer>
//     <ServicesTitle>Our Services</ServicesTitle>
//     <ServiceList>
//       <ServiceCard>
//         <ServiceTitle>Individualized Therapy Plans</ServiceTitle>
//         <ServiceDescription>Tailored to each child's needs.</ServiceDescription>
//       </ServiceCard>
//       <ServiceCard>
//         <ServiceTitle>Parent Training and Support</ServiceTitle>
//         <ServiceDescription>We empower parents with the tools they need.</ServiceDescription>
//       </ServiceCard>
//       <ServiceCard>
//         <ServiceTitle>Behavioral Assessments</ServiceTitle>
//         <ServiceDescription>In-depth assessments to measure progress.</ServiceDescription>
//       </ServiceCard>
//     </ServiceList>
//     <RoomImageWrapper>
//     <RoomImage 
//       src={roomsImg} 
//       alt="ABA Therapy Center" 
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1.25 }}
//       transition={{ duration: 0.5 }}
//     />
//     </RoomImageWrapper>
    
//   </ServicesContainer>
// );

// export default Services;
