// Theme colors used throughout your site
export const theme = {
  colors: {
    // Primary Colors
    primary: {
      red: '#CD1B1B',     // Your existing red
      blue: '#4A90E2',    // Your existing blue
      yellow: '#FFD700',  // Your existing yellow
      green: '#00695C',   // Your existing green
    },
    // Secondary/Accent Colors
    secondary: {
      lightRed: 'rgba(205, 27, 27, 0.1)',
      lightBlue: 'rgba(74, 144, 226, 0.1)',
      lightYellow: 'rgba(255, 215, 0, 0.1)',
      lightGreen: 'rgba(0, 105, 92, 0.1)',
    },
    // Text Colors
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#FFFFFF',
    },
    // Background Colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F9FF',
      gradient: 'linear-gradient(135deg, #F5F9FF 0%, #FFFFFF 100%)',
      overlay: 'rgba(255, 255, 255, 0.85)',
    },
    // Border Colors
    border: {
      red: 'rgba(205, 27, 27, 0.5)',
      blue: 'rgba(74, 144, 226, 0.5)',
      yellow: 'rgba(255, 215, 0, 0.5)',
      green: 'rgba(0, 105, 92, 0.5)',
    }
  },
  // Add gradients that match your brand
  gradients: {
    primary: 'linear-gradient(90deg, #CD1B1B, #4A90E2, #FFD700)',
    card: 'linear-gradient(135deg, #FFFFFF 0%, #F5F9FF 100%)',
    overlay: 'linear-gradient(45deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 25%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)',
  }
};

// Common style mixins
export const mixins = {
  cardShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  buttonShadow: '0 4px 12px rgba(74, 144, 226, 0.2)',
  transition: 'all 0.3s ease',
};