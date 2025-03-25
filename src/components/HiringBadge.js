import React from "react";
import styled from "styled-components";

const HiringBadge = () => {
  return (
    <BadgeContainer>
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flower Shape */}
        <g fill="red">
          <circle cx="50" cy="20" r="15" /> {/* Top Petal */}
          <circle cx="80" cy="40" r="15" /> {/* Right Petal */}
          <circle cx="20" cy="40" r="15" /> {/* Left Petal */}
          <circle cx="35" cy="75" r="15" /> {/* Bottom Left Petal */}
          <circle cx="65" cy="75" r="15" /> {/* Bottom Right Petal */}
          <circle cx="50" cy="50" r="20" fill="yellow" /> {/* Center */}
        </g>

        {/* Text inside */}
        <text
          x="50"
          y="54"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          fill="black"
        >
          We're
        </text>
        <text
          x="50"
          y="65"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          fill="black"
        >
          Hiring!
        </text>
      </svg>
    </BadgeContainer>
  );
};

export default HiringBadge;

// Styled Components
const BadgeContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  width: 50px;
  height: 50px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
