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

// The site name is branding, not the page heading. As an h1 it competed with
// each page's real title and put a duplicate h1 on every route.
const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Bubblegum Sans", sans-serif;
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;
  }
`;

// A div rather than a ul: its children are links and a dropdown wrapper, not
// <li> elements, which axe flags as an invalid list. The parent is already a
// <nav> landmark, so the list semantics add nothing.
const NavLinks = styled.div`
  display: flex;
  list-style: none;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Styled component for the new direct external link - COMMENTED OUT (Mommy Angels Daycare)
/* const DirectExternalNavLink = styled.a`
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.3s ease;
  // box-shadow: 0 2px 5px rgba(0,0,0,0.2);

  background: linear-gradient(135deg, #CD1B1B 0%, #4A90E2 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:hover {
    background-image: linear-gradient(135deg, #FF4444 0%, #7AC1FF 50%, #FFEA80 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    background-color: transparent;
  }
`; */

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

const MobileMenuButton = styled.button`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: white;
  background: none;
  border: none;
  padding: 0.25rem;
  line-height: 1;

  &:focus-visible {
    outline: 3px solid #ffd700;
    outline-offset: 3px;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 85%;
  max-width: 350px;
  height: 100vh;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 255, 0.98) 100%);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(74, 144, 226, 0.2);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem 4rem;
  z-index: 999;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus-visible {
    outline: 3px solid #1c5f8a;
    outline-offset: 2px;
  }
  width: 40px;
  height: 40px;

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: #CD1B1B;
    box-shadow: 0 4px 12px rgba(205, 27, 27, 0.2);
    transform: rotate(90deg);
  }
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
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  padding: 1rem 1.2rem;
  margin: 0.3rem 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(74, 144, 226, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    color: #4A90E2;
    background: rgba(74, 144, 226, 0.1);
    border-color: rgba(74, 144, 226, 0.3);
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
  }
`;

// New Mobile Direct External Link style - COMMENTED OUT (Mommy Angels Daycare)
/* const MobileDirectExternalNavLink = styled.a`
  font-size: 1.1rem;
  font-weight: bold;
  padding: 1rem 1.2rem;
  margin: 0.3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  background: linear-gradient(135deg, #CD1B1B 0%, #4A90E2 50%, #FFD700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:hover {
    background-image: linear-gradient(135deg, #FF4444 0%, #7AC1FF 50%, #FFEA80 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: transparent;
  }
`; */

const MobileDropdownItem = styled(Link)`
  padding: 0.8rem 1.2rem;
  font-size: 0.95rem;
  color: #555;
  text-decoration: none;
  border-radius: 8px;
  margin: 0.2rem 0;
  background: rgba(255, 255, 255, 0.8);
  border-left: 3px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 144, 226, 0.08);
    border-left-color: #4A90E2;
    transform: translateX(4px);
  }
`;

const MobileDropdownMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: rgba(248, 249, 255, 0.8);
  border-radius: 12px;
  margin: 0.5rem 0 1rem;
  padding: 0.8rem;
  border: 1px solid rgba(74, 144, 226, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: inset 0 2px 8px rgba(74, 144, 226, 0.1);
`;

const DropdownToggleButton = styled.span`
  font-size: 1.2rem;
  color: #4A90E2;
  margin-left: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.2rem;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.1);

  &:hover {
    color: #FFD700;
    background: rgba(255, 215, 0, 0.2);
    transform: scale(1.1);
  }
`;

const CTAButton = styled(Link)`
  margin-top: auto;
  align-self: center;
  background: linear-gradient(135deg, #CD1B1B 0%, #FF4444 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(205, 27, 27, 0.3);
  border: 2px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #FF4444 0%, #CD1B1B 100%);
    box-shadow: 0 6px 20px rgba(205, 27, 27, 0.4);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const MobileLogo = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(74, 144, 226, 0.2);
  
  h1 {
    font-size: 1.4rem;
    font-weight: bold;
    font-family: "Bubblegum Sans", sans-serif;
    margin: 0;
    
    a {
      text-decoration: none;
      background: linear-gradient(135deg, #CD1B1B 0%, #4A90E2 50%, #FFD700 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(2px);
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

        {/* Opens on focus as well as hover: with hover alone the four service
            pages below were unreachable for keyboard users. */}
        <DropdownContainer
          onMouseEnter={() => setDropdownOpen("services")}
          onMouseLeave={() => setDropdownOpen(false)}
          onFocus={() => setDropdownOpen("services")}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setDropdownOpen(false);
            }
          }}
        >
          <NavLinkWrapper>
            <ScrollLink to="#services" color="#3F00FF">
              Services
            </ScrollLink>
            <DropdownIcon aria-hidden="true">▼</DropdownIcon>
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
                Assessments & Referrals
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

        {/* Mommy Angels Daycare - Direct Link - COMMENTED OUT */}
        {/* <DirectExternalNavLink
            href="https://www.mommyangelsdaycare.com/"
            target="_blank"
            rel="noopener noreferrer"
        >
            Mommy Angels Daycare
        </DirectExternalNavLink> */}

        <ScrollLink to="#contact" color="#CD1B1B">
          Contact
        </ScrollLink>
      </NavLinks>

      {/* Mobile Menu Button */}
      <MobileMenuButton
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <FaBars aria-hidden="true" />
      </MobileMenuButton>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <MobileMenuOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <MobileMenu
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <CloseButton
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <FaTimes aria-hidden="true" />
              </CloseButton>

              <MobileLogo>
                <h1>
                  <Link to="/" onClick={(e) => { handleLogoClick(e); setMenuOpen(false); }}>
                    Mommy Angels
                  </Link>
                </h1>
              </MobileLogo>

              <MobileNavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </MobileNavLink>

              <MobileNavLink as={ScrollLink} to="#about" onClick={() => setMenuOpen(false)}>
                About Us
              </MobileNavLink>

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
                <AnimatePresence>
                  {dropdownOpen === "services" && (
                    <MobileDropdownMenu
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
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
                        Assessments & Referrals
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
                </AnimatePresence>
              </DropdownContainer>

              {/* Mommy Angels Daycare - Direct Link for Mobile - COMMENTED OUT */}
              {/* <MobileDirectExternalNavLink
                  href="https://www.mommyangelsdaycare.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
              >
                  Mommy Angels Daycare
              </MobileDirectExternalNavLink> */}

              <MobileNavLink as={ScrollLink} to="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </MobileNavLink>

              <CTAButton to="/contact" onClick={() => setMenuOpen(false)}>
                📞 Enroll Now
              </CTAButton>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;