// ================================================================
// ADMIN LOGIN PAGE
// Authentication for admin users
// ================================================================

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

const LoginContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
`;

const LoginCard = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    padding: 40px;
    max-width: 450px;
    width: 100%;
`;

const Logo = styled.div`
    text-align: center;
    margin-bottom: 30px;
    
    h1 {
        color: #4A90E2;
        font-size: 28px;
        margin: 0 0 10px 0;
    }
    
    p {
        color: #666;
        font-size: 14px;
        margin: 0;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-weight: 600;
    color: #333;
    font-size: 14px;
`;

const Input = styled.input`
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
    
    &:focus {
        outline: none;
        border-color: #4A90E2;
    }
    
    &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }
`;

const Button = styled.button`
    padding: 12px 20px;
    background-color: #4A90E2;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover:not(:disabled) {
        background-color: #357ABD;
    }
    
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    background-color: #FFEBEE;
    color: #C62828;
    padding: 12px 15px;
    border-radius: 5px;
    font-size: 14px;
    border-left: 4px solid #C62828;
`;

const InfoMessage = styled.div`
    background-color: #E3F2FD;
    color: #1565C0;
    padding: 12px 15px;
    border-radius: 5px;
    font-size: 14px;
    border-left: 4px solid #1565C0;
    margin-bottom: 20px;
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get the page they were trying to access
    const from = location.state?.from?.pathname || '/admin/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);
            
            if (result.success) {
                // Redirect to the page they were trying to access
                navigate(from, { replace: true });
            } else {
                setError(result.error || 'Invalid email or password');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <LoginCard>
                <Logo>
                    <h1>Mommy Angels</h1>
                    <p>Admin Portal</p>
                </Logo>

                {location.state?.message && (
                    <InfoMessage>{location.state.message}</InfoMessage>
                )}

                <Form onSubmit={handleSubmit}>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    
                    <FormGroup>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@mommyangelsspecialtycare.com"
                            required
                            disabled={loading}
                            autoComplete="email"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                            autoComplete="current-password"
                        />
                    </FormGroup>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </Form>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
                    <p>Need help? Contact IT support</p>
                </div>
            </LoginCard>
        </LoginContainer>
    );
};

export default Login;
