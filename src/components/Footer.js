import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
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

const Footer = () => (
  <FooterContainer>
    {/* Footer Links */}
    <FooterLinks>
      <FooterLink to="/about">About</FooterLink>
      <FooterLink to="/rooms">Rooms</FooterLink>
      <FooterLink to="/insurances">Insurances</FooterLink>
      <FooterLink to="/contact">Contact</FooterLink>
    </FooterLinks>

    {/* Contact Information */}
    <div>
      <p>Phone: <a href="tel:+16783536829" style={{ color: 'white' }}>678-353-6829</a></p>
      <p>Email: <a href="mailto:management@mommyangelsspecialtycare.com" style={{ color: 'white' }}>management@mommyangelsspecialtycare.com</a></p>
    </div>

    {/* Footer Text */}
    <p>&copy; 2025 ABA Therapy Center. All rights reserved.</p>
    <p>Advocating for autism awareness, one child at a time.</p>
  </FooterContainer>
);

export default Footer;
