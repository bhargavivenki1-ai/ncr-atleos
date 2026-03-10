import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from '../TextField';

describe('TextField Component', () => {
  const defaultProps = {
    placeholder: 'Enter text',
    value: '',
    onChange: jest.fn(),
    ariaLabel: 'Text input field'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with correct placeholder', () => {
    render(<TextField {...defaultProps} />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  test('displays value correctly', () => {
    render(<TextField {...defaultProps} value="test value" />);
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  test('calls onChange when user types', () => {
    const mockOnChange = jest.fn();
    render(<TextField {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'new text' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'new text' })
    }));
  });

  test('handles focus and blur events', () => {
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();
    
    render(
      <TextField 
        {...defaultProps} 
        onFocus={mockOnFocus} 
        onBlur={mockOnBlur} 
      />
    );
    
    const input = screen.getByPlaceholderText('Enter text');
    
    fireEvent.focus(input);
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  test('applies disabled state correctly', () => {
    render(<TextField {...defaultProps} disabled />);
    expect(screen.getByPlaceholderText('Enter text')).toBeDisabled();
  });

  test('applies required attribute correctly', () => {
    render(<TextField {...defaultProps} required />);
    expect(screen.getByPlaceholderText('Enter text')).toBeRequired();
  });

  test('has correct accessibility attributes', () => {
    render(
      <TextField 
        {...defaultProps} 
        ariaLabel="Test input"
        ariaDescribedBy="error-message"
      />
    );
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('aria-label', 'Test input');
    expect(input).toHaveAttribute('aria-describedby', 'error-message');
  });

  test('applies custom className', () => {
    render(<TextField {...defaultProps} className="custom-class" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('custom-class');
  });

  test('supports different input types', () => {
    render(<TextField {...defaultProps} type="password" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('type', 'password');
  });
});