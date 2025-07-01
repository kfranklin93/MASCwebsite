import styled from 'styled-components';

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
  border: 2px solid ${props => props.error ? '#D32F2F' : '#E0E0E0'};
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  color: #333333;
  background: #FFFFFF;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }
  
  &:disabled {
    background: #F5F5F5;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #9E9E9E;
  }
`;

// Textarea
export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.error ? '#D32F2F' : '#E0E0E0'};
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  color: #333333;
  background: #FFFFFF;
  transition: all 0.2s ease;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }
  
  &:disabled {
    background: #F5F5F5;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #9E9E9E;
  }
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
  font-size: 1rem;
  color: #333333;
  font-weight: 600;
`;

// Error Message
export const ErrorMessage = styled.span`
  color: #D32F2F;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// Help Text
export const HelpText = styled.span`
  color: #666666;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// Form Grid
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

// Form Actions
export const FormActions = styled.div`
  display: flex;
  justify-content: ${props => props.justify || 'flex-end'};
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.stackMobile ? 'column' : 'row'};
    gap: ${props => props.stackMobile ? '0.75rem' : '1rem'};
  }
`;