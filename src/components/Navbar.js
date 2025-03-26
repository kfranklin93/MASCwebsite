import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
// import HiringBadge from "./HiringBadge";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <NavbarContainer variants={navVariants} initial="hidden" animate="visible">
      <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <StyledLink to="/">Mommy Angels </StyledLink>
         {/* Flower Badge */}
         {/* <HiringBadge> </HiringBadge>  */}

      </Logo>



{/* <NavLinks>
  {["Home", "About", "Services", "Contact", "Careers"].map((text, index) => (
    <NavLink key={text} to={`/${text.toLowerCase()}`} $index={index}>
      {text}
    </NavLink>
  ))}
</NavLinks> */}

      {/* Desktop Navigation */}
      <NavLinks>
      {[ "About", "Services"].map((text, index) => (
    <NavLink key={text} to={`/${text.toLowerCase()}`} $index={index}>
      {text}
    </NavLink>
  ))}
        {/* <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink> */}
        
        {/* Contact with Dropdown */}
        <DropdownContainer
  onMouseEnter={() => setDropdownOpen(true)}
  onMouseLeave={() => setDropdownOpen(false)}
>
  <NavLinkWrapper color="red">
    <NavLink to="/contact">Contact</NavLink> 
    {/* Contact Us should still be clickable */}
  
    {/* Add badge inside dropdown */}
    <DropdownIcon>▼</DropdownIcon>
  </NavLinkWrapper>
  
  <AnimatePresence>
    {dropdownOpen && (
      <DropdownMenu
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <DropdownItem to="/careers">Careers</DropdownItem>
        <DropdownItem to="/internships">Internships</DropdownItem>
      </DropdownMenu>
    )}
  </AnimatePresence>
</DropdownContainer>

        {/* <DropdownContainer 
          onMouseEnter={() => setDropdownOpen(true)} 
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <NavLink to="/contact">Contact</NavLink>
          <AnimatePresence>
            {dropdownOpen && (
              <DropdownMenu 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 10 }}
              >
                <DropdownItem to="/careers">Careers</DropdownItem>
                <DropdownItem to="/internships">Internships</DropdownItem>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer> */}
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
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/services" onClick={() => setMenuOpen(false)}>Services</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>

            {/* Careers in Mobile Menu */}
            <NavLink to="/careers" onClick={() => setMenuOpen(false)}>Careers</NavLink>
            <NavLink to="/internships" onClick={() => setMenuOpen(false)}>Internships</NavLink>
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

// const colors = ["#FFd700", "#3f8242", "#3357FF", "#FF33A1", "#cd1b1b"]; 
const colors = [ "#3357FF", "#3f8242", "#cd1b1b"]; 

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: linear-gradient(90deg, #A7C7E7, #FFF4B2);
  // box-shadow: 0px 4px 10px rgba(167, 199, 231, 0.9);
  background: linear-gradient(90deg, #CD1B1B, #4A90E2, #FFD700); /* Fun gradient */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Logo = styled(motion.h1)`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Bubblegum Sans", sans-serif;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
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
  transition: color 0.3s ease;
  color: ${({ $index }) => colors[$index] || "#FF0000"}; 
  padding: 8px 12px;
  border-radius: 8px;

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

const DropdownItem = styled(Link)`
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
  color: #333;

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
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 999;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  cursor: pointer;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; /* Space between text and dropdown icon */
  cursor: pointer;
  color: rgb(220, 27, 27) !important;
`;

const DropdownIcon = styled.span`
  font-size: 0.8rem;
`;



export default Navbar;