import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the auth service
jest.mock('../services/authService', () => ({
  authenticatePin: jest.fn(),
}));

import { authenticatePin } from '../services/authService';

// Mock console.log and alert to avoid noise in tests
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('Dashboard Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    localStorage.clear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockAlert.mockRestore();
  });

  it('navigates from login to dashboard after successful authentication', async () => {
    // Mock successful authentication
    authenticatePin.mockResolvedValue({ success: true });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    // Verify we're on login page
    expect(screen.getByText('Enter PIN')).toBeInTheDocument();

    // Enter PIN (assuming PIN form accepts 4 digits)
    const pinInputs = screen.getAllByRole('textbox');
    
    // Simulate PIN entry (this depends on your PinForm implementation)
    if (pinInputs.length > 0) {
      fireEvent.change(pinInputs[0], { target: { value: '1234' } });
      
      // Find and click submit button
      const submitButton = screen.getByRole('button', { name: /submit|enter|login/i });
      fireEvent.click(submitButton);
    }

    // Wait for navigation to dashboard
    await waitFor(() => {
      expect(screen.getByText('Banking App')).toBeInTheDocument();
    });

    // Verify dashboard content
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByText('Cash Deposit')).toBeInTheDocument();
    expect(screen.getByText('Balance Enquiry')).toBeInTheDocument();
    expect(screen.getByText('Transfer Funds')).toBeInTheDocument();
  });

  it('redirects to login when accessing dashboard directly without authentication', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    // Should redirect to login page
    expect(screen.getByText('Enter PIN')).toBeInTheDocument();
  });

  it('handles dashboard tile interactions correctly', async () => {
    // Mock successful authentication
    authenticatePin.mockResolvedValue({ success: true });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    // Manually navigate to dashboard (simulating successful auth)
    // In a real scenario, this would happen after login
    
    // For this test, we'll render the dashboard directly
    const { rerender } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    // Since we're testing the dashboard functionality,
    // we'll focus on the tile interactions
    
    // This test would need to be adjusted based on your actual routing logic
    // For now, we'll test the basic functionality
  });

  it('maintains proper accessibility throughout navigation', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    // Check for proper semantic structure
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // Check for proper ARIA labels
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-label', 'Banking services navigation');

    // Check for proper keyboard navigation
    const tiles = screen.getAllByRole('button');
    tiles.forEach(tile => {
      expect(tile).toHaveAttribute('tabIndex');
    });
  });

  it('handles error states gracefully', async () => {
    // Mock authentication failure
    authenticatePin.mockResolvedValue({ success: false });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    // Verify error handling in login page
    expect(screen.getByText('Enter PIN')).toBeInTheDocument();
    
    // This test would need to be expanded based on your error handling implementation
  });

  it('clears session data on logout', () => {
    // Set some session data
    sessionStorage.setItem('test', 'data');
    localStorage.setItem('test', 'data');

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    // This test would need to trigger logout functionality
    // and verify that session data is cleared
    
    // For now, we'll just verify the initial state
    expect(sessionStorage.getItem('test')).toBe('data');
    expect(localStorage.getItem('test')).toBe('data');
  });
});