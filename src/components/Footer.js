import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 2rem 1rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    font-size: 0.9rem;
  }
`;
const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const FooterLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;
const FooterAnchor = styled.a`
  color: white;
  text-decoration: underline;

  &:hover {
    color: #ffcc00;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 1rem;

  a {
    color: white;
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: #ffcc00;
    }
  }

  @media (max-width: 480px) {
    gap: 15px;
    a {
      font-size: 1.3rem;
    }
  }
`;

const Footer = () => (
  <FooterContainer>
    {/* Footer Links */}
    <FooterLinks>
      <FooterLink to="/about">About</FooterLink>
      {/* <FooterLink to="/rooms">Rooms</FooterLink> */}
      {/* <FooterLink to="/insurances">Insurances</FooterLink> */}
      <FooterLink to="/contact">Contact</FooterLink>
    </FooterLinks>

    {/* Contact Information */}
    <div>
      <p>Phone: <FooterAnchor href="tel:+16783536829">678-353-6829</FooterAnchor></p>
      <p>Email: <FooterAnchor href="mailto:management@mommyangelsspecialtycare.com">management@mommyangelsspecialtycare.com</FooterAnchor></p>
    </div>

    {/* Footer Text */}
    <SocialIcons>
  <a
    href="https://www.facebook.com/mommyangelsspecialtycare"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <FaFacebook />
  </a>
  <a
    href="https://www.instagram.com/mommyangelsspecialtycare"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <FaInstagram />
  </a>
</SocialIcons>
    <p>&copy; 2025 ABA Therapy Center. All rights reserved.</p>
    <p>Advocating for autism awareness, one child at a time.</p>
  </FooterContainer>
);

export default Footer;
