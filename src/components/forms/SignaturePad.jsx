// ================================================================
// SIGNATURE CANVAS COMPONENT
// Digital signature pad using react-signature-canvas
// ================================================================

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import SignatureCanvas from 'react-signature-canvas';

const SignatureWrapper = styled.div`
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

const CanvasContainer = styled.div`
  border: 2px solid ${({ $hasError, $hasSignature }) => {
    if ($hasError) return '#fc8181';
    if ($hasSignature) return '#48bb78';
    return '#e2e8f0';
  }};
  border-radius: 8px;
  background: white;
  overflow: hidden;
  
  canvas {
    width: 100% !important;
    height: auto !important;
    display: block;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
  }
  
  ${({ $variant }) => {
    if ($variant === 'danger') {
      return `
        background: #fff5f5;
        color: #c53030;
        border-color: #fc8181;
        &:hover {
          background: #fed7d7;
        }
      `;
    }
    return '';
  }}
`;

const ErrorMessage = styled.p`
  margin: 8px 0 0 0;
  font-size: 13px;
  color: #e53e3e;
`;

const HelperText = styled.p`
  margin: 8px 0 0 0;
  font-size: 13px;
  color: #718096;
`;

const SignaturePad = ({ 
  label, 
  name,
  required = false,
  error,
  helperText,
  onChange,
  value
}) => {
  const sigCanvas = useRef();
  const [hasSignature, setHasSignature] = useState(false);

  const handleClear = () => {
    sigCanvas.current.clear();
    setHasSignature(false);
    if (onChange) onChange(null);
  };

  const handleEnd = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.toDataURL('image/png');
      setHasSignature(true);
      if (onChange) onChange(dataUrl);
    }
  };

  return (
    <SignatureWrapper>
      {label && (
        <Label>
          {label}
          {required && <span className="required">*</span>}
        </Label>
      )}
      
      <CanvasContainer $hasError={!!error} $hasSignature={hasSignature}>
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            width: 600,
            height: 200,
            className: 'signature-canvas'
          }}
          onEnd={handleEnd}
        />
      </CanvasContainer>

      <ButtonGroup>
        <Button type="button" onClick={handleClear} $variant="danger">
          Clear Signature
        </Button>
      </ButtonGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
      {!error && !helperText && (
        <HelperText>Please sign above using your mouse or touchscreen</HelperText>
      )}
    </SignatureWrapper>
  );
};

export default SignaturePad;
