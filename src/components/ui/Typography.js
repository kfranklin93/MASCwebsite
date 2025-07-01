import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, typography, media } from '../../styles/theme';

export const H1 = styled.h1`
  font-family: "Bubblegum Sans", cursive;
  font-size: ${typography.h1.size};
  line-height: ${typography.h1.lineHeight};
  color: ${props => props.color || colors.text.primary};
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => props.mb || '1rem'};
  
  ${media.tablet} {
    text-align: ${props => props.tabletAlign || props.align || 'left'};
  }
  
  ${media.mobile} {
    text-align: ${props => props.mobileAlign || props.align || 'left'};
  }
`;

export const H2 = styled.h2`
  font-family: "Bubblegum Sans", cursive;
  font-size: ${typography.h2.size};
  line-height: ${typography.h2.lineHeight};
  color: ${props => props.color || colors.text.primary};
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => props.mb || '0.75rem'};
  
  ${media.tablet} {
    text-align: ${props => props.tabletAlign || props.align || 'left'};
  }
  
  ${media.mobile} {
    text-align: ${props => props.mobileAlign || props.align || 'left'};
  }
`;

export const H3 = styled.h3`
  font-family: "Bubblegum Sans", cursive;
  font-size: ${typography.h3.size};
  line-height: ${typography.h3.lineHeight};
  color: ${props => props.color || colors.text.primary};
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => props.mb || '0.5rem'};
  
  ${media.tablet} {
    text-align: ${props => props.tabletAlign || props.align || 'left'};
  }
  
  ${media.mobile} {
    text-align: ${props => props.mobileAlign || props.align || 'left'};
  }
`;

export const Text = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: ${props => props.size || typography.body.size};
  line-height: ${typography.body.lineHeight};
  color: ${props => props.color || colors.text.primary};
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => props.mb || '1rem'};
  font-weight: ${props => props.weight || 400};
  
  ${media.tablet} {
    text-align: ${props => props.tabletAlign || props.align || 'left'};
  }
  
  ${media.mobile} {
    text-align: ${props => props.mobileAlign || props.align || 'left'};
  }
`;

export const AnimatedText = styled(motion(Text))`
  // Add any additional animated text styles here
`;

export const Span = styled.span`
  color: ${props => props.color || 'inherit'};
  font-weight: ${props => props.weight || 'inherit'};
`;

export const Strong = styled.strong`
  font-weight: 700;
  color: ${props => props.color || 'inherit'};
`;

export const Quote = styled.blockquote`
  font-family: "Nunito", sans-serif;
  font-size: ${typography.body.size};
  line-height: ${typography.body.lineHeight};
  color: ${colors.text.primary};
  font-style: italic;
  padding: 1rem 2rem;
  border-left: 4px solid ${colors.primary.main};
  margin: 1.5rem 0;
  background: ${colors.background.light};
  
  ${media.mobile} {
    padding: 0.75rem 1.5rem;
  }
`;

export const List = styled.ul`
  list-style-type: ${props => props.type || 'disc'};
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  
  li {
    margin-bottom: 0.5rem;
    line-height: ${typography.body.lineHeight};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const OrderedList = styled.ol`
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  
  li {
    margin-bottom: 0.5rem;
    line-height: ${typography.body.lineHeight};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Link = styled.a`
  color: ${colors.primary.main};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${colors.primary.dark};
    text-decoration: underline;
  }
`;

export const SmallText = styled(Text)`
  font-size: 0.875rem;
  color: ${colors.text.secondary};
`;