import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardTile from '../DashboardTile';

// Mock icon component
const MockIcon = () => <svg data-testid="mock-icon">Icon</svg>;

describe('DashboardTile', () => {
  const defaultProps = {
    title: 'Test Tile',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<DashboardTile {...defaultProps} />);
    
    expect(screen.getByText('Test Tile')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with subtitle when provided', () => {
    render(<DashboardTile {...defaultProps} subtitle="Test Subtitle" />);
    
    expect(screen.getByText('Test Tile')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders with icon when provided', () => {
    render(<DashboardTile {...defaultProps} icon={<MockIcon />} />);
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockClick = jest.fn();
    render(<DashboardTile {...defaultProps} onClick={mockClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter key is pressed', () => {
    const mockClick = jest.fn();
    render(<DashboardTile {...defaultProps} onClick={mockClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Space key is pressed', () => {
    const mockClick = jest.fn();
    render(<DashboardTile {...defaultProps} onClick={mockClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: ' ' });
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const mockClick = jest.fn();
    render(<DashboardTile {...defaultProps} onClick={mockClick} disabled />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockClick).not.toHaveBeenCalled();
  });

  it('has correct accessibility attributes', () => {
    render(<DashboardTile {...defaultProps} ariaLabel="Custom Label" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom Label');
    expect(button).toHaveAttribute('tabIndex', '0');
  });

  it('uses title as aria-label when ariaLabel is not provided', () => {
    render(<DashboardTile {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Test Tile');
  });

  it('has correct disabled state attributes', () => {
    render(<DashboardTile {...defaultProps} disabled />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('tabIndex', '-1');
  });

  it('applies custom className', () => {
    render(<DashboardTile {...defaultProps} className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has proper styling classes', () => {
    render(<DashboardTile {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-card-background');
    expect(button).toHaveClass('rounded-16');
    expect(button).toHaveClass('shadow-[0px_2px_7px_rgba(0,0,0,0.08)]');
  });
});