import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LoginPage from '../LoginPage';
import * as authService from '../../services/authService';

// Mock the auth service
jest.mock('../../services/authService');

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authService.authenticatePin.mockClear();
  });
  
  it('renders login page elements', () => {
    renderLoginPage();
    
    expect(screen.getByText('Enter PIN')).toBeInTheDocument();
    expect(screen.getByText('Please enter your 4-digit PIN')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('PIN')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue with PIN' })).toBeInTheDocument();
  });
  
  it('successfully authenticates with correct PIN', async () => {
    const user = userEvent.setup();
    authService.authenticatePin.mockResolvedValue({
      success: true,
      sessionToken: 'mock-token',
      user: { id: '123', name: 'John Doe' }
    });
    
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button', { name: 'Continue with PIN' });
    
    await user.type(input, '1234');
    await user.click(button);
    
    expect(authService.authenticatePin).toHaveBeenCalledWith('1234');
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });
  
  it('shows error message for incorrect PIN', async () => {
    const user = userEvent.setup();
    authService.authenticatePin.mockResolvedValue({
      success: false,
      reason: 'invalid_pin',
      message: 'The PIN you entered is incorrect'
    });
    
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button', { name: 'Continue with PIN' });
    
    await user.type(input, '9999');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('The PIN you entered is incorrect. Please try again.')).toBeInTheDocument();
    });
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  
  it('locks account after maximum failed attempts', async () => {
    const user = userEvent.setup();
    authService.authenticatePin.mockResolvedValue({
      success: false,
      reason: 'invalid_pin',
      message: 'The PIN you entered is incorrect'
    });
    
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button', { name: 'Continue with PIN' });
    
    // First failed attempt
    await user.clear(input);
    await user.type(input, '9999');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('The PIN you entered is incorrect. Please try again.')).toBeInTheDocument();
    });
    
    // Second failed attempt
    await user.clear(input);
    await user.type(input, '8888');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('The PIN you entered is incorrect. Please try again.')).toBeInTheDocument();
    });
    
    // Third failed attempt - should lock account
    await user.clear(input);
    await user.type(input, '7777');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/For your security, your account has been temporarily locked/)).toBeInTheDocument();
    });
    
    // Form should be disabled
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
  
  it('resets failed attempts on successful login', async () => {
    const user = userEvent.setup();
    
    // First call fails
    authService.authenticatePin.mockResolvedValueOnce({
      success: false,
      reason: 'invalid_pin',
      message: 'The PIN you entered is incorrect'
    });
    
    // Second call succeeds
    authService.authenticatePin.mockResolvedValueOnce({
      success: true,
      sessionToken: 'mock-token',
      user: { id: '123', name: 'John Doe' }
    });
    
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button', { name: 'Continue with PIN' });
    
    // Failed attempt
    await user.type(input, '9999');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('The PIN you entered is incorrect. Please try again.')).toBeInTheDocument();
    });
    
    // Successful attempt
    await user.clear(input);
    await user.type(input, '1234');
    await user.click(button);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });
  
  it('shows loading state during authentication', async () => {
    const user = userEvent.setup();
    let resolveAuth;
    authService.authenticatePin.mockReturnValue(
      new Promise(resolve => {
        resolveAuth = resolve;
      })
    );
    
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button', { name: 'Continue with PIN' });
    
    await user.type(input, '1234');
    await user.click(button);
    
    // Should show loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(button).toBeDisabled();
    
    // Resolve the promise
    resolveAuth({ success: true, sessionToken: 'token' });
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
  
  it('handles network errors gracefully', async () => {
    const user = userEvent.setup();
    authService.authenticatePin.mockRejectedValue(new Error('Network error'));
    
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button', { name: 'Continue with PIN' });
    
    await user.type(input, '1234');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('We could not log you in at this time. Please try again later.')).toBeInTheDocument();
    });
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  
  it('prevents submission when account is locked', async () => {
    const user = userEvent.setup();
    authService.authenticatePin.mockResolvedValue({
      success: false,
      reason: 'invalid_pin'
    });
    
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button', { name: 'Continue with PIN' });
    
    // Lock the account by failing 3 times
    for (let i = 0; i < 3; i++) {
      await user.clear(input);
      await user.type(input, '9999');
      await user.click(button);
      await waitFor(() => screen.getByRole('alert'));
    }
    
    // Account should be locked
    await waitFor(() => {
      expect(screen.getByText(/temporarily locked/)).toBeInTheDocument();
    });
    
    // Reset mock call count
    authService.authenticatePin.mockClear();
    
    // Try to submit again - should not call auth service
    await user.clear(input);
    await user.type(input, '1234');
    await user.click(button);
    
    expect(authService.authenticatePin).not.toHaveBeenCalled();
  });
  
  it('has proper page structure and accessibility', () => {
    renderLoginPage();
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});