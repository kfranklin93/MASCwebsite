import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import local images from assets folder
import therapyImg1 from "../assets/1000_F_83739914_Xjmfwl1ciDBpvY1hWcLP3duxCjrb4ApR.jpg";
import therapyImg2 from "../assets/240_F_514402397_cg6glVmYSAlV6fEn9WQQw9SnTwAvnWik.jpg";
import therapyImg3 from "../assets/240_F_781376730_RI9jRBXMJmAhB3PQL53J6mUEElbzYTFu.jpg";

// Stock images for ABA Therapy
const slides = [
  { id: 1, image: therapyImg1, text: "Personalized One-on-One Therapy" },
  { id: 2, image: therapyImg3, text: "Helping Children Reach Their Full Potential" },
  { id: 3, image: therapyImg2, text: "Learning Through Play-Based Interventions" },
];

const HeroContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const SlideImage = styled(motion.img)`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
`;

const SlideText = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  return (
    <HeroContainer>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} style={{ position: "relative" }}>
            <SlideImage
              src={slide.image}
              alt={slide.text}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <SlideText
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {slide.text}
            </SlideText>
          </div>
        ))}
      </Slider>
    </HeroContainer>
  );
};

export default HeroSlider;
