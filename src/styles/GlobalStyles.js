import { createGlobalStyle } from 'styled-components';
import { colors, typography, media } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    ${media.tablet} {
      font-size: 15px;
    }
    
    ${media.mobile} {
      font-size: 14px;
    }
  }

  body {
    font-family: "Nunito", sans-serif;
    line-height: ${typography.body.lineHeight};
    color: ${colors.text.primary};
    background-color: ${colors.background.main};
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Bubblegum Sans", cursive;
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: ${typography.h1.size};
    line-height: ${typography.h1.lineHeight};
  }

  h2 {
    font-size: ${typography.h2.size};
    line-height: ${typography.h2.lineHeight};
  }

  h3 {
    font-size: ${typography.h3.size};
    line-height: ${typography.h3.lineHeight};
  }

  p {
    margin-bottom: 1rem;
    font-size: ${typography.body.size};
  }

  a {
    color: ${colors.primary.main};
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: ${colors.primary.light};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }

  /* Container widths */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    ${media.desktop} {
      max-width: 1140px;
    }

    ${media.laptop} {
      max-width: 960px;
    }

    ${media.tablet} {
      max-width: 720px;
    }

    ${media.mobile} {
      max-width: 540px;
      padding: 0 0.5rem;
    }
  }

  /* Utility classes */
  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

  .hide-mobile {
    ${media.mobile} {
      display: none !important;
    }
  }

  .hide-tablet {
    ${media.tablet} {
      display: none !important;
    }
  }

  .show-mobile {
    display: none !important;
    ${media.mobile} {
      display: block !important;
    }
  }

  /* Accessibility */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus styles */
  :focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }

  :focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }

  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Print styles */
  @media print {
    html {
      font-size: 13pt;
    }
    
    body {
      background: none;
      color: black;
    }
    
    a {
      color: black;
      text-decoration: underline;
    }
  }
`;