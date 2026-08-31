// ================================================================
// FORM CHECKBOX COMPONENT
// Reusable checkbox with label
// ================================================================

import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  margin-bottom: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  user-select: none;
  
  &:hover input:not(:disabled) ~ .checkmark {
    border-color: #4299e1;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  
  &:checked ~ .checkmark {
    background: #4299e1;
    border-color: #4299e1;
  }
  
  &:checked ~ .checkmark:after {
    display: block;
  }
  
  &:disabled ~ .checkmark {
    background: #f7fafc;
    cursor: not-allowed;
  }
  
  &:focus ~ .checkmark {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
`;

const Checkmark = styled.span`
  position: relative;
  flex-shrink: 0;
  height: 20px;
  width: 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-top: 2px;
  
  &:after {
    content: '';
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const LabelText = styled.span`
  margin-left: 12px;
  font-size: 14px;
  color: #2d3748;
  line-height: 1.5;
`;

const ErrorMessage = styled.p`
  margin: 6px 0 0 32px;
  font-size: 13px;
  color: #e53e3e;
`;

const FormCheckbox = ({ 
  label, 
  name, 
  error,
  register,
  ...rest 
}) => {
  return (
    <CheckboxWrapper>
      <CheckboxLabel>
        <HiddenCheckbox
          id={name}
          {...(register ? register(name) : {})}
          {...rest}
        />
        <Checkmark className="checkmark" />
        <LabelText>{label}</LabelText>
      </CheckboxLabel>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </CheckboxWrapper>
  );
};

export default FormCheckbox;
