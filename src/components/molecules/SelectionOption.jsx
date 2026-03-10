import React from 'react';
import Icon from '../atoms/Icon';

/**
 * SelectionOption component for selectable options with icon and label
 * @param {Object} props - Component props
 * @param {string} props.label - Option label
 * @param {string} props.value - Option value
 * @param {boolean} props.selected - Whether option is selected
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Whether option is disabled
 * @param {string} props.icon - Icon name
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.ariaLabel - Accessibility label
 */
const SelectionOption = ({
  label,
  value,
  selected = false,
  onClick,
  disabled = false,
  icon = 'dollar',
  className = '',
  ariaLabel,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(value);
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={ariaLabel || `Select ${label}`}
      aria-pressed={selected}
      className={`flex flex-row items-center self-stretch gap-2 py-0 px-[18px] cursor-pointer transition-all duration-200 ${
        selected ? 'border-3 border-[#FF5733] rounded-[20px]' : 'hover:bg-[rgba(126,52,37,0.05)]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      <div className="flex flex-row py-[18px] pr-2 pl-0">
        <div className="flex justify-center items-center gap-2 p-2 bg-[#FF5733] rounded-full">
          <Icon name={icon} size="md" color="#000000" />
        </div>
      </div>
      <div className="flex flex-row justify-stretch items-stretch self-stretch gap-2 flex-1">
        <div className="flex flex-col gap-1 py-[18px] flex-1">
          <div className="flex flex-row items-center self-stretch gap-0.5">
            <span className="flex-1 font-['Public_Sans'] font-bold text-[17px] leading-[1.17em] tracking-[-2%] text-[#281D1B]">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionOption;