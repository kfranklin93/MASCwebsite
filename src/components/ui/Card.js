import styled from 'styled-components';
import { motion } from 'framer-motion';

// Base Card
export const Card = styled.div`
  background: #FFFFFF;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
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
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    
    img {
      width: 60px;
      height: 60px;
    }
  }
`;

// Card Grid
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;