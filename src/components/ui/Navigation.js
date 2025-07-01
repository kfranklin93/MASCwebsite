import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, typography, shadows, transitions, media } from '../../styles/theme';

// Nav Container
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${colors.background.main};
  box-shadow: ${shadows.small};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: ${transitions.medium};
  
  ${media.mobile} {
    padding: 0.75rem 1rem;
  }
`;

// Nav Brand
export const NavBrand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${colors.text.primary};
  font-family: "Bubblegum Sans", cursive;
  font-size: 1.5rem;
  font-weight: 700;
  
  img {
    height: 40px;
    margin-right: 0.75rem;
  }
  
  ${media.mobile} {
    font-size: 1.25rem;
    
    img {
      height: 32px;
    }
  }
`;

// Nav Links Container
export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  ${media.tablet} {
    display: ${props => props.mobileMenu ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${colors.background.main};
    padding: 1rem;
    box-shadow: ${shadows.medium};
    gap: 1rem;
  }
`;

// Nav Link
export const NavLink = styled(Link)`
  color: ${colors.text.primary};
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: ${typography.body.size};
  padding: 0.5rem;
  transition: ${transitions.fast};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${colors.primary.main};
    transition: ${transitions.fast};
  }
  
  &:hover, &.active {
    color: ${colors.primary.main};
    
    &:after {
      width: 100%;
    }
  }
  
  ${media.tablet} {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
    
    &:after {
      display: none;
    }
    
    &:hover, &.active {
      background: ${colors.primary.main};
      color: ${colors.primary.text};
      border-radius: 8px;
    }
  }
`;

// Hamburger Menu
export const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  span {
    width: 24px;
    height: 2px;
    background: ${colors.text.primary};
    transition: ${transitions.fast};
    position: relative;
    transform-origin: 1px;
  }
  
  ${media.tablet} {
    display: flex;
  }
`;

// Dropdown
export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownToggle = styled.button`
  color: ${colors.text.primary};
  background: none;
  border: none;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: ${typography.body.size};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:after {
    content: '▼';
    font-size: 0.75rem;
  }
  
  ${media.tablet} {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
    justify-content: center;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${colors.background.main};
  min-width: 200px;
  border-radius: 8px;
  box-shadow: ${shadows.medium};
  padding: 0.5rem;
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 1000;
  
  ${media.tablet} {
    position: static;
    box-shadow: none;
    background: transparent;
    min-width: auto;
    width: 100%;
    padding: 0;
    margin-top: 0.5rem;
  }
`;

export const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: ${colors.text.primary};
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: ${typography.body.size};
  transition: ${transitions.fast};
  border-radius: 4px;
  
  &:hover {
    background: ${colors.primary.main};
    color: ${colors.primary.text};
  }
  
  ${media.tablet} {
    text-align: center;
    padding: 0.75rem;
  }
`;

// Search Bar
export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${colors.grey[300]};
  border-radius: 8px;
  background: ${colors.background.light};
  transition: ${transitions.fast};
  
  &:focus-within {
    border-color: ${colors.primary.main};
    box-shadow: ${shadows.focus};
  }
  
  input {
    border: none;
    background: none;
    font-family: "Nunito", sans-serif;
    font-size: ${typography.body.size};
    color: ${colors.text.primary};
    width: 200px;
    
    &:focus {
      outline: none;
    }
  }
  
  ${media.tablet} {
    width: 100%;
    margin: 1rem 0;
    
    input {
      width: 100%;
    }
  }
`;

// User Menu
export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  ${media.tablet} {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }
`;