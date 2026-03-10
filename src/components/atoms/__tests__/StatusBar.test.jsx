import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusBar from '../StatusBar';

describe('StatusBar', () => {
  it('renders with default props', () => {
    render(<StatusBar />);
    
    expect(screen.getByText('10:30')).toBeInTheDocument();
    expect(screen.getByLabelText('Signal strength')).toBeInTheDocument();
    expect(screen.getByLabelText('WiFi connected')).toBeInTheDocument();
    expect(screen.getByLabelText('Battery level 80%')).toBeInTheDocument();
  });
  
  it('displays custom time', () => {
    render(<StatusBar time="14:25" />);
    
    expect(screen.getByText('14:25')).toBeInTheDocument();
  });
  
  it('shows battery level correctly', () => {
    render(<StatusBar batteryLevel={50} />);
    
    expect(screen.getByLabelText('Battery level 50%')).toBeInTheDocument();
  });
  
  it('handles battery level edge cases', () => {
    const { rerender } = render(<StatusBar batteryLevel={-10} />);
    expect(screen.getByLabelText('Battery level -10%')).toBeInTheDocument();
    
    rerender(<StatusBar batteryLevel={150} />);
    expect(screen.getByLabelText('Battery level 150%')).toBeInTheDocument();
  });
  
  it('hides signal when hasSignal is false', () => {
    render(<StatusBar hasSignal={false} />);
    
    expect(screen.queryByLabelText('Signal strength')).not.toBeInTheDocument();
  });
  
  it('hides wifi when hasWifi is false', () => {
    render(<StatusBar hasWifi={false} />);
    
    expect(screen.queryByLabelText('WiFi connected')).not.toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    render(<StatusBar className="custom-class" />);
    
    const statusBar = screen.getByRole('banner');
    expect(statusBar).toHaveClass('custom-class');
  });
  
  it('has proper accessibility attributes', () => {
    render(<StatusBar />);
    
    const statusBar = screen.getByRole('banner');
    expect(statusBar).toHaveAttribute('aria-label', 'Device status bar');
  });
});