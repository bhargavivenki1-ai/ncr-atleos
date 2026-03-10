import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

/**
 * Test suite for Header organism component
 * Tests rendering, composition, props handling, accessibility, and integration
 */
describe('Header Component', () => {
  /**
   * Test that Header renders with default props
   * Verifies basic rendering functionality and default values
   */
  test('should render with default props', () => {
    render(<Header />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Enter PIN' })).toBeInTheDocument();
    expect(screen.getByLabelText('Device status bar')).toBeInTheDocument();
  });

  /**
   * Test that Header displays custom title
   * Verifies title prop is correctly passed to Title component
   */
  test('should display custom title', () => {
    const customTitle = 'Welcome to ATM';
    render(<Header title={customTitle} />);
    
    expect(screen.getByRole('heading', { name: customTitle })).toBeInTheDocument();
  });

  /**
   * Test that Header passes time prop to StatusBar
   * Verifies time prop is correctly forwarded to StatusBar component
   */
  test('should pass time prop to StatusBar', () => {
    const customTime = '15:45';
    render(<Header time={customTime} />);
    
    expect(screen.getByText(customTime)).toBeInTheDocument();
  });

  /**
   * Test that Header passes battery level to StatusBar
   * Verifies battery level prop is correctly forwarded
   */
  test('should pass battery level to StatusBar', () => {
    const batteryLevel = 65;
    render(<Header batteryLevel={batteryLevel} />);
    
    expect(screen.getByLabelText(`Battery level ${batteryLevel}%`)).toBeInTheDocument();
  });

  /**
   * Test that Header passes WiFi status to StatusBar
   * Verifies WiFi connection status is correctly forwarded
   */
  test('should pass WiFi status to StatusBar', () => {
    const { rerender } = render(<Header hasWifi={true} />);
    expect(screen.getByLabelText('WiFi connected')).toBeInTheDocument();
    
    rerender(<Header hasWifi={false} />);
    expect(screen.queryByLabelText('WiFi connected')).not.toBeInTheDocument();
  });

  /**
   * Test that Header passes signal status to StatusBar
   * Verifies cellular signal status is correctly forwarded
   */
  test('should pass signal status to StatusBar', () => {
    const { rerender } = render(<Header hasSignal={true} />);
    expect(screen.getByLabelText('Signal strength')).toBeInTheDocument();
    
    rerender(<Header hasSignal={false} />);
    expect(screen.queryByLabelText('Signal strength')).not.toBeInTheDocument();
  });

  /**
   * Test that Header has proper structure and layout
   * Verifies DOM structure and CSS classes for layout
   */
  test('should have proper structure and layout', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-background', 'flex', 'flex-col', 'w-full', 'h-26');
    
    // Check for StatusBar presence
    expect(screen.getByLabelText('Device status bar')).toBeInTheDocument();
    
    // Check for navigation bar with title
    const titleContainer = screen.getByRole('heading').parentElement;
    expect(titleContainer).toHaveClass('flex-1', 'flex', 'items-center', 'justify-center', 'px-4');
  });

  /**
   * Test that Header applies custom CSS classes
   * Verifies className prop is properly merged with default classes
   */
  test('should apply custom CSS classes', () => {
    const customClass = 'custom-header-class';
    render(<Header className={customClass} />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass(customClass);
    expect(header).toHaveClass('bg-background', 'flex', 'flex-col', 'w-full', 'h-26');
  });

  /**
   * Test that Header has proper accessibility attributes
   * Verifies semantic HTML structure and ARIA attributes
   */
  test('should have proper accessibility attributes', () => {
    render(<Header title="Login Screen" />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveAttribute('role', 'banner');
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Login Screen');
    
    const statusBar = screen.getByLabelText('Device status bar');
    expect(statusBar).toHaveAttribute('role', 'banner');
  });

  /**
   * Test Header composition with StatusBar and Title
   * Verifies proper integration of child components
   */
  test('should properly compose StatusBar and Title components', () => {
    render(
      <Header 
        title="ATM Login"
        time="12:30"
        batteryLevel={90}
        hasWifi={true}
        hasSignal={true}
      />
    );
    
    // Verify StatusBar is rendered with correct props
    expect(screen.getByText('12:30')).toBeInTheDocument();
    expect(screen.getByLabelText('Battery level 90%')).toBeInTheDocument();
    expect(screen.getByLabelText('WiFi connected')).toBeInTheDocument();
    expect(screen.getByLabelText('Signal strength')).toBeInTheDocument();
    
    // Verify Title is rendered with correct props
    expect(screen.getByRole('heading', { name: 'ATM Login' })).toBeInTheDocument();
  });

  /**
   * Test Header responsive behavior
   * Verifies component maintains proper layout across different screen sizes
   */
  test('should maintain responsive layout', () => {
    render(<Header title="Responsive Header" />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('w-full'); // Full width
    expect(header).toHaveClass('flex', 'flex-col'); // Vertical layout
    
    const titleContainer = screen.getByRole('heading').parentElement;
    expect(titleContainer).toHaveClass('flex-1'); // Flexible height
    expect(titleContainer).toHaveClass('px-4'); // Horizontal padding
  });

  /**
   * Test Header in different page contexts
   * Verifies component works correctly across different pages
   */
  test('should work correctly in different page contexts', () => {
    const contexts = [
      { title: 'Enter PIN', context: 'login' },
      { title: 'Dashboard', context: 'dashboard' },
      { title: 'Transaction', context: 'transaction' }
    ];
    
    contexts.forEach(({ title, context }) => {
      const { rerender } = render(<Header title={title} />);
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test Header with edge case props
   * Verifies component handles edge cases gracefully
   */
  test('should handle edge case props', () => {
    render(
      <Header 
        title=""
        time=""
        batteryLevel={0}
        hasWifi={false}
        hasSignal={false}
      />
    );
    
    // Should render without errors
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Empty title should still render heading element
    expect(screen.getByRole('heading')).toBeInTheDocument();
    
    // Battery at 0% should still render
    expect(screen.getByLabelText('Battery level 0%')).toBeInTheDocument();
  });

  /**
   * Test Header semantic structure for screen readers
   * Verifies proper heading hierarchy and landmark roles
   */
  test('should have proper semantic structure for screen readers', () => {
    render(<Header title="Main Page Title" />);
    
    // Should use banner landmark
    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();
    
    // Should have proper heading level
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Main Page Title');
    
    // StatusBar should also be a banner (nested banner is acceptable)
    const statusBar = screen.getByLabelText('Device status bar');
    expect(statusBar).toHaveAttribute('role', 'banner');
  });

  /**
   * Test Header layout consistency
   * Verifies consistent layout structure across different prop combinations
   */
  test('should maintain consistent layout structure', () => {
    const propCombinations = [
      { title: 'Test 1', time: '10:00' },
      { title: 'Test 2', time: '14:30', batteryLevel: 50 },
      { title: 'Test 3', hasWifi: false, hasSignal: false }
    ];
    
    propCombinations.forEach((props) => {
      const { rerender } = render(<Header {...props} />);
      
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('bg-background', 'flex', 'flex-col', 'w-full', 'h-26');
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test Header integration in full page layout
   * Verifies component works correctly as part of complete page structure
   */
  test('should integrate correctly in full page layout', () => {
    render(
      <div className="min-h-screen bg-background flex flex-col">
        <Header title="ATM Interface" />
        <main className="flex-1">Main Content</main>
        <footer>Footer Content</footer>
      </div>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Verify it's positioned correctly in the layout
    const pageContainer = header.parentElement;
    expect(pageContainer).toHaveClass('min-h-screen', 'bg-background', 'flex', 'flex-col');
  });
});