import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Nav Container
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

// Nav Brand
export const NavBrand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333333;
  font-family: "Bubblegum Sans", cursive;
  font-size: 1.5rem;
  font-weight: 700;
  
  img {
    height: 40px;
    margin-right: 0.75rem;
  }
  
  @media (max-width: 768px) {
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
  
  @media (max-width: 768px) {
    display: ${props => props.mobileMenu ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #FFFFFF;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    gap: 1rem;
  }
`;

// Nav Link
export const NavLink = styled(Link)`
  color: #333333;
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  padding: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #CD1B1B;
    transition: all 0.3s ease;
  }
  
  &:hover, &.active {
    color: #CD1B1B;
    
    &:after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
    
    &:after {
      display: none;
    }
    
    &:hover, &.active {
      background: #CD1B1B;
      color: #FFFFFF;
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
    background: #333333;
    transition: all 0.3s ease;
    position: relative;
    transform-origin: 1px;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;