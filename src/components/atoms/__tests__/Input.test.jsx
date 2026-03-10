import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from '../Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });
  
  it('renders with custom type', () => {
    render(<Input type="password" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'password');
  });
  
  it('displays placeholder text', () => {
    render(<Input placeholder="Enter PIN" />);
    
    expect(screen.getByPlaceholderText('Enter PIN')).toBeInTheDocument();
  });
  
  it('handles value and onChange', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(<Input value="" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, '1234');
    
    expect(handleChange).toHaveBeenCalledTimes(4);
  });
  
  it('handles controlled value', () => {
    const { rerender } = render(<Input value="123" onChange={() => {}} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123');
    
    rerender(<Input value="1234" onChange={() => {}} />);
    expect(input).toHaveValue('1234');
  });
  
  it('handles disabled state', () => {
    render(<Input disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
  
  it('handles required attribute', () => {
    render(<Input required />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });
  
  it('handles maxLength attribute', () => {
    render(<Input maxLength={4} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '4');
  });
  
  it('handles pattern attribute', () => {
    render(<Input pattern="[0-9]{4}" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('pattern', '[0-9]{4}');
  });
  
  it('handles accessibility attributes', () => {
    render(
      <Input 
        ariaLabel="Enter your PIN"
        ariaDescribedBy="pin-help"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Enter your PIN');
    expect(input).toHaveAttribute('aria-describedby', 'pin-help');
  });
  
  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    
    await user.click(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
  
  it('applies custom className', () => {
    render(<Input className="custom-input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });
  
  it('forwards ref correctly', () => {
    const ref = React.createRef();
    render(<Input ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});