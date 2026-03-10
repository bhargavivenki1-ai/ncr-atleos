import React from 'react';
import Icon from '../atoms/Icon';

/**
 * TipItem component for displaying individual helpful tips
 * @param {Object} props - Component props
 * @param {string} props.title - Tip title
 * @param {string} props.iconName - Icon name for the tip
 * @param {Function} props.onClick - Click handler for the tip
 * @param {string} props.className - Additional CSS classes
 */
const TipItem = ({ 
  title,
  iconName,
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`flex items-center gap-2 px-[18px] pl-[28px] w-full cursor-pointer hover:bg-[rgba(20,46,27,0.05)] transition-colors duration-200 ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e);
        }
      }}
      {...props}
    >
      {/* Left Icon */}
      <div className="flex p-2 pr-0">
        {iconName && (
          <Icon 
            name={iconName} 
            className="w-6 h-6 text-[#1B281E]" 
            aria-hidden="true"
          />
        )}
      </div>
      
      {/* Content */}
      <div className="flex items-stretch gap-2 flex-1">
        <div className="flex flex-col gap-1 py-[18px] flex-1">
          <div className="flex items-center gap-[2px] w-full">
            <span className="font-['Plus_Jakarta_Sans'] font-normal text-[17px] leading-[1.35em] text-[#1B281E] flex-1">
              {title}
            </span>
          </div>
        </div>
      </div>
      
      {/* Right Chevron */}
      <div className="flex items-center">
        <Icon 
          name="chevron-right" 
          className="w-4 h-4 text-[rgba(20,46,27,0.62)]" 
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default TipItem;