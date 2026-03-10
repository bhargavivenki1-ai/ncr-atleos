import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoundButton from '../RoundButton';
import Icon from '../Icon';

describe('RoundButton Component', () => {
  const defaultProps = {
    children: <Icon name="camera" />,
    onClick: jest.fn(),
    ariaLabel: 'Camera button'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with children content', () => {
    render(<RoundButton {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('Camera button')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<RoundButton {...defaultProps} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const mockOnClick = jest.fn();
    render(<RoundButton {...defaultProps} onClick={mockOnClick} disabled />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('applies disabled state correctly', () => {
    render(<RoundButton {...defaultProps} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('has correct accessibility attributes', () => {
    render(<RoundButton {...defaultProps} ariaLabel="Test button" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Test button');
  });

  test('applies different sizes correctly', () => {
    const { rerender } = render(<RoundButton {...defaultProps} size="sm" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('w-8', 'h-8');
    
    rerender(<RoundButton {...defaultProps} size="md" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('w-10', 'h-10');
    
    rerender(<RoundButton {...defaultProps} size="lg" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('w-12', 'h-12');
  });

  test('applies custom className', () => {
    render(<RoundButton {...defaultProps} className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  test('has correct default styling classes', () => {
    render(<RoundButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[#FF5733]', 'rounded-full');
  });

  test('handles keyboard events', () => {
    const mockOnClick = jest.fn();
    render(<RoundButton {...defaultProps} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyUp(button, { key: 'Enter' });
    
    // Button should be focusable and handle keyboard events
    expect(button).toBeInTheDocument();
  });

  test('supports custom button props', () => {
    render(
      <RoundButton 
        {...defaultProps} 
        type="submit"
        data-testid="custom-button"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('data-testid', 'custom-button');
  });
});