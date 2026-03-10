import React, { forwardRef } from 'react';

/**
 * AccountSelector component for selecting accounts in Funds Transfer
 * @param {Object} props - Component props
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onBlur - Blur handler
 * @param {Function} props.onFocus - Focus handler
 * @param {boolean} props.disabled - Whether selector is disabled
 * @param {boolean} props.required - Whether selector is required
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.ariaDescribedBy - ID of element describing this input
 * @param {string} props.className - Additional CSS classes
 * @param {Array} props.options - Array of account options
 */
const AccountSelector = forwardRef(({
  placeholder = '',
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  options = [],
  ...props
}, ref) => {
  return (
    <div className="flex flex-col p-2 px-4">
      <div className="flex flex-row justify-stretch items-stretch self-stretch gap-2 py-[13.5px] px-[13px] bg-[rgba(224,191,184,0.12)] rounded-[16px]">
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          className={`flex-1 bg-transparent border-none outline-none font-['Public_Sans'] font-normal text-[17px] leading-[1.35em] tracking-[-0.5%] text-[rgba(235,213,209,0.62)] ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

AccountSelector.displayName = 'AccountSelector';

export default AccountSelector;