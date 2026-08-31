// ================================================================
// FORM TEXTAREA COMPONENT
// Reusable textarea with validation
// ================================================================

import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
  
  span.required {
    color: #e53e3e;
    margin-left: 4px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#fc8181' : '#e2e8f0')};
  border-radius: 6px;
  font-size: 14px;
  color: #2d3748;
  background: white;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? '#fc8181' : '#4299e1')};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(252, 129, 129, 0.1)' : 'rgba(66, 153, 225, 0.1)')};
  }
  
  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

const ErrorMessage = styled.p`
  margin: 6px 0 0 0;
  font-size: 13px;
  color: #e53e3e;
`;

const CharCount = styled.p`
  margin: 6px 0 0 0;
  font-size: 13px;
  color: #718096;
  text-align: right;
`;

const FormTextarea = ({ 
  label, 
  name, 
  placeholder,
  required = false,
  error,
  register,
  rows = 4,
  maxLength,
  value,
  ...rest 
}) => {
  return (
    <FormGroup>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </Label>
      )}
      <Textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        $hasError={!!error}
        {...(register ? register(name) : {})}
        {...rest}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {maxLength && value && (
        <CharCount>
          {value.length} / {maxLength} characters
        </CharCount>
      )}
    </FormGroup>
  );
};

export default FormTextarea;
