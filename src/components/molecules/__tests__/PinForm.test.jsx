import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PinForm from '../PinForm';

describe('PinForm', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    loading: false,
    error: '',
    disabled: false
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders form elements correctly', () => {
    render(<PinForm {...defaultProps} />);
    
    expect(screen.getByText('Please enter your 4-digit PIN')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('PIN')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue with PIN' })).toBeInTheDocument();
  });
  
  it('handles PIN input correctly', async () => {
    const user = userEvent.setup();
    render(<PinForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('PIN');
    await user.type(input, '1234');
    
    expect(input).toHaveValue('1234');
  });
  
  it('only allows numeric input', async () => {
    const user = userEvent.setup();
    render(<PinForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('PIN');
    await user.type(input, 'abc123def');
    
    expect(input).toHaveValue('123');
  });
  
  it('limits input to 4 digits', async () => {
    const user = userEvent.setup();
    render(<PinForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('PIN');
    await user.type(input, '123456789');
    
    expect(input).toHaveValue('1234');
  });
  
  it('enables submit button when PIN is 4 digits', async () => {
    const user = userEvent.setup();
    render(<PinForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button', { name: 'Continue with PIN' });
    
    expect(button).toBeDisabled();
    
    await user.type(input, '1234');
    expect(button).not.toBeDisabled();
  });
  
  it('calls onSubmit with PIN when form is submitted', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<PinForm {...defaultProps} onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button', { name: 'Continue with PIN' });
    
    await user.type(input, '1234');
    await user.click(button);
    
    expect(mockOnSubmit).toHaveBeenCalledWith('1234');
  });
  
  it('prevents submission when PIN is less than 4 digits', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<PinForm {...defaultProps} onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('PIN');
    
    await user.type(input, '123');
    
    // Try to submit by pressing Enter
    fireEvent.submit(screen.getByRole('form'));
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  
  it('shows validation error when touched and invalid', async () => {
    const user = userEvent.setup();
    render(<PinForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('PIN');
    
    await user.type(input, '12');
    await user.tab(); // Trigger blur event
    
    expect(screen.getByText('PIN must be 4 digits')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
  
  it('displays custom error message', () => {
    render(<PinForm {...defaultProps} error="Invalid PIN" />);
    
    expect(screen.getByText('Invalid PIN')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
  
  it('shows loading state', () => {
    render(<PinForm {...defaultProps} loading />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  it('disables form when disabled prop is true', () => {
    render(<PinForm {...defaultProps} disabled />);
    
    const input = screen.getByPlaceholderText('PIN');
    const button = screen.getByRole('button');
    
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
  
  it('has proper accessibility attributes', () => {
    render(<PinForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('PIN');
    const heading = screen.getByText('Please enter your 4-digit PIN');
    
    expect(input).toHaveAttribute('aria-describedby', 'pin-instruction');
    expect(input).toHaveAttribute('aria-label', 'Enter your 4-digit PIN');
    expect(heading).toHaveAttribute('id', 'pin-instruction');
    expect(input).toHaveAttribute('inputMode', 'numeric');
    expect(input).toHaveAttribute('autoComplete', 'off');
  });
  
  it('updates aria-describedby when error is shown', async () => {
    const user = userEvent.setup();
    render(<PinForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('PIN');
    
    await user.type(input, '12');
    await user.tab();
    
    expect(input).toHaveAttribute('aria-describedby', 'pin-error');
  });
  
  it('handles form submission via Enter key', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<PinForm {...defaultProps} onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('PIN');
    
    await user.type(input, '1234');
    await user.keyboard('{Enter}');
    
    expect(mockOnSubmit).toHaveBeenCalledWith('1234');
  });
});