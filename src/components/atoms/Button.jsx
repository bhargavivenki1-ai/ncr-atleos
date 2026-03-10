import React from 'react';

/**
 * Button component with different variants and states
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant (primary, secondary, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'lg', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button',
  ariaLabel,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'primary-button focus:ring-button-primary',
    secondary: 'bg-transparent border-2 border-button-primary text-button-primary hover:bg-button-primary hover:text-button-text',
    ghost: 'bg-transparent text-button-primary hover:bg-button-primary hover:bg-opacity-10',
    balanceSecondary: 'bg-[rgba(39,124,61,0.09)] text-[#1B281E] hover:bg-[rgba(39,124,61,0.15)] focus:ring-[rgba(39,124,61,0.3)]',
    fundsTransferPrimary: 'bg-[#FF5733] text-[#000000] hover:bg-[#F24822] focus:ring-[#FF5733]',
    fundsTransferSecondary: 'bg-[rgba(224,191,184,0.12)] text-[#E4DAD7] hover:bg-[rgba(224,191,184,0.2)] focus:ring-[rgba(224,191,184,0.3)]',
    fundsTransferTertiary: 'bg-transparent border-[0.5px] border-[rgba(182,151,145,0.2)] text-[#E4DAD7] hover:bg-[rgba(182,151,145,0.1)] focus:ring-[rgba(182,151,145,0.3)]'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 text-base rounded-lg',
    lg: 'px-4 py-14.5 text-button rounded-48',
    balanceAction: 'px-4 py-[14.5px] text-[17px] font-medium leading-[1.35em] rounded-[48px] h-[50px] font-["Plus_Jakarta_Sans"]',
    fundsTransferLarge: 'px-4 py-[14.5px] text-[17px] font-medium leading-[1.35em] rounded-[48px] h-[50px] font-["Public_Sans"]',
    fundsTransferSmall: 'px-4 py-[14px] text-[15px] font-medium leading-[1.35em] rounded-[48px] h-[50px] font-["Public_Sans"]'
  };
  
  const variantClass = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.lg;
  
  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };
  
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-disabled={disabled || loading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;