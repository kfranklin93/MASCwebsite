import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Styled Components
const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #cd1b1b, #4a90e2, #ffd700);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Logo = styled(motion.h1)`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Bubblegum Sans", sans-serif;
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  color: ${({ color }) => color || "white"};
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);
    font-weight: bold;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  text-decoration: none;
  color: ${({ color }) => color || "#333"};
  padding: 8px 12px;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const MobileMenuButton = styled.div`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: white;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fefefe;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem 4rem;
  z-index: 999;
  overflow-y: auto;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  color: #000;
  cursor: pointer;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const DropdownIcon = styled.span`
  font-size: 0.8rem;
`;

const MobileNavLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #222;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #4a90e2;
  }
`;

const MobileDropdownItem = styled(Link)`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #333;
  text-decoration: none;

  &:hover {
    color: #4a90e2;
  }
`;

const MobileDropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f3f7ff;
  border-left: 3px solid #4a90e2;
  margin-bottom: 1rem;
  padding-left: 1rem;
  border-radius: 8px;
`;

const DropdownToggleButton = styled.span`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-left: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding-left: 10px;

  &:hover {
    color: #ffd700;
    transform: scale(1.1);
  }
`;

const CTAButton = styled(Link)`
  margin-top: auto;
  align-self: center;
  background-color: #cd1b1b;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background-color: #a31414;
  }
`;

const ScrollLink = ({ to, children, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <NavLink {...props} to={to} onClick={handleClick}>
      {children}
    </NavLink>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <NavbarContainer variants={navVariants} initial="hidden" animate="visible">
      <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/" onClick={handleLogoClick}>Mommy Angels</Link>
      </Logo>

      {/* Desktop Navigation */}
      <NavLinks>
        <ScrollLink to="#about" color="#FFD700">
          About Us
        </ScrollLink>

        <DropdownContainer
          onMouseEnter={() => setDropdownOpen("services")}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <NavLinkWrapper>
            <ScrollLink to="#services" color="#4A90E2">
              Services
            </ScrollLink>
            <DropdownIcon>▼</DropdownIcon>
          </NavLinkWrapper>

          <AnimatePresence>
            {dropdownOpen === "services" && (
              <DropdownMenu
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <DropdownItem to="/services/aba-therapy" color="#4a90e2">
                  ABA Therapy
                </DropdownItem>
                <DropdownItem to="/services/autism-diagnostic" color="#4a90e2">
                  Autism Diagnostic Services
                </DropdownItem>
                <DropdownItem to="/services/speech-therapy" color="#4a90e2">
                  Speech Therapy
                </DropdownItem>
                <DropdownItem to="/services/early-intervention" color="#4a90e2">
                  Early Intervention
                </DropdownItem>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>

        <ScrollLink to="#contact" color="#CD1B1B">
          Contact
        </ScrollLink>
      </NavLinks>

      {/* Mobile Menu Button */}
      <MobileMenuButton onClick={() => setMenuOpen(true)}>
        <FaBars />
      </MobileMenuButton>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </CloseButton>

            <Logo style={{ marginBottom: "2rem" }}>
              <Link to="/" onClick={handleLogoClick}>Mommy Angels</Link>
            </Logo>

            <MobileNavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </MobileNavLink>

            <ScrollLink to="#about" onClick={() => setMenuOpen(false)}>
              About
            </ScrollLink>

            {/* Services Dropdown */}
            <DropdownContainer
              onClick={() =>
                setDropdownOpen(dropdownOpen === "services" ? null : "services")
              }
            >
              <MobileNavLink as="div">
                Services
                <DropdownToggleButton>
                  {dropdownOpen === "services" ? "▲" : "▼"}
                </DropdownToggleButton>
              </MobileNavLink>
              {dropdownOpen === "services" && (
                <MobileDropdownMenu>
                  <MobileDropdownItem
                    to="/services/aba-therapy"
                    onClick={() => setMenuOpen(false)}
                  >
                    ABA Therapy
                  </MobileDropdownItem>
                  <MobileDropdownItem
                    to="/services/autism-diagnostic"
                    onClick={() => setMenuOpen(false)}
                  >
                    Autism Diagnostic Services
                  </MobileDropdownItem>
                  <MobileDropdownItem
                    to="/services/speech-therapy"
                    onClick={() => setMenuOpen(false)}
                  >
                    Speech Therapy
                  </MobileDropdownItem>
                  <MobileDropdownItem
                    to="/services/early-intervention"
                    onClick={() => setMenuOpen(false)}
                  >
                    Early Intervention
                  </MobileDropdownItem>
                </MobileDropdownMenu>
              )}
            </DropdownContainer>

            <ScrollLink to="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </ScrollLink>

            <CTAButton to="/contact" onClick={() => setMenuOpen(false)}>
              Enroll Now
            </CTAButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;