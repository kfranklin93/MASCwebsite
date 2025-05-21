import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'; // make sure this package is installed

const StyledButton = styled.button`
  background-color: #FFD700; /* Bright golden yellow */
  color: #000; /* Black text for contrast */
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  margin-top: 1.5rem;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #FFC107; /* Slightly deeper yellow */
    transform: scale(1.05);
  }
`;

const CTAButton = ({ text, to }) => {
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      <StyledButton>{text}</StyledButton>
    </NavLink>
  );
};

export default CTAButton;
