import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeart, FaPuzzlePiece } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #CD1B1B, #4A90E2, #FFD700);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem 1rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: #FFD700;
    font-family: "Bubblegum Sans", sans-serif;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    @media (max-width: 768px) {
      justify-content: center;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled(NavLink)`
  text-decoration: none;
  color: #ecf0f1;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 8px;
  padding-left: 1rem;
  
  &:hover {
    color: #FFD700;
    background: rgba(255, 215, 0, 0.1);
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    padding-left: 0;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: #ecf0f1;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 8px;
  padding-left: 1rem;
  
  &:hover {
    color: #FFD700;
    background: rgba(255, 215, 0, 0.1);
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    padding-left: 0;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    color: #6BA8E8;
    font-size: 1.2rem;
    min-width: 20px;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ContactLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #FFD700;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: #ecf0f1;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  
  &:hover {
    color: #FFD700;
    background: rgba(255, 215, 0, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  }
`;

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const ServiceItem = styled.div`
  color: #bdc3c7;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #4A90E2;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 0;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: #bdc3c7;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DeveloperCredit = styled.div`
  color: #bdc3c7;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  a {
    color: #8CC0F0;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #FFD700;
    }
  }
`;

// Decorative only: the adjacent text already carries the meaning, so the
// emoji is hidden to keep the link's accessible name clean.
const Emoji = ({ children }) => <span aria-hidden="true">{children}</span>;

const PuzzleIcon = styled(FaPuzzlePiece)`
  color: #CD1B1B;
  margin-left: 0.5rem;
`;

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <FooterGrid>
        {/* Navigation Section */}
        <FooterSection>
          <h4>
            <FaHeart />
            Quick Links
          </h4>
          <FooterLinks style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            <FooterLink to="/"><Emoji>🏠</Emoji> Home</FooterLink>
            <FooterLink to="/about"><Emoji>📖</Emoji> About Us</FooterLink>
            <FooterLink to="/services"><Emoji>🎯</Emoji> Our Services</FooterLink>
            <FooterLink to="/contact"><Emoji>📞</Emoji> Contact</FooterLink>
            <FooterLink to="/what-to-expect"><Emoji>🌟</Emoji> What to Expect</FooterLink>
          </FooterLinks>
        </FooterSection>

        {/* Services Section */}
        <FooterSection>
          <h4>
            <FaPuzzlePiece />
            Our Services
          </h4>
          <ServicesList>
            <ServiceItem>ABA Therapy</ServiceItem>
            <ServiceItem>Speech Therapy</ServiceItem>
            <ServiceItem>Occupational Therapy</ServiceItem>
            <ServiceItem>Autism Diagnostic Services</ServiceItem>
            <ServiceItem>Pre-K Readiness</ServiceItem>
            <ServiceItem>Parent Training</ServiceItem>
            <ServiceItem>Early Intervention</ServiceItem>
            <ServiceItem>Sensory Integration</ServiceItem>
          </ServicesList>
        </FooterSection>

        {/* Contact Information */}
        <FooterSection>
          <h4>
            <FaPhone />
            Contact Info
          </h4>
          <ContactInfo>
            <ContactItem>
              <FaPhone />
              <ContactLink href="tel:+16783536829">
                (678) 353-6829
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <ContactLink href="mailto:management@mommyangelsspecialtycare.com">
                management@mommyangelsspecialtycare.com
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>Dunwoody, Georgia</span>
            </ContactItem>
            <ContactItem>
              <FaClock />
              <span>Mon-Fri: 8AM-6PM</span>
            </ContactItem>
          </ContactInfo>
        </FooterSection>

        {/* Social & Sister Site */}
        <FooterSection>
          <h4>
            <FaHeart />
            Connect & Explore
          </h4>
          <FooterLinks>
            {/* Mommy Angels Daycare link commented out */}
            {/* <ExternalLink
              href="https://mommyangelsdaycare.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              🌈 Sister Site: Mommy Angels Daycare
            </ExternalLink> */}
            <ExternalLink 
              href="https://www.facebook.com/mommyangelsspecialtycare" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Emoji>📘</Emoji> Follow on Facebook
            </ExternalLink>
            <ExternalLink 
              href="https://www.instagram.com/mommyangelsspecialtycare" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Emoji>📷</Emoji> Follow on Instagram
            </ExternalLink>
          </FooterLinks>
          
          <SocialIcons>
            <SocialIcon
              href="https://www.facebook.com/mommyangelsspecialtycare"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </SocialIcon>
            <SocialIcon
              href="https://www.instagram.com/mommyangelsspecialtycare"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
      </FooterGrid>

      <FooterBottom>
        <Copyright>
          <FaHeart color="#CD1B1B" />
          &copy; {new Date().getFullYear()} Mommy Angel's Autism Center. All rights reserved.
          <PuzzleIcon />
        </Copyright>
        <Copyright>
          Advocating for autism awareness, one child at a time.
        </Copyright>
        <DeveloperCredit>
          Designed & Developed by{' '}
          <a href="mailto:harlemorchid@gmail.com">
            Harlem Orchid
          </a>
        </DeveloperCredit>
      </FooterBottom>
    </FooterContent>
  </FooterContainer>
);

export default Footer;
