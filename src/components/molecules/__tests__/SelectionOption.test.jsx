import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectionOption from '../SelectionOption';

describe('SelectionOption Component', () => {
  const defaultProps = {
    label: '$20',
    value: '20',
    selected: false,
    onClick: jest.fn(),
    icon: 'dollar',
    ariaLabel: 'Select $20 withdrawal amount'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with correct label', () => {
    render(<SelectionOption {...defaultProps} />);
    expect(screen.getByText('$20')).toBeInTheDocument();
  });

  test('calls onClick with correct value when clicked', () => {
    const mockOnClick = jest.fn();
    render(<SelectionOption {...defaultProps} onClick={mockOnClick} />);
    
    const option = screen.getByRole('button');
    fireEvent.click(option);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('20');
  });

  test('handles keyboard events (Enter and Space)', () => {
    const mockOnClick = jest.fn();
    render(<SelectionOption {...defaultProps} onClick={mockOnClick} />);
    
    const option = screen.getByRole('button');
    
    fireEvent.keyDown(option, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledWith('20');
    
    fireEvent.keyDown(option, { key: ' ' });
    expect(mockOnClick).toHaveBeenCalledWith('20');
    
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  test('does not call onClick when disabled', () => {
    const mockOnClick = jest.fn();
    render(<SelectionOption {...defaultProps} onClick={mockOnClick} disabled />);
    
    const option = screen.getByRole('button');
    fireEvent.click(option);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('applies selected state styling', () => {
    render(<SelectionOption {...defaultProps} selected />);
    const option = screen.getByRole('button');
    expect(option).toHaveClass('border-3', 'border-[#FF5733]');
  });

  test('applies disabled state correctly', () => {
    render(<SelectionOption {...defaultProps} disabled />);
    const option = screen.getByRole('button');
    expect(option).toHaveClass('opacity-50', 'cursor-not-allowed');
    expect(option).toHaveAttribute('tabIndex', '-1');
  });

  test('has correct accessibility attributes', () => {
    render(<SelectionOption {...defaultProps} selected />);
    const option = screen.getByRole('button');
    expect(option).toHaveAttribute('aria-label', 'Select $20 withdrawal amount');
    expect(option).toHaveAttribute('aria-pressed', 'true');
  });

  test('has correct accessibility attributes when not selected', () => {
    render(<SelectionOption {...defaultProps} selected={false} />);
    const option = screen.getByRole('button');
    expect(option).toHaveAttribute('aria-pressed', 'false');
  });

  test('applies custom className', () => {
    render(<SelectionOption {...defaultProps} className="custom-class" />);
    const option = screen.getByRole('button');
    expect(option).toHaveClass('custom-class');
  });

  test('renders with different icon', () => {
    render(<SelectionOption {...defaultProps} icon="check" />);
    // Icon should be rendered (we can't easily test the specific icon without more complex setup)
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('uses default aria-label when not provided', () => {
    const propsWithoutAriaLabel = { ...defaultProps };
    delete propsWithoutAriaLabel.ariaLabel;
    
    render(<SelectionOption {...propsWithoutAriaLabel} />);
    const option = screen.getByRole('button');
    expect(option).toHaveAttribute('aria-label', 'Select $20');
  });

  test('ignores keyboard events other than Enter and Space', () => {
    const mockOnClick = jest.fn();
    render(<SelectionOption {...defaultProps} onClick={mockOnClick} />);
    
    const option = screen.getByRole('button');
    fireEvent.keyDown(option, { key: 'Tab' });
    fireEvent.keyDown(option, { key: 'Escape' });
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});