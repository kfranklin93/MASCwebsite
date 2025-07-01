import styled from 'styled-components';
import { motion } from 'framer-motion';

export const H1 = styled.h1`
  font-family: "Bubblegum Sans", cursive;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  color: ${props => props.color || '#333333'};
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => props.mb || '1rem'};
  
  @media (max-width: 768px) {
    text-align: ${props => props.mobileAlign || props.align || 'left'};
  }
`;

export const H2 = styled.h2`
  font-family: "Bubblegum Sans", cursive;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  line-height: 1.3;
  color: ${props => props.color || '#333333'};
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => props.mb || '0.75rem'};
  
  @media (max-width: 768px) {
    text-align: ${props => props.mobileAlign || props.align || 'left'};
  }
`;

export const Text = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: ${props => props.size || '1rem'};
  line-height: 1.6;
  color: ${props => props.color || '#333333'};
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => props.mb || '1rem'};
  font-weight: ${props => props.weight || 400};
  
  @media (max-width: 768px) {
    text-align: ${props => props.mobileAlign || props.align || 'left'};
  }
`;

export const AnimatedText = styled(motion(Text))`
  // Add any additional animated text styles here
`;

export const Strong = styled.strong`
  font-weight: 700;
  color: ${props => props.color || 'inherit'};
`;