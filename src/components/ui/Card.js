import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, shadows, transitions, media } from '../../styles/theme';

// Base Card
export const Card = styled.div`
  background: ${colors.background.main};
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: ${shadows.medium};
  transition: ${transitions.medium};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.large};
  }
  
  ${media.mobile} {
    padding: 1rem;
  }
`;

// Service Card
export const ServiceCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  gap: 1rem;
  
  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 1rem;
  }
  
  ${media.mobile} {
    padding: 1.5rem;
    
    img {
      width: 60px;
      height: 60px;
    }
  }
`;

// Feature Card
export const FeatureCard = styled(Card)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  align-items: center;
  padding: 2rem;
  
  ${media.mobile} {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 1.5rem;
  }
`;

// Team Card
export const TeamCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.5rem;
  }
  
  ${media.mobile} {
    padding: 1.5rem;
    
    img {
      width: 120px;
      height: 120px;
    }
  }
`;

// Testimonial Card
export const TestimonialCard = styled(Card)`
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-size: 4rem;
    color: ${colors.primary.main};
    opacity: 0.2;
    font-family: Georgia, serif;
  }
  
  ${media.mobile} {
    padding: 1.5rem;
  }
`;

// Info Card
export const InfoCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  
  ${media.mobile} {
    padding: 1.5rem;
  }
`;

// Contact Card
export const ContactCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  
  ${media.mobile} {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
`;

// Animated Card
export const AnimatedCard = styled(motion(Card))`
  // Add any additional animated card styles here
`;

// Card Grid
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  
  ${media.tablet} {
    gap: 1.5rem;
  }
  
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

// Card Header
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  ${media.mobile} {
    flex-direction: ${props => props.stackMobile ? 'column' : 'row'};
    gap: ${props => props.stackMobile ? '0.5rem' : '0'};
  }
`;

// Card Footer
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.align || 'flex-end'};
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${colors.grey[200]};
  
  ${media.mobile} {
    flex-direction: ${props => props.stackMobile ? 'column' : 'row'};
    gap: ${props => props.stackMobile ? '0.5rem' : '0'};
  }
`;