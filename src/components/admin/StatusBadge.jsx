// ================================================================
// STATUS BADGE COMPONENT
// Displays color-coded status indicators
// ================================================================

import React from 'react';
import styled from 'styled-components';

const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    text-transform: capitalize;
    
    ${props => {
        switch(props.$status) {
            case 'pending':
            case 'new':
                return `
                    background: #fff3cd;
                    color: #856404;
                `;
            case 'sent':
            case 'in_progress':
                return `
                    background: #cfe2ff;
                    color: #084298;
                `;
            case 'submitted':
            case 'active':
                return `
                    background: #d1e7dd;
                    color: #0f5132;
                `;
            case 'accepted':
            case 'approved':
                return `
                    background: #d1e7dd;
                    color: #0a3622;
                `;
            case 'evaluation_needed':
                return `
                    background: #fff3cd;
                    color: #664d03;
                `;
            case 'waitlist':
                return `
                    background: #e2e3e5;
                    color: #41464b;
                `;
            case 'declined':
            case 'expired':
            case 'inactive':
                return `
                    background: #f8d7da;
                    color: #842029;
                `;
            default:
                return `
                    background: #e2e3e5;
                    color: #41464b;
                `;
        }
    }}
`;

const StatusBadge = ({ status }) => {
    const displayStatus = status?.replace(/_/g, ' ') || 'unknown';
    
    return (
        <Badge $status={status}>
            {displayStatus}
        </Badge>
    );
};

export default StatusBadge;
