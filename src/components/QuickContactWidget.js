import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const WidgetContainer = styled(motion.div)`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  width: 320px;
  max-height: 90vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border: 2px solid rgba(74, 144, 226, 0.2);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const MinimizedWidget = styled(motion.div)`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.5);
  }
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const MinimizeIcon = styled.div`
  font-size: 2rem;
  color: white;
`;

const WidgetHeader = styled.div`
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
  padding: 1.2rem 1.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Nunito", sans-serif;
  flex-shrink: 0;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MinimizeButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const WidgetContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  
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

const QuickInfo = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-family: "Nunito", sans-serif;
`;

const Highlight = styled.span`
  color: #CD1B1B;
  font-weight: 700;
`;

const ContactOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: ${props => props.primary 
    ? 'linear-gradient(135deg, #CD1B1B 0%, #e62020 100%)' 
    : 'linear-gradient(135deg, #00695c 0%, #008577 100%)'};
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${props => props.primary 
    ? 'rgba(205, 27, 27, 0.3)' 
    : 'rgba(0, 105, 92, 0.3)'};
  font-family: "Nunito", sans-serif;
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.primary 
      ? 'rgba(205, 27, 27, 0.4)' 
      : 'rgba(0, 105, 92, 0.4)'};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Icon = styled.span`
  font-size: 1.3rem;
`;

const Badge = styled.div`
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.5);
  animation: pulse 2s ease-in-out infinite;
  border: 2px solid #fff;
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

const UrgencyBadge = styled(Badge)`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const QuickContactWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {!isMinimized ? (
          <WidgetContainer
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <WidgetHeader>
              <span>📞 Quick Contact</span>
              <HeaderButtons>
                <MinimizeButton
                  onClick={handleMinimize}
                  aria-label="Minimize quick contact widget"
                  title="Minimize"
                >
                  −
                </MinimizeButton>
                <CloseButton
                  onClick={handleClose}
                  aria-label="Close quick contact widget"
                  title="Close"
                >
                  ×
                </CloseButton>
              </HeaderButtons>
            </WidgetHeader>
            <WidgetContent>
              <UrgencyBadge>🎉 No Waitlist Currently!</UrgencyBadge>
              <Badge>✨ Takes Only 2 Minutes!</Badge>
              <QuickInfo>
                <InfoText>
                  <Highlight>Ready to get started?</Highlight><br />
                  Schedule your free tour today and see how we can help your child thrive!
                </InfoText>
              </QuickInfo>
              <ContactOptions>
                <ContactButton href="/contact" primary>
                  <Icon>📅</Icon>
                  <span>Schedule a Tour</span>
                </ContactButton>
                <ContactButton href="tel:+16783536829">
                  <Icon>📞</Icon>
                  <span>Call Now: (678) 353-6829</span>
                </ContactButton>
                <ContactButton href="mailto:info@mommyangelsspecialtycare.com">
                  <Icon>✉️</Icon>
                  <span>Email Us</span>
                </ContactButton>
              </ContactOptions>
            </WidgetContent>
          </WidgetContainer>
        ) : (
          <MinimizedWidget
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleMaximize}
            role="button"
            aria-label="Open quick contact widget"
            title="Open Quick Contact"
          >
            <MinimizeIcon>💬</MinimizeIcon>
          </MinimizedWidget>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickContactWidget;

// Made with Bob
