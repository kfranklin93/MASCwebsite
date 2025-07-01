// Add at the top of your index.css or a new styles/theme.js file

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px',
  largeDesktop: '1400px',
  extraLargeDesktop: '1920px'
};

export const deviceSizes = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  laptop: `(max-width: ${breakpoints.laptop})`,
  desktop: `(max-width: ${breakpoints.desktop})`,
  largeDesktop: `(max-width: ${breakpoints.largeDesktop})`,
  extraLargeDesktop: `(max-width: ${breakpoints.extraLargeDesktop})`
};

// Common spacing values
export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  xxl: '4rem'
};

// Font sizes that scale well across devices
export const typography = {
  h1: {
    size: 'clamp(2rem, 4vw, 3rem)',
    lineHeight: '1.2',
    weight: '700'
  },
  h2: {
    size: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    lineHeight: '1.3',
    weight: '600'
  },
  h3: {
    size: 'clamp(1.5rem, 3vw, 2rem)',
    lineHeight: '1.4',
    weight: '600'
  },
  body: {
    size: 'clamp(1rem, 1.2vw, 1.2rem)',
    lineHeight: '1.6',
    weight: '400'
  }
};

// Border radiuses
export const borderRadius = {
  small: '5px',
  medium: '10px',
  large: '15px',
  rounded: '50%'
};

// Z-index management
export const zIndex = {
  background: 0,
  decorative: 1,
  content: 2,
  overlay: 3,
  modal: 4,
  toast: 5
};

// Common box shadows
export const shadows = {
  small: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
  large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  focus: '0 0 0 3px rgba(74, 144, 226, 0.3)'
};

// Color palette
export const colors = {
  primary: {
    main: '#CD1B1B',
    light: '#FF4444',
    dark: '#B71C1C',
    text: '#FFFFFF'
  },
  secondary: {
    main: '#4A90E2',
    light: '#64B5F6',
    dark: '#1976D2',
    text: '#FFFFFF'
  },
  accent: {
    main: '#FFD700',
    light: '#FFF176',
    dark: '#FFA000',
    text: '#000000'
  },
  grey: {
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    disabled: '#9E9E9E'
  },
  background: {
    main: '#FFFFFF',
    light: '#F5F5F5',
    dark: '#EEEEEE'
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828'
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20'
  },
  warning: {
    main: '#ED6C02',
    light: '#FF9800',
    dark: '#E65100'
  }
};

// Common transitions
export const transitions = {
  fast: 'all 0.2s ease-in-out',
  medium: 'all 0.3s ease-in-out',
  slow: 'all 0.5s ease-in-out'
};

// Common animations
export const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideIn: `
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `
};

// Common media queries
export const media = {
  mobile: `@media screen and (max-width: ${breakpoints.mobile})`,
  tablet: `@media screen and (max-width: ${breakpoints.tablet})`,
  laptop: `@media screen and (max-width: ${breakpoints.laptop})`,
  desktop: `@media screen and (max-width: ${breakpoints.desktop})`,
  largeDesktop: `@media screen and (max-width: ${breakpoints.largeDesktop})`,
  extraLargeDesktop: `@media screen and (max-width: ${breakpoints.extraLargeDesktop})`
};