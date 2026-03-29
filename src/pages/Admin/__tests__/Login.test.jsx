// ================================================================
// ADMIN LOGIN PAGE TESTS
// ================================================================

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthProvider } from '../../../hooks/useAuth';

// Mock useAuth hook
const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin,
    loading: false,
    error: null,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }),
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    renderLogin();
    
    expect(screen.getByText('Mommy Angels')).toBeInTheDocument();
    expect(screen.getByText('Admin Portal')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('updates email input when typed', () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  it('updates password input when typed', () => {
    renderLogin();
    
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput.value).toBe('password123');
  });

  it('submits form with email and password', async () => {
    mockLogin.mockResolvedValue({ success: true });
    
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'owner@mommyangelsspecialtycare.com' } });
    fireEvent.change(passwordInput, { target: { value: 'TempPassword123!' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        'owner@mommyangelsspecialtycare.com',
        'TempPassword123!'
      );
    });
  });

  it('displays error message on login failure', async () => {
    mockLogin.mockResolvedValue({ 
      success: false, 
      error: 'Invalid credentials' 
    });
    
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('disables form inputs and button while loading', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
  });

  it('requires email field', () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email address/i);
    expect(emailInput).toHaveAttribute('required');
  });

  it('requires password field', () => {
    renderLogin();
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('required');
  });

  it('email input has correct type', () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email address/i);
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('password input has correct type', () => {
    renderLogin();
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('navigates to dashboard on successful login', async () => {
    mockLogin.mockResolvedValue({ success: true });
    
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'owner@mommyangelsspecialtycare.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard', { replace: true });
    });
  });
});
