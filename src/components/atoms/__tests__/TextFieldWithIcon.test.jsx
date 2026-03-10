import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextFieldWithIcon from '../TextFieldWithIcon';
import Icon from '../Icon';

describe('TextFieldWithIcon Component', () => {
  const defaultProps = {
    placeholder: 'Enter text with icon',
    value: '',
    onChange: jest.fn(),
    ariaLabel: 'Text input field with icon',
    icon: <Icon name="creditCard" />
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with icon and input field', () => {
    render(<TextFieldWithIcon {...defaultProps} />);
    expect(screen.getByPlaceholderText('Enter text with icon')).toBeInTheDocument();
    // Icon should be present in the DOM
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('displays value correctly', () => {
    render(<TextFieldWithIcon {...defaultProps} value="test value" />);
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  test('calls onChange when user types', () => {
    const mockOnChange = jest.fn();
    render(<TextFieldWithIcon {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Enter text with icon');
    fireEvent.change(input, { target: { value: 'new text' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'new text' })
    }));
  });

  test('renders without icon when icon prop is not provided', () => {
    const propsWithoutIcon = { ...defaultProps };
    delete propsWithoutIcon.icon;
    
    render(<TextFieldWithIcon {...propsWithoutIcon} />);
    expect(screen.getByPlaceholderText('Enter text with icon')).toBeInTheDocument();
  });

  test('handles focus and blur events', () => {
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();
    
    render(
      <TextFieldWithIcon 
        {...defaultProps} 
        onFocus={mockOnFocus} 
        onBlur={mockOnBlur} 
      />
    );
    
    const input = screen.getByPlaceholderText('Enter text with icon');
    
    fireEvent.focus(input);
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  test('applies disabled state correctly', () => {
    render(<TextFieldWithIcon {...defaultProps} disabled />);
    expect(screen.getByPlaceholderText('Enter text with icon')).toBeDisabled();
  });

  test('applies required attribute correctly', () => {
    render(<TextFieldWithIcon {...defaultProps} required />);
    expect(screen.getByPlaceholderText('Enter text with icon')).toBeRequired();
  });

  test('has correct accessibility attributes', () => {
    render(
      <TextFieldWithIcon 
        {...defaultProps} 
        ariaLabel="Test input with icon"
        ariaDescribedBy="error-message"
      />
    );
    
    const input = screen.getByPlaceholderText('Enter text with icon');
    expect(input).toHaveAttribute('aria-label', 'Test input with icon');
    expect(input).toHaveAttribute('aria-describedby', 'error-message');
  });

  test('applies custom className', () => {
    render(<TextFieldWithIcon {...defaultProps} className="custom-class" />);
    const input = screen.getByPlaceholderText('Enter text with icon');
    expect(input).toHaveClass('custom-class');
  });

  test('supports different input types', () => {
    render(<TextFieldWithIcon {...defaultProps} type="email" />);
    const input = screen.getByPlaceholderText('Enter text with icon');
    expect(input).toHaveAttribute('type', 'email');
  });
});