import React from "react";
import styled from "styled-components";

const HiringBadge = () => {
  return <Badge>We're Hiring!</Badge>;
};

export default HiringBadge;

// Styled Components
const Badge = styled.div`
  position: absolute;
  top: -10px;
  right: -20px;
  background: radial-gradient(circle at center, #ffcc00, #ff6600);
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 15px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  text-align: center;

  /* Flower petals */
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 70px;
    height: 70px;
    background: radial-gradient(circle at center, #ffcc00, #ff6600);
    border-radius: 50%;
    z-index: -1;
  }

  &:before {
    top: -30px;
    left: 0;
  }

  &:after {
    bottom: -30px;
    left: 0;
  }
`;
