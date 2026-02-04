// ================================================================
// PROTECTED ROUTE COMPONENT TESTS
// ================================================================

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../../hooks/useAuth';
import ProtectedRoute from '../ProtectedRoute';

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth', () => ({
  ...jest.requireActual('../../../hooks/useAuth'),
  useAuth: jest.fn(),
}));

const { useAuth } = require('../../../hooks/useAuth');

// Test component
const TestComponent = () => <div>Protected Content</div>;

const renderWithRouter = (component, initialRoute = '/') => {
  window.history.pushState({}, 'Test page', initialRoute);
  
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<div>Login Page</div>} />
        <Route path="/protected" element={component} />
      </Routes>
    </BrowserRouter>
  );
};

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner while checking authentication', () => {
    useAuth.mockReturnValue({
      user: null,
      loading: true,
      isAuthenticated: false,
    });

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>,
      '/protected'
    );

    expect(screen.getByText(/verifying authentication/i)).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    useAuth.mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
    });

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>,
      '/protected'
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    useAuth.mockReturnValue({
      user: { id: 1, email: 'test@test.com', role: 'admin' },
      loading: false,
      isAuthenticated: true,
    });

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>,
      '/protected'
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('shows access denied when user lacks required role', () => {
    useAuth.mockReturnValue({
      user: { id: 1, email: 'test@test.com', role: 'admin' },
      loading: false,
      isAuthenticated: true,
    });

    renderWithRouter(
      <ProtectedRoute allowedRoles={['owner', 'bcba']}>
        <TestComponent />
      </ProtectedRoute>,
      '/protected'
    );

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.getByText(/required role\(s\): owner, bcba/i)).toBeInTheDocument();
  });

  it('renders children when user has required role', () => {
    useAuth.mockReturnValue({
      user: { id: 1, email: 'test@test.com', role: 'owner' },
      loading: false,
      isAuthenticated: true,
    });

    renderWithRouter(
      <ProtectedRoute allowedRoles={['owner', 'bcba']}>
        <TestComponent />
      </ProtectedRoute>,
      '/protected'
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
