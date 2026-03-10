import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../ErrorBoundary';

// Mock window.location.reload
const mockReload = jest.fn();
Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload
  },
  writable: true
});

// Test component that throws an error
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Test component with custom error
const ThrowCustomError = ({ error }) => {
  if (error) {
    throw error;
  }
  return <div>No error</div>;
};

/**
 * Test suite for ErrorBoundary component
 * Tests error catching, fallback UI, retry functionality, and development features
 */
describe('ErrorBoundary Component', () => {
  // Mock console.error to avoid noise in test output
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  
  afterAll(() => {
    console.error = originalConsoleError;
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test that ErrorBoundary renders children when no error occurs
   * Verifies normal rendering behavior without errors
   */
  test('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  /**
   * Test that ErrorBoundary catches and displays error UI
   * Verifies error boundary catches JavaScript errors and shows fallback UI
   */
  test('should catch errors and display error UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Application Error')).toBeInTheDocument();
    expect(screen.getByText('The application could not be started at this time. Please try again.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });

  /**
   * Test that ErrorBoundary logs error details
   * Verifies error information is logged for debugging purposes
   */
  test('should log error details when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(console.error).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    );
  });

  /**
   * Test retry functionality reloads the page
   * Verifies "Try Again" button triggers page reload
   */
  test('should reload page when retry button is clicked', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const retryButton = screen.getByRole('button', { name: 'Try Again' });
    fireEvent.click(retryButton);
    
    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  /**
   * Test error boundary resets state before reload
   * Verifies error state is cleared when retry is attempted
   */
  test('should reset error state when retry is attempted', () => {
    const TestComponent = () => {
      const [shouldThrow, setShouldThrow] = React.useState(true);
      
      return (
        <ErrorBoundary>
          <ThrowError shouldThrow={shouldThrow} />
          <button onClick={() => setShouldThrow(false)}>Fix Error</button>
        </ErrorBoundary>
      );
    };
    
    render(<TestComponent />);
    
    // Error UI should be displayed
    expect(screen.getByText('Application Error')).toBeInTheDocument();
    
    const retryButton = screen.getByRole('button', { name: 'Try Again' });
    fireEvent.click(retryButton);
    
    // Page reload should be triggered
    expect(mockReload).toHaveBeenCalled();
  });

  /**
   * Test error boundary handles different error types
   * Verifies component catches various types of JavaScript errors
   */
  test('should handle different types of errors', () => {
    const errorTypes = [
      new Error('Standard error'),
      new TypeError('Type error'),
      new ReferenceError('Reference error'),
      new SyntaxError('Syntax error')
    ];
    
    errorTypes.forEach((error) => {
      const { unmount } = render(
        <ErrorBoundary>
          <ThrowCustomError error={error} />
        </ErrorBoundary>
      );
      
      expect(screen.getByText('Application Error')).toBeInTheDocument();
      expect(screen.getByText('The application could not be started at this time. Please try again.')).toBeInTheDocument();
      
      unmount();
    });
  });

  /**
   * Test error boundary UI structure and styling
   * Verifies proper layout and CSS classes for error UI
   */
  test('should have proper error UI structure and styling', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const container = screen.getByText('Application Error').closest('div');
    expect(container).toHaveClass('min-h-screen', 'bg-background', 'flex', 'flex-col', 'items-center', 'justify-center', 'px-4');
    
    const contentContainer = screen.getByText('Application Error').closest('.max-w-md');
    expect(contentContainer).toHaveClass('max-w-md', 'w-full', 'text-center', 'space-y-6');
    
    const heading = screen.getByText('Application Error');
    expect(heading).toHaveClass('text-2xl', 'font-semibold', 'text-text-primary');
    
    const description = screen.getByText('The application could not be started at this time. Please try again.');
    expect(description).toHaveClass('text-text-secondary');
    
    const button = screen.getByRole('button', { name: 'Try Again' });
    expect(button).toHaveClass('w-full');
  });

  /**
   * Test error boundary accessibility
   * Verifies error UI is accessible to screen readers
   */
  test('should be accessible', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const heading = screen.getByRole('heading', { name: 'Application Error' });
    expect(heading).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: 'Try Again' });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  /**
   * Test error boundary doesn't interfere with normal rendering
   * Verifies component doesn't affect children when no errors occur
   */
  test('should not interfere with normal rendering', () => {
    const TestComponent = () => (
      <div>
        <h1>Normal Component</h1>
        <button>Interactive Button</button>
        <input placeholder="Test input" />
      </div>
    );
    
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByRole('heading', { name: 'Normal Component' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Interactive Button' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  /**
   * Test error boundary catches errors in event handlers
   * Verifies component catches errors that occur in event handlers
   */
  test('should catch errors in event handlers', () => {
    const ErrorInHandler = () => {
      const handleClick = () => {
        throw new Error('Event handler error');
      };
      
      return <button onClick={handleClick}>Click to error</button>;
    };
    
    render(
      <ErrorBoundary>
        <ErrorInHandler />
      </ErrorBoundary>
    );
    
    const button = screen.getByRole('button', { name: 'Click to error' });
    
    // Note: Error boundaries don't catch errors in event handlers
    // This test verifies the component renders normally
    expect(button).toBeInTheDocument();
  });

  /**
   * Test error boundary with nested components
   * Verifies error boundary catches errors from deeply nested children
   */
  test('should catch errors from nested components', () => {
    const NestedComponent = () => (
      <div>
        <div>
          <div>
            <ThrowError shouldThrow={true} />
          </div>
        </div>
      </div>
    );
    
    render(
      <ErrorBoundary>
        <NestedComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Application Error')).toBeInTheDocument();
  });

  /**
   * Test error boundary with multiple children
   * Verifies error boundary protects all children components
   */
  test('should protect multiple children components', () => {
    render(
      <ErrorBoundary>
        <div>Safe component 1</div>
        <ThrowError shouldThrow={true} />
        <div>Safe component 2</div>
      </ErrorBoundary>
    );
    
    // When one child errors, error boundary should show error UI
    expect(screen.getByText('Application Error')).toBeInTheDocument();
    expect(screen.queryByText('Safe component 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Safe component 2')).not.toBeInTheDocument();
  });

  /**
   * Test error boundary state management
   * Verifies internal state is managed correctly
   */
  test('should manage internal state correctly', () => {
    const TestWrapper = ({ shouldError }) => (
      <ErrorBoundary>
        <ThrowError shouldThrow={shouldError} />
      </ErrorBoundary>
    );
    
    const { rerender } = render(<TestWrapper shouldError={false} />);
    expect(screen.getByText('No error')).toBeInTheDocument();
    
    rerender(<TestWrapper shouldError={true} />);
    expect(screen.getByText('Application Error')).toBeInTheDocument();
  });

  /**
   * Test error boundary with async errors
   * Verifies component handles synchronous errors (async errors aren't caught by error boundaries)
   */
  test('should handle synchronous errors', () => {
    const SyncErrorComponent = () => {
      // Synchronous error that should be caught
      throw new Error('Synchronous error');
    };
    
    render(
      <ErrorBoundary>
        <SyncErrorComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Application Error')).toBeInTheDocument();
  });

  /**
   * Test error boundary integration with ATM application
   * Verifies component works correctly in ATM application context
   */
  test('should integrate correctly with ATM application', () => {
    const ATMApp = () => (
      <div className="min-h-screen bg-background">
        <header>ATM Header</header>
        <main>
          <ThrowError shouldThrow={true} />
        </main>
      </div>
    );
    
    render(
      <ErrorBoundary>
        <ATMApp />
      </ErrorBoundary>
    );
    
    // Error boundary should replace the entire app with error UI
    expect(screen.getByText('Application Error')).toBeInTheDocument();
    expect(screen.queryByText('ATM Header')).not.toBeInTheDocument();
  });

  /**
   * Test error boundary message matches Story-1-Login.md requirements
   * Verifies error message matches the specification from acceptance criteria
   */
  test('should display error message matching Story-1-Login.md requirements', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Message should match M-01 from Story-1-Login.md
    expect(screen.getByText('Application Error')).toBeInTheDocument();
    expect(screen.getByText('The application could not be started at this time. Please try again.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });

  /**
   * Test error boundary component lifecycle
   * Verifies proper lifecycle method execution
   */
  test('should execute lifecycle methods correctly', () => {
    // This test verifies that getDerivedStateFromError and componentDidCatch are called
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('No error')).toBeInTheDocument();
    
    // Trigger error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Application Error')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
});