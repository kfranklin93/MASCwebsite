// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
`;

const Footer = () => (
  <FooterContainer>
    About

Rooms

Insurances

Contact

678-353-6829

management@mommyangelsspecialtycare.com
    <p>&copy; 2025 ABA Therapy Center. All rights reserved.</p>
    <p>Advocating for autism awareness, one child at a time.</p>
  </FooterContainer>
);

export default Footer;
