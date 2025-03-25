import React from "react";
import styled from "styled-components";

const HiringBadge = () => {
  return (
    <BadgeContainer>
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flower petals */}
        <circle cx="50" cy="15" r="15" fill="#FF4500" /> {/* Top */}
        <circle cx="50" cy="85" r="15" fill="#FF4500" /> {/* Bottom */}
        <circle cx="85" cy="50" r="15" fill="#FF4500" /> {/* Right */}
        <circle cx="15" cy="50" r="15" fill="#FF4500" /> {/* Left */}
        <circle cx="72" cy="28" r="15" fill="#FF6347" /> {/* Top-Right */}
        <circle cx="28" cy="28" r="15" fill="#FF6347" /> {/* Top-Left */}
        <circle cx="72" cy="72" r="15" fill="#FF6347" /> {/* Bottom-Right */}
        <circle cx="28" cy="72" r="15" fill="#FF6347" /> {/* Bottom-Left */}

        {/* Center circle */}
        <circle cx="50" cy="50" r="20" fill="#FFD700" />

        {/* Text inside */}
        <text x="50" y="50" fontSize="9" fontWeight="bold" textAnchor="middle" fill="black">
          We're
        </text>
        <text x="50" y="62" fontSize="9" fontWeight="bold" textAnchor="middle" fill="black">
          Hiring!
        </text>
      </svg>
    </BadgeContainer>
  );
};

export default HiringBadge;

// Styled Component
const BadgeContainer = styled.div`
  position: absolute;
  top: -5px;
  right: -10px;
  width: 60px;
  height: 60px;
`;
