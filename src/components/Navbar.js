import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

// const MobileDropdownMenu = styled.div`
//   padding-left: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const MobileDropdownItem = styled.a`
//   text-decoration: none;
//   color: #222;
//   padding: 8px 12px;
//   border-radius: 5px;
//   transition: background 0.3s ease;

//   &:hover {
//     background: rgba(0, 0, 0, 0.1);
//   }
// `;
const MobileDropdownMenu = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #f3f3f3;  /* Light background for contrast */
  border-radius: 8px;
  padding: 10px;
`;

const MobileDropdownItem = styled.a`
  text-decoration: none;
  color: #222;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #4a90e2;  /* Highlight color on hover */
    color: white;
  }
`;

const DropdownToggleButton = styled.span`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-left: auto;  /* Aligns the button to the right */
  cursor: pointer;
  transition: transform 0.3s ease;
  padding-left: 10px;

  &:hover {
    color: #ffd700;  /* Change color when hovered */
    transform: scale(1.1);
  }
`;

// const MobileNavLink = styled.a`
//   font-size: 1.2rem;
//   font-weight: 500;
//   text-decoration: none;
//   color: #222;
//   padding: 0.75rem 1rem;
//   width: 100%;
//   border-bottom: 1px solid #eee;
//   display: flex;
//   justify-content: space-between;  /* Align items for expand button */
//   align-items: center;  /* Center the content vertically */
// `;
// const MobileDropdownMenu = styled.div`
//   padding-left: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
//   background-color: #f3f3f3;  /* Light background for contrast */
//   border-radius: 8px;
//   padding: 10px;
// `;

// const MobileDropdownItem = styled.a`
//   text-decoration: none;
//   color: #222;
//   padding: 10px;
//   border-radius: 5px;
//   transition: background 0.3s ease;

//   &:hover {
//     background-color: #4a90e2;  /* Highlight color on hover */
//     color: white;
//   }
// `;

// const DropdownToggleButton = styled.span`
//   font-size: 1.5rem;
//   color: #4a90e2;
//   margin-left: auto;  /* Aligns the button to the right */
//   cursor: pointer;
//   transition: transform 0.3s ease;
//   padding-left: 10px;

//   &:hover {
//     color: #ffd700;  /* Change color when hovered */
//     transform: scale(1.1);
//   }
// `;

const MobileNavLink = styled.a`
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  color: #222;
  padding: 0.75rem 1rem;
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;  /* Align items for expand button */
  align-items: center;  /* Center the content vertically */
`;

// const DropdownContainer = styled.div`
//   width: 100%;  /* Ensure it takes up full width */
//   display: flex;
//   flex-direction: column;  /* Stack content vertically */
//   gap: 8px;
// `;



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
        {/* <NavLink href="#services" color="#4A90E2">
          Services
        </NavLink> */}
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
          // onMouseEnter={() => setDropdownOpen(true)}
          // onMouseLeave={() => setDropdownOpen(false)}
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
            {/* {dropdownOpen && ( */}
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
          <MobileMenu>
          <CloseButton onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </CloseButton>
        
          {/* Close menu when clicking a link */}
          <MobileNavLink href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink href="#about" onClick={() => setMenuOpen(false)}>
            About
          </MobileNavLink>
        
          {/* Services Dropdown */}
          <DropdownContainer onClick={() => setDropdownOpen(dropdownOpen === "services" ? null : "services")}>
            <MobileNavLink onClick={(e) => e.preventDefault()}>
              Services
              <DropdownToggleButton>{dropdownOpen === "services" ? "▲" : "▼"}</DropdownToggleButton>
            </MobileNavLink>
            {dropdownOpen === "services" && (
              <MobileDropdownMenu>
                <MobileDropdownItem href="/services#general-services" onClick={() => setMenuOpen(false)}>
                  ABA Therapy
                </MobileDropdownItem>
                <MobileDropdownItem href="#autism-diagnostic" onClick={() => setMenuOpen(false)}>
                  Autism Diagnostic Services
                </MobileDropdownItem>
                <MobileDropdownItem href="#speech-therapy" onClick={() => setMenuOpen(false)}>
                  Speech Therapy
                </MobileDropdownItem>
                <MobileDropdownItem href="#early-intervention" onClick={() => setMenuOpen(false)}>
                  Early Intervention
                </MobileDropdownItem>
              </MobileDropdownMenu>
            )}
          </DropdownContainer>
        
          {/* Contact Dropdown */}
          <DropdownContainer onClick={() => setDropdownOpen(dropdownOpen === "contact" ? null : "contact")}>
            <MobileNavLink onClick={(e) => e.preventDefault()}>
              Contact
              <DropdownToggleButton>{dropdownOpen === "contact" ? "▲" : "▼"}</DropdownToggleButton>
            </MobileNavLink>
            {dropdownOpen === "contact" && (
              <MobileDropdownMenu>
                <MobileDropdownItem href="#careers" onClick={() => setMenuOpen(false)}>
                  Careers
                </MobileDropdownItem>
                <MobileDropdownItem href="#internships" onClick={() => setMenuOpen(false)}>
                  Internships
                </MobileDropdownItem>
              </MobileDropdownMenu>
            )}
          </DropdownContainer>
        
          <MobileNavLink href="#careers" onClick={() => setMenuOpen(false)}>
            Careers
          </MobileNavLink>
          <MobileNavLink href="#internships" onClick={() => setMenuOpen(false)}>
            Internships
          </MobileNavLink>
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
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
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
  background: white;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  z-index: 999;
  align-items: flex-start;
  justify-content: flex-start;
`;
// const MobileMenu = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 50vh; /* Only takes up half the screen */
//   background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 1.5rem;
//   font-size: 1.3rem;
//   font-weight: bold;
//   z-index: 999;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
//   border-bottom-left-radius: 20px;
//   border-bottom-right-radius: 20px;
// `;

// const MobileNavLink = styled.a`
//   font-size: 1.2rem;
//   font-weight: 500;
//   text-decoration: none;
//   color: #222;
//   padding: 0.75rem 1rem;
//   width: 100%;
//   border-bottom: 1px solid #eee;
// `;
// const MobileNavLink = styled.a`
//   text-decoration: none;
//   font-size: 1.4rem;
//   font-weight: bold;
//   padding: 12px 18px;
//   border-radius: 10px;
//   transition: transform 0.2s ease, box-shadow 0.3s ease;
//   color: ${({ color }) => color || "#fff"};
//   background: ${({ bg }) => bg || "#222"};

//   &:hover {
//     transform: scale(1.1);
//     box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
//   }
// `;

const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  color: #000;
  cursor: pointer;
`;
// const CloseButton = styled.div`
//   position: absolute;
//   top: 10px;
//   right: 20px;
//   font-size: 2rem;
//   cursor: pointer;
// `;

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
