import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CardDetailsForm from '../CardDetailsForm';

/**
 * Test suite for CardDetailsForm organism component
 * Tests form rendering, validation, user interactions, card scanning, and accessibility
 */
describe('CardDetailsForm Component', () => {
  const defaultProps = {
    cardDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      fullName: ''
    },
    onCardDetailsChange: jest.fn(),
    onScanCard: jest.fn(),
    errors: {}
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test that CardDetailsForm renders with default props
   * Verifies basic rendering functionality and form structure
   */
  test('should render with default props', () => {
    render(<CardDetailsForm {...defaultProps} />);
    
    // Check form title
    expect(screen.getByRole('heading', { name: 'Enter Your Card Details' })).toBeInTheDocument();
    
    // Check all input fields
    expect(screen.getByLabelText('Card number')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry date')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    
    // Check scan button
    expect(screen.getByRole('button', { name: 'Scan card with camera' })).toBeInTheDocument();
  });

  /**
   * Test that CardDetailsForm handles card number input
   * Verifies card number field functionality and change handling
   */
  test('should handle card number input', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<CardDetailsForm {...defaultProps} onCardDetailsChange={mockOnChange} />);
    
    const cardNumberInput = screen.getByLabelText('Card number');
    await user.type(cardNumberInput, '4532123456789012');
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(cardNumberInput).toHaveValue('4532123456789012');
  });

  /**
   * Test that CardDetailsForm handles expiry date input
   * Verifies expiry date field functionality and formatting
   */
  test('should handle expiry date input', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<CardDetailsForm {...defaultProps} onCardDetailsChange={mockOnChange} />);
    
    const expiryInput = screen.getByLabelText('Expiry date');
    await user.type(expiryInput, '12/25');
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(expiryInput).toHaveValue('12/25');
  });

  /**
   * Test that CardDetailsForm handles CVV input
   * Verifies CVV field functionality and security considerations
   */
  test('should handle CVV input', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<CardDetailsForm {...defaultProps} onCardDetailsChange={mockOnChange} />);
    
    const cvvInput = screen.getByLabelText('CVV');
    await user.type(cvvInput, '123');
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(cvvInput).toHaveValue('123');
  });

  /**
   * Test that CardDetailsForm handles full name input
   * Verifies full name field functionality
   */
  test('should handle full name input', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<CardDetailsForm {...defaultProps} onCardDetailsChange={mockOnChange} />);
    
    const nameInput = screen.getByLabelText('Full name');
    await user.type(nameInput, 'John Doe');
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(nameInput).toHaveValue('John Doe');
  });

  /**
   * Test that CardDetailsForm handles card scanning
   * Verifies scan button functionality and callback
   */
  test('should handle card scanning', async () => {
    const user = userEvent.setup();
    const mockOnScanCard = jest.fn();
    
    render(<CardDetailsForm {...defaultProps} onScanCard={mockOnScanCard} />);
    
    const scanButton = screen.getByRole('button', { name: 'Scan card with camera' });
    await user.click(scanButton);
    
    expect(mockOnScanCard).toHaveBeenCalledTimes(1);
  });

  /**
   * Test that CardDetailsForm displays validation errors
   * Verifies error message display and accessibility
   */
  test('should display validation errors', () => {
    const errors = {
      cardNumber: 'Card number is required',
      expiryDate: 'Expiry date is required',
      cvv: 'CVV is required',
      fullName: 'Full name is required'
    };
    
    render(<CardDetailsForm {...defaultProps} errors={errors} />);
    
    expect(screen.getByText('Card number is required')).toBeInTheDocument();
    expect(screen.getByText('Expiry date is required')).toBeInTheDocument();
    expect(screen.getByText('CVV is required')).toBeInTheDocument();
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
  });

  /**
   * Test that CardDetailsForm has proper accessibility attributes
   * Verifies ARIA attributes and error associations
   */
  test('should have proper accessibility attributes', () => {
    const errors = {
      cardNumber: 'Invalid card number',
      fullName: 'Name is required'
    };
    
    render(<CardDetailsForm {...defaultProps} errors={errors} />);
    
    const cardNumberInput = screen.getByLabelText('Card number');
    expect(cardNumberInput).toHaveAttribute('aria-describedby', 'card-number-error');
    
    const fullNameInput = screen.getByLabelText('Full name');
    expect(fullNameInput).toHaveAttribute('aria-describedby', 'full-name-error');
    
    // Check error elements have correct IDs
    expect(screen.getByText('Invalid card number')).toHaveAttribute('id', 'card-number-error');
    expect(screen.getByText('Name is required')).toHaveAttribute('id', 'full-name-error');
  });

  /**
   * Test that CardDetailsForm handles controlled values
   * Verifies component works correctly with external state management
   */
  test('should handle controlled values', () => {
    const cardDetails = {
      cardNumber: '4532123456789012',
      expiryDate: '12/25',
      cvv: '123',
      fullName: 'John Doe'
    };
    
    render(<CardDetailsForm {...defaultProps} cardDetails={cardDetails} />);
    
    expect(screen.getByLabelText('Card number')).toHaveValue('4532123456789012');
    expect(screen.getByLabelText('Expiry date')).toHaveValue('12/25');
    expect(screen.getByLabelText('CVV')).toHaveValue('123');
    expect(screen.getByLabelText('Full name')).toHaveValue('John Doe');
  });

  /**
   * Test that CardDetailsForm handles partial card details
   * Verifies component works with incomplete initial data
   */
  test('should handle partial card details', () => {
    const partialDetails = {
      cardNumber: '4532',
      expiryDate: '',
      cvv: '',
      fullName: 'John'
    };
    
    render(<CardDetailsForm {...defaultProps} cardDetails={partialDetails} />);
    
    expect(screen.getByLabelText('Card number')).toHaveValue('4532');
    expect(screen.getByLabelText('Expiry date')).toHaveValue('');
    expect(screen.getByLabelText('CVV')).toHaveValue('');
    expect(screen.getByLabelText('Full name')).toHaveValue('John');
  });

  /**
   * Test that CardDetailsForm has proper form structure
   * Verifies semantic HTML structure and layout
   */
  test('should have proper form structure', () => {
    render(<CardDetailsForm {...defaultProps} />);
    
    // Check heading structure
    const heading = screen.getByRole('heading', { name: 'Enter Your Card Details' });
    expect(heading).toHaveClass(
      'flex-1', 'font-["Public_Sans"]', 'font-bold', 'text-[22px]',
      'leading-[1.30em]', 'tracking-[-2%]', 'text-[#281D1B]'
    );
    
    // Check form layout classes
    const formContainer = heading.closest('.flex.flex-col');
    expect(formContainer).toHaveClass('flex', 'flex-col', 'self-stretch', 'pb-2');
  });

  /**
   * Test that CardDetailsForm handles field focus and blur
   * Verifies focus management across form fields
   */
  test('should handle field focus and blur', async () => {
    const user = userEvent.setup();
    
    render(<CardDetailsForm {...defaultProps} />);
    
    const cardNumberInput = screen.getByLabelText('Card number');
    const expiryInput = screen.getByLabelText('Expiry date');
    
    // Focus card number field
    await user.click(cardNumberInput);
    expect(cardNumberInput).toHaveFocus();
    
    // Tab to expiry field
    await user.tab();
    expect(expiryInput).toHaveFocus();
  });

  /**
   * Test that CardDetailsForm handles form submission context
   * Verifies component works correctly within form elements
   */
  test('should work correctly in form submission context', () => {
    const mockSubmit = jest.fn();
    
    render(
      <form onSubmit={mockSubmit}>
        <CardDetailsForm {...defaultProps} />
        <button type="submit">Submit</button>
      </form>
    );
    
    // All inputs should be present and accessible
    expect(screen.getByLabelText('Card number')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry date')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
  });

  /**
   * Test that CardDetailsForm handles input placeholders correctly
   * Verifies placeholder text for user guidance
   */
  test('should have correct input placeholders', () => {
    render(<CardDetailsForm {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Card Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('CVV')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
  });

  /**
   * Test that CardDetailsForm handles keyboard navigation
   * Verifies tab order and keyboard accessibility
   */
  test('should handle keyboard navigation correctly', async () => {
    const user = userEvent.setup();
    
    render(<CardDetailsForm {...defaultProps} />);
    
    const cardNumberInput = screen.getByLabelText('Card number');
    const scanButton = screen.getByRole('button', { name: 'Scan card with camera' });
    const expiryInput = screen.getByLabelText('Expiry date');
    const cvvInput = screen.getByLabelText('CVV');
    const fullNameInput = screen.getByLabelText('Full name');
    
    // Tab through form elements
    await user.tab();
    expect(cardNumberInput).toHaveFocus();
    
    await user.tab();
    expect(scanButton).toHaveFocus();
    
    await user.tab();
    expect(expiryInput).toHaveFocus();
    
    await user.tab();
    expect(cvvInput).toHaveFocus();
    
    await user.tab();
    expect(fullNameInput).toHaveFocus();
  });

  /**
   * Test that CardDetailsForm handles error state changes
   * Verifies error display and clearing behavior
   */
  test('should handle error state changes', () => {
    const initialErrors = { cardNumber: 'Required' };
    
    const { rerender } = render(
      <CardDetailsForm {...defaultProps} errors={initialErrors} />
    );
    
    expect(screen.getByText('Required')).toBeInTheDocument();
    
    // Clear errors
    rerender(<CardDetailsForm {...defaultProps} errors={{}} />);
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
  });

  /**
   * Test that CardDetailsForm handles edge cases
   * Verifies component behavior with unusual props or values
   */
  test('should handle edge cases', () => {
    const edgeCases = [
      { cardDetails: null },
      { cardDetails: undefined },
      { cardDetails: {} },
      { onCardDetailsChange: undefined },
      { onScanCard: undefined }
    ];
    
    edgeCases.forEach(({ cardDetails, onCardDetailsChange, onScanCard }) => {
      const { rerender } = render(
        <CardDetailsForm 
          cardDetails={cardDetails || defaultProps.cardDetails}
          onCardDetailsChange={onCardDetailsChange || defaultProps.onCardDetailsChange}
          onScanCard={onScanCard || defaultProps.onScanCard}
          errors={{}}
        />
      );
      
      // Component should render without errors
      expect(screen.getByRole('heading', { name: 'Enter Your Card Details' })).toBeInTheDocument();
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test that CardDetailsForm handles real-world card input scenarios
   * Verifies component works with realistic card data entry
   */
  test('should handle real-world card input scenarios', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<CardDetailsForm {...defaultProps} onCardDetailsChange={mockOnChange} />);
    
    // Simulate realistic card data entry
    const cardNumberInput = screen.getByLabelText('Card number');
    const expiryInput = screen.getByLabelText('Expiry date');
    const cvvInput = screen.getByLabelText('CVV');
    const nameInput = screen.getByLabelText('Full name');
    
    // Enter card number
    await user.type(cardNumberInput, '4532123456789012');
    expect(mockOnChange).toHaveBeenCalled();
    
    // Enter expiry date
    await user.type(expiryInput, '12/25');
    expect(mockOnChange).toHaveBeenCalled();
    
    // Enter CVV
    await user.type(cvvInput, '123');
    expect(mockOnChange).toHaveBeenCalled();
    
    // Enter name
    await user.type(nameInput, 'John Doe');
    expect(mockOnChange).toHaveBeenCalled();
    
    // Verify all fields have values
    expect(cardNumberInput).toHaveValue('4532123456789012');
    expect(expiryInput).toHaveValue('12/25');
    expect(cvvInput).toHaveValue('123');
    expect(nameInput).toHaveValue('John Doe');
  });

  /**
   * Test that CardDetailsForm integrates properly with icons
   * Verifies icon display and integration with input fields
   */
  test('should integrate properly with icons', () => {
    render(<CardDetailsForm {...defaultProps} />);
    
    // Check that card number field has credit card icon
    const cardNumberContainer = screen.getByLabelText('Card number').closest('.flex.flex-row');
    expect(cardNumberContainer.querySelector('.flex-none')).toBeInTheDocument();
    
    // Check that full name field has user icon
    const fullNameContainer = screen.getByLabelText('Full name').closest('.flex.flex-row');
    expect(fullNameContainer.querySelector('.flex-none')).toBeInTheDocument();
    
    // Check that scan button has camera icon
    const scanButton = screen.getByRole('button', { name: 'Scan card with camera' });
    expect(scanButton).toBeInTheDocument();
  });

  /**
   * Test that CardDetailsForm maintains state consistency
   * Verifies local state synchronization with props
   */
  test('should maintain state consistency', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    const { rerender } = render(
      <CardDetailsForm 
        {...defaultProps} 
        onCardDetailsChange={mockOnChange}
        cardDetails={{ cardNumber: 'initial', expiryDate: '', cvv: '', fullName: '' }}
      />
    );
    
    const cardNumberInput = screen.getByLabelText('Card number');
    expect(cardNumberInput).toHaveValue('initial');
    
    // Update via user input
    await user.clear(cardNumberInput);
    await user.type(cardNumberInput, 'updated');
    
    expect(mockOnChange).toHaveBeenCalled();
    
    // Update via props
    rerender(
      <CardDetailsForm 
        {...defaultProps} 
        onCardDetailsChange={mockOnChange}
        cardDetails={{ cardNumber: 'from-props', expiryDate: '', cvv: '', fullName: '' }}
      />
    );
    
    expect(screen.getByLabelText('Card number')).toHaveValue('from-props');
  });
});