// ================================================================
// USE AUTH HOOK
// Authentication state management
// ================================================================

import { useState, useEffect, createContext, useContext } from 'react';
import { authAPI, setAuthToken, setUser, getUser, clearAuth } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in on mount
        const checkAuth = async () => {
            const storedUser = getUser();
            if (storedUser) {
                try {
                    const response = await authAPI.getMe();
                    if (response.success) {
                        setUserState(response.data.user);
                    } else {
                        clearAuth();
                    }
                } catch (err) {
                    console.error('Auth check failed:', err);
                    clearAuth();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await authAPI.login(email, password);
            
            if (response.success) {
                const { user, token } = response.data;
                setAuthToken(token);
                setUser(user);
                setUserState(user);
                return { success: true, user };
            } else {
                throw new Error(response.error || 'Login failed');
            }
        } catch (err) {
            const errorMessage = err.message || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            clearAuth();
            setUserState(null);
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            setError(null);
            const response = await authAPI.changePassword(currentPassword, newPassword);
            return response;
        } catch (err) {
            const errorMessage = err.message || 'Password change failed';
            setError(errorMessage);
            throw err;
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        changePassword,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth;
