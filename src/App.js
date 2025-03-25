import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // No need for Router here
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
// import NoWaitlistBadge from "./components/NoWaitlistBadge"; // Import badge
import Footer from "./components/Footer"; // Import Footer


const MainContent = () => {
  const location = useLocation();
  // const isHomePage = location.pathname === "/"; // Check if on Home page

  return (
    <>
      {/* Navbar is visible on all pages */}
      <Navbar />
      
      {/* Show NoWaitlistBadge on all pages except Home */}
      {/* {!isHomePage && <NoWaitlistBadge />}  */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer is appended to every page */}
      <Footer />
    </>
  );
};
const App = () => {
  return (
    <>
      <MainContent />
    </>
  );
};


export default App;
