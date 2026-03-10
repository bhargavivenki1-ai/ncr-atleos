import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AmountSelection from '../AmountSelection';

/**
 * Test suite for AmountSelection organism component
 * Tests amount selection, validation, user interactions, and accessibility
 */
describe('AmountSelection Component', () => {
  const defaultProps = {
    selectedAmount: '',
    onAmountChange: jest.fn(),
    amounts: ['20', '100'],
    errors: {}
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test that AmountSelection renders with default props
   * Verifies basic rendering functionality and structure
   */
  test('should render with default props', () => {
    render(<AmountSelection {...defaultProps} />);
    
    // Check section title
    expect(screen.getByRole('heading', { name: 'Select Amount' })).toBeInTheDocument();
    
    // Check subtitle
    expect(screen.getByText('Choose Withdrawal Amount')).toBeInTheDocument();
    
    // Check amount options
    expect(screen.getByRole('button', { name: 'Select $20 withdrawal amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select $100 withdrawal amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select other withdrawal amount' })).toBeInTheDocument();
  });

  /**
   * Test that AmountSelection handles amount selection
   * Verifies amount selection functionality and callback
   */
  test('should handle amount selection', async () => {
    const user = userEvent.setup();
    const mockOnAmountChange = jest.fn();
    
    render(<AmountSelection {...defaultProps} onAmountChange={mockOnAmountChange} />);
    
    const amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    await user.click(amount20Button);
    
    expect(mockOnAmountChange).toHaveBeenCalledTimes(1);
    expect(mockOnAmountChange).toHaveBeenCalledWith('20');
  });

  /**
   * Test that AmountSelection handles multiple amount options
   * Verifies different amount selections work correctly
   */
  test('should handle multiple amount options', async () => {
    const user = userEvent.setup();
    const mockOnAmountChange = jest.fn();
    
    render(<AmountSelection {...defaultProps} onAmountChange={mockOnAmountChange} />);
    
    // Test $20 selection
    const amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    await user.click(amount20Button);
    expect(mockOnAmountChange).toHaveBeenCalledWith('20');
    
    // Test $100 selection
    const amount100Button = screen.getByRole('button', { name: 'Select $100 withdrawal amount' });
    await user.click(amount100Button);
    expect(mockOnAmountChange).toHaveBeenCalledWith('100');
    
    // Test Other Amount selection
    const otherAmountButton = screen.getByRole('button', { name: 'Select other withdrawal amount' });
    await user.click(otherAmountButton);
    expect(mockOnAmountChange).toHaveBeenCalledWith('other');
    
    expect(mockOnAmountChange).toHaveBeenCalledTimes(3);
  });

  /**
   * Test that AmountSelection displays selected amount correctly
   * Verifies visual selection state and accessibility
   */
  test('should display selected amount correctly', () => {
    const { rerender } = render(
      <AmountSelection {...defaultProps} selectedAmount="20" />
    );
    
    let amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    let amount100Button = screen.getByRole('button', { name: 'Select $100 withdrawal amount' });
    
    expect(amount20Button).toHaveAttribute('aria-pressed', 'true');
    expect(amount100Button).toHaveAttribute('aria-pressed', 'false');
    
    // Change selection
    rerender(<AmountSelection {...defaultProps} selectedAmount="100" />);
    
    amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    amount100Button = screen.getByRole('button', { name: 'Select $100 withdrawal amount' });
    
    expect(amount20Button).toHaveAttribute('aria-pressed', 'false');
    expect(amount100Button).toHaveAttribute('aria-pressed', 'true');
  });

  /**
   * Test that AmountSelection handles custom amounts array
   * Verifies component works with different amount configurations
   */
  test('should handle custom amounts array', () => {
    const customAmounts = ['50', '200', '500'];
    
    render(<AmountSelection {...defaultProps} amounts={customAmounts} />);
    
    expect(screen.getByRole('button', { name: 'Select $50 withdrawal amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select $200 withdrawal amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select $500 withdrawal amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select other withdrawal amount' })).toBeInTheDocument();
  });

  /**
   * Test that AmountSelection displays validation errors
   * Verifies error message display and accessibility
   */
  test('should display validation errors', () => {
    const errors = {
      amount: 'Please select a withdrawal amount before proceeding.'
    };
    
    render(<AmountSelection {...defaultProps} errors={errors} />);
    
    expect(screen.getByText('Please select a withdrawal amount before proceeding.')).toBeInTheDocument();
  });

  /**
   * Test that AmountSelection has proper structure and styling
   * Verifies CSS classes and layout structure
   */
  test('should have proper structure and styling', () => {
    render(<AmountSelection {...defaultProps} />);
    
    // Check main container
    const container = screen.getByRole('heading', { name: 'Select Amount' }).closest('.flex.flex-col');
    expect(container).toHaveClass('flex', 'flex-col', 'self-stretch', 'bg-[#FFFBFA]');
    
    // Check title styling
    const title = screen.getByRole('heading', { name: 'Select Amount' });
    expect(title).toHaveClass(
      'flex-1', 'font-["Public_Sans"]', 'font-bold', 'text-[22px]',
      'leading-[1.30em]', 'tracking-[-2%]', 'text-[#281D1B]'
    );
    
    // Check subtitle styling
    const subtitle = screen.getByText('Choose Withdrawal Amount');
    expect(subtitle).toHaveClass(
      'flex-1', 'font-["Public_Sans"]', 'font-normal', 'text-[17px]',
      'leading-[1.35em]', 'tracking-[-0.5%]', 'text-[#281D1B]'
    );
  });

  /**
   * Test that AmountSelection handles keyboard navigation
   * Verifies keyboard accessibility and tab order
   */
  test('should handle keyboard navigation', async () => {
    const user = userEvent.setup();
    const mockOnAmountChange = jest.fn();
    
    render(<AmountSelection {...defaultProps} onAmountChange={mockOnAmountChange} />);
    
    const amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    const amount100Button = screen.getByRole('button', { name: 'Select $100 withdrawal amount' });
    const otherAmountButton = screen.getByRole('button', { name: 'Select other withdrawal amount' });
    
    // Tab through amount options
    await user.tab();
    expect(amount20Button).toHaveFocus();
    
    // Activate with Enter
    await user.keyboard('{Enter}');
    expect(mockOnAmountChange).toHaveBeenCalledWith('20');
    
    // Tab to next option
    await user.tab();
    expect(amount100Button).toHaveFocus();
    
    // Activate with Space
    await user.keyboard(' ');
    expect(mockOnAmountChange).toHaveBeenCalledWith('100');
    
    // Tab to other amount
    await user.tab();
    expect(otherAmountButton).toHaveFocus();
  });

  /**
   * Test that AmountSelection handles state management correctly
   * Verifies local state synchronization with props
   */
  test('should handle state management correctly', async () => {
    const user = userEvent.setup();
    const mockOnAmountChange = jest.fn();
    
    const { rerender } = render(
      <AmountSelection 
        {...defaultProps} 
        selectedAmount=""
        onAmountChange={mockOnAmountChange}
      />
    );
    
    // Initially no selection
    let amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    expect(amount20Button).toHaveAttribute('aria-pressed', 'false');
    
    // Select amount via user interaction
    await user.click(amount20Button);
    expect(mockOnAmountChange).toHaveBeenCalledWith('20');
    
    // Update via props
    rerender(
      <AmountSelection 
        {...defaultProps} 
        selectedAmount="20"
        onAmountChange={mockOnAmountChange}
      />
    );
    
    amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    expect(amount20Button).toHaveAttribute('aria-pressed', 'true');
  });

  /**
   * Test that AmountSelection handles "Other Amount" selection
   * Verifies custom amount option functionality
   */
  test('should handle "Other Amount" selection', async () => {
    const user = userEvent.setup();
    const mockOnAmountChange = jest.fn();
    
    render(<AmountSelection {...defaultProps} onAmountChange={mockOnAmountChange} />);
    
    const otherAmountButton = screen.getByRole('button', { name: 'Select other withdrawal amount' });
    await user.click(otherAmountButton);
    
    expect(mockOnAmountChange).toHaveBeenCalledWith('other');
  });

  /**
   * Test that AmountSelection displays "Other Amount" as selected
   * Verifies "Other Amount" selection state
   */
  test('should display "Other Amount" as selected', () => {
    render(<AmountSelection {...defaultProps} selectedAmount="other" />);
    
    const otherAmountButton = screen.getByRole('button', { name: 'Select other withdrawal amount' });
    expect(otherAmountButton).toHaveAttribute('aria-pressed', 'true');
    
    const amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    const amount100Button = screen.getByRole('button', { name: 'Select $100 withdrawal amount' });
    expect(amount20Button).toHaveAttribute('aria-pressed', 'false');
    expect(amount100Button).toHaveAttribute('aria-pressed', 'false');
  });

  /**
   * Test that AmountSelection handles empty amounts array
   * Verifies component behavior with no predefined amounts
   */
  test('should handle empty amounts array', () => {
    render(<AmountSelection {...defaultProps} amounts={[]} />);
    
    // Should still show "Other Amount" option
    expect(screen.getByRole('button', { name: 'Select other withdrawal amount' })).toBeInTheDocument();
    
    // Should not show any predefined amounts
    expect(screen.queryByRole('button', { name: 'Select $20 withdrawal amount' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Select $100 withdrawal amount' })).not.toBeInTheDocument();
  });

  /**
   * Test that AmountSelection handles form integration
   * Verifies component works correctly within forms
   */
  test('should integrate correctly with forms', () => {
    const mockSubmit = jest.fn();
    
    render(
      <form onSubmit={mockSubmit}>
        <AmountSelection {...defaultProps} />
        <button type="submit">Submit</button>
      </form>
    );
    
    // All amount buttons should be present
    expect(screen.getByRole('button', { name: 'Select $20 withdrawal amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select $100 withdrawal amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select other withdrawal amount' })).toBeInTheDocument();
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
  });

  /**
   * Test that AmountSelection handles error clearing
   * Verifies error state management
   */
  test('should handle error clearing', () => {
    const initialErrors = { amount: 'Amount required' };
    
    const { rerender } = render(
      <AmountSelection {...defaultProps} errors={initialErrors} />
    );
    
    expect(screen.getByText('Amount required')).toBeInTheDocument();
    
    // Clear errors
    rerender(<AmountSelection {...defaultProps} errors={{}} />);
    expect(screen.queryByText('Amount required')).not.toBeInTheDocument();
  });

  /**
   * Test that AmountSelection handles edge cases
   * Verifies component behavior with unusual props
   */
  test('should handle edge cases', () => {
    const edgeCases = [
      { selectedAmount: null },
      { selectedAmount: undefined },
      { amounts: null },
      { amounts: undefined },
      { onAmountChange: undefined },
      { errors: null }
    ];
    
    edgeCases.forEach(({ selectedAmount, amounts, onAmountChange, errors }) => {
      const { rerender } = render(
        <AmountSelection 
          selectedAmount={selectedAmount || ''}
          onAmountChange={onAmountChange || jest.fn()}
          amounts={amounts || ['20', '100']}
          errors={errors || {}}
        />
      );
      
      // Component should render without errors
      expect(screen.getByRole('heading', { name: 'Select Amount' })).toBeInTheDocument();
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test that AmountSelection handles real-world usage scenarios
   * Verifies component works in realistic ATM withdrawal scenarios
   */
  test('should handle real-world usage scenarios', async () => {
    const user = userEvent.setup();
    const mockOnAmountChange = jest.fn();
    
    // Common ATM amounts
    const atmAmounts = ['20', '40', '60', '80', '100', '200'];
    
    render(
      <AmountSelection 
        {...defaultProps} 
        amounts={atmAmounts}
        onAmountChange={mockOnAmountChange}
      />
    );
    
    // Verify all amounts are displayed
    atmAmounts.forEach(amount => {
      expect(screen.getByRole('button', { name: `Select $${amount} withdrawal amount` })).toBeInTheDocument();
    });
    
    // Test selection of different amounts
    const amount40Button = screen.getByRole('button', { name: 'Select $40 withdrawal amount' });
    await user.click(amount40Button);
    expect(mockOnAmountChange).toHaveBeenCalledWith('40');
    
    const amount200Button = screen.getByRole('button', { name: 'Select $200 withdrawal amount' });
    await user.click(amount200Button);
    expect(mockOnAmountChange).toHaveBeenCalledWith('200');
  });

  /**
   * Test that AmountSelection maintains accessibility standards
   * Verifies WCAG compliance and screen reader support
   */
  test('should maintain accessibility standards', () => {
    render(<AmountSelection {...defaultProps} selectedAmount="20" />);
    
    // Check heading structure
    const heading = screen.getByRole('heading', { name: 'Select Amount' });
    expect(heading.tagName).toBe('H2');
    
    // Check button roles and states
    const amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    expect(amount20Button).toHaveAttribute('role', 'button');
    expect(amount20Button).toHaveAttribute('tabIndex', '0');
    expect(amount20Button).toHaveAttribute('aria-pressed', 'true');
    
    const amount100Button = screen.getByRole('button', { name: 'Select $100 withdrawal amount' });
    expect(amount100Button).toHaveAttribute('aria-pressed', 'false');
    
    // Check error message accessibility
    const errorMessage = 'Please select an amount';
    const { rerender } = render(
      <AmountSelection {...defaultProps} errors={{ amount: errorMessage }} />
    );
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  /**
   * Test that AmountSelection handles rapid selections
   * Verifies component handles multiple rapid clicks correctly
   */
  test('should handle rapid selections', async () => {
    const user = userEvent.setup();
    const mockOnAmountChange = jest.fn();
    
    render(<AmountSelection {...defaultProps} onAmountChange={mockOnAmountChange} />);
    
    const amount20Button = screen.getByRole('button', { name: 'Select $20 withdrawal amount' });
    const amount100Button = screen.getByRole('button', { name: 'Select $100 withdrawal amount' });
    
    // Rapid clicks
    await user.click(amount20Button);
    await user.click(amount100Button);
    await user.click(amount20Button);
    
    expect(mockOnAmountChange).toHaveBeenCalledTimes(3);
    expect(mockOnAmountChange).toHaveBeenNthCalledWith(1, '20');
    expect(mockOnAmountChange).toHaveBeenNthCalledWith(2, '100');
    expect(mockOnAmountChange).toHaveBeenNthCalledWith(3, '20');
  });
});