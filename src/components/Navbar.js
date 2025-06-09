import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const DropdownToggleButton = styled.span`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-left: auto; /* Aligns the button to the right */
  cursor: pointer;
  transition: transform 0.3s ease;
  padding-left: 10px;

  &:hover {
    color: #ffd700; /* Change color when hovered */
    transform: scale(1.1);
  }
`;

const MobileNavLink = styled.a`
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



const MobileDropdownItem = styled.a`
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



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  return (
    <NavbarContainer variants={navVariants} initial="hidden" animate="visible">
      <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <a href="#home">Mommy Angels</a>
      </Logo>

      {/* Desktop Navigation */}
      <NavLinks>
        <NavLink href="#about" color="#FFD700">
          About Us
        </NavLink>

        <DropdownContainer
          onMouseEnter={() => setDropdownOpen("services")}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <NavLinkWrapper>
            <NavLink href="#services" color="#4A90E2">
              Services
            </NavLink>
            <DropdownIcon>▼</DropdownIcon>
          </NavLinkWrapper>

          <AnimatePresence>
            {dropdownOpen === "services" && (
              <DropdownMenu
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <DropdownItem href="/services#general-services" color="#4a90e2">
                  ABA Therapy
                </DropdownItem>
                <DropdownItem href="#autism-diagnostic" color="#4a90e2">
                  Autism Diagnostic Services
                </DropdownItem>
                <DropdownItem href="#speech-therapy" color="#4a90e2">
                  Speech Therapy
                </DropdownItem>
                <DropdownItem href="#early-intervention" color="#4a90e2">
                  Early Intervention
                </DropdownItem>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>

        {/* Contact with Dropdown */}
        <DropdownContainer
          onMouseEnter={() => setDropdownOpen("contact")}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <NavLinkWrapper>
            <NavLink href="#contact" color="#CD1B1B">
              Contact
            </NavLink>
            <DropdownIcon>▼</DropdownIcon>
          </NavLinkWrapper>

          <AnimatePresence>
            {dropdownOpen === "#contact" && (
              <DropdownMenu
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <DropdownItem href="#careers" color="#FF5733">
                  Careers
                </DropdownItem>
                <DropdownItem href="#internships" color="#3f8242">
                  Internships
                </DropdownItem>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>
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
                <a href="#home">Mommy Angels</a>
            </Logo>

            {/* Close menu when clicking a link */}
            <MobileNavLink href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setMenuOpen(false)}>
              About
            </MobileNavLink>

            {/* Services Dropdown */}
            <DropdownContainer
              onClick={() =>
                setDropdownOpen(dropdownOpen === "services" ? null : "services")
              }
            >
              <MobileNavLink onClick={(e) => e.preventDefault()}>
                Services
                <DropdownToggleButton>
                  {dropdownOpen === "services" ? "▲" : "▼"}
                </DropdownToggleButton>
              </MobileNavLink>
              {dropdownOpen === "services" && (
                <MobileDropdownMenu>
                  <MobileDropdownItem
                    href="/services#general-services"
                    onClick={() => setMenuOpen(false)}
                  >
                    ABA Therapy
                  </MobileDropdownItem>
                  <MobileDropdownItem
                    href="#autism-diagnostic"
                    onClick={() => setMenuOpen(false)}
                  >
                    Autism Diagnostic Services
                  </MobileDropdownItem>
                  <MobileDropdownItem
                    href="#speech-therapy"
                    onClick={() => setMenuOpen(false)}
                  >
                    Speech Therapy
                  </MobileDropdownItem>
                  <MobileDropdownItem
                    href="#early-intervention"
                    onClick={() => setMenuOpen(false)}
                  >
                    Early Intervention
                  </MobileDropdownItem>
                </MobileDropdownMenu>
              )}
            </DropdownContainer>

            {/* Contact Dropdown */}
            <DropdownContainer
              onClick={() =>
                setDropdownOpen(dropdownOpen === "contact" ? null : "contact")
              }
            >
              <MobileNavLink onClick={(e) => e.preventDefault()}>
                Contact
                <DropdownToggleButton>
                  {dropdownOpen === "contact" ? "▲" : "▼"}
                </DropdownToggleButton>
              </MobileNavLink>
              {dropdownOpen === "contact" && (
                <MobileDropdownMenu>
                  <MobileDropdownItem
                    href="#careers"
                    onClick={() => setMenuOpen(false)}
                  >
                    Careers
                  </MobileDropdownItem>
                  <MobileDropdownItem
                    href="#internships"
                    onClick={() => setMenuOpen(false)}
                  >
                    Internships
                  </MobileDropdownItem>
                </MobileDropdownMenu>
              )}
            </DropdownContainer>

            <MobileNavLink href="#careers" onClick={() => setMenuOpen(false)}>
              Careers
            </MobileNavLink>
            <MobileNavLink
              href="#internships"
              onClick={() => setMenuOpen(false)}
            >
              Internships
            </MobileNavLink>
            <CTAButton href="/contact">Enroll Now</CTAButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const CTAButton = styled.a`
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

const NavLink = styled.a`
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  color: ${({ color }) => color || "white"}; /* Accepts a color prop */
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);
    font-weight: bold;
  }
`;

/* Dropdown Styling */
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

const DropdownItem = styled.a`
  text-decoration: none;
  color: ${({ color }) => color || "#333"}; /* Accepts a color prop */
  padding: 8px 12px;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

/* Mobile Menu */
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
  padding: 2rem 1.5rem 4rem; /* Add bottom padding */
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

export default Navbar;
