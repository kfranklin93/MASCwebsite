// ================================================================
// LOADING SPINNER COMPONENT TESTS
// ================================================================

import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Please wait..." />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('renders without text when text prop is empty', () => {
    render(<LoadingSpinner text="" />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders in full page mode', () => {
    const { container } = render(<LoadingSpinner fullPage />);
    const spinnerContainer = container.firstChild;
    expect(spinnerContainer).toHaveStyle({ minHeight: '100vh' });
  });

  it('renders with custom size', () => {
    const { container } = render(<LoadingSpinner size="100px" />);
    const spinner = container.querySelector('div > div');
    expect(spinner).toHaveStyle({ width: '100px', height: '100px' });
  });

  it('has spinning animation', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('div > div');
    expect(spinner).toHaveStyleRule('animation', expect.stringContaining('spin'));
  });
});
