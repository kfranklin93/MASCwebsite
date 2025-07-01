import React from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { PageWrapper, MainContent } from './components/layout/Layout';
// Import your existing components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <GlobalStyles />
      <PageWrapper>
        <Navbar />
        <MainContent>
          <Hero />
          <About />
          {/* Other components */}
        </MainContent>
        <Footer />
      </PageWrapper>
    </>
  );
}

export default App;