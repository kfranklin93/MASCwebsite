import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const WidgetContainer = styled(motion.div)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 999;
  width: 280px;
  max-height: 65vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: visible;
  border: 2px solid rgba(74, 144, 226, 0.2);
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  
  @media (max-width: 1024px) {
    display: none;
  }
  
  @media (max-height: 700px) {
    max-height: 55vh;
  }
  
  @media (max-height: 600px) {
    max-height: 50vh;
  }
`;

const MinimizedWidget = styled(motion.div)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 999;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
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
  padding: 0.9rem 1.2rem;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Nunito", sans-serif;
  flex-shrink: 0;
  position: relative;
`;

const FloatingBadge = styled.div`
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  padding: 0.45rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.6);
  animation: pulse 2s ease-in-out infinite;
  border: 3px solid #fff;
  white-space: nowrap;
  z-index: 1001;
  
  @keyframes pulse {
    0%, 100% {
      transform: translateX(-50%) scale(1);
      box-shadow: 0 4px 16px rgba(76, 175, 80, 0.6);
    }
    50% {
      transform: translateX(-50%) scale(1.08);
      box-shadow: 0 6px 20px rgba(76, 175, 80, 0.8);
    }
  }
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
  padding: 1rem 1.2rem;
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
  margin-bottom: 0.8rem;
  text-align: center;
`;

const InfoText = styled.p`
  font-size: 0.85rem;
  color: #444;
  margin-bottom: 0.6rem;
  line-height: 1.4;
  font-family: "Nunito", sans-serif;
`;

const Highlight = styled.span`
  color: #CD1B1B;
  font-weight: 700;
`;

const ContactOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  background: ${props => props.primary
    ? 'linear-gradient(135deg, #CD1B1B 0%, #e62020 100%)'
    : 'linear-gradient(135deg, #00695c 0%, #008577 100%)'};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px ${props => props.primary
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
  font-size: 1.1rem;
`;

const Badge = styled.div`
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #000;
  padding: 0.35rem 0.7rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.6rem;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
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


const QuickContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      // Close widget on mobile by default
      if (mobile) {
        setIsOpen(false);
      } else {
        // Open widget on desktop by default
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Don't render on mobile
  if (isMobile || !isOpen) return null;

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
              <FloatingBadge>🎉 No Waitlist!</FloatingBadge>
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
