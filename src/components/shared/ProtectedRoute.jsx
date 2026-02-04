// ================================================================
// PROTECTED ROUTE COMPONENT
// Redirect to login if not authenticated
// ================================================================

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner fullPage text="Verifying authentication..." />;
    }

    if (!isAuthenticated) {
        // Redirect to login, but save the location they were trying to access
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // Check role-based access if roles are specified
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <h2>Access Denied</h2>
                <p>You don't have permission to access this page.</p>
                <p>Required role(s): {allowedRoles.join(', ')}</p>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
