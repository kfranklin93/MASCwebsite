// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import styled from 'styled-components';

// const StyledButton = styled(NavLink)`
//   display: inline-block;
//   background-color: #FFD700; /* Bright golden yellow */
//   color: #000;
//   padding: 1rem 2rem;
//   border: none;
//   border-radius: 50px;
//   font-size: 1rem;
//   margin-top: 1.5rem;
//   font-family: 'Nunito', sans-serif;
//   cursor: pointer;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//   transition: all 0.3s ease;
//   text-decoration: none;
//   text-align: center;

//   &:hover {
//     background-color: #FFC107;
//     transform: scale(1.05);
//   }
// `;

// const CTAButton = ({ text, to }) => {
//   return <StyledButton to={to}>{text}</StyledButton>;
// };

// export default CTAButton;
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled(NavLink)`
  display: inline-block;
  background-color: #FFD700; /* Bright golden yellow */
  color: #000;
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
  text-align: center;

  &:hover {
    background-color: #FFC107;
    transform: scale(1.05);
  }
`;

const CTAButton = ({ text, to }) => {
  return <StyledButton to={to}>{text}</StyledButton>;
};

export default CTAButton;

