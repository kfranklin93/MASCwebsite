import React from "react";
import styled from "styled-components";

const Banner = styled.a`
  display: block;
  text-align: center;
  background: linear-gradient(90deg, #ff0000, #ffcc00, #00cc00, #0066ff);
  color: Black;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  width: 100%;
  z-index: 99;
  top:77px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  animation: pulse 3s infinite;
  letter-spacing: 0.5px;

  &:hover {
    opacity: 0.95;
  }

  @keyframes pulse {
    0%, 100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.2);
    }
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem;
  }
`;

const VoteBanner = () => {
  return null; // Mommy Angels Daycare voting banner commented out
  /* return (
    <Banner
      href="https://atlantabestmedia.com/my-dunwoody-best-of-2025/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Vote for Mommy Angels Daycare"
    >
      🎉 🌟 Vote for Mommy Angels Daycare in the 2025 Dunwoody Best Awards – Tap Here to Support! 🌟 🎉
    </Banner>
  ); */
};

export default VoteBanner;
