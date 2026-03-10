import React from 'react';

/**
 * Icon component for SVG icons
 * @param {Object} props - Component props
 * @param {string} props.name - Icon name
 * @param {string} props.size - Icon size (sm, md, lg)
 * @param {string} props.color - Icon color
 * @param {string} props.className - Additional CSS classes
 */
const Icon = ({
  name,
  size = 'md',
  color = 'currentColor',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  // Icon definitions based on Figma design
  const icons = {
    creditCard: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M2 10h20" stroke={color} strokeWidth="2"/>
        <path d="M6 14h4" stroke={color} strokeWidth="2"/>
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" fill="none"/>
        <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" fill="none"/>
      </svg>
    ),
    dollar: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={color} strokeWidth="2" fill="none"/>
      </svg>
    ),
    camera: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" stroke={color} strokeWidth="2" fill="none"/>
        <circle cx="12" cy="13" r="3" stroke={color} strokeWidth="2" fill="none"/>
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2" fill="none"/>
      </svg>
    )
  };

  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <span className={`inline-flex ${sizeClasses[size]} ${className}`} {...props}>
      {IconComponent}
    </span>
  );
};

export default Icon;