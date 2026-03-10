import React from 'react';

/**
 * DashboardTile molecule component - Navigation tile for dashboard
 * Combines icon, title and optional subtitle in a card layout
 * @param {Object} props - Component props
 * @param {string} props.title - Tile title text
 * @param {string} props.subtitle - Optional subtitle text
 * @param {React.ReactNode} props.icon - Icon component or element
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether tile is disabled
 */
const DashboardTile = ({ 
  title, 
  subtitle, 
  icon, 
  onClick, 
  ariaLabel,
  className = '',
  disabled = false,
  ...props 
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel || title}
      aria-disabled={disabled}
      className={`
        bg-card-background rounded-16 p-4 
        shadow-[0px_2px_7px_rgba(0,0,0,0.08)] 
        flex flex-col justify-between gap-12
        min-h-[120px] w-full
        transition-all duration-200
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:shadow-[0px_4px_14px_rgba(0,0,0,0.12)] active:scale-[0.98]'
        }
        focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {/* Icon Section */}
      {icon && (
        <div className="flex items-center justify-start">
          <div className="w-6 h-6 text-text-primary">
            {icon}
          </div>
        </div>
      )}
      
      {/* Content Section */}
      <div className="flex flex-col gap-1 self-stretch">
        {/* Title */}
        <div className="flex items-stretch justify-stretch gap-1">
          <h3 className="text-card-title text-text-primary font-jakarta font-bold leading-[1.26] tracking-[-2%] flex-1">
            {title}
          </h3>
        </div>
        
        {/* Subtitle (optional) */}
        {subtitle && (
          <div className="flex items-stretch justify-stretch gap-1">
            <p className="text-card-subtitle text-text-secondary font-jakarta font-medium leading-[1.26] flex-1">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTile;