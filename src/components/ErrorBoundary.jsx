import React from 'react';
import Button from './atoms/Button';

/**
 * ErrorBoundary component to catch and handle React errors gracefully
 * Implements error handling as specified in acceptance criteria
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    // Reset error state to retry
    this.setState({ hasError: false, error: null, errorInfo: null });
    
    // Reload the page as a fallback
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI matching the application error message from Story-1-Login.md
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-text-primary">
                Application Error
              </h1>
              <p className="text-text-secondary">
                The application could not be started at this time. Please try again.
              </p>
            </div>
            
            <Button
              onClick={this.handleRetry}
              className="w-full"
            >
              Try Again
            </Button>
            
            {/* Development error details - only show in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left text-sm text-gray-600">
                <summary className="cursor-pointer font-medium">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;