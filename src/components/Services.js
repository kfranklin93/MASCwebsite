import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
// import roomsImg from "../assets/Group-12-scaled.png";
import stimulationFavImg from "../assets/stimulationFav-6.jpg";
import manipulativesImg from "../assets/manipulatives-final.jpg";
import artsImg from "../assets/arts-5.jpg";
import dramaticPlayImg from "../assets/dramaticPlay-2.jpg";
import transportationImg from "../assets/transportation-3.jpg";
import sensoryImg from "../assets/sensory-Enhanced-SR-1.jpg";
import musicImg from "../assets/music-4.jpg";
import grassroomFrontImg from "../assets/grassroomFront.jpg";
import leappadImg from "../assets/stimulationFav-6.jpg";

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
  font-family: "Bubblegum Sans", sans-serif;
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
  height: 500px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  color: #00670e;
  margin-bottom: 15px;
  font-weight: bold;
`;

// const ServiceImage = styled.img`
//   width: 100%;
//   max-height: 150px;
//   object-fit: cover;
//   border-radius: 10px;
//   cursor: pointer;
// `;
// Fun border for the service image
const ServiceImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, border 0.3s ease;
  border: 6px solid #ff6f61; /* Playful coral-colored border */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    border-color: #f3a847; /* Change to a yellow-orange on hover */
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  }

  /* Add a rainbow border effect */
  &:hover {
    border: 6px dashed #ffeb3b; /* Bright yellow dashed border */
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

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  flex-grow: 1;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 10px;
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

const Services = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <ServicesContainer>
      <ServicesTitle>Our Services</ServicesTitle>
      <ServiceList>
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
              " Builds cultural awareness and appreciation for different musical styles.",
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
    </ServicesContainer>
  );
};

export default Services;
