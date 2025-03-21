import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import roomsImg from "../assets/Group-12-scaled.png";
import stimulationFavImg from "../assets/stimulationFav-6.jpg";
import manipulativesImg from "../assets/manipulatives-7.jpg";
import artsImg from "../assets/arts-5.jpg";
import dramaticPlayImg from "../assets/dramaticPlay-2.jpg";
import transportationImg from "../assets/transportation-3.jpg";
import sensoryImg from "../assets/sensory-Enhanced-SR-1.jpg";

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
  height: 380px;
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

const ServiceImage = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  flex-grow: 1;
  max-height: 100px;
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
        {[{title: "Individualized Therapy Plans", img: stimulationFavImg, desc: "Custom ABA therapy plans focusing on communication, social skills, and behavior."},
          {title: "Parent Training and Support", img: manipulativesImg, desc: "Empowering parents with ABA strategies to support their child at home."},
          {title: "Behavioral Assessments", img: artsImg, desc: "Comprehensive evaluations to track progress and tailor treatment plans."},
          {title: "Social Skills Groups", img: sensoryImg, desc: "Group therapy to improve peer interactions and build friendships."},
          {title: "School & Community Integration", img: transportationImg, desc: "Support for smooth transitions into school and social settings."},
          {title: "Functional Communication Training", img: dramaticPlayImg, desc: "Helping children express their needs through structured methods."}].map((service, index) => (
          <ServiceCard key={index}>
            <ServiceImage src={service.img} alt={service.title} onClick={() => setSelectedImage(service.img)} />
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.desc}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServiceList>
      <AnimatePresence>
        {selectedImage && (
          <EnlargedImageOverlay onClick={() => setSelectedImage(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EnlargedImage src={selectedImage} alt="Enlarged View" />
          </EnlargedImageOverlay>
        )}
      </AnimatePresence>
    </ServicesContainer>
  );
};

export default Services;