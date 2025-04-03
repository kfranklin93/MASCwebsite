import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <NavbarContainer variants={navVariants} initial="hidden" animate="visible">
      <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <a href="#home">Mommy Angels</a>
      </Logo>

      {/* Desktop Navigation */}
      <NavLinks>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#services">Services</NavLink>

        {/* Contact with Dropdown */}
        <DropdownContainer
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <NavLinkWrapper>
            <NavLink href="#contact">Contact</NavLink>
            <DropdownIcon>▼</DropdownIcon>
          </NavLinkWrapper>

          <AnimatePresence>
            {dropdownOpen && (
              <DropdownMenu
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <DropdownItem href="#careers">Careers</DropdownItem>
                <DropdownItem href="#internships">Internships</DropdownItem>
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
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CloseButton onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </CloseButton>

            {/* Close menu when clicking a link */}
            <NavLink href="#home" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink href="#about" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink href="#services" onClick={() => setMenuOpen(false)}>Services</NavLink>
            <NavLink href="#contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
            <NavLink href="#careers" onClick={() => setMenuOpen(false)}>Careers</NavLink>
            <NavLink href="#internships" onClick={() => setMenuOpen(false)}>Internships</NavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

// Framer Motion Animations
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const menuVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { x: "-100%", opacity: 0, transition: { duration: 0.4 } },
};

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #CD1B1B, #4A90E2, #FFD700);
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
  color: white;
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
  color: #333;
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
  height: 50vh; /* Only takes up half the screen */
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  z-index: 999;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 2rem;
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
