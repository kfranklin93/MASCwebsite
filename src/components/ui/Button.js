import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Primary Button
export const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: #CD1B1B;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: "Nunito", sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    background: #e62020;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
`;

// Secondary Button
export const SecondaryButton = styled(PrimaryButton)`
  background: #4A90E2;
  
  &:hover {
    background: #357ABD;
  }
`;

// Button Group
export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;