import React from 'react';

/**
 * RoundButton component for circular icon buttons
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content (usually an icon)
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Button size (sm, md, lg)
 */
const RoundButton = ({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  className = '',
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2'
  };

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex justify-center items-center bg-[#FF5733] rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-offset-2 ${sizeClasses[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#E54A2B]'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default RoundButton;