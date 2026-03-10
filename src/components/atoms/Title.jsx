import React from 'react';

/**
 * Title component for section headings and page titles
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Title text content
 * @param {string} props.level - Heading level (h1, h2, h3, etc.)
 * @param {string} props.align - Text alignment (left, center, right)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.id - Element ID for accessibility
 */
const Title = ({ 
  children, 
  level = 'h1', 
  align = 'center', 
  className = '', 
  id,
  ...props 
}) => {
  const Component = level;
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  const baseClasses = 'text-title text-text-primary font-semibold';
  const alignmentClass = alignmentClasses[align] || alignmentClasses.center;
  
  return (
    <Component 
      id={id}
      className={`${baseClasses} ${alignmentClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Title;