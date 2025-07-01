import styled from 'styled-components';
import { colors, typography, shadows, transitions, media } from '../../styles/theme';

// Form Container
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: ${props => props.maxWidth || '600px'};
  margin: ${props => props.margin || '0'};
`;

// Input Field
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.error ? colors.error.main : colors.grey[300]};
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: ${typography.body.size};
  color: ${colors.text.primary};
  background: ${colors.background.main};
  transition: ${transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: ${shadows.focus};
  }
  
  &:disabled {
    background: ${colors.grey[100]};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${colors.text.disabled};
  }
`;

// Textarea
export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.error ? colors.error.main : colors.grey[300]};
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: ${typography.body.size};
  color: ${colors.text.primary};
  background: ${colors.background.main};
  transition: ${transitions.fast};
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: ${shadows.focus};
  }
  
  &:disabled {
    background: ${colors.grey[100]};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${colors.text.disabled};
  }
`;

// Select
export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.error ? colors.error.main : colors.grey[300]};
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: ${typography.body.size};
  color: ${colors.text.primary};
  background: ${colors.background.main};
  transition: ${transitions.fast};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: ${shadows.focus};
  }
  
  &:disabled {
    background: ${colors.grey[100]};
    cursor: not-allowed;
  }
`;

// Checkbox
export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  cursor: pointer;
`;

// Radio
export const Radio = styled.input.attrs({ type: 'radio' })`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  cursor: pointer;
`;

// Form Group
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

// Label
export const Label = styled.label`
  font-family: "Nunito", sans-serif;
  font-size: ${typography.body.size};
  color: ${colors.text.primary};
  font-weight: 600;
`;

// Error Message
export const ErrorMessage = styled.span`
  color: ${colors.error.main};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// Help Text
export const HelpText = styled.span`
  color: ${colors.text.secondary};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// Form Grid
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  gap: 1.5rem;
  
  ${media.tablet} {
    grid-template-columns: repeat(${props => props.tabletColumns || 2}, 1fr);
  }
  
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

// Form Section
export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid ${colors.grey[200]};
  border-radius: 8px;
  background: ${colors.background.light};
  
  ${media.mobile} {
    padding: 1rem;
  }
`;

// Form Actions
export const FormActions = styled.div`
  display: flex;
  justify-content: ${props => props.justify || 'flex-end'};
  gap: 1rem;
  margin-top: 2rem;
  
  ${media.mobile} {
    flex-direction: ${props => props.stackMobile ? 'column' : 'row'};
    gap: ${props => props.stackMobile ? '0.75rem' : '1rem'};
  }
`;