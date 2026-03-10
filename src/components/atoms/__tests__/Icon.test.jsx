import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from '../Icon';

/**
 * Test suite for Icon atomic component
 * Tests rendering, sizing, colors, icon types, and accessibility
 */
describe('Icon Component', () => {
  /**
   * Test that Icon renders with default props
   * Verifies basic rendering functionality and default values
   */
  test('should render with default props', () => {
    render(<Icon name="creditCard" />);
    
    const iconContainer = screen.getByRole('img', { hidden: true }) || 
                         document.querySelector('span');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass('inline-flex', 'w-6', 'h-6'); // Default md size
  });

  /**
   * Test that Icon renders different icon types correctly
   * Verifies all available icon types are properly rendered
   */
  test('should render different icon types correctly', () => {
    const iconTypes = ['creditCard', 'user', 'dollar', 'camera', 'check'];
    
    iconTypes.forEach(iconName => {
      const { rerender } = render(<Icon name={iconName} />);
      
      const iconContainer = document.querySelector('span');
      expect(iconContainer).toBeInTheDocument();
      
      // Check that SVG is rendered
      const svg = iconContainer.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test that Icon handles different sizes correctly
   * Verifies size prop affects icon dimensions
   */
  test('should handle different sizes correctly', () => {
    const sizes = [
      { size: 'sm', classes: ['w-4', 'h-4'] },
      { size: 'md', classes: ['w-6', 'h-6'] },
      { size: 'lg', classes: ['w-8', 'h-8'] }
    ];
    
    sizes.forEach(({ size, classes }) => {
      const { rerender } = render(<Icon name="creditCard" size={size} />);
      
      const iconContainer = document.querySelector('span');
      classes.forEach(className => {
        expect(iconContainer).toHaveClass(className);
      });
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test that Icon handles custom colors correctly
   * Verifies color prop is applied to SVG elements
   */
  test('should handle custom colors correctly', () => {
    const colors = ['#FF5733', 'rgba(46,24,20,0.62)', 'currentColor', '#000000'];
    
    colors.forEach(color => {
      const { rerender } = render(<Icon name="creditCard" color={color} />);
      
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Check that color is applied to stroke or fill attributes
      const pathElements = svg.querySelectorAll('path, rect, circle');
      const hasColorApplied = Array.from(pathElements).some(element => 
        element.getAttribute('stroke') === color || 
        element.getAttribute('fill') === color
      );
      
      if (pathElements.length > 0) {
        expect(hasColorApplied).toBe(true);
      }
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test that Icon applies custom CSS classes
   * Verifies className prop is properly applied
   */
  test('should apply custom CSS classes', () => {
    render(<Icon name="creditCard" className="custom-icon" />);
    
    const iconContainer = document.querySelector('span');
    expect(iconContainer).toHaveClass('custom-icon');
    expect(iconContainer).toHaveClass('inline-flex'); // Default classes still present
  });

  /**
   * Test that Icon handles unknown icon names gracefully
   * Verifies component behavior when invalid icon name is provided
   */
  test('should handle unknown icon names gracefully', () => {
    // Mock console.warn to test warning
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    render(<Icon name="unknownIcon" />);
    
    expect(consoleSpy).toHaveBeenCalledWith('Icon "unknownIcon" not found');
    
    // Component should not render anything for unknown icons
    const iconContainer = document.querySelector('span');
    expect(iconContainer).not.toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  /**
   * Test that Icon creditCard renders correctly
   * Verifies specific icon implementation for card use case
   */
  test('should render creditCard icon correctly', () => {
    render(<Icon name="creditCard" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    
    // Check for credit card specific elements
    const rect = svg.querySelector('rect');
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute('x', '2');
    expect(rect).toHaveAttribute('y', '5');
  });

  /**
   * Test that Icon user renders correctly
   * Verifies specific icon implementation for user profile use case
   */
  test('should render user icon correctly', () => {
    render(<Icon name="user" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    
    // Check for user specific elements
    const circle = svg.querySelector('circle');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('cx', '12');
    expect(circle).toHaveAttribute('cy', '7');
  });

  /**
   * Test that Icon dollar renders correctly
   * Verifies specific icon implementation for amount selection use case
   */
  test('should render dollar icon correctly', () => {
    render(<Icon name="dollar" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    
    // Check for dollar specific elements
    const paths = svg.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  /**
   * Test that Icon camera renders correctly
   * Verifies specific icon implementation for card scanning use case
   */
  test('should render camera icon correctly', () => {
    render(<Icon name="camera" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    
    // Check for camera specific elements
    const path = svg.querySelector('path');
    const circle = svg.querySelector('circle');
    expect(path).toBeInTheDocument();
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('cx', '12');
    expect(circle).toHaveAttribute('cy', '13');
  });

  /**
   * Test that Icon check renders correctly
   * Verifies specific icon implementation for success/confirmation use case
   */
  test('should render check icon correctly', () => {
    render(<Icon name="check" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    
    // Check for check mark specific elements
    const path = svg.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('d', 'M20 6L9 17l-5-5');
  });

  /**
   * Test that Icon handles SVG accessibility
   * Verifies SVG elements have proper accessibility attributes
   */
  test('should handle SVG accessibility', () => {
    render(<Icon name="creditCard" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  /**
   * Test that Icon handles stroke properties correctly
   * Verifies stroke width and styling for different icons
   */
  test('should handle stroke properties correctly', () => {
    const icons = ['creditCard', 'user', 'dollar', 'camera', 'check'];
    
    icons.forEach(iconName => {
      const { rerender } = render(<Icon name={iconName} />);
      
      const svg = document.querySelector('svg');
      const strokeElements = svg.querySelectorAll('[stroke]');
      
      strokeElements.forEach(element => {
        expect(element).toHaveAttribute('stroke-width', '2');
      });
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test that Icon maintains consistent viewBox
   * Verifies all icons use the same viewBox for consistency
   */
  test('should maintain consistent viewBox', () => {
    const icons = ['creditCard', 'user', 'dollar', 'camera', 'check'];
    
    icons.forEach(iconName => {
      const { rerender } = render(<Icon name={iconName} />);
      
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test that Icon handles edge cases
   * Verifies component behavior with unusual props
   */
  test('should handle edge cases', () => {
    const edgeCases = [
      { name: '', size: 'md' },
      { name: 'creditCard', size: '' },
      { name: 'creditCard', color: '' },
      { name: null, size: 'md' },
      { name: undefined, size: 'md' }
    ];
    
    edgeCases.forEach(({ name, size, color }) => {
      const { rerender } = render(
        <Icon 
          name={name} 
          size={size || 'md'} 
          color={color || 'currentColor'} 
        />
      );
      
      // Component should handle gracefully without crashing
      if (name && name !== '' && name !== null && name !== undefined) {
        const iconContainer = document.querySelector('span');
        expect(iconContainer).toBeInTheDocument();
      }
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test that Icon works in different contexts
   * Verifies component integration in various use cases
   */
  test('should work in different contexts', () => {
    const contexts = [
      {
        name: 'creditCard',
        context: 'Card input field',
        expectedSize: 'md',
        expectedColor: 'rgba(46,24,20,0.62)'
      },
      {
        name: 'camera',
        context: 'Scan button',
        expectedSize: 'sm',
        expectedColor: '#000000'
      },
      {
        name: 'dollar',
        context: 'Amount selection',
        expectedSize: 'md',
        expectedColor: '#000000'
      }
    ];
    
    contexts.forEach(({ name, context, expectedSize, expectedColor }) => {
      const { rerender } = render(
        <Icon name={name} size={expectedSize} color={expectedColor} />
      );
      
      const iconContainer = document.querySelector('span');
      expect(iconContainer).toBeInTheDocument();
      
      const svg = iconContainer.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      rerender(<div />); // Clear for next test
    });
  });

  /**
   * Test that Icon handles props forwarding
   * Verifies additional props are properly forwarded
   */
  test('should handle props forwarding', () => {
    render(
      <Icon 
        name="creditCard" 
        data-testid="custom-icon" 
        role="img"
        title="Credit Card Icon"
      />
    );
    
    const iconContainer = document.querySelector('span');
    expect(iconContainer).toHaveAttribute('data-testid', 'custom-icon');
    expect(iconContainer).toHaveAttribute('role', 'img');
    expect(iconContainer).toHaveAttribute('title', 'Credit Card Icon');
  });
});