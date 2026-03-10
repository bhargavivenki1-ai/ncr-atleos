import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from '../Title';

/**
 * Test suite for Title atomic component
 * Tests rendering, heading levels, alignment, accessibility, and prop handling
 */
describe('Title Component', () => {
  /**
   * Test that Title renders with default props
   * Verifies basic rendering with h1 tag and center alignment
   */
  test('should render with default props', () => {
    const titleText = 'Test Title';
    render(<Title>{titleText}</Title>);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(titleText);
    expect(heading).toHaveClass('text-center');
  });

  /**
   * Test that Title renders different heading levels correctly
   * Verifies level prop creates appropriate HTML heading elements
   */
  test('should render different heading levels', () => {
    const titleText = 'Test Title';
    
    // Test h2
    const { rerender } = render(<Title level="h2">{titleText}</Title>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    
    // Test h3
    rerender(<Title level="h3">{titleText}</Title>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    
    // Test h4
    rerender(<Title level="h4">{titleText}</Title>);
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
  });

  /**
   * Test that Title applies different text alignments
   * Verifies align prop correctly sets CSS alignment classes
   */
  test('should apply different text alignments', () => {
    const titleText = 'Test Title';
    
    // Test left alignment
    const { rerender } = render(<Title align="left">{titleText}</Title>);
    expect(screen.getByRole('heading')).toHaveClass('text-left');
    
    // Test center alignment
    rerender(<Title align="center">{titleText}</Title>);
    expect(screen.getByRole('heading')).toHaveClass('text-center');
    
    // Test right alignment
    rerender(<Title align="right">{titleText}</Title>);
    expect(screen.getByRole('heading')).toHaveClass('text-right');
  });

  /**
   * Test that Title defaults to center alignment for invalid align values
   * Verifies fallback behavior for invalid alignment props
   */
  test('should default to center alignment for invalid align values', () => {
    const titleText = 'Test Title';
    render(<Title align="invalid">{titleText}</Title>);
    
    expect(screen.getByRole('heading')).toHaveClass('text-center');
  });

  /**
   * Test that Title applies custom CSS classes
   * Verifies className prop is properly merged with default classes
   */
  test('should apply custom CSS classes', () => {
    const titleText = 'Test Title';
    const customClass = 'custom-title-class';
    
    render(<Title className={customClass}>{titleText}</Title>);
    
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(customClass);
    expect(heading).toHaveClass('text-title', 'text-text-primary', 'font-semibold');
  });

  /**
   * Test that Title accepts and applies ID attribute
   * Verifies id prop is correctly set for accessibility and targeting
   */
  test('should accept and apply id attribute', () => {
    const titleText = 'Test Title';
    const titleId = 'main-title';
    
    render(<Title id={titleId}>{titleText}</Title>);
    
    const heading = screen.getByRole('heading');
    expect(heading).toHaveAttribute('id', titleId);
  });

  /**
   * Test that Title passes through additional props
   * Verifies component forwards unknown props to underlying element
   */
  test('should pass through additional props', () => {
    const titleText = 'Test Title';
    const dataTestId = 'title-component';
    
    render(<Title data-testid={dataTestId}>{titleText}</Title>);
    
    const heading = screen.getByRole('heading');
    expect(heading).toHaveAttribute('data-testid', dataTestId);
  });

  /**
   * Test that Title renders complex children content
   * Verifies component can handle JSX elements and mixed content
   */
  test('should render complex children content', () => {
    render(
      <Title>
        Welcome <strong>User</strong>
      </Title>
    );
    
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Welcome User');
    expect(heading.querySelector('strong')).toHaveTextContent('User');
  });

  /**
   * Test that Title has proper base styling classes
   * Verifies default CSS classes are always applied
   */
  test('should have proper base styling classes', () => {
    const titleText = 'Test Title';
    render(<Title>{titleText}</Title>);
    
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(
      'text-title',
      'text-text-primary',
      'font-semibold',
      'text-center'
    );
  });

  /**
   * Test Title accessibility with screen readers
   * Verifies proper heading hierarchy and semantic structure
   */
  test('should be accessible to screen readers', () => {
    const titleText = 'Main Page Title';
    render(<Title level="h1">{titleText}</Title>);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAccessibleName(titleText);
  });

  /**
   * Test that Title handles empty children gracefully
   * Verifies component behavior with no content
   */
  test('should handle empty children gracefully', () => {
    render(<Title></Title>);
    
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toBeEmptyDOMElement();
  });

  /**
   * Test that Title maintains proper heading hierarchy
   * Verifies semantic HTML structure for accessibility
   */
  test('should maintain proper heading hierarchy', () => {
    render(
      <div>
        <Title level="h1">Main Title</Title>
        <Title level="h2">Subtitle</Title>
        <Title level="h3">Section Title</Title>
      </div>
    );
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Subtitle');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Section Title');
  });
});