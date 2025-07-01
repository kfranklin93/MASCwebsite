import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { media, colors, typography, shadows, transitions } from '../../styles/theme';

// Base Button styles
const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: ${typography.body.size};
  line-height: 1.5;
  transition: ${transitions.medium};
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  box-shadow: ${shadows.small};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${media.mobile} {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
`;

// Primary Button
export const PrimaryButton = styled(BaseButton)`
  background: ${colors.primary.main};
  color: ${colors.primary.text};
  border: 2px solid ${colors.primary.main};

  &:hover:not(:disabled) {
    background: ${colors.primary.dark};
    border-color: ${colors.primary.dark};
    transform: translateY(-2px);
    box-shadow: ${shadows.medium};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// Secondary Button
export const SecondaryButton = styled(BaseButton)`
  background: ${colors.secondary.main};
  color: ${colors.secondary.text};
  border: 2px solid ${colors.secondary.main};

  &:hover:not(:disabled) {
    background: ${colors.secondary.dark};
    border-color: ${colors.secondary.dark};
    transform: translateY(-2px);
    box-shadow: ${shadows.medium};
  }
`;

// Outline Button
export const OutlineButton = styled(BaseButton)`
  background: transparent;
  color: ${colors.primary.main};
  border: 2px solid ${colors.primary.main};

  &:hover:not(:disabled) {
    background: ${colors.primary.main};
    color: ${colors.primary.text};
    transform: translateY(-2px);
    box-shadow: ${shadows.medium};
  }
`;

// Text Button
export const TextButton = styled(BaseButton)`
  background: transparent;
  color: ${colors.primary.main};
  border: none;
  padding: 0.5rem 1rem;
  box-shadow: none;

  &:hover:not(:disabled) {
    color: ${colors.primary.dark};
    background: rgba(205, 27, 27, 0.1);
  }
`;

// Link Button
export const LinkButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: ${typography.body.size};
  line-height: 1.5;
  text-decoration: none;
  transition: ${transitions.medium};
  background: ${props => props.variant === 'secondary' ? colors.secondary.main : colors.primary.main};
  color: ${props => props.variant === 'secondary' ? colors.secondary.text : colors.primary.text};
  border: 2px solid ${props => props.variant === 'secondary' ? colors.secondary.main : colors.primary.main};
  box-shadow: ${shadows.small};

  &:hover {
    background: ${props => props.variant === 'secondary' ? colors.secondary.dark : colors.primary.dark};
    border-color: ${props => props.variant === 'secondary' ? colors.secondary.dark : colors.primary.dark};
    transform: translateY(-2px);
    box-shadow: ${shadows.medium};
  }

  ${media.mobile} {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
`;

// Animated Button
export const AnimatedButton = styled(motion(BaseButton))`
  background: ${colors.primary.main};
  color: ${colors.primary.text};
  border: 2px solid ${colors.primary.main};

  &:hover:not(:disabled) {
    background: ${colors.primary.dark};
    border-color: ${colors.primary.dark};
  }
`;

// Icon Button
export const IconButton = styled(BaseButton)`
  padding: 0.5rem;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${colors.text.primary};
  box-shadow: none;

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.05);
    color: ${colors.primary.main};
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

// Float Button (for fixed position buttons)
export const FloatButton = styled(BaseButton)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${colors.primary.main};
  color: ${colors.primary.text};
  border: none;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
  box-shadow: ${shadows.large};
  z-index: 1000;

  &:hover:not(:disabled) {
    transform: translateY(-4px);
    background: ${colors.primary.dark};
  }

  ${media.mobile} {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  ${media.mobile} {
    gap: 0.5rem;
  }
`;