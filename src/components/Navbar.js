import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  // width: 100%;
  width: -webkit-fill-available;
  // background: linear-gradient(90deg, #FF6F61, #FFD97D, #A8E6CF, #A0C4FF);
  padding: 1rem 1rem;
  background: linear-gradient(90deg, #A7C7E7, #FFF4B2); /* Soft Blue to Yellow */
  // background: linear-gradient(to bottom, #A7C7E7, #FFF4B2); /* Soft Blue to Yellow */
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  // box-shadow: 0px 4px 10px rgba(255, 244, 178, 0.5);
  box-shadow: 0px 4px 10px rgba(167, 199, 231, 0.9);
  z-index: 1000;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
const Logo = styled(motion.h1)`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Bubblegum Sans", sans-serif;
  cursor: pointer;
`;

const NavLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #4A90E2;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer variants={navVariants} initial="hidden" animate="visible">
      <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
         <StyledLink to="/">Mommy Angels</StyledLink>
      </Logo>

      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
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
export default Navbar;


// import React, { useState } from "react";
// import styled from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <NavbarContainer variants={navVariants} initial="hidden" animate="visible">
//       <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//         <StyledLink to="/">Mommy Angels</StyledLink>
//       </Logo>

//       <NavLinks>
//         <StyledNavLink to="/">Home</StyledNavLink>
//         <StyledNavLink to="/about">About</StyledNavLink>
//         <StyledNavLink to="/services">Services</StyledNavLink>
//         <StyledNavLink to="/contact">Contact</StyledNavLink>
//       </NavLinks>

//       <MobileMenuButton onClick={() => setMenuOpen(true)}>
//         <FaBars />
//       </MobileMenuButton>

//       <AnimatePresence>
//         {menuOpen && (
//           <MobileMenu
//             variants={menuVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <CloseButton onClick={() => setMenuOpen(false)} />
//             <StyledNavLink to="/" onClick={() => setMenuOpen(false)}>Home</StyledNavLink>
//             <StyledNavLink to="/about" onClick={() => setMenuOpen(false)}>About</StyledNavLink>
//             <StyledNavLink to="/services" onClick={() => setMenuOpen(false)}>Services</StyledNavLink>
//             <StyledNavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</StyledNavLink>
//           </MobileMenu>
//         )}
//       </AnimatePresence>
//     </NavbarContainer>
//   );
// };

// //  Styled Components 
// const NavbarContainer = styled(motion.nav)`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: linear-gradient(90deg, #FF6F61, #A8E6CF, #FFD97D, #A0C4FF);
//   box-shadow: 0px 4px 10px rgba(255, 244, 178, 0.5);
//   border-radius: 8px;
//   z-index: 1000;
// `;

// // const NavbarContainer = styled(motion.nav)`
// //   position: fixed;
// //   top: 0;
// //   left: 0;
// //   width: 100%;
// //   padding: 1rem 2rem;
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   background: linear-gradient(90deg, red, green, yellow, blue);
// //   box-shadow: 0px 4px 10px rgba(255, 244, 178, 0.5);
// //   border-radius: 8px;
// //   z-index: 1000;
// // `;

// const Logo = styled(motion.h1)`
//   font-size: 1.5rem;
//   font-weight: bold;
//   font-family: "Bubblegum Sans", sans-serif;
//   cursor: pointer;
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: white;
// `;

// const NavLinks = styled.ul`
//   display: flex;
//   list-style: none;
//   gap: 1.5rem;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const StyledNavLink = styled(Link)`
//   text-decoration: none;
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: white;
//   padding: 0.5rem 1rem;
//   background: rgba(255, 255, 255, 0.2);
//   border-radius: 6px;
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     background: white;
//     color: black;
//     transform: scale(1.1);
//   }
// `;

// const MobileMenuButton = styled.div`
//   display: none;
//   font-size: 1.8rem;
//   cursor: pointer;
//   color: white;

//   @media (max-width: 768px) {
//     display: block;
//   }
// `;

// const MobileMenu = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background: rgba(255, 255, 255, 0.95);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 2rem;
//   font-size: 1.5rem;
//   font-weight: bold;
//   z-index: 999;
// `;

// const CloseButton = styled(FaTimes)`
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   font-size: 2rem;
//   cursor: pointer;
// `;



// export default Navbar;
