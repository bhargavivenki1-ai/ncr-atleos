import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ATMCashWithdrawal from '../ATMCashWithdrawal';

// Mock the components to focus on page logic
jest.mock('../components/organisms/Header', () => {
  return function MockHeader({ title }) {
    return <header data-testid="header">{title}</header>;
  };
});

jest.mock('../components/organisms/CardDetailsForm', () => {
  return function MockCardDetailsForm({ onCardDetailsChange, onScanCard, errors }) {
    return (
      <div data-testid="card-details-form">
        <input
          data-testid="card-number"
          placeholder="Card Number"
          onChange={(e) => onCardDetailsChange({ cardNumber: e.target.value })}
        />
        <input
          data-testid="full-name"
          placeholder="Full Name"
          onChange={(e) => onCardDetailsChange({ fullName: e.target.value })}
        />
        <button data-testid="scan-card" onClick={onScanCard}>
          Scan Card
        </button>
        {errors.cardNumber && <div data-testid="card-number-error">{errors.cardNumber}</div>}
        {errors.fullName && <div data-testid="full-name-error">{errors.fullName}</div>}
      </div>
    );
  };
});

jest.mock('../components/organisms/AmountSelection', () => {
  return function MockAmountSelection({ onAmountChange, errors }) {
    return (
      <div data-testid="amount-selection">
        <button
          data-testid="amount-20"
          onClick={() => onAmountChange('20')}
        >
          $20
        </button>
        <button
          data-testid="amount-100"
          onClick={() => onAmountChange('100')}
        >
          $100
        </button>
        {errors.amount && <div data-testid="amount-error">{errors.amount}</div>}
      </div>
    );
  };
});

jest.mock('../components/atoms/Button', () => {
  return function MockButton({ children, onClick, disabled, loading }) {
    return (
      <button
        data-testid="proceed-button"
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading ? 'Staging...' : children}
      </button>
    );
  };
});

jest.mock('../components/atoms/GestureIndicator', () => {
  return function MockGestureIndicator() {
    return <div data-testid="gesture-indicator" />;
  };
});

// Mock window.alert
const mockAlert = jest.fn();
Object.defineProperty(window, 'alert', {
  writable: true,
  value: mockAlert,
});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ATMCashWithdrawal Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all main components', () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('card-details-form')).toBeInTheDocument();
    expect(screen.getByTestId('amount-selection')).toBeInTheDocument();
    expect(screen.getByTestId('proceed-button')).toBeInTheDocument();
    expect(screen.getByTestId('gesture-indicator')).toBeInTheDocument();
  });

  test('displays correct page title', () => {
    renderWithRouter(<ATMCashWithdrawal />);
    expect(screen.getByText('ATM Cash Withdrawal')).toBeInTheDocument();
  });

  test('handles card details input changes', () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    const cardNumberInput = screen.getByTestId('card-number');
    fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
    
    const fullNameInput = screen.getByTestId('full-name');
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    
    // Inputs should accept the values
    expect(cardNumberInput.value).toBe('1234567890123456');
    expect(fullNameInput.value).toBe('John Doe');
  });

  test('handles amount selection', () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    const amount20Button = screen.getByTestId('amount-20');
    fireEvent.click(amount20Button);
    
    // Amount should be selected (we can verify this through form submission)
    expect(amount20Button).toBeInTheDocument();
  });

  test('handles card scanning', () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    const scanButton = screen.getByTestId('scan-card');
    fireEvent.click(scanButton);
    
    expect(mockAlert).toHaveBeenCalledWith('Card scanning feature would open camera interface');
  });

  test('shows validation errors when form is submitted without required fields', async () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    const proceedButton = screen.getByTestId('proceed-button');
    fireEvent.click(proceedButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('card-number-error')).toHaveTextContent('Card number is required');
      expect(screen.getByTestId('full-name-error')).toHaveTextContent('Full name is required');
      expect(screen.getByTestId('amount-error')).toHaveTextContent('Please select a withdrawal amount before proceeding.');
    });
  });

  test('clears validation errors when user starts typing', async () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    // First trigger validation errors
    const proceedButton = screen.getByTestId('proceed-button');
    fireEvent.click(proceedButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('card-number-error')).toBeInTheDocument();
    });
    
    // Then start typing to clear errors
    const cardNumberInput = screen.getByTestId('card-number');
    fireEvent.change(cardNumberInput, { target: { value: '1234' } });
    
    await waitFor(() => {
      expect(screen.queryByTestId('card-number-error')).not.toBeInTheDocument();
    });
  });

  test('clears amount error when amount is selected', async () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    // First trigger validation errors
    const proceedButton = screen.getByTestId('proceed-button');
    fireEvent.click(proceedButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('amount-error')).toBeInTheDocument();
    });
    
    // Then select an amount
    const amount20Button = screen.getByTestId('amount-20');
    fireEvent.click(amount20Button);
    
    await waitFor(() => {
      expect(screen.queryByTestId('amount-error')).not.toBeInTheDocument();
    });
  });

  test('shows loading state during form submission', async () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    // Fill out the form
    const cardNumberInput = screen.getByTestId('card-number');
    fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
    
    const fullNameInput = screen.getByTestId('full-name');
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    
    const amount20Button = screen.getByTestId('amount-20');
    fireEvent.click(amount20Button);
    
    // Submit the form
    const proceedButton = screen.getByTestId('proceed-button');
    fireEvent.click(proceedButton);
    
    // Should show loading state
    expect(screen.getByText('Staging...')).toBeInTheDocument();
    expect(proceedButton).toBeDisabled();
  });

  test('shows success message after successful form submission', async () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    // Fill out the form
    const cardNumberInput = screen.getByTestId('card-number');
    fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
    
    const fullNameInput = screen.getByTestId('full-name');
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    
    const amount20Button = screen.getByTestId('amount-20');
    fireEvent.click(amount20Button);
    
    // Submit the form
    const proceedButton = screen.getByTestId('proceed-button');
    fireEvent.click(proceedButton);
    
    // Wait for success message
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Withdrawal of $20 has been staged successfully!');
    }, { timeout: 3000 });
  });

  test('has correct accessibility structure', () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    // Check for semantic HTML structure
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  test('proceed button is initially enabled', () => {
    renderWithRouter(<ATMCashWithdrawal />);
    
    const proceedButton = screen.getByTestId('proceed-button');
    expect(proceedButton).not.toBeDisabled();
    expect(proceedButton).toHaveTextContent('Proceed');
  });
});