// src/App.js
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import HiringBanner from "./components/HiringBanner";
import NoWaitlistBadge from "./components/NoWaitlistBadge"; 

function App() {
  return (
    <>
      <Navbar />
      {/* <NoWaitlistBadge /> */}
      {/* <div style={{ paddingTop: "80px" }}> Adjust padding to match navbar height */}
      {/* <HiringBanner /> */}
      {/* <div className="text-4xl font-bold text-red-500">
  Tailwind is working!
</div> */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {/* </div> */}
    </>
  );
}

export default App;

// import React from 'react';
// import Hero from './components/Hero';
// import About from './components/About';
// import Services from './components/Services';
// import Contact from './components/Contact';
// import Footer from './components/Footer';
// import Navbar from "./components/Navbar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// <style>
// @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap');
// </style>

// function App() {
//   return (
//       <><Navbar /><Routes>
//       <Route path="/hero" element={<Hero />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/services" element={<Services />} />
//       <Route path="/contact" element={<Contact />} />
//     </Routes></>
//   );
// }

// export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
