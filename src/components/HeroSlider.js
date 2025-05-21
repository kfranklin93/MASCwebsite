import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import local images from assets folder
import therapyImg1 from "../assets/IMG_7213.png";
import therapyImg2 from "../assets/IMG_7185.png";
import therapyImg3 from "../assets/IMG_7205.png";

// Stock images for ABA Therapy
const slides = [
  { id: 1, image: therapyImg1, text: "Personalized One-on-One Therapy" },
  { id: 2, image: therapyImg3, text: "Helping Children Reach Their Full Potential" },
  { id: 3, image: therapyImg2, text: "Learning Through Play-Based Interventions" },
];

// const HeroContainer = styled.section`
//   width: 100%;
//   max-width: 1200px;
//   margin: auto;
//   position: relative;
//   overflow: hidden;
//   border-radius: 12px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
// `;
const HeroContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  height: 300px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
  background-color: #e6f4ff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

// const SlideImage = styled(motion.img)`
//   // width: 80%;
//   // height: 400px;
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
//   object-position: center;

//   border-radius: 12px;
// `;

// const SlideImage = styled(motion.img)`
//   max-height: 100%;
//   max-width: 100%;
//   object-fit: cover;
//   object-position: center;
//   display: block;
//   margin: 0 auto;
// `;
const SlideImage = styled(motion.img)`
  width: 100%;
  height: 600px;
  object-fit: cover; /* Show full image without cropping */
  object-position: center;
  display: block;
  margin: 0 auto;
  background-color: #e6f4ff; /* Match container background if image has transparency */
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
        {/* {slides.map((slide) => (
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
        ))} */}
        {slides.map((slide) => (
  <div key={slide.id} style={{
    position: "relative",
    height: "300px",              // Match the container
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",         // Center vertically
    backgroundColor: "#e6f4ff",   // Soft border background
  }}>
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
