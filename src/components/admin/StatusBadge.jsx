// ================================================================
// STATUS BADGE COMPONENT
// Displays status with color-coded styling
// ================================================================

import React from 'react';
import styled from 'styled-components';

const Badge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'success':
      case 'accepted':
      case 'submitted':
        return `
          background: #d4edda;
          color: #155724;
        `;
      case 'warning':
      case 'pending':
      case 'in_progress':
        return `
          background: #fff3cd;
          color: #856404;
        `;
      case 'danger':
      case 'declined':
      case 'expired':
        return `
          background: #f8d7da;
          color: #721c24;
        `;
      case 'info':
      case 'evaluation_needed':
      case 'waitlist':
        return `
          background: #d1ecf1;
          color: #0c5460;
        `;
      case 'draft':
        return `
          background: #e2e3e5;
          color: #383d41;
        `;
      default:
        return `
          background: #e9ecef;
          color: #495057;
        `;
    }
  }}
`;

const StatusBadge = ({ status, variant }) => {
  // Auto-detect variant from status if not provided
  const computedVariant = variant || status?.toLowerCase().replace(/\s+/g, '_');
  
  return (
    <Badge $variant={computedVariant}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
