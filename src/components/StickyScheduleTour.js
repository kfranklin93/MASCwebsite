import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const StickyContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  
  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    left: 10px;
  }
`;

const ScheduleButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, #CD1B1B 0%, #e62020 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 8px 25px rgba(205, 27, 27, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  font-family: "Nunito", sans-serif;
  letter-spacing: 0.3px;
  
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
  
  &::after {
    content: '📞';
    margin-left: 0.5rem;
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 35px rgba(205, 27, 27, 0.6);
    background: linear-gradient(135deg, #e62020 0%, #ff3333 100%);
    
    &::before {
      left: 100%;
    }
    
    &::after {
      transform: scale(1.2) rotate(10deg);
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    justify-content: center;
  }
`;


const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  left: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #CD1B1B;
  color: #CD1B1B;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background: #CD1B1B;
    color: #fff;
    transform: rotate(90deg);
  }
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
`;

const StickyScheduleTour = ({ phoneNumber = "(404) 555-1234" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <StickyContainer
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div style={{ position: 'relative' }}>
            <CloseButton
              onClick={handleDismiss}
              aria-label="Dismiss schedule tour button"
              title="Dismiss"
            >
              ×
            </CloseButton>
            <ScheduleButton
              href={`tel:${phoneNumber.replace(/\D/g, '')}`}
              aria-label={`Call us at ${phoneNumber}`}
            >
              Call: {phoneNumber}
            </ScheduleButton>
          </div>
        </StickyContainer>
      )}
    </AnimatePresence>
  );
};

export default StickyScheduleTour;

// Made with Bob
