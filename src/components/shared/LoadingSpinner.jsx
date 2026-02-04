// ================================================================
// LOADING SPINNER COMPONENT
// Reusable loading indicator
// ================================================================

import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${props => props.$fullPage ? '100px' : '40px'} 20px;
    min-height: ${props => props.$fullPage ? '100vh' : 'auto'};
`;

const Spinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4A90E2;
    border-radius: 50%;
    width: ${props => props.$size || '50px'};
    height: ${props => props.$size || '50px'};
    animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
    margin-top: 20px;
    color: #666;
    font-size: 16px;
`;

const LoadingSpinner = ({ 
    size = '50px', 
    text = 'Loading...', 
    fullPage = false 
}) => {
    return (
        <SpinnerContainer $fullPage={fullPage}>
            <Spinner $size={size} />
            {text && <LoadingText>{text}</LoadingText>}
        </SpinnerContainer>
    );
};

export default LoadingSpinner;
